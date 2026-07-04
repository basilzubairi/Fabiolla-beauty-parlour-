"use client";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/services";
import * as Icons from "lucide-react";
import { formatPKR } from "@/lib/utils";

export default function Services({ onBook }: { onBook: (serviceId?: string) => void }) {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container-lux">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-roseGold tracking-widest text-xs uppercase">Our Services</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Curated Beauty, Perfected</h2>
          <p className="text-charcoal/65 mt-4">Hand-picked treatments using luxury products in a calm, hygienic studio.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = (Icons as any)[s.icon] || Icons.Sparkles;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-[22px] bg-white border border-black/[0.06] shadow-soft p-7 hover:shadow-luxury transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-blush/70 flex items-center justify-center text-roseGold mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-2xl">{s.name}</h3>
                <p className="text-sm text-charcoal/65 mt-2 min-h-[44px]">{s.description}</p>
                <div className="flex items-center justify-between mt-5 text-sm text-charcoal/70">
                  <span>{s.duration} min</span>
                  <span className="font-medium text-charcoal">from {formatPKR(s.price)}</span>
                </div>
                <button onClick={()=>onBook(s.id)} className="mt-4 w-full py-3 rounded-full border border-roseGold/30 text-roseGold hover:bg-blush/40 transition-colors text-sm font-medium">
                  Book Now
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
