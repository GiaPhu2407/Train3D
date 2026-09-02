import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RAILWAY | Luxury Train Travel & Express Booking',
  description: 'Book premium high-speed express and luxury sleeper train tickets across Vietnam. Five-star rail hospitality, panoramic coaches, and instant digital QR boarding passes.',
  keywords: 'Vietnam train tickets, luxury train Vietnam, SE3 express, Hanoi to Da Nang train, Saigon train, high speed railway, Vietnam rail booking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${serifFont.variable} ${sansFont.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#0B0F14" />
      </head>
      <body className="bg-[#0B0F14] text-slate-100 antialiased min-h-screen font-sans selection:bg-[#C9A96E] selection:text-[#0B0F14]">
        {children}
      </body>
    </html>
  );
}
