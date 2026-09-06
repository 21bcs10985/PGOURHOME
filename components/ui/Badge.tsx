import { cn } from "@/lib/utils";

type BadgeVariant =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "available"
  | "occupied"
  | "maintenance"
  | "paid"
  | "failed"
  | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-surface-container-high text-on-surface-variant",
  available: "bg-secondary text-on-secondary",
  occupied: "bg-primary-container text-on-primary-container",
  maintenance: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  default: "bg-surface-container-high text-on-surface-variant",
};

export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-md py-xs rounded-full text-label-sm font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
