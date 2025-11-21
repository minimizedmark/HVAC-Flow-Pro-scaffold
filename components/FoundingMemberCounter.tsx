"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function FoundingMemberCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [slotsLeft, setSlotsLeft] = useState<number | null>(null);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseAnon);

  useEffect(() => {
    let mounted = true;
    async function fetchCount() {
      try {
        const { count: c } = await supabase.from("founding_members").select("*", { count: "exact", head: true });
        if (!mounted) return;
        const current = c ?? 0;
        setCount(current);
        setSlotsLeft(50 - current);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCount();

    const sub = supabase
      .channel("public:founding_members")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "founding_members" },
        (payload) => {
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(sub);
    };
  }, []);

  if (count === null) {
    return <div>Loading founding member counter…</div>;
  }

  return (
    <div className="text-center">
      <div className="text-4xl font-bold">{slotsLeft !== null ? Math.max(0, slotsLeft) : "—"}</div>
      <div className="mt-1 text-sm text-gray-200">Only {slotsLeft} of 50 Founding Member spots left — price doubles forever when sold out</div>
    </div>
  );
}