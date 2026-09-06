"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import StatsCard from "@/components/admin/StatsCard";
import Spinner from "@/components/ui/Spinner";
import type { DashboardStats } from "@/types";
import {
  BedDouble, BookOpen, Users, Calendar,
  Wrench, BarChart2, CheckCircle, Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.getDashboardStats(token)
      .then((res) => setStats(res.stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;
  }

  if (!stats) {
    return <p className="text-on-surface-variant text-center py-4xl">Failed to load stats.</p>;
  }

  return (
    <div className="flex flex-col gap-2xl">
      <div>
        <h1 className="text-headline-sm text-primary">Admin Dashboard</h1>
        <p className="text-body-md text-on-surface-variant">Overview of PG Our Home operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
        <StatsCard label="Total Rooms" value={stats.totalRooms} icon={BedDouble} />
        <StatsCard label="Occupied Rooms" value={stats.occupiedRooms} icon={CheckCircle} />
        <StatsCard label="Available Rooms" value={stats.availableRooms} icon={BedDouble} />
        <StatsCard label="Occupancy Rate" value={`${stats.occupancyRate}%`} icon={BarChart2} trend={stats.totalRooms === 0 ? "No rooms yet" : undefined} />
        <StatsCard label="Total Bookings" value={stats.totalBookings} icon={BookOpen} />
        <StatsCard label="Pending Bookings" value={stats.pendingBookings} icon={Clock} />
        <StatsCard label="Total Tenants" value={stats.totalTenants} icon={Users} />
        <StatsCard label="Pending Visits" value={stats.pendingVisits} icon={Calendar} />
        <StatsCard label="Pending Maintenance" value={stats.pendingMaintenance} icon={Wrench} />
      </div>
    </div>
  );
}
