import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { stripLocale, detectLocale, type RoutedLocale } from "@/lib/i18n/locale-routing";

/**
 * Middleware ARCADINS Training Center.
 * 1) Routage par locale (/fr /en /es) : RÉÉCRIT vers la page existante (ZÉRO duplication de route),
 *    expose la locale via en-tête (SEO/hreflang côté layout) + cookie (persistance). Rétro-compatible :
 *    les URLs SANS préfixe restent valides (deep-link préservé).
 * 2) Protection d'authentification Supabase (existante) évaluée sur le chemin SANS préfixe.
 */
const LOCALE_COOKIE = "arcadins-lang";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale: prefix, path: strippedPath } = stripLocale(pathname);
  const cookieLang = request.cookies.get(LOCALE_COOKIE)?.value ?? null;
  const locale: RoutedLocale = prefix ?? detectLocale(request.headers.get("accept-language"), cookieLang);

  // En-têtes transmis au rendu serveur (layout) pour lang/hreflang/canonical.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-arcadins-locale", locale);
  requestHeaders.set("x-arcadins-path", strippedPath);

  function baseResponse(): NextResponse {
    if (prefix) {
      const url = request.nextUrl.clone();
      url.pathname = strippedPath; // réécrit /fr/faq → /faq (page existante réutilisée)
      return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const needsAuth = strippedPath.startsWith("/dashboard") || strippedPath.startsWith("/admin");
  const isAuthRoute = strippedPath.startsWith("/auth/");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // ── Auth Supabase : uniquement sur les chemins concernés (perf) ──
  if ((needsAuth || isAuthRoute) && supabaseUrl && supabaseKey && supabaseUrl.startsWith("http")) {
    const authResponse = baseResponse();
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            authResponse.cookies.set(name, value, options);
          });
        },
      },
    });
    const { data: { user } } = await supabase.auth.getUser();

    const localePath = (p: string) => (prefix ? `/${prefix}${p === "/" ? "" : p}` : p);

    if (needsAuth && !user) {
      const url = request.nextUrl.clone();
      url.pathname = localePath("/auth/login");
      url.search = "";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (isAuthRoute && user) {
      const url = request.nextUrl.clone();
      url.pathname = localePath("/dashboard");
      url.search = "";
      return NextResponse.redirect(url);
    }
    if (prefix) authResponse.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return authResponse;
  }

  // ── Chemins publics : réécriture locale + persistance cookie ──
  const response = baseResponse();
  if (prefix && cookieLang !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
  }
  return response;
}

export const config = {
  // Toutes les routes de pages (exclut assets, _next, api, fichiers) → nécessaire pour /fr /en /es.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/|.*\\.[\\w]+$).*)"],
};
