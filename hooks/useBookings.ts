"use client";

import useSWR from "swr";
import * as api from "@/lib/api";
import type { IBooking } from "@/types";
import { useAuth } from "@/context/AuthContext";

export function useBookings() {
  const { token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR<{ bookings: IBooking[] }>(
    token ? ["/bookings/my", token] : null,
    () => api.getMyBookings(token!)
  );

  return {
    bookings: data?.bookings ?? [],
    isLoading,
    error,
    mutate,
  };
}
