export interface PopularRoute {
  id: string;
  fromCity: string;
  toCity: string;
  fromCode: string;
  toCode: string;
  duration: string;
  distance: string;
  startingPrice: number;
  highlightTag: string;
  description: string;
  scenicHighlights: string[];
  trainCodes: string[];
  image: string;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: 'route-han-dad',
    fromCity: 'Hanoi',
    toCity: 'Da Nang',
    fromCode: 'HAN',
    toCode: 'DAD',
    duration: '15h 35m',
    distance: '791 km',
    startingPrice: 850000,
    highlightTag: 'Most Iconic Coastal Journey',
    description: 'Traverse the North-Central plains through limestone karsts and the breathtaking ocean cliffs of Hai Van Pass.',
    scenicHighlights: ['Hai Van Pass Ocean Vista', 'Hue Imperial Citadel Link', 'Lang Co Lagoon'],
    trainCodes: ['SE1', 'SE3', 'SE5'],
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'route-dad-sgn',
    fromCity: 'Da Nang',
    toCity: 'Ho Chi Minh City',
    fromCode: 'DAD',
    toCode: 'SGN',
    duration: '16h 20m',
    distance: '935 km',
    startingPrice: 890000,
    highlightTag: 'Southern Riviera Express',
    description: 'Glide along turquoise central bays and tropical palm landscapes into the vibrant southern metropolis.',
    scenicHighlights: ['Nha Trang Coastal Bay', 'Ca Pass Mountain Vista', 'Phan Thiet Dragonfruit Fields'],
    trainCodes: ['SE3', 'SE7'],
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'route-han-hph',
    fromCity: 'Hanoi',
    toCity: 'Hai Phong',
    fromCode: 'HAN',
    toCode: 'HPH',
    duration: '1h 45m',
    distance: '102 km',
    startingPrice: 120000,
    highlightTag: 'Fastest Heritage Link',
    description: 'A swift, luxurious commuter connection from the capital to the port gateway of Lan Ha Bay & Cat Ba.',
    scenicHighlights: ['Long Bien Historical Bridge', 'Red River Delta Farmlands', 'Opera House Station District'],
    trainCodes: ['HP1', 'LP3', 'LP5'],
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'route-sgn-nha',
    fromCity: 'Ho Chi Minh City',
    toCity: 'Nha Trang',
    fromCode: 'SGN',
    toCode: 'NHA',
    duration: '7h 15m',
    distance: '411 km',
    startingPrice: 520000,
    highlightTag: 'Weekend Luxury Beach Escape',
    description: 'Depart the city in afternoon luxury and arrive relaxed at pristine seaside resorts for dinner.',
    scenicHighlights: ['Binh Thuan Sand Dunes', 'Cam Ranh Peninsula', 'Nha Trang Bay Sunset'],
    trainCodes: ['SNT2', 'SE4', 'SE8'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'route-han-lca',
    fromCity: 'Hanoi',
    toCity: 'Sapa (Lao Cai)',
    fromCode: 'HAN',
    toCode: 'LCA',
    duration: '7h 45m',
    distance: '296 km',
    startingPrice: 650000,
    highlightTag: 'Highland Sleeper Romance',
    description: 'Fall asleep in a private wood-paneled cabin in Hanoi and awake in misty mountain valleys surrounded by rice terraces.',
    scenicHighlights: ['Red River Valley', 'Muong Hoa Valley Shuttle', 'Fansipan Mountain Sunrise'],
    trainCodes: ['SP1', 'SP3', 'Victoria Express'],
    image: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'route-hue-dad',
    fromCity: 'Hue',
    toCity: 'Da Nang',
    fromCode: 'HUE',
    toCode: 'DAD',
    duration: '2h 45m',
    distance: '103 km',
    startingPrice: 240000,
    highlightTag: 'World’s Top 10 Scenic Rails',
    description: 'The legendary "Connecting Heritage Line" curving between misty jungle mountains and the crashing waves of the East Sea.',
    scenicHighlights: ['Hai Van Pass Horseshoe Curve', 'Lang Co Emerald Bay', 'Son Tra Peninsula View'],
    trainCodes: ['HUE-DAD Heritage', 'SE1', 'SE3'],
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
  },
];
