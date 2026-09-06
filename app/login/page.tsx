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
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await login(data);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-layout-margin-mobile">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-level-2 p-2xl">
        <h1 className="text-headline-sm text-primary mb-xl">Welcome back</h1>

        {error && (
          <p className="text-label-md text-error bg-error-container p-md rounded-lg mb-lg">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
          <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
          <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
          <Button type="submit" loading={isSubmitting} className="w-full">Sign In</Button>
        </form>

        <p className="text-label-md text-on-surface-variant text-center mt-xl">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-secondary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
