import React, { useState } from 'react';
import { Wallet, RefreshCw, Home, BarChart2, Activity, User, Clock, X, Smartphone, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'market' | 'trade' | 'portfolio' | 'more'>('home');
  const [showMpesa, setShowMpesa] = useState(false);
  const [wagerAmount, setWagerAmount] = useState<number>(1000);
  const [mpesaError, setMpesaError] = useState<string | null>(null);

  const markets = [
    { symbol: 'SCOM', name: 'Safaricom PLC', price: 18.85, change: 1.35, up: true },
    { symbol: 'V75', name: 'Volatility 75 Index', price: 145230.40, change: 4.22, up: true }
  ];

  const triggerStkPush = () => {
    setMpesaError("Failed to resolve handshake at https://your-daraja-backend.up.railway.app/payments/stk-push");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans max-w-md mx-auto relative pb-24 border-x border-slate-900 shadow-2xl">
      <header className="p-4 border-b border-slate-900 bg-slate-950/80 sticky top-0 z-40 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Astra Trade</h1>
          <p className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Secure Hub</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">DT</div>
      </header>

      <main className="p-4 space-y-4">
        {activeTab === 'home' && (
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl border border-indigo-500/10 space-y-4">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" /> M-Pesa Balance</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-3xl font-extrabold">KSh 93,943.56</h2>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => setShowMpesa(true)} className="py-3 bg-indigo-600 rounded-xl text-xs font-semibold">Deposit</button>
              <button onClick={() => setShowMpesa(true)} className="py-3 bg-slate-800 rounded-xl text-xs font-semibold">Withdraw</button>
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-2">
            {markets.map((m) => (
              <div key={m.symbol} onClick={() => setActiveTab('trade')} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center cursor-pointer">
                <div><p className="font-bold">{m.symbol}</p><p className="text-[11px] text-slate-500">{m.name}</p></div>
                <div className="text-right"><p className="font-mono font-bold">{m.price.toLocaleString()}</p><p className={`text-xs ${m.up ? 'text-emerald-400' : 'text-rose-400'}`}>{m.change}%</p></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'trade' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Wager Stake</label>
              <div className="relative">
                <input type="number" value={wagerAmount} onChange={(e) => setWagerAmount(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xl font-bold font-mono text-white" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">KES</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-emerald-500 text-slate-950 font-bold py-4 rounded-xl text-xs uppercase">▲ Rise / Call</button>
              <button className="bg-rose-500 text-white font-bold py-4 rounded-xl text-xs uppercase">▼ Fall / Put</button>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-3">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Net Value</span>
              <h2 className="text-2xl font-extrabold font-mono">KES 2,037.00</h2>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div><p className="font-bold">SCOM CALL</p><p className="text-slate-500">31 May, 09:08</p></div>
              <div className="text-right font-mono text-emerald-400"><p>WON</p><p>KSh 3,200</p></div>
            </div>
          </div>
        )}

        {activeTab === 'more' && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 divide-y divide-slate-800 text-xs font-medium">
            <div className="p-4 flex justify-between items-center"><span>Security Config</span><ChevronRight className="w-4 h-4" /></div>
            <div className="p-4 flex justify-between items-center"><span>M-Pesa Middleware</span><ChevronRight className="w-4 h-4" /></div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-950/90 backdrop-blur border-t border-slate-900 py-2.5 px-2 grid grid-cols-5 text-center text-[10px] font-bold uppercase text-slate-500 z-40">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-indigo-400' : ''}><Home className="w-4 h-4 mx-auto mb-1" />Home</button>
        <button onClick={() => setActiveTab('market')} className={activeTab === 'market' ? 'text-indigo-400' : ''}><BarChart2 className="w-4 h-4 mx-auto mb-1" />Market</button>
        <button onClick={() => setActiveTab('trade')} className={activeTab === 'trade' ? 'text-indigo-400' : ''}><Activity className="w-4 h-4 mx-auto mb-1" />Trade</button>
        <button onClick={() => setActiveTab('portfolio')} className={activeTab === 'portfolio' ? 'text-indigo-400' : ''}><Clock className="w-4 h-4 mx-auto mb-1" />Portfolio</button>
        <button onClick={() => setActiveTab('more')} className={activeTab === 'more' ? 'text-indigo-400' : ''}><User className="w-4 h-4 mx-auto mb-1" />More</button>
      </nav>

      {showMpesa && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-400" /> M-Pesa Terminal</span>
              <button onClick={() => setShowMpesa(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 text-center space-y-4">
              {mpesaError ? (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] font-mono text-rose-400">{mpesaError}</div>
              ) : (
                <p className="text-xs text-slate-400">Ready to request secure STK push.</p>
              )}
              <button onClick={triggerStkPush} className="w-full bg-indigo-600 py-3 rounded-xl text-xs font-bold">Send STK Push</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                }
