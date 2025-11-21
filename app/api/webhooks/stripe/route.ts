import Stripe from "stripe";
import { NextResponse } from "next/server";
import { buffer } from "node:stream/consumers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-11-01" });

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const raw = await request.arrayBuffer();
  const sig = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(raw), sig, webhookSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature error", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("checkout.session.completed", session.id);
      break;
    case "invoice.paid":
      console.log("invoice.paid");
      break;
    default:
      console.log("Unhandled event:", event.type);
  }

  return NextResponse.json({ received: true });
}
