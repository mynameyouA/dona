'use client';

import React, { useState } from 'react';
import OnrampWidget from './OnrampWidget';

export default function DonationSection() {
  const [amount, setAmount] = useState('100');
  const [fiat, setFiat] = useState('CNY');
  const [showWidget, setShowWidget] = useState(false);

  // This should be your charity's actual crypto wallet address
  const charityWalletAddress = "TXYZ123... (Charity TRC20 Wallet)";

  const handleDonateClick = () => {
    setShowWidget(true);
  };

  return (
    <div id="donate-section" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Support Our Cause</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            100% of your donation directly funds our field programs. Choose your contribution amount below.
          </p>
        </div>

        {!showWidget ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Amount</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['50', '100', '500', '1000'].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-4 px-6 rounded-xl text-lg font-bold transition-all duration-200 border-2 ${
                    amount === val 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  ¥{val}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount (CNY)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">¥</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all text-lg font-medium outline-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800 flex flex-col space-y-2">
              <p><strong>Payment Methods:</strong> Alipay, WeChat Pay, UnionPay (via Alchemy Pay).</p>
              <p>Your CNY donation will be seamlessly converted to USDT and sent directly to our charity wallet.</p>
            </div>

            <button
              onClick={handleDonateClick}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Continue to Payment
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Complete Your Donation</h3>
              <button 
                onClick={() => setShowWidget(false)}
                className="text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors"
              >
                ← Back to amount selection
              </button>
            </div>
            <OnrampWidget 
              amount={amount} 
              fiat={fiat} 
              crypto="USDT" 
              walletAddress={charityWalletAddress} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
