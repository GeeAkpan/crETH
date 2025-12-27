
import React, { useState, useEffect } from 'react';
import AnimatedNumber from '../components/AnimatedNumber';

interface LandingProps {
  onLogin: () => void;
  isConnecting?: boolean;
}

const L2_PARTNERS = [
  { name: 'Base', logo: 'https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.png' },
  { name: 'Arbitrum', logo: 'https://raw.githubusercontent.com/OffchainLabs/brand-assets/master/Arbitrum/Symbol/Arbitrum_Symbol_FullColor.png' },
  { name: 'Optimism', logo: 'https://raw.githubusercontent.com/ethereum-optimism/brand-kit/main/assets/png/Optimism_Logo_Mark.png' },
  { name: 'Starknet', logo: 'https://raw.githubusercontent.com/starknet-io/starknet-brand/main/starknet_symbol/starknet_symbol_color.png' },
  { name: 'Avalanche', logo: 'https://raw.githubusercontent.com/ava-labs/avalanche-brand-kit/master/Logos/Avalanche%20Logos/Avalanche%20Logo%20Mark/Avalanche_Logo_Mark_Red.png' },
  { name: 'Lisk', logo: 'https://raw.githubusercontent.com/LiskHQ/lisk-brand/master/logos/lisk-logo-mark-blue.png' },
  { name: 'Rise', logo: 'https://rise.xyz/favicon.ico' },
];

const Landing: React.FC<LandingProps> = ({ onLogin, isConnecting }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-indigo-500/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-float" style={{ animationDuration: '25s', animationDelay: '-5s' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>

      <nav className="relative z-50 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto animate-blurReveal">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 group-hover:rotate-12 transition-all">
            <i className="fa-brands fa-ethereum text-white text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter leading-none font-heading">crETH</span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400">Talent Protocol</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#ecosystem" className="hover:text-indigo-400 transition-colors">Ecosystem</a>
            <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">The Protocol</a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">Network State</a>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <button onClick={() => setAuthMode('signin')} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
            Sign In
          </button>
          <button onClick={() => setAuthMode('signup')} className="bg-white text-slate-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-indigo-500/20 shadow-xl active:scale-95">
            Terminal Access
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center stagger-container">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-10 animate-bounce-low">
            <i className="fa-solid fa-bolt-lightning"></i>
            Decentralized Professional Infrastructure
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.85] font-heading">
            <span className="inline-block animate-blurReveal" style={{ animationDelay: '0.1s' }}>WHERE CODE</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 inline-block animate-blurReveal" style={{ animationDelay: '0.3s' }}>MEETS CAPITAL.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium animate-blurReveal" style={{ animationDelay: '0.5s' }}>
            crETH is the first unified talent network for the Ethereum scaling roadmap. 
            Direct, trustless, and fully verifiable professional settlement on every major L2.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg mx-auto justify-center mb-32 animate-blurReveal" style={{ animationDelay: '0.7s' }}>
            <button onClick={() => setAuthMode('signup')} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3">
              Start Earning
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button onClick={() => setAuthMode('signin')} className="flex-1 bg-slate-900/50 hover:bg-slate-800 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all border border-slate-800 active:scale-95">
              Find Talent
            </button>
          </div>

          <div id="ecosystem" className="py-12 border-y border-slate-900/50 overflow-hidden relative animate-blurReveal" style={{ animationDelay: '0.9s' }}>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-10">The Multi-Chain Network State</p>
            
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...L2_PARTNERS, ...L2_PARTNERS].map((l2, idx) => (
                <div key={`${l2.name}-${idx}`} className="flex items-center gap-4 mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer hover:scale-110">
                  <img src={l2.logo} alt={l2.name} className="w-10 h-10 object-contain rounded-xl" />
                  <span className="text-2xl font-black tracking-tighter uppercase text-slate-300">{l2.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-left animate-blurReveal">
              <h2 className="text-5xl font-black font-heading leading-tight tracking-tighter">
                REPLACING TRUST <br/>
                <span className="text-indigo-500 text-6xl">WITH CODE.</span>
              </h2>
              <div className="space-y-6 text-slate-400 font-medium leading-relaxed stagger-container">
                <p>Global gig marketplaces are broken by high fees and opaque terms. crETH solves this by moving the entire lifecycle on-chain.</p>
                <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-900/40 border border-slate-800 transition-all hover:border-indigo-500/40 hover:bg-slate-900/60 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-all">
                    <i className="fa-solid fa-shield-halved text-indigo-500"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-xs mb-1">Atomic Settlement</h4>
                    <p className="text-sm">Funds are pushed directly from the escrow pool to your wallet the moment work is approved.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-900/40 border border-slate-800 transition-all hover:border-emerald-500/40 hover:bg-slate-900/60 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-all">
                    <i className="fa-solid fa-fingerprint text-emerald-500"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-xs mb-1">On-Chain Résumé</h4>
                    <p className="text-sm">Every completed gig mints a Soulbound NFT. Your reputation is a permanent, verifiable asset.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-container" id="stats">
              <div className="p-10 rounded-[48px] glass border-slate-800 text-left">
                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">Total Liquidity</div>
                <div className="text-5xl font-black font-heading tracking-tight mb-2">
                  <AnimatedNumber value={1.2} decimals={1} prefix="$" suffix="M+" duration={2500} />
                </div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Across All L2s</p>
              </div>
              <div className="p-10 rounded-[48px] glass border-slate-800 text-left sm:mt-8">
                <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Builders</div>
                <div className="text-5xl font-black font-heading tracking-tight mb-2">
                  <AnimatedNumber value={18400} duration={2000} />
                </div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Verified Accounts</p>
              </div>
              <div className="p-10 rounded-[48px] glass border-slate-800 text-left">
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Integrations</div>
                <div className="text-5xl font-black font-heading tracking-tight mb-2">
                  <AnimatedNumber value={42} duration={1500} />
                </div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">DAOs & Protocols</p>
              </div>
              <div className="p-10 rounded-[48px] glass border-slate-800 text-left sm:mt-8">
                <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4">Escrow Avg</div>
                <div className="text-5xl font-black font-heading tracking-tight mb-2">
                  <AnimatedNumber value={0.04} decimals={2} suffix="s" duration={1000} />
                </div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Settlement Time</p>
              </div>
            </div>
          </div>
        </section>

        {(authMode === 'signin' || authMode === 'signup') && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl animate-fadeIn" onClick={() => !isConnecting && setAuthMode(null)}></div>
            <div className="relative glass w-full max-w-md p-10 rounded-[56px] border border-white/10 shadow-[0_0_120px_rgba(79,70,229,0.3)] animate-blurReveal text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 animate-pulse"></div>
              
              {!isConnecting && (
                <button onClick={() => setAuthMode(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              )}

              <div className="mb-12">
                <div className={`w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-600/30 ${isConnecting ? 'animate-pulse' : 'animate-float'}`}>
                  <i className={`fa-brands fa-ethereum text-white text-5xl ${isConnecting ? 'animate-bounce' : ''}`}></i>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
                  {isConnecting ? 'Authenticating...' : (authMode === 'signin' ? 'Welcome Back' : 'Create Identity')}
                </h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  {isConnecting ? 'Verify Signature in your Wallet' : 'Authentication Layer v4.2.0'}
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={onLogin}
                  disabled={isConnecting}
                  className={`w-full flex items-center justify-between bg-white text-slate-950 p-6 rounded-3xl font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-100 group shadow-xl ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <i className={`fa-solid ${isConnecting ? 'fa-spinner animate-spin' : 'fa-wallet'} text-xl`}></i>
                    {isConnecting ? 'Requesting Signature...' : 'Connect Wallet'}
                  </div>
                  {!isConnecting && <i className="fa-solid fa-arrow-right -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"></i>}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-slate-900/50 py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-8 animate-blurReveal">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
                <i className="fa-brands fa-ethereum text-white text-xl"></i>
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase font-heading">crETH</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium">
              The professional layer of the Ethereum scaling roadmap. 
              Built for builders, by builders.
            </p>
            <div className="flex gap-6 text-slate-500 text-xl">
               <i className="fa-brands fa-x-twitter hover:text-white cursor-pointer transition-all hover:scale-125"></i>
               <i className="fa-brands fa-discord hover:text-white cursor-pointer transition-all hover:scale-125"></i>
               <i className="fa-brands fa-github hover:text-white cursor-pointer transition-all hover:scale-125"></i>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
