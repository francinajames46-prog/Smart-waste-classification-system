export type WasteCategory =
  | 'Plastic'
  | 'Paper & Cardboard'
  | 'Glass'
  | 'Veg & Organic Waste'
  | 'Metal'
  | 'E-Waste'
  | 'Hazardous'
  | 'Residual / Landfill';

export type BinCode = 'yellow' | 'blue' | 'green' | 'brown' | 'red' | 'black';

export interface EnvironmentalImpact {
  decompositionYears: string;
  co2SavingsGrams: number;
  weightGrams: number;
  hazardRating: 'Low' | 'Medium' | 'High' | 'Severe / Toxic';
}

export interface SustainableAlternative {
  title: string;
  description: string;
  impactBenefit: string;
}

export interface WasteClassificationResult {
  itemName: string;
  category: WasteCategory;
  confidence: number;
  binColor: string;
  binCode: BinCode;
  recyclability: '100% Recyclable' | 'Compostable' | 'Special Drop-off Required' | 'Non-Recyclable' | 'Partially Recyclable';
  disposalSteps: string[];
  environmentalImpact: EnvironmentalImpact;
  sustainableAlternatives: SustainableAlternative[];
  creativeUpcycleIdea: string;
  pointsAwarded: number;
  ecoFact: string;
  materialDetails?: string;
}

export interface ActivityRecord {
  id: string;
  timestamp: number;
  itemName: string;
  category: WasteCategory;
  binColor: string;
  pointsEarned: number;
  co2SavedGrams: number;
  weightGrams: number;
  imageUrl?: string;
  disposedProperly: boolean;
}

export interface EcoChallenge {
  id: string;
  title: string;
  description: string;
  categoryRequirement?: WasteCategory;
  targetCount: number;
  currentCount: number;
  rewardPoints: number;
  completed: boolean;
  claimed: boolean;
  badgeIcon: string;
  type: 'daily' | 'weekly';
}

export interface CouponReward {
  id: string;
  brand: string;
  title: string;
  discount: string;
  requiredPoints: number;
  category: string;
  code: string;
  expiresInDays: number;
  description: string;
  isUnlocked: boolean;
  claimedAt?: number;
}
