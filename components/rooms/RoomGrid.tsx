import type { IRoom } from "@/types";
import RoomCard from "./RoomCard";
import { RoomCardSkeleton } from "@/components/ui/Skeleton";

interface RoomGridProps {
  rooms: IRoom[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function RoomGrid({
  rooms,
  isLoading = false,
  emptyMessage = "No rooms found.",
}: RoomGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <RoomCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <div className="py-4xl text-center">
        <p className="text-body-lg text-on-surface-variant">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}
