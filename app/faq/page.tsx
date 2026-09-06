"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "What is included in the monthly rent?", a: "Rent includes accommodation, basic furnishings, high-speed Wi-Fi, 24/7 security, and common area maintenance. Optional meal plans are available separately." },
  { q: "How much is the security deposit?", a: "Security deposit is typically 2 months of rent. It is fully refundable upon checkout after property inspection, usually within 7 working days." },
  { q: "Can I visit the PG before booking?", a: "Absolutely! Use our 'Book a Visit' feature to schedule a free walk-through at a convenient time. No commitment required." },
  { q: "What are the check-in and check-out procedures?", a: "Check-in is typically on the 1st or 15th of the month. You'll receive a move-in checklist and key handover. Check-out requires 30 days' notice." },
  { q: "Is there a curfew or entry time restriction?", a: "We have a flexible entry policy using biometric access. Residents get 24/7 entry. We do ask that common areas be kept quiet after 11 PM." },
  { q: "Are meals provided?", a: "We offer an optional meal plan (breakfast, lunch, dinner) cooked by our in-house cook. It can be subscribed monthly or on a per-meal basis." },
  { q: "How do I submit a maintenance request?", a: "Log in to your tenant dashboard and navigate to the Maintenance section. Submit your request with category, description, and priority. Our team responds within 24 hours." },
  { q: "Can I have guests over?", a: "Day guests are welcome in common areas until 9 PM. Overnight guests are not permitted to maintain the safety and comfort of all residents." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-[800px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      <div className="mb-4xl">
        <h1 className="text-headline-md text-primary mb-sm">Frequently Asked Questions</h1>
        <p className="text-body-md text-on-surface-variant">Everything you need to know about living at PG Our Home.</p>
      </div>

      <div className="flex flex-col gap-sm">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-level-1">
            <button
              className="w-full flex items-center justify-between px-xl py-lg text-left gap-md"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-title-lg text-primary">{faq.q}</span>
              <ChevronDown
                size={20}
                className={cn("text-on-surface-variant flex-shrink-0 transition-transform duration-200", open === i && "rotate-180")}
              />
            </button>
            {open === i && (
              <div className="px-xl pb-lg text-body-md text-on-surface-variant">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
