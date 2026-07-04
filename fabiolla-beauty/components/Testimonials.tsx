"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Ayesha Khan", text: "Flawless gel nails and the most relaxing pedicure in Karachi. Staff is so warm!", rating: 5, img: "https://i.pravatar.cc/120?img=5" },
  { name: "Zara Ahmed", text: "My bridal makeup was perfection – stayed fresh all night. Highly recommend Fabiolla.", rating: 5, img: "https://i.pravatar.cc/120?img=32" },
  { name: "Mahnoor Ali", text: "Lash extensions looked so natural. Super hygienic, premium products. 10/10.", rating: 5, img: "https://i.pravatar.cc/120?img=29" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const next = () => setI((i+1)%testimonials.length);
  const prev = () => setI((i-1+testimonials.length)%testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-cream">
      <div className="container-lux max-w-3xl text-center">
        <p className="text-roseGold tracking-widest text-xs uppercase">Testimonials</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2 mb-10">Kind words</h2>
        <div className="relative bg-white rounded-[24px] shadow-luxury p-10">
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-lightGray"><ChevronLeft/></button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-lightGray"><ChevronRight/></button>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.25}}>
              <Image src={t.img} alt={t.name} width={72} height={72} className="rounded-full mx-auto mb-4" />
              <div className="flex justify-center text-gold mb-3">
                {Array.from({length: t.rating}).map((_,k)=><Star key={k} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg text-charcoal/80">“{t.text}”</p>
              <div className="mt-4 font-medium">{t.name}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
