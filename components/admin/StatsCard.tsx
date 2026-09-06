import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest rounded-xl shadow-level-1 p-xl flex items-start gap-lg",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-on-primary-container" />
      </div>
      <div className="flex flex-col gap-xs">
        <p className="text-label-md text-on-surface-variant">{label}</p>
        <p className="text-headline-sm text-primary font-bold">{value}</p>
        {trend && <p className="text-label-sm text-secondary">{trend}</p>}
      </div>
    </div>
  );
}
