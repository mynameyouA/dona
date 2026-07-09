'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Activity, Star, Quote, HeartHandshake } from 'lucide-react';

// --- Sub-components ---

function LiveTicker() {
  const [currentDonation, setCurrentDonation] = useState(0);
  const fakeDonations = [
    { name: 'Anonymous', amount: '50 trees', time: 'Just now' },
    { name: 'David L.', amount: '200 trees', time: '2 mins ago' },
    { name: '0x3F2...9a1', amount: '10 trees', time: '5 mins ago' },
    { name: 'Sarah M.', amount: '100 trees', time: '12 mins ago' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDonation((prev) => (prev + 1) % fakeDonations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border-y border-slate-800 py-3 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDonation}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex items-center space-x-3 text-sm font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-slate-400">{fakeDonations[currentDonation].time}</span>
            <span className="text-slate-600">•</span>
            <span className="text-white font-bold">{fakeDonations[currentDonation].name}</span>
            <span className="text-slate-400">just planted</span>
            <span className="text-emerald-400 font-bold">{fakeDonations[currentDonation].amount}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PartnersMarquee() {
  // Creating typographic mock logos
  const partners = [
    { name: 'FORBES', type: 'text', style: 'font-serif font-bold tracking-widest text-2xl' },
    { name: 'TECHCRUNCH', type: 'text', style: 'font-sans font-black tracking-tighter text-2xl' },
    { name: 'WWF', type: 'icon', icon: '🐼', style: 'font-bold text-2xl tracking-tight' },
    { name: 'BLOOMBERG', type: 'text', style: 'font-sans font-bold text-2xl' },
    { name: 'EDEN', type: 'text', style: 'font-serif italic font-bold text-2xl' },
    { name: 'POLYGON', type: 'icon', icon: '⬡', style: 'font-sans font-extrabold text-2xl' },
  ];

  return (
    <div className="py-12 bg-white relative overflow-hidden z-10 border-b border-slate-100">
      <div className="text-center mb-8">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">As Featured & Trusted By</p>
      </div>
      
      {/* Marquee Container */}
      <div className="flex space-x-16 whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity duration-500">
        <motion.div
          animate={{ x: [0, -1035] }} // Adjust based on content width to loop smoothly
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex space-x-16 items-center"
        >
          {/* Double the array to create a seamless loop */}
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className={`text-slate-800 flex items-center space-x-2 ${p.style}`}>
              {p.type === 'icon' && <span>{p.icon}</span>}
              <span>{p.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Fading edges */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white to-transparent"></div>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: 'Verified Non-Profit',
      desc: 'Officially registered 501(c)(3) organization. Your donations are tax-deductible.'
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      title: '100% On-Chain',
      desc: 'Every transaction is recorded publicly on the Polygon blockchain for total transparency.'
    },
    {
      icon: <Lock className="w-8 h-8 text-indigo-500" />,
      title: 'Audited Smart Contracts',
      desc: 'Our funds are secured by multi-sig wallets audited by top-tier security firms.'
    }
  ];

  return (
    <div className="py-20 bg-slate-50 relative z-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="p-4 bg-slate-50 rounded-2xl mb-6">
                {b.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const reviews = [
    {
      text: "I was skeptical about crypto charities, but seeing the transparent blockchain records and getting GPS coordinates of my trees completely blew me away.",
      author: "Alex Morgan",
      role: "Tech Entrepreneur",
      rating: 5
    },
    {
      text: "The easiest way to offset my carbon footprint. The Web3 QR payment was instant and zero-fuss. Highly recommended for crypto natives.",
      author: "Sarah Chen",
      role: "DeFi Analyst",
      rating: 5
    },
    {
      text: "Donated $100 and watched the impact happen in real-time. This is the future of philanthropy—trustless, transparent, and beautiful.",
      author: "Marcus Johnson",
      role: "Philanthropist",
      rating: 5
    }
  ];

  return (
    <div className="py-24 bg-white relative z-10 border-t border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            Don't Just Take Our Word For It
          </motion.h2>
          <div className="flex justify-center space-x-1 mt-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
          </div>
          <p className="text-slate-500 mt-4 font-medium">Over 10,000+ donors worldwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 p-8 rounded-[2rem] relative"
            >
              <Quote className="w-10 h-10 text-slate-200 absolute top-6 right-6 rotate-180" />
              <p className="text-slate-700 italic mb-8 relative z-10 font-medium leading-relaxed">
                "{r.text}"
              </p>
              <div className="flex items-center space-x-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  {r.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">{r.author}</h5>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main Export ---

export default function TrustSection() {
  return (
    <>
      <LiveTicker />
      <PartnersMarquee />
      <TrustBadges />
      <Testimonials />
    </>
  );
}
