"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="container-lux grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} className="relative">
          <div className="rounded-[28px] overflow-hidden shadow-luxury aspect-[4/5] relative bg-white">
            <Image src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop" alt="Fabiolla salon" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft px-6 py-4 border">
            <div className="text-sm text-charcoal/60">Est. 2018</div>
            <div className="font-display text-2xl text-roseGold">Karachi</div>
          </div>
        </motion.div>
        <div>
          <p className="text-roseGold tracking-widest text-xs uppercase">About Fabiolla</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Beauty with intention</h2>
          <p className="text-charcoal/70 mt-5 leading-relaxed">
            Fabiolla Beauty Parlour blends modern techniques with a warm, relaxing atmosphere.
            Every visit is tailored to you — from skin-first makeup to sculptural nails and restorative body treatments.
            We use certified, premium products, maintain strict hygiene standards, and take time to get the details right.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8 text-sm">
            {[
              "Certified beauty experts",
              "Luxury, skin-safe products",
              "Immaculate hygiene",
              "Personalized care plans",
            ].map(t=>(
              <div key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" />{t}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
