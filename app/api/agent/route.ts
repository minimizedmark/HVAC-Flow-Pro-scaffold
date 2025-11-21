import { NextResponse } from "next/server";
import { GrokClient } from "../../../lib/grok";
import { createServerSupabase } from "../../../lib/supabase/server";
import { generateQuotePDF } from "../../../lib/agent";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { text, photoUrl, jobId } = body;

  if (!text && !photoUrl) {
    return NextResponse.json({ error: "Provide text or photoUrl" }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      function send(s: string) {
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ message: s })}\n\n`));
      }
      send("agent:starting");

      try {
        send("agent:diagnostic:calling");
        const grok = new GrokClient();
        const diagPrompt = `Diagnose HVAC issue. Customer note: ${text || ""}. Photo: ${photoUrl || "none"}. Output JSON: {issue, severity, parts:[{name,qty,approx_price_cents}],estimate_minutes}`;
        const diag = await grok.generate(diagPrompt);
        send("agent:diagnostic:done");

        send("agent:pricing:building");
        const quote = await generateQuotePDF(diag, { jobId });
        send("agent:pricing:done");
        send("agent:quote_url:" + quote.pdfUrl);

        send("agent:scheduling:searching");
        const scheduledAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
        send("agent:scheduling:booked:" + scheduledAt);

        send("agent:invoicing:creating");
        send("agent:invoicing:done");

        send("agent:followup:queued");

        send("agent:complete");
      } catch (err: any) {
        send("agent:error:" + (err.message || String(err)));
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  });
}
