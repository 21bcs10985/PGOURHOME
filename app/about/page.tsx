export default function AboutPage() {
  return (
    <div className="max-w-[900px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      <h1 className="text-headline-md text-primary mb-xl">About PG Our Home</h1>

      <div className="flex flex-col gap-3xl">
        <section>
          <h2 className="text-headline-sm text-primary mb-lg">Our Story</h2>
          <p className="text-body-lg text-on-surface-variant">
            PG Our Home was founded with a simple belief — everyone deserves a safe, comfortable, and welcoming
            place to live while they&apos;re away from home. What started as a small paying guest accommodation
            has grown into a community of hundreds of students and working professionals who call our PG home.
          </p>
        </section>

        <section>
          <h2 className="text-headline-sm text-primary mb-lg">Our Mission</h2>
          <p className="text-body-lg text-on-surface-variant">
            To provide modern, affordable, and secure PG accommodation that empowers students and young
            professionals to focus on what matters — their studies, careers, and personal growth.
          </p>
        </section>

        <section>
          <h2 className="text-headline-sm text-primary mb-lg">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {[
              { title: "Safety First", desc: "24/7 CCTV, biometric access, and trained security staff." },
              { title: "Community", desc: "A welcoming environment where residents feel at home." },
              { title: "Transparency", desc: "Clear pricing with no hidden charges, ever." },
            ].map((v) => (
              <div key={v.title} className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1">
                <h3 className="text-title-lg text-primary mb-sm">{v.title}</h3>
                <p className="text-body-md text-on-surface-variant">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
