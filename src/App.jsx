import React, { useState } from 'react';
import TradeView from './TradeView';
import PortfolioView from './PortfolioView';
import MoreView from './MoreView';

export default function App() {
  const [currentTab, setCurrentTab] = useState("TRADE"); 

  const NAV_ITEMS = [
    { id: "HOME", label: "HOME", icon: "🏠" },
    { id: "MARKET", label: "MARKET", icon: "📊" },
    { id: "TRADE", label: "TRADE", icon: "▶" },
    { id: "PORTFOLIO", label: "PORTFOLIO", icon: "💼" },
    { id: "MORE", label: "MORE", icon: "👤" }
  ];

  return (
    <div className="min-h-screen bg-canvas text-white relative font-sans overflow-x-hidden selection:bg-brand/30">
      {/* Content Mount Node */}
      <main className="pb-24 max-w-md mx-auto min-h-screen border-x border-gray-900/40 bg-canvas">
        {currentTab === "HOME" && (
          <div className="p-8 text-center text-gray-500 italic pt-20 text-xs">Home Module Dashboard Hook</div>
        )}
        {currentTab === "MARKET" && (
          <div className="p-8 text-center text-gray-500 italic pt-20 text-xs">Market Price Matrix Hook</div>
        )}
        {currentTab === "TRADE" && <TradeView />}
        {currentTab === "PORTFOLIO" && <PortfolioView />}
        {currentTab === "MORE" && <MoreView />}
      </main>

      {/* Global Native Footer Dock Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-nested/95 backdrop-blur-md border-t border-gray-900/80 py-2 flex justify-around items-center z-50 max-w-md mx-auto">
        {NAV_ITEMS.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className="flex flex-col items-center justify-center w-14 py-1 relative"
            >
              <span className={`text-xl transition-all duration-200 ${isActive ? 'scale-110' : 'opacity-40 grayscale'}`}>
                {tab.icon}
              </span>
              <span className={`text-[8px] font-black tracking-widest mt-1 transition-colors ${
                isActive ? 'text-brand' : 'text-gray-600'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
      }
