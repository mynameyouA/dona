'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Droplets, Users } from 'lucide-react';

export default function ContentSections() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative z-10 bg-slate-50">
      {/* Mission Section */}
      <section className="py-24 px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Our Mission is Simple</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We believe that restoring the earth's forests is the most effective way to combat climate change, protect biodiversity, and empower local communities. For every $10 donated, a native tree takes root.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Climate Action", desc: "Trees absorb CO2, naturally cooling our planet and fighting global warming." },
              { icon: Droplets, title: "Water Restoration", desc: "Forests act as giant sponges, reviving dry lands and purifying water sources." },
              { icon: Users, title: "Community Impact", desc: "We hire local farmers to plant and protect trees, creating sustainable jobs." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2, duration: 0.5 } }
                }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4">How Your Donation Works</h2>
            <p className="text-lg text-slate-400">Total transparency from your wallet to the soil.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"></div>

            {[
              { step: "01", title: "You Donate", desc: "Make a secure payment via Web3 or Fiat (Alipay/WeChat). The funds are instantly converted." },
              { step: "02", title: "We Plant", desc: "Our local partners receive the funds and plant native species in critical restoration zones." },
              { step: "03", title: "Earth Heals", desc: "The trees grow, capturing carbon, restoring habitats, and providing for communities." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.2, duration: 0.5 } }
                }}
                className="text-center relative z-10"
              >
                <div className="w-20 h-20 mx-auto bg-slate-800 border-4 border-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-xl"></div>
                  <span className="text-2xl font-extrabold text-emerald-400">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
