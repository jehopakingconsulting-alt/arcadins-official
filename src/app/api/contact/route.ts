import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, country, interest, message } = data;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const { error } = await supabase.from("contact_requests").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      country,
      interest,
      message,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Demande reçue" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
