import Link from "next/link";
import { ReactNode } from "react";

interface NeonButtonProps {
  href?: string;
  className?: string;
  children: ReactNode;
}

const baseClass =
  "btn-shine inline-flex items-center gap-2 rounded-2xl border border-slate-300/25 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(139,92,246,0.5)]";

export default function NeonButton({
  href,
  className = "",
  children,
}: NeonButtonProps) {
  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className={`${baseClass} ${className}`}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    );
  }

  return <button className={`${baseClass} ${className}`}>{children}</button>;
}
