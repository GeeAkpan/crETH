
import React, { useState } from 'react';

interface LandingProps {
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-blue-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <i className="fa-brands fa-ethereum text-white text-2xl"></i>
          </div>
          <span className="font-bold text-2xl tracking-tighter">crETH</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setAuthMode('signin')}
            className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => setAuthMode('signup')}
            className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-2.5 rounded-full text-sm font-bold transition-all backdrop-blur-md"
          >
            Create Account
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-16 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8 animate-fadeIn">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
          LIVE ON ETHEREUM MAINNET
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9] max-w-5xl">
          The Hub for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ethereum Creators</span> & Builders.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          The premier decentralized gig marketplace for Ethereum. Connect with top projects and earn rewards in ETH and native tokens.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={() => setAuthMode('signup')}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            Sign Up
          </button>
          
          <button 
            onClick={() => setAuthMode('signin')}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all border border-slate-700 active:scale-95"
          >
            Sign In
          </button>
        </div>

        <div className="mt-20 flex items-center justify-center gap-8 opacity-40 grayscale pointer-events-none">
          <div className="flex items-center gap-2 font-black text-2xl uppercase tracking-tighter">
            <i className="fa-brands fa-ethereum text-blue-400"></i>
            ETHEREUM
          </div>
        </div>

        <div className="mt-16 flex items-center gap-4 text-slate-500 text-sm font-medium">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center">
                <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="Avatar" className="w-full h-full rounded-full opacity-80" />
              </div>
            ))}
          </div>
          Join 10,000+ builders on Ethereum
        </div>

        {/* Auth Modal / Overlay */}
        {(authMode === 'signin' || authMode === 'signup') && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setAuthMode(null)}
            ></div>
            <div className="relative glass w-full max-w-md p-8 rounded-[32px] border border-white/10 shadow-2xl animate-scaleIn">
              <button 
                onClick={() => setAuthMode(null)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
                  <i className="fa-brands fa-ethereum text-white text-3xl"></i>
                </div>
                <h2 className="text-2xl font-black mb-2">
                  {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                </h2>
                <p className="text-slate-400 text-sm">
                  {authMode === 'signin' ? 'Welcome back to the Ethereum network' : 'Start your journey on Ethereum'}
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={onLogin}
                  className="w-full flex items-center justify-between bg-white text-slate-950 p-4 rounded-2xl font-bold transition-all hover:bg-slate-100 group"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-wallet text-xl"></i>
                    Connect Wallet
                  </div>
                  <i className="fa-solid fa-arrow-right -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"></i>
                </button>

                <button 
                  onClick={onLogin}
                  className="w-full flex items-center justify-between bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl font-bold transition-all hover:bg-slate-800 group"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-brands fa-google text-xl text-red-500"></i>
                    Continue with Google
                  </div>
                  <i className="fa-solid fa-arrow-right -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"></i>
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-slate-500 text-xs">
                  {authMode === 'signin' ? (
                    <>New to crETH? <button onClick={() => setAuthMode('signup')} className="text-blue-500 font-bold">Sign Up</button></>
                  ) : (
                    <>Already have an account? <button onClick={() => setAuthMode('signin')} className="text-blue-500 font-bold">Sign In</button></>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-left hover:bg-white/[0.05] transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-code text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Protocol Dev</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Smart contracts, DeFi integrations, and protocol optimization on Ethereum.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-left hover:bg-white/[0.05] transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/20 text-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-palette text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">NFT Creative</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Launch collections, design assets, and create visual lore for the ecosystem.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-left hover:bg-white/[0.05] transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-award text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">On-Chain Reputation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Proof-of-Work SBTs minted directly to your wallet upon completion.</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <i className="fa-brands fa-ethereum text-white text-[10px]"></i>
              </div>
              <span className="font-bold text-sm tracking-tighter">crETH</span>
            </div>
            <span className="text-xs text-slate-500">Decentralized Gig Infrastructure on Ethereum</span>
          </div>
          <div className="flex items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
