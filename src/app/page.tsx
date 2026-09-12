"use client";

import React, { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PopularRoutes } from "@/components/sections/PopularRoutes";
import { TrainTypes } from "@/components/sections/TrainTypes";
import { RailwayMapSection } from "@/components/sections/RailwayMapSection";
import { Destinations } from "@/components/sections/Destinations";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";
import { VercelUpdateNotification } from "@/components/common/VercelUpdateNotification";
import { V2NewExperience } from "@/components/v2/V2NewExperience";
import { TicketLookupModal } from "@/components/v2/TicketLookupModal";
import { FareCalendarModal } from "@/components/v2/FareCalendarModal";
import { Language } from "@/lib/translations";
import { Currency } from "@/lib/utils";
import { BookingSearchQuery } from "@/lib/types";
import { soundFx } from "@/lib/audio";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>("VI");
  const [currentCurrency, setCurrentCurrency] = useState<Currency>("VND");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<BookingSearchQuery | null>(
    null,
  );

  // V2 New Experience State
  const [isV2Active, setIsV2Active] = useState<boolean>(false);
  const [isTicketLookupOpen, setIsTicketLookupOpen] = useState<boolean>(false);
  const [isFareCalendarOpen, setIsFareCalendarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Check saved V2 preference from localStorage
  // Check saved V2 preference and theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("railway_v2_active");
    if (saved === "true") {
      setIsV2Active(true);
    }
    const savedTheme = localStorage.getItem("railway_theme") as
      | "dark"
      | "light"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleActivateV2 = () => {
    setIsV2Active(true);
  };

  const handleToggleV2 = (val: boolean) => {
    setIsV2Active(val);
    localStorage.setItem("railway_v2_active", val ? "true" : "false");
  };

  const handleToggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("railway_theme", next);
  };

  // Handle Search Submission from Hero or Route selection
  const handleSearch = (query: BookingSearchQuery) => {
    setSearchQuery(query);
    setIsBookingModalOpen(true);
  };

  // Quick Book direct from Popular Routes
  const handleSelectPopularRoute = (fromCode: string, toCode: string) => {
    setSearchQuery({
      tripType: "one_way",
      fromStationId: fromCode,
      toStationId: toCode,
      departureDate: "2026-09-15",
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: "all",
    });
    setIsBookingModalOpen(true);
  };

  // Quick Book from Railway Map Station
  const handleBookFromStation = (stationCode: string) => {
    const defaultTo = stationCode === "DAD" ? "SGN" : "DAD";
    setSearchQuery({
      tripType: "one_way",
      fromStationId: stationCode,
      toStationId: defaultTo,
      departureDate: "2026-09-15",
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: "all",
    });
    setIsBookingModalOpen(true);
  };

  // Quick Book to Destination
  const handleBookToDestination = (stationCode: string) => {
    const defaultFrom = stationCode === "HAN" ? "SGN" : "HAN";
    setSearchQuery({
      tripType: "one_way",
      fromStationId: defaultFrom,
      toStationId: stationCode,
      departureDate: "2026-09-15",
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: "all",
    });
    setIsBookingModalOpen(true);
  };

  const handleOpenGenericBooking = () => {
    soundFx.playDepartureChime();
    setSearchQuery({
      tripType: "one_way",
      fromStationId: "HAN",
      toStationId: "DAD",
      departureDate: "2026-09-15",
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: "all",
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "light"
          ? "bg-[#F4F6F9] text-slate-900"
          : "bg-[#070A0E] text-slate-100"
      } flex flex-col selection:bg-[#D8B978] selection:text-[#0B0F14]`}
    >
      {/* 1. Cinematic Loading Screen */}
      <LoadingScreen />

      {/* 2. Vercel Update Notification & Auto-detection Engine */}
      <VercelUpdateNotification
        isV2Active={isV2Active}
        onActivateV2={handleActivateV2}
        onToggleV2={handleToggleV2}
      />

      {/* 3. Sticky Glass Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={handleOpenGenericBooking}
        onOpenTicketLookup={() => setIsTicketLookupOpen(true)}
        onOpenFareCalendar={() => setIsFareCalendarOpen(true)}
        isV2Active={isV2Active}
        onTriggerUpdate={handleActivateV2}
        onToggleV2={handleToggleV2}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 4. MAIN CONTENT: V2 NEW EXPERIENCE vs CLASSIC V1 */}
      {isV2Active ? (
        <main className="flex-1">
          {/* New V2 Luxury Experience with Live Radar, Cabin 360°, Dining, and Quick Booking */}
          <V2NewExperience onOpenClassicBooking={handleOpenGenericBooking} />

          {/* Connected Popular Journeys */}
          <PopularRoutes
            currentLang={currentLang}
            currency={currentCurrency}
            onSelectRoute={handleSelectPopularRoute}
          />

          {/* Interactive Vietnam Railway Map */}
          <RailwayMapSection
            currentLang={currentLang}
            currency={currentCurrency}
            onBookFromStation={handleBookFromStation}
          />

          {/* Discover Vietnam by Rail */}
          <Destinations
            currentLang={currentLang}
            currency={currentCurrency}
            onBookToDestination={handleBookToDestination}
          />

          {/* Passenger Stories & Testimonial Carousel */}
          <Testimonials currentLang={currentLang} />

          {/* Cinematic Night Railway CTA */}
          <CtaSection
            currentLang={currentLang}
            onOpenBooking={handleOpenGenericBooking}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Classic Hero Section with 3D Three.js Train */}
          <HeroSection
            currentLang={currentLang}
            onSearch={handleSearch}
            onOpenBooking={handleOpenGenericBooking}
          />

          {/* Popular Journeys */}
          <PopularRoutes
            currentLang={currentLang}
            currency={currentCurrency}
            onSelectRoute={handleSelectPopularRoute}
          />

          {/* Train Types & Fleet Showcase */}
          <TrainTypes
            currentLang={currentLang}
            onOpenBooking={handleOpenGenericBooking}
          />

          {/* Interactive Vietnam Railway Map */}
          <RailwayMapSection
            currentLang={currentLang}
            currency={currentCurrency}
            onBookFromStation={handleBookFromStation}
          />

          {/* Discover Vietnam by Rail */}
          <Destinations
            currentLang={currentLang}
            currency={currentCurrency}
            onBookToDestination={handleBookToDestination}
          />

          {/* 4 Luxury Trust Pillars */}
          <WhyChooseUs currentLang={currentLang} />

          {/* Animated 4-Step Journey Timeline */}
          <JourneyTimeline currentLang={currentLang} />

          {/* Passenger Stories & Testimonial Carousel */}
          <Testimonials currentLang={currentLang} />

          {/* Cinematic Night Railway CTA */}
          <CtaSection
            currentLang={currentLang}
            onOpenBooking={handleOpenGenericBooking}
          />
        </main>
      )}

      {/* 5. Luxury Footer */}
      <Footer currentLang={currentLang} />

      {/* 6. Booking Flow Modal Engine */}
      <BookingFlowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        searchQuery={searchQuery}
        currency={currentCurrency}
        onResetSearch={() => setSearchQuery(null)}
      />

      {/* 7. Standalone Ticket Lookup & QR Modal */}
      <TicketLookupModal
        isOpen={isTicketLookupOpen}
        onClose={() => setIsTicketLookupOpen(false)}
      />

      {/* 8. Standalone Fare Calendar Modal */}
      <FareCalendarModal
        isOpen={isFareCalendarOpen}
        onClose={() => setIsFareCalendarOpen(false)}
        onSelectDate={(d) => {
          setIsFareCalendarOpen(false);
          handleOpenGenericBooking();
        }}
      />
    </div>
  );
}
