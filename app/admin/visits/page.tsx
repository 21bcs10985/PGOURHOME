"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IVisitRequest } from "@/types";
import DataTable, { Column } from "@/components/admin/DataTable";
import Select from "@/components/ui/Select";
import Spinner from "@/components/ui/Spinner";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminVisitsPage() {
  const { token } = useAuth();
  const [visits, setVisits] = useState<IVisitRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!token) return;
    api.getAdminVisits(token).then((r) => setVisits(r.visits)).finally(() => setLoading(false));
  };
  useEffect(load, [token]);

  const update = async (id: string, status: string) => {
    if (!token) return;
    await api.updateVisit(id, { status }, token);
    load();
  };

  const columns: Column<IVisitRequest>[] = [
    { key: "name", header: "Name" },
    { key: "phone", header: "Phone" },
    {
      key: "preferredDate", header: "Date",
      render: (r) => new Date(r.preferredDate).toLocaleDateString("en-IN"),
    },
    { key: "preferredTime", header: "Time" },
    { key: "numberOfVisitors", header: "Visitors" },
    {
      key: "status", header: "Status",
      render: (r) => (
        <Select
          options={statusOptions}
          value={r.status}
          onChange={(e) => update(r._id, e.target.value)}
          className="text-label-sm h-8"
        />
      ),
    },
  ];

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-headline-sm text-primary">Visit Requests</h1>
      <DataTable columns={columns} data={visits} keyField="_id" emptyMessage="No visit requests." />
    </div>
  );
}
