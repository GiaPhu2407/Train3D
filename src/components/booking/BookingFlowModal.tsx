'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { TrainSearchResults } from './TrainSearchResults';
import { ClassSelector } from './ClassSelector';
import { SeatSelector } from './SeatSelector';
import { PassengerForm } from './PassengerForm';
import { PaymentSimulator } from './PaymentSimulator';
import { LuxuryTicketCard } from './LuxuryTicketCard';
import { BookingState, BookingSearchQuery, TrainSchedule, CabinClassType, Seat, Passenger, AddOnItem } from '@/lib/types';
import { TRAIN_SCHEDULES } from '@/data/trains';
import { STATIONS } from '@/data/stations';
import { generatePNR, Currency } from '@/lib/utils';
import { soundFx } from '@/lib/audio';

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: BookingSearchQuery | null;
  currency: Currency;
  onResetSearch: () => void;
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  currency,
  onResetSearch,
}) => {
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1, // 1: Search Results, 2: Class Select, 3: Seat Select, 4: Passenger Info, 5: Payment, 6: Confirmation
    searchQuery: searchQuery || {
      tripType: 'one_way',
      fromStationId: 'HAN',
      toStationId: 'DAD',
      departureDate: '2026-09-12',
      passengersCount: { adults: 1, children: 0, seniors: 0 },
      preferredClass: 'all',
    },
    selectedTrain: null,
    selectedClass: null,
    selectedSeats: [],
    passengers: [],
    addOns: [],
    paymentMethod: null,
    bookingReference: null,
    bookingTimestamp: null,
    totalPrice: 0,
  });

  useEffect(() => {
    if (searchQuery) {
      setBookingState((prev) => ({
        ...prev,
        searchQuery,
        step: 1,
      }));
    }
  }, [searchQuery]);

  const fromStation = STATIONS.find((s) => s.id === bookingState.searchQuery.fromStationId) || STATIONS[0];
  const toStation = STATIONS.find((s) => s.id === bookingState.searchQuery.toStationId) || STATIONS[5];

  const totalPassengers =
    bookingState.searchQuery.passengersCount.adults +
    bookingState.searchQuery.passengersCount.children +
    bookingState.searchQuery.passengersCount.seniors;

  // Filter trains based on stations
  const availableTrains = TRAIN_SCHEDULES.filter((train) => {
    // Return all or filtered
    return true;
  });

  const handleSelectTrain = (train: TrainSchedule) => {
    setBookingState((prev) => ({
      ...prev,
      selectedTrain: train,
      selectedClass: train.classes[0]?.id || 'soft_seat',
      step: 2,
    }));
  };

  const handleSelectClass = (classId: CabinClassType) => {
    setBookingState((prev) => ({
      ...prev,
      selectedClass: classId,
    }));
  };

  const handleClassContinue = () => {
    setBookingState((prev) => ({
      ...prev,
      step: 3,
    }));
  };

  const handleSeatsChange = (seats: Seat[]) => {
    setBookingState((prev) => ({
      ...prev,
      selectedSeats: seats,
    }));
  };

  const handleSeatContinue = () => {
    setBookingState((prev) => ({
      ...prev,
      step: 4,
    }));
  };

  const handlePassengerSubmit = (passengers: Passenger[], addOns: AddOnItem[]) => {
    const seatSum = bookingState.selectedSeats.reduce((acc, s) => acc + s.price, 0);
    const addOnSum = addOns.reduce((acc, a) => acc + a.price, 0);

    setBookingState((prev) => ({
      ...prev,
      passengers,
      addOns,
      totalPrice: seatSum + addOnSum,
      step: 5,
    }));
  };

  const handlePaymentSuccess = (method: 'credit_card' | 'vnpay_qr' | 'momo' | 'bank_transfer') => {
    const pnr = generatePNR();
    setBookingState((prev) => ({
      ...prev,
      paymentMethod: method,
      bookingReference: pnr,
      bookingTimestamp: new Date().toISOString(),
      step: 6,
    }));
  };

  const handleReset = () => {
    onClose();
    onResetSearch();
  };

  const stepTitles = [
    'Train Selection',
    'Cabin Class',
    'Seat Selection',
    'Passenger Details',
    'Payment',
    'E-Ticket Confirmation',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      title={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 text-[#D8B978] flex items-center justify-center font-mono font-bold text-xs">
            0{bookingState.step}
          </div>
          <div>
            <span className="text-xs text-slate-400 font-mono block">BOOKING STEP {bookingState.step} OF 6</span>
            <span className="text-lg md:text-xl font-serif font-bold text-white">
              {stepTitles[bookingState.step - 1]}
            </span>
          </div>
        </div>
      }
    >
      {/* Progress Track */}
      <div className="relative w-full h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#8C6E38] via-[#F3E5AB] to-[#C9A96E] transition-all duration-500 ease-out"
          style={{ width: `${(bookingState.step / 6) * 100}%` }}
        />
      </div>

      {/* Step 1: Train Search Results */}
      {bookingState.step === 1 && (
        <TrainSearchResults
          trains={availableTrains}
          onSelectTrain={handleSelectTrain}
          currency={currency}
          fromName={fromStation.city}
          toName={toStation.city}
        />
      )}

      {/* Step 2: Class Selection */}
      {bookingState.step === 2 && bookingState.selectedTrain && (
        <ClassSelector
          train={bookingState.selectedTrain}
          selectedClass={bookingState.selectedClass}
          onSelectClass={handleSelectClass}
          onContinue={handleClassContinue}
          onBack={() => setBookingState((prev) => ({ ...prev, step: 1 }))}
          currency={currency}
        />
      )}

      {/* Step 3: Interactive Seat Selection */}
      {bookingState.step === 3 && bookingState.selectedTrain && bookingState.selectedClass && (
        <SeatSelector
          classType={bookingState.selectedClass}
          passengerCount={totalPassengers}
          selectedSeats={bookingState.selectedSeats}
          onSeatsChange={handleSeatsChange}
          onContinue={handleSeatContinue}
          onBack={() => setBookingState((prev) => ({ ...prev, step: 2 }))}
          currency={currency}
          trainName={bookingState.selectedTrain.name}
        />
      )}

      {/* Step 4: Passenger Information & Add-ons */}
      {bookingState.step === 4 && (
        <PassengerForm
          seats={bookingState.selectedSeats}
          passengers={bookingState.passengers}
          addOns={bookingState.addOns}
          onPassengersSubmit={handlePassengerSubmit}
          onBack={() => setBookingState((prev) => ({ ...prev, step: 3 }))}
          currency={currency}
          seatTotal={bookingState.selectedSeats.reduce((acc, s) => acc + s.price, 0)}
        />
      )}

      {/* Step 5: Payment Simulator */}
      {bookingState.step === 5 && (
        <PaymentSimulator
          totalAmount={bookingState.totalPrice}
          currency={currency}
          onPaymentSuccess={handlePaymentSuccess}
          onBack={() => setBookingState((prev) => ({ ...prev, step: 4 }))}
        />
      )}

      {/* Step 6: Confirmation & Luxury Ticket */}
      {bookingState.step === 6 && (
        <LuxuryTicketCard
          booking={bookingState}
          currency={currency}
          onReset={handleReset}
        />
      )}
    </Modal>
  );
};
