import { TrainSchedule, Coach, Seat, CabinClassType } from '@/lib/types';

export const TRAIN_SCHEDULES: TrainSchedule[] = [
  {
    id: 'SE3',
    code: 'SE3',
    name: 'SE3 Grand Express',
    trainType: 'high_speed',
    fromStationId: 'HAN',
    toStationId: 'DAD',
    fromStationName: 'Hanoi Central',
    toStationName: 'Da Nang Central',
    departureTime: '19:25',
    arrivalTime: '11:00',
    duration: '15h 35m',
    distanceKm: 791,
    rating: 4.9,
    reviewsCount: 1420,
    onTimeRate: '99.2%',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1000&q=80',
    amenities: ['High-Speed Starlink Wi-Fi', 'Fine Dining Dining Car', 'Ensuite Restrooms', 'Complimentary Champagne', 'Luggage Porter'],
    classes: [
      {
        id: 'soft_seat',
        name: 'Deluxe Soft Seat',
        tagline: 'Ergonomic leather recliner with power outlet',
        price: 850000,
        availableSeats: 28,
        description: 'Spacious 2+2 layout with 140° recline, foldable wooden tray table, and panoramic window view.',
        amenities: ['220V & USB Charging', 'Reading Lamp', 'Snack & Mineral Water', 'Adjustable Footrest'],
      },
      {
        id: 'sleeper_4',
        name: 'Luxury 4-Berth Sleeper',
        tagline: 'Private 4-berth air-conditioned quiet cabin',
        price: 1450000,
        availableSeats: 12,
        description: 'Plush pocket-spring mattress, goose-down duvet, soundproofing, and privacy lock door.',
        amenities: ['Hotel Bedding & Linens', 'Welcome Tea & Fruit', 'Noise-cancelling headsets', 'Ambient lighting'],
        badge: 'Popular',
      },
      {
        id: 'vip_suite',
        name: 'VIP Royal Suite (2-Berth)',
        tagline: 'Ultra-exclusive private suite for two',
        price: 2650000,
        availableSeats: 4,
        description: 'Dedicated butler service, private double cabin, complimentary French champagne, and gourmet 3-course dinner.',
        amenities: ['Private Butler Service', '3-Course Fine Dining', 'Free-flow Champagne', 'VIP Station Lounge Pass'],
        badge: 'Best Experience',
      },
    ],
  },
  {
    id: 'SE1',
    code: 'SE1',
    name: 'SE1 Trans-Vietnam Flagship',
    trainType: 'luxury_express',
    fromStationId: 'HAN',
    toStationId: 'DAD',
    fromStationName: 'Hanoi Central',
    toStationName: 'Da Nang Central',
    departureTime: '22:15',
    arrivalTime: '13:40',
    duration: '15h 25m',
    distanceKm: 791,
    rating: 4.8,
    reviewsCount: 980,
    onTimeRate: '98.8%',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Starlink Wi-Fi', 'Boutique Coffee Bar', 'Executive Lounge Check-in', 'Linen Bedding'],
    classes: [
      {
        id: 'soft_seat',
        name: 'Deluxe Soft Seat',
        tagline: 'Comfortable seating for swift overnight transit',
        price: 820000,
        availableSeats: 34,
        description: 'Quiet cabin with individual audio ports, dimmable lights, and beverage service.',
        amenities: ['Power sockets', 'Blanket & Pillow', 'Beverage service'],
      },
      {
        id: 'sleeper_4',
        name: 'Luxury 4-Berth Sleeper',
        tagline: 'Cozy sleeper cabin with modern amenities',
        price: 1390000,
        availableSeats: 16,
        description: 'Optimal for families and groups, featuring premium mattresses and climate control.',
        amenities: ['Fine linens', 'Midnight snack box', 'Bottled water'],
      },
      {
        id: 'vip_suite',
        name: 'VIP Royal Suite (2-Berth)',
        tagline: 'Private sanctuary on rails',
        price: 2490000,
        availableSeats: 2,
        description: 'Indulge in bespoke privacy with handcrafted woodwork and curated wine selection.',
        amenities: ['Sommelier wine list', 'Private dining', 'Luxury bath amenities'],
        badge: 'Only 2 Left',
      },
    ],
  },
  {
    id: 'SE5',
    code: 'SE5',
    name: 'SE5 Heritage Daylight Cruiser',
    trainType: 'panoramic',
    fromStationId: 'HAN',
    toStationId: 'DAD',
    fromStationName: 'Hanoi Central',
    toStationName: 'Da Nang Central',
    departureTime: '08:50',
    arrivalTime: '23:30',
    duration: '14h 40m',
    distanceKm: 791,
    rating: 4.95,
    reviewsCount: 1650,
    onTimeRate: '99.5%',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Floor-to-Ceiling Windows', 'Open Observation Bar', 'Live Acoustic Music', 'Barista Coffee'],
    classes: [
      {
        id: 'soft_seat',
        name: 'Panoramic Soft Seat',
        tagline: 'Window-facing rotating leather seat',
        price: 920000,
        availableSeats: 20,
        description: 'Engineered for daylight scenic sightseeing with anti-glare panoramic glass.',
        amenities: ['180° Window View', 'Audio Tour Guide', 'Fresh Pastry & Coffee'],
        badge: 'Scenic Choice',
      },
      {
        id: 'sleeper_4',
        name: 'Executive Cabin 4-Berth',
        tagline: 'Day-use private lounge and berth',
        price: 1550000,
        availableSeats: 8,
        description: 'Convertible sofa-to-berth design with private audio speakers and scenic viewports.',
        amenities: ['Afternoon High Tea', 'Panoramic Glass', 'Wi-Fi 6'],
      },
      {
        id: 'panoramic',
        name: 'Royal Vista Observation Suite',
        tagline: 'Curved glass observatory cabin',
        price: 2950000,
        availableSeats: 2,
        description: 'The pinnacle of luxury: end-of-train panoramic salon with 270° uninterrupted vistas of Hai Van Pass.',
        amenities: ['270° Scenic Salon', 'Champagne & Caviar', 'Private Host', 'VIP Fast-track'],
        badge: 'Ultimate Luxury',
      },
    ],
  },
  {
    id: 'SE7',
    code: 'SE7',
    name: 'SE7 Southern Coastliner',
    trainType: 'high_speed',
    fromStationId: 'DAD',
    toStationId: 'SGN',
    fromStationName: 'Da Nang Central',
    toStationName: 'Saigon Central',
    departureTime: '14:30',
    arrivalTime: '06:50',
    duration: '16h 20m',
    distanceKm: 935,
    rating: 4.75,
    reviewsCount: 840,
    onTimeRate: '98.5%',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Coastal View Car', 'Quiet Sleep Protocol', 'Gourmet Pho Breakfast', 'Power at Every Seat'],
    classes: [
      {
        id: 'soft_seat',
        name: 'Deluxe Soft Seat',
        tagline: 'Reclining leather seat with footrest',
        price: 890000,
        availableSeats: 40,
        description: 'Smooth riding shock-absorbing carriages for comfortable coastal travel.',
        amenities: ['Power outlet', 'USB-C Fast Charging', 'Morning Tea'],
      },
      {
        id: 'sleeper_4',
        name: 'Luxury 4-Berth Sleeper',
        tagline: 'Overnight coastal slumber',
        price: 1480000,
        availableSeats: 14,
        description: 'Fall asleep to the sound of ocean waves along the central coast.',
        amenities: ['Soft duvet', 'Eye mask & earplugs', 'Warm breakfast included'],
      },
      {
        id: 'vip_suite',
        name: 'VIP Royal Suite (2-Berth)',
        tagline: 'Prestige oceanfront bedroom',
        price: 2750000,
        availableSeats: 3,
        description: 'A true five-star hotel room on rails, featuring private dining and priority boarding.',
        amenities: ['Champagne reception', 'Personalized wake-up service', 'Saigon VIP Transfer'],
        badge: 'VIP Service',
      },
    ],
  },
  {
    id: 'LOTUS',
    code: 'LOTUS-EXP',
    name: 'Lotus Orient Luxury Express',
    trainType: 'luxury_express',
    fromStationId: 'HAN',
    toStationId: 'SGN',
    fromStationName: 'Hanoi Central',
    toStationName: 'Saigon Central',
    departureTime: '20:00',
    arrivalTime: '04:00 (+2d)',
    duration: '32h 00m',
    distanceKm: 1726,
    rating: 4.98,
    reviewsCount: 520,
    onTimeRate: '99.9%',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    amenities: ['5-Star Gastronomic Dining', 'Cocktail Piano Lounge', 'Ensuite Shower', 'Bespoke Excursions', '24/7 Butler'],
    classes: [
      {
        id: 'sleeper_4',
        name: 'Grand Heritage Cabin (4-Berth)',
        tagline: 'Indochine-inspired teak wood cabin',
        price: 3800000,
        availableSeats: 8,
        description: 'Carved mahogany accents, brass fittings, fine Egyptian cotton sheets, and all-inclusive dining.',
        amenities: ['All-Inclusive Gourmet Dining', 'Fine Wines & Spirits', 'Daily Excursions', 'Luxury Toiletries'],
      },
      {
        id: 'vip_suite',
        name: 'Imperial Presidential Suite',
        tagline: 'The most opulent rail suite in Southeast Asia',
        price: 6900000,
        availableSeats: 2,
        description: 'Full ensuite private bathroom with shower, King bed, dedicated butler, and private balcony observation car.',
        amenities: ['Private Ensuite Shower', 'Caviar & Champagne on arrival', 'Dedicated Chef', 'Limousine Station Transfer'],
        badge: 'Ultra Prestige',
      },
    ],
  },
];

// Generates dynamic seat map for a given coach
export function generateCoachSeats(coachNumber: number, classType: CabinClassType): Coach {
  const seats: Seat[] = [];
  const rows = classType === 'vip_suite' ? 4 : classType === 'sleeper_4' ? 6 : 8;
  const cols: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  
  // Base price lookup
  const priceMap: Record<CabinClassType, number> = {
    soft_seat: 850000,
    sleeper_4: 1450000,
    vip_suite: 2650000,
    panoramic: 2950000,
  };

  const coachNameMap: Record<CabinClassType, string> = {
    soft_seat: `Coach ${coachNumber} - Deluxe Soft Seat`,
    sleeper_4: `Coach ${coachNumber} - Luxury Sleeper (4-Berth)`,
    vip_suite: `Coach ${coachNumber} - Royal VIP Suite`,
    panoramic: `Coach ${coachNumber} - Royal Vista Salon`,
  };

  for (let r = 1; r <= rows; r++) {
    cols.forEach((c) => {
      // Deterministic mock occupied state
      const isOccupied = (r * 7 + c.charCodeAt(0)) % 5 === 0;
      const isVip = classType === 'vip_suite' || (r === 1 && classType !== 'soft_seat');
      const seatNumStr = `${r < 10 ? '0' + r : r}${c}`;
      
      seats.push({
        id: `c${coachNumber}-${seatNumStr}`,
        seatNumber: seatNumStr,
        coachNumber,
        row: r,
        col: c,
        classType,
        status: isOccupied ? 'occupied' : 'available',
        price: priceMap[classType] + (c === 'A' || c === 'D' ? 50000 : 0), // small window surcharge
        isWindow: c === 'A' || c === 'D',
      });
    });
  }

  return {
    coachNumber,
    name: coachNameMap[classType],
    classType,
    seats,
  };
}
