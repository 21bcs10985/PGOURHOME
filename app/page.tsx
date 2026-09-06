import Link from "next/link";
import Image from "next/image";
import { getRooms } from "@/lib/api";
import { getReviews } from "@/lib/api";
import { getAmenities } from "@/lib/api";
import { getGallery } from "@/lib/api";
import type { IRoom, IReview, IAmenity, IGallery } from "@/types";
import RoomCard from "@/components/rooms/RoomCard";
import Button from "@/components/ui/Button";

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-8 pb-4xl">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600"
          alt="Premium PG room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop flex flex-col md:flex-row items-center gap-4xl">
        <div className="w-full md:w-1/2 flex flex-col gap-xl">
          <div className="inline-flex items-center gap-xs bg-surface/80 backdrop-blur-sm px-md py-xs rounded-full w-fit shadow-level-1 border border-outline-variant/30">
            <span className="text-secondary text-sm">✓</span>
            <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Premium PG Living</span>
          </div>
          <h1 className="text-display-lg-mobile md:text-display-lg text-primary text-balance">
            Your Home Away From Home
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl text-balance">
            Comfortable, Safe & Affordable PG Living. Experience modern hospitality designed for students and young professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-md">
            <Link href="/rooms">
              <Button size="lg">Explore Rooms</Button>
            </Link>
            <Link href="/book-visit">
              <Button variant="outline" size="lg">Book a Visit</Button>
            </Link>
          </div>
        </div>

        {/* Floating badges */}
        <div className="hidden md:block w-1/2 relative h-64">
          <div className="absolute top-10 right-10 bg-surface px-xl py-md rounded-xl shadow-level-2 flex items-center gap-md rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="text-on-secondary-container text-xl">★</span>
            </div>
            <div>
              <p className="text-title-lg text-primary font-semibold">4.8 ★ Rating</p>
              <p className="text-label-sm text-on-surface-variant">From 500+ Tenants</p>
            </div>
          </div>
          <div className="absolute bottom-10 left-0 bg-surface px-xl py-md rounded-xl shadow-level-2 flex items-center gap-md -rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
              <span className="text-on-primary-container text-xl">🔒</span>
            </div>
            <div>
              <p className="text-title-lg text-primary font-semibold">24/7 Security</p>
              <p className="text-label-sm text-on-surface-variant">Safe & Monitored</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: "✓", label: "Verified Property" },
    { icon: "🔒", label: "Secure Living" },
    { icon: "🛋", label: "Fully Furnished" },
    { icon: "📶", label: "High-Speed Wi-Fi" },
  ];
  return (
    <section className="bg-surface-container-low py-xl border-y border-outline-variant/20">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop flex flex-wrap justify-center gap-2xl md:gap-4xl">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-sm text-on-surface-variant">
            <span className="text-secondary">{i.icon}</span>
            <span className="text-label-md">{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Featured Rooms ───────────────────────────────────────────────────────────
function FeaturedRooms({ rooms }: { rooms: IRoom[] }) {
  return (
    <section className="py-4xl bg-surface" id="discover">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop">
        <div className="text-center mb-4xl">
          <h2 className="text-headline-md text-primary mb-sm">Featured Rooms</h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Discover our thoughtfully designed living spaces tailored for your comfort.
          </p>
        </div>
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <p className="text-center text-on-surface-variant py-4xl">No rooms available right now.</p>
        )}
        <div className="text-center mt-2xl">
          <Link href="/rooms">
            <Button variant="ghost">View All Rooms →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Amenities Section ────────────────────────────────────────────────────────
function AmenitiesSection({ amenities }: { amenities: IAmenity[] }) {
  const grouped = amenities.reduce<Record<string, IAmenity[]>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  return (
    <section className="py-4xl bg-surface-container-low" id="amenities">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop">
        <div className="text-center mb-4xl">
          <h2 className="text-headline-md text-primary mb-sm">World-Class Amenities</h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Everything you need for a comfortable and productive stay.
          </p>
        </div>
        <div className="flex flex-col gap-3xl">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-headline-sm text-primary mb-xl">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-xl">
                {items.map((a) => (
                  <div key={a._id} className="bg-surface-container-lowest rounded-xl p-lg flex flex-col gap-sm shadow-level-1">
                    <span className="text-2xl">{a.icon}</span>
                    <p className="text-label-md text-primary font-semibold">{a.name}</p>
                    <p className="text-label-sm text-on-surface-variant">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-2xl">
          <Link href="/amenities">
            <Button variant="ghost">View All Amenities →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
function GallerySection({ gallery }: { gallery: IGallery[] }) {
  return (
    <section className="py-4xl bg-surface">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop">
        <div className="text-center mb-4xl">
          <h2 className="text-headline-md text-primary mb-sm">Life at PG Our Home</h2>
          <p className="text-body-md text-on-surface-variant">A glimpse into your future home.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
          {gallery.slice(0, 6).map((item) => (
            <div key={item._id} className="relative h-48 rounded-xl overflow-hidden group">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-end p-md">
                <p className="text-on-primary text-label-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-2xl">
          <Link href="/gallery">
            <Button variant="ghost">View Full Gallery →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection({ reviews }: { reviews: IReview[] }) {
  if (!reviews.length) return null;
  return (
    <section className="py-4xl bg-surface-container-low">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop">
        <div className="text-center mb-4xl">
          <h2 className="text-headline-md text-primary mb-sm">What Residents Say</h2>
        </div>
        <div className="flex gap-xl overflow-x-auto pb-md snap-x">
          {reviews.map((r) => (
            <div key={r._id} className="flex-shrink-0 w-80 bg-surface-container-lowest rounded-xl p-xl shadow-level-1 snap-start flex flex-col gap-md">
              <div className="flex gap-xs text-amber-400">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-body-md text-on-surface-variant flex-1">&ldquo;{r.review}&rdquo;</p>
              <div>
                <p className="text-label-md text-primary font-semibold">{r.name}</p>
                <p className="text-label-sm text-on-surface-variant">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-4xl bg-primary text-on-primary">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop text-center flex flex-col items-center gap-xl">
        <h2 className="text-headline-md text-on-primary">Ready to Move In?</h2>
        <p className="text-body-lg text-on-primary/80 max-w-xl">
          Join hundreds of happy residents. Book a visit today and experience the PG Our Home difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-md">
          <Link href="/book-visit">
            <Button variant="secondary" size="lg">Book a Visit</Button>
          </Link>
          <Link href="/rooms">
            <Button variant="outline" size="lg" className="border-on-primary/40 text-on-primary hover:bg-on-primary/10">
              Browse Rooms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const [roomsRes, reviewsRes, amenitiesRes, galleryRes] = await Promise.allSettled([
    getRooms({ limit: 3, status: "available" }),
    getReviews(),
    getAmenities(),
    getGallery(),
  ]);

  const rooms = roomsRes.status === "fulfilled" ? roomsRes.value.rooms : [];
  const reviews = reviewsRes.status === "fulfilled" ? reviewsRes.value.reviews : [];
  const amenities = amenitiesRes.status === "fulfilled" ? amenitiesRes.value.amenities : [];
  const gallery = galleryRes.status === "fulfilled" ? galleryRes.value.gallery : [];

  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedRooms rooms={rooms} />
      <AmenitiesSection amenities={amenities} />
      <GallerySection gallery={gallery} />
      <TestimonialsSection reviews={reviews} />
      <CTASection />
    </>
  );
}
