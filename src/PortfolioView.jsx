import React, { useState, useEffect } from 'react';

export default function PortfolioView() {
  const [activeTab, setActiveTab] = useState("OPTIONS_HISTORY");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistoryLogs = async () => {
      try {
        const response = await fetch("https://astra-trade-backend.vercel.app/api/v1/trades/binary/history/usr_test_alpha");
        if (response.ok) setHistory(await response.json());
      } catch (err) {
        console.log("Operational live array parsing connection offline.");
      }
    };
    fetchHistoryLogs();
  }, []);

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'WON':
        return (
          <div className="border border-bullish/30 bg-bullish/5 text-bullish rounded-xl py-2 px-3 flex items-center gap-1.5 text-[9px] font-black tracking-wider uppercase min-w-[115px] justify-center">
            🏆 <span>Contract Won</span>
          </div>
        );
      case 'LOST':
        return (
          <div className="border border-bearish/30 bg-bearish/5 text-bearish rounded-xl py-2 px-3 flex items-center gap-1.5 text-[9px] font-black tracking-wider uppercase min-w-[115px] justify-center">
            💥 <span>Settled Loss</span>
          </div>
        );
      case 'CAPPED':
      default:
        return (
          <div className="border border-capped/30 bg-capped/5 text-capped rounded-xl py-2 px-3 flex items-center gap-1.5 text-[9px] font-black tracking-wider uppercase min-w-[115px] justify-center">
            🏆 <span>Capped Win</span>
          </div>
        );
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Portfolio Ledger Header Node */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-base font-black tracking-tight text-white">My Portfolio</h2>
        <button className="border border-brand text-brand text-[9px] font-black px-2.5 py-1 rounded bg-brand/5 uppercase tracking-wider">
          REGISTERED ACCOUNT
        </button>
      </div>

      {/* Valuation Aggregate Metric Card */}
      <div className="bg-surface border border-gray-800/60 rounded-2xl p-4 space-y-1.5">
        <span className="text-[9px] font-black text-gray-500 tracking-wider uppercase">TOTAL PORTFOLIO NET VALUE</span>
        <h1 className="text-2xl font-black font-mono tracking-tight text-white">KES 2,037.00</h1>
        <div className="text-[11px] font-bold text-bullish flex items-center gap-1">
          ▲ +KES 15,420.40 (6.54%) <span className="text-gray-500 text-[10px] font-semibold pl-0.5">ALL TIME</span>
        </div>
      </div>

      {/* Horizontal Filter Tab Scroller */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-gray-900/60 text-[11px] font-bold text-gray-400 select-none">
        {["Holdings", "Allocation", "Live PNL", "Options History"].map((tab) => {
          const tabId = tab.toUpperCase().replace(" ", "_");
          const isActive = activeTab === tabId;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tabId)}
              className={`px-3 py-1.5 whitespace-nowrap rounded-lg transition-all ${
                isActive ? 'border border-brand bg-brand/5 text-white font-extrabold' : 'hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {activeTab !== "OPTIONS_HISTORY" ? (
        <div className="text-xs text-center text-gray-500 py-16 italic border border-dashed border-gray-900 rounded-2xl">Standard Holdings Grid Mapping Frame</div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex justify-between text-[9px] font-black text-gray-500 tracking-widest uppercase px-1">
            <span>HISTORICAL CONTRACTS</span>
            <span>SETTLED STATE</span>
          </div>

          {history.length === 0 ? (
            <>
              <div className="bg-surface border border-gray-900/50 rounded-2xl p-3.5 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-wide text-white">SCOM</span>
                    <span className="bg-bullish/10 text-bullish text-[8px] font-black font-mono px-1.5 py-0.5 rounded">▲ CALL</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400 font-mono">Stake: KSh 1,000  •  Payout: KSh 3,200</p>
                  <p className="text-[9px] font-medium text-gray-600 font-mono">31 May 2026, 09:08:00</p>
                </div>
                {renderStatusBadge('WON')}
              </div>

              <div className="bg-surface border border-gray-900/50 rounded-2xl p-3.5 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-wide text-white">EQTY</span>
                    <span className="bg-bearish/10 text-bearish text-[8px] font-black font-mono px-1.5 py-0.5 rounded">▼ PUT</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400 font-mono">Stake: KSh 500  •  Payout: KSh 0</p>
                  <p className="text-[9px] font-medium text-gray-600 font-mono">31 May 2026, 08:45:00</p>
                </div>
                {renderStatusBadge('LOST')}
              </div>

              <div className="bg-surface border border-gray-900/50 rounded-2xl p-3.5 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-wide text-white">SCOM</span>
                    <span className="bg-bullish/10 text-bullish text-[8px] font-black font-mono px-1.5 py-0.5 rounded">▲ CALL</span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400 font-mono">Stake: KSh 2,000  •  Payout: KSh 5,000</p>
                  <p className="text-[9px] font-medium text-gray-600 font-mono">31 May 2026, 08:12:00</p>
                </div>
                {renderStatusBadge('CAPPED')}
              </div>
            </>
          ) : (
            history.map((contract) => (
              <div key={contract.trade_id} className="bg-surface border border-gray-900/50 rounded-2xl p-3.5 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-wide text-white">{contract.symbol}</span>
                    <span className={`text-[8px] font-black font-mono px-1.5 py-0.5 rounded ${contract.direction === 'CALL' ? 'bg-bullish/10 text-bullish' : 'bg-bearish/10 text-bearish'}`}>
                      {contract.direction === 'CALL' ? '▲ CALL' : '▼ PUT'}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400 font-mono">
                    Stake: KSh {contract.stake.toLocaleString()}  •  Payout: KSh {contract.payout.toLocaleString()}
                  </p>
                  <p className="text-[9px] font-medium text-gray-600 font-mono">{contract.timestamp}</p>
                </div>
                {renderStatusBadge(contract.status)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
      }
