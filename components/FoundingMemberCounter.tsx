import { createClient } from "@/utils/supabase/server";

async function getClaimedCount() {
  const supabase = createClient();
  const { count } = await supabase
    .from("founding_members")
    .select("*", { count: "exact", head: true })
    .not("slot_number", "is", null);
  return count || 0;
}

export default async function FoundingCounter() {
  const claimed = await getClaimedCount();
  const left = 50 - claimed;

  if (left <= 0) {
    return (
      <div className="bg-red-600 text-white text-center py-8 text-4xl font-black rounded-xl">
        SOLD OUT FOREVER
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-500 to-red-600 text-black text-center py-12 rounded-2xl shadow-2xl">
      <div className="text-9xl font-black drop-shadow-lg">{left}</div>
      <div className="text-4xl font-bold mt-4">FOUNDING SPOTS LEFT</div>
      <div className="text-2xl mt-4 font-bold">$990/year · Full Pro Plan</div>
      <div className="text-xl mt-2">Next member gets #{claimed + 1} · Never again</div>
      {left <= 10 && (
        <div className="text-5xl mt-6 animate-pulse">⚠ ALMOST GONE ⚠</div>
      )}
    </div>
  );
}
