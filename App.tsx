
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
import { UserRole, Listing } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.TALENT);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Sync theme with document class for global Tailwind targeting
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-50 min-h-screen transition-colors duration-300';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 min-h-screen transition-colors duration-300';
    }
  }, [theme]);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      if (hash.startsWith('listing/')) {
        const id = hash.split('/')[1];
        setSelectedListingId(id);
        setCurrentPage('listing-detail');
      } else {
        setCurrentPage(hash);
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
        return <Dashboard navigate={navigate} role={userRole} theme={theme} />;
      case 'explore':
        return <Explore onSelectListing={(id) => navigate(`listing/${id}`)} />;
      case 'listing-detail':
        return <ListingDetail id={selectedListingId!} onBack={() => navigate('explore')} onMessageSponsor={(id) => navigate('messages')} />;
      case 'sponsor-portal':
        return <SponsorPortal />;
      case 'profile':
        return <Profile onNavigate={navigate} role={userRole} />;
      case 'messages':
        return <Messages />;
      case 'my-work':
        return <MyWork />;
      case 'settings':
        return <Settings theme={theme} setTheme={setTheme} />;
      default:
        return <Dashboard navigate={navigate} role={userRole} theme={theme} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300`}>
      <Navbar 
        role={userRole} 
        setRole={setUserRole} 
        onNavigate={navigate}
        onLogout={handleLogout}
        theme={theme}
        setTheme={setTheme}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={navigate} 
          role={userRole}
          theme={theme}
        />
        
        <main className={`flex-1 overflow-y-auto p-4 md:p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto pb-20">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 glass border-t flex justify-around p-3 z-50 transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/90'}`}>
        <button onClick={() => navigate('dashboard')} className={`${currentPage === 'dashboard' ? 'text-blue-500' : 'text-slate-400'}`}>
          <i className="fa-solid fa-house text-xl"></i>
        </button>
        <button onClick={() => navigate('explore')} className={`${currentPage === 'explore' ? 'text-blue-500' : 'text-slate-400'}`}>
          <i className="fa-solid fa-magnifying-glass text-xl"></i>
        </button>
        <button onClick={() => navigate('my-work')} className={`${currentPage === 'my-work' ? 'text-blue-500' : 'text-slate-400'}`}>
          <i className="fa-solid fa-briefcase text-xl"></i>
        </button>
        <button onClick={() => navigate('messages')} className={`${currentPage === 'messages' ? 'text-blue-500' : 'text-slate-400'}`}>
          <i className="fa-solid fa-comment-dots text-xl"></i>
        </button>
        <button onClick={() => navigate('profile')} className={`${currentPage === 'profile' ? 'text-blue-500' : 'text-slate-400'}`}>
          <i className="fa-solid fa-user text-xl"></i>
        </button>
      </nav>
    </div>
  );
};

export default App;
