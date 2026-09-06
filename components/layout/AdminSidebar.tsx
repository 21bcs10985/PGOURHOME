"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  BookOpen,
  Users,
  Calendar,
  Wrench,
  Star,
  Image,
  Sparkles,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/tenants", label: "Tenants", icon: Users },
  { href: "/admin/visits", label: "Visits", icon: Calendar },
  { href: "/admin/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/amenities", label: "Amenities", icon: Sparkles },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-primary text-on-primary flex flex-col pt-xl pb-4xl px-md hidden md:flex">
      <p className="text-label-sm uppercase tracking-wider text-on-primary/60 px-md mb-lg">
        Admin Panel
      </p>
      <nav className="flex flex-col gap-xs">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-md px-md py-md rounded-lg text-label-md transition-colors",
                active
                  ? "bg-on-primary/10 text-on-primary font-semibold"
                  : "text-on-primary/70 hover:bg-on-primary/10 hover:text-on-primary"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
