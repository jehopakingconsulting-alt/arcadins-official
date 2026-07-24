import Stripe from "stripe";

// Repli sur un placeholder pour permettre le build/la collecte de données sans
// clé (ex. staging sans paiement), à l'image de supabase/admin.ts. La vraie
// clé STRIPE_SECRET_KEY reste requise à l'exécution du paiement en production.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  typescript: true,
});
