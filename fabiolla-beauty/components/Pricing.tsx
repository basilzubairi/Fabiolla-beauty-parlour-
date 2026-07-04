"use client";
import { SERVICES } from "@/lib/services";
import { formatPKR } from "@/lib/utils";

export default function Pricing({ onBook }: { onBook: (serviceId?: string) => void }) {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container-lux">
        <div className="text-center mb-12">
          <p className="text-roseGold tracking-widest text-xs uppercase">Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Transparent, fair</h2>
          <p className="text-charcoal/65 mt-3">Starting prices — final quote may vary by length/detail.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(s => (
            <div key={s.id} className="rounded-[20px] border border-black/[0.07] p-6 bg-white shadow-soft flex flex-col">
              <div className="text-sm text-charcoal/60">{s.category}</div>
              <div className="font-display text-2xl mt-1">{s.name}</div>
              <div className="text-sm text-charcoal/65 mt-2 flex-1">{s.description}</div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-charcoal/70">{s.duration} min</span>
                <span className="font-medium">{formatPKR(s.price)}</span>
              </div>
              <button onClick={()=>onBook(s.id)} className="mt-4 py-3 rounded-full bg-charcoal text-white text-sm hover:opacity-90">Book</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
