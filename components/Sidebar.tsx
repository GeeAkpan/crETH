
import React from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  role: UserRole;
  theme: 'light' | 'dark';
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, role, theme }) => {
  const isDark = theme === 'dark';
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-house', roles: [UserRole.TALENT, UserRole.SPONSOR] },
    { id: 'explore', label: 'Opportunities', icon: 'fa-magnifying-glass', roles: [UserRole.TALENT] },
    { id: 'messages', label: 'Messages', icon: 'fa-comment-dots', roles: [UserRole.TALENT, UserRole.SPONSOR], badge: '2' },
    { id: 'my-work', label: 'My Submissions', icon: 'fa-briefcase', roles: [UserRole.TALENT] },
    { id: 'sponsor-portal', label: 'Manage Gigs', icon: 'fa-layer-group', roles: [UserRole.SPONSOR] },
    { id: 'profile', label: 'Profile', icon: 'fa-user', roles: [UserRole.TALENT, UserRole.SPONSOR] },
    { id: 'settings', label: 'Settings', icon: 'fa-gear', roles: [UserRole.TALENT, UserRole.SPONSOR] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className={`hidden md:flex w-64 border-r flex-col py-6 px-4 gap-2 transition-all duration-300 ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white shadow-xl shadow-slate-200/20'}`}>
      <div className={`text-[10px] font-black uppercase tracking-widest px-4 mb-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Main Menu</div>
      
      {filteredItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
            currentPage === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : `hover:bg-blue-600/10 hover:text-blue-500 ${isDark ? 'text-slate-500' : 'text-slate-600'}`
          }`}
        >
          <div className="flex items-center gap-3">
            <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
            {item.label}
          </div>
          {item.badge && (
            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black animate-pulse">
              {item.badge}
            </span>
          )}
        </button>
      ))}

      <div className={`mt-auto p-5 rounded-[24px] border transition-all duration-300 ${isDark ? 'bg-slate-950 border-slate-800 shadow-2xl' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-sm">JD</div>
          <div>
            <div className={`text-xs font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>EtherDev_JD</div>
            <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Rep: 740</div>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('profile')}
          className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-500 shadow-sm'}`}
        >
          My Portfolio
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
