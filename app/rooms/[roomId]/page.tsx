import { notFound } from "next/navigation";
import Image from "next/image";
import { getRoom } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import BookingModal from "./BookingModal";

interface PageProps {
  params: { roomId: string };
}

export default async function RoomDetailPage({ params }: PageProps) {
  let room;
  try {
    const res = await getRoom(params.roomId);
    room = res.room;
  } catch {
    notFound();
  }

  return (
    <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-4xl">
        {room.images.slice(0, 4).map((img, i) => (
          <div key={img.publicId} className={`relative rounded-xl overflow-hidden ${i === 0 ? "md:col-span-2 h-80" : "h-48"}`}>
            <Image src={img.url} alt={`${room.title} ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4xl">
        {/* Details */}
        <div className="md:col-span-2 flex flex-col gap-xl">
          <div className="flex items-start justify-between gap-md">
            <div>
              <h1 className="text-headline-sm text-primary">{room.title}</h1>
              <p className="text-body-md text-on-surface-variant capitalize mt-xs">
                {room.roomType} sharing · Floor {room.floor} · {room.roomSize > 0 ? `${room.roomSize} sq ft` : ""}
              </p>
            </div>
            <Badge variant={room.status}>{room.status}</Badge>
          </div>

          <p className="text-body-lg text-on-surface">{room.description}</p>

          <div>
            <h2 className="text-title-lg text-primary mb-md">Amenities</h2>
            <div className="flex flex-wrap gap-sm">
              {room.amenities.map((a) => (
                <span key={a} className="bg-surface-container px-md py-xs rounded-full text-label-md text-on-surface-variant">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking card */}
        <div className="flex flex-col gap-lg">
          <div className="bg-surface-container-lowest rounded-xl shadow-level-2 p-xl flex flex-col gap-lg">
            <div>
              <p className="text-headline-sm text-primary font-bold">
                ₹{room.price.toLocaleString("en-IN")}
                <span className="text-label-md font-normal text-on-surface-variant">/mo</span>
              </p>
              <p className="text-label-md text-on-surface-variant mt-xs">
                Security Deposit: ₹{room.securityDeposit.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex flex-col gap-sm text-label-md text-on-surface-variant">
              <span>👥 Max {room.occupancy} occupant{room.occupancy > 1 ? "s" : ""}</span>
              <span>📐 Floor {room.floor}</span>
            </div>
            <BookingModal room={room} />
          </div>
        </div>
      </div>
    </div>
  );
}
