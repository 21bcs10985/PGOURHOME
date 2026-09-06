"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { IRoom } from "@/types";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone"),
  email: z.string().email("Enter a valid email"),
  moveInDate: z.string().min(1, "Select a move-in date"),
  duration: z.coerce.number().min(1, "Minimum 1 month"),
  occupants: z.coerce.number().min(1, "At least 1 occupant"),
});

type FormData = z.infer<typeof schema>;

interface BookingFormProps {
  room: IRoom;
  onSuccess?: () => void;
}

export default function BookingForm({ room, onSuccess }: BookingFormProps) {
  const { user, token } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      occupants: 1,
      duration: 6,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!token) {
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      await api.createBooking({ ...data, room: room._id }, token);
      showToast("Booking submitted! We'll confirm shortly.", "success");
      onSuccess?.();
      router.push("/dashboard/bookings");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Booking failed";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
      <div className="bg-surface-container p-lg rounded-lg text-label-md text-on-surface-variant">
        Booking for: <span className="text-primary font-semibold">{room.title}</span>
        <br />
        Rent: <span className="text-primary font-semibold">₹{room.price.toLocaleString("en-IN")}/mo</span>
      </div>

      <Input label="Full Name" {...register("name")} error={errors.name?.message} />
      <Input label="Phone" {...register("phone")} error={errors.phone?.message} />
      <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
      <Input label="Move-in Date" type="date" {...register("moveInDate")} error={errors.moveInDate?.message} />
      <Input label="Duration (months)" type="number" min={1} {...register("duration")} error={errors.duration?.message} />
      <Input label="Number of Occupants" type="number" min={1} max={room.occupancy} {...register("occupants")} error={errors.occupants?.message} />

      <Button type="submit" loading={loading} className="w-full">
        Submit Booking Request
      </Button>
    </form>
  );
}
