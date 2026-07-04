"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop", cat: "Nail Art", alt: "Nail art" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop", cat: "Makeup", alt: "Makeup" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop", cat: "Hair Styling", alt: "Hair" },
  { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop", cat: "Makeup", alt: "Makeup look" },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1200&auto=format&fit=crop", cat: "Nail Art", alt: "Nails" },
  { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1200&auto=format&fit=crop", cat: "Salon Interior", alt: "Salon" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", cat: "Body Treatments", alt: "Spa" },
  { src: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=1200&auto=format&fit=crop", cat: "Lash Extensions", alt: "Lashes" },
];

const cats = ["All", "Nail Art", "Hair Styling", "Makeup", "Lash Extensions", "Body Treatments", "Salon Interior"];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = cat === "All" ? IMAGES : IMAGES.filter(i => i.cat === cat);

  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="container-lux">
        <div className="text-center mb-10">
          <p className="text-roseGold tracking-widest text-xs uppercase">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Recent work</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8 text-sm">
          {cats.map(c => (
            <button key={c}
              onClick={()=>setCat(c)}
              className={`px-4 py-2 rounded-full border transition ${cat === c ? "bg-roseGold text-white border-roseGold" : "bg-white border-black/10 hover:bg-blush/40"}`}
            >{c}</button>
          ))}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((img,i)=>(
            <div key={img.src+i} className="break-inside-avoid relative rounded-[18px] overflow-hidden shadow-soft group cursor-zoom-in" onClick={()=>setLightbox(img.src)}>
              <Image src={img.src} alt={img.alt} width={800} height={1000} className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              <div className="absolute bottom-3 left-3 text-[11px] bg-white/85 backdrop-blur px-2 py-1 rounded-full text-charcoal/70">{img.cat}</div>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-6" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLightbox(null)}>
            <img src={lightbox} alt="" className="max-h-[85vh] max-w-[92vw] rounded-xl shadow-luxury" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
