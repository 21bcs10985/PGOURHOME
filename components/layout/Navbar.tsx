"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/rooms", label: "Discover Rooms" },
  { href: "/amenities", label: "Amenities" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm">
      <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-sm text-primary font-bold text-title-lg">
          <Home size={22} className="text-primary" />
          PG Our Home
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-xl">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-label-md transition-colors",
                pathname?.startsWith(l.href)
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-md">
          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="flex items-center gap-xs text-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                <User size={16} />
                {user.name.split(" ")[0]}
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut size={14} className="mr-xs" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/book-visit">
                <Button size="sm">Book a Visit</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-sm text-primary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu — slide-in with smooth transition */}
      <div className={`md:hidden bg-surface border-t border-outline-variant/20 px-layout-margin-mobile py-xl flex flex-col gap-lg overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 py-0 border-t-0"}`}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-outline-variant/20" />
          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setMobileOpen(false)}
                className="text-body-md text-on-surface-variant"
              >
                My Account
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="text-body-md text-error text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link href="/book-visit" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Book a Visit</Button>
              </Link>
            </>
          )}
        </div>
    </nav>
  );
}
