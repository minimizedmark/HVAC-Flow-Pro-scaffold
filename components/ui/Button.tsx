import Link from "next/link";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button" | "link";
  href?: string;
  className?: string;
};

export function Button({ as = "button", href, children, className = "", ...props }: Props) {
  const base = "bg-primary text-black font-semibold rounded px-4 py-2 inline-block";
  if (as === "link" && href) {
    return (
      <Link href={href} className={`${base} ${className}`}>{children}</Link>
    );
  }
  return (
    <button className={`${base} ${className}`} {...props}>{children}</button>
  );
}
