
import React, { useState, useEffect } from 'react';
import { ListingType, BlockchainNetwork, ListingCategory, ListingStatus } from '../types';

interface SubmissionMock {
  id: string;
  author: string;
  avatar: string;
  title: string;
  submittedAt: string;
  content: string;
  reputation: number;
}

const SponsorPortal: React.FC = () => {
  const [view, setView] = useState<'create' | 'manage'>('manage');
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory>(ListingCategory.DEVELOPMENT);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isDepositing, setIsDepositing] = useState(false);
  const [txStatus, setTxStatus] = useState<'IDLE' | 'SIGNING' | 'CONFIRMING' | 'SUCCESS'>('IDLE');
  const [txHash, setTxHash] = useState<string | null>(null);
  
  // Management & Winner Selection State
  const [managingListingId, setManagingListingId] = useState<string | null>(null);
  const [reviewingSubmission, setReviewingSubmission] = useState<SubmissionMock | null>(null);
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseStatus, setReleaseStatus] = useState<'IDLE' | 'SIGNING' | 'RELEASING' | 'PAID'>('IDLE');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    reward: '1000',
    description: ''
  });

  const mockSubmissions: SubmissionMock[] = [
    { 
      id: 'sub-1', 
      author: 'EthBuilder_42', 
      avatar: 'EB', 
      title: 'Blob Market Analysis Tool', 
      submittedAt: '2h ago', 
      reputation: 850,
      content: 'I have developed a specialized CLI tool that tracks blob gas usage in real-time. It provides visualizations of the EIP-4844 fee market dynamics and includes a forecasting model for next-block blob prices.'
    },
    { 
      id: 'sub-2', 
      author: 'SoliditySage', 
      avatar: 'SS', 
      title: 'Fee Market Research Paper', 
      submittedAt: '5h ago', 
      reputation: 1200,
      content: 'My submission is a comprehensive 20-page technical paper analyzing the first 30 days of blob throughput post-Dencun. It covers historical data, cross-L2 comparison, and protocol-level impact on Ethereum storage costs.'
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLaunch = () => {
    setIsDepositing(true);
    setTxStatus('SIGNING');

    setTimeout(() => {
      setTxStatus('CONFIRMING');
      setTimeout(() => {
        setTxStatus('SUCCESS');
        setTxHash(`0x${Math.random().toString(16).substring(2, 66)}`);
      }, 3000);
    }, 2000);
  };

  const handleReleaseFunds = (sub: SubmissionMock) => {
    setReviewingSubmission(null);
    setIsReleasing(true);
    setReleaseStatus('SIGNING');

    // Simulate the "Transfer Immediately" behavior from the staking pool
    setTimeout(() => {
      setReleaseStatus('RELEASING');
      setTimeout(() => {
        setReleaseStatus('PAID');
        // Logic to update local state or database would happen here
      }, 3500);
    }, 1500);
  };

  const Tooltip = ({ id, text }: { id: string; text: string }) => (
    <div className="relative inline-block ml-2 group">
      <button 
        type="button"
        onClick={() => setActiveTooltip(activeTooltip === id ? null : id)}
        className="w-4 h-4 rounded-full bg-slate-800 text-slate-500 hover:text-blue-400 border border-slate-700 flex items-center justify-center text-[10px] transition-colors"
      >
        <i className="fa-solid fa-question"></i>
      </button>
      {activeTooltip === id && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-blue-600 text-white text-[10px] font-bold rounded-xl shadow-2xl z-50">
          <div className="relative">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-fadeIn">
      {/* Main Container */}
      <div className="flex-1 max-w-3xl">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Sponsor Portal</h1>
            <p className="text-slate-400 font-medium">Manage your active campaigns and release rewards from the staking pool.</p>
          </div>
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button 
              onClick={() => { setView('manage'); setManagingListingId(null); setReviewingSubmission(null); }}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'manage' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              My Gigs
            </button>
            <button 
              onClick={() => setView('create')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'create' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Launch New
            </button>
          </div>
        </header>

        {view === 'create' ? (
          <>
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-slate-800'}`}></div>
              <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-slate-800'}`}></div>
              <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-slate-800'}`}></div>
            </div>

            <section className="glass p-8 rounded-[32px] border border-slate-800 shadow-2xl relative overflow-hidden min-h-[550px] flex flex-col">
              <div className="absolute top-0 right-0 px-6 py-2 bg-slate-800/50 rounded-bl-2xl border-b border-l border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {txStatus === 'SUCCESS' ? 'Live on Mainnet' : `Step ${step} of 3`}
              </div>

              {txStatus === 'SUCCESS' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn space-y-6">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl shadow-emerald-500/30">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Gig Deployed</h2>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      Funds successfully staked. Your campaign is now visible to the crETH community.
                    </p>
                  </div>
                  <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Transaction Hash</div>
                    <div className="text-[10px] font-mono text-emerald-400 break-all">{txHash}</div>
                  </div>
                  <button onClick={() => setView('manage')} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-black transition-all text-xs uppercase tracking-widest">Manage Active Gigs</button>
                </div>
              ) : isDepositing ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                      <i className={`fa-solid ${txStatus === 'SIGNING' ? 'fa-signature' : 'fa-vault'} text-2xl`}></i>
                    </div>
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{txStatus === 'SIGNING' ? 'Authorize Stake' : 'Funding Staking Pool'}</h2>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">Locking your USDC reward into the non-custodial staking pool on Ethereum Mainnet.</p>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div className="space-y-8 animate-fadeIn">
                      <h2 className="text-xl font-bold mb-2">1. Choose Project Type</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.values(ListingCategory).map(cat => (
                          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`p-4 rounded-xl border transition-all text-center relative ${selectedCategory === cat ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}>
                            <div className="text-xs font-black uppercase tracking-widest">{cat}</div>
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[ListingType.BOUNTY, ListingType.PROJECT, ListingType.GRANT].map(type => (
                          <button key={type} onClick={() => setStep(2)} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500 hover:bg-slate-800/50 transition-all text-left group">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                              <i className={`fa-solid ${type === 'BOUNTY' ? 'fa-trophy' : 'fa-briefcase'} text-lg`}></i>
                            </div>
                            <div className="font-black uppercase tracking-tight text-sm">{type}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h2 className="text-xl font-bold">2. Reward Details</h2>
                      <div className="space-y-5">
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium" placeholder="Project Title" />
                        <div className="relative">
                          <input type="number" name="reward" value={formData.reward} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-black" />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-slate-800 pl-3">USDC</div>
                        </div>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none h-40 text-sm resize-none leading-relaxed" placeholder="Detailed requirements..."></textarea>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-800 rounded-xl font-bold uppercase tracking-widest text-xs">Back</button>
                        <button onClick={() => setStep(3)} className="flex-1 py-4 bg-blue-600 rounded-xl font-black uppercase tracking-widest text-xs">Confirm Stakes</button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-fadeIn text-center flex-1 flex flex-col justify-center max-w-lg mx-auto">
                      <div className="w-24 h-24 rounded-[32px] bg-blue-600/10 text-blue-500 flex items-center justify-center mx-auto mb-8 text-4xl border border-blue-500/20 shadow-xl">
                        <i className="fa-solid fa-vault"></i>
                      </div>
                      <h2 className="text-2xl font-black uppercase tracking-tight">Lock Funds in Pool</h2>
                      <p className="text-slate-400 text-sm font-medium">Your funds will be held in a trustless staking pool on Ethereum. You retain the power to select winners and trigger the payout.</p>
                      
                      <div className="bg-slate-900/80 p-6 rounded-[28px] border border-slate-800 text-left my-6">
                        <div className="flex justify-between items-end mb-4 border-b border-slate-800 pb-4">
                           <div>
                              <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Stake</div>
                              <div className="text-blue-400 font-black text-2xl">{(parseFloat(formData.reward) * 1.01).toFixed(2)} USDC</div>
                           </div>
                           <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest pb-1">Incl. 1% Pool Fee</div>
                        </div>
                        <button onClick={handleLaunch} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3">
                          <i className="fa-brands fa-ethereum text-xl"></i> Launch & Fund Pool
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        ) : (
          <section className="space-y-6 animate-fadeIn">
            {managingListingId ? (
              <div className="glass p-8 rounded-[32px] border border-slate-800 shadow-2xl animate-slideUp relative">
                <button onClick={() => { setManagingListingId(null); setReviewingSubmission(null); }} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                  <i className="fa-solid fa-arrow-left"></i> All Active Gigs
                </button>
                
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Ethereum Protocol Research</h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">Launched 2 days ago • Reward: 3,000 USDC</p>
                  </div>
                  <div className="px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-solid fa-vault"></i> 3,000 USDC Staked
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-between">
                    <span>Submissions ({mockSubmissions.length})</span>
                    <span className="text-blue-500">Reviewing Phase</span>
                  </h3>
                  
                  <div className="grid gap-3">
                    {mockSubmissions.map(sub => (
                      <div key={sub.id} className={`p-5 bg-slate-900/50 border rounded-2xl flex items-center justify-between transition-all ${reviewingSubmission?.id === sub.id ? 'border-blue-500 bg-blue-600/5' : 'border-slate-800'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-blue-500 border border-slate-700">{sub.avatar}</div>
                          <div>
                            <p className="text-sm font-black text-white">{sub.author}</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Rep: {sub.reputation} • {sub.submittedAt}</p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setReviewingSubmission(sub)}
                          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${reviewingSubmission?.id === sub.id ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                        >
                          Review Submission
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submission Detail Review Card */}
                {reviewingSubmission && (
                  <div className="mt-8 p-6 bg-slate-900 border border-blue-500/30 rounded-[28px] animate-fadeIn">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500"><i className="fa-solid fa-file-contract"></i></div>
                        <h4 className="text-sm font-black uppercase tracking-tight">Reviewing: {reviewingSubmission.title}</h4>
                      </div>
                      <button onClick={() => setReviewingSubmission(null)} className="text-slate-500 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-8">
                       <p className="text-xs text-slate-400 leading-relaxed font-medium italic">"{reviewingSubmission.content}"</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                       <button 
                        onClick={() => handleReleaseFunds(reviewingSubmission)}
                        className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                       >
                         <i className="fa-solid fa-trophy"></i>
                         Select as Winner & Reward
                       </button>
                       <button 
                        onClick={() => window.location.hash = 'messages'}
                        className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-black uppercase tracking-widest text-[10px]"
                       >
                         Message Applicant
                       </button>
                    </div>
                  </div>
                )}

                {/* On-Chain Releasing Flow */}
                {isReleasing && (
                  <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
                    <div className="glass w-full max-w-md p-10 rounded-[40px] border border-slate-800 relative z-130 text-center space-y-8 animate-scaleIn">
                      {releaseStatus === 'PAID' ? (
                        <>
                          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto shadow-2xl shadow-emerald-500/30">
                            <i className="fa-solid fa-check"></i>
                          </div>
                          <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Transfer Successful</h3>
                            <p className="text-slate-400 text-sm font-medium">Reward distributed immediately from the pool. Proof-of-Work NFT minted for the crETHor.</p>
                          </div>
                          <button onClick={() => {setIsReleasing(false); setManagingListingId(null);}} className="w-full py-4 bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-700">Finish and Close</button>
                        </>
                      ) : (
                        <>
                          <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                              <i className="fa-solid fa-bolt text-2xl"></i>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Releasing Rewards</h3>
                            <p className="text-slate-400 text-sm font-medium">
                              {releaseStatus === 'SIGNING' ? 'Waiting for your wallet authorization...' : 'Transferring funds from Staking Pool to Winner...'}
                            </p>
                          </div>
                          <div className="p-4 bg-blue-600/10 border border-blue-500/10 rounded-xl flex items-center gap-3 text-left">
                             <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white font-black">POOL</div>
                             <div className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Trustless Escrow Payout</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="glass p-6 rounded-[28px] border border-slate-800 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => setManagingListingId(String(i))}>
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 transition-transform group-hover:scale-110"><i className="fa-solid fa-layer-group"></i></div>
                      <div>
                        <h3 className="font-black text-lg group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                          {i === 1 ? 'Ethereum Protocol Research' : 'DeFi Dashboard Design'}
                        </h3>
                        <div className="flex gap-4 mt-1">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{i === 1 ? '2' : '0'} Submissions</span>
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Pool: {i === 1 ? '3,000' : '1,500'} USDC</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">Manage</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Sidebar Terminal Info */}
      <div className="w-full lg:w-72 space-y-6">
        <div className="glass p-6 rounded-[32px] border border-slate-800">
           <h3 className="text-sm font-black uppercase tracking-tight mb-4 flex items-center gap-2">
             <i className="fa-solid fa-shield-halved text-blue-500"></i>
             Staking Node
           </h3>
           <div className="space-y-5">
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-lock text-[10px] text-slate-400"></i>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-tight">Funds are non-custodial and locked via audited smart contracts until you select a winner.</p>
              </div>
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-bolt text-[10px] text-slate-400"></i>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-tight">Selecting a winner triggers a direct atomic swap from the pool to the talent.</p>
              </div>
           </div>
        </div>

        <div className="p-6 rounded-[32px] border border-slate-800 bg-slate-900/30">
           <h3 className="text-xs font-black uppercase tracking-tight mb-3">Live Network</h3>
           <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Escrow Gas</span>
                <span className="text-[10px] font-bold text-emerald-400">0.002 ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Pool Health</span>
                <span className="text-[10px] font-bold text-white">Optimal</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorPortal;
