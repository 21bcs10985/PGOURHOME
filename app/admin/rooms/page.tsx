"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import type { IRoom } from "@/types";
import DataTable, { Column } from "@/components/admin/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { Pencil, Trash2 } from "lucide-react";

const roomTypeOptions = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "triple", label: "Triple" },
];

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "occupied", label: "Occupied" },
  { value: "maintenance", label: "Maintenance" },
];

type RoomFormData = {
  roomNumber: string; roomType: string; title: string; description: string;
  price: number; securityDeposit: number; occupancy: number;
  roomSize: number; floor: number; amenities: string; status: string;
};

export default function AdminRoomsPage() {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IRoom | null>(null);
  const { register, handleSubmit, reset } = useForm<RoomFormData>();

  const load = () => {
    if (!token) return;
    api.getRooms({ limit: 50 }).then((r) => setRooms(r.rooms)).finally(() => setLoading(false));
  };

  useEffect(load, [token]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (room: IRoom) => {
    setEditing(room);
    reset({ ...room, amenities: room.amenities.join(", "), roomType: room.roomType, status: room.status });
    setModalOpen(true);
  };

  const onSubmit = async (data: RoomFormData) => {
    if (!token) return;
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)));
      if (editing) {
        await api.updateRoom(editing._id, fd, token);
        showToast("Room updated", "success");
      } else {
        await api.createRoom(fd, token);
        showToast("Room created", "success");
      }
      setModalOpen(false);
      load();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Error", "error");
    }
  };

  const deleteRoom = async (id: string) => {
    if (!token || !confirm("Delete this room?")) return;
    try {
      await api.deleteRoom(id, token);
      showToast("Room deleted", "success");
      load();
    } catch { showToast("Delete failed", "error"); }
  };

  const columns: Column<IRoom>[] = [
    { key: "roomNumber", header: "No." },
    { key: "title", header: "Title" },
    { key: "roomType", header: "Type", render: (r) => <span className="capitalize">{r.roomType}</span> },
    { key: "price", header: "Price", render: (r) => `₹${r.price.toLocaleString("en-IN")}` },
    { key: "status", header: "Status", render: (r) => <Badge variant={r.status}>{r.status}</Badge> },
    {
      key: "actions", header: "Actions",
      render: (r) => (
        <div className="flex gap-sm">
          <Button size="sm" variant="ghost" onClick={() => openEdit(r)}><Pencil size={14} /></Button>
          <Button size="sm" variant="danger" onClick={() => deleteRoom(r._id)}><Trash2 size={14} /></Button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-headline-sm text-primary">Rooms</h1>
        <Button onClick={openCreate}>+ Add Room</Button>
      </div>

      <DataTable columns={columns} data={rooms} keyField="_id" emptyMessage="No rooms yet." />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Room" : "Add Room"}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
          <div className="grid grid-cols-2 gap-md">
            <Input label="Room No." {...register("roomNumber")} />
            <Select label="Type" options={roomTypeOptions} {...register("roomType")} />
          </div>
          <Input label="Title" {...register("title")} />
          <div className="flex flex-col gap-xs">
            <label className="text-label-md text-on-surface-variant">Description</label>
            <textarea {...register("description")} rows={3} className="rounded-lg border border-outline-variant px-md py-sm text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-md">
            <Input label="Price (₹)" type="number" {...register("price", { valueAsNumber: true })} />
            <Input label="Security Deposit (₹)" type="number" {...register("securityDeposit", { valueAsNumber: true })} />
            <Input label="Occupancy" type="number" {...register("occupancy", { valueAsNumber: true })} />
            <Input label="Room Size (sqft)" type="number" {...register("roomSize", { valueAsNumber: true })} />
            <Input label="Floor" type="number" {...register("floor", { valueAsNumber: true })} />
            <Select label="Status" options={statusOptions} {...register("status")} />
          </div>
          <Input label="Amenities (comma-separated)" {...register("amenities")} placeholder="AC, Wi-Fi, Wardrobe" />
          <Button type="submit" className="w-full mt-sm">{editing ? "Update Room" : "Create Room"}</Button>
        </form>
      </Modal>
    </div>
  );
}
