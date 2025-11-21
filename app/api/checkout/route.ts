import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabase } from "../../../lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-11-01" });

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email || "").toString().trim();
    if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

    const supabase = createServerSupabase();

    // Get exact count of existing founding members
    const { count } = await supabase.from("founding_members").select("id", { count: "exact", head: true });
    const currentCount = count ?? 0;
    const isFounding = currentCount < 50;
    const priceCents = isFounding ? 99000 : 198000;

    const successUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/checkout/cancel`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "HVAC Flow Pro — Founding Member" },
            unit_amount: priceCents
          },
          quantity: 1
        }
      ],
      automatic_tax: { enabled: true },
      customer_email: email,
      metadata: {
        email,
        is_founding: String(isFounding),
        price_locked_cents: String(priceCents)
      },
      success_url: successUrl,
      cancel_url: cancelUrl
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("/api/checkout error", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}