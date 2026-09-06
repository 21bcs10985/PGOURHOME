"use client";

import useSWR from "swr";
import * as api from "@/lib/api";
import type { RoomFilters, PaginatedRooms } from "@/types";

export function useRooms(filters: RoomFilters = {}) {
  const key = ["/rooms", JSON.stringify(filters)];
  const { data, error, isLoading, mutate } = useSWR<PaginatedRooms>(
    key,
    () => api.getRooms(filters)
  );

  return {
    rooms: data?.rooms ?? [],
    total: data?.total ?? 0,
    pages: data?.pages ?? 1,
    page: data?.page ?? 1,
    isLoading,
    error,
    mutate,
  };
}
