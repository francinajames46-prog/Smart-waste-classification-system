import React, { useState } from 'react';
import { 
  TrendingUp, 
  Leaf, 
  Recycle, 
  Award, 
  Calendar, 
  Download, 
  Share2, 
  Sparkles, 
  Trash2, 
  CheckCircle, 
  Flame, 
  Printer, 
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useEco } from '../context/EcoContext';
import { WasteCategory } from '../types/waste';

export const DashboardTab: React.FC = () => {
  const { points, history, userLevel, streakDays, setActiveTab } = useEco();
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [certUserName, setCertUserName] = useState<string>('Eco Innovator');

  // Aggregations
  const totalItems = history.length;
  const totalWeightGrams = history.reduce((acc, curr) => acc + (curr.weightGrams || 0), 0);
  const totalWeightKg = (totalWeightGrams / 1000).toFixed(2);

  const totalCO2Grams = history.reduce((acc, curr) => acc + (curr.co2SavedGrams || 0), 0);
  const totalCO2Kg = (totalCO2Grams / 1000).toFixed(2);

  // Equivalent trees calculation (approx 21kg CO2 sequestered per tree per year)
  const treesEquiv = (totalCO2Grams / 21000).toFixed(2);

  // Category counts
  const categoryCounts: Record<string, number> = {};
  history.forEach(item => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });

  const categoryColors: Record<string, { bg: string; text: string; bar: string }> = {
    'Plastic': { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-500' },
    'Veg & Organic Waste': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500' },
    'Paper & Cardboard': { bg: 'bg-sky-500/10', text: 'text-sky-400', bar: 'bg-sky-500' },
    'Glass': { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-500' },
    'Metal': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', bar: 'bg-indigo-500' },
    'Hazardous': { bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'bg-rose-500' },
    'E-Waste': { bg: 'bg-purple-500/10', text: 'text-purple-400', bar: 'bg-purple-500' },
  };

  const handlePrintCert = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Title and Certificate CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Personal Impact Ledger
            </span>
            <span className="text-xs text-slate-400">• Updated in real time</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Sustainability Activity Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track your diverted landfill tonnage, prevented carbon emissions, and circular economy rewards.
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition active:scale-95 shrink-0"
        >
          <Award className="w-4 h-4 stroke-[2.5]" />
          <span>View Eco Impact Certificate</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Waste Diverted */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Landfill Diverted</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Recycle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalWeightKg} <span className="text-sm font-semibold text-emerald-400">kg</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Saved from municipal open dumps
          </p>
        </div>

        {/* Metric 2: CO2 Footprint Avoided */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-teal-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">CO₂ Prevented</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalCO2Kg} <span className="text-sm font-semibold text-teal-300">kg CO₂e</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ≈ {treesEquiv} tree-seedling year offset
          </p>
        </div>

        {/* Metric 3: Total Items Classified */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-sky-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Items Segregated</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalItems} <span className="text-sm font-semibold text-sky-400">items</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            100% verified disposal guidance
          </p>
        </div>

        {/* Metric 4: EcoPoints & Level */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">EcoPoints Balance</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {points} <span className="text-sm font-semibold text-amber-400">PTS</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold">{userLevel.title}</span>
            <span className="text-amber-400/90 font-medium">{userLevel.progressPercent}% to next</span>
          </div>
        </div>
      </div>

      {/* Progress & Tier Strip */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-black">
              L{userLevel.level}
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Current Eco Citizen Tier</span>
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <span>{userLevel.title}</span>
                <span className="text-xs text-emerald-400 font-normal">({points} / {userLevel.nextLevelPoints} pts)</span>
              </h3>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('coupons')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1"
          >
            <span>Unlock partner discount coupons</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${userLevel.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Category Breakdown & Scan History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Material Segregation Distribution */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Waste Stream Segregation Distribution</span>
            </h3>
            <p className="text-xs text-slate-400">
              Breakdown of items sorted across municipal collection streams
            </p>
          </div>

          <div className="space-y-3.5">
            {Object.keys(categoryCounts).length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">No items classified yet.</p>
            ) : (
              Object.entries(categoryCounts).map(([cat, count]) => {
                const percent = totalItems > 0 ? Math.round((count / totalItems) * 100) : 0;
                const colors = categoryColors[cat] || { bg: 'bg-slate-800', text: 'text-slate-300', bar: 'bg-emerald-500' };

                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{cat}</span>
                      <span className={colors.text}>
                        {count} items ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                      <div
                        className={`${colors.bar} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>🔥 {streakDays}-Day Sorting Streak active</span>
            <button
              onClick={() => setActiveTab('challenges')}
              className="text-amber-400 font-bold hover:underline"
            >
              Complete Daily Quests →
            </button>
          </div>
        </div>

        {/* Right: Detailed Activity Log */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Recent Classification & Disposal Log</span>
              </h3>
              <p className="text-xs text-slate-400">
                Audited timeline of items correctly deposited and points credited
              </p>
            </div>
            <button
              onClick={() => setActiveTab('scanner')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              + Scan New Item
            </button>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {history.map((record) => {
              const dateStr = new Date(record.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={record.id}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {record.imageUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                        <img
                          src={record.imageUrl}
                          alt={record.itemName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {record.category}
                        </span>
                        <span className="text-[10px] text-slate-500">{dateStr}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-emerald-300 transition">
                        {record.itemName}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Bin: <span className="text-slate-300">{record.binColor}</span> • Saved {record.co2SavedGrams}g CO₂
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-black text-amber-300 block">
                      +{record.pointsEarned} PTS
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Certificate Frame */}
            <div className="border-4 border-double border-emerald-500/30 rounded-2xl p-6 sm:p-8 bg-slate-950/80 text-center space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Sustainability Credential</span>
              </div>

              <div>
                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  Certificate of Circular Stewardship
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Issued by EcoSort AI Municipal Circular Recovery Network
                </p>
              </div>

              <div className="py-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-semibold">Awarded to</span>
                <input
                  type="text"
                  value={certUserName}
                  onChange={(e) => setCertUserName(e.target.value)}
                  className="text-lg sm:text-2xl font-black text-amber-300 bg-transparent text-center border-b border-dashed border-slate-700 hover:border-emerald-500 focus:outline-none focus:border-emerald-400 px-4 py-1"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                In recognition of exceptional diligence in computer-vision verified waste segregation, diverting <strong className="text-emerald-300">{totalWeightKg} kg</strong> of refuse from municipal landfills, preventing <strong className="text-teal-300">{totalCO2Kg} kg CO₂</strong> of emissions, and attaining the rank of <strong className="text-amber-300">{userLevel.title}</strong>.
              </p>

              {/* Stats badges in certificate */}
              <div className="grid grid-cols-3 gap-3 border-t border-b border-slate-800/80 py-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Items Sorted</span>
                  <span className="text-base sm:text-lg font-black text-white">{totalItems}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">CO₂ Prevented</span>
                  <span className="text-base sm:text-lg font-black text-emerald-300">{totalCO2Kg} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">EcoPoints</span>
                  <span className="text-base sm:text-lg font-black text-amber-300">{points}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
                <span>Verification ID: #ECO-{Math.abs(history[0]?.timestamp || 12345).toString(36).toUpperCase()}</span>
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
              <button
                onClick={handlePrintCert}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
