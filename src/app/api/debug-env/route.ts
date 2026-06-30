import { NextResponse } from "next/server";

function inspect(name: string, val: string | undefined) {
  if (!val) return { name, value: null };
  const nonLatin1 = [...val].filter((c) => c.codePointAt(0)! > 255);
  return {
    name,
    length: val.length,
    preview: val.slice(0, 20) + "..." + val.slice(-10),
    hasNonLatin1: nonLatin1.length > 0,
    nonLatin1Chars: nonLatin1.map((c) => "U+" + c.codePointAt(0)!.toString(16)),
    hasLeadingTrailingWhitespace: val !== val.trim(),
    firstCharCode: val.charCodeAt(0),
    lastCharCode: val.charCodeAt(val.length - 1),
  };
}

export async function GET() {
  return NextResponse.json({
    supabaseUrl: inspect("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseAnonKey: inspect("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    siteUrl: inspect("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL),
    stripePk: inspect("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  });
}
