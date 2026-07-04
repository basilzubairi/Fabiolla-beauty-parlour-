export type ServiceCategory = "Nail Services" | "Beauty Services" | "Hair" | "Body Treatments";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: number; // minutes
  price: number; // PKR starting price
  icon: string; // lucide icon name
}

export const SERVICES: Service[] = [
  // Nail Services
  { id: "manicure", name: "Manicure", category: "Nail Services", description: "Classic nourishing manicure with cuticle care and polish.", duration: 45, price: 1800, icon: "Sparkles" },
  { id: "pedicure", name: "Pedicure", category: "Nail Services", description: "Relaxing foot spa with exfoliation and polish finish.", duration: 60, price: 2200, icon: "Footprints" },
  { id: "acrylic-nails", name: "Acrylic Nails", category: "Nail Services", description: "Durable, elegant acrylic extensions shaped to perfection.", duration: 90, price: 4500, icon: "Wand2" },
  { id: "gel-nails", name: "Gel Nails", category: "Nail Services", description: "Glossy, long-lasting gel color with strengthening base.", duration: 75, price: 3500, icon: "Gem" },
  { id: "nail-art", name: "Nail Art", category: "Nail Services", description: "Bespoke nail designs – minimal to statement glam.", duration: 60, price: 2500, icon: "Palette" },

  // Beauty Services
  { id: "makeup", name: "Make-up Services", category: "Beauty Services", description: "Party / bridal makeup with premium, skin-first products.", duration: 90, price: 6500, icon: "Brush" },
  { id: "eye-lashes", name: "Eye Lashes", category: "Beauty Services", description: "Natural lash lift and curl for effortless definition.", duration: 45, price: 2000, icon: "Eye" },
  { id: "eye-lashes-tint", name: "Eye Lashes Tint", category: "Beauty Services", description: "Rich tint for darker, fuller-looking lashes.", duration: 30, price: 1500, icon: "Eye" },
  { id: "lashes-extension", name: "Lashes Extension", category: "Beauty Services", description: "Lightweight classic / volume extensions, custom mapped.", duration: 120, price: 5500, icon: "ScanEye" },

  // Hair
  { id: "hairstyling", name: "Hairstyling", category: "Hair", description: "Blowouts, waves, updos – event-ready styling.", duration: 60, price: 3000, icon: "Scissors" },

  // Body Treatments
  { id: "body-contour", name: "Body Contour", category: "Body Treatments", description: "Firming contour treatment for smooth, sculpted skin.", duration: 75, price: 6000, icon: "Waves" },
  { id: "body-polishing", name: "Body Polishing", category: "Body Treatments", description: "Full-body exfoliation and glow polish, ultra-hydrating.", duration: 90, price: 5500, icon: "Sparkles" },
  { id: "hot-stone", name: "Hot Stone Massage", category: "Body Treatments", description: "Deep-relaxing hot stone massage to melt tension.", duration: 60, price: 4800, icon: "Flame" },
];

export const SLOTS = [
  "10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM",
  "7:00 PM","8:00 PM","9:00 PM","10:00 PM"
];

export const getService = (id: string) => SERVICES.find(s => s.id === id);
