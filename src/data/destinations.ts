export interface Destination {
  id: string;
  name: string;
  stationCode: string;
  province: string;
  title: string;
  tag: string;
  description: string;
  bestSeason: string;
  image: string;
  secondaryImage: string;
  highlights: string[];
  culinaryTreats: string[];
  startingFare: number;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'hanoi',
    name: 'Hanoi',
    stationCode: 'HAN',
    province: 'Capital Region',
    title: 'The Timeless Thousand-Year Capital',
    tag: 'Culture & Heritage',
    description: 'Ancient tree-lined boulevards, French colonial villas, serene lakes, and the bustling rhythm of the 36 Old Streets. Hanoi station is the historic grand terminus where all North-South journeys commence.',
    bestSeason: 'Autumn (Oct - Dec) & Spring (Mar - Apr)',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hoan Kiem Lake & Ngoc Son Temple', 'Old Quarter Train Street Culture', 'Imperial Citadel of Thang Long', 'French Quarter Opera House'],
    culinaryTreats: ['Cha Ca La Vong', 'Pho Bat Dan', 'Egg Coffee at Giang', 'Bun Cha Huong Lien'],
    startingFare: 850000,
  },
  {
    id: 'hue',
    name: 'Hue',
    stationCode: 'HUE',
    province: 'Thua Thien Hue',
    title: 'The Imperial Citadel on the Perfume River',
    tag: 'Royal Heritage',
    description: 'The ancient capital of the Nguyen Dynasty retains an atmosphere of quiet aristocracy with majestic royal tombs, purple forbidden city walls, and poetic river sunsets.',
    bestSeason: 'January to April (Pleasant & Cool)',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    highlights: ['Imperial Forbidden Purple City', 'Khai Dinh & Tu Duc Royal Tombs', 'Thien Mu Pagoda River Cruise', 'Dong Ba Central Market'],
    culinaryTreats: ['Bun Bo Hue', 'Banh Beo, Nam, Loc', 'Royal Court Cuisine', 'Che Hem (Sweet Soups)'],
    startingFare: 420000,
  },
  {
    id: 'danang',
    name: 'Da Nang & Hoi An',
    stationCode: 'DAD',
    province: 'Quang Nam / Da Nang',
    title: 'Modern Coastal Marvel & Ancient Lantern Town',
    tag: 'Coast & Charm',
    description: 'Ranked among the top railway destinations in the world, Da Nang greets travelers arriving through the dramatic sea tunnels of Hai Van Pass before whisking them to My Khe beach or the UNESCO lanterns of Hoi An.',
    bestSeason: 'March to August (Sunny & Calm Seas)',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hai Van Pass Ocean Railway', 'Hoi An Lantern Town (30m away)', 'Ba Na Hills Golden Bridge', 'Dragon Bridge Fire Show'],
    culinaryTreats: ['Mi Quang Da Nang', 'Banh Mi Phuong Hoi An', 'Banh Xeo Ba Duong', 'Fresh Seafood on Vo Nguyen Giap'],
    startingFare: 850000,
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    stationCode: 'NHA',
    province: 'Khanh Hoa',
    title: 'The Turquoise Pearl of the South-Central Coast',
    tag: 'Riviera & Island Life',
    description: 'Surrounded by sweeping coastal mountains and crystal-clear islands, Nha Trang offers international luxury resorts, coral reefs, and vibrant beachfront promenades right outside the historic station.',
    bestSeason: 'February to September (Sun-drenched)',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Nha Trang Bay Island Hopping', 'Ponagar Cham Towers (8th Century)', 'Vinpearl Cable Car Over the Sea', 'Long Son White Buddha'],
    culinaryTreats: ['Nem Nuong Ninh Hoa', 'Bun Cha Ca Nha Trang', 'Fresh Rock Lobster', 'Banh Can Seafood'],
    startingFare: 520000,
  },
  {
    id: 'saigon',
    name: 'Ho Chi Minh City',
    stationCode: 'SGN',
    province: 'Southern Economic Hub',
    title: 'The Vibrant Metropolis of the South',
    tag: 'Cosmopolitan & Energy',
    description: 'Vietnam’s largest metropolis blends towering futuristic skylines with tree-lined French boulevards, gourmet rooftop dining, chic coffee culture, and endless energy.',
    bestSeason: 'December to April (Dry & Sunny)',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    highlights: ['Notre Dame Cathedral & Central Post Office', 'Bitexco & Landmark 81 Vistas', 'Ben Thanh Night Market', 'Mekong Delta River Day Trips'],
    culinaryTreats: ['Saigon Broken Rice (Com Tam)', 'Hu Tieu Nam Vang', 'Banh Mi Huynh Hoa', 'Rooftop Craft Cocktails'],
    startingFare: 920000,
  },
  {
    id: 'sapa',
    name: 'Sapa & Fansipan',
    stationCode: 'LCA',
    province: 'Lao Cai',
    title: 'The Misty Kingdom in the Clouds',
    tag: 'Alpine & Serenity',
    description: 'Arrive at Lao Cai station via overnight sleeper train to discover the majestic Hoang Lien Son mountain range, emerald cascading rice terraces, and colorful ethnic hill-tribe markets.',
    bestSeason: 'September - October (Golden Harvest) & Spring (Blossoms)',
    image: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    highlights: ['Fansipan Peak (3,143m) Summit', 'Muong Hoa Valley Rice Terraces', 'Cat Cat & Ta Van Villages', 'O Quy Ho Mountain Pass'],
    culinaryTreats: ['Salmon & Sturgeon Hotpot', 'Thang Co with Corn Wine', 'Sapa Smoked Pork', 'Grilled Bamboo Rice (Com Lam)'],
    startingFare: 650000,
  },
];
