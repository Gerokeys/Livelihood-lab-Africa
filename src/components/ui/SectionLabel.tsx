import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number?: string;
  label: string;
  light?: boolean;
  className?: string;
}

export default function SectionLabel({
  number,
  label,
  light,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-8 lg:mb-12", className)}>
      {number && (
        <span
          className={cn(
            "text-[10px] font-mono",
            light ? "text-[var(--color-sage)]" : "text-[var(--color-stone)]"
          )}
        >
          {number}
        </span>
      )}
      <span
        className={cn(
          "text-[10px] tracking-[0.14em] uppercase font-medium",
          light ? "text-[var(--color-sage-light)]" : "text-[var(--color-smoke)]"
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "flex-1 h-px",
          light ? "bg-[var(--color-earth)]" : "bg-[var(--color-whisper)]"
        )}
      />
    </div>
  );
}
