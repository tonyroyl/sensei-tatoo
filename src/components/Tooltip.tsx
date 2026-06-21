import { useId, type ReactNode } from "react";

/**
 * Featherweight, accessible tooltip — zero dependencies.
 * Shows on hover and on keyboard focus (focus-within), links the trigger to the
 * bubble via aria-describedby, and respects reduced-motion (transitions are
 * globally neutralised in index.css). Position with the `className` on the
 * wrapper (e.g. "absolute left-3 top-3").
 */
export function Tooltip({
  content,
  children,
  className = "",
}: {
  content: string;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <span className={`group/tt inline-flex ${className}`}>
      <span tabIndex={0} aria-describedby={id} className="cursor-help rounded-sm outline-none">
        {children}
      </span>
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[16rem] -translate-x-1/2 translate-y-1 rounded-md border border-gold/25 bg-[#161210] px-2.5 py-1.5 text-center text-xs font-medium text-solar opacity-0 shadow-ember transition-[opacity,transform] duration-200 group-hover/tt:translate-y-0 group-hover/tt:opacity-100 group-focus-within/tt:translate-y-0 group-focus-within/tt:opacity-100"
      >
        {content}
        <span
          aria-hidden
          className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-gold/25 bg-[#161210]"
        />
      </span>
    </span>
  );
}
