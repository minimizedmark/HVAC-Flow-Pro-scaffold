"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../../components/ui/Button";

export default function LoginPage() {
  const supabase = createClientComponentClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/auth/confirm`
      }
    });
    alert("Check your email for the magic link.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleMagicLink} className="bg-slate-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign in — Magic link</h2>
        <label className="block mb-2 text-sm">Email</label>
        <input name="email" type="email" required className="w-full p-3 rounded bg-slate-700 border border-slate-600 mb-4" />
        <Button type="submit">Send Magic Link</Button>
      </form>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  // Support for Supabase client-side fragment redirect
  // The magic link may return access_token in hash fragment — POST it to /auth/confirm to set HTTP-only cookies
  if (location.hash && location.pathname.startsWith('/auth/confirm')) {
    const params = new URLSearchParams(location.hash.slice(1));
    const payload = {};
    for (const [k,v] of params.entries()) payload[k] = v;
    fetch('/auth/confirm', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(()=> { history.replaceState({}, '', '/'); location.href = '/dashboard'; });
  }
})();
`}}
      />
    </div>
  );
}
