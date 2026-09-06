"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IMaintenanceRequest, IUser } from "@/types";
import DataTable, { Column } from "@/components/admin/DataTable";
import Select from "@/components/ui/Select";
import Spinner from "@/components/ui/Spinner";

const statusOptions = [
  { value: "submitted", label: "Submitted" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];
const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function AdminMaintenancePage() {
  const { token } = useAuth();
  const [requests, setRequests] = useState<IMaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!token) return;
    api.getAdminMaintenance(token).then((r) => setRequests(r.requests)).finally(() => setLoading(false));
  };
  useEffect(load, [token]);

  const update = async (id: string, data: object) => {
    if (!token) return;
    await api.updateMaintenance(id, data, token);
    load();
  };

  const columns: Column<IMaintenanceRequest>[] = [
    {
      key: "user", header: "Tenant",
      render: (r) => <span>{(r.user as IUser)?.name ?? "—"}</span>,
    },
    { key: "category", header: "Category", render: (r) => <span className="capitalize">{r.category}</span> },
    { key: "description", header: "Description", render: (r) => <span className="line-clamp-2">{r.description}</span> },
    {
      key: "priority", header: "Priority",
      render: (r) => (
        <Select
          options={priorityOptions}
          value={r.priority}
          onChange={(e) => update(r._id, { priority: e.target.value })}
          className="text-label-sm h-8"
        />
      ),
    },
    {
      key: "status", header: "Status",
      render: (r) => (
        <Select
          options={statusOptions}
          value={r.status}
          onChange={(e) => update(r._id, { status: e.target.value })}
          className="text-label-sm h-8"
        />
      ),
    },
  ];

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-headline-sm text-primary">Maintenance Requests</h1>
      <DataTable columns={columns} data={requests} keyField="_id" emptyMessage="No maintenance requests." />
    </div>
  );
}
