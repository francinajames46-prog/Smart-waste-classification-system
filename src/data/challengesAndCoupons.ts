import { EcoChallenge, CouponReward } from '../types/waste';

export const INITIAL_CHALLENGES: EcoChallenge[] = [
  {
    id: 'ch-1',
    title: 'Veggie Compost Hero',
    description: 'Classify and divert 1 vegetable scrap or food waste into green composting.',
    categoryRequirement: 'Veg & Organic Waste',
    targetCount: 1,
    currentCount: 0,
    rewardPoints: 50,
    completed: false,
    claimed: false,
    badgeIcon: 'Leaf',
    type: 'daily'
  },
  {
    id: 'ch-2',
    title: 'Clean Plastic Champion',
    description: 'Properly rinse, flatten and classify 2 plastic recyclables.',
    categoryRequirement: 'Plastic',
    targetCount: 2,
    currentCount: 0,
    rewardPoints: 75,
    completed: false,
    claimed: false,
    badgeIcon: 'Recycle',
    type: 'daily'
  },
  {
    id: 'ch-3',
    title: 'Cardboard Optimizer',
    description: 'Flatten and dispose of 1 shipping cardboard box or paper item.',
    categoryRequirement: 'Paper & Cardboard',
    targetCount: 1,
    currentCount: 0,
    rewardPoints: 40,
    completed: false,
    claimed: false,
    badgeIcon: 'Box',
    type: 'daily'
  },
  {
    id: 'ch-4',
    title: 'Hazardous Waste Guardian',
    description: 'Safely divert 1 hazardous battery or e-waste item from standard landfill.',
    categoryRequirement: 'Hazardous',
    targetCount: 1,
    currentCount: 0,
    rewardPoints: 100,
    completed: false,
    claimed: false,
    badgeIcon: 'Zap',
    type: 'weekly'
  },
  {
    id: 'ch-5',
    title: 'Master Waste Sorter',
    description: 'Perform 5 total successful waste classifications and follow guidance.',
    targetCount: 5,
    currentCount: 0,
    rewardPoints: 120,
    completed: false,
    claimed: false,
    badgeIcon: 'Award',
    type: 'weekly'
  }
];

export const INITIAL_COUPONS: CouponReward[] = [
  {
    id: 'coup-1',
    brand: 'EcoStore Direct',
    title: '20% Off Sustainable Home & Kitchen Essentials',
    discount: '20% OFF',
    requiredPoints: 100,
    category: 'Home & Kitchen',
    code: 'ECO-HOME-20',
    expiresInDays: 30,
    description: 'Valid on stainless steel straws, reusable silicone bags, beeswax food wraps, and wooden dish brushes.',
    isUnlocked: false
  },
  {
    id: 'coup-2',
    brand: 'GreenCup Specialty Café',
    title: 'Free Artisanal Coffee / Tea in BYO Reusable Mug',
    discount: '100% FREE',
    requiredPoints: 180,
    category: 'Food & Beverage',
    code: 'GREENCUP-FREE-BYO',
    expiresInDays: 14,
    description: 'Bring any reusable tumbler to any partner café branch for a complimentary single-origin roast beverage.',
    isUnlocked: false
  },
  {
    id: 'coup-3',
    brand: 'FreshRoots Organic Market',
    title: '$10 Voucher for Local Farm Produce & Bulk Goods',
    discount: '$10 OFF',
    requiredPoints: 260,
    category: 'Groceries',
    code: 'ROOTS-10-ORGANIC',
    expiresInDays: 45,
    description: 'Applicable on loose farm produce, packaging-free grains, and fresh seasonal harvest with no minimum spend.',
    isUnlocked: false
  },
  {
    id: 'coup-4',
    brand: 'BambooLiving Co.',
    title: '30% Off Bamboo Toothbrushes & Bath Towels',
    discount: '30% OFF',
    requiredPoints: 350,
    category: 'Personal Care',
    code: 'BAMBOO-30-CLEAN',
    expiresInDays: 60,
    description: 'Redeemable on organic bamboo fiber products, plant-based dental hygiene, and compostable body care.',
    isUnlocked: false
  },
  {
    id: 'coup-5',
    brand: 'OneTreePlanted Partner',
    title: 'Official Tree Planting Certificate in Your Honor',
    discount: '1 TREE PLANTED',
    requiredPoints: 450,
    category: 'Direct Impact',
    code: 'TREE-PLANT-GEO45',
    expiresInDays: 90,
    description: 'We will sponsor planting 1 native forest tree in a deforested catchment zone with GPS coordinates and verified certificate.',
    isUnlocked: false
  }
];

export interface DropOffLocation {
  id: string;
  name: string;
  type: 'Recycling Hub' | 'Compost Station' | 'E-Waste Depot' | 'Hazardous Bank' | 'Textile Bin';
  distance: string;
  address: string;
  acceptedMaterials: string[];
  hours: string;
  rating: number;
}

export const ECO_DROP_OFFS: DropOffLocation[] = [
  {
    id: 'loc-1',
    name: 'GreenCycle Central Materials Recovery Facility',
    type: 'Recycling Hub',
    distance: '0.8 km',
    address: '42 Eco Boulevard, Sector 4',
    acceptedMaterials: ['Plastics (#1, #2, #5)', 'Aluminium Cans', 'Paper', 'Cardboard', 'Glass Bottles'],
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    rating: 4.9
  },
  {
    id: 'loc-2',
    name: 'Community Bio-Compost Hub & Community Garden',
    type: 'Compost Station',
    distance: '1.2 km',
    address: '15 Sunflower Meadows Lane',
    acceptedMaterials: ['Fruit & Veg Peels', 'Coffee Grounds', 'Eggshells', 'Dry Leaves', 'Raw Food Scraps'],
    hours: 'Open 24/7 (Drop box at gate)',
    rating: 4.8
  },
  {
    id: 'loc-3',
    name: 'CircuitSafe E-Waste & Battery Recycling Center',
    type: 'E-Waste Depot',
    distance: '2.5 km',
    address: '88 Innovation Way (Inside TechMart Mall)',
    acceptedMaterials: ['Lithium & Alkaline Batteries', 'Smartphones', 'Laptops', 'Cables', 'Power Banks'],
    hours: 'Daily: 10:00 AM - 9:00 PM',
    rating: 4.7
  },
  {
    id: 'loc-4',
    name: 'EcoThread Circular Fabric & Clothes Bank',
    type: 'Textile Bin',
    distance: '1.8 km',
    address: 'Corner of Maple & Civic Square',
    acceptedMaterials: ['Used Clothing', 'Curtains', 'Clean Fabric Scraps', 'Shoes'],
    hours: 'Open 24/7 self-service bin',
    rating: 4.6
  }
];
