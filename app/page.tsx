import React from "react";
import Link from "next/link";
import FoundingMemberCounter from "../components/FoundingMemberCounter";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">HVAC Flow Pro</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Turn your solo HVAC shop into a $20k–$100k/mo machine. AI agents handle diagnostics, quoting, scheduling, invoicing, and follow-up — you do the work.
        </p>

        <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold">Founding Members — Limited to 50</h2>
          <p className="mt-2 text-sm text-gray-200">First 50 get lifetime 50% discount: $990/year. Price doubles when sold out.</p>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button as="link" href="/login" className="px-6 py-3">
              Get Founding Member Access
            </Button>
            <Link href="/dashboard" className="text-sm text-gray-100 underline">
              Admin Dashboard
            </Link>
          </div>

          <div className="mt-6">
            <FoundingMemberCounter />
          </div>
        </div>

        <section className="mt-8 text-left text-gray-300">
          <h3 className="text-xl font-semibold">How it works (one-line):</h3>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Customer texts "AC leaking at 123 Maple" or uploads photo → AI diagnoses.</li>
            <li>Agent builds line-item quote PDF, schedules tech, collects deposit via Stripe.</li>
            <li>Follow-ups, reviews, upsells, parts ordering, compliance checks, and cashflow automation.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
import FoundingCounter from "@/components/FoundingCounter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <FoundingCounter />
        {/* Your normal 3-tier pricing table goes below */}
      </div>
    </div>
  );
}
