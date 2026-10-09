import React from 'react';
import { 
  Trophy, 
  Flame, 
  CheckCircle, 
  Gift, 
  Clock, 
  Award, 
  Zap, 
  Sparkles, 
  Leaf, 
  Recycle, 
  Box, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useEco } from '../context/EcoContext';

export const ChallengesTab: React.FC = () => {
  const { challenges, claimChallenge, streakDays, points, setActiveTab } = useEco();

  // Helper icon
  const getBadgeIcon = (name: string) => {
    switch (name) {
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'Recycle':
        return <Recycle className="w-5 h-5 text-amber-400" />;
      case 'Box':
        return <Box className="w-5 h-5 text-sky-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-rose-400" />;
      default:
        return <Award className="w-5 h-5 text-teal-400" />;
    }
  };

  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Gamified Environmental Quests</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Complete Eco Challenges. <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Earn Extra Rewards & Unlock Coupons.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every item you properly dispose of advances your challenge progress. Complete daily quests to boost your wallet points and redeem exclusive sponsor discounts!
            </p>
          </div>

          {/* Streak & Multiplier Card */}
          <div className="bg-slate-950/80 border border-orange-500/30 rounded-2xl p-4 sm:min-w-[240px] flex items-center space-x-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 shrink-0">
              <Flame className="w-8 h-8 fill-white" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Active Streak</span>
              <span className="text-xl font-black text-orange-400 block">{streakDays} Consecutive Days</span>
              <span className="text-[11px] text-amber-300 font-medium">1.5x Points Multiplier Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quests Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Daily & Weekly Quests */}
        <div className="lg:col-span-8 space-y-6">
          {/* Daily Quests Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Daily Sustainability Quests</span>
              </h2>
              <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Resets in 14h 22m
              </span>
            </div>

            <div className="space-y-3">
              {dailyChallenges.map((challenge) => {
                const progressPercent = Math.min(
                  100,
                  Math.round((challenge.currentCount / challenge.targetCount) * 100)
                );
                const isReadyToClaim = challenge.completed && !challenge.claimed;

                return (
                  <div
                    key={challenge.id}
                    className={`p-5 rounded-2xl border transition shadow-lg ${
                      challenge.claimed
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                        : isReadyToClaim
                        ? 'bg-gradient-to-r from-slate-900 to-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                          {getBadgeIcon(challenge.badgeIcon)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              {challenge.type}
                            </span>
                            <span className="text-xs font-bold text-amber-400">
                              +{challenge.rewardPoints} EcoPoints
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            {challenge.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {challenge.description}
                          </p>
                        </div>
                      </div>

                      {/* Action / Status */}
                      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        {challenge.claimed ? (
                          <span className="text-xs font-bold text-slate-500 flex items-center space-x-1.5 py-1.5 px-3 rounded-xl bg-slate-900">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>Claimed</span>
                          </span>
                        ) : isReadyToClaim ? (
                          <button
                            onClick={() => claimChallenge(challenge.id)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 animate-pulse"
                          >
                            Claim +{challenge.rewardPoints} PTS!
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                            {challenge.currentCount} / {challenge.targetCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-[11px] font-medium text-slate-400">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            challenge.completed ? 'bg-emerald-400' : 'bg-amber-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Quests Header */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Weekly Milestone Missions</span>
              </h2>
              <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Resets every Sunday
              </span>
            </div>

            <div className="space-y-3">
              {weeklyChallenges.map((challenge) => {
                const progressPercent = Math.min(
                  100,
                  Math.round((challenge.currentCount / challenge.targetCount) * 100)
                );
                const isReadyToClaim = challenge.completed && !challenge.claimed;

                return (
                  <div
                    key={challenge.id}
                    className={`p-5 rounded-2xl border transition shadow-lg ${
                      challenge.claimed
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                        : isReadyToClaim
                        ? 'bg-gradient-to-r from-slate-900 to-amber-950/40 border-amber-500/50 ring-1 ring-amber-500/30'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                          {getBadgeIcon(challenge.badgeIcon)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              {challenge.type}
                            </span>
                            <span className="text-xs font-bold text-amber-400">
                              +{challenge.rewardPoints} EcoPoints
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            {challenge.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {challenge.description}
                          </p>
                        </div>
                      </div>

                      {/* Action / Status */}
                      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        {challenge.claimed ? (
                          <span className="text-xs font-bold text-slate-500 flex items-center space-x-1.5 py-1.5 px-3 rounded-xl bg-slate-900">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>Claimed</span>
                          </span>
                        ) : isReadyToClaim ? (
                          <button
                            onClick={() => claimChallenge(challenge.id)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 animate-pulse"
                          >
                            Claim +{challenge.rewardPoints} PTS!
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                            {challenge.currentCount} / {challenge.targetCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-[11px] font-medium text-slate-400">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            challenge.completed ? 'bg-emerald-400' : 'bg-amber-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Achievements & Rewards Gateway */}
        <div className="lg:col-span-4 space-y-6">
          {/* Points summary card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wallet Balance</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Ready to spend
              </span>
            </div>

            <div>
              <span className="text-3xl font-black text-white">{points}</span>
              <span className="text-sm font-bold text-emerald-400 ml-1.5">EcoPoints</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Points never expire. Redeem them for merchant discount coupons, coffee vouchers, or sponsor tree plantings.
            </p>

            <button
              onClick={() => setActiveTab('coupons')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>Browse Redeemable Coupons</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Badges Trophy Cabinet */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Unlocked Eco Badges</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white block">Compost Pioneer</span>
                <span className="text-[10px] text-emerald-400 block">Unlocked</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Recycle className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white block">Plastic Slayer</span>
                <span className="text-[10px] text-amber-400 block">Unlocked</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-sky-500/30 text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                  <Box className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white block">Fiber Master</span>
                <span className="text-[10px] text-sky-400 block">Unlocked</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 text-center space-y-1 opacity-70">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-300 block">Zero Waste King</span>
                <span className="text-[10px] text-slate-500 block">At 500 PTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
