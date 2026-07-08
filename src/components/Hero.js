'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-blue-900 text-white py-32 px-6 lg:px-8 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Children smiling"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-blue-500/30 rounded-full mb-8 backdrop-blur-sm border border-blue-400/30">
          <Heart className="w-6 h-6 text-blue-200 mr-2" fill="currentColor" />
          <span className="text-blue-100 font-medium tracking-wide uppercase text-sm">Global Hope Foundation</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Your support can change a life today.
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
          We bring clean water, education, and healthcare to children in need around the world. Join us in making a lasting impact.
        </p>
        
        <button 
          onClick={() => document.getElementById('donate-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Make a Donation
        </button>
      </div>
    </div>
  );
}
