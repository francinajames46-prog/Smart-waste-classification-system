import React from 'react';
import { 
  Scan, 
  LayoutDashboard, 
  Trophy, 
  Ticket, 
  MapPin, 
  Sparkles, 
  Flame, 
  RotateCcw,
  Leaf
} from 'lucide-react';
import { useEco } from '../context/EcoContext';

export const Navbar: React.FC = () => {
  const { 
    points, 
    userLevel, 
    streakDays, 
    activeTab, 
    setActiveTab, 
    setShowPitchGuide, 
    resetDemoData 
  } = useEco();

  const navItems = [
    { id: 'scanner', label: 'AI Scanner', icon: Scan },
    { id: 'dashboard', label: 'Impact Dashboard', icon: LayoutDashboard },
    { id: 'challenges', label: 'Eco Challenges', icon: Trophy },
    { id: 'coupons', label: 'Rewards & Coupons', icon: Ticket },
    { id: 'map', label: 'Eco Drop-Offs', icon: MapPin },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-emerald-950/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tag */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold ring-2 ring-emerald-400/30">
              <Leaf className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                  EcoSort AI
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                  Vision 3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Smart Waste Segregation & Circular Rewards
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Score, Pitch & Demo buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Hackathon Pitch Modal Trigger */}
            <button
              onClick={() => setShowPitchGuide(true)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition shadow-sm"
              title="Show Hackathon Pitch & Architecture Flow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden lg:inline">Hackathon Flow</span>
              <span className="lg:hidden">Pitch</span>
            </button>

            {/* Streak Counter */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-orange-950/40 border border-orange-500/30 text-orange-300 text-xs font-bold" title="Daily Sorting Streak">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* EcoPoints Pill */}
            <div 
              onClick={() => setActiveTab('coupons')}
              className="cursor-pointer flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 hover:border-emerald-400 transition shadow-inner group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex flex-col text-right">
                <span className="text-xs font-black text-emerald-300 leading-tight group-hover:text-emerald-200">
                  {points} <span className="text-[10px] font-medium text-emerald-400/80">PTS</span>
                </span>
                <span className="text-[9px] text-slate-400 leading-none">
                  {userLevel.title}
                </span>
              </div>
            </div>

            {/* Demo Reset */}
            <button
              onClick={resetDemoData}
              title="Reset test data"
              className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/60 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium transition ${
                  isActive ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
