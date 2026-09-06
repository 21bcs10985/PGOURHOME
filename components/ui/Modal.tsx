"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={dialogRef}
        className={cn(
          "relative bg-surface-container-lowest rounded-2xl shadow-level-3 w-full max-w-lg max-h-[90vh] overflow-y-auto p-xl",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-xl">
          {title && (
            <h2
              id="modal-title"
              className="text-headline-sm text-primary font-semibold"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-xs rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
