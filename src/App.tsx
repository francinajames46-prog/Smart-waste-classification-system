import React from 'react';
import { EcoProvider, useEco } from './context/EcoContext';
import { Navbar } from './components/Navbar';
import { ScannerTab } from './components/ScannerTab';
import { DashboardTab } from './components/DashboardTab';
import { ChallengesTab } from './components/ChallengesTab';
import { CouponsTab } from './components/CouponsTab';
import { EcoMapTab } from './components/EcoMapTab';
import { HackathonPitchModal } from './components/HackathonPitchModal';
import { Leaf, Heart, ShieldCheck, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setShowPitchGuide } = useEco();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Sticky App Header */}
      <Navbar />

      {/* Main Tab Screen */}
      <main className="flex-1 pb-16">
        {activeTab === 'scanner' && <ScannerTab />}
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'challenges' && <ChallengesTab />}
        {activeTab === 'coupons' && <CouponsTab />}
        {activeTab === 'map' && <EcoMapTab />}
      </main>

      {/* Global Hackathon Pitch / Architecture Flow Modal */}
      <HackathonPitchModal />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-medium">
          <span className="flex items-center space-x-1">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Waste Circular AI</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Gemini 3.8 Multimodal Vision</span>
          </span>
          <span>•</span>
          <button 
            onClick={() => setShowPitchGuide(true)}
            className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>View Architecture & Pitch Flow</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-600">
          EcoSort AI • Empowering communities to classify, reduce, and divert waste from landfills with smart gamified incentives.
        </p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <EcoProvider>
      <AppContent />
    </EcoProvider>
  );
}
