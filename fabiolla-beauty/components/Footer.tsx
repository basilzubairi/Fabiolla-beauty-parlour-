"use client";
import { SERVICES } from "@/lib/services";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/85">
      <div className="container-lux py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-rose-gradient flex items-center justify-center text-white font-display text-lg">F</div>
            <div>
              <div className="font-display text-xl">Fabiolla</div>
              <div className="text-[10px] tracking-widest text-white/60 -mt-1">BEAUTY PARLOUR</div>
            </div>
          </div>
          <p className="text-white/60 text-sm max-w-xs">Luxury beauty & wellness in Karachi. Certified experts, premium products, personalized care.</p>
        </div>
        <div>
          <div className="font-medium mb-3">Quick Links</div>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Services</div>
          <ul className="space-y-2 text-white/70 text-sm">
            {SERVICES.slice(0,6).map(s => <li key={s.id}>{s.name}</li>)}
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Newsletter</div>
          <p className="text-white/60 text-sm mb-3">Beauty tips & exclusive offers.</p>
          <form onSubmit={e=>{e.preventDefault(); alert("Subscribed!")}} className="flex gap-2">
            <input placeholder="Email address" type="email" required className="flex-1 rounded-full px-4 py-2 text-charcoal text-sm outline-none" />
            <button className="px-4 py-2 rounded-full bg-roseGold text-sm">Join</button>
          </form>
          <div className="text-white/50 text-xs mt-6">© {new Date().getFullYear()} Fabiolla Beauty Parlour. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
