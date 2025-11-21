import React from "react";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full p-3 rounded bg-slate-700 border border-slate-600 ${props.className || ""}`} />;
}
