
import React, { useState } from 'react';

interface SettingsProps {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, setTheme }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    xmtp: true,
  });
  const [privacy, setPrivacy] = useState({
    publicRep: true,
    hideEarnings: false,
  });

  const isDark = theme === 'dark';

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fadeIn space-y-8 max-w-4xl mx-auto pb-20">
      <header>
        <h1 className={`text-3xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Platform Settings</h1>
        <p className="text-slate-400 font-medium">Configure your profile, security, and interface preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-1">
          {[
            { id: 'account', label: 'Account & Security', icon: 'fa-shield-halved' },
            { id: 'appearance', label: 'Appearance', icon: 'fa-palette' },
            { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
            { id: 'privacy', label: 'Privacy', icon: 'fa-eye-slash' },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                item.id === 'account' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : `text-slate-500 hover:text-blue-500 ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              {item.label}
            </button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-8">
          {/* Appearance Section */}
          <section className={`p-8 rounded-3xl border transition-all duration-300 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'}`}>
            <h2 className={`text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <i className="fa-solid fa-palette text-blue-500"></i>
              Appearance
            </h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Interface Theme</label>
              <div className="grid grid-cols-2 gap-4">
                {(['dark', 'light'] as const).map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-6 rounded-2xl border transition-all text-center group ${
                      theme === t 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' 
                        : `${isDark ? 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'}`
                    }`}
                  >
                    <i className={`fa-solid ${t === 'dark' ? 'fa-moon' : 'fa-sun'} mb-3 text-2xl`}></i>
                    <div className="text-[10px] font-black uppercase tracking-widest">{t} Mode</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Account Security Section */}
          <section className={`p-8 rounded-3xl border transition-all duration-300 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'}`}>
            <h2 className={`text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <i className="fa-solid fa-fingerprint text-blue-500"></i>
              Account Security
            </h2>
            
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <i className="fa-brands fa-ethereum text-blue-500 text-xl"></i>
                  <div>
                    <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>0x4c21...8e2f</p>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Main Settlement Wallet</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest rounded border border-emerald-500/20">Active</span>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Linked Authentication</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}>
                    <i className="fa-brands fa-github text-lg"></i>
                    <span className="text-[10px] font-black uppercase tracking-widest">GitHub</span>
                  </button>
                  <button className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-white'}`}>
                    <i className="fa-brands fa-discord text-indigo-500 text-lg"></i>
                    <span className="text-[10px] font-black uppercase tracking-widest">Discord</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className={`p-8 rounded-3xl border transition-all duration-300 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'}`}>
            <h2 className={`text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <i className="fa-solid fa-bell text-blue-500"></i>
              Notifications
            </h2>
            <div className="space-y-4">
              {['Email Digest', 'Direct Push', 'XMTP Secure Messaging'].map((label, idx) => (
                <div key={label} className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</span>
                  <button className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full"></div>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
