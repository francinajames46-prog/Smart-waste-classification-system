import { WasteClassificationResult } from '../types/waste';

export interface SampleItem {
  id: string;
  name: string;
  category: string;
  image: string;
  classification: WasteClassificationResult;
}

export const SAMPLE_WASTE_ITEMS: SampleItem[] = [
  {
    id: 'sample-plastic-bottle',
    name: 'Plastic Water Bottle (PET #1)',
    category: 'Plastic',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'PET Plastic Mineral Water Bottle (Polyethylene Terephthalate)',
      category: 'Plastic',
      confidence: 98,
      binColor: 'Yellow / Dry Recyclables Bin',
      binCode: 'yellow',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Pour out any leftover beverage or liquid completely.',
        'Rinse with a quick splash of greywater to remove sweet residue.',
        'Crush or squash the bottle flat horizontally to save up to 70% bin volume.',
        'Screw the plastic cap back on (modern recyclers prefer caps attached to prevent ocean litter).',
        'Deposit in your Yellow / Mixed Dry Recycling bin.'
      ],
      environmentalImpact: {
        decompositionYears: '450 years in landfill',
        co2SavingsGrams: 85,
        weightGrams: 28,
        hazardRating: 'Medium'
      },
      sustainableAlternatives: [
        {
          title: 'Stainless Steel Insulated Flask',
          description: 'Keeps water icy cold for 24 hours and replaces over 1,400 single-use bottles per lifetime.',
          impactBenefit: 'Saves ~42 kg of plastic waste per year'
        },
        {
          title: 'BPA-Free Borosilicate Glass Bottle',
          description: 'Infinite clean taste without microplastic leaching or plastic petroleum footprint.',
          impactBenefit: 'Zero toxic chemical exposure'
        }
      ],
      creativeUpcycleIdea: 'Cut the top off to create a self-watering seed propagator or cut into garden tags.',
      pointsAwarded: 50,
      ecoFact: 'Recycling just 1 ton of PET plastic saves 3.8 barrels of crude oil and prevents 1.5 tons of greenhouse gases!',
      materialDetails: 'PETE (Resin ID Code 1) - High recyclability, high demand in textiles and thermoforming.'
    }
  },
  {
    id: 'sample-banana-peel',
    name: 'Banana Peel & Fruit Waste',
    category: 'Veg & Organic Waste',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Banana Peel & Organic Fruit Scraps',
      category: 'Veg & Organic Waste',
      confidence: 99,
      binColor: 'Green / Wet Organic Compost Bin',
      binCode: 'green',
      recyclability: 'Compostable',
      disposalSteps: [
        'Ensure any plastic brand sticker or rubber tie is peeled off completely.',
        'Do not wrap inside plastic bags unless certified 100% home compostable.',
        'Chop peel into 2-3 pieces to accelerate aerobic microbial breakdown.',
        'Toss into your Green Organic Bin or direct home compost tumbler.'
      ],
      environmentalImpact: {
        decompositionYears: '2 to 4 weeks (in compost), 2+ years (in anaerobic landfill generating methane)',
        co2SavingsGrams: 140,
        weightGrams: 110,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'Banana Peel Fertilizer Tea',
          description: 'Soak peels in water for 48 hours to create a rich potassium-phosphorus organic plant tonic for houseplants.',
          impactBenefit: 'Zero waste + free organic fertilizer'
        },
        {
          title: 'Banana Peel Baking & Bacon Alternatives',
          description: 'Seasoned banana peel can be pan-fried with smoked paprika or blended into banana bread flour.',
          impactBenefit: 'Upcycles 100% of edible biomass'
        }
      ],
      creativeUpcycleIdea: 'Rub the inside of the peel on leather shoes or indoor plant leaves for natural conditioning and shine!',
      pointsAwarded: 45,
      ecoFact: 'When organic waste enters standard landfills without oxygen, it creates Methane gas — a greenhouse gas 28x more potent than CO₂!',
      materialDetails: '100% Biodegradable biomass rich in Potassium (K), Nitrogen (N), and trace minerals.'
    }
  },
  {
    id: 'sample-glass-jar',
    name: 'Glass Jam Jar with Metal Lid',
    category: 'Glass',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Clear Flint Glass Jar with Tinplate Metal Lid',
      category: 'Glass',
      confidence: 96,
      binColor: 'Blue / Glass Specific Bin',
      binCode: 'blue',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Scrape out food residue and give a brief rinse with warm water.',
        'Unscrew metal lid (metal lids are collected in the metal/can stream).',
        'Labels do not need to be removed; recycling furnaces vaporize adhesive cleanly.',
        'Place glass jar gently in the Blue / Glass recycling container (do not shatter).'
      ],
      environmentalImpact: {
        decompositionYears: 'Over 1,000,000 years (glass never naturally degrades)',
        co2SavingsGrams: 160,
        weightGrams: 195,
        hazardRating: 'Medium'
      },
      sustainableAlternatives: [
        {
          title: 'Bulk Pantry Refill Container',
          description: 'Wash and repurpose this glass jar for dry spices, chia seeds, oats, or homemade jams.',
          impactBenefit: 'Eliminates buying new containers permanently'
        },
        {
          title: 'Meal Prep Overnight Oats Vessel',
          description: 'Airtight, non-toxic, and microwave-safe food storage vessel with zero chemical leach.',
          impactBenefit: 'Reduces disposable food packaging'
        }
      ],
      creativeUpcycleIdea: 'Turn into a rustic fairy-light lantern or desk pencil holder with twine wrapping.',
      pointsAwarded: 55,
      ecoFact: 'Glass can be recycled infinitely without any loss in purity, quality, or structural strength!',
      materialDetails: 'Soda-lime glass (70% silica sand, soda ash, limestone) + Tinplate steel lid.'
    }
  },
  {
    id: 'sample-cardboard-box',
    name: 'E-commerce Cardboard Shipping Box',
    category: 'Paper & Cardboard',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Corrugated Cardboard Parcel Delivery Box',
      category: 'Paper & Cardboard',
      confidence: 97,
      binColor: 'Blue / Paper & Cardboard Bin',
      binCode: 'blue',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Remove any plastic air pillows, bubble wrap, or styrofoam packaging.',
        'Peel away heavy PVC packaging tape where possible.',
        'Flatten the cardboard box completely to maximize collection bin space.',
        'Keep dry: wet cardboard degrades fiber quality and molds in paper mills.',
        'Place into the Blue / Paper and Fiber recycling stream.'
      ],
      environmentalImpact: {
        decompositionYears: '2 to 3 months (if unlaminated and kept aerated)',
        co2SavingsGrams: 210,
        weightGrams: 220,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'Reusable Returnable Shipping Pouches (e.g. Boox, RePack)',
          description: 'Opt for retailers offering circular, returnable packaging that circulates 20+ times.',
          impactBenefit: 'Saves 80% lifecycle carbon footprint'
        },
        {
          title: 'Garden Sheet Mulching / Weed Barrier',
          description: 'Lay flattened plain brown cardboard directly on garden soil under mulch to naturally block weeds and decompose into earthworm food.',
          impactBenefit: 'Replaces chemical weedkiller and plastic weed mats'
        }
      ],
      creativeUpcycleIdea: 'Use as storage dividers, children craft cardboard castle, or compost carbon brown layer.',
      pointsAwarded: 45,
      ecoFact: 'Recycling 1 ton of cardboard saves 17 mature trees, 7,000 gallons of water, and 4,000 kWh of electricity!',
      materialDetails: 'Kraft unbleached corrugated fiberboard (renewable softwood cellulose).'
    }
  },
  {
    id: 'sample-battery',
    name: 'AA Alkaline Household Battery',
    category: 'Hazardous',
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Alkaline Dry Cell AA Battery (Hazardous E-Waste)',
      category: 'Hazardous',
      confidence: 99,
      binColor: 'Red / Battery & Hazardous Drop-Off Bin',
      binCode: 'red',
      recyclability: 'Special Drop-off Required',
      disposalSteps: [
        'DO NOT throw into household general waste or regular curbside recycling bins (causes battery fires!).',
        'Tape both the positive (+) and negative (-) terminals with clear tape to prevent short-circuits.',
        'Store in a cool, dry plastic tub away from flammable materials.',
        'Drop off at dedicated supermarket battery collection bins, Best Buy, or municipal hazardous waste depots.'
      ],
      environmentalImpact: {
        decompositionYears: '100+ years, leaches zinc, manganese, and alkaline electrolyte into groundwater',
        co2SavingsGrams: 320,
        weightGrams: 24,
        hazardRating: 'Severe / Toxic'
      },
      sustainableAlternatives: [
        {
          title: 'NiMH Low Self-Discharge Rechargeable Batteries (e.g. Eneloop)',
          description: 'One set can be recharged over 1,500 times, displacing 1,500 disposable single-use batteries.',
          impactBenefit: 'Prevents ~36 kg of toxic battery waste and saves $300+'
        },
        {
          title: 'USB-C Rechargeable Household Devices',
          description: 'Choose electronics with built-in USB-C lithium charging instead of battery slots.',
          impactBenefit: 'Completely eliminates consumer dry-cell purchases'
        }
      ],
      creativeUpcycleIdea: 'Do not upcycle chemical batteries at home for safety. Always take to certified recycling smelters.',
      pointsAwarded: 80,
      ecoFact: 'A single leaking battery can contaminate up to 20,000 liters of soil and underground water tables with heavy metals!',
      materialDetails: 'Steel jacket enclosing Zinc anode, Manganese dioxide cathode, and Potassium hydroxide electrolyte.'
    }
  },
  {
    id: 'sample-soda-can',
    name: 'Aluminium Beverage Soda Can',
    category: 'Metal',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Aluminium Beverage Carbonated Drink Can',
      category: 'Metal',
      confidence: 99,
      binColor: 'Yellow / Metal & Mixed Dry Recyclables Bin',
      binCode: 'yellow',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Drain remaining liquid.',
        'Do NOT crush flat if your regional MRF uses optical sorters, or lightly squash if manually collected.',
        'Keep the tab attached to the can lid (prevents small metal loss in shredders).',
        'Place into Yellow / Metals Recyclable bin.'
      ],
      environmentalImpact: {
        decompositionYears: '200 to 500 years in nature',
        co2SavingsGrams: 190,
        weightGrams: 14,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'Reusable Carbonator / SodaMaker Machine',
          description: 'Make sparkling beverages at home using refillable CO₂ gas cylinders and tap water.',
          impactBenefit: 'Eliminates hundreds of single-serve canned beverages yearly'
        },
        {
          title: 'Buy in Large Volume or Refillable Glass Kegs',
          description: 'Saves unit packaging and transportation energy.',
          impactBenefit: '35% reduction in packaging per liter'
        }
      ],
      creativeUpcycleIdea: 'Turn clean cans into pencil organizers, mini herb seedling pots, or acoustic phone sound amplifiers.',
      pointsAwarded: 50,
      ecoFact: 'Recycling aluminium requires 95% LESS energy than smelting virgin bauxite ore, and a recycled can is back on the store shelf in 60 days!',
      materialDetails: 'High-grade 3004/5182 aluminium alloy — infinitely recyclable without downgrading.'
    }
  }
];
