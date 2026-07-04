"use client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container-lux grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-roseGold tracking-widest text-xs uppercase">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Visit us</h2>
          <div className="mt-8 space-y-4 text-[15px] text-charcoal/80">
            <div className="flex gap-3"><MapPin className="text-roseGold" size={20}/> W2RW+395, Block H North Nazimabad Town, Karachi, Pakistan</div>
            <div className="flex gap-3"><Phone className="text-roseGold" size={20}/> 021 36647157</div>
            <div className="flex gap-3"><Mail className="text-roseGold" size={20}/> hello@fabiollabeauty.com</div>
            <div className="flex gap-3"><Clock className="text-roseGold" size={20}/> Open daily: 10:00 AM – 11:00 PM</div>
          </div>
          <div className="flex gap-4 mt-6 text-sm">
            <a href="https://wa.me/922136647157" target="_blank" className="underline hover:text-roseGold">WhatsApp</a>
            <a href="#" className="underline hover:text-roseGold">Instagram</a>
            <a href="#" className="underline hover:text-roseGold">Facebook</a>
            <a href="#" className="underline hover:text-roseGold">TikTok</a>
          </div>
        </div>
        <div className="rounded-[22px] overflow-hidden shadow-soft border bg-lightGray min-h-[340px] relative">
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=W2RW%2B395%20Block%20H%20North%20Nazimabad%20Town%20Karachi&output=embed"
            width="100%" height="100%" style={{border:0, minHeight:340}} loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
