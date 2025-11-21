import React from "react";
import FoundingMemberCounter from "../../components/FoundingMemberCounter";

export default async function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">HVAC Flow Pro — Dashboard</h1>
      <section className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Founding Members</h2>
        <p className="mt-2">Live counter and slots below.</p>
        <div className="mt-4">
          <FoundingMemberCounter />
        </div>
      </section>

      <section className="mt-6 bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Agent Console</h2>
        <p className="mt-2">Stream agent actions and logs here (streaming endpoint available at /api/agent).</p>
      </section>
    </main>
  );
}
