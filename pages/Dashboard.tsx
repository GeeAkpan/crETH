
import React from 'react';
import { UserRole, BlockchainNetwork } from '../types';

interface DashboardProps {
  navigate: (page: string) => void;
  role: UserRole;
  theme: 'light' | 'dark';
}

const Dashboard: React.FC<DashboardProps> = ({ navigate, role, theme }) => {
  const isTalent = role === UserRole.TALENT;
  const isDark = theme === 'dark';

  const stats = isTalent ? [
    { label: 'Earnings', value: '$12,450', icon: 'fa-wallet', color: 'text-emerald-500', bg: 'bg-emerald-500/10', target: 'profile' },
    { label: 'Active', value: '3', icon: 'fa-bolt', color: 'text-indigo-500', bg: 'bg-indigo-500/10', target: 'my-work' },
    { label: 'Reputation', value: '740', icon: 'fa-award', color: 'text-purple-500', bg: 'bg-purple-500/10', target: 'profile' },
    { label: 'Proof-of-Work', value: '12', icon: 'fa-fingerprint', color: 'text-rose-500', bg: 'bg-rose-500/10', target: 'profile' },
  ] : [
    { label: 'Funded', value: '$45,000', icon: 'fa-vault', color: 'text-emerald-500', bg: 'bg-emerald-500/10', target: 'sponsor-portal' },
    { label: 'Active Gigs', value: '8', icon: 'fa-layer-group', color: 'text-indigo-500', bg: 'bg-indigo-500/10', target: 'sponsor-portal' },
    { label: 'Submissions', value: '24', icon: 'fa-inbox', color: 'text-purple-500', bg: 'bg-purple-500/10', target: 'sponsor-portal' },
    { label: 'Avg Payout', value: '$1,200', icon: 'fa-chart-pie', color: 'text-rose-500', bg: 'bg-rose-500/10', target: 'sponsor-portal' },
  ];

  const recentActivity = [
    { type: 'LAUNCH', label: 'Ethereum Foundation: Protocol Research', time: '5m ago', icon: 'fa-flask-vial', color: 'text-indigo-500', target: 'listing/1' },
    { type: 'SUBMISSION', label: 'Submitted ETH Global Hackathon Entry', time: '15m ago', icon: 'fa-palette', color: 'text-rose-500', target: 'my-work' },
    { type: 'AWARD', label: '1.2 ETH paid for Security Audit', time: '1h ago', icon: 'fa-shield-halved', color: 'text-emerald-500', target: 'profile' },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Welcome Hero */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h1 className={`text-4xl md:text-5xl font-black tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Welcome, <span className="text-indigo-500">crETHor</span>
             </h1>
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-xl animate-bounce-short">👋</div>
          </div>
          <p className={`text-lg font-medium max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Connecting the world's best talent to the Ethereum ecosystem.
          </p>
        </div>
        
        <div className={`p-4 rounded-[32px] border flex items-center gap-4 transition-all shadow-xl ${isDark ? 'bg-slate-900 border-slate-800 shadow-indigo-500/5' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <i className="fa-brands fa-ethereum text-xl"></i>
          </div>
          <div className="pr-4">
            <div className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Current Node</div>
            <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Mainnet • 14 Gwei</div>
          </div>
        </div>
      </header>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`p-8 rounded-[40px] border transition-all relative overflow-hidden group hover:scale-[1.02] active:scale-95 ${isDark ? 'bg-slate-900/40 border-slate-800/60 hover:border-indigo-500/50' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40 hover:border-indigo-500/40'}`}
          >
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${stat.bg} ${stat.color} border border-white/5`}>
                <i className={`fa-solid ${stat.icon} text-lg`}></i>
              </div>
              <div className={`text-xs font-black uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</div>
              <div className={`text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>{stat.value}</div>
            </div>
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl rounded-full ${stat.bg}`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-black tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>Ecosystem Activity</h2>
            <button className="text-indigo-500 text-[10px] font-black uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className={`rounded-[40px] border overflow-hidden transition-all ${isDark ? 'bg-slate-900/20 border-slate-800/50' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/40'}`}>
            {recentActivity.map((activity, i) => (
              <div 
                key={i} 
                className={`p-6 flex items-center gap-6 border-b last:border-0 transition-colors cursor-pointer group ${isDark ? 'border-slate-800/40 hover:bg-slate-800/30' : 'border-slate-100 hover:bg-slate-50'}`}
                onClick={() => navigate(activity.target)}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-all group-hover:rotate-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <i className={`fa-solid ${activity.icon} ${activity.color} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate group-hover:text-indigo-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{activity.label}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1.5">{activity.time} • Verified Event</p>
                </div>
                <i className="fa-solid fa-arrow-right text-slate-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"></i>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch */}
        <div className="space-y-6">
          <h2 className={`text-2xl font-black tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>Terminal</h2>
          <div className="grid gap-4">
            <button 
              onClick={() => navigate(isTalent ? 'explore' : 'sponsor-portal')}
              className={`p-6 rounded-[32px] border transition-all flex flex-col gap-5 group text-left ${isDark ? 'bg-slate-900/40 border-slate-800 hover:border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-500 shadow-2xl shadow-slate-200/40'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl shadow-indigo-600/30">
                <i className={`fa-solid ${isTalent ? 'fa-rocket' : 'fa-plus'} text-xl`}></i>
              </div>
              <div>
                <div className={`font-black text-lg font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>{isTalent ? 'Explore Gigs' : 'Launch Listing'}</div>
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Access the global pool</div>
              </div>
            </button>
            <button 
              onClick={() => navigate('messages')}
              className={`p-6 rounded-[32px] border transition-all flex flex-col gap-5 group text-left ${isDark ? 'bg-slate-900/40 border-slate-800 hover:border-rose-500' : 'bg-white border-slate-200 hover:border-rose-500 shadow-2xl shadow-slate-200/40'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl shadow-rose-600/30">
                <i className="fa-solid fa-comment-dots text-xl"></i>
              </div>
              <div>
                <div className={`font-black text-lg font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>Secure DM</div>
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">End-to-End via XMTP</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
