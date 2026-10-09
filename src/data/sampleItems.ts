import { WasteClassificationResult } from '../types/waste';

export interface SampleItem {
  id: string;
  name: string;
  category: string;
  categoryTitle: string; // Title group: "Plastic Waste", "Veg & Organic Waste", "Glass Waste", "Paper & Cardboard", "Metal Waste", "Hazardous & E-Waste"
  image: string;
  classification: WasteClassificationResult;
}

export const SAMPLE_CATEGORY_TABS = [
  'All Presets',
  'Plastic Waste',
  'Veg & Organic Waste',
  'Glass Waste',
  'Paper & Cardboard',
  'Metal Waste',
  'Hazardous & E-Waste'
] as const;

export const SAMPLE_WASTE_ITEMS: SampleItem[] = [
  // ─── 1. PLASTIC WASTE ───
  {
    id: 'sample-plastic-bottle',
    name: 'PET Mineral Water Bottle',
    category: 'Plastic',
    categoryTitle: 'Plastic Waste',
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
          description: 'Keeps water cold 24h and displaces ~1,400 disposable bottles across its lifetime.',
          impactBenefit: 'Saves ~42 kg plastic waste/year'
        },
        {
          title: 'BPA-Free Borosilicate Glass Canteen',
          description: 'Infinite clean taste without microplastic leaching or petroleum chemical footprint.',
          impactBenefit: 'Zero toxic chemical exposure'
        }
      ],
      creativeUpcycleIdea: 'Cut off top to create a self-watering seed propagator or funnel.',
      pointsAwarded: 50,
      ecoFact: 'Recycling 1 ton of PET plastic saves 3.8 barrels of crude oil and prevents 1.5 tons of greenhouse gases!',
      materialDetails: 'PETE (Resin ID Code 1) - High recyclability, high demand in textiles.'
    }
  },
  {
    id: 'sample-plastic-container',
    name: 'Takeout Food Box (PP #5)',
    category: 'Plastic',
    categoryTitle: 'Plastic Waste',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Polypropylene Takeout Meal Container (PP #5)',
      category: 'Plastic',
      confidence: 96,
      binColor: 'Yellow / Dry Recyclables Bin',
      binCode: 'yellow',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Scrape out all food grease, sauces, and leftovers.',
        'Rinse thoroughly with warm soapy dishwater (food grease ruins plastic balers).',
        'Stack together with matching lid.',
        'Drop into the Yellow / Rigid Plastics recycling bin.'
      ],
      environmentalImpact: {
        decompositionYears: '20 to 30 years',
        co2SavingsGrams: 95,
        weightGrams: 35,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'BYO Stainless Steel Tiffin / Glass Bento Box',
          description: 'Carry your own leakproof container to takeout food vendors for waste-free dining.',
          impactBenefit: 'Eliminates 250+ takeout boxes per year'
        },
        {
          title: 'Bagasse Sugarcane Compostable Clamshells',
          description: '100% agricultural waste fiber that biodegrades in 60-90 days.',
          impactBenefit: 'Fully compostable plant biomass'
        }
      ],
      creativeUpcycleIdea: 'Wash thoroughly and reuse as drawer dividers for craft supplies, hardware screws, or frozen leftovers.',
      pointsAwarded: 55,
      ecoFact: 'Polypropylene (PP #5) has a high melting point and can be recycled into battery cases, brooms, and auto parts!',
      materialDetails: 'PP #5 (Polypropylene) - Heat resistant, durable rigid thermoplastic.'
    }
  },
  {
    id: 'sample-plastic-bag',
    name: 'Plastic Shopping Bag (LDPE #4)',
    category: 'Plastic',
    categoryTitle: 'Plastic Waste',
    image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Low-Density Polyethylene Film Carrier Bag (LDPE #4)',
      category: 'Plastic',
      confidence: 97,
      binColor: 'Yellow / Soft Plastics Drop-Off Stream',
      binCode: 'yellow',
      recyclability: 'Special Drop-off Required',
      disposalSteps: [
        'DO NOT put in curbside automated recycling bins (plastic film jams sorting conveyor belts).',
        'Shake out any dirt, receipt papers, or moisture.',
        'Bundle multiple soft plastic bags together inside one bag.',
        'Take to front-of-store supermarket collection bins (e.g. Trex / REDcycle soft plastic bins).'
      ],
      environmentalImpact: {
        decompositionYears: '500+ years, breaks down into toxic microplastics',
        co2SavingsGrams: 60,
        weightGrams: 8,
        hazardRating: 'High'
      },
      sustainableAlternatives: [
        {
          title: 'Organic Cotton Canvas Tote Bag',
          description: 'Foldable, washable cloth bag with 10-year durability that replaces thousands of plastic bags.',
          impactBenefit: 'Prevents ocean plastic entanglement'
        },
        {
          title: 'Net Mesh Produce Bags',
          description: 'Breathable bags for fruits and vegetables that prevent mold and single-use tear-off plastic bags.',
          impactBenefit: 'Keeps produce fresher longer'
        }
      ],
      creativeUpcycleIdea: 'Knit into strong waterproof "plarn" (plastic yarn) mats or use as padding material for parcel shipping.',
      pointsAwarded: 45,
      ecoFact: 'Plastic shopping bags are used for an average of only 12 minutes, but persist in natural environments for over 5 centuries!',
      materialDetails: 'LDPE (Low-Density Polyethylene) - Flexible thin-film thermoplastic.'
    }
  },

  // ─── 2. VEG & ORGANIC WASTE ───
  {
    id: 'sample-banana-peel',
    name: 'Banana Peel & Fruit Scraps',
    category: 'Veg & Organic Waste',
    categoryTitle: 'Veg & Organic Waste',
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
          title: 'Banana Peel Plant Fertilizer Tea',
          description: 'Soak peels in water for 48 hours to create a rich potassium-phosphorus organic tonic for houseplants.',
          impactBenefit: 'Zero waste + free organic plant tonic'
        },
        {
          title: 'Banana Peel Baking & Seasoned Crisps',
          description: 'Clean organic peels can be pan-fried with smoked paprika or blended into banana bread flour.',
          impactBenefit: 'Upcycles 100% of edible food biomass'
        }
      ],
      creativeUpcycleIdea: 'Rub the inside of the peel on leather shoes or houseplant leaves for natural conditioning and polish!',
      pointsAwarded: 45,
      ecoFact: 'When organic waste enters standard landfills without oxygen, it generates methane—a greenhouse gas 28x more potent than CO₂!',
      materialDetails: '100% Biodegradable biomass rich in Potassium (K), Nitrogen (N), and organic cellulose.'
    }
  },
  {
    id: 'sample-veg-peels',
    name: 'Carrot & Vegetable Trimmings',
    category: 'Veg & Organic Waste',
    categoryTitle: 'Veg & Organic Waste',
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Vegetable Trimmings (Carrot Tops, Onion Skins, Celery Ends)',
      category: 'Veg & Organic Waste',
      confidence: 98,
      binColor: 'Green / Wet Organic Compost Bin',
      binCode: 'green',
      recyclability: 'Compostable',
      disposalSteps: [
        'Inspect to remove any twist-ties, plastic mesh, or rubber produce bands.',
        'Keep separate from dairy, meat, and cooked oils if home composting.',
        'Store in a breathable kitchen countertop compost caddy with charcoal filter.',
        'Empty into the Green Municipal Organic Compost container.'
      ],
      environmentalImpact: {
        decompositionYears: '3 to 6 weeks in aerobic compost',
        co2SavingsGrams: 155,
        weightGrams: 130,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'Freezer Scrap Golden Veggie Broth',
          description: 'Collect all clean vegetable ends in a freezer container and boil for 45 minutes into rich homemade culinary stock.',
          impactBenefit: '100% kitchen food waste utilization'
        },
        {
          title: 'Kitchen Regrowth in Water',
          description: 'Place celery bases and green onion root ends in a shallow dish of water on windowsills to regrow fresh greens.',
          impactBenefit: 'Infinite free kitchen garnish'
        }
      ],
      creativeUpcycleIdea: 'Simmer onion skins with water and white vinegar to create an all-natural golden-amber fabric or Easter egg dye.',
      pointsAwarded: 50,
      ecoFact: 'Composting vegetable trimmings enriches soil with humus, improving moisture retention and eliminating chemical synthetic fertilizers!',
      materialDetails: 'High-nitrogen organic green compost material rich in natural vitamins and water.'
    }
  },

  // ─── 3. GLASS WASTE ───
  {
    id: 'sample-glass-jar',
    name: 'Clear Glass Jam Jar with Lid',
    category: 'Glass',
    categoryTitle: 'Glass Waste',
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
          description: 'Wash and repurpose this glass jar for dry spices, chia seeds, oats, or homemade salad dressings.',
          impactBenefit: 'Permanently eliminates buying new food containers'
        },
        {
          title: 'Meal Prep Overnight Oats Vessel',
          description: 'Airtight, non-toxic, and microwave-safe food storage vessel with zero microplastics.',
          impactBenefit: 'Reduces disposable food packaging'
        }
      ],
      creativeUpcycleIdea: 'Turn into a rustic fairy-light lantern, desk pencil holder, or bathroom cotton-swab organizer.',
      pointsAwarded: 55,
      ecoFact: 'Glass can be recycled infinitely without any loss in purity, clarity, or structural strength!',
      materialDetails: 'Soda-lime glass (70% silica sand, soda ash, limestone) + Tinplate steel lid.'
    }
  },
  {
    id: 'sample-glass-bottle',
    name: 'Green Beverage Glass Bottle',
    category: 'Glass',
    categoryTitle: 'Glass Waste',
    image: 'https://images.unsplash.com/photo-1606851094655-b2593a9af63f?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Emerald Green Glass Beverage Bottle',
      category: 'Glass',
      confidence: 97,
      binColor: 'Blue / Glass Container Stream',
      binCode: 'blue',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Pour out any remaining drink liquid.',
        'Remove crown metal bottle cap and dispose of cap in Yellow metal stream.',
        'Place gently in the Blue Glass Recycling bin or reverse vending deposit machine.',
        'Do not break into shards as sorting facilities handle whole bottles.'
      ],
      environmentalImpact: {
        decompositionYears: '1,000,000+ years',
        co2SavingsGrams: 180,
        weightGrams: 230,
        hazardRating: 'Medium'
      },
      sustainableAlternatives: [
        {
          title: 'Returnable Deposit Scheme Bottles',
          description: 'Purchase drinks from breweries offering circular bottle return deposits where bottles are sterilized and refilled 30+ times.',
          impactBenefit: '95% reduction in production carbon'
        },
        {
          title: 'Home Beverage Infuser Bottle',
          description: 'Refill with filtered water infused with lemon, mint, or cucumber slices.',
          impactBenefit: 'Zero commercial packaging waste'
        }
      ],
      creativeUpcycleIdea: 'Use as a sleek minimalist flower bud vase or oil & vinegar dispenser with a pour spout.',
      pointsAwarded: 50,
      ecoFact: 'Using recycled glass cullet reduces glass furnace operating temperatures, saving significant energy and carbon emissions!',
      materialDetails: 'Color-tinted soda-lime silicate glass.'
    }
  },

  // ─── 4. PAPER & CARDBOARD ───
  {
    id: 'sample-cardboard-box',
    name: 'Corrugated Shipping Box',
    category: 'Paper & Cardboard',
    categoryTitle: 'Paper & Cardboard',
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
          impactBenefit: 'Saves 80% lifecycle packaging footprint'
        },
        {
          title: 'Garden Sheet Mulching / Weed Barrier',
          description: 'Lay flattened plain brown cardboard directly on garden soil under mulch to naturally block weeds and decompose into earthworm food.',
          impactBenefit: 'Replaces chemical weedkiller and plastic weed mats'
        }
      ],
      creativeUpcycleIdea: 'Use as drawer dividers, child craft playhouse, or tear into brown carbon layers for composting.',
      pointsAwarded: 45,
      ecoFact: 'Recycling 1 ton of cardboard saves 17 mature trees, 7,000 gallons of water, and 4,000 kWh of electricity!',
      materialDetails: 'Kraft unbleached corrugated fiberboard (renewable softwood cellulose).'
    }
  },
  {
    id: 'sample-newspaper',
    name: 'Printed Newspaper / Paper Sheets',
    category: 'Paper & Cardboard',
    categoryTitle: 'Paper & Cardboard',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Post-Consumer Printed Newsprint & Office Paper',
      category: 'Paper & Cardboard',
      confidence: 99,
      binColor: 'Blue / Paper & Cardboard Bin',
      binCode: 'blue',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Ensure paper is clean and dry (no food grease, oil stains, or wax coating).',
        'Remove any metal binder clips or plastic document sleeves.',
        'Stack or bundle neatly.',
        'Deposit into the Blue Paper Recycling bin.'
      ],
      environmentalImpact: {
        decompositionYears: '6 weeks to 3 months',
        co2SavingsGrams: 110,
        weightGrams: 75,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'Digital News & E-Reader Subscriptions',
          description: 'Read daily news and journals online or on e-ink tablets to eliminate paper consumption completely.',
          impactBenefit: 'Saves 100+ kg paper per household yearly'
        },
        {
          title: 'Double-Sided Draft Printing & Cloud Docs',
          description: 'Default all office printing to duplex draft mode or collaborate digitally with Google Docs.',
          impactBenefit: 'Cuts paper footprint by 50%'
        }
      ],
      creativeUpcycleIdea: 'Use crumpled newspaper for streak-free window cleaning, parcel protective wrap, or origami crafts.',
      pointsAwarded: 40,
      ecoFact: 'Paper fibers can be recycled 5 to 7 times before the fibers become too short to make new sheets!',
      materialDetails: 'Mechanical wood pulp newsprint cellulose.'
    }
  },

  // ─── 5. METAL WASTE ───
  {
    id: 'sample-soda-can',
    name: 'Aluminium Beverage Can',
    category: 'Metal',
    categoryTitle: 'Metal Waste',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Aluminium Beverage Carbonated Drink Can',
      category: 'Metal',
      confidence: 99,
      binColor: 'Yellow / Metal & Mixed Dry Recyclables Bin',
      binCode: 'yellow',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Drain remaining liquid completely.',
        'Do NOT crush flat if your regional MRF uses optical air sorters, or lightly squash if manually collected.',
        'Keep the tab attached to the can lid (prevents small metal loss in sorting shredders).',
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
          impactBenefit: 'Eliminates hundreds of single-serve cans yearly'
        },
        {
          title: 'Buy in Large Volume or Refillable Glass Growlers',
          description: 'Saves unit packaging and transportation footprint.',
          impactBenefit: '35% reduction in packaging per liter'
        }
      ],
      creativeUpcycleIdea: 'Turn clean cans into desk pencil organizers, mini herb seedling pots, or acoustic phone sound amplifiers.',
      pointsAwarded: 50,
      ecoFact: 'Recycling aluminium requires 95% LESS energy than smelting virgin bauxite ore, and a recycled can is back on the shelf in 60 days!',
      materialDetails: 'High-grade 3004/5182 aluminium alloy—infinitely recyclable without degradation.'
    }
  },
  {
    id: 'sample-tin-can',
    name: 'Steel Canned Food Tin',
    category: 'Metal',
    categoryTitle: 'Metal Waste',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Tinplate Steel Food Preservation Can',
      category: 'Metal',
      confidence: 98,
      binColor: 'Yellow / Metal & Cans Bin',
      binCode: 'yellow',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Empty soup or food residue completely.',
        'Rinse lightly with leftover rinse water.',
        'Tuck the metal lid safely inside the can to prevent cutting sanitation workers.',
        'Place in Yellow / Metal Recycling bin (magnets easily separate steel at sorting facilities).'
      ],
      environmentalImpact: {
        decompositionYears: '50 to 100 years (corrodes faster than aluminium)',
        co2SavingsGrams: 175,
        weightGrams: 55,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'Cook Fresh / Dried Beans in Batch Pressure Cooker',
          description: 'Cooking bulk dried chickpeas and beans saves 80% cost and eliminates tin can waste.',
          impactBenefit: 'Zero packaging + cheaper nutrition'
        },
        {
          title: 'Home Canning in Reusable Mason Jars',
          description: 'Preserve seasonal tomato harvest in reusable glass jars year after year.',
          impactBenefit: 'Eliminates factory canning energy'
        }
      ],
      creativeUpcycleIdea: 'Paint can exterior and punch patterned holes for a beautiful tea-light candle tin lantern.',
      pointsAwarded: 50,
      ecoFact: 'Steel is the most recycled material on Earth! Over 80 million tons of steel are recycled annually across the globe.',
      materialDetails: 'Tin-coated mild steel (tinplate)—100% magnetic and infinitely recyclable.'
    }
  },

  // ─── 6. HAZARDOUS & E-WASTE ───
  {
    id: 'sample-battery',
    name: 'AA Alkaline Household Battery',
    category: 'Hazardous',
    categoryTitle: 'Hazardous & E-Waste',
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
          description: 'Choose electronics with built-in USB-C lithium charging instead of dry-cell slots.',
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
    id: 'sample-ewaste-cable',
    name: 'Discarded Electronics & USB Cables',
    category: 'E-Waste',
    categoryTitle: 'Hazardous & E-Waste',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    classification: {
      itemName: 'Frayed USB Cable & E-Waste Charger Adapter',
      category: 'E-Waste',
      confidence: 98,
      binColor: 'Red / Dedicated E-Waste Drop-off Depot',
      binCode: 'red',
      recyclability: 'Special Drop-off Required',
      disposalSteps: [
        'Never place in curbside wheelie bins (copper and PVC cannot be processed in normal MRFs).',
        'Coil cable neatly and wrap with paper twist tie.',
        'Check if device is repairable with heat-shrink tubing or local repair café.',
        'If broken, deposit into certified e-waste electronics drop-off bins.'
      ],
      environmentalImpact: {
        decompositionYears: 'PVC coating takes 100+ years; precious copper and gold remain trapped',
        co2SavingsGrams: 410,
        weightGrams: 65,
        hazardRating: 'High'
      },
      sustainableAlternatives: [
        {
          title: 'Braided Kevlar/Nylon High-Durability Cables',
          description: 'Invest in reinforced cables with lifetime replacement warranties.',
          impactBenefit: 'Lasts 5x longer than standard cheap silicone wires'
        },
        {
          title: 'Universal GaN Multi-Port Charger',
          description: 'One single 65W GaN wall brick powers your phone, laptop, and tablet simultaneously.',
          impactBenefit: 'Eliminates 3 separate plastic charger blocks'
        }
      ],
      creativeUpcycleIdea: 'Stripped copper wire can be used by crafters for jewelry wiring or garden plant tie supports.',
      pointsAwarded: 85,
      ecoFact: '1 metric ton of e-waste circuitry contains up to 80 times MORE gold than 1 ton of mined gold ore!',
      materialDetails: 'High-purity Copper conductor core + PVC/TPE outer jacket + Nickel-plated USB pins.'
    }
  }
];
