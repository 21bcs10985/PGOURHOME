"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const config = {
  success: {
    icon: CheckCircle,
    containerClass: "bg-secondary text-on-secondary",
  },
  error: {
    icon: XCircle,
    containerClass: "bg-error text-on-error",
  },
  info: {
    icon: Info,
    containerClass: "bg-primary text-on-primary",
  },
};

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const { icon: Icon, containerClass } = config[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "fixed top-xl right-xl z-[100] flex items-center gap-sm px-xl py-md rounded-lg shadow-level-3 max-w-sm",
        containerClass
      )}
    >
      <Icon size={18} className="flex-shrink-0" />
      <p className="text-label-md flex-1">{message}</p>
      <button onClick={onClose} aria-label="Dismiss" className="opacity-80 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}

// ─── Toast Context ────────────────────────────────────────────────────────────
import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-xl right-xl z-[100] flex flex-col gap-sm">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => dismiss(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
