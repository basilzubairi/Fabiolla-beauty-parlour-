# Fabiolla Beauty Parlour – Premium Website

World-class, luxury, fully responsive Next.js 15 site for Fabiolla Beauty Parlour (Karachi).

Built with: Next.js 15, React 19, Tailwind CSS, TypeScript, Framer Motion, React Hook Form + Zod, React Day Picker, Lucide Icons, Sonner.

## Features

- Luxury feminine UI: cream / blush / rose gold / gold palette, Playfair Display + Poppins
- Sticky transparent nav with persistent "Book Appointment" CTA
- Full-screen hero with floating accents
- Services (13 services across 4 categories), Pricing, Gallery with lightbox & filters, Testimonials carousel, Why Choose Us
- Contact section with Google Maps embed, WhatsApp / Instagram / Facebook / TikTok
- **Booking Modal – 7-step flow:**
  1. Calendar (future dates only)
  2. Time slots (booked slots auto-hide, prevents double bookings)
  3. Service selection with duration & price
  4. Customer details with Zod validation
  5. Booking summary
  6. Confirmation with success animation
  7. Post-confirm: booking ref, Add to Google/Apple Calendar, download confirmation, WhatsApp share, email notice
- Admin Dashboard at `/admin` (demo password: `fabiolla2025`)
  - View/search bookings
  - Mark completed / cancelled
  - Export CSV
  - Delete bookings
- SEO: metadata, Open Graph, Twitter Cards, Schema.org BeautySalon JSON-LD, semantic HTML, WCAG-friendly contrast
- Fully responsive, smooth Framer Motion animations throughout

## Getting started

```bash
npm install
npm run dev
```
Open http://localhost:3000

Admin: http://localhost:3000/admin — password `fabiolla2025`

## Booking backend

Demo uses `localStorage` with race-condition protection to prevent double bookings.

Production: see `lib/supabase.ts` for a drop-in Supabase adapter with:
- Postgres appointments table with UNIQUE(date,time) constraint
- Email confirmations via Resend / Supabase Edge Functions
- SMS/WhatsApp confirmations via Twilio / Meta API

Swap `bookingStore` imports for `supabaseBookingStore`.

## Customize

- Services / pricing: `lib/services.ts`
- Business hours / slots: `SLOTS` in `lib/services.ts`
- Colors / fonts: `tailwind.config.ts` and `app/globals.css`
- Contact info: `components/Contact.tsx` and `components/Footer.tsx`
- Gallery images: `components/Gallery.tsx`

## Deploy

Vercel, one-click:
```
vercel
```

Set `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` in environment variables when connecting to Supabase.

---

© Fabiolla Beauty Parlour
