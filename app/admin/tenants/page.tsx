"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IUser } from "@/types";
import DataTable, { Column } from "@/components/admin/DataTable";
import Spinner from "@/components/ui/Spinner";

export default function AdminTenantsPage() {
  const { token } = useAuth();
  const [tenants, setTenants] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.getAdminTenants(token).then((r) => setTenants(r.tenants)).finally(() => setLoading(false));
  }, [token]);

  const columns: Column<IUser>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "createdAt", header: "Joined",
      render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN"),
    },
  ];

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-headline-sm text-primary">Tenants ({tenants.length})</h1>
      <DataTable columns={columns} data={tenants} keyField="_id" emptyMessage="No tenants yet." />
    </div>
  );
}
