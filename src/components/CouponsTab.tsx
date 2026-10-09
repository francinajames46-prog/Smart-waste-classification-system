import React, { useState } from 'react';
import { 
  Ticket, 
  Sparkles, 
  Lock, 
  Check, 
  Copy, 
  QrCode, 
  Clock, 
  ShoppingBag, 
  Coffee, 
  Apple, 
  TreePine, 
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useEco } from '../context/EcoContext';
import { CouponReward } from '../types/waste';

export const CouponsTab: React.FC = () => {
  const { points, coupons, claimedCoupons, redeemCoupon, setActiveTab } = useEco();
  const [selectedCoupon, setSelectedCoupon] = useState<CouponReward | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redeemFeedback, setRedeemFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [viewTab, setViewTab] = useState<'available' | 'claimed'>('available');

  const handleRedeem = (coupon: CouponReward) => {
    const res = redeemCoupon(coupon.id);
    if (res.success) {
      setRedeemFeedback({ msg: res.message, type: 'success' });
      setSelectedCoupon({ ...coupon, isUnlocked: true, claimedAt: Date.now() });
    } else {
      setRedeemFeedback({ msg: res.message, type: 'error' });
    }
    setTimeout(() => setRedeemFeedback(null), 4000);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Beverage':
        return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'Groceries':
        return <Apple className="w-5 h-5 text-emerald-400" />;
      case 'Direct Impact':
        return <TreePine className="w-5 h-5 text-teal-400" />;
      default:
        return <ShoppingBag className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Ticket className="w-3.5 h-3.5 text-emerald-400" />
              <span>Green Rewards & Partner Coupons</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Turn Waste Segregation Into <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Real-World Discounts & Vouchers.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Earn EcoPoints by scanning trash and completing disposal guidelines. Unlock vouchers with zero-waste retailers, organic cafes, and verified tree planting partners!
            </p>
          </div>

          {/* Points Balance Tile */}
          <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-5 sm:min-w-[240px] shadow-xl space-y-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
              Available to Spend
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-black text-amber-300">{points}</span>
              <span className="text-sm font-bold text-emerald-400">EcoPoints</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Need more? <button onClick={() => setActiveTab('scanner')} className="text-emerald-400 font-bold hover:underline">Scan trash now →</button>
            </p>
          </div>
        </div>
      </div>

      {/* Notifications / Toast */}
      {redeemFeedback && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between ${
          redeemFeedback.type === 'success'
            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
        }`}>
          <span>{redeemFeedback.msg}</span>
          <button onClick={() => setRedeemFeedback(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* View Switcher: Available Rewards vs Claimed Vouchers */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setViewTab('available')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
            viewTab === 'available'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Reward Shop ({coupons.length})</span>
        </button>

        <button
          onClick={() => setViewTab('claimed')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
            viewTab === 'claimed'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>My Claimed Vouchers ({claimedCoupons.length})</span>
        </button>
      </div>

      {/* Available Rewards Catalog */}
      {viewTab === 'available' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => {
            const canAfford = points >= coupon.requiredPoints;
            const isAlreadyClaimed = claimedCoupons.some(c => c.id === coupon.id);

            return (
              <div
                key={coupon.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                      {getCategoryIcon(coupon.category)}
                    </div>
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {coupon.discount}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {coupon.brand} • {coupon.category}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5 leading-snug group-hover:text-emerald-300 transition">
                      {coupon.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {coupon.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">Required Points:</span>
                    <span className={canAfford ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                      {coupon.requiredPoints} EcoPoints
                    </span>
                  </div>

                  {isAlreadyClaimed ? (
                    <button
                      onClick={() => setSelectedCoupon(coupon)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center space-x-1.5 transition"
                    >
                      <Check className="w-4 h-4" />
                      <span>View Claimed Voucher & QR Code</span>
                    </button>
                  ) : canAfford ? (
                    <button
                      onClick={() => handleRedeem(coupon)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-4 h-4 fill-slate-950" />
                      <span>Redeem with {coupon.requiredPoints} Points</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('scanner')}
                      className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-semibold text-xs flex items-center justify-center space-x-1.5 hover:text-slate-200"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Need {coupon.requiredPoints - points} more pts (Scan waste)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Claimed Vouchers Wallet */
        <div>
          {claimedCoupons.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
              <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No Vouchers Claimed Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Scan your waste, follow proper disposal guides, and earn enough EcoPoints to unlock free coffees, organic grocery vouchers, and store discounts!
              </p>
              <button
                onClick={() => setViewTab('available')}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Browse Reward Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {claimedCoupons.map((coupon, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCoupon(coupon)}
                  className="cursor-pointer bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Active Voucher
                      </span>
                      <span className="text-xs font-black text-amber-300">{coupon.discount}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                      {coupon.title}
                    </h3>
                    <p className="text-xs text-slate-400">{coupon.brand}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                      {coupon.code}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <span>View Barcode</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Voucher Display / QR & Barcode Modal */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedCoupon(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Official Digital Voucher
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {selectedCoupon.brand}
              </h2>
              <p className="text-xs text-slate-300">{selectedCoupon.title}</p>
            </div>

            {/* Voucher Card Container with Ticket Cutouts */}
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-5">
              <div className="space-y-1">
                <span className="text-3xl font-black text-amber-300">
                  {selectedCoupon.discount}
                </span>
                <p className="text-xs text-slate-400">
                  {selectedCoupon.description}
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Online Promo Code</span>
                  <span className="font-mono text-sm sm:text-base font-black text-emerald-300">
                    {selectedCoupon.code}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(selectedCoupon.code)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold transition flex items-center space-x-1"
                >
                  {copiedCode === selectedCoupon.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === selectedCoupon.code ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Simulated In-Store QR Code & Barcode */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">
                  In-Store Cashier Scan Code
                </span>
                <div className="bg-white p-3 rounded-xl inline-block shadow-md">
                  {/* Simulated barcode bars */}
                  <div className="w-48 h-12 flex justify-between items-stretch">
                    <div className="w-1 bg-black" />
                    <div className="w-2 bg-black" />
                    <div className="w-1 bg-black" />
                    <div className="w-3 bg-black" />
                    <div className="w-1 bg-black" />
                    <div className="w-2 bg-black" />
                    <div className="w-4 bg-black" />
                    <div className="w-1 bg-black" />
                    <div className="w-2 bg-black" />
                    <div className="w-1 bg-black" />
                    <div className="w-3 bg-black" />
                    <div className="w-2 bg-black" />
                    <div className="w-1 bg-black" />
                    <div className="w-3 bg-black" />
                    <div className="w-1 bg-black" />
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-500 block">
                  #7704-{selectedCoupon.code.replace(/[^A-Z0-9]/g, '')}-992
                </span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Valid for {selectedCoupon.expiresInDays} days from redemption</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCoupon(null)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
