import React, { useState, useEffect } from 'react';
import { Wallet, RefreshCw, Home, BarChart2, Activity, Clock, User, ChevronRight, Search, Bell, Shield, Lock, ArrowUpRight, ArrowDownRight, Smartphone, X, Eye, EyeOff, LogIn, UserPlus, TrendingUp, AlertTriangle, Layers, Phone } from 'lucide-react';

// Production or localhost backend cluster URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function App() {
  // --- AUTHENTICATION & JWT STATE ENGINE ---
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('astra_auth_token'));
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  
  // Auth Form Fields
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- PLATFORM NAVIGATION MODULES ---
  const [activeTab, setActiveTab] = useState<'home' | 'market' | 'trade' | 'portfolio' | 'more'>('home');
  const [marketTab, setMarketTab] = useState<'STOCKS' | 'BINARY_NODES'>('STOCKS');
  const [portfolioSubTab, setPortfolioSubTab] = useState<'HOLDINGS' | 'BINARY_ARCHIVE'>('HOLDINGS');
  const [showDepositModal, setShowDepositModal] = useState(false);

  // --- ASSET & RUNTIME PROFILE LEDGERS ---
  const [binaryHistory, setBinaryHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Trading input fields
  const [selectedBinarySymbol, setSelectedBinarySymbol] = useState('VOLATILITY 75');
  const [binaryWagerAmount, setBinaryWagerAmount] = useState<number>(100);
  const [tradeStatus, setTradeStatus] = useState<{ type: 'SUCCESS' | 'ERROR'; message: string } | null>(null);

  // --- AUTOMATED DATABASE SYNCHRONIZATION PIPELINE ---
  useEffect(() => {
    if (!token) {
      setCurrentUser(null);
      return;
    }

    const syncUserDataAndHistory = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch live profile values (Balance updates, etc.)
        const profileRes = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (profileRes.ok) {
          const userData = await profileRes.json();
          setCurrentUser(userData);
        } else if (profileRes.status === 401) {
          // Token expired handle logout safety
          handleLogout();
          return;
        }

        // 2. Fetch formal trade ledger directly out of MySQL database models
        const historyRes = await fetch(`${API_BASE_URL}/trades/binary/history`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setBinaryHistory(historyData);
        }
      } catch (err) {
        console.error("Database cluster linkage error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    syncUserDataAndHistory();
    const liveThread = setInterval(syncUserDataAndHistory, 5000); // 5-second interval heartbeat
    return () => clearInterval(liveThread);
  }, [token]);

  // --- AUTHENTICATION API OPERATIONS ---
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!username || !password || (authMode === 'SIGNUP' && !phoneNumber)) {
      setAuthError('Please fill out all operational fields.');
      return;
    }

    const endpoint = authMode === 'LOGIN' ? '/auth/login' : '/auth/signup';
    const payload = authMode === 'LOGIN' 
      ? { username, password }
      : { username, phone_number: phoneNumber, password, referral_code: referralCode || null };

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.detail || 'Authentication operation failed.');
      } else {
        // Handle standard backend OAuth2 bearer string mapping
        const tokenString = data.access_token;
        localStorage.setItem('astra_auth_token', tokenString);
        setToken(tokenString);
        
        // Reset forms
        setPassword('');
        setAuthError('');
      }
    } catch (err) {
      setAuthError('Connection to authentication cluster timed out.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('astra_auth_token');
    setToken(null);
    setCurrentUser(null);
    setBinaryHistory([]);
    setActiveTab('home');
  };

  // --- LIVE BINARY RISK CONTRACT DISPATCH OPERATIONS ---
  const executeBinaryWager = async (direction: 'CALL' | 'PUT') => {
    if (!token) return;
    setTradeStatus(null);

    if (binaryWagerAmount < 10) {
      setTradeStatus({ type: 'ERROR', message: 'Minimum contract stake is KES 10.00' });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/trades/binary/wager`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          symbol: selectedBinarySymbol,
          stake: binaryWagerAmount,
          direction: direction
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setTradeStatus({ type: 'ERROR', message: data.detail || 'Contract calculation rejected.' });
      } else {
        setTradeStatus({
          type: 'SUCCESS',
          message: `Contract open! Potential return: KES ${data.potential_payout?.toLocaleString() || (binaryWagerAmount * 3.2).toLocaleString()}`
        });
        
        // Optimistic UI state adjustment
        if (currentUser) {
          setCurrentUser({ ...currentUser, balance: currentUser.balance - binaryWagerAmount });
        }
      }
    } catch (err) {
      setTradeStatus({ type: 'ERROR', message: 'Unable to register position with trading core.' });
    }
  };

  // Static reference metrics for stocks module
  const staticStockHoldings = [
    { s: "SCOM", n: "Safaricom PLC", qty: "420", v: "KES 12,831.00", c: "-1.12%", up: false },
    { s: "EQTY", n: "Equity Bank Group", qty: "150", v: "KES 11,137.50", c: "+2.41%", up: true }
  ];

  // --- ACCESS CONTROL ENTRY PORTER ---
  if (!token || !currentUser) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white font-sans max-w-md mx-auto flex flex-col justify-between p-6 border-x border-slate-900 shadow-2xl">
        <div className="space-y-1.5 text-center pt-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-3">
            <Layers className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">AstraTrade</h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">MySQL Driven Equities & High-Frequency Binary Contract Node</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 space-y-4 my-auto shadow-xl">
          <div className="flex border-b border-slate-900 text-xs font-bold text-slate-500 mb-2">
            <button type="button" onClick={() => { setAuthMode('LOGIN'); setAuthError(''); }} className={`w-1/2 pb-2.5 transition tracking-wider ${authMode === 'LOGIN' ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}>SIGN IN</button>
            <button type="button" onClick={() => { setAuthMode('SIGNUP'); setAuthError(''); }} className={`w-1/2 pb-2.5 transition tracking-wider ${authMode === 'SIGNUP' ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}>CREATE KEY</button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-3.5">
            {authError && <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] font-mono text-rose-400 text-center">⚠️ {authError}</div>}
            
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Username</label>
              <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
            </div>

            {authMode === 'SIGNUP' && (
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">M-Pesa Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input type="tel" placeholder="0712345678" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Security Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-indigo-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff className="w-3.5 h-3.5"/> : <Eye className="w-3.5 h-3.5"/>}
                </button>
              </div>
            </div>

            {authMode === 'SIGNUP' && (
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Referral Code (Optional)</label>
                <input type="text" placeholder="e.g. ASTRA_MARK" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white font-mono focus:outline-none" />
              </div>
            )}

            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-xs py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 mt-2 transition hover:opacity-95">
              {authMode === 'LOGIN' ? 'Access Cluster Account' : 'Initialize Database Entry'}
            </button>
          </form>
        </div>

        <div className="text-center space-y-1 text-[10px] text-slate-600 font-medium">
          <p className="flex items-center justify-center gap-1"><Shield className="w-3 h-3 text-emerald-500"/> Synchronized Database Token Exchange Active</p>
          <p>© 2026 AstraTrade Lab.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-white font-sans max-w-md mx-auto relative pb-20 border-x border-slate-900 shadow-2xl">
      
      {/* SYSTEM CONTROLS STICKY HEADER */}
      <header className="p-4 border-b border-slate-900/60 bg-[#070b19]/90 sticky top-0 z-40 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <div>
            <h1 className="text-md font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AstraCore Dual Engine</h1>
            <p className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider">User: {currentUser.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {isLoading && <RefreshCw className="w-3 h-3 text-indigo-400 animate-spin" />}
          <div onClick={() => setActiveTab('more')} className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center cursor-pointer text-slate-400 hover:text-white transition">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* RENDER SWITCH PANEL */}
      <main className="p-4 space-y-5">

        {/* TAB 1: LEDGER HUB */}
        {activeTab === 'home' && (
          <>
            <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/40 p-5 rounded-2xl border border-slate-800/80 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Live Account Valuation</span>
                <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[8px] font-mono rounded-full uppercase tracking-wider">MySQL Balance</span>
              </div>
              <div className="space-y-0.5">
                <h2 className="text-3xl font-extrabold tracking-tight font-mono text-slate-100">
                  KES {currentUser.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </h2>
                <p className="text-[9px] font-mono text-slate-500">Referral ID: {currentUser.referral_code || 'None'}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs font-bold text-slate-300">
                <button onClick={() => setShowDepositModal(true)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 border border-slate-900 hover:border-slate-800 transition"><Wallet className="w-3.5 h-3.5 text-emerald-400" /> M-Pesa Deposit</button>
                <button onClick={() => { setActiveTab('trade'); }} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-95 transition"><Activity className="w-3.5 h-3.5" /> Execute Options</button>
              </div>
            </div>
            
            {/* PLATFORM NOTIFICATION CARD */}
            <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl flex gap-3 items-center">
              <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-[11px] text-slate-400">
                <p className="font-bold text-slate-300">Viral loop tracking activated</p>
                <p className="text-[10px] text-slate-500">Receive custom bonuses when nodes fund using your key.</p>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: MARKETS PANEL */}
        {activeTab === 'market' && (
          <>
            <div className="bg-slate-950 p-0.5 rounded-xl border border-slate-900 grid grid-cols-2 text-center text-xs font-bold text-slate-500">
              <span onClick={() => setMarketTab('STOCKS')} className={`py-2 rounded-lg cursor-pointer transition ${marketTab === 'STOCKS' ? 'bg-slate-900 text-white' : ''}`}>Nairobi Equities</span>
              <span onClick={() => setMarketTab('BINARY_NODES')} className={`py-2 rounded-lg cursor-pointer transition ${marketTab === 'BINARY_NODES' ? 'bg-slate-900 text-indigo-400' : ''}`}>Synthetic Nodes</span>
            </div>

            <div className="space-y-2">
              {marketTab === 'STOCKS' ? (
                <div className="p-4 text-center bg-slate-950/20 border border-slate-900 rounded-xl">
                  <p className="text-xs text-slate-500 font-mono">Traditional stock catalogs are static during engine deployment.</p>
                </div>
              ) : (
                ['VOLATILITY 75', 'BOOM 500', 'CRASH 1000'].map((ind) => (
                  <div key={ind} onClick={() => { setActiveTab('trade'); setSelectedBinarySymbol(ind); }} className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-900/40 border-r-2 border-r-indigo-500/40 transition">
                    <div>
                      <p className="text-xs font-black text-slate-200">{ind}</p>
                      <span className="text-[9px] text-indigo-400 font-mono">FastAPI Contract Engine Asset</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">3.2x Multiplier</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* TAB 3: OPERATION MATRIX */}
        {activeTab === 'trade' && (
          <>
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Select Runtime Index Target</label>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-black">
                {['VOLATILITY 75', 'BOOM 500', 'CRASH 1000'].map((sym) => (
                  <span key={sym} onClick={() => { setSelectedBinarySymbol(sym); setTradeStatus(null); }} className={`py-2.5 rounded-lg cursor-pointer border transition ${selectedBinarySymbol === sym ? 'bg-slate-900 text-indigo-400 border-indigo-500/30' : 'bg-slate-950 border-slate-900 text-slate-400'}`}>{sym}</span>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-900 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contract Stake Size</span>
                <span className="text-[10px] font-mono text-slate-500">Min: KES 10.00</span>
              </div>
              
              <div className="relative">
                <input type="number" min="10" value={binaryWagerAmount} onChange={(e) => setBinaryWagerAmount(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-2xl font-bold font-mono text-white focus:outline-none focus:border-indigo-500/50" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">KES</span>
              </div>

              {tradeStatus && (
                <div className={`p-3 border rounded-xl text-center text-[11px] font-mono ${tradeStatus.type === 'SUCCESS' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                  {tradeStatus.message}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <button onClick={() => executeBinaryWager('CALL')} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex flex-col items-center gap-0.5 active:scale-95 transition">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  <span>Call (Rise)</span>
                </button>
                <button onClick={() => executeBinaryWager('PUT')} className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider flex flex-col items-center gap-0.5 active:scale-95 transition">
                  <ArrowDownRight className="w-5 h-5 stroke-[2.5]" />
                  <span>Put (Fall)</span</button>
              </div>
            </div>
          </>
        )}

        {/* TAB 4: HISTORICAL LEDGER ARCHIVE */}
        {activeTab === 'portfolio' && (
          <>
            <div className="bg-slate-950 p-0.5 rounded-xl border border-slate-900 grid grid-cols-2 text-center text-xs font-bold text-slate-500">
              <span onClick={() => setPortfolioSubTab('HOLDINGS')} className={`py-2 rounded-lg cursor-pointer transition ${portfolioSubTab === 'HOLDINGS' ? 'bg-slate-900 text-white' : ''}`}>Equity Stock Shares</span>
              <span onClick={() => setPortfolioSubTab('BINARY_ARCHIVE')} className={`py-2 rounded-lg cursor-pointer transition ${portfolioSubTab === 'BINARY_ARCHIVE' ? 'bg-slate-900 text-indigo-400' : ''}`}>Binary Option History</span>
            </div>

            <div className="space-y-2.5">
              {portfolioSubTab === 'HOLDINGS' ? (
                staticStockHoldings.map((asset, idx) => (
                  <div key={idx} className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl flex justify-between items-center font-mono">
                    <div>
                      <p className="text-xs font-bold text-slate-200 font-sans">{asset.n}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{asset.qty} Allocated Units · Verified</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-300">{asset.v}</p>
                      <p className="text-[10px] font-black text-emerald-400">{asset.c}</p>
                    </div>
                  </div>))
              ) : (
                binaryHistory.length === 0 ? (
                  <div className="p-10 text-center bg-slate-950/20 border border-slate-900 rounded-xl">
                    <Clock className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                    <p className="text-xs text-slate-500 font-mono">No operations fetched out of MySQL database models.</p>
                  </div>
                ) : (
                  [...binaryHistory].reverse().map((trade) => (
                    <div key={trade.id} className="bg-slate-950/50 border border-slate-900/80 p-3.5 rounded-xl flex justify-between items-center font-mono text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-slate-200 text-xs">{trade.symbol}</span>
                          <span className={`text-[8px] font-black px-1.5 py-0.2 rounded border ${trade.direction === 'CALL' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>{trade.direction}</span>
                        </div>
                        <p className="text-[9px] text-slate-500">{trade.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400">Stake: KES {Number(trade.stake).toFixed(2)}</p>
                        <p className={`font-black text-xs ${trade.status === 'WON' ? 'text-emerald-400' : trade.status === 'LOST' ? 'text-slate-500' : 'text-amber-400'}`}>
                          {trade.status === 'WON' ? `+KES ${Number(trade.potential_payout).toFixed(2)}` : trade.status === 'LOST' ? 'LOST' : 'OPEN'}
                        </p>
                      </div>
                    </div>))
                )
              )}
            </div>
          </>
        )}

        {/* TAB 5: SYSTEM MANAGEMENT TERMINAL */}
        {activeTab === 'more' && (
          <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-200">Terminal Node Session</h3>
                <p className="text-[10px] font-mono text-slate-500">Phone: {currentUser.phone_number}</p>
              </div>
              <button onClick={handleLogout} className="text-[10px] font-black bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1.5 rounded-xl uppercase tracking-wider transition hover:bg-rose-500/20">Terminate JWT Session</button>
            </div>
            
            <div className="text-[10px] text-slate-500 space-y-1 font-mono">
              <p>Database Core: SQLAlchemy Async Engine</p>
              <p>Relational Mapping: Connected via pymysql driver</p>
            </div>
          </div>
        )}</main>

      {/* FIXED APPLICATION ROUTING BAR */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#070b19]/90 backdrop-blur-md border-t border-slate-900/80 py-2.5 px-2 grid grid-cols-5 text-center text-[10px] font-bold uppercase text-slate-500 z-40">
        {[
          { id: 'home', l: 'Ledger', icon: <Home className="w-4 h-4" /> },
          { id: 'market', l: 'Markets', icon: <BarChart2 className="w-4 h-4" /> },
          { id: 'trade', l: 'Execute', icon: <Activity className="w-4 h-4" /> },
          { id: 'portfolio', l: 'Archive', icon: <Clock className="w-4 h-4" /> },
          { id: 'more', l: 'System', icon: <User className="w-4 h-4" /> }
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex flex-col items-center gap-1 transition ${activeTab === tab.id ? 'text-indigo-400' : 'hover:text-slate-300'}`}>
            {tab.icon}
            <span>{tab.l}</span>
          </button>
        ))}
      </nav>

      {/* INTASEND MANUAL PAYMENT INSTRUCTIONS PORTAL */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-4">
          <div className="bg-[#070b19] border border-slate-800 rounded-2xl w-full max-w-sm p-1">
            <div className="p-4 border-b border-slate-900/60 flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-2 text-indigo-400"><Smartphone className="w-4 h-4" /> IntaSend Webhook Trigger Instructions</span>
              <button onClick={() => setShowDepositModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div><div className="p-5 space-y-3 font-mono text-[10px]">
              <p className="text-slate-400 font-sans text-[11px]">Since endpoints are now protected by bearer token logic, pass your dynamic authentication signature when mocking live webhook execution sweeps locally.</p>
              <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl text-slate-300 overflow-x-auto whitespace-pre select-all">
{`curl -X POST "${API_BASE_URL}/payments/intasend-callback" \\
  -H "X-Intasend-Digest: your-configured-secret" \\
  -H "Content-Type: application/json" \\
  -d '{"state": "COMPLETE", "net_amount": 1000.00, "meta": {"user_id": "${currentUser.id}"}}'`}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
              }
