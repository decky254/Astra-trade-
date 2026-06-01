import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  MoreHorizontal, 
  Home, 
  BarChart2, 
  Activity, 
  User, 
  Clock, 
  AlertCircle, 
  X, 
  Smartphone, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  up: boolean;
}

interface HistoryItem {
  asset: string;
  type: 'CALL' | 'PUT';
  stake: number;
  payout: number;
  status: 'CONTRACT WON' | 'SETTLED LOSS' | 'CAPPED WIN';
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'market' | 'trade' | 'portfolio' | 'more'>('home');
  const [portfolioTab, setPortfolioTab] = useState<'holdings' | 'allocation' | 'pnl' | 'history'>('history');
  const [showMpesa, setShowMpesa] = useState(false);
  const [wagerAmount, setWagerAmount] = useState<number>(1000);
  const [mpesaError, setMpesaError] = useState<string | null>(
    "Failed to execute 'fetch' on 'Window': Failed to parse URL from backend configuration sync string."
  );

  // --- HARDCODED APP STATE DATA ---
  const walletBalance = 93943.56;
  const portfolioNetValue = 2037.00;
  const portfolioProfitAllTime = 15420.40;
  const portfolioProfitPercent = 6.54;

  const markets: MarketAsset[] = [
    { symbol: 'SCOM', name: 'Safaricom PLC • NSE', price: 18.85, change: 1.35, up: true },
    { symbol: 'EQTY', name: 'Equity Group Holdings • NSE', price: 39.50, change: -0.85, up: false },
    { symbol: 'V75', name: 'Volatility 75 Index', price: 145230.40, change: 4.22, up: true },
    { symbol: 'V1S', name: 'Volatility 1s Index', price: 285.15, change: 0.12, up: true }
  ];

  const historicalContracts: HistoryItem[] = [
    { asset: 'SCOM', type: 'CALL', stake: 1000, payout: 3200, status: 'CONTRACT WON', date: '31 May 2026, 09:08:00' },
    { asset: 'EQTY', type: 'PUT', stake: 500, payout: 0, status: 'SETTLED LOSS', date: '31 May 2026, 08:45:00' },
    { asset: 'SCOM', type: 'CALL', stake: 2000, payout: 5000, status: 'CAPPED WIN', date: '31 May 2026, 08:12:00' }
  ];

  // --- SAFE BACKEND URL INTEGRATION ---
  const triggerStkPush = async () => {
    try {
      setMpesaError(null);
      // Clean target string layout without markdown link wrappers
      const backendUrl = "https://your-daraja-backend.up.railway.app/payments/stk-push";
      const response = await fetch(backendUrl, { method: 'POST' });
      if (!response.ok) throw new Error("Handshake Interrupted");
    } catch (err: any) {
      setMpesaError("Failed to execute 'fetch' on 'Window': Failed to resolve system handshake at https://your-daraja-backend.up.railway.app/payments/stk-push");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans max-w-md mx-auto relative pb-24 border-x border-slate-900 shadow-2xl">
      
      {/* GLOBAL HEADER HEADER BAR */}
      <header className="p-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-40 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Astra Trade</h1>
          <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">Secure Trading Hub</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-sm">
          DT
        </div>
      </header>

      {/* RENDER ACTIVE ROUTE DASHBOARDS */}
      <main className="p-4 space-y-4">
        
        {/* TAB 1: HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl border border-indigo-500/10 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
              <div className="flex justify-between items-center text-slate-400 text-xs">
                <span className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" /> M-Pesa Integrated Float Balance</span>
                <RefreshCw className="w-3.5 h-3.5 hover:rotate-180 transition-transform cursor-pointer" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">KSh {walletBalance.toLocaleString()}</h2>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => setShowMpesa(true)} className="flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/20">
                  <ArrowUpRight className="w-4 h-4" /> Deposit
                </button>
                <button onClick={() => setShowMpesa(true)} className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all">
                  <ArrowDownLeft className="w-4 h-4" /> Withdraw
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-[11px] text-slate-400">System Engines</p>
                <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
                </p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-[11px] text-slate-400">Active Pipeline</p>
                <p className="text-sm font-bold mt-1 font-mono text-indigo-400">NODE BUILD V2.1</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MARKET MATRIX */}
        {activeTab === 'market' && (
          <div className="space-y-3 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-400 px-1 uppercase tracking-wider">Market Price Matrix</h3>
            <div className="space-y-2">
              {markets.map((asset) => (
                <div key={asset.symbol} onClick={() => setActiveTab('trade')} className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all flex justify-between items-center cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold tracking-wide">{asset.symbol}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase font-mono">
                        {asset.symbol.startsWith('V') ? 'Synthetic' : 'NSE Equity'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{asset.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">{asset.price.toLocaleString()}</p>
                    <p className={`text-xs font-medium mt-0.5 ${asset.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {asset.up ? '+' : ''}{asset.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TRADING WORKBENCH */}
        {activeTab === 'trade' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-400">SCOM</span>
                <p className="text-[10px] text-slate-500">Safaricom PLC • NSE Price Matrix</p>
              </div>
              <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-lg border border-indigo-500/20 uppercase tracking-widest">
                Synthetic Engine
              </span>
            </div>

            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 grid grid-cols-2 text-center text-xs font-semibold">
              <button className="py-2.5 rounded-lg bg-slate-800 text-slate-400">Asset Purchase</button>
              <button className="py-2.5 rounded-lg bg-indigo-600 text-white shadow-md">Binary Predict</button>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Wager Stake Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={wagerAmount} 
                  onChange={(e) => setWagerAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 px-4 text-xl font-bold font-mono focus:outline-none focus:border-indigo-500 text-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">KES</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[1000, 5000, 10000].map((amt) => (
                  <button key={amt} onClick={() => setWagerAmount(amt)} className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${wagerAmount === amt ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}>
                    KES {amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
              <span className="text-slate-400">Speculative Payout Rate</span>
              <span className="font-mono font-extrabold text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-md border border-indigo-500/10">3.2x Factor</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400">Potential Gross Returns:</span>
              <span className="text-lg font-mono font-bold text-emerald-400">KES {(wagerAmount * 3.2).toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-slate-950 font-bold py-3.5 rounded-xl text-xs flex flex-col items-center justify-center gap-0.5 tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/10">
                <span>▲ Rise / Call</span>
              </button>
              <button className="bg-rose-500 hover:bg-rose-600 active:scale-98 text-white font-bold py-3.5 rounded-xl text-xs flex flex-col items-center justify-center gap-0.5 tracking-wider uppercase transition-all shadow-lg shadow-rose-500/10">
                <span>▼ Fall / Put</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PORTFOLIO TERMINAL */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Total Portfolio Net Value</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase">Registered Account</span>
              </div>
              <h2 className="text-2xl font-extrabold font-mono">KES {portfolioNetValue.toLocaleString()}.00</h2>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span>▲ +KES {portfolioProfitAllTime.toLocaleString()} ({portfolioProfitPercent}%)</span>
                <span className="text-slate-500 text-[10px] ml-1">ALL TIME</span>
              </p>
            </div>

            <div className="flex gap-1 border-b border-slate-900 pb-px text-xs font-semibold overflow-x-auto whitespace-nowrap scrollbar-none">
              {(['holdings', 'allocation', 'pnl', 'history'] as const).map((tab) => (
                <button key={tab} onClick={() => setPortfolioTab(tab)} className={`py-2 px-3 border-b-2 capitalize transition-all ${portfolioTab === tab ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5 rounded-t-lg' : 'border-transparent text-slate-400 hover:text-white'}`}>
                  {tab === 'history' ? 'Options History' : tab === 'pnl' ? 'Live PNL' : tab}
                </button>
              ))}
            </div>

            {portfolioTab === 'history' ? (
              <div className="space-y-2">
                {historicalContracts.map((item, index) => (
                  <div key={index} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold tracking-wide">{item.asset}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.type === 'CALL' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">{item.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border font-mono ${item.status.includes('WON') || item.status.includes('WIN') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                        🏆 {item.status}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-400">
                      <span>Stake: <strong className="text-white font-mono">KSh {item.stake.toLocaleString()}</strong></span>
                      <span>Payout: <strong className="text-emerald-400 font-mono">KSh {item.payout.toLocaleString()}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-8 text-center text-xs text-slate-500 font-mono">
                Standard {portfolioTab.toUpperCase()} Grid Mapping Frame
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SYSTEM APPLICATION SETTINGS */}
        {activeTab === 'more' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-400 px-1 uppercase tracking-wider">Application Settings</h3>
            
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-sm">🤝</div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Network Affiliate Rewards</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Receive <strong>KES 50.00</strong> directly whenever your code executes a funding cycle of KES 250+. Peers instantly unlock a <strong className="text-indigo-400">KES 20.00</strong> balance.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase">Personal Verification Token</span>
                <div className="flex gap-1.5">
                  <span className="font-mono text-xs font-bold bg-slate-950 px-3 py-1.5 rounded border border-slate-800 text-amber-400">ASTRA_MARK_742</span>
                  <button className="bg-indigo-600 text-white px-3 py-1 text-[11px] font-bold rounded hover:bg-indigo-700">Share</button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 divide-y divide-slate-800 text-xs font-medium">
              <div className="p-4 flex justify-between items-center text-slate-300 hover:text-white cursor-pointer">
                <span>Security Verification Config</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
              <div className="p-4 flex justify-between items-center text-slate-300 hover:text-white cursor-pointer">
                <span>Daraja API M-Pesa Integration Middleware</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
              <div className="p-4 flex justify-between items-center text-slate-300 hover:text-white cursor-pointer">
                <span>System Terms & Legal Declarations</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
              <div className="p-4 flex justify-between items-center text-rose-400 hover:text-rose-300 cursor-pointer">
                <span>Terminate Profile Session Token</span>
                <ChevronRight className="w-4 h-4 text-rose-900" />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FIXED BASE NAVIGATION TABBAR CONTROLLER */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-950/90 backdrop-blur border-t border-slate-900 py-2.5 px-2 grid grid-cols-5 text-center text-[10px] font-bold tracking-wider uppercase text-slate-500 z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-indigo-400 scale-105' : 'hover:text-white'}`}>
          <Home className="w-4 h-4" /> <span>Home</span>
        </button>
        <button onClick={() => setActiveTab('market')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'market' ? 'text-indigo-400 scale-105' : 'hover:text-white'}`}>
          <BarChart2 className="w-4 h-4" /> <span>Market</span>
        </button>
        <button onClick={() => setActiveTab('trade')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'trade' ? 'text-indigo-400 scale-105' : 'hover:text-white'}`}>
          <Activity className="w-4 h-4" /> <span>Trade</span>
        </button>
        <button onClick={() => setActiveTab('portfolio')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'portfolio' ? 'text-indigo-400 scale-105' : 'hover:text-white'}`}>
          <Clock className="w-4 h-4" /> <span>Portfolio</span>
        </button>
        <button onClick={() => setActiveTab('more')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'more' ? 'text-indigo-400 scale-105' : 'hover:text-white'}`}>
          <User className="w-4 h-4" /> <span>More</span>
        </button>
      </nav>

      {/* M-PESA TERMINAL MODAL POPUP */}
      {showMpesa && (
        <div className="fixed inset-0 bg-slate-950/80 b
