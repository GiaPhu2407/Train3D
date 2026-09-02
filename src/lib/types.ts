export type TrainType = 'high_speed' | 'sleeper' | 'luxury_express' | 'panoramic';

export type CabinClassType = 'soft_seat' | 'sleeper_4' | 'vip_suite' | 'panoramic';

export type SeatStatus = 'available' | 'occupied' | 'selected' | 'vip';

export interface Station {
  id: string;
  code: string;
  name: string;
  city: string;
  region: 'North' | 'Central' | 'South';
  description: string;
  popularRoutes: string[];
  travelTimes: Record<string, string>;
  startingPrice: number;
  image: string;
  coordinates: { x: number; y: number }; // percentage on stylized map
  highlights: string[];
  isMajorHub?: boolean;
}

export interface TrainClassInfo {
  id: CabinClassType;
  name: string;
  tagline: string;
  price: number;
  availableSeats: number;
  description: string;
  amenities: string[];
  badge?: string;
}

export interface TrainSchedule {
  id: string;
  code: string;
  name: string;
  trainType: TrainType;
  fromStationId: string;
  toStationId: string;
  fromStationName: string;
  toStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  classes: TrainClassInfo[];
  rating: number;
  reviewsCount: number;
  onTimeRate: string;
  amenities: string[];
  imageUrl: string;
}

export interface Seat {
  id: string;
  seatNumber: string;
  coachNumber: number;
  row: number;
  col: 'A' | 'B' | 'C' | 'D';
  classType: CabinClassType;
  status: SeatStatus;
  price: number;
  isWindow: boolean;
}

export interface Coach {
  coachNumber: number;
  name: string;
  classType: CabinClassType;
  seats: Seat[];
}

export interface Passenger {
  id: string;
  seatId?: string;
  seatNumber?: string;
  fullName: string;
  idNumber: string;
  email: string;
  phone: string;
  passengerType: 'adult' | 'child' | 'senior';
  mealPreference: 'fine_dining_vietnamese' | 'continental_breakfast' | 'vegetarian_deluxe' | 'none';
  baggage: 'standard_20kg' | 'luxury_35kg_priority';
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  selected: boolean;
}

export interface BookingSearchQuery {
  tripType: 'one_way' | 'round_trip';
  fromStationId: string;
  toStationId: string;
  departureDate: string;
  returnDate?: string;
  passengersCount: {
    adults: number;
    children: number;
    seniors: number;
  };
  preferredClass?: CabinClassType | 'all';
}

export interface BookingState {
  step: number; // 1: Search, 2: Train, 3: Class, 4: Seats, 5: Passenger Info, 6: Addons, 7: Payment, 8: Confirmation
  searchQuery: BookingSearchQuery;
  selectedTrain: TrainSchedule | null;
  selectedClass: CabinClassType | null;
  selectedSeats: Seat[];
  passengers: Passenger[];
  addOns: AddOnItem[];
  paymentMethod: 'credit_card' | 'vnpay_qr' | 'momo' | 'bank_transfer' | null;
  bookingReference: string | null;
  bookingTimestamp: string | null;
  totalPrice: number;
}
