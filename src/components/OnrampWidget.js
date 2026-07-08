'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function OnrampWidget({ amount, fiat, crypto, walletAddress }) {
  const [loading, setLoading] = useState(true);

  // Note: This is a sandbox URL for demonstration. 
  // In production, use your actual Alchemy Pay or Transak partner URL and API keys.
  const baseUrl = "https://ramptest.alchemypay.org/";
  
  // Construct the URL parameters
  const params = new URLSearchParams({
    crypto: crypto,
    network: 'TRC20', // Example network
    fiat: fiat,
    fiatAmount: amount,
    address: walletAddress,
    theme: 'dark' // Example customization
  });

  const widgetUrl = `${baseUrl}?${params.toString()}`;

  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-2xl overflow-hidden relative shadow-inner bg-gray-50 flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading secure payment gateway...</p>
        </div>
      )}
      <iframe
        src={widgetUrl}
        className="w-full h-full border-none"
        allow="camera; microphone"
        title="Crypto Onramp Payment"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
