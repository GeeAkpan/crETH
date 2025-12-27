
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

const Logo: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-animate">
    {/* Ethereum Base Diamond */}
    <path d="M50 5L20 50L50 95L80 50L50 5Z" fill={isDark ? "#6366f1" : "#4f46e5"} fillOpacity="0.2" />
    <path d="M50 5L20 50L50 68L80 50L50 5Z" fill={isDark ? "#818cf8" : "#6366f1"} />
    <path d="M50 95L20 50L50 68L80 50L50 95Z" fill={isDark ? "#4338ca" : "#3730a3"} />
    
    {/* Talent "C" Nodes */}
    <circle cx="50" cy="35" r="4" fill="white" />
    <circle cx="35" cy="50" r="4" fill="white" />
    <circle cx="65" cy="50" r="4" fill="white" />
    <circle cx="50" cy="65" r="4" fill="white" />
    <path d="M35 50C35 58.2843 41.7157 65 50 65" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

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
        {/* Modern Logo Section */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
          <div className={`transition-all duration-500 transform group-hover:scale-110`}>
            <Logo isDark={isDark} />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-black tracking-tighter font-heading transition-colors leading-none ${isDark ? 'text-white' : 'text-slate-950'}`}>
              crETH
            </span>
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              Talent Protocol
            </span>
          </div>
        </div>

        {/* Dynamic Desktop Search / Nav (Placeholder) */}
        <div className={`hidden xl:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
           <button onClick={() => onNavigate('explore')} className="hover:text-indigo-500 transition-colors">Opportunities</button>
           <button onClick={() => onNavigate('my-work')} className="hover:text-indigo-500 transition-colors">Workroom</button>
        </div>
      </div>

      <div className="flex items-center gap-3" ref={navRef}>
        {/* Theme & Notifications Group */}
        <div className={`flex items-center gap-1 p-1 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group ${isDark ? 'text-indigo-400 hover:bg-slate-800' : 'text-indigo-600 hover:bg-white'}`}
          >
            <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-base transition-transform group-hover:rotate-12`}></i>
          </button>
          
          <div className="w-px h-4 bg-slate-700/50"></div>

          <div className="relative">
            <button 
              onClick={() => setShowNotificationMenu(!showNotificationMenu)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group relative ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-white'}`}
            >
              <i className="fa-solid fa-bell text-base group-hover:scale-110 transition-transform"></i>
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            </button>
            {showNotificationMenu && (
              <div className={`absolute top-full mt-4 right-[-40px] w-80 rounded-[32px] border shadow-2xl overflow-hidden z-[70] animate-fadeIn ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="px-6 py-5 border-b border-slate-800/50 flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Updates</h3>
                  <button className="text-[10px] text-indigo-500 font-black">All</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto no-scrollbar p-2">
                   <div className={`p-4 flex gap-4 transition-colors rounded-2xl cursor-pointer ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                      </div>
                      <div>
                        <p className={`text-[11px] font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Bounty Release Confirmed</p>
                        <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider">3,000 USDC Staked to 0x42...ebf</p>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wallet & Role Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowWalletMenu(!showWalletMenu)}
            className={`h-11 flex items-center gap-3 px-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border shadow-lg group ${isDark ? 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-indigo-600/10' : 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700 shadow-indigo-600/20'}`}
          >
            <i className="fa-solid fa-wallet text-sm opacity-80 group-hover:rotate-12 transition-transform"></i>
            <span className="hidden sm:inline">0x4c21...8e2</span>
            <i className={`fa-solid fa-chevron-down text-[8px] transition-transform ${showWalletMenu ? 'rotate-180' : ''}`}></i>
          </button>

          {showWalletMenu && (
            <div className={`absolute top-full mt-4 right-0 w-72 rounded-[40px] border shadow-2xl overflow-hidden z-[70] animate-fadeIn ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="p-8 border-b border-slate-800/50">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Linked Identity</div>
                <div className="flex items-center gap-4 mb-5">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-lg font-black">JD</div>
                   <div>
                     <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>crETHor_JD</div>
                     <div className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Reputation: 740</div>
                   </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                  <span className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>4.20 ETH</span>
                  <span className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500 text-[8px] font-black uppercase tracking-widest">Mainnet</span>
                </div>
              </div>

              {/* QUICK ROLE SWITCHER */}
              <div className="p-4 bg-slate-500/5">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 px-3">Switch Profile</div>
                <div className="grid grid-cols-1 gap-1">
                  <button 
                    onClick={() => { setRole(UserRole.TALENT); setShowWalletMenu(false); }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${role === UserRole.TALENT ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')}`}
                  >
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-rocket text-xs"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Talent Mode</span>
                    </div>
                    {role === UserRole.TALENT && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </button>
                  <button 
                    onClick={() => { setRole(UserRole.SPONSOR); setShowWalletMenu(false); }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${role === UserRole.SPONSOR ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')}`}
                  >
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-briefcase text-xs"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Sponsor Mode</span>
                    </div>
                    {role === UserRole.SPONSOR && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </button>
                </div>
              </div>

              <div className="p-3">
                <button 
                  onClick={onLogout}
                  className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-[28px] text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? 'text-rose-500 hover:bg-rose-500/10' : 'text-rose-600 hover:bg-rose-50'}`}
                >
                  <i className="fa-solid fa-power-off"></i>
                  Disconnect Terminal
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
