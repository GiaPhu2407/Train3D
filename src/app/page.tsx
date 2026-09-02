'use client';

import React, { useState } from 'react';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PopularRoutes } from '@/components/sections/PopularRoutes';
import { TrainTypes } from '@/components/sections/TrainTypes';
import { RailwayMapSection } from '@/components/sections/RailwayMapSection';
import { Destinations } from '@/components/sections/Destinations';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaSection } from '@/components/sections/CtaSection';
import { BookingFlowModal } from '@/components/booking/BookingFlowModal';
import { Language } from '@/lib/translations';
import { Currency } from '@/lib/utils';
import { BookingSearchQuery } from '@/lib/types';
import { soundFx } from '@/lib/audio';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('VND');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<BookingSearchQuery | null>(null);

  // Handle Search Submission from Hero or Route selection
  const handleSearch = (query: BookingSearchQuery) => {
    setSearchQuery(query);
    setIsBookingModalOpen(true);
  };

  // Quick Book direct from Popular Routes
  const handleSelectPopularRoute = (fromCode: string, toCode: string) => {
    setSearchQuery({
      tripType: 'one_way',
      fromStationId: fromCode,
      toStationId: toCode,
      departureDate: '2026-09-12',
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: 'all',
    });
    setIsBookingModalOpen(true);
  };

  // Quick Book from Railway Map Station
  const handleBookFromStation = (stationCode: string) => {
    const defaultTo = stationCode === 'DAD' ? 'SGN' : 'DAD';
    setSearchQuery({
      tripType: 'one_way',
      fromStationId: stationCode,
      toStationId: defaultTo,
      departureDate: '2026-09-12',
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: 'all',
    });
    setIsBookingModalOpen(true);
  };

  // Quick Book to Destination
  const handleBookToDestination = (stationCode: string) => {
    const defaultFrom = stationCode === 'HAN' ? 'SGN' : 'HAN';
    setSearchQuery({
      tripType: 'one_way',
      fromStationId: defaultFrom,
      toStationId: stationCode,
      departureDate: '2026-09-12',
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: 'all',
    });
    setIsBookingModalOpen(true);
  };

  const handleOpenGenericBooking = () => {
    soundFx.playDepartureChime();
    setSearchQuery({
      tripType: 'one_way',
      fromStationId: 'HAN',
      toStationId: 'DAD',
      departureDate: '2026-09-12',
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: 'all',
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-100 flex flex-col selection:bg-[#C9A96E] selection:text-[#0B0F14]">
      {/* 1. Cinematic Golden Track Loading Screen */}
      <LoadingScreen />

      {/* 2. Sticky Glass Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={handleOpenGenericBooking}
      />

      {/* 3. Hero Section with 3D Three.js Train & Floating Search Card */}
      <main className="flex-1">
        <HeroSection
          currentLang={currentLang}
          onSearch={handleSearch}
          onOpenBooking={handleOpenGenericBooking}
        />

        {/* 4. Popular Journeys */}
        <PopularRoutes
          currentLang={currentLang}
          currency={currentCurrency}
          onSelectRoute={handleSelectPopularRoute}
        />

        {/* 5. Train Types & Fleet Showcase (3D Tilt Cards) */}
        <TrainTypes
          currentLang={currentLang}
          onOpenBooking={handleOpenGenericBooking}
        />

        {/* 6. Interactive Vietnam Railway Map (Traveling Train & Station Nodes) */}
        <RailwayMapSection
          currentLang={currentLang}
          currency={currentCurrency}
          onBookFromStation={handleBookFromStation}
        />

        {/* 7. Discover Vietnam by Rail (Destinations Gallery) */}
        <Destinations
          currentLang={currentLang}
          currency={currentCurrency}
          onBookToDestination={handleBookToDestination}
        />

        {/* 8. Why Book With Us? (4 Luxury Trust Pillars) */}
        <WhyChooseUs currentLang={currentLang} />

        {/* 9. Animated 4-Step Journey Timeline */}
        <JourneyTimeline currentLang={currentLang} />

        {/* 10. Passenger Stories & Testimonial Carousel */}
        <Testimonials currentLang={currentLang} />

        {/* 11. Cinematic Night Railway CTA */}
        <CtaSection
          currentLang={currentLang}
          onOpenBooking={handleOpenGenericBooking}
        />
      </main>

      {/* 12. Multi-column Luxury Footer */}
      <Footer currentLang={currentLang} />

      {/* 13. Interactive 8-Step Booking Flow Modal Engine */}
      <BookingFlowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        searchQuery={searchQuery}
        currency={currentCurrency}
        onResetSearch={() => setSearchQuery(null)}
      />
    </div>
  );
}
