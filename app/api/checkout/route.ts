// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabase } from "../../../lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-01",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || "").toString().trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabase = createServerSupabase();

    // BULLETPROOF count — only counts rows that actually have a slot assigned
    const { count } = await supabase
      .from("founding_members")
      .select("*", { count: "exact", head: true })
      .not("slot_number", "is", null);

    const claimed = count ?? 0;
    const isFoundingAvailable = claimed < 50;

    let priceId: string;

    if (isFoundingAvailable) {
      // FIRST 50 ONLY — forced into the $990/year founding plan
      priceId = process.env.STRIPE_FOUNDING_PRICE_ID!;
    } else {
      // AFTER 50 — use your normal 3-tier product (monthly or yearly, user picks)
      priceId = body.priceId; // this comes from your pricing table buttons
      if (!priceId) {
        return NextResponse.json({ error: "Price selection required" }, { status: 400 });
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // ← subscription, not one-time payment
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: {
        email,
        founding_member: String(isFoundingAvailable),
        founding_slot_number: isFoundingAvailable ? String(claimed + 1) : null,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
