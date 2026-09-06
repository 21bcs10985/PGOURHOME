"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await authRegister(data);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-layout-margin-mobile py-4xl">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-level-2 p-2xl">
        <h1 className="text-headline-sm text-primary mb-xl">Create Account</h1>

        {error && (
          <p className="text-label-md text-error bg-error-container p-md rounded-lg mb-lg">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
          <Input label="Full Name" {...register("name")} error={errors.name?.message} />
          <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
          <Input label="Phone" {...register("phone")} placeholder="10-digit number" error={errors.phone?.message} />
          <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
          <Button type="submit" loading={isSubmitting} className="w-full">Create Account</Button>
        </form>

        <p className="text-label-md text-on-surface-variant text-center mt-xl">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
