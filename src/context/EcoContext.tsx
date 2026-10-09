import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WasteClassificationResult, 
  ActivityRecord, 
  EcoChallenge, 
  CouponReward,
  WasteCategory 
} from '../types/waste';
import { INITIAL_CHALLENGES, INITIAL_COUPONS } from '../data/challengesAndCoupons';
import { triggerEcoConfetti } from '../utils/confetti';

interface EcoContextType {
  points: number;
  history: ActivityRecord[];
  challenges: EcoChallenge[];
  coupons: CouponReward[];
  claimedCoupons: CouponReward[];
  streakDays: number;
  userLevel: { level: number; title: string; nextLevelPoints: number; progressPercent: number };
  activeTab: 'scanner' | 'dashboard' | 'challenges' | 'coupons' | 'map';
  setActiveTab: (tab: 'scanner' | 'dashboard' | 'challenges' | 'coupons' | 'map') => void;
  showPitchGuide: boolean;
  setShowPitchGuide: (show: boolean) => void;
  logWasteDisposal: (classification: WasteClassificationResult, imageUrl?: string) => void;
  claimChallenge: (challengeId: string) => void;
  redeemCoupon: (couponId: string) => { success: boolean; message: string };
  resetDemoData: () => void;
}

const EcoContext = createContext<EcoContextType | undefined>(undefined);

const SEED_HISTORY: ActivityRecord[] = [
  {
    id: 'seed-1',
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    itemName: 'Plastic Mineral Water Bottle (PET #1)',
    category: 'Plastic',
    binColor: 'Yellow / Dry Recyclables Bin',
    pointsEarned: 50,
    co2SavedGrams: 85,
    weightGrams: 28,
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=400&q=80',
    disposedProperly: true
  },
  {
    id: 'seed-2',
    timestamp: Date.now() - 1000 * 60 * 60 * 42,
    itemName: 'Banana Peel & Fruit Waste',
    category: 'Veg & Organic Waste',
    binColor: 'Green / Wet Organic Compost Bin',
    pointsEarned: 45,
    co2SavedGrams: 140,
    weightGrams: 110,
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
    disposedProperly: true
  },
  {
    id: 'seed-3',
    timestamp: Date.now() - 1000 * 60 * 60 * 70,
    itemName: 'Cardboard Delivery Shipping Box',
    category: 'Paper & Cardboard',
    binColor: 'Blue / Paper & Cardboard Bin',
    pointsEarned: 45,
    co2SavedGrams: 210,
    weightGrams: 220,
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80',
    disposedProperly: true
  }
];

export const EcoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('ecosort_points');
    return saved !== null ? parseInt(saved, 10) : 220; // Default starts with 220 so user can immediately see rewards
  });

  const [history, setHistory] = useState<ActivityRecord[]>(() => {
    const saved = localStorage.getItem('ecosort_history');
    return saved ? JSON.parse(saved) : SEED_HISTORY;
  });

  const [challenges, setChallenges] = useState<EcoChallenge[]>(() => {
    const saved = localStorage.getItem('ecosort_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [coupons, setCoupons] = useState<CouponReward[]>(() => {
    const saved = localStorage.getItem('ecosort_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [claimedCoupons, setClaimedCoupons] = useState<CouponReward[]>(() => {
    const saved = localStorage.getItem('ecosort_claimed_coupons');
    return saved ? JSON.parse(saved) : [];
  });

  const [streakDays] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'scanner' | 'dashboard' | 'challenges' | 'coupons' | 'map'>('scanner');
  const [showPitchGuide, setShowPitchGuide] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ecosort_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('ecosort_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('ecosort_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('ecosort_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('ecosort_claimed_coupons', JSON.stringify(claimedCoupons));
  }, [claimedCoupons]);

  // Calculate Level
  // Level 1: 0-100 (Eco Seedling)
  // Level 2: 101-250 (Green Sprout)
  // Level 3: 251-500 (Waste Warrior)
  // Level 4: 501-1000 (Earth Guardian)
  // Level 5: 1000+ (Zero-Waste Legend)
  const calculateLevel = (pts: number) => {
    if (pts < 100) {
      return { level: 1, title: 'Eco Seedling', nextLevelPoints: 100, progressPercent: Math.min(100, Math.round((pts / 100) * 100)) };
    } else if (pts < 250) {
      return { level: 2, title: 'Green Sprout', nextLevelPoints: 250, progressPercent: Math.min(100, Math.round(((pts - 100) / 150) * 100)) };
    } else if (pts < 500) {
      return { level: 3, title: 'Waste Warrior', nextLevelPoints: 500, progressPercent: Math.min(100, Math.round(((pts - 250) / 250) * 100)) };
    } else if (pts < 1000) {
      return { level: 4, title: 'Earth Guardian', nextLevelPoints: 1000, progressPercent: Math.min(100, Math.round(((pts - 500) / 500) * 100)) };
    } else {
      return { level: 5, title: 'Zero-Waste Legend', nextLevelPoints: 2000, progressPercent: 100 };
    }
  };

  const userLevel = calculateLevel(points);

  const logWasteDisposal = (classification: WasteClassificationResult, imageUrl?: string) => {
    const earned = classification.pointsAwarded || 50;
    const newRecord: ActivityRecord = {
      id: 'rec-' + Date.now(),
      timestamp: Date.now(),
      itemName: classification.itemName,
      category: classification.category,
      binColor: classification.binColor,
      pointsEarned: earned,
      co2SavedGrams: classification.environmentalImpact.co2SavingsGrams,
      weightGrams: classification.environmentalImpact.weightGrams,
      imageUrl: imageUrl || '',
      disposedProperly: true
    };

    setPoints(prev => prev + earned);
    setHistory(prev => [newRecord, ...prev]);

    // Update Challenges progress
    setChallenges(prev => 
      prev.map(ch => {
        let countInc = 0;
        if (ch.categoryRequirement && ch.categoryRequirement === classification.category) {
          countInc = 1;
        } else if (!ch.categoryRequirement) {
          countInc = 1; // General sorting challenge
        }

        const newCount = ch.currentCount + countInc;
        const isCompleted = newCount >= ch.targetCount;
        return {
          ...ch,
          currentCount: newCount,
          completed: ch.completed || isCompleted
        };
      })
    );

    triggerEcoConfetti();
  };

  const claimChallenge = (challengeId: string) => {
    const ch = challenges.find(c => c.id === challengeId);
    if (!ch || ch.claimed || !ch.completed) return;

    setPoints(prev => prev + ch.rewardPoints);
    setChallenges(prev => 
      prev.map(c => c.id === challengeId ? { ...c, claimed: true } : c)
    );
    triggerEcoConfetti();
  };

  const redeemCoupon = (couponId: string) => {
    const coupon = coupons.find(c => c.id === couponId);
    if (!coupon) return { success: false, message: 'Coupon not found.' };

    if (points < coupon.requiredPoints) {
      return { success: false, message: `Insufficient points! You need ${coupon.requiredPoints - points} more EcoPoints.` };
    }

    setPoints(prev => prev - coupon.requiredPoints);
    const redeemedCoupon: CouponReward = {
      ...coupon,
      isUnlocked: true,
      claimedAt: Date.now()
    };

    setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, isUnlocked: true } : c));
    setClaimedCoupons(prev => [redeemedCoupon, ...prev]);
    triggerEcoConfetti();

    return { success: true, message: `Unlocked ${coupon.title}! Use code ${coupon.code} at checkout.` };
  };

  const resetDemoData = () => {
    setPoints(220);
    setHistory(SEED_HISTORY);
    setChallenges(INITIAL_CHALLENGES);
    setCoupons(INITIAL_COUPONS);
    setClaimedCoupons([]);
    localStorage.clear();
  };

  return (
    <EcoContext.Provider
      value={{
        points,
        history,
        challenges,
        coupons,
        claimedCoupons,
        streakDays,
        userLevel,
        activeTab,
        setActiveTab,
        showPitchGuide,
        setShowPitchGuide,
        logWasteDisposal,
        claimChallenge,
        redeemCoupon,
        resetDemoData
      }}
    >
      {children}
    </EcoContext.Provider>
  );
};

export const useEco = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error('useEco must be used within an EcoProvider');
  }
  return context;
};
