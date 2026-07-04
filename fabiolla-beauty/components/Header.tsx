"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all",
      scrolled ? "bg-white/85 glass shadow-soft" : "bg-transparent"
    )}>
      <div className="container-lux h-[78px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-rose-gradient flex items-center justify-center text-white font-display text-lg">F</div>
          <div className="leading-tight">
            <div className="font-display text-[20px] text-charcoal">Fabiolla</div>
            <div className="text-[10px] tracking-widest text-roseGold -mt-1">BEAUTY PARLOUR</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] text-charcoal/80">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-roseGold transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onBook}
            className="hidden sm:block px-5 py-3 rounded-full bg-roseGold text-white text-sm font-medium shadow-luxury hover:opacity-95 transition-opacity"
          >
            Book Appointment
          </button>
          <button className="lg:hidden p-2" onClick={()=>setOpen(!open)} aria-label="Menu">
            {open ? <X/> : <Menu/>}
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="lg:hidden bg-white border-t shadow-soft">
          <div className="container-lux py-4 flex flex-col gap-4">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="text-charcoal/80">{l.label}</a>
            ))}
            <button onClick={()=>{onBook(); setOpen(false)}} className="mt-2 px-5 py-3 rounded-full bg-roseGold text-white font-medium">Book Appointment</button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
