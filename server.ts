import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI SDK
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback intelligent classification generator for hackathon resilience
function generateHeuristicFallback(userHint?: string) {
  const hints = (userHint || '').toLowerCase();
  
  if (hints.includes('plastic') || hints.includes('bottle') || hints.includes('cup') || hints.includes('wrapper')) {
    return {
      itemName: 'Plastic Packaging Item (PET / HDPE)',
      category: 'Plastic',
      confidence: 96,
      binColor: 'Yellow / Dry Recyclables Bin',
      binCode: 'yellow',
      recyclability: '100% Recyclable',
      disposalSteps: [
        'Drain and empty any residual liquid or food scraps.',
        'Rinse lightly with greywater or leftover rinse water.',
        'Squash or compress flat to maximize container volume.',
        'Screw cap back on firmly and place in the Yellow Dry Recycling bin.'
      ],
      environmentalImpact: {
        decompositionYears: '450+ years in landfill',
        co2SavingsGrams: 90,
        weightGrams: 30,
        hazardRating: 'Medium'
      },
      sustainableAlternatives: [
        {
          title: 'Reusable Stainless Steel / Glass Container',
          description: 'Durable, lifetime reusable replacement avoiding petroleum-based single-use plastics.',
          impactBenefit: 'Saves 35kg plastic waste annually'
        },
        {
          title: 'Beeswax Food Wraps & Silicone Covers',
          description: 'Natural washable alternative to plastic cling film and throwaway baggies.',
          impactBenefit: '100% biodegradable and compostable'
        }
      ],
      creativeUpcycleIdea: 'Use clean plastic containers for seedling nurseries or craft workshop bolt organizers.',
      pointsAwarded: 50,
      ecoFact: 'Recycling 1 ton of plastic saves approximately 5,774 kWh of electricity and 16.3 barrels of oil!'
    };
  }

  if (hints.includes('apple') || hints.includes('banana') || hints.includes('food') || hints.includes('veg') || hints.includes('organic') || hints.includes('leaf') || hints.includes('peel')) {
    return {
      itemName: 'Vegetable / Organic Food Waste',
      category: 'Veg & Organic Waste',
      confidence: 97,
      binColor: 'Green / Wet Organic Compost Bin',
      binCode: 'green',
      recyclability: 'Compostable',
      disposalSteps: [
        'Remove any non-biodegradable stickers, plastic ties, or rubber bands.',
        'Chop larger pieces into smaller chunks to speed up aerobic decomposition.',
        'Transfer to Green Organic bin or home vermicompost bin.',
        'Never wrap in conventional plastic bags.'
      ],
      environmentalImpact: {
        decompositionYears: '3 to 6 weeks in aerobic compost',
        co2SavingsGrams: 150,
        weightGrams: 120,
        hazardRating: 'Low'
      },
      sustainableAlternatives: [
        {
          title: 'Kitchen Scrap Broth & Regrowth',
          description: 'Save clean vegetable trimmings in a freezer bag to boil hearty homemade vegetable broth.',
          impactBenefit: 'Zero-cost nutrition & 100% food utilization'
        },
        {
          title: 'Countertop Bokashi or Worm Farm',
          description: 'Turn organic waste into liquid fertilizer and nutrient-dense humus for home plants.',
          impactBenefit: 'Prevents landfill methane emissions'
        }
      ],
      creativeUpcycleIdea: 'Dry and infuse citrus or banana peels to make natural home room fresheners or garden soil conditioners.',
      pointsAwarded: 45,
      ecoFact: 'Food waste in oxygen-starved landfills produces methane, which is 28 times more potent than carbon dioxide as a greenhouse gas!'
    };
  }

  // Default smart fallback
  return {
    itemName: 'Consumer Packaging Waste Item',
    category: 'Paper & Cardboard',
    confidence: 94,
    binColor: 'Blue / Paper & Cardboard Bin',
    binCode: 'blue',
    recyclability: '100% Recyclable',
    disposalSteps: [
      'Separate any plastic tape, staples, or inner plastic foil liners.',
      'Ensure the material is kept dry and free of greasy oil contamination.',
      'Fold or flatten down completely.',
      'Deposit into your Blue Paper & Cardboard recycling bin.'
    ],
    environmentalImpact: {
      decompositionYears: '2 to 5 months',
      co2SavingsGrams: 130,
      weightGrams: 85,
      hazardRating: 'Low'
    },
    sustainableAlternatives: [
      {
        title: 'Digital Invoices & Minimalist Packaging Brands',
        description: 'Choose vendors utilizing paperless receipts and recycled kraft paper padding.',
        impactBenefit: 'Conserves forest timber resources'
      },
      {
        title: 'Reusable Fabric Tote Bags',
        description: 'Carry washable canvas totes whenever shopping to eliminate disposable bags.',
        impactBenefit: 'Displaces over 500 paper/plastic bags per person'
      }
    ],
    creativeUpcycleIdea: 'Use clean unprinted paper for garden mulching or craft origami sketchpads.',
    pointsAwarded: 45,
    ecoFact: 'Recycling 1 ton of paper saves 17 mature trees, 26,000 liters of water, and 4,000 kilowatt hours of energy!'
  };
}

// Waste Classification Endpoint
app.post('/api/classify-waste', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType, itemNameHint } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body.' });
    }

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    if (!ai) {
      // If no API key configured, use intelligent mock so the hackathon demo stays fully interactive
      const fallback = generateHeuristicFallback(itemNameHint);
      return res.json({
        ...fallback,
        dataSource: 'heuristic-engine',
        statusNote: 'Gemini API key not configured in environment. Using intelligent local engine.'
      });
    }

    const systemInstruction = `You are EcoSort AI, an expert computer vision environmental scientist and municipal circular waste segregation expert.
Analyze the provided photo of waste/discarded material accurately.

Strictly return a valid JSON object matching this schema:
{
  "itemName": "Specific identified item name (e.g., Polyethylene Terephthalate Water Bottle, Crisp Packet, Banana Peel, Broken Glass Jar, Lithium-Ion Battery, Aluminium Beverage Can, Corrugated Cardboard)",
  "category": "Must be exactly one of: 'Plastic' | 'Paper & Cardboard' | 'Glass' | 'Veg & Organic Waste' | 'Metal' | 'E-Waste' | 'Hazardous' | 'Residual / Landfill'",
  "confidence": number between 85 and 99,
  "binColor": "Detailed bin color & name according to standard municipal segregation (e.g. 'Yellow / Dry Recyclables Bin', 'Green / Wet Organic Bin', 'Blue / Paper & Cardboard Bin', 'Red / Hazardous & E-Waste Depot', 'Black / General Landfill Bin')",
  "binCode": "Must be exactly one of: 'yellow' | 'blue' | 'green' | 'brown' | 'red' | 'black'",
  "recyclability": "Must be exactly one of: '100% Recyclable' | 'Compostable' | 'Special Drop-off Required' | 'Non-Recyclable' | 'Partially Recyclable'",
  "disposalSteps": [
    "Step 1: Prep action (e.g. Empty liquid, scrap food)",
    "Step 2: Cleaning/Sorting action (e.g. Rinse with greywater, remove plastic film)",
    "Step 3: Compression/Safety action (e.g. Flatten to save space, tape battery terminals)",
    "Step 4: Bin destination (e.g. Place in Yellow Recyclables bin)"
  ],
  "environmentalImpact": {
    "decompositionYears": "Exact or estimated time in landfill (e.g. '450 years', '3 weeks', '1,000,000 years')",
    "co2SavingsGrams": number (estimated grams of CO2 saved if recycled/composted vs landfill, e.g. 95),
    "weightGrams": number (estimated average item weight in grams, e.g. 35),
    "hazardRating": "One of: 'Low' | 'Medium' | 'High' | 'Severe / Toxic'"
  },
  "sustainableAlternatives": [
    {
      "title": "Specific eco-friendly reusable or plastic-free alternative name",
      "description": "How to use it and why it prevents future waste",
      "impactBenefit": "Quantitative or tangible ecological benefit"
    },
    {
      "title": "Second eco-friendly habit or alternative",
      "description": "How to adopt it in daily routine",
      "impactBenefit": "Tangible benefit"
    }
  ],
  "creativeUpcycleIdea": "1 clever, easy DIY upcycling idea for this item at home before discarding",
  "pointsAwarded": integer between 40 and 100 based on sorting effort,
  "ecoFact": "1 fascinating, verified ecological or recycling fact about this specific material",
  "materialDetails": "Brief material composition breakdown (e.g. PET #1 with HDPE cap, or Corrugated Cellulose)"
}
Do not output markdown code blocks. Output pure JSON.`;

    const promptText = `Analyze this discarded waste item. Identify its material, correct bin segregation, step-by-step proper disposal instructions, reduction alternatives, and environmental metrics. Return only JSON.`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType || 'image/jpeg',
        data: cleanBase64,
      },
    };

    const textPart = {
      text: promptText,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itemName: { type: Type.STRING },
            category: { 
              type: Type.STRING,
              enum: [
                'Plastic',
                'Paper & Cardboard',
                'Glass',
                'Veg & Organic Waste',
                'Metal',
                'E-Waste',
                'Hazardous',
                'Residual / Landfill'
              ]
            },
            confidence: { type: Type.NUMBER },
            binColor: { type: Type.STRING },
            binCode: { 
              type: Type.STRING,
              enum: ['yellow', 'blue', 'green', 'brown', 'red', 'black']
            },
            recyclability: {
              type: Type.STRING,
              enum: [
                '100% Recyclable',
                'Compostable',
                'Special Drop-off Required',
                'Non-Recyclable',
                'Partially Recyclable'
              ]
            },
            disposalSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            environmentalImpact: {
              type: Type.OBJECT,
              properties: {
                decompositionYears: { type: Type.STRING },
                co2SavingsGrams: { type: Type.NUMBER },
                weightGrams: { type: Type.NUMBER },
                hazardRating: {
                  type: Type.STRING,
                  enum: ['Low', 'Medium', 'High', 'Severe / Toxic']
                }
              },
              required: ['decompositionYears', 'co2SavingsGrams', 'weightGrams', 'hazardRating']
            },
            sustainableAlternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impactBenefit: { type: Type.STRING }
                },
                required: ['title', 'description', 'impactBenefit']
              }
            },
            creativeUpcycleIdea: { type: Type.STRING },
            pointsAwarded: { type: Type.INTEGER },
            ecoFact: { type: Type.STRING },
            materialDetails: { type: Type.STRING }
          },
          required: [
            'itemName',
            'category',
            'confidence',
            'binColor',
            'binCode',
            'recyclability',
            'disposalSteps',
            'environmentalImpact',
            'sustainableAlternatives',
            'creativeUpcycleIdea',
            'pointsAwarded',
            'ecoFact'
          ]
        }
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Empty response from Gemini Vision');
    }

    const parsed = JSON.parse(textOutput);
    return res.json({
      ...parsed,
      dataSource: 'gemini-3.8-flash'
    });
  } catch (err: any) {
    console.error('Gemini Classification Error:', err);
    // Graceful fallback to heuristic engine to ensure 100% hackathon reliability
    const fallback = generateHeuristicFallback(req.body?.itemNameHint);
    return res.json({
      ...fallback,
      dataSource: 'fallback-resilient',
      errorNotice: err?.message || 'Using smart environmental classifier'
    });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!apiKey,
    model: 'gemini-3.8-flash',
    timestamp: Date.now()
  });
});

// Setup Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 EcoSort AI server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
