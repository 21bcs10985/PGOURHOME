"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IReview } from "@/types";
import DataTable, { Column } from "@/components/admin/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toast";

export default function AdminReviewsPage() {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!token) return;
    api.getAdminReviews(token).then((r) => setReviews(r.reviews)).finally(() => setLoading(false));
  };
  useEffect(load, [token]);

  const toggle = async (id: string, approved: boolean) => {
    if (!token) return;
    await api.updateReview(id, { approved }, token);
    showToast(approved ? "Review approved" : "Review rejected", "success");
    load();
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete review?")) return;
    await api.deleteReview(id, token);
    showToast("Review deleted", "success");
    load();
  };

  const columns: Column<IReview>[] = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "rating", header: "Rating", render: (r) => `${"★".repeat(r.rating)}` },
    { key: "review", header: "Review", render: (r) => <span className="line-clamp-2">{r.review}</span> },
    {
      key: "approved", header: "Status",
      render: (r) => <Badge variant={r.approved ? "confirmed" : "pending"}>{r.approved ? "Approved" : "Pending"}</Badge>,
    },
    {
      key: "actions", header: "Actions",
      render: (r) => (
        <div className="flex gap-sm">
          <Button size="sm" variant={r.approved ? "outline" : "secondary"} onClick={() => toggle(r._id, !r.approved)}>
            {r.approved ? "Reject" : "Approve"}
          </Button>
          <Button size="sm" variant="danger" onClick={() => remove(r._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-headline-sm text-primary">Reviews</h1>
      <DataTable columns={columns} data={reviews} keyField="_id" emptyMessage="No reviews yet." />
    </div>
  );
}
