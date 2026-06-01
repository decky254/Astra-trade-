import React, { useState } from 'react';
import { Wallet, RefreshCw, Home, BarChart2, Activity, Clock, User, ChevronRight, Search, Bell, Shield, Lock, ArrowUpRight, Smartphone, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'market' | 'trade' | 'portfolio' | 'more'>('portfolio');
  const [marketTab, setMarketTab] = useState('Stocks');
  const [marketSubFilter, setMarketSubFilter] = useState('ALL');
  const [tradeAction, setTradeAction] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP'>('MARKET');
  const [wagerMode, setWagerMode] = useState<'KES' | 'QTY'>('KES');
  const [portfolioSubTab, setPortfolioSubTab] = useState<'HOLDINGS' | 'ALLOCATION' | 'LIVE PNL' | 'PERFORMANCE'>('HOLDINGS');
  const [wagerAmount, setWagerAmount] = useState<number>(1000);
  const [showMpesa, setShowMpesa] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b19] text-white font-sans max-w-md mx-auto relative pb-20 border-x border-slate-900 shadow-2xl selection:bg-indigo-500/30">
      
      {/* GLOBAL HEADER */}
      <header className="p-4 border-b border-slate-900/60 bg-[#070b19]/90 sticky top-0 z-40 flex justify-between items-center backdrop-blur-md">
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AstraTrade</h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide">Nairobi Securities Exchange</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center relative cursor-pointer">
            <div className="w-2 h-2 bg-indigo-500 rounded-full absolute top-0 right-0 animate-pulse" />
            <span className="text-xs">🤖</span>
          </div>
          <Bell className="w-5 h-5 text-slate-400 cursor-pointer" />
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-500/10">DT</div>
        </div>
      </header>

      {/* MAIN LAYOUT SECTIONS */}
      <main className="p-4 space-y-5">

        {/* HOME / DASHBOARD TAB */}
        {activeTab === 'home' && (
          <>
            <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/40 p-5 rounded-2xl border border-slate-800/80 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Total Portfolio Value</span>
                <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-black rounded-full tracking-wider uppercase">● Real Live</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold tracking-tight font-mono text-slate-100">KES 93,943.56</h2>
                <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +KES 15,420.40 (6.54%) <span className="text-slate-500 font-normal">Today</span>
                </p>
              </div>
              
              <div className="h-24 w-full pt-4 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M 0 18 Q 20 15 40 20 T 80 5 T 100 12 L 100 30 L 0 30 Z" fill="url(#chartGrad)" />
                  <path d="M 0 18 Q 20 15 40 20 T 80 5 T 100 12" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-semibold text-slate-300">
                <button onClick={() => setShowMpesa(true)} className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-900/60"><Wallet className="w-4 h-4 text-indigo-400" />Deposit</button>
                <button onClick={() => setShowMpesa(true)} className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-900/60"><ArrowUpRight className="w-4 h-4 text-purple-400" />Withdraw</button>
                <button className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-900/60"><RefreshCw className="w-4 h-4 text-emerald-400" />Transfer</button>
                <button onClick={() => setActiveTab('more')} className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-900/60"><User className="w-4 h-4 text-amber-400" />More</button>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-900 px-4 py-2.5 rounded-xl flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Simulated Wallet Buying Power</span>
              <span className="font-mono font-bold text-slate-200">KES 298.00</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400"><p>Market Overview</p><p className="text-indigo-400 text-[11px] font-semibold cursor-pointer">View All</p></div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                {[
                  { title: "NSE ALL SHARE", val: "133.45", change: "+0.28%", up: true },
                  { title: "NSE 20", val: "2,184.75", change: "+0.38%", up: true },
                  { title: "USD/KES", val: "128.75", change: "-0.12%", up: false }
                ].map((idx, i) => (
                  <div key={i} className="min-w-[125px] bg-slate-900/60 border border-slate-900 p-3 rounded-xl snap-start space-y-1">
                    <p className="text-[9px] text-slate-500 font-black tracking-wider uppercase">{idx.title}</p>
                    <p className="font-bold text-sm font-mono">{idx.val}</p>
                    <p className={`text-[10px] font-bold ${idx.up ? 'text-emerald-400' : 'text-rose-500'}`}>{idx.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* MARKET CATALOG TAB */}
        {activeTab === 'market' && (
          <>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search instruments..." className="w-full bg-slate-950 border border-slate-900 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-indigo-500/50" />
            </div>

            <div className="flex gap-1.5 overflow-x-auto scrollbar-none border-b border-slate-900/60 pb-1">
              {['All', 'Stocks', 'ETFs', 'Forex', 'Crypto'].map((t) => (
                <button key={t} onClick={() => setMarketTab(t)} className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${marketTab === t ? 'bg-slate-900 text-white border border-slate-800' : 'text-slate-500'}`}>{t}</button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-none text-[9px] font-black tracking-wider">
              {['ALL', 'BANKING', 'TELECOM (SCOM)', 'MANUFACTURING'].map((sub) => (
                <span key={sub} onClick={() => setMarketSubFilter(sub)} className={`px-2 py-1 rounded-md cursor-pointer border ${marketSubFilter === sub ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950/40 border-slate-900 text-slate-500'}`}>{sub}</span>
              ))}
            </div>

            <div className="space-y-2.5">
              {[
                { s: "SCOM", n: "Safaricom PLC", p: "KES 30.55", c: "-2.63%", up: false, path: "M0 5 Q20 25 40 10 T80 20 T100 25" },
                { s: "ABSA", n: "Absa Bank Kenya PLC", p: "KES 13.40", c: "+5.64%", up: true, path: "M0 25 Q20 10 40 18 T80 5 T100 8" },
                { s: "EQTY", n: "Equity Group Holdings PLC", p: "KES 74.25", c: "+3.32%", up: true, path: "M0 20 Q30 5 60 15 T100 2" },
                { s: "KCB", n: "KCB Group PLC", p: "KES 66.75", c: "+0.57%", up: true, path: "M0 22 L40 12 L70 5 L100 10" }
              ].map((stock) => (
                <div key={stock.s} onClick={() => setActiveTab('trade')} className="bg-slate-950/40 border border-slate-900/80 p-3 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-900/40">
                  <div className="flex items-center gap-3 w-1/3">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex flex-col justify-center items-center border border-slate-800/60">
                      <span className="text-[10px] font-black text-slate-200">{stock.s}</span>
                      <span className="text-[7px] font-medium text-slate-500">Stocks</span>
                    </div>
                    <div className="truncate"><p className="text-xs font-bold text-slate-200 truncate">{stock.n}</p></div>
                  </div>
                  <div className="w-16 h-6">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d={stock.path} fill="none" stroke={stock.up ? '#10b981' : '#f43f5e'} strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="text-right font-mono w-1/4">
                    <p className="text-xs font-bold">{stock.p}</p>
                    <p className={`text-[10px] font-black ${stock.up ? 'text-emerald-400' : 'text-rose-500'}`}>{stock.c}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TRADE INTERACTIVE EXECUTION TAB */}
        {activeTab === 'trade' && (
          <>
            <div className="flex justify-between items-center text-xs border-b border-slate-900 pb-2">
              <span onClick={() => setActiveTab('market')} className="text-slate-400 font-medium cursor-pointer">← Cancel</span>
              <div className="bg-slate-950 p-0.5 rounded-lg flex border border-slate-900 text-[10px] font-black">
                <span onClick={() => setTradeAction('BUY')} className={`px-4 py-1 rounded-md cursor-pointer ${tradeAction === 'BUY' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>BUY</span>
                <span onClick={() => setTradeAction('SELL')} className={`px-4 py-1 rounded-md cursor-pointer ${tradeAction === 'SELL' ? 'bg-rose-500 text-white' : 'text-slate-400'}`}>SELL</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Secured</span>
            </div>

            <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-indigo-400"/>Chart Visualization</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase">Interval: 15M</span>
              </div>
              <div className="h-20 w-full relative pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0 20 L15 15 L30 22 L45 10 L60 18 L75 8 L90 12 L100 4" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex bg-slate-950 p-0.5 rounded-xl border border-slate-900 text-center text-xs font-bold text-slate-500">
                {['MARKET', 'LIMIT', 'STOP'].map((o) => <span key={o} onClick={() => setOrderType(o as any)} className={`flex-1 py-1.5 rounded-lg cursor-pointer ${orderType === o ? 'bg-slate-900 text-white' : ''}`}>{o}</span>)}
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Amount in KES</span>
                <div className="relative">
                  <input type="number" value={wagerAmount} onChange={(e) => setWagerAmount(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-900 rounded-xl py-3 px-4 text-xl font-bold font-mono text-white focus:outline-none" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">KES</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* COMPREHENSIVE PORTFOLIO TAB WITH LIVE SUB-TAB FILTERING */}
        {activeTab === 'portfolio' && (
          <>
            <div className="flex justify-between items-center text-xs">
              <h2 className="text-sm font-black text-slate-400">My Portfolio</h2>
              <span className="text-[9px] text-indigo-400 font-black border border-indigo-500/20 px-2 py-0.5 bg-indigo-500/5 rounded-md tracking-wider uppercase">Registered Account</span>
            </div>

            <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 rounded-2xl border border-slate-900 space-y-1 shadow-xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Value</span>
              <h2 className="text-2xl font-extrabold font-mono text-slate-100">KES 93,943.56</h2>
              <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5" /> +KES 15,420.40 (6.54%) <span className="text-slate-600 font-normal">All Time</span></p>
            </div>

            {/* Sub-Tabs Selector */}
            <div className="grid grid-cols-4 gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-900 text-center text-[10px] font-black text-slate-500">
              {['HOLDINGS', 'ALLOCATION', 'LIVE PNL', 'PERFORMANCE'].map((pTab) => (
                <span key={pTab} onClick={() => setPortfolioSubTab(pTab as any)} className={`py-1.5 rounded-lg cursor-pointer transition ${portfolioSubTab === pTab ? 'bg-slate-900 text-white border border-slate-800' : ''}`}>{pTab}</span>
              ))}
            </div>

            {/* Dynamic Filtered Panels */}
            <div className="space-y-2">
              {portfolioSubTab === 'HOLDINGS' && (
                <>
                  <div className="flex justify-between items-center text-[9px] font-black tracking-wider text-slate-500 uppercase px-1">
                    <span>Holdings Assets</span>
                    <span>Active Value</span>
                  </div>
                  {[
                    { s: "KPLC", n: "Kenya Power & Lighting Co. PLC", qty: "13,513.514", lock: "42 Days", v: "KES 26,351.351", c: "-125.00%", up: false },
                    { s: "SCOM", n: "Safaricom PLC", qty: "98.061", lock: "7 Days", v: "KES 2,995.759", c: "-2.63%", up: false },
                    { s: "AMAC", n: "Africa Mega Agricorp PLC", qty: "476.19", lock: "7 Days", v: "KES 1,000.00", c: "+0.00%", up: true },
                    { s: "UCHM", n: "Uchumi Supermarket PLC", qty: "45,454.545", lock: "30 Days", v: "KES 10,000.00", c: "+5000.00%", up: true },
                    { s: "FTGH", n: "Flame Tree Group Holdings Ltd", qty: "740.741", lock: "7 Days", v: "KES 1,000.00", c: "+296.15%", up: true },
                    { s: "CABL", n: "E.A. Cables PLC", qty: "53,684.211", lock: "7 Days", v: "KES 51,000.00", c: "+617.78%", up: true }
                  ].map((asset, idx) => (
                    <div key={idx} className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl flex justify-between items-center transition hover:border-slate-800">
                      <div className="flex items-center gap-3 w-3.5/5">
                        <div className="w-9 h-9 bg-slate-900 border border-slate-800/80 rounded-xl flex items-center justify-center text-[9px] font-black text-slate-300">{asset.s}</div>
                        <div className="space-y-0.5 truncate">
                          <p className="text-xs font-bold text-slate-200 truncate">{asset.n}</p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                            <span>{asset.qty} Shares</span>
                            <span className="text-[9px] text-amber-500 font-bold bg-amber-500/5 px-1.5 py-0.5 border border-amber-500/10 rounded flex items-center gap-0.5"><Lock className="w-2.5 h-2.5"/> Locked ~ {asset.lock}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono w-1.5/5">
                        <p className="text-xs font-bold text-slate-100">{asset.v}</p>
                        <p className={`text-[10px] font-black ${asset.up ? 'text-emerald-400' : 'text-rose-500'}`}>{asset.c}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {portfolioSubTab === 'LIVE PNL' && (
                <div className="p-8 text-center bg-slate-950/20 border border-slate-900 rounded-xl">
                  <p className="text-xs text-slate-500 font-mono">No live synthetic or leveraged derivative contracts open.</p>
                </div>
              )}

              {portfolioSubTab === 'ALLOCATION' && (
                <div className="p-5 bg-slate-950/30 border border-slate-900 rounded-xl space-y-3 font-mono text-xs text-slate-400">
                  <p className="text-[10px] font-black tracking-wider text-slate-500 uppercase">Asset Allocation Breakdown</p>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5"><span>Equities (NSE)</span><span className="text-indigo-400 font-bold">96.8%</span></div>
                  <div className="flex justify-between"><span>M-Pesa Float Capital</span><span className="text-emerald-400 font-bold">3.2%</span></div>
                </div>
              )}

              {portfolioSubTab === 'PERFORMANCE' && (
                <div className="p-8 text-center bg-slate-950/20 border border-slate-900 rounded-xl">
                  <p className="text-xs text-slate-500 font-mono">Monthly account statement analytics compilation pending.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* SECURITY CONFIGURATION TAB */}
        {activeTab === 'more' && (
          <div className="space-y-3">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4">
              <Shield className="w-8 h-8 text-indigo-400" />
              <div><h3 className="text-sm font-bold">Node Gateways</h3><p className="text-xs text-slate-500">Active secure endpoint processing</p></div>
            </div>
            <div className="bg-slate-950 border border-slate-900 rounded-xl divide-y divide-slate-900 text-xs font-semibold text-slate-300">
              <div className="p-4 flex justify-between items-center"><span>Security Config</span><ChevronRight className="w-4 h-4 text-slate-600" /></div>
              <div onClick={() => setShowMpesa(true)} className="p-4 flex justify-between items-center cursor-pointer"><span>M-Pesa Middleware</
