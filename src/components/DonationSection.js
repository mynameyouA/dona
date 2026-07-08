'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, ArrowRight, ShieldCheck } from 'lucide-react';
import OnrampWidget from './OnrampWidget';

export default function DonationSection() {
  const [tier, setTier] = useState(1); // 1 tree = $10
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [showWidget, setShowWidget] = useState(false);

  const charityWalletAddress = "TXYZ123... (Charity TRC20 Wallet)";
  const TREE_PRICE = 10;

  const currentAmount = isCustom ? customAmount : (tier * TREE_PRICE).toString();

  const handleDonateClick = () => {
    if (currentAmount && Number(currentAmount) >= TREE_PRICE) {
      setShowWidget(true);
    }
  };

  const presetTiers = [
    { count: 1, label: 'Starter' },
    { count: 5, label: 'Grove' },
    { count: 20, label: 'Forest' },
    { count: 100, label: 'Ecosystem' }
  ];

  return (
    <div id="donate-section" className="py-24 px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
          >
            Choose Your <span className="text-gradient-green">Impact</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto font-medium"
          >
            Every $10 donated plants one native tree in areas affected by deforestation. 
            We accept global payments instantly.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!showWidget ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-[2.5rem] p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="mb-8">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">How many trees?</h3>
                  <div className="text-right">
                    <span className="block text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total Amount</span>
                    <span className="text-4xl font-extrabold text-emerald-600">${currentAmount || '0'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {presetTiers.map((t) => {
                    const isSelected = !isCustom && tier === t.count;
                    return (
                      <button
                        key={t.count}
                        onClick={() => {
                          setIsCustom(false);
                          setTier(t.count);
                        }}
                        className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                          isSelected 
                            ? 'bg-emerald-50 border-2 border-emerald-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.1)] transform translate-y-1' 
                            : 'bg-white border-2 border-slate-200 shadow-[0_6px_0_0_rgba(226,232,240,1)] hover:shadow-[0_8px_0_0_rgba(226,232,240,1)] hover:-translate-y-1'
                        }`}
                      >
                        <TreePine className={`w-8 h-8 mb-2 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className={`font-bold text-lg ${isSelected ? 'text-emerald-700' : 'text-slate-700'}`}>
                          {t.count}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-600/70' : 'text-slate-400'}`}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-sm font-bold text-slate-400 uppercase">or</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter custom amount ($)"
                    value={customAmount}
                    onChange={(e) => {
                      setIsCustom(true);
                      setCustomAmount(e.target.value);
                    }}
                    onFocus={() => setIsCustom(true)}
                    className={`w-full p-6 pl-12 rounded-2xl border-2 outline-none font-bold text-xl transition-all ${
                      isCustom ? 'border-emerald-500 bg-white shadow-lg' : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-5 bg-slate-800 rounded-2xl mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-emerald-500/20 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Secure Global Payment</p>
                    <p className="text-slate-400 text-xs mt-0.5">Alipay, WeChat Pay, Visa, Mastercard</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDonateClick}
                disabled={!currentAmount || Number(currentAmount) < TREE_PRICE}
                className="btn-3d btn-3d-green w-full py-6 rounded-2xl font-bold text-2xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Complete Donation</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="widget"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6 px-4">
                <h3 className="text-2xl font-bold text-slate-900">Secure Checkout</h3>
                <button 
                  onClick={() => setShowWidget(false)}
                  className="px-4 py-2 rounded-full bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Go Back
                </button>
              </div>
              
              {/* For Demo purposes, we send USD to Onramp, which users can pay with CNY if supported */}
              <OnrampWidget 
                amount={currentAmount} 
                fiat="USD" 
                crypto="USDT" 
                walletAddress={charityWalletAddress} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
