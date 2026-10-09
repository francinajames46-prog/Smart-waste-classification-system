import React from 'react';
import { 
  X, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  CheckCircle, 
  Gift, 
  TrendingUp, 
  Lightbulb, 
  Layers, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useEco } from '../context/EcoContext';

export const HackathonPitchModal: React.FC = () => {
  const { showPitchGuide, setShowPitchGuide } = useEco();

  if (!showPitchGuide) return null;

  const STEPS = [
    {
      step: '01',
      title: 'Image Capture & Ingestion',
      subtitle: 'Camera / Upload / Preset Samples',
      desc: 'User takes a picture of discarded trash or uploads an image. Image is converted to clean base64 data and dispatched to the full-stack server.',
      icon: Layers,
      color: 'from-blue-500 to-sky-400'
    },
    {
      step: '02',
      title: 'Multimodal Gemini Vision Inference',
      subtitle: 'Material & Resin Identification',
      desc: 'Gemini 3.8 Flash analyzes visual contours, surface texture, and reflectivity to determine material type (PET, HDPE, Glass, Organic Biomass, Alkaline Cell, Aluminium) with 95%+ confidence.',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-400'
    },
    {
      step: '03',
      title: 'Intelligent Segregation & Actionable Protocol',
      subtitle: 'Bin Color Standard & Prep Steps',
      desc: 'Assigns the exact municipal bin color (Yellow, Green, Blue, Red) and generates preparation steps: draining liquids, removing caps, flattening cardboard, or insulating battery terminals.',
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-400'
    },
    {
      step: '04',
      title: 'Source Waste Reduction & Eco-Swaps',
      subtitle: 'Circular Economy Alternatives',
      desc: 'Suggests permanent reusable replacements (e.g., insulated metal flasks, beeswax wraps) and instant DIY upcycling ideas to curb future trash generation at the source.',
      icon: Lightbulb,
      color: 'from-teal-500 to-emerald-400'
    },
    {
      step: '05',
      title: 'Sustainability Ledger & Impact KPIs',
      subtitle: 'Carbon & Landfill Telemetry',
      desc: 'Calculates cumulative kilograms of landfill diverted and CO₂ emissions prevented. Issues official downloadable Eco-Stewardship Certificates.',
      icon: TrendingUp,
      color: 'from-sky-500 to-indigo-400'
    },
    {
      step: '06',
      title: 'Incentive Loop & Coupon Unlocking',
      subtitle: 'Gamified EcoPoints to Real Vouchers',
      desc: 'EcoPoints accumulated from proper disposals and daily challenges can be redeemed for actual discount codes and scannable barcodes with sustainable sponsor brands.',
      icon: Gift,
      color: 'from-purple-500 to-pink-400'
    }
  ];

  const NOVEL_FEATURES = [
    {
      title: 'Hardware IoT Smart Bin Integration',
      desc: 'Deploy low-cost ESP32 or Raspberry Pi cameras on public trash bins to automatically classify items in real-time as users approach the bin flap.'
    },
    {
      title: 'Municipal Contamination Penalty Reduction',
      desc: 'Integrate with municipal waste management APIs so neighborhoods that maintain >90% sorting accuracy receive municipal property tax credits.'
    },
    {
      title: 'Product UPC Barcode to Resin Code Database',
      desc: 'Allow users to scan product barcodes for instant disassembly guides (e.g. peel polypropylene sleeve from polyethylene bottle body).'
    },
    {
      title: 'Corporate Sponsored Carbon Credits & Vouchers',
      desc: 'Brands sponsor high-value coupon pools (Starbucks, Patagonia, Whole Foods) to fulfill their ESG corporate sustainability mandates.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 my-8">
        <button
          onClick={() => setShowPitchGuide(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hackathon Presentation Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            EcoSort AI: System Architecture & Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            A step-by-step technical breakdown of how our application operates, followed by high-impact feature extensions to showcase to judges.
          </p>
        </div>

        {/* Workflow Diagram Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
            <span>Core Step-by-Step Operating Pipeline</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2.5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                      STEP {step.step}
                    </span>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${step.color} flex items-center justify-center text-slate-950 shadow-md`}>
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {step.title}
                    </h4>
                    <span className="text-[10px] text-emerald-300/80 font-medium block">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Judge Pitch Novel Features */}
        <div className="space-y-4 border-t border-slate-800 pt-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Judge Q&A: Proposed High-Impact Novel Extensions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NOVEL_FEATURES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 pl-7 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pitch Script Summary */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 text-xs text-slate-300 space-y-2">
          <span className="font-bold text-emerald-300 flex items-center space-x-1.5">
            <Globe className="w-4 h-4" />
            <span>30-Second Elevator Pitch Summary:</span>
          </span>
          <p className="leading-relaxed">
            "Over 60% of recyclable material ends up in landfills due to confusion over proper bin segregation. <strong>EcoSort AI</strong> solves this at the moment of disposal using Gemini Vision to classify waste, guide preparation steps, recommend sustainable alternatives, and turn positive environmental actions into redeemable discount coupons—creating a self-sustaining circular economy incentive loop."
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowPitchGuide(false)}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
          >
            Got It! Close Presentation
          </button>
        </div>
      </div>
    </div>
  );
};
