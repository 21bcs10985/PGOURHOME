import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-[1140px] mx-auto px-layout-margin-mobile md:px-layout-margin-desktop py-4xl">
      <div className="mb-4xl">
        <h1 className="text-headline-md text-primary mb-sm">Contact Us</h1>
        <p className="text-body-lg text-on-surface-variant">We&apos;d love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4xl">
        {/* Info */}
        <div className="flex flex-col gap-xl">
          <div className="flex items-center gap-lg">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-on-primary-container" />
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Email</p>
              <a href="mailto:hello@pgourhome.com" className="text-body-md text-primary hover:underline">hello@pgourhome.com</a>
            </div>
          </div>
          <div className="flex items-center gap-lg">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-on-primary-container" />
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Phone</p>
              <a href="tel:+919876543210" className="text-body-md text-primary hover:underline">+91 98765 43210</a>
            </div>
          </div>
          <div className="flex items-center gap-lg">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-on-primary-container" />
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">Address</p>
              <p className="text-body-md text-primary">123 PG Lane, Koramangala<br />Bengaluru, Karnataka 560034</p>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-surface-container-lowest rounded-xl p-xl shadow-level-1">
          <h2 className="text-title-lg text-primary mb-lg">Office Hours</h2>
          <div className="flex flex-col gap-md text-body-md">
            {[
              { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
              { day: "Saturday", time: "10:00 AM – 5:00 PM" },
              { day: "Sunday", time: "By Appointment" },
            ].map((h) => (
              <div key={h.day} className="flex justify-between border-b border-outline-variant/20 pb-md">
                <span className="text-on-surface-variant">{h.day}</span>
                <span className="text-primary font-medium">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
