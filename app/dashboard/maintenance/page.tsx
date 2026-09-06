"use client";

import { useState } from "react";
import { useMaintenance } from "@/hooks/useMaintenance";
import MaintenanceForm from "@/components/maintenance/MaintenanceForm";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import type { MaintenanceStatus } from "@/types";

export default function MaintenancePage() {
  const { requests, isLoading, mutate } = useMaintenance();
  const [showForm, setShowForm] = useState(false);

  const statusVariantMap: Record<MaintenanceStatus, "pending" | "confirmed" | "completed"> = {
    submitted: "pending",
    "in-progress": "confirmed",
    resolved: "completed",
  };

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-headline-sm text-primary">Maintenance Requests</h1>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "+ New Request"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1">
          <h2 className="text-title-lg text-primary mb-lg">Submit New Request</h2>
          <MaintenanceForm onSuccess={() => { setShowForm(false); mutate(); }} />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>
      ) : requests.length === 0 ? (
        <p className="text-center py-4xl text-on-surface-variant">No maintenance requests yet.</p>
      ) : (
        <div className="flex flex-col gap-md">
          {requests.map((req) => (
            <div key={req._id} className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1">
              <div className="flex items-start justify-between gap-md">
                <div>
                  <p className="text-title-lg text-primary capitalize">{req.category}</p>
                  <p className="text-body-md text-on-surface mt-xs">{req.description}</p>
                </div>
                <div className="flex gap-sm">
                  <Badge variant={statusVariantMap[req.status]}>{req.status}</Badge>
                  <Badge variant={req.priority === "high" ? "cancelled" : req.priority === "medium" ? "pending" : "default"}>
                    {req.priority}
                  </Badge>
                </div>
              </div>
              <p className="text-label-sm text-on-surface-variant mt-md">
                {new Date(req.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
