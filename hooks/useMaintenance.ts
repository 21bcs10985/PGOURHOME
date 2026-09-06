"use client";

import useSWR from "swr";
import * as api from "@/lib/api";
import type { IMaintenanceRequest } from "@/types";
import { useAuth } from "@/context/AuthContext";

export function useMaintenance() {
  const { token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR<{
    requests: IMaintenanceRequest[];
  }>(
    token ? ["/maintenance/my", token] : null,
    () => api.getMyMaintenance(token!)
  );

  return {
    requests: data?.requests ?? [],
    isLoading,
    error,
    mutate,
  };
}
