"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Page() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  const openBooking = (serviceId?: string) => {
    setPreselectedService(serviceId ?? null);
    setBookingOpen(true);
  };

  return (
    <>
      <Header onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <About />
        <Services onBook={openBooking} />
        <WhyChoose />
        <Gallery />
        <Pricing onBook={openBooking} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BookingModal open={bookingOpen} onClose={()=>setBookingOpen(false)} preselectedServiceId={preselectedService} />
      {/* Floating Book Button for mobile */}
      <button
        onClick={()=>openBooking()}
        className="fixed bottom-5 right-5 z-40 px-5 py-3 rounded-full bg-roseGold text-white shadow-luxury sm:hidden"
      >Book</button>
    </>
  );
}
