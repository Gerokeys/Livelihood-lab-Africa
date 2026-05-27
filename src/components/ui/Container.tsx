import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
}

export default function Container({
  children,
  className,
  narrow,
  wide,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-6 lg:px-12",
        narrow ? "max-w-3xl" : wide ? "max-w-screen-2xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
