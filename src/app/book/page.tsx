'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookingSearchBox } from '@/components/booking/BookingSearchBox';
import { BookingFlowModal } from '@/components/booking/BookingFlowModal';
import { Language } from '@/lib/translations';
import { Currency } from '@/lib/utils';
import { BookingSearchQuery } from '@/lib/types';
import { Train, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export default function BookPage() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('VND');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<BookingSearchQuery | null>(null);

  const handleSearch = (query: BookingSearchQuery) => {
    setSearchQuery(query);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070A0E] text-slate-100 flex flex-col">
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={() => setIsModalOpen(true)}
      />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#D8B978] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#C9A96E]/30 text-[11px] font-mono font-bold text-[#D8B978] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Seat Allocation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white">
            Reserve Your Luxury Train Ticket
          </h1>
          <p className="text-sm text-slate-400">
            Choose your route, departure date, and cabin tier across Vietnam’s premier rail network.
          </p>
        </div>

        {/* Search Box Widget */}
        <BookingSearchBox currentLang={currentLang} onSearch={handleSearch} />

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-xs text-slate-400">
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D8B978] shrink-0" />
            <span>Official Vietnam Railways e-ticket with instant QR barcode issuance</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 flex items-center gap-3">
            <Train className="w-5 h-5 text-[#D8B978] shrink-0" />
            <span>Live interactive train coach seat selection with window guarantee</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#D8B978] shrink-0" />
            <span>Flexible cancellation & 24/7 dedicated bilingual rail concierge</span>
          </div>
        </div>
      </main>

      <Footer currentLang={currentLang} />

      <BookingFlowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchQuery={searchQuery}
        currency={currentCurrency}
        onResetSearch={() => setSearchQuery(null)}
      />
    </div>
  );
}
