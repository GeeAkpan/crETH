
import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, setRole, onNavigate, onLogout, theme, setTheme }) => {
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowWalletMenu(false);
        setShowNetworkMenu(false);
        setShowNotificationMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header className={`h-20 border-b flex items-center justify-between px-8 sticky top-0 z-[60] backdrop-blur-xl transition-all duration-300 ${isDark ? 'border-slate-800/50 bg-slate-950/80' : 'border-slate-200/60 bg-white/90 shadow-sm'}`}>
      <div className="flex items-center gap-10">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl ${isDark ? 'bg-indigo-600 shadow-indigo-600/30 group-hover:bg-indigo-500' : 'bg-indigo-600 shadow-indigo-600/20 group-hover:bg-indigo-700'}`}>
            <i className="fa-brands fa-ethereum text-white text-2xl"></i>
          </div>
          <span className={`text-2xl font-black tracking-tighter font-heading transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>
            crETH
          </span>
        </div>

        {/* Desktop Role Toggle (Visible only on Large screens) */}
        <div className={`hidden lg:flex p-1.5 rounded-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <button 
            onClick={() => setRole(UserRole.TALENT)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === UserRole.TALENT ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            Talent
          </button>
          <button 
            onClick={() => setRole(UserRole.SPONSOR)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === UserRole.SPONSOR ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            Sponsor
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4" ref={navRef}>
        {/* Network Toggle */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => setShowNetworkMenu(!showNetworkMenu)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-600'}`}
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"></div>
            Ethereum
            <i className="fa-solid fa-chevron-down text-[8px] opacity-50"></i>
          </button>
          {showNetworkMenu && (
             <div className={`absolute top-full mt-3 right-0 w-48 rounded-3xl border shadow-2xl p-2 z-[70] animate-fadeIn overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
               <div className="p-3 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800/50 mb-1">Select Network</div>
               <button className={`w-full flex items-center gap-3 p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-left ${isDark ? 'bg-indigo-600/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                 <i className="fa-brands fa-ethereum"></i> Mainnet
               </button>
             </div>
          )}
        </div>

        {/* Action Icons Group */}
        <div className="flex items-center gap-2 p-1 rounded-2xl">
          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all border group ${isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-indigo-400' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-indigo-600'}`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-lg transition-transform group-hover:rotate-12`}></i>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotificationMenu(!showNotificationMenu)}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all border group relative ${isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600'}`}
            >
              <i className="fa-solid fa-bell text-lg group-hover:scale-110 transition-transform"></i>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950"></span>
            </button>
            {showNotificationMenu && (
              <div className={`absolute top-full mt-3 right-0 w-80 rounded-[32px] border shadow-2xl overflow-hidden z-[70] animate-fadeIn ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="px-6 py-5 border-b border-slate-800/50 flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Updates</h3>
                  <button className="text-[10px] text-indigo-500 font-black hover:underline">Clear</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar no-scrollbar">
                   <div className={`p-5 flex gap-4 transition-colors cursor-pointer border-b border-slate-800/30 ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-trophy text-indigo-500"></i>
                      </div>
                      <div>
                        <p className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Bounty Won!</p>
                        <p className="text-[10px] text-slate-500 mt-1">3,000 USDC released to your wallet.</p>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Display & Integrated Role Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowWalletMenu(!showWalletMenu)}
            className={`h-11 flex items-center gap-3 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border shadow-lg ${isDark ? 'bg-indigo-600/10 border-indigo-600/20 text-white hover:bg-indigo-600/20 shadow-indigo-600/5' : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'}`}
          >
            <i className="fa-solid fa-wallet text-sm opacity-80"></i>
            <span className="hidden sm:inline">0x4c...8e2</span>
            <i className={`fa-solid fa-chevron-down text-[8px] transition-transform ${showWalletMenu ? 'rotate-180' : ''}`}></i>
          </button>

          {showWalletMenu && (
            <div className={`absolute top-full mt-3 right-0 w-64 rounded-[32px] border shadow-2xl overflow-hidden z-[70] animate-fadeIn ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              {/* Wallet Info Header */}
              <div className="p-6 border-b border-slate-800/50">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Connected Wallet</div>
                <div className={`text-xs font-mono font-bold truncate mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>0x4c21...8e2f</div>
                <div className="flex items-center justify-between">
                  <div className={`text-lg font-black font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>4.20 ETH</div>
                  <div className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">Mainnet</div>
                </div>
              </div>

              {/* ROLE SWITCHER (Responsive) */}
              <div className="p-4 bg-slate-500/5">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 px-2">Account Role</div>
                <div className="space-y-1">
                  <button 
                    onClick={() => { setRole(UserRole.TALENT); setShowWalletMenu(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${role === UserRole.TALENT ? (isDark ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20') : (isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600')}`}
                  >
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-rocket text-xs"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Talent</span>
                    </div>
                    {role === UserRole.TALENT && <i className="fa-solid fa-check text-[10px]"></i>}
                  </button>
                  <button 
                    onClick={() => { setRole(UserRole.SPONSOR); setShowWalletMenu(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${role === UserRole.SPONSOR ? (isDark ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20') : (isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600')}`}
                  >
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-briefcase text-xs"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Sponsor</span>
                    </div>
                    {role === UserRole.SPONSOR && <i className="fa-solid fa-check text-[10px]"></i>}
                  </button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-2 border-t border-slate-800/50">
                <button 
                  onClick={onLogout}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-rose-500 hover:bg-rose-500/10' : 'text-rose-600 hover:bg-rose-50'}`}
                >
                  <i className="fa-solid fa-power-off"></i>
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
