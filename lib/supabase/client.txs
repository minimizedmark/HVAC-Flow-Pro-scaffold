"use client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useMemo } from "react";
import React from "react";

const SupabaseContext = createContext<any>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  return useContext(SupabaseContext);
}
