"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center bg-cream overflow-hidden">
      {/* soft background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop"
          alt="Luxury salon"
          fill
          priority
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/92 to-cream/60" />
      </div>

      {/* floating blush orbs */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-32 w-28 h-28 rounded-full bg-blush/70 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: .8 }}
        className="absolute right-[18%] bottom-28 w-20 h-20 rounded-full bg-roseGold/15 blur-xl"
      />

      <div className="container-lux relative pt-28 pb-20">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-roseGold tracking-widest text-xs uppercase mb-4"
          >
            Karachi • Luxury Beauty & Wellness
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-5xl md:text-7xl leading-[1.05] text-charcoal"
          >
            Experience Luxury<br/>Beauty Like<br/>Never Before
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-lg text-charcoal/70 max-w-xl"
          >
            Professional beauty treatments, expert stylists, premium products, and personalized care — all in one destination.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button
              onClick={onBook}
              className="px-7 py-4 rounded-full bg-roseGold text-white font-medium shadow-luxury hover:translate-y-[-1px] transition-transform"
            >
              Book Appointment
            </button>
            <a href="#services" className="px-7 py-4 rounded-full border border-charcoal/15 bg-white/70 hover:bg-white transition-colors font-medium">
              Explore Services
            </a>
          </motion.div>

          <div className="mt-10 flex gap-10 text-sm text-charcoal/60">
            <div><div className="font-display text-2xl text-charcoal">4.9★</div>1,200+ happy clients</div>
            <div><div className="font-display text-2xl text-charcoal">Certified</div>Expert beauticians</div>
            <div><div className="font-display text-2xl text-charcoal">Premium</div>Luxury products</div>
          </div>
        </div>
      </div>
    </section>
  );
}
