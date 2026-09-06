"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().regex(/^\d{10}$/, "10-digit phone required"),
  email: z.string().email("Valid email required"),
  preferredDate: z.string().min(1, "Select a date"),
  preferredTime: z.string().min(1, "Select a time"),
  numberOfVisitors: z.coerce.number().min(1, "At least 1 visitor"),
  roomType: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const timeSlots = [
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "02:00 PM", label: "02:00 PM" },
  { value: "03:00 PM", label: "03:00 PM" },
  { value: "04:00 PM", label: "04:00 PM" },
  { value: "05:00 PM", label: "05:00 PM" },
];

const roomTypeOptions = [
  { value: "", label: "Any Room Type" },
  { value: "single", label: "Single" },
  { value: "double", label: "Double Sharing" },
  { value: "triple", label: "Triple Sharing" },
];

export default function VisitRequestForm() {
  const { token, user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      numberOfVisitors: 1,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      await api.createVisit(
        {
          ...data,
          roomType: (data.roomType as "single" | "double" | "triple") || undefined,
        },
        token ?? undefined
      );
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-xl py-4xl text-center">
        <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
          <CheckCircle size={32} className="text-secondary" />
        </div>
        <h2 className="text-headline-sm text-primary">Visit Request Submitted!</h2>
        <p className="text-body-md text-on-surface-variant max-w-md">
          Thank you! We&apos;ll confirm your visit via phone or email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
      {error && (
        <p className="text-label-md text-error bg-error-container p-md rounded-lg">{error}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <Input label="Full Name" {...register("name")} error={errors.name?.message} />
        <Input label="Phone" {...register("phone")} error={errors.phone?.message} />
        <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
        <Input label="Number of Visitors" type="number" min={1} {...register("numberOfVisitors")} error={errors.numberOfVisitors?.message} />
        <Input label="Preferred Date" type="date" {...register("preferredDate")} error={errors.preferredDate?.message} />
        <Select label="Preferred Time" options={timeSlots} placeholder="Select time" {...register("preferredTime")} error={errors.preferredTime?.message} />
        <Select label="Room Type Interest" options={roomTypeOptions} {...register("roomType")} />
      </div>
      <div className="flex flex-col gap-xs">
        <label className="text-label-md text-on-surface-variant">Message (optional)</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Any specific requirements or questions..."
          className="w-full rounded-lg border border-outline-variant px-md py-sm text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary resize-none"
        />
      </div>
      <Button type="submit" loading={loading} size="lg" className="w-full md:w-auto self-start">
        Book a Visit
      </Button>
    </form>
  );
}
