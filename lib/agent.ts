import { GrokClient } from "./grok";
import { createServerSupabase } from "./supabase/server";
import { randomUUID } from "crypto";

export async function generateQuotePDF(diagnostic: any, opts: { jobId?: string }) {
  const id = randomUUID();
  const parts = diagnostic?.parts || [{ name: "Inspection", qty: 1, approx_price_cents: 4999 }];
  const total = parts.reduce((s: number, p: any) => s + (p.approx_price_cents || 0), 0);
  const pdfUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/api/quote/${id}.pdf`;
  try {
    const supabase = createServerSupabase();
    await supabase.from("audit_log").insert([{ action: "quote_generated", payload: { diagnostic, pdfUrl, total } }]);
  } catch (e) {
  }
  return { id, pdfUrl, total, parts };
}
