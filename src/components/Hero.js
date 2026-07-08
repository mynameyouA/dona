'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Sprout, Leaf } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Lush green forest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-5xl px-6 lg:px-8 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center p-2 pr-4 bg-emerald-500/20 rounded-full mb-6 backdrop-blur-md border border-emerald-400/30">
              <div className="bg-emerald-500 p-1.5 rounded-full mr-3 shadow-lg">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <span className="text-emerald-50 font-bold tracking-wide uppercase text-xs">Global Reforestation Initiative</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight drop-shadow-xl">
              Plant a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Forest</span>.<br /> Leave a Legacy.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-100 max-w-lg leading-relaxed mb-8 drop-shadow-md">
              For just $10, you can plant a tree and combat climate change. Track your impact and help us restore the earth's lungs.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <button 
                onClick={() => document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-3d btn-3d-green px-10 py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 w-full sm:w-auto"
              >
                <span>Plant a Tree for $10</span>
                <TreePine className="w-6 h-6" />
              </button>
            </motion.div>
          </div>

          {/* 3D Floating Glass Card */}
          <motion.div 
            variants={itemVariants}
            className="hidden lg:block relative"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="glass-panel-dark p-8 rounded-3xl relative z-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-1">Impact Goal</p>
                  <h3 className="text-3xl font-extrabold text-white">1,000,000 Trees</h3>
                </div>
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Leaf className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                  <span>Planted so far</span>
                  <span className="text-white">742,050</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 inner-shadow">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "74%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="bg-gradient-to-r from-emerald-500 to-green-400 h-3 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 glass-panel p-4 rounded-2xl z-20 flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">CNY</div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Supported</p>
                <p className="font-bold text-slate-800">Alipay & WeChat</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
