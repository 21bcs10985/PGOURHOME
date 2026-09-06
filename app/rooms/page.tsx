"use client";

import { useState } from "react";
import RoomGrid from "@/components/rooms/RoomGrid";
import RoomFiltersPanel from "@/components/rooms/RoomFilters";
import type { RoomFilters } from "@/types";
import { useRooms } from "@/hooks/useRooms";
import Button from "@/components/ui/Button";

export default function RoomsPage() {
  const [filters, setFilters] = useState<RoomFilters>({ status: "available" });
  const { rooms, total, pages, page, isLoading } = useRooms(filters);

  return (
    <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      <div className="mb-4xl">
        <h1 className="text-headline-md text-primary mb-sm">Available Rooms</h1>
        <p className="text-body-md text-on-surface-variant">
          {total > 0 ? `${total} room${total !== 1 ? "s" : ""} found` : "Browse all our rooms"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-xl">
        <aside className="w-full md:w-64 flex-shrink-0">
          <RoomFiltersPanel filters={filters} onChange={setFilters} />
        </aside>

        <div className="flex-1 flex flex-col gap-xl">
          <RoomGrid rooms={rooms} isLoading={isLoading} emptyMessage="No rooms match your filters." />

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-sm">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
              >
                Previous
              </Button>
              <span className="text-label-md text-on-surface-variant px-md">
                {page} / {pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pages}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
