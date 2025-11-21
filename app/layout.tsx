import "./globals.css";
import React from "react";
import { Providers } from "../lib/supabase/client";

export const metadata = {
  title: "HVAC Flow Pro",
  description: "AI-orchestrated SaaS for HVAC contractors — Founding members only"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
