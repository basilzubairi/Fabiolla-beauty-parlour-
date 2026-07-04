import type { Metadata } from "next";
import { Playfair_Display, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-poppins" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fabiolla Beauty Parlour | Luxury Beauty & Wellness in Karachi",
  description: "Experience luxury beauty like never before. Professional beauty treatments, expert stylists, premium products, and personalized care at Fabiolla Beauty Parlour.",
  keywords: ["beauty salon Karachi", "makeup artist", "nail art", "hair styling", "body treatments", "Fabiolla Beauty"],
  openGraph: {
    title: "Fabiolla Beauty Parlour",
    description: "Luxury beauty treatments in a relaxing, elegant environment.",
    type: "website",
    url: "https://fabiollabeauty.com",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabiolla Beauty Parlour",
    description: "Luxury beauty treatments in a relaxing, elegant environment.",
  },
  metadataBase: new URL("https://fabiollabeauty.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${poppins.variable} ${inter.variable} font-sans bg-white text-charcoal`}>
        {children}
        <Toaster richColors position="top-center" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Fabiolla Beauty Parlour",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "W2RW+395, Block H North Nazimabad Town",
                "addressLocality": "Karachi",
                "addressCountry": "PK"
              },
              "telephone": "+92-21-36647157",
              "url": "https://fabiollabeauty.com",
              "priceRange": "$$",
              "openingHours": "Mo-Su 10:00-23:00"
            })
          }}
        />
      </body>
    </html>
  );
}
