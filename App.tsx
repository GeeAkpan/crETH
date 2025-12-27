
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import ListingDetail from './pages/ListingDetail';
import SponsorPortal from './pages/SponsorPortal';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Messages from './pages/Messages';
import MyWork from './pages/MyWork';
import Settings from './pages/Settings';
import { UserRole } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.TALENT);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [messagePeer, setMessagePeer] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('creth_theme') as 'light' | 'dark') || 'dark';
  });

  // Global Reactive User Profile
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('creth_user_profile');
    return saved ? JSON.parse(saved) : {
      address: '0x4c21...8e2f',
      username: 'crETHor_JD',
      bio: 'Senior Full-stack Engineer specializing in Ethereum L2 scaling solutions. Open for complex smart contract architecture and frontend integrations.',
      avatarUrl: 'https://i.pravatar.cc/300?u=crETHor_JD',
      bannerUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=400&fit=crop',
      reputation: 740,
      completedTasks: 12,
      totalFunded: '$45k',
      activeGigs: 8,
      joinDate: 'Jan 2024'
    };
  });

  // Global Reactive Settings
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('creth_notifications');
    return saved ? JSON.parse(saved) : { email: true, push: false, xmtp: true };
  });

  const [privacy, setPrivacy] = useState(() => {
    const saved = localStorage.getItem('creth_privacy');
    return saved ? JSON.parse(saved) : { publicRep: true, hideEarnings: false };
  });

  // Utility for safe local storage updates
  const safeSetItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.warn(`Storage quota exceeded for key: ${key}. Attempting to clear space or slim data.`);
        if (key === 'creth_user_profile') {
          // Fallback: Save profile without large base64 images to preserve bio/name
          const slimUser = { 
            ...user, 
            avatarUrl: user.avatarUrl?.startsWith('data:') ? 'https://i.pravatar.cc/300?u=' + user.username : user.avatarUrl,
            bannerUrl: user.bannerUrl?.startsWith('data:') ? 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=400&fit=crop' : user.bannerUrl 
          };
          try {
            localStorage.setItem(key, JSON.stringify(slimUser));
            console.log("Successfully saved slimmed profile data.");
          } catch (innerE) {
            console.error("Critical storage failure: cannot even save slimmed profile.");
          }
        }
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('creth_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-50 min-h-screen transition-colors duration-500';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 min-h-screen transition-colors duration-500';
    }
  }, [theme]);

  useEffect(() => {
    safeSetItem('creth_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    safeSetItem('creth_privacy', JSON.stringify(privacy));
  }, [privacy]);

  useEffect(() => {
    safeSetItem('creth_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '') || 'dashboard';
      const parts = fullHash.split('/');
      const page = parts[0];

      if (page === 'listing' && parts[1]) {
        setSelectedListingId(parts[1]);
        setCurrentPage('listing-detail');
      } else if (page === 'messages') {
        setMessagePeer(parts[1] || null);
        setCurrentPage('messages');
      } else {
        setCurrentPage(page);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string) => {
    window.location.hash = page;
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('dashboard');
  };

  if (!isAuthenticated) {
    return <Landing onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard navigate={navigate} role={userRole} theme={theme} user={user} />;
      case 'explore':
        return <Explore onSelectListing={(id) => navigate(`listing/${id}`)} />;
      case 'listing-detail':
        return (
          <ListingDetail 
            id={selectedListingId!} 
            onBack={() => navigate('explore')} 
            onMessageSponsor={(id) => navigate(`messages/${id}`)} 
          />
        );
      case 'sponsor-portal':
        return <SponsorPortal />;
      case 'profile':
        return (
          <Profile 
            onNavigate={navigate} 
            role={userRole} 
            privacySettings={privacy} 
            user={user}
            setUser={setUser}
          />
        );
      case 'messages':
        return <Messages initialPeer={messagePeer} />;
      case 'my-work':
        return <MyWork />;
      case 'settings':
        return (
          <Settings 
            theme={theme} 
            setTheme={setTheme} 
            notifications={notifications}
            setNotifications={setNotifications}
            privacy={privacy}
            setPrivacy={setPrivacy}
          />
        );
      default:
        return <Dashboard navigate={navigate} role={userRole} theme={theme} user={user} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        role={userRole} 
        setRole={setUserRole} 
        onNavigate={navigate}
        onLogout={handleLogout}
        theme={theme}
        setTheme={setTheme}
        user={user}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={navigate} 
          role={userRole}
          theme={theme}
          user={user}
        />
        
        <main className={`flex-1 overflow-y-auto p-4 md:p-8 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
          <div key={currentPage} className="max-w-6xl mx-auto pb-20 page-wrapper">
            {renderPage()}
          </div>
        </main>
      </div>

      <nav className={`md:hidden fixed bottom-0 left-0 right-0 glass border-t flex justify-around p-3 z-50 transition-colors duration-500 ${theme === 'dark' ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/90'}`}>
        <button onClick={() => navigate('dashboard')} className={`${currentPage === 'dashboard' ? 'text-indigo-500 scale-110' : 'text-slate-400'} transition-all duration-300`}>
          <i className="fa-solid fa-house text-xl"></i>
        </button>
        <button onClick={() => navigate('explore')} className={`${currentPage === 'explore' ? 'text-indigo-500 scale-110' : 'text-slate-400'} transition-all duration-300`}>
          <i className="fa-solid fa-magnifying-glass text-xl"></i>
        </button>
        <button onClick={() => navigate('my-work')} className={`${currentPage === 'my-work' ? 'text-indigo-500 scale-110' : 'text-slate-400'} transition-all duration-300`}>
          <i className="fa-solid fa-briefcase text-xl"></i>
        </button>
        <button onClick={() => navigate('messages')} className={`${currentPage === 'messages' ? 'text-indigo-500 scale-110' : 'text-slate-400'} transition-all duration-300`}>
          <i className="fa-solid fa-comment-dots text-xl"></i>
        </button>
        <button onClick={() => navigate('profile')} className={`${currentPage === 'profile' ? 'text-indigo-500 scale-110' : 'text-slate-400'} transition-all duration-300`}>
          <i className="fa-solid fa-user text-xl"></i>
        </button>
      </nav>
    </div>
  );
};

export default App;
