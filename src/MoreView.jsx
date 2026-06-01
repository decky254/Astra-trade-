import React, { useState } from 'react';

export default function MoreView() {
  const [copied, setCopied] = useState(false);
  const promoToken = "ASTRA_MARK_742";
  const inviteText = `📈 Claim an instant KES 20 deposit bonus at Astra Trade using invite token: [ ${promoToken} ] during registration. Track your contracts with up to 3.2x fixed payouts!`;

  return (
    <div className="p-4 space-y-4">
      {/* Settings Module Title Ribbon */}
      <div className="flex items-center justify-between pt-2 border-b border-gray-900 pb-3">
        <h2 className="text-sm font-black tracking-tight text-white">Application Settings</h2>
        <span className="text-[9px] font-mono bg-gray-900 text-gray-500 px-2 py-0.5 rounded font-bold">NODE BUILD V2.1</span>
      </div>

      {/* Network Referral Reward Card */}
      <div className="bg-gradient-to-br from-[#121826] to-[#0E1320] border border-gray-800 rounded-2xl p-4 space-y-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="bg-brand/10 p-2 rounded-xl border border-brand/20 text-lg leading-none">
            🤝
          </div>
          <div>
            <h3 className="text-xs font-black tracking-wider text-bullish uppercase">Network Affiliate Rewards</h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-normal font-medium">
              Receive <span className="text-white font-bold font-mono">KES 50.00</span> directly whenever your code executes a user funding cycle of KES 250+. Peers instantly unlock a <span className="text-brand font-bold font-mono">KES 20.00</span> starter balance.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black tracking-widest uppercase text-gray-500 block">Personal Verification Token</label>
          <div className="flex items-center bg-nested border border-gray-800 rounded-xl p-1.5 justify-between">
            <span className="font-mono text-xs font-black tracking-widest text-[#FFB300] pl-3">{promoToken}</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(inviteText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className={`px-4 py-1.5 text-[10px] font-black rounded-lg tracking-wider transition-all ${
                copied ? 'bg-bullish text-black' : 'bg-brand text-white'
              }`}
            >
              {copied ? '✓ COPIED' : '📋 SHARE'}
            </button>
          </div>
        </div>
      </div>

      {/* Core Profile Menu Links List Matrix */}
      <div className="bg-surface border border-gray-800/60 rounded-2xl divide-y divide-gray-950/40 font-medium">
        {[
          "Security Verification Config",
          "Daraja API M-Pesa Integration Middleware",
          "System Terms & Legal Declarations",
          "Terminate Profile Session Token"
        ].map((item, index) => (
          <div 
            key={index} 
            className={`p-3.5 flex justify-between text-xs transition-colors items-center cursor-pointer ${
              index === 3 ? 'text-bearish hover:bg-bearish/5' : 'text-gray-300 hover:bg-gray-900/20'
            }`}
          >
            <span>{item}</span>
            <span className="text-gray-600 font-mono text-xs">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
