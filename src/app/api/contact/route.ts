import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, country, interest, message } = data;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // TODO: Insert into Supabase contact_requests table
    console.log("Contact request:", { firstName, lastName, email, country, interest, message });

    return NextResponse.json({ success: true, message: "Demande reçue" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
