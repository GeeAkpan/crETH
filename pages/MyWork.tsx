
import React, { useState } from 'react';
import { ListingStatus, ListingType } from '../types';

interface MySubmission {
  id: string;
  title: string;
  sponsor: string;
  submittedAt: string;
  status: 'PENDING' | 'REVIEW' | 'WON' | 'PAID' | 'REJECTED';
  reward: string;
  network: string;
  type: ListingType;
  details?: string;
}

const MyWork: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'WON'>('ALL');
  const [selectedSub, setSelectedSub] = useState<MySubmission | null>(null);

  const submissions: MySubmission[] = [
    {
      id: 'sub-1',
      title: 'Ethereum Protocol Research',
      sponsor: 'Ethereum Foundation',
      submittedAt: '2024-05-10',
      status: 'REVIEW',
      reward: '3,000 USDC',
      network: 'Ethereum',
      type: ListingType.PROJECT,
      details: "Detailed analysis of blob throughput and potential fee market shifts post-4844."
    },
    {
      id: 'sub-2',
      title: 'DeFi Dashboard Redesign',
      sponsor: 'LendProtocol',
      submittedAt: '2024-04-28',
      status: 'WON',
      reward: '1,500 USDC',
      network: 'Ethereum',
      type: ListingType.BOUNTY,
      details: "Full Figma kit for the new V3 dashboard, focused on mobile-first accessibility."
    },
    {
      id: 'sub-3',
      title: 'Gas Optimization Research',
      sponsor: 'Individual Grant',
      submittedAt: '2024-03-15',
      status: 'PAID',
      reward: '0.5 ETH',
      network: 'Ethereum',
      type: ListingType.GRANT,
      details: "Comprehensive report on state-expiry strategies for L2 sequencers."
    },
    {
      id: 'sub-4',
      title: 'Security Audit: Staking Contract',
      sponsor: 'StakeSafe',
      submittedAt: '2024-05-12',
      status: 'PENDING',
      reward: '5,000 USDC',
      network: 'Ethereum',
      type: ListingType.BOUNTY,
      details: "Preliminary vulnerability assessment focused on reentrancy in the reward withdrawal logic."
    }
  ];

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'ACTIVE') return s.status === 'PENDING' || s.status === 'REVIEW';
    if (filter === 'WON') return s.status === 'WON' || s.status === 'PAID';
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'WON': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'REVIEW': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'REJECTED': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">My Work Station</h1>
          <p className="text-slate-400 text-sm md:text-base font-medium">Track your contributions across the Ethereum ecosystem.</p>
        </div>
        <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
          {(['ALL', 'ACTIVE', 'WON'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((sub) => (
            <div 
              key={sub.id} 
              onClick={() => setSelectedSub(sub)}
              className="glass p-6 rounded-[28px] border border-slate-800/50 hover:border-blue-500/30 hover:bg-slate-900/40 transition-all group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 border border-slate-700">
                    <i className={`fa-solid ${sub.type === ListingType.BOUNTY ? 'fa-trophy text-amber-500' : 'fa-briefcase text-blue-500'}`}></i>
                  </div>
                  <div>
                    <h3 className="font-black text-lg group-hover:text-blue-400 transition-colors uppercase tracking-tight">{sub.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <i className="fa-solid fa-building text-slate-600"></i>
                        {sub.sponsor}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <i className="fa-solid fa-calendar-day text-slate-600"></i>
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                        <i className="fa-brands fa-ethereum"></i>
                        {sub.network}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Escrow Value</div>
                    <div className="text-xl font-black text-white leading-none">{sub.reward}</div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest text-center min-w-[100px] ${getStatusStyle(sub.status)}`}>
                    {sub.status}
                  </div>
                  <i className="fa-solid fa-chevron-right text-slate-700 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
              
              {sub.status === 'WON' && (
                <div className="mt-5 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-check text-emerald-500"></i>
                    <p className="text-[11px] font-bold text-emerald-200">Payment released from escrow! Transaction pending on-chain.</p>
                  </div>
                  <button className="text-[10px] font-black text-emerald-400 hover:underline uppercase tracking-widest">View Tx</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-24 text-center glass rounded-[40px] border border-slate-800 border-dashed">
            <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-6 text-slate-700">
              <i className="fa-solid fa-box-open text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-500 uppercase tracking-tight">No matching work history</h3>
            <button onClick={() => setFilter('ALL')} className="mt-6 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Clear Filters</button>
          </div>
        )}
      </div>

      {/* Detail View Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setSelectedSub(null)}
          ></div>
          <div className="glass w-full max-w-2xl p-10 rounded-[40px] border border-slate-800 relative z-110 animate-slideUp">
            <button onClick={() => setSelectedSub(null)} className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-2xl text-blue-500">
                <i className={`fa-solid ${selectedSub.type === ListingType.BOUNTY ? 'fa-trophy' : 'fa-briefcase'}`}></i>
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">{selectedSub.title}</h2>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Sponsor: {selectedSub.sponsor}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                 <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Status</div>
                 <div className={`text-sm font-bold ${selectedSub.status === 'WON' || selectedSub.status === 'PAID' ? 'text-emerald-500' : 'text-blue-400'}`}>{selectedSub.status}</div>
               </div>
               <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                 <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Locked Amount</div>
                 <div className="text-sm font-bold text-white">{selectedSub.reward}</div>
               </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Submission Summary</h4>
                <div className="bg-slate-900/50 p-6 rounded-[24px] border border-slate-800 text-sm text-slate-300 leading-relaxed font-medium">
                  {selectedSub.details}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">On-Chain Assets</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-file-pdf text-red-400"></i>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deliverable.pdf</span>
                    </div>
                    <button className="text-[10px] font-black text-blue-500 hover:underline uppercase tracking-widest">View on IPFS</button>
                  </div>
                  {selectedSub.status === 'PAID' && (
                    <div className="w-14 h-14 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-500 cursor-help" title="Soulbound Token Earned">
                      <i className="fa-solid fa-fingerprint text-xl"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
               <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold transition-all text-xs uppercase tracking-widest">
                 Update Deliverables
               </button>
               <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20">
                 Contact Sponsor
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="p-10 rounded-[40px] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/10 group hover:border-blue-600/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-shield-halved text-xl"></i>
          </div>
          <h4 className="text-xl font-black uppercase tracking-tight mb-3">Claiming Rewards</h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
            When a sponsor selects your work, the reward is released from the smart contract escrow directly to your connected wallet. No middlemen.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest">
            <i className="fa-solid fa-bolt"></i>
            Real-time Settlement
          </div>
        </div>
        <div className="p-10 rounded-[40px] bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-600/10 group hover:border-purple-600/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-fingerprint text-xl"></i>
          </div>
          <h4 className="text-xl font-black uppercase tracking-tight mb-3">Proof of Work NFT</h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
            For every successfully completed task, you automatically mint a non-transferable Soulbound NFT verifying your contribution on-chain.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-widest">
            <i className="fa-solid fa-star"></i>
            Permanent Reputation
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWork;
