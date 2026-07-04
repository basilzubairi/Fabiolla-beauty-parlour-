import { Service } from "./services";

export type Appointment = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  serviceId: string;
  serviceName: string;
  duration: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

const STORAGE_KEY = "fabiolla_appointments_v1";

function read(): Appointment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function write(list: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

export const bookingStore = {
  list(): Appointment[] {
    return read().sort((a,b) => (a.date+a.time > b.date+b.time ? 1 : -1));
  },
  bookedTimes(date: string): string[] {
    return read().filter(a => a.date === date && a.status !== "cancelled").map(a => a.time);
  },
  isBooked(date: string, time: string): boolean {
    return read().some(a => a.date === date && a.time === time && a.status !== "cancelled");
  },
  create(input: Omit<Appointment, "id"|"createdAt"|"status"|"serviceName"|"duration"> & { service: Service }): Appointment {
    const all = read();
    if (all.some(a => a.date === input.date && a.time === input.time && a.status !== "cancelled")) {
      throw new Error("This time slot was just booked. Please choose another.");
    }
    const appt: Appointment = {
      id: "FB-" + Math.random().toString(36).slice(2,8).toUpperCase(),
      date: input.date,
      time: input.time,
      serviceId: input.service.id,
      serviceName: input.service.name,
      duration: input.service.duration,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      notes: input.notes,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    all.push(appt);
    write(all);
    return appt;
  },
  updateStatus(id: string, status: Appointment["status"]) {
    const all = read().map(a => a.id === id ? { ...a, status } : a);
    write(all);
  },
  remove(id: string) {
    write(read().filter(a => a.id !== id));
  },
  clearAll() {
    write([]);
  }
};

// Supabase adapter stub - drop-in replacement
// To use Supabase:
// 1. npm i @supabase/supabase-js
// 2. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// 3. Create table appointments with matching columns
// 4. Replace bookingStore calls with supabase queries
// See /lib/supabase.ts for a ready adapter
