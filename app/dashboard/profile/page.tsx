"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  phone: z.string().regex(/^\d{10}$/, "10-digit phone required"),
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, token, updateUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name ?? "", phone: user?.phone ?? "" },
  });

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("phone", data.phone);
      const res = await api.updateProfile(fd, token);
      updateUser(res.user);
      showToast("Profile updated!", "success");
    } catch {
      showToast("Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-xl max-w-lg">
      <h1 className="text-headline-sm text-primary">My Profile</h1>
      <div className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1">
        <p className="text-label-md text-on-surface-variant mb-lg">Email: {user?.email}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
          <Input label="Full Name" {...register("name")} error={errors.name?.message} />
          <Input label="Phone" {...register("phone")} error={errors.phone?.message} />
          <Button type="submit" loading={loading}>Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
