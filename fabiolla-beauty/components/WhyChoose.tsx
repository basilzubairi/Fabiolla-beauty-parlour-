"use client";
import { motion } from "framer-motion";
import { BadgeCheck, Droplets, ShieldCheck, Heart, Sparkles, Users, Smile } from "lucide-react";

const features = [
  { icon: BadgeCheck, title: "Certified Beauty Experts", desc: "Trained, experienced, and detail-obsessed." },
  { icon: Droplets, title: "Luxury Products", desc: "Skin-first, premium international brands." },
  { icon: ShieldCheck, title: "Hygienic Environment", desc: "Sterilized tools, fresh linens, every time." },
  { icon: Heart, title: "Relaxing Atmosphere", desc: "Calm lighting, soft music, pure me-time." },
  { icon: Sparkles, title: "Affordable Luxury", desc: "High-end results at fair prices." },
  { icon: Users, title: "Friendly Staff", desc: "Warm, welcoming, and genuinely caring." },
  { icon: Smile, title: "Personalized Care", desc: "Treatments tailored to you." },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="container-lux">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-roseGold tracking-widest text-xs uppercase">Why choose us</p>
          <h3 className="font-display text-4xl mt-2">Relax. You’re in good hands.</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((f,i)=>{
            const Icon = f.icon;
            return (
              <motion.div key={f.title}
                initial={{opacity:0, y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{delay: i*0.05}}
                className="rounded-2xl border border-black/[0.06] bg-lightGray/60 p-6"
              >
                <Icon className="text-roseGold mb-3" />
                <div className="font-medium">{f.title}</div>
                <div className="text-sm text-charcoal/65 mt-1">{f.desc}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
