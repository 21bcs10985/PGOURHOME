import Link from "next/link";
import { Home, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary mt-4xl">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl grid grid-cols-1 md:grid-cols-4 gap-2xl">
        {/* Brand */}
        <div className="flex flex-col gap-md">
          <div className="flex items-center gap-sm font-bold text-title-lg">
            <Home size={20} />
            PG Our Home
          </div>
          <p className="text-body-md text-on-primary/70">
            Redefining modern PG living with comfort, safety, and community at
            the heart of everything we do.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-md">
          <h4 className="text-label-md uppercase tracking-wider font-bold text-on-primary/60">
            Quick Links
          </h4>
          {[
            { href: "/rooms", label: "Discover Rooms" },
            { href: "/amenities", label: "Amenities" },
            { href: "/gallery", label: "Gallery" },
            { href: "/book-visit", label: "Book a Visit" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-body-md text-on-primary/70 hover:text-on-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Support */}
        <div className="flex flex-col gap-md">
          <h4 className="text-label-md uppercase tracking-wider font-bold text-on-primary/60">
            Support
          </h4>
          {[
            { href: "/faq", label: "FAQ" },
            { href: "/contact", label: "Contact Us" },
            { href: "/about", label: "About Us" },
            { href: "/location", label: "Location" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-body-md text-on-primary/70 hover:text-on-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-md">
          <h4 className="text-label-md uppercase tracking-wider font-bold text-on-primary/60">
            Contact
          </h4>
          <a
            href="mailto:hello@pgourhome.com"
            className="flex items-center gap-sm text-body-md text-on-primary/70 hover:text-on-primary transition-colors"
          >
            <Mail size={16} /> hello@pgourhome.com
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-sm text-body-md text-on-primary/70 hover:text-on-primary transition-colors"
          >
            <Phone size={16} /> +91 98765 43210
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-on-primary/10 py-lg text-center">
        <p className="text-label-sm text-on-primary/50">
          © {new Date().getFullYear()} PG Our Home. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
