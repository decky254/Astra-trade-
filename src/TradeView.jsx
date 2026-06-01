import React, { useState } from 'react';

export default function TradeView() {
  const [activeSegment, setActiveSegment] = useState("BINARY"); 
  const [stake, setStake] = useState(1000);
  const [tradeMessage, setTradeMessage] = useState(null);

  const API_BASE_URL = "https://astra-trade-backend.vercel.app/api/v1"; 
  const payoutFactor = 3.2;
  const potentialReturns = stake * payoutFactor;

  const handlePlaceWager = async (direction) => {
    setTradeMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/trades/binary/wager`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "usr_test_alpha", 
          symbol: "SCOM",
          stake: parseFloat(stake),
          direction: direction
        })
      });
      const data = await response.json();
      if (response.ok) {
        setTradeMessage({ type: 'success', text: `🎯 Contract Filled! Gross Return: KES ${data.potential_return.toFixed(2)}` });
      } else {
        setTradeMessage({ type: 'error', text: data.detail || 'Execution rejected' });
      }
    } catch (err) {
      setTradeMessage({ type: 'success', text: `🎯 [Demo mode] Contract Opened: KES ${potentialReturns.toLocaleString()} on ${direction}` });
    }
  };

  return (
    <div className="p-4 space-y-5">
      {/* Asset Header Navigation Meta */}
      <div className="flex items-center justify-between pt-2">
        <button className="text-gray-400 text-lg">←</button>
        <div className="text-center">
          <h2 className="text-sm font-black tracking-wider text-white">SCOM</h2>
          <p className="text-[10px] text-gray-500 font-bold">Safaricom PLC • NSE</p>
        </div>
        <div className="w-4" />
      </div>

      {/* Realtime Pricing Panel */}
      <div className="flex justify-between items-end px-1 pt-2">
        <div>
          <div className="text-2xl font-black font-mono tracking-tight text-white">
            KES <span className="text-3xl">18</span>.85
          </div>
          <span className="text-[11px] font-bold text-bullish mt-0.5 block">+0.25 (1.35%) TODAY</span>
        </div>
        <span className="text-[9px] font-black tracking-widest text-bullish bg-bullish/10 border border-bullish/20 px-2 py-1 rounded font-mono">
          ● SYNTHETIC ENGINE
        </span>
      </div>

      {/* Binary Selection Segment Pills */}
      <div className="bg-surface p-1 rounded-xl border border-gray-800/40 flex items-center">
        <button 
          onClick={() => setActiveSegment("ASSET")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeSegment === "ASSET" ? "bg-[#1C243D] text-white" : "text-gray-400"}`}
        >
          Asset Purchase
        </button>
        <button 
          onClick={() => setActiveSegment("BINARY")}
          className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${activeSegment === "BINARY" ? "bg-brand text-white shadow-md" : "text-gray-400"}`}
        >
          Binary Predict
        </button>
      </div>

      {activeSegment !== "BINARY" ? (
        <div className="text-xs text-center text-gray-500 py-16 italic border border-dashed border-gray-900 rounded-2xl">Standard Spot Order Configuration Layout</div>
      ) : (
        <div className="space-y-4">
          {/* Stake Input Area */}
          <div className="bg-surface border border-gray-800/60 rounded-2xl p-4 space-y-3">
            <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase block">WAGER STAKE AMOUNT</span>
            <div className="relative bg-nested border border-gray-800 rounded-xl p-3 flex items-center justify-between">
              <input 
                type="text" 
                value={stake.toLocaleString()} 
                onChange={(e) => setStake(Number(e.target.value.replace(/,/g, '')) || 0)}
                className="bg-transparent font-mono font-black text-xl text-white outline-none w-2/3"
              />
              <span className="font-mono font-black text-xs text-gray-500">KES</span>
            </div>
            
            {/* Quick Stake Preset Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[1000, 5000, 10000].map((amt) => (
                <button 
                  key={amt} 
                  onClick={() => setStake(amt)}
                  className={`py-2 text-[11px] font-mono font-bold rounded-xl border transition-all ${
                    stake === amt ? 'border-brand bg-brand/10 text-white' : 'border-gray-800 bg-nested text-gray-400'
                  }`}
                >
                  KES {amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Return Metric Projection Box */}
          <div className="bg-surface border border-gray-800/60 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-gray-900/60 pb-2">
              <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase">SPECULATIVE PAYOUT RATE</span>
              <span className="text-[10px] font-mono font-black text-brand tracking-wider">{payoutFactor.toFixed(1)}x FACTOR</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs font-semibold text-gray-400">Potential Gross Returns:</span>
              <span className="text-lg font-mono font-black text-bullish">KES {potentialReturns.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>

          {/* Execution Forecast Constraint Triggers */}
          <div className="bg-surface border border-gray-800/60 rounded-2xl p-4 space-y-3">
            <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase block">EXECUTE FORECAST CONSTRAINT</span>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handlePlaceWager("CALL")}
                className="bg-bullish hover:brightness-110 active:scale-[0.98] transition-all text-black font-black text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5"
              >
                ▲ RISE / CALL
              </button>
              <button 
                onClick={() => handlePlaceWager("PUT")}
                className="bg-bearish hover:brightness-110 active:scale-[0.98] transition-all text-white font-black text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5"
              >
                ▼ FALL / PUT
              </button>
            </div>
          </div>

          {/* Inline Action Response Feedback Node */}
          {tradeMessage && (
            <div className={`p-3 rounded-xl border text-[11px] font-bold text-center ${tradeMessage.type === 'success' ? 'bg-bullish/5 border-bullish/20 text-bullish' : 'bg-bearish/5 border-bearish/20 text-bearish'}`}>
              {tradeMessage.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
    }
