import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  CheckCircle2, 
  Search, 
  ExternalLink,
  Layers,
  Recycle,
  Sparkles
} from 'lucide-react';
import { ECO_DROP_OFFS, DropOffLocation } from '../data/challengesAndCoupons';

export const EcoMapTab: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedLoc, setSelectedLoc] = useState<DropOffLocation | null>(ECO_DROP_OFFS[0]);

  const filteredLocations = filterType === 'all'
    ? ECO_DROP_OFFS
    : ECO_DROP_OFFS.filter(loc => loc.type.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local Circular Infrastructure</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Nearby Eco Drop-Off Hubs & Centers
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Find certified neighborhood sorting depots, community composting tumblers, and hazardous battery drop-off banks within your municipality.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Centers' },
          { id: 'recycling', label: 'Recycling Hubs (Plastics, Cans, Paper)' },
          { id: 'compost', label: 'Community Compost (Veg & Food Scraps)' },
          { id: 'e-waste', label: 'E-Waste & Battery Depots' },
          { id: 'textile', label: 'Fabric & Clothes Banks' }
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setFilterType(chip.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === chip.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map Visualizer (Left) + Locations Directory (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Map Preview Canvas / Simulation */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[16/10] flex items-center justify-center">
            {/* Stylized vector map grid background */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Simulated Road Lines */}
            <div className="absolute w-full h-1 bg-slate-800 rotate-12 top-1/3" />
            <div className="absolute w-full h-1 bg-slate-800 -rotate-6 bottom-1/3" />
            <div className="absolute h-full w-1 bg-slate-800 left-1/2" />

            {/* Pins on map */}
            {ECO_DROP_OFFS.map((loc, idx) => {
              const isSelected = selectedLoc?.id === loc.id;
              // arbitrary pseudo-coordinates on the mockup map
              const positions = [
                { top: '35%', left: '42%' },
                { top: '55%', left: '68%' },
                { top: '25%', left: '75%' },
                { top: '65%', left: '28%' }
              ];
              const pos = positions[idx % positions.length];

              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
                >
                  <div className={`p-2 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-500 border-white text-slate-950 scale-125 shadow-lg shadow-emerald-500/50'
                      : 'bg-slate-900 border-emerald-400 text-emerald-400 group-hover:scale-110'
                  }`}>
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    {loc.name.split(' ')[0]} ({loc.distance})
                  </span>
                </div>
              );
            })}

            {/* Center User Location Radar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-sky-500/30 border border-sky-400 animate-ping absolute -top-2 -left-2" />
              <div className="w-4 h-4 rounded-full bg-sky-500 border-2 border-white shadow-lg relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>

            {/* Floating Info Pill on Selected Location */}
            {selectedLoc && (
              <div className="absolute bottom-3 inset-x-3 bg-slate-900/95 backdrop-blur border border-emerald-500/40 rounded-xl p-3 shadow-xl flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">{selectedLoc.type}</span>
                  <h4 className="text-xs font-bold text-white truncate">{selectedLoc.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{selectedLoc.address} • {selectedLoc.distance} away</p>
                </div>
                <button
                  onClick={() => alert(`Directions to ${selectedLoc.name}: Proceed north via Eco Boulevard.`)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 flex items-center space-x-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Directory Cards List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Directory ({filteredLocations.length} locations)
            </span>
          </div>

          <div className="space-y-3">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLoc?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  className={`cursor-pointer p-4 rounded-2xl border transition shadow-lg space-y-2.5 ${
                    isSelected
                      ? 'bg-slate-900/90 border-emerald-500/50 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {loc.type}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">
                        {loc.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {loc.address}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-emerald-400 block">
                        {loc.distance}
                      </span>
                      <span className="text-[10px] text-amber-400 flex items-center justify-end space-x-0.5 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{loc.rating}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{loc.hours}</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {loc.acceptedMaterials.length} materials accepted
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
