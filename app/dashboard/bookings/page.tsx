"use client";

import { useBookings } from "@/hooks/useBookings";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/booking/BookingStatusBadge";
import type { IRoom } from "@/types";
import Spinner from "@/components/ui/Spinner";

export default function MyBookingsPage() {
  const { bookings, isLoading } = useBookings();

  if (isLoading) return <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>;

  return (
    <div className="flex flex-col gap-xl">
      <h1 className="text-headline-sm text-primary">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-4xl text-on-surface-variant">
          <p className="text-body-lg">No bookings yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-lg">
          {bookings.map((booking) => {
            const room = booking.room as IRoom;
            return (
              <div key={booking._id} className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                  <div>
                    <h3 className="text-title-lg text-primary">{room?.title ?? "Room"}</h3>
                    <p className="text-label-md text-on-surface-variant capitalize">
                      {room?.roomType} · Room {room?.roomNumber}
                    </p>
                  </div>
                  <div className="flex gap-sm">
                    <BookingStatusBadge status={booking.status} />
                    <PaymentStatusBadge status={booking.paymentStatus} />
                  </div>
                </div>
                <div className="mt-lg grid grid-cols-2 md:grid-cols-4 gap-md text-label-md">
                  <div>
                    <p className="text-on-surface-variant">Move-in</p>
                    <p className="text-on-surface font-medium">{new Date(booking.moveInDate).toLocaleDateString("en-IN")}</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant">Duration</p>
                    <p className="text-on-surface font-medium">{booking.duration} month{booking.duration > 1 ? "s" : ""}</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant">Monthly Rent</p>
                    <p className="text-primary font-semibold">₹{booking.monthlyRent.toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant">Security Deposit</p>
                    <p className="text-on-surface font-medium">₹{booking.securityDeposit.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
