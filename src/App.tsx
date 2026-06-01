import React, { useState, useEffect, FormEvent } from 'react';
import { 
  TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, 
  RefreshCw, MoreHorizontal, Home, BarChart2, Activity, Briefcase, 
  Menu, Bell, Smartphone, CheckCircle2, ChevronRight, Search, Landmark, UserCheck
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface AccountState {
  portfolioValue: number;
  allTimeProfit: number;
  allTimeProfitPercent: number;
  simulatedBuyingPower: number;
}

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
  status: 'WON' | 'EXPIRED';
  date: string;
}

interface FinanceModal {
  isOpen: boolean;
  type: 'deposit' | 'withdraw' | null;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.astratrade.co/api';

export default function AstraTradeTerminal() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'market' | 'trade' | 'portfolio' | 'discover'>('home');
  const [portfolioSection, setPortfolioSection] = useState<'holdings' | 'history'>('holdings');
  
  // Trading & Asset State
  const [tradeMode, setTradeMode] = useState<'spot' | 'binary'>('binary');
  const [wagerAmount, setWagerAmount] = useState<number>(1000);
  const [selectedAsset, setSelectedAsset] = useState<string>('SCOM');

  // M-Pesa Modal & Transaction State
  const [financeModal, setFinanceModal] = useState<FinanceModal>({ isOpen: false, type: null });
  const [phoneNumber, setPhoneNumber] = useState<string>('2547');
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  // Hydrated Account Data
  const [account, setAccount] = useState<AccountState>({
    portfolioValue: 93943.56,
    allTimeProfit: 15420.40,
    allTimeProfitPercent: 6.54,
    simulatedBuyingPower: 2500.00
  });

  useEffect(() => {
    async function fetchAccountData() {
      try {
        const response = await fetch(`${API_BASE_URL}/account/summary`);
        if (response.ok) {
          const data: AccountState = await response.json();
          setAccount(data);
        }
      } catch (err) {
        console.warn("API Node Unreachable. Utilizing local state.");
      }
    }
    fetchAccountData();
  }, []);

  const handleMPesaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransactionStatus('processing');
    
    // Simulate STK Push Logic
    setTimeout(() => {
      setTransactionStatus('success');
      if (financeModal.type === 'deposit') {
        setAccount(prev => ({
          ...prev,
          simulatedBuyingPower: prev.simulatedBuyingPower + parseFloat(transactionAmount)
        }));
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 font-sans antialiased pb-28">
      <header className="sticky top-0 z-40 bg-[#060814]/90 backdrop-blur-md border-b border-slate-900 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl"><Activity className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-md font-bold text-white">Astra Trade</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-wider">Nairobi Securities</p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">DT</div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4">
        {activeTab === 'home' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-b from-[#0b0f26] to-[#070a1e] border border-slate-900 rounded-3xl p-5 shadow-2xl">
              <p className="text-[11px] text-slate-400 uppercase">Portfolio Value</p>
              <h2 className="text-3xl font-extrabold text-white mt-1 font-mono">
                KSh {account.portfolioValue.toLocaleString()}
              </h2>
              <div className="flex items-center space-x-1.5 mt-1 text-emerald-400 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+KSh {account.allTimeProfit.toLocaleString()} ({account.allTimeProfitPercent}%)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-6">
                <button onClick={() => setFinanceModal({ isOpen: true, type: 'deposit' })} className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase">
                  <ArrowDownLeft className="w-4 h-4" /> <span>Deposit</span>
                </button>
                <button onClick={() => setFinanceModal({ isOpen: true, type: 'withdraw' })} className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold uppercase">
                  <ArrowUpRight className="w-4 h-4" /> <span>Withdraw</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Views for Market, Trade, Portfolio, and Discover would follow here... */}
      </main>

      {/* M-PESA MODAL */}
      {financeModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-[#0b0f26] border-t border-slate-800 rounded-t-3xl w-full max-w-md p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center">
                <Smartphone className="w-4 h-4 mr-2 text-emerald-400" /> M-Pesa {financeModal.type}
              </h3>
              <button onClick={() => { setFinanceModal({ isOpen: false, type: null }); setTransactionStatus('idle'); }} className="text-slate-500 text-xs uppercase font-bold">Close</button>
            </div>

            {transactionStatus === 'success' ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">STK Push Sent</p>
                <p className="text-[10px] text-slate-400">Check your phone to complete the transaction.</p>
              </div>
            ) : (
              <form onSubmit={handleMPesaSubmit} className="space-y-4">
                <input 
                  type="tel" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white" 
                  placeholder="2547..."
                />
                <input 
                  type="number" 
                  value={transactionAmount} 
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white" 
                  placeholder="Amount in KSh"
                />
                <button type="submit" className="w-full bg-emerald-500 py-3.5 rounded-xl text-slate-950 font-black text-xs uppercase">
                  {transactionStatus === 'processing' ? 'Processing...' : 'Confirm Transaction'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#060814]/95 border-t border-slate-900 max-w-md mx-auto grid grid-cols-5 py-3">
        {(['home', 'market', 'trade', 'portfolio', 'discover'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center transition ${activeTab === tab ? 'text-indigo-400' : 'text-slate-500'}`}>
            <span className="text-[9px] font-bold uppercase mt-1">{tab}</span>
          </button>
        ))}
      </nav>
    </div>
  );
          }
