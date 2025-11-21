import fetch from "node-fetch";

export class GrokClient {
  apiUrl: string;
  constructor() {
    this.apiUrl = process.env.GROK_API_URL || "";
  }

  async generate(prompt: string): Promise<any> {
    if (this.apiUrl) {
      try {
        const resp = await fetch(this.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, max_tokens: 800 })
        });
        if (!resp.ok) throw new Error("Grok error");
        const data = await resp.json();
        return data;
      } catch (err) {
        console.warn("Grok failed, falling back to OpenAI", err);
      }
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) throw new Error("No language model available");
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${openaiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      })
    });
    const j = await r.json();
    return j;
  }
}
