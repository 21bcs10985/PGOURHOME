"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useBookings } from "@/hooks/useBookings";
import { useMaintenance } from "@/hooks/useMaintenance";
import StatsCard from "@/components/admin/StatsCard";
import { BookOpen, Wrench, BedDouble, User } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { bookings } = useBookings();
  const { requests } = useMaintenance();

  const activeBooking = bookings.find((b) => b.status === "confirmed");
  const pendingMaintenance = requests.filter((r) => r.status !== "resolved").length;

  return (
    <div className="flex flex-col gap-2xl">
      <div>
        <h1 className="text-headline-sm text-primary">Welcome back, {user?.name?.split(" ")[0]}!</h1>
        <p className="text-body-md text-on-surface-variant mt-xs">Here&apos;s a quick overview of your account.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
        <StatsCard label="Total Bookings" value={bookings.length} icon={BookOpen} />
        <StatsCard label="Active Room" value={activeBooking ? "Confirmed" : "None"} icon={BedDouble} />
        <StatsCard label="Maintenance Pending" value={pendingMaintenance} icon={Wrench} />
        <StatsCard label="Profile" value={user?.role ?? "tenant"} icon={User} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <Link href="/dashboard/bookings" className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1 hover:shadow-level-2 transition-shadow">
          <BookOpen size={24} className="text-primary mb-md" />
          <h3 className="text-title-lg text-primary">My Bookings</h3>
          <p className="text-label-md text-on-surface-variant mt-xs">View all your room bookings and their status</p>
        </Link>
        <Link href="/dashboard/maintenance" className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1 hover:shadow-level-2 transition-shadow">
          <Wrench size={24} className="text-primary mb-md" />
          <h3 className="text-title-lg text-primary">Maintenance</h3>
          <p className="text-label-md text-on-surface-variant mt-xs">Submit and track maintenance requests</p>
        </Link>
        <Link href="/dashboard/profile" className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1 hover:shadow-level-2 transition-shadow">
          <User size={24} className="text-primary mb-md" />
          <h3 className="text-title-lg text-primary">My Profile</h3>
          <p className="text-label-md text-on-surface-variant mt-xs">Update your personal information</p>
        </Link>
      </div>
    </div>
  );
}
