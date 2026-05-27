import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "forest" | "amber" | "muted";
  className?: string;
}

export default function Tag({
  children,
  variant = "default",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-block text-[10px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 border",
        variant === "default" &&
          "border-[var(--color-whisper)] text-[var(--color-smoke)] bg-transparent",
        variant === "forest" &&
          "border-[var(--color-mist-dark)] text-[var(--color-earth)] bg-[var(--color-mist)]",
        variant === "amber" &&
          "border-[var(--color-amber)]/30 text-[var(--color-amber)] bg-transparent",
        variant === "muted" &&
          "border-transparent text-[var(--color-stone)] bg-[var(--color-ghost)]",
        className
      )}
    >
      {children}
    </span>
  );
}
