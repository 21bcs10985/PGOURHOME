"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IAmenity } from "@/types";
import DataTable, { Column } from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toast";
import { Pencil, Trash2 } from "lucide-react";

type FormData = { name: string; description: string; icon: string; category: string; };

export default function AdminAmenitiesPage() {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [amenities, setAmenities] = useState<IAmenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<IAmenity | null>(null);
  const [form, setForm] = useState<FormData>({ name: "", description: "", icon: "", category: "" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.getAmenities().then((r) => setAmenities(r.amenities)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => { setEditing(null); setForm({ name: "", description: "", icon: "", category: "" }); setOpen(true); };
  const openEdit = (a: IAmenity) => { setEditing(a); setForm({ name: a.name, description: a.description, icon: a.icon, category: a.category }); setOpen(true); };

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      if (editing) {
        await api.updateAmenity(editing._id, form, token);
        showToast("Amenity updated", "success");
      } else {
        await api.createAmenity(form, token);
        showToast("Amenity created", "success");
      }
      setOpen(false);
      load();
    } catch { showToast("Error saving", "error"); }
    finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete?")) return;
    await api.deleteAmenity(id, token);
    showToast("Deleted", "success");
    load();
  };

  const columns: Column<IAmenity>[] = [
    { key: "icon", header: "Icon" },
    { key: "name", header: "Name" },
    { key: "category", header: "Category" },
    { key: "description", header: "Description", render: (r) => <span className="line-clamp-1">{r.description}</span> },
    {
      key: "actions", header: "Actions",
      render: (r) => (
        <div className="flex gap-sm">
          <Button size="sm" variant="ghost" onClick={() => openEdit(r)}><Pencil size={14} /></Button>
          <Button size="sm" variant="danger" onClick={() => remove(r._id)}><Trash2 size={14} /></Button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-headline-sm text-primary">Amenities</h1>
        <Button onClick={openCreate}>+ Add Amenity</Button>
      </div>
      <DataTable columns={columns} data={amenities} keyField="_id" emptyMessage="No amenities yet." />
      <Modal isOpen={open} onClose={() => setOpen(false)} title={editing ? "Edit Amenity" : "Add Amenity"}>
        <div className="flex flex-col gap-lg">
          <Input label="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <Input label="Icon (Material Symbol name)" value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} placeholder="e.g. wifi" />
          <Input label="Category" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} className="rounded-lg border border-outline-variant px-md py-sm text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none" />
          </div>
          <Button onClick={save} loading={saving}>{editing ? "Update" : "Create"}</Button>
        </div>
      </Modal>
    </div>
  );
}
