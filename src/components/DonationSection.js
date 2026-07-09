'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Copy, CheckCircle2, X, Info, CreditCard, Wallet, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Dynamically import to prevent SSR issues with Three.js
const TreeIcon3D = dynamic(() => import('./TreeIcon3D'), { ssr: false });

export default function DonationSection() {
  const [tier, setTier] = useState(1);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState(50);
  
  // Modal states: 'hidden', 'select', 'qr'
  const [modalState, setModalState] = useState('hidden');
  const [copied, setCopied] = useState(false);
  const [isLoadingOnramp, setIsLoadingOnramp] = useState(false);
  
  const WALLET_ADDRESS = "0x52b4483e30243a65212adb16d993627534e61d6d";
  const TREE_PRICE = 10;

  const currentAmount = isCustom ? customAmount : (tier * TREE_PRICE).toString();

  const handleDonateClick = () => {
    if (currentAmount && Number(currentAmount) >= TREE_PRICE) {
      setModalState('select');
    }
  };

  const handleOnramperRedirect = async () => {
    setIsLoadingOnramp(true);
    try {
      const res = await fetch('/api/onramper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: WALLET_ADDRESS })
      });
      const data = await res.json();
      
      if (data.widgetUrl) {
        window.open(data.widgetUrl, '_blank');
        setModalState('hidden');
      } else {
        alert('Lỗi tạo link Onramper: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Network error while connecting to Onramper.');
    } finally {
      setIsLoadingOnramp(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
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
                    className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 overflow-hidden ${
                      isSelected 
                        ? 'bg-emerald-50 border-2 border-emerald-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.1)] transform translate-y-1' 
                        : 'bg-white border-2 border-slate-200 shadow-[0_6px_0_0_rgba(226,232,240,1)] hover:shadow-[0_8px_0_0_rgba(226,232,240,1)] hover:-translate-y-1'
                    }`}
                  >
                    <TreeIcon3D isActive={isSelected} count={t.count} />
                    <span className={`font-bold text-lg mt-2 ${isSelected ? 'text-emerald-700' : 'text-slate-700'}`}>
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

          <button
            onClick={handleDonateClick}
            disabled={!currentAmount || Number(currentAmount) < TREE_PRICE}
            className="btn-3d btn-3d-green w-full py-6 rounded-2xl font-bold text-2xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Complete Donation</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {modalState !== 'hidden' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalState('hidden')}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-slate-100"
            >
              <button 
                onClick={() => setModalState('hidden')}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* STEP 1: Select Payment Method */}
              {modalState === 'select' && (
                <div>
                  <div className="p-8 text-center border-b border-slate-100">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Method</h3>
                    <p className="text-slate-500 font-medium text-sm">Select how you'd like to fund your impact.</p>
                  </div>
                  <div className="p-8 bg-slate-50 flex flex-col space-y-4">
                    
                    {/* Onramper Button */}
                    <button 
                      onClick={handleOnramperRedirect}
                      disabled={isLoadingOnramp}
                      className="w-full flex items-center p-5 bg-white border-2 border-emerald-500 rounded-2xl hover:bg-emerald-50 transition-colors shadow-sm group disabled:opacity-70 disabled:cursor-wait"
                    >
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        {isLoadingOnramp ? <Loader2 className="w-6 h-6 animate-spin" /> : <CreditCard className="w-6 h-6" />}
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-slate-900 text-lg">Credit Card / Apple Pay</h4>
                        <p className="text-sm text-slate-500 font-medium">
                          {isLoadingOnramp ? 'Đang tạo link bảo mật...' : 'Pay with Fiat via Onramper'}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-emerald-500" />
                    </button>

                    {/* Web3 QR Button */}
                    <button 
                      onClick={() => setModalState('qr')}
                      className="w-full flex items-center p-5 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm group"
                    >
                      <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-slate-900 text-lg">Web3 Wallet</h4>
                        <p className="text-sm text-slate-500 font-medium">Direct crypto transfer</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </button>

                  </div>
                </div>
              )}

              {/* STEP 2: Web3 QR Code */}
              {modalState === 'qr' && (
                <div>
                  <div className="p-8 text-center border-b border-slate-100 relative">
                    <button 
                      onClick={() => setModalState('select')}
                      className="absolute top-8 left-6 text-slate-400 hover:text-slate-600 font-medium text-sm flex items-center"
                    >
                      ← Back
                    </button>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2 mt-4">Web3 Transfer</h3>
                    <p className="text-slate-500 font-medium text-sm">Direct, secure, and 100% transparent.</p>
                  </div>

                  <div className="p-8 bg-slate-50 flex flex-col items-center">
                    <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-200 mb-6 relative group">
                      <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <QRCodeSVG value={WALLET_ADDRESS} size={200} level="H" includeMargin={false} />
                    </div>

                    <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between mb-4 shadow-sm">
                      <div className="overflow-hidden mr-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Destination Address</p>
                        <p className="font-mono text-sm text-slate-800 truncate">{WALLET_ADDRESS}</p>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors flex-shrink-0"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start space-x-3 text-left">
                      <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-blue-900 mb-1">Important Instructions</p>
                        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                          <li>Send only <strong>USDT</strong> to this address.</li>
                          <li>Use the <strong>Polygon (MATIC)</strong> network.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
