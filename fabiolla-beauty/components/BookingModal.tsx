"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { SERVICES, SLOTS, getService, Service } from "@/lib/services";
import { bookingStore, Appointment } from "@/lib/booking-store";
import { X, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { formatPKR } from "@/lib/utils";

const detailsSchema = z.object({
  customerName: z.string().min(2, "Enter your full name"),
  customerPhone: z.string().min(10, "Enter a valid phone"),
  customerEmail: z.string().email("Enter a valid email"),
  notes: z.string().optional(),
});

type DetailsInput = z.infer<typeof detailsSchema>;

export default function BookingModal({
  open, onClose, preselectedServiceId
}: { open: boolean; onClose: () => void; preselectedServiceId?: string | null }) {

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(preselectedServiceId ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);

  useEffect(() => {
    if (preselectedServiceId) setServiceId(preselectedServiceId);
  }, [preselectedServiceId, open]);

  useEffect(() => {
    if (!open) {
      // reset after close
      setTimeout(()=> {
        setStep(1); setDate(undefined); setTime(null);
        setServiceId(preselectedServiceId ?? null);
        setConfirmed(null);
        setDetails(null);
        reset({ customerName: "", customerPhone: "", customerEmail: "", notes: "" });
      }, 300);
    }
  }, [open, preselectedServiceId, reset]);

  const service: Service | undefined = serviceId ? getService(serviceId) : undefined;
  const dateStr = date ? format(date, "yyyy-MM-dd") : "";
  const bookedTimes = dateStr ? bookingStore.bookedTimes(dateStr) : [];

  const { register, handleSubmit, formState: { errors }, reset } = useForm<DetailsInput>({ resolver: zodResolver(detailsSchema) });
  const [details, setDetails] = useState<DetailsInput | null>(null);

  const canNextDate = !!date;
  const canNextTime = !!time;
  const canNextService = !!service;

  const closeAll = () => onClose();

  const submitDetails = handleSubmit((values) => {
    setDetails(values);
    setStep(5);
  });

  const onConfirm = async () => {
    if (!date || !time || !service || !details) return;
    setSubmitting(true);
    await new Promise(r=>setTimeout(r, 650)); // fetching indicator
    try {
      const appt = bookingStore.create({
        date: dateStr,
        time,
        service,
        customerName: details.customerName,
        customerPhone: details.customerPhone,
        customerEmail: details.customerEmail,
        notes: details.notes
      });
      setConfirmed(appt);
      setStep(6); // confirmation step (was 7)
    } catch (e: any) {
      alert(e.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  const icsContent = useMemo(()=>{
    if (!confirmed) return "";
    // simple ICS
    const [hRaw, period] = confirmed.time.split(" ");
    let [h,m] = hRaw.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    const d = confirmed.date.replace(/-/g,"");
    const start = `${d}T${String(h).padStart(2,"0")}${String(m).padStart(2,"0")}00`;
    const endH = h + Math.floor(confirmed.duration/60);
    const endM = m + confirmed.duration % 60;
    const end = `${d}T${String(endH).padStart(2,"0")}${String(endM).padStart(2,"0")}00`;
    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Fabiolla Beauty - ${confirmed.serviceName}
DTSTART:${start}
DTEND:${end}
DESCRIPTION:Appointment ${confirmed.id}
END:VEVENT
END:VCALENDAR`;
  }, [confirmed]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={closeAll} />
          <motion.div
            initial={{ opacity:0, y: 18, scale: .98 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y: 18, scale: .98 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-4xl bg-white rounded-[26px] shadow-luxury overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b bg-cream/60">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-roseGold">Booking</div>
                <div className="font-display text-2xl">Book your appointment</div>
              </div>
              <button onClick={closeAll} className="p-2 rounded-full hover:bg-black/5"><X/></button>
            </div>

            <div className="px-6 md:px-8 py-3 text-xs text-charcoal/60 border-b flex items-center gap-3 flex-wrap">
              {["Date","Time","Service","Details","Summary"].map((s, idx)=>{
                const stepNum = idx+1;
                const active = step === stepNum;
                const done = step > stepNum || step===6;
                return (
                  <div key={s} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${done ? "bg-roseGold text-white" : active ? "border border-roseGold text-roseGold" : "border border-black/15 text-charcoal/50"}`}>
                      {done ? <Check size={13}/> : stepNum}
                    </span>
                    <span className={active ? "text-charcoal" : ""}>{s}</span>
                    {idx < 4 && <span className="text-charcoal/30 mx-2">—</span>}
                  </div>
                )
              })}
            </div>

            <div className="overflow-auto flex-1">
              {/* Step 1 Date */}
              {step === 1 && (
                <div className="p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-8 items-start">
                  <div className="rounded-2xl border p-3 bg-white shadow-soft">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={(d)=> { setDate(d || undefined); if(d) setTimeout(()=>setStep(2), 250); }}
                      disabled={{ before: new Date(new Date().setHours(0,0,0,0)) }}
                      fromDate={new Date()}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl mb-2">Select a date</h3>
                    <p className="text-charcoal/65">Only future dates are bookable. Available dates are highlighted.</p>
                    {date && <div className="mt-4 text-sm">Selected: <b>{format(date,"EEEE, MMM d, yyyy")}</b></div>}
                    <button disabled={!canNextDate} onClick={()=>setStep(2)} className="mt-6 px-5 py-3 rounded-full bg-charcoal text-white disabled:opacity-40">Continue</button>
                  </div>
                </div>
              )}

              {/* Step 2 Time */}
              {step === 2 && (
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-3xl">Choose a time</h3>
                  <p className="text-charcoal/65 mt-1">{date ? format(date,"EEEE, MMM d") : ""} · Asia/Karachi</p>
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {SLOTS.map(slot=>{
                      const booked = bookedTimes.includes(slot);
                      const selected = time === slot;
                      return (
                        <button
                          key={slot}
                          disabled={booked}
                          onClick={()=>setTime(slot)}
                          className={`py-3 rounded-xl border text-sm transition ${
                            booked ? "bg-lightGray text-charcoal/35 border-black/5 cursor-not-allowed" :
                            selected ? "bg-roseGold text-white border-roseGold" :
                            "bg-white hover:bg-blush/40 border-black/10"
                          }`}
                        >
                          {slot}{booked && " · Booked"}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={()=>setStep(1)} className="px-5 py-3 rounded-full border">Back</button>
                    <button disabled={!canNextTime} onClick={()=>setStep(3)} className="px-5 py-3 rounded-full bg-charcoal text-white disabled:opacity-40">Continue</button>
                  </div>
                </div>
              )}

              {/* Step 3 Service */}
              {step === 3 && (
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-3xl">Select your service</h3>
                  <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[52vh] overflow-auto pr-2">
                    {SERVICES.map(s => (
                      <button key={s.id}
                        onClick={()=>setServiceId(s.id)}
                        className={`text-left p-4 rounded-2xl border transition ${serviceId===s.id ? "border-roseGold ring-2 ring-roseGold/20 bg-blush/30" : "border-black/10 hover:border-roseGold/40 bg-white"}`}
                      >
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-charcoal/65 mt-1">{s.description}</div>
                        <div className="text-xs text-charcoal/70 mt-3">{s.duration} min · from {formatPKR(s.price)}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={()=>setStep(2)} className="px-5 py-3 rounded-full border">Back</button>
                    <button disabled={!canNextService} onClick={()=>setStep(4)} className="px-5 py-3 rounded-full bg-charcoal text-white disabled:opacity-40">Continue</button>
                  </div>
                </div>
              )}

              {/* Step 4 Details */}
              {step === 4 && (
                <form onSubmit={submitDetails} className="p-6 md:p-8 max-w-xl">
                  <h3 className="font-display text-3xl">Your details</h3>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className="text-sm">Full Name</label>
                      <input {...register("customerName")} className="mt-1 w-full border rounded-xl px-4 py-3 outline-none focus:border-roseGold" placeholder="Ayesha Khan"/>
                      {errors.customerName && <p className="text-xs text-red-600 mt-1">{errors.customerName.message}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm">Mobile Number</label>
                        <input {...register("customerPhone")} className="mt-1 w-full border rounded-xl px-4 py-3 outline-none focus:border-roseGold" placeholder="+92 3xx xxxxxxx"/>
                        {errors.customerPhone && <p className="text-xs text-red-600 mt-1">{errors.customerPhone.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm">Email Address</label>
                        <input {...register("customerEmail")} type="email" className="mt-1 w-full border rounded-xl px-4 py-3 outline-none focus:border-roseGold" placeholder="you@email.com"/>
                        {errors.customerEmail && <p className="text-xs text-red-600 mt-1">{errors.customerEmail.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">Notes (optional)</label>
                      <textarea {...register("notes")} rows={3} className="mt-1 w-full border rounded-xl px-4 py-3 outline-none focus:border-roseGold" placeholder="Allergies, preferences, etc."/>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button type="button" onClick={()=>setStep(3)} className="px-5 py-3 rounded-full border">Back</button>
                    <button type="submit" className="px-5 py-3 rounded-full bg-charcoal text-white">Review booking</button>
                  </div>
                </form>
              )}

              {/* Step 5 Summary */}
              {step === 5 && details && (
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-3xl">Booking summary</h3>
                  <div className="mt-5 bg-cream rounded-2xl p-6 text-[15px] max-w-xl space-y-2">
                    <div className="flex justify-between py-2 border-b border-black/10"><span className="text-charcoal/60">Service</span><span className="font-medium">{service?.name}</span></div>
                    <div className="flex justify-between py-2 border-b border-black/10"><span className="text-charcoal/60">Date</span><span className="font-medium">{date ? format(date,"EEE, MMM d, yyyy") : ""}</span></div>
                    <div className="flex justify-between py-2 border-b border-black/10"><span className="text-charcoal/60">Time</span><span className="font-medium">{time}</span></div>
                    <div className="flex justify-between py-2 border-b border-black/10"><span className="text-charcoal/60">Customer</span><span className="font-medium">{details.customerName}</span></div>
                    <div className="flex justify-between py-2"><span className="text-charcoal/60">Duration</span><span className="font-medium">{service?.duration} min</span></div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={()=>setStep(4)} className="px-5 py-3 rounded-full border">Edit booking</button>
                    <button onClick={onConfirm} disabled={submitting} className="px-5 py-3 rounded-full bg-roseGold text-white min-w-[190px] flex items-center justify-center gap-2">
                      {submitting && <Loader2 className="animate-spin" size={18}/>}
                      {submitting ? "Confirming..." : "Confirm Appointment"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6 Confirmation */}
              {step === 6 && confirmed && (
                <div className="p-8 md:p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4">
                    <Check />
                  </div>
                  <h3 className="font-display text-3xl">Your appointment is booked!</h3>
                  <p className="text-charcoal/70 mt-2">Booking ref: <b>{confirmed.id}</b></p>
                  <div className="mt-4 text-sm text-charcoal/80">
                    {confirmed.serviceName} · {confirmed.date} at {confirmed.time}
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center mt-6 text-sm">
                    <a
                      className="px-4 py-2 rounded-full border hover:bg-lightGray"
                      href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`}
                      download={`fabiolla-${confirmed.id}.ics`}
                    >Add to Apple Calendar</a>
                    <a
                      className="px-4 py-2 rounded-full border hover:bg-lightGray"
                      target="_blank"
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Fabiolla Beauty - "+confirmed.serviceName)}&dates=${confirmed.date.replace(/-/g,"")}T100000/${confirmed.date.replace(/-/g,"")}T110000&details=Booking%20${confirmed.id}`}
                      rel="noreferrer"
                    >Add to Google Calendar</a>
                    <button
                      onClick={()=>{
                        const blob = new Blob([`Fabiolla Beauty Parlour\nBooking ${confirmed.id}\n${confirmed.serviceName}\n${confirmed.date} ${confirmed.time}\n${confirmed.customerName}`], {type:"text/plain"});
                        const url = URL.createObjectURL(blob);
                        const a = Object.assign(document.createElement("a"), { href: url, download: `fabiolla-confirmation-${confirmed.id}.txt`});
                        a.click(); URL.revokeObjectURL(url);
                      }}
                      className="px-4 py-2 rounded-full border hover:bg-lightGray"
                    >Download confirmation</button>
                    <a className="px-4 py-2 rounded-full bg-green-600 text-white" target="_blank" href={`https://wa.me/922136647157?text=${encodeURIComponent(`Hi Fabiolla! I just booked ${confirmed.serviceName} on ${confirmed.date} at ${confirmed.time}. Ref ${confirmed.id}`)}`}>WhatsApp confirmation</a>
                  </div>
                  <p className="text-xs text-charcoal/60 mt-5">A confirmation email will be sent to {confirmed.customerEmail}.</p>
                  <button onClick={closeAll} className="mt-6 px-5 py-3 rounded-full bg-charcoal text-white">Done</button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
