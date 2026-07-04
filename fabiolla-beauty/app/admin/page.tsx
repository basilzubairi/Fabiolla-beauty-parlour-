"use client";
import { useEffect, useState } from "react";
import { bookingStore, Appointment } from "@/lib/booking-store";
import { getService } from "@/lib/services";

const ADMIN_PASS = "fabiolla2025";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [list, setList] = useState<Appointment[]>([]);
  const [q, setQ] = useState("");

  const refresh = () => setList(bookingStore.list());

  useEffect(() => {
    if (authed) refresh();
    const handler = () => refresh();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-luxury p-8 w-full max-w-sm">
          <h1 className="font-display text-2xl mb-1">Fabiolla Admin</h1>
          <p className="text-sm text-charcoal/60 mb-4">Demo password: fabiolla2025</p>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 mb-3" />
          <button onClick={()=>{ if(pw===ADMIN_PASS) setAuthed(true); else alert("Wrong password");}}
            className="w-full py-3 rounded-xl bg-roseGold text-white">Sign in</button>
          <a href="/" className="text-xs text-charcoal/60 underline mt-3 block text-center">← back to site</a>
        </div>
      </div>
    );
  }

  const filtered = list.filter(a =>
    !q || a.customerName.toLowerCase().includes(q.toLowerCase()) || a.customerPhone.includes(q)
  );

  return (
    <div className="min-h-screen bg-lightGray">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-display text-2xl">Fabiolla • Admin</div>
          <a href="/" className="text-sm underline">View site</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <input placeholder="Search by name / phone" value={q} onChange={e=>setQ(e.target.value)} className="border rounded-xl px-4 py-2 bg-white" />
          <button onClick={refresh} className="px-3 py-2 rounded-xl border bg-white text-sm">Refresh</button>
          <button onClick={()=>{
            const csv = ["id,date,time,service,customer,phone,email,status"].concat(
              filtered.map(a => [a.id,a.date,a.time,a.serviceName,a.customerName,a.customerPhone,a.customerEmail,a.status].map(v=>`"${v}"`).join(","))
            ).join("\n");
            const blob = new Blob([csv], {type:"text/csv"});
            const url = URL.createObjectURL(blob);
            const al = document.createElement("a"); al.href=url; al.download="fabiolla-bookings.csv"; al.click(); URL.revokeObjectURL(url);
          }} className="px-3 py-2 rounded-xl bg-charcoal text-white text-sm">Export CSV</button>
          <div className="text-sm text-charcoal/60 ml-auto">{filtered.length} appointments</div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left">
              <tr>
                <th className="px-4 py-3">Date / Time</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a=>{
                const svc = getService(a.serviceId);
                return (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-3 whitespace-nowrap">{a.date} · {a.time}</td>
                  <td className="px-4 py-3">{a.serviceName} <span className="text-charcoal/50">• {a.duration}m</span></td>
                  <td className="px-4 py-3">{a.customerName}</td>
                  <td className="px-4 py-3 text-charcoal/70">{a.customerPhone}<br/>{a.customerEmail}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${a.status==="confirmed" ? "bg-amber-100 text-amber-800" : a.status==="completed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                    <button onClick={()=>{bookingStore.updateStatus(a.id, "completed"); refresh();}} className="underline text-xs">Complete</button>
                    <button onClick={()=>{bookingStore.updateStatus(a.id, "cancelled"); refresh();}} className="underline text-xs">Cancel</button>
                    <button onClick={()=>{ if(confirm("Delete?")) { bookingStore.remove(a.id); refresh(); }}} className="underline text-xs text-red-600">Delete</button>
                  </td>
                </tr>
              )})}
              {filtered.length===0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-charcoal/60">No bookings yet. Book one from the main site.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-xs text-charcoal/60">
          <p><b>Backend:</b> This demo stores appointments in localStorage. For production, connect Supabase / Firebase.</p>
          <p>See <code>/lib/supabase.ts</code> for a ready-to-use adapter.</p>
        </div>
      </div>
    </div>
  );
}
