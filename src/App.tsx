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
        const profileRes = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (profileRes.ok) {
          const userData = await profileRes.json();
          setCurrentUser(userData);
        } else if (profileRes.status === 401) {
          handleLogout();
          return;
        }

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
    const liveThread = setInterval(syncUserDataAndHistory, 5000);
    return () => clearInterval(liveThread);
  }, [token]);

  // --- AUTHENTICATION API OPERATIONS ---
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      if (authMode === 'LOGIN') {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Login failed');
        localStorage.setItem('astra_auth_token', data.access_token);
        setToken(data.access_token);
      } else {
        // FIXED PAYLOAD: Using 'phone_number' to match SQLAlchemy model
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username, 
            password, 
            phone_number: phoneNumber, 
            referral_code: referralCode || null 
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Signup failed');
        setAuthMode('LOGIN');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Connection error.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('astra_auth_token');
    setToken(null);
    setCurrentUser(null);
    setBinaryHistory([]);
    setActiveTab('home');
  };

  const executeBinaryWager = async (direction: 'CALL' | 'PUT') => {
    if (!token) return;
    setTradeStatus(null);
    try {
      const res = await fetch(`${API_BASE_URL}/trades/binary/wager`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ symbol: selectedBinarySymbol, stake: binaryWagerAmount, direction })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Trade failed');
      setTradeStatus({ type: 'SUCCESS', message: 'Contract placed!' });
      setCurrentUser({ ...currentUser, balance: currentUser.balance - binaryWagerAmount });
    } catch (err: any) {
      setTradeStatus({ type: 'ERROR', message: err.message });
    }
  };

  // --- UI RENDER ENGINE ---
  if (!token || !currentUser) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white p-6 max-w-md mx-auto">
        <div className="text-center pt-10 mb-8">
           <h1 className="text-3xl font-black">AstraTrade</h1>
           <p className="text-slate-500 text-xs">MySQL Backend Gateway</p>
        </div>
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {authError && <p className="text-rose-400 text-xs text-center">{authError}</p>}
          <input className="w-full bg-slate-900 p-3 rounded-xl text-xs" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          {authMode === 'SIGNUP' && <input className="w-full bg-slate-900 p-3 rounded-xl text-xs" placeholder="Phone Number" onChange={e => setPhoneNumber(e.target.value)} />}
          <input className="w-full bg-slate-900 p-3 rounded-xl text-xs" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-indigo-600 p-3 rounded-xl font-bold uppercase">{authMode}</button>
          <button type="button" className="text-slate-500 w-full text-xs" onClick={() => setAuthMode(authMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}>Switch to {authMode === 'LOGIN' ? 'Signup' : 'Login'}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-white font-sans max-w-md mx-auto pb-20">
      <header className="p-4 flex justify-between items-center border-b border-slate-900">
        <h1 className="font-black text-lg">AstraTrade</h1>
        <div className="bg-slate-900 px-3 py-1 rounded-lg text-xs font-mono">KES {currentUser.balance.toFixed(2)}</div>
      </header>
      
      <main className="p-4">
        {activeTab === 'home' && <div className="bg-slate-900 p-6 rounded-2xl">Balance: KES {currentUser.balance.toFixed(2)}</div>}
        {activeTab === 'trade' && (
           <div className="space-y-4">
             <input type="number" className="w-full bg-slate-900 p-3 rounded-xl" value={binaryWagerAmount} onChange={e => setBinaryWagerAmount(Number(e.target.value))} />
             <div className="grid grid-cols-2 gap-4">
               <button onClick={() => executeBinaryWager('CALL')} className="bg-emerald-600 p-4 rounded-xl font-bold">CALL</button>
               <button onClick={() => executeBinaryWager('PUT')} className="bg-rose-600 p-4 rounded-xl font-bold">PUT</button>
             </div>
             {tradeStatus && <p className="text-xs text-center">{tradeStatus.message}</p>}
           </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md bg-black border-t border-slate-800 grid grid-cols-5 p-4 text-[10px]">
        <button onClick={() => setActiveTab('home')}>HOME</button>
        <button onClick={() => setActiveTab('market')}>MARKETS</button>
        <button onClick={() => setActiveTab('trade')}>TRADE</button>
        <button onClick={() => setActiveTab('portfolio')}>PORTFOLIO</button>
        <button onClick={() => setActiveTab('more')}>SYSTEM</button>
      </nav>
    </div>
  );
}
