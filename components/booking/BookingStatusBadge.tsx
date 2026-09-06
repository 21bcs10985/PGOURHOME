import Badge from "@/components/ui/Badge";
import type { BookingStatus, PaymentStatus } from "@/types";

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge variant={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge variant={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
}
