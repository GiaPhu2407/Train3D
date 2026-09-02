export interface Testimonial {
  id: string;
  name: string;
  title: string;
  country: string;
  rating: number;
  route: string;
  cabinClass: string;
  quote: string;
  avatar: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Nguyen Minh Tri',
    title: 'Executive Director, Horizon Tech',
    country: 'Vietnam',
    rating: 5,
    route: 'Hanoi → Da Nang (SE3 Express)',
    cabinClass: 'VIP Royal Suite (2-Berth)',
    quote: 'Booking was incredibly seamless and the entire journey exceeded five-star hotel standards. Waking up to the sunrise over Hai Van Pass while sipping fresh coffee in our private cabin was unforgettable.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'August 2026',
  },
  {
    id: 't-2',
    name: 'Alexander & Claire Dubois',
    title: 'Travel Journalists, Le Monde',
    country: 'France',
    rating: 5,
    route: 'Lotus Orient Luxury Express (Hanoi → Saigon)',
    cabinClass: 'Imperial Presidential Suite',
    quote: 'The Lotus Express evokes the golden era of the Orient Express with modern Southeast Asian grandeur. Impeccable butler service, exquisite Indochine dining, and smooth digital booking.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'July 2026',
  },
  {
    id: 't-3',
    name: 'Kenji Takahashi',
    title: 'Architect & Photographer',
    country: 'Japan',
    rating: 5,
    route: 'Hue → Da Nang (SE5 Daylight Cruiser)',
    cabinClass: 'Royal Vista Observation Suite',
    quote: 'The panoramic 270° window car through the coastal cliffs is one of the most stunning engineering feats in the world. The seat reservation tool allowed me to pick the exact ocean-facing seat effortlessly.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    date: 'August 2026',
  },
  {
    id: 't-4',
    name: 'Sarah Jenkins',
    title: 'Independent Filmmaker',
    country: 'United Kingdom',
    rating: 5,
    route: 'Hanoi → Sapa (Victoria Express Sleeper)',
    cabinClass: 'Grand Sleeper (4-Berth)',
    quote: 'From instant QR ticket generation to the plush velvet duvets, RAILWAY sets a brand new benchmark for Asian rail travel. Absolute perfection.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    date: 'June 2026',
  },
];
