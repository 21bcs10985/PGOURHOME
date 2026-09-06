"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IGallery, GalleryCategory } from "@/types";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toast";
import { Trash2 } from "lucide-react";

const categoryOptions = [
  { value: "Rooms", label: "Rooms" },
  { value: "Common Areas", label: "Common Areas" },
  { value: "Dining", label: "Dining" },
  { value: "Exterior", label: "Exterior" },
];

export default function AdminGalleryPage() {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [gallery, setGallery] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Rooms" as GalleryCategory, description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.getGallery().then((r) => setGallery(r.gallery)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const submit = async () => {
    if (!token || !file) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("description", form.description);
      await api.createGalleryItem(fd, token);
      showToast("Image added", "success");
      setOpen(false);
      load();
    } catch { showToast("Upload failed", "error"); }
    finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete image?")) return;
    await api.deleteGalleryItem(id, token);
    showToast("Image deleted", "success");
    load();
  };

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-headline-sm text-primary">Gallery</h1>
        <Button onClick={() => setOpen(true)}>+ Add Image</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
        {gallery.map((item) => (
          <div key={item._id} className="relative rounded-xl overflow-hidden group h-40">
            <Image src={item.image} alt={item.title} fill className="object-cover" sizes="25vw" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors flex flex-col items-center justify-end p-sm gap-xs">
              <p className="text-on-primary text-label-sm opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</p>
              <Button size="sm" variant="danger" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => remove(item._id)}>
                <Trash2 size={12} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Gallery Image">
        <div className="flex flex-col gap-lg">
          <Input label="Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <Select label="Category" options={categoryOptions} value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as GalleryCategory }))} />
          <Input label="Description (optional)" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant">Image File</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-body-md" />
          </div>
          <Button onClick={submit} loading={saving} disabled={!file || !form.title}>Upload</Button>
        </div>
      </Modal>
    </div>
  );
}
