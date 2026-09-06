import Link from "next/link";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { IRoom } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface RoomCardProps {
  room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  const firstImage = room.images?.[0]?.url;

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-level-1 hover:shadow-level-2 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="h-48 relative overflow-hidden bg-surface-container">
        {firstImage ? (
          <Image
            src={firstImage}
            alt={room.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            <span className="text-label-md">No Image</span>
          </div>
        )}
        <div className="absolute top-md right-md">
          <Badge variant={room.status}>{room.status}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-lg flex flex-col gap-md">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-title-lg text-primary font-semibold line-clamp-1">
              {room.title}
            </h3>
            <p className="text-label-sm text-on-surface-variant capitalize">
              {room.roomType} sharing · Floor {room.floor}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-title-lg text-primary font-bold">
              ₹{room.price.toLocaleString("en-IN")}
            </p>
            <p className="text-label-sm text-on-surface-variant">/month</p>
          </div>
        </div>

        {/* Amenities strip */}
        {room.amenities.length > 0 && (
          <div className="flex gap-xs flex-wrap border-t border-outline-variant/20 pt-md">
            {room.amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                className="text-label-sm text-on-surface-variant bg-surface-container px-sm py-xs rounded-full"
              >
                {a}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span className="text-label-sm text-on-surface-variant">
                +{room.amenities.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Occupancy */}
        <div className="flex items-center gap-xs text-label-sm text-on-surface-variant">
          <Users size={14} />
          <span>Max {room.occupancy} occupant{room.occupancy > 1 ? "s" : ""}</span>
          {room.roomSize > 0 && (
            <>
              <span className="mx-xs">·</span>
              <MapPin size={14} />
              <span>{room.roomSize} sq ft</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-sm mt-xs">
          <Link href={`/rooms/${room._id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {room.status === "available" && (
            <Link href={`/rooms/${room._id}`} className="flex-1">
              <Button size="sm" className="w-full">
                Book Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
