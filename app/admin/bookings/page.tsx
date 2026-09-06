"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IBooking, IRoom, IUser } from "@/types";
import DataTable, { Column } from "@/components/admin/DataTable";
import Spinner from "@/components/ui/Spinner";
import Select from "@/components/ui/Select";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

const paymentOptions = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
];

export default function AdminBookingsPage() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!token) return;
    api.getAdminBookings(token).then((r) => setBookings(r.bookings)).finally(() => setLoading(false));
  };

  useEffect(load, [token]);

  const update = async (id: string, field: string, value: string) => {
    if (!token) return;
    await api.updateBooking(id, { [field]: value }, token);
    load();
  };

  const columns: Column<IBooking>[] = [
    {
      key: "tenant",
      header: "Tenant",
      render: (r) => {
        const u = r.user as IUser;
        return <span className="text-label-md">{u?.name ?? r.name}</span>;
      },
    },
    {
      key: "room",
      header: "Room",
      render: (r) => {
        const rm = r.room as IRoom;
        return <span className="text-label-md">{rm?.title ?? "—"}</span>;
      },
    },
    {
      key: "moveInDate",
      header: "Move-in",
      render: (r) => (
        <span className="text-label-md">
          {new Date(r.moveInDate).toLocaleDateString("en-IN")}
        </span>
      ),
    },
    {
      key: "monthlyRent",
      header: "Rent",
      render: (r) => (
        <span className="text-label-md font-semibold text-primary">
          ₹{r.monthlyRent.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Select
          options={statusOptions}
          value={r.status}
          onChange={(e) => update(r._id, "status", e.target.value)}
          className="text-label-sm h-8"
        />
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      render: (r) => (
        <Select
          options={paymentOptions}
          value={r.paymentStatus}
          onChange={(e) => update(r._id, "paymentStatus", e.target.value)}
          className="text-label-sm h-8"
        />
      ),
    },
  ];

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-headline-sm text-primary">All Bookings</h1>
      <DataTable
        columns={columns}
        data={bookings}
        keyField="_id"
        emptyMessage="No bookings yet."
      />
    </div>
  );
}
