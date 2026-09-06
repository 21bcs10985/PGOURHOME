"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

const schema = z.object({
  category: z.string().min(1, "Select a category"),
  priority: z.string().min(1, "Select priority"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const categoryOptions = [
  { value: "electrical", label: "Electrical" },
  { value: "plumbing", label: "Plumbing" },
  { value: "internet", label: "Internet / Wi-Fi" },
  { value: "furniture", label: "Furniture" },
  { value: "cleaning", label: "Cleaning" },
  { value: "other", label: "Other" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

interface MaintenanceFormProps {
  onSuccess?: () => void;
}

export default function MaintenanceForm({ onSuccess }: MaintenanceFormProps) {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { priority: "medium" },
  });

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("category", data.category);
      fd.append("priority", data.priority);
      fd.append("description", data.description);
      await api.createMaintenance(fd, token);
      showToast("Maintenance request submitted!", "success");
      reset();
      onSuccess?.();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Submission failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
      <Select
        label="Category"
        options={categoryOptions}
        placeholder="Select category"
        {...register("category")}
        error={errors.category?.message}
      />
      <Select
        label="Priority"
        options={priorityOptions}
        {...register("priority")}
        error={errors.priority?.message}
      />
      <div className="flex flex-col gap-xs">
        <label className="text-label-md text-on-surface-variant">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Describe the issue in detail..."
          className="w-full rounded-lg border border-outline-variant px-md py-sm text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary resize-none"
        />
        {errors.description && (
          <p className="text-label-sm text-error">{errors.description.message}</p>
        )}
      </div>
      <Button type="submit" loading={loading}>
        Submit Request
      </Button>
    </form>
  );
}
