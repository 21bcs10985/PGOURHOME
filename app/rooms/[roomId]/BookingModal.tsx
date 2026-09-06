"use client";

import { useState } from "react";
import type { IRoom } from "@/types";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import BookingForm from "@/components/booking/BookingForm";
import Link from "next/link";

export default function BookingModal({ room }: { room: IRoom }) {
  const [open, setOpen] = useState(false);

  if (room.status !== "available") {
    return (
      <div className="flex flex-col gap-sm">
        <p className="text-label-md text-error text-center">Room not available</p>
        <Link href="/book-visit">
          <Button variant="outline" className="w-full">Book a Visit Instead</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">Book Now</Button>
      <Link href="/book-visit">
        <Button variant="outline" className="w-full">Book a Visit</Button>
      </Link>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Book This Room">
        <BookingForm room={room} onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
