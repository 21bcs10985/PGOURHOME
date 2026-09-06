import { getAmenities } from "@/lib/api";
import type { IAmenity } from "@/types";

export default async function AmenitiesPage() {
  let amenities: IAmenity[] = [];
  try {
    const res = await getAmenities();
    amenities = res.amenities;
  } catch {}

  const grouped = amenities.reduce<Record<string, typeof amenities>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  return (
    <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      <div className="mb-4xl">
        <h1 className="text-headline-md text-primary mb-sm">Our Amenities</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Everything you need for a comfortable, productive, and enjoyable stay.
        </p>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-on-surface-variant text-center py-4xl">No amenities listed yet.</p>
      ) : (
        <div className="flex flex-col gap-4xl">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-headline-sm text-primary mb-2xl border-b border-outline-variant/20 pb-md">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-xl">
                {items.map((a) => (
                  <div key={a._id} className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1 flex flex-col gap-md">
                    <span className="text-3xl">{a.icon}</span>
                    <h3 className="text-title-lg text-primary">{a.name}</h3>
                    <p className="text-label-md text-on-surface-variant">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
