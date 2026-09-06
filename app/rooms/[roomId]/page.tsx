import RoomDetailClient from "./RoomDetailClient";

interface PageProps {
  params: { roomId: string };
}

// Required by Next.js static export — actual data is fetched client-side
export function generateStaticParams() {
  return [{ roomId: "placeholder" }];
}

export const dynamicParams = true;

export default function RoomDetailPage({ params }: PageProps) {
  return <RoomDetailClient roomId={params.roomId} />;
}
