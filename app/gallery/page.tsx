"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getGallery } from "@/lib/api";
import type { IGallery, GalleryCategory } from "@/types";
import Spinner from "@/components/ui/Spinner";

const CATEGORIES: ("All" | GalleryCategory)[] = ["All", "Rooms", "Common Areas", "Dining", "Exterior"];

export default function GalleryPage() {
  const [gallery, setGallery] = useState<IGallery[]>([]);
  const [active, setActive] = useState<"All" | GalleryCategory>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery().then((r) => setGallery(r.gallery)).finally(() => setLoading(false));
  }, []);

  const filtered = active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      <div className="mb-2xl">
        <h1 className="text-headline-md text-primary mb-sm">Gallery</h1>
        <p className="text-body-md text-on-surface-variant">A look inside PG Our Home.</p>
      </div>

      {/* Category pills */}
      <div className="flex gap-sm flex-wrap mb-2xl">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-lg py-sm rounded-full text-label-md transition-colors ${
              active === c
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-4xl"><Spinner size="lg" className="text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
          {filtered.map((item) => (
            <div key={item._id} className="relative rounded-xl overflow-hidden group h-56">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors flex items-end p-lg">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-on-primary font-semibold">{item.title}</p>
                  <p className="text-on-primary/80 text-label-sm">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
