import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownLeft, 
  RefreshCw, MoreHorizontal, Home, BarChart2, Activity, Briefcase, 
  Menu, Bell, Smartphone, ShieldCheck, CheckCircle2, AlertTriangle, 
  ChevronRight, Search, Landmark, UserCheck, ShieldAlert
} from 'lucide-react';

// ==========================================
// CONFIGURATION & BACKEND API ROUTER LINK
// ==========================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.astratrade.co/api';

interface AccountState {
  portfolioValue: number;
  allTimeProfit: number;
  allTimeProfitPercent: number;
  simulatedBuyingPower: number;
}

export default function AstraTradeTerminal() {
  // Navigation & View Architecture
  const [activeTab, setActiveTab] = useState<'home' | 'market' | 'trade' | 'portfolio' | 'discover'>('home');
  const [portfolioSection, setPortfolioSection] = useState<'holdings' | 'live_pnl' | 'history'>('holdings');
  const [marketFilter, setMarketFilter] = useState<'all' | 'stocks' | 'forex' | 'crypto'>('all');
  
  // Interactive Trading State
  const [tradeMode, setTradeMode] = useState<'spot' | 'binary'>('binary');
  const [wagerAmount, setWagerAmount] = useState<number>(1000);
  const [selectedAsset, setSelectedAsset] = useState<string>('SCOM');
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // M-Pesa Transaction Modal Architecture
  const [financeModal, setFinanceModal] = useState<{ isOpen: boolean; type: 'deposit' | 'withdraw' | null }>({ isOpen: false, type: null });
  const [phoneNumber, setPhoneNumber] = useState<string>('2547');
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'processing' | 'stk_sent' | 'success' | 'error'>('idle');

  // Hydrated Global Live Account States
  const [account, setAccount] = useState<AccountState>({
    portfolioValue: 93943.56,
    allTimeProfit: 15420.40,
    allTimeProfitPercent: 6.54,
    simulatedBuyingPower: 2500.00
  });

  // Dynamic Live Data Connection Hook
  useEffect(() => {
    async function hydrateTerminalMetrics() {
      try {
        const response = await fetch(`${API_BASE_URL}/account/summary`);
        if (response.ok) {
          const data = await response.json();
          setAccount(data);
        }
      } catch (err) {
        console.warn("Backend node offline. Operating in decoupled local sandbox execution context.");
      }
    }
    hydrateTerminalMetrics();
    const interval = setInterval(hydrateTerminalMetrics, 15000);
    return () => clearInterval(interval);
  }, []);

  // Trigger M-Pesa STK Push / Daraja Handler
  const handleMPesaTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionStatus('processing');
    
    try {
      const response = await fetch(`${API_BASE_URL}/payments/stk-push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: parseFloat(transactionAmount),
          type: financeModal.type
        })
      });

      if (response.ok) {
        setTransactionStatus('stk_sent');
        setTimeout(() => setTransactionStatus('success'), 4000);
      } else {
        setTransactionStatus('error');
      }
    } catch (err) {
      // Sandbox fallback loop for UI rendering verification
      setTimeout(() => {
        setTransactionStatus('success');
        if (financeModal.type === 'deposit') {
          setAccount(prev => ({
            ...prev,
            simulatedBuyingPower: prev.simulatedBuyingPower + parseFloat(transactionAmount),
            portfolioValue: prev.portfolioValue + parseFloat(transactionAmount)
          }));
        }
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 font-sans antialiased pb-28 select-none">
      
      {/* HEADER NODE */}
      <header className="sticky top-0 z-40 bg-[#060814]/90 backdrop-blur-md border-b border-slate-900 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
            <Activity className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-md font-bold tracking-tight text-white flex items-center">Astra Trade</h1>
            <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase">Nairobi Securities Exchange</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-slate-950 border border-slate-900 p-2 rounded-xl text-slate-400 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          </button>
          <div className="w-9 h-9 rounded-xl border border-slate-800 bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            DT
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK TERMINAL SWITCHER */}
      <main className="max-w-md mx-auto px-4 pt-4">
        
        {/* VIEW 1: HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Portfolio Matrix Card */}
            <div className="bg-gradient-to-b from-[#0b0f26] to-[#070a1e] border border-slate-900 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Live Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium uppercase">Total Portfolio Value</p>
              <h2 className="text-3xl font-extrabold text-white mt-1 font-mono tracking-tight">
                KSh {account.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h2>
              <div className="flex items-center space-x-1.5 mt-1 text-emerald-400 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+KSh {account.allTimeProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({account.allTimeProfitPercent}%)</span>
                <span className="text-slate-500 font-normal text-[10px] ml-1">Overall</span>
              </div>

              {/* Vector Sparkline */}
              <div className="h-16 mt-4 relative w-full flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 25 Q 15 10 35 20 T 70 5 T 100 12" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 0 25 Q 15 10 35 20 T 70 5 T 100 12 L 100 30 L 0 30 Z" fill="url(#chartGrad)" />
                </svg>
              </div>

              {/* Operational Action Gateways */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-900/60 text-center">
                <button onClick={() => setFinanceModal({ isOpen: true, type: 'deposit' })} className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/30 hover:bg-slate-900 border border-slate-900 transition">
                  <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400"><ArrowDownLeft className="w-4 h-4" /></div>
                  <span className="text-[10px] font-bold text-slate-300 mt-1.5">Deposit</span>
                </button>
                <button onClick={() => setFinanceModal({ isOpen: true, type: 'withdraw' })} className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/30 hover:bg-slate-900 border border-slate-900 transition">
                  <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400"><ArrowUpRight className="w-4 h-4" /></div>
                  <span className="text-[10px] font-bold text-slate-300 mt-1.5">Withdraw</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/30 hover:bg-slate-900 border border-slate-900 transition">
                  <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400"><RefreshCw className="w-4 h-4" /></div>
                  <span className="text-[10px] font-bold text-slate-300 mt-1.5">Swap</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/30 hover:bg-slate-900 border border-slate-900 transition">
                  <div className="bg-slate-800 p-2 rounded-lg text-slate-400"><MoreHorizontal className="w-4 h-4" /></div>
                  <span className="text-[10px] font-bold text-slate-300 mt-1.5">More</span>
                </button>
              </div>
            </div>

            {/* Buying Power Display Frame */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Available Buying Power</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">KSh {account.simulatedBuyingPower.toFixed(2)}</span>
            </div>

            {/* Live Tickers Segment */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">Market Matrix Indices</h3>
                <button onClick={() => setActiveTab('market')} className="text-xs text-indigo-400 font-semibold flex items-center">See Matrix <ChevronRight className="w-3.5 h-3.5 ml-0.5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0b0f26] border border-slate-900 p-3.5 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">NASI Index</p>
                  <p className="text-base font-bold text-white mt-0.5 font-mono">112.40</p>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">+0.45%</span>
                </div>
                <div className="bg-[#0b0f26] border border-slate-900 p-3.5 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">NSE 20 Share</p>
                  <p className="text-base font-bold text-white mt-0.5 font-mono">1,642.10</p>
                  <span className="text-[10px] font-bold text-rose-500 font-mono">-0.18%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LIVE MARKET MATRIX */}
        {activeTab === 'market' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search equity tickers, instruments..." 
                className="w-full bg-[#0b0f26] border border-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-600 transition"
              />
            </div>

            <div className="flex space-x-1.5">
              {['all', 'stocks', 'forex', 'crypto'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMarketFilter(cat as any)}
                  className={`text-[10px] px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition shrink-0 ${marketFilter === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-950 text-slate-500 border border-slate-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {[
                { symbol: 'SCOM', name: 'Safaricom PLC', price: 18.85, change: 1.34, up: true },
                { symbol: 'EQTY', name: 'Equity Group Holdings', price: 44.50, change: 3.12, up: true },
                { symbol: 'KCB', name: 'KCB Group PLC', price: 32.10, change: -0.85, up: false },
                { symbol: 'EABL', name: 'East African Breweries', price: 124.75, change: 0.00, up: true },
                { symbol: 'COOP', name: 'Co-operative Bank of Kenya', price: 12.25, change: -2.10, up: false }
              ].map((asset) => (
                <div 
                  key={asset.symbol}
                  onClick={() => { setSelectedAsset(asset.symbol); setActiveTab('trade'); }}
                  className="bg-[#0b0f26] border border-slate-900 p-3.5 rounded-2xl flex items-center justify-between hover:border-slate-800 transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-950 border border-slate-900 rounded-xl flex items-center justify-center font-mono font-black text-xs text-indigo-400">
                      {asset.symbol}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">{asset.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">NSE • Equity Ticker</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white font-mono">KSh {asset.price.toFixed(2)}</p>
                    <p className={`text-[10px] font-bold font-mono ${asset.change > 0 ? 'text-emerald-400' : asset.change < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                      {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: TRADE EXECUTION CONTROLLER */}
        {activeTab === 'trade' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-[#0b0f26] border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black font-mono text-white tracking-tight">{selectedAsset}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Nairobi Securities Exchange Realtime Asset Node</p>
              </div>
              <div className="text-right">
                <span className="text-md font-bold text-white font-mono">KSh 18.85</span>
                <span className="text-[10px] font-bold text-emerald-400 font-mono block">+1.35%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900">
              <button 
                onClick={() => setTradeMode('spot')}
                className={`py-2 text-[11px] font-bold rounded-lg transition uppercase tracking-wider ${tradeMode === 'spot' ? 'bg-[#0b0f26] text-white border border-slate-800 shadow-sm' : 'text-slate-500'}`}
              >
                Spot Order
              </button>
              <button 
                onClick={() => setTradeMode('binary')}
                className={`py-2 text-[11px] font-bold rounded-lg transition uppercase tracking-wider ${tradeMode === 'binary' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}
              >
                Binary Option
              </button>
            </div>

            {/* Simulated Live Processing Vector Chart */}
            <div className="bg-[#0b0f26] border border-slate-900 rounded-2xl p-4">
              <div className="h-24 flex items-center justify-center bg-slate-950/40 rounded-xl border border-slate-900/50 relative overflow-hidden">
                <svg className="w-full h-full px-2" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 0 30 C 10 20, 20 38, 40 15 C 60 5, 80 25, 100 10" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Configuration Interface */}
            <div className="bg-[#0b0f26] border border-slate-900 rounded-2xl p-4 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Position Allocation (Stake)</label>
                <div className="relative rounded-xl border border-slate-900 bg-slate-950 px-3 py-2.5 flex items-center justify-between">
                  <input 
                    type="number" 
                    value={wagerAmount} 
                    onChange={(e) => setWagerAmount(parseInt(e.target.value) || 0)}
                    className="bg-transparent font-mono text-base font-bold text-white focus:outline-none w-2/3"
                  />
                  <span className="text-xs font-bold font-mono text-slate-500">KSh</span>
                </div>
              </div>

              {tradeMode === 'binary' ? (
                <>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-slate-400">Speculative Payout Mult:</span>
                    <span className="font-mono font-black text-emerald-400">KES {(wagerAmount * 1.85).toFixed(2)} (185%)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs py-3.5 rounded-xl shadow-md transition uppercase">
                      Rise / Call
                    </button>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs py-3.5 rounded-xl shadow-md transition uppercase">
                      Fall / Put
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3.5">
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-amber-400 flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1" /> Option Hold constraint</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">Enforce target capital buffer structure mapping</p>
                    </div>
                    <button 
                      onClick={() => setIsLocked(!isLocked)}
                      className={`text-[9px] font-bold px-3 py-1.5 rounded-lg border transition ${isLocked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      {isLocked ? 'ACTIVE' : 'LOCK'}
                    </button>
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider transition">
                    Execute Market Entry
               
