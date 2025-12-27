
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UserRole } from '../types';

interface ProfileProps {
  onNavigate?: (page: string) => void;
  role: UserRole;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, role }) => {
  const isTalent = role === UserRole.TALENT;
  const [activeTab, setActiveTab] = useState<string>(isTalent ? 'nfts' : 'listings');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Synchronize active tab when role changes
  useEffect(() => {
    setActiveTab(isTalent ? 'nfts' : 'listings');
  }, [isTalent]);

  // State-driven user data
  const [user, setUser] = useState({
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
  });

  const [portfolioItems, setPortfolioItems] = useState([
    { id: 1, title: 'DeFi Dashboard UI', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop' },
    { id: 2, title: 'NFT Marketplace Concept', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop' },
  ]);

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl
  });

  const handleOpenModal = () => {
    setEditForm({
      username: user.username,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      bannerUrl: user.bannerUrl
    });
    setIsEditModalOpen(true);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
    setIsGenerating(true);
    setGenerationProgress(0);
  };

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsGenerating(false), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      username: editForm.username,
      bio: editForm.bio,
      avatarUrl: editForm.avatarUrl,
      bannerUrl: editForm.bannerUrl
    });
    setIsEditModalOpen(false);
  };

  // Helper for reading local files
  const handleFileRead = (file: File, callback: (result: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onDropPortfolio = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleFileRead(file, (data) => {
        setPortfolioItems(prev => [
          ...prev,
          { id: Date.now(), title: 'New Achievement', image: data }
        ]);
      });
    }
  }, []);

  const onDropAvatar = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleFileRead(file, (data) => {
        setEditForm(prev => ({ ...prev, avatarUrl: data }));
      });
    }
  }, []);

  const onDropBanner = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleFileRead(file, (data) => {
        setEditForm(prev => ({ ...prev, bannerUrl: data }));
      });
    }
  }, []);

  const { getRootProps: getPortfolioProps, getInputProps: getPortfolioInput } = useDropzone({
    onDrop: onDropPortfolio,
    accept: { 'image/*': [] },
    multiple: false
  });

  const { getRootProps: getAvatarProps, getInputProps: getAvatarInput } = useDropzone({
    onDrop: onDropAvatar,
    accept: { 'image/*': [] },
    multiple: false
  });

  const { getRootProps: getBannerProps, getInputProps: getBannerInput } = useDropzone({
    onDrop: onDropBanner,
    accept: { 'image/*': [] },
    multiple: false
  });

  const mockNFTs = [
    { id: 1, name: 'Optimism Governance Guru', date: 'March 2024', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop', color: 'from-red-500 to-red-800' },
    { id: 2, name: 'Arbitrum Security Warden', date: 'Feb 2024', image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=200&h=200&fit=crop', color: 'from-blue-500 to-indigo-800' },
    { id: 3, name: 'Base Bridge Builder', date: 'Jan 2024', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop', color: 'from-blue-400 to-blue-600' },
    { id: 4, name: 'Mainnet Mastermind', date: 'Dec 2023', image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=200&h=200&fit=crop', color: 'from-purple-500 to-pink-600' },
  ];

  const mockHistory = [
    { id: 101, title: 'Optimism Governance Dashboard', reward: '2500 USDC', status: 'Completed', network: 'Optimism' },
    { id: 102, title: 'Gas Optimization Research', reward: '0.5 ETH', status: 'Completed', network: 'Ethereum' },
    { id: 103, title: 'Base Bridge Tutorial', reward: '1000 USDC', status: 'Completed', network: 'Base' },
    { id: 104, title: 'L2 Scaling Infographic', reward: '500 USDC', status: 'Completed', network: 'Arbitrum' },
  ];

  const mockSponsorListings = [
    { id: 201, title: 'EVM Security Audit', reward: '5000 USDC', status: 'Open', network: 'Ethereum' },
    { id: 202, title: 'DEX Interface Redesign', reward: '2500 USDC', status: 'In Progress', network: 'Base' },
    { id: 203, title: 'Layer 2 Documentation', reward: '1500 USDC', status: 'Completed', network: 'Optimism' },
  ];

  const shareResume = (platform: string) => {
    const url = `https://creth.app/${isTalent ? 'resume' : 'sponsor'}/${user.username.toLowerCase()}`;
    const text = isTalent 
      ? `Check out my on-chain Proof-of-Work portfolio on crETH! 🚀 Verified skills and Ethereum contributions. #Ethereum #Web3 #crETH`
      : `Check out our active bounties and developer grants on crETH! 🚀 Join us in building the Ethereum ecosystem. #Ethereum #Web3 #Sponsor`;
    
    switch (platform) {
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${isTalent ? 'On-Chain Portfolio' : 'Ecosystem Grants'}: ${user.username}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'chat':
        alert('Link shared to your secure chat inbox!');
        setIsShareModalOpen(false);
        onNavigate?.('messages');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
  };

  const talentTabs = [
    { id: 'nfts', label: 'Vault', icon: 'fa-fingerprint' },
    { id: 'history', label: 'Task History', icon: 'fa-clock-rotate-left' },
    { id: 'portfolio', label: 'Portfolio', icon: 'fa-images' }
  ];

  const sponsorTabs = [
    { id: 'listings', label: 'Active Listings', icon: 'fa-layer-group' },
    { id: 'payouts', label: 'Payout History', icon: 'fa-money-bill-transfer' },
    { id: 'about', label: 'Org Info', icon: 'fa-building' }
  ];

  const currentTabs = isTalent ? talentTabs : sponsorTabs;

  return (
    <div className="animate-fadeIn space-y-8 relative pb-20">
      {/* Profile Header Card */}
      <div className="glass rounded-[32px] border border-slate-800 relative overflow-hidden shadow-2xl">
        {/* Banner Image */}
        <div className="h-48 w-full relative overflow-hidden group">
          <img src={user.bannerUrl} alt="banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => onNavigate?.('settings')}
              className="bg-black/40 backdrop-blur-md p-2.5 rounded-xl text-white md:opacity-0 group-hover:opacity-100 transition-opacity border border-white/10"
              title="Settings"
            >
              <i className="fa-solid fa-gear text-sm"></i>
            </button>
            <button 
              onClick={handleOpenModal}
              className="hidden sm:flex bg-black/40 backdrop-blur-md p-2 rounded-xl text-white md:opacity-0 group-hover:opacity-100 transition-opacity border border-white/10"
            >
              <i className="fa-solid fa-camera mr-2 text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Update Profile</span>
            </button>
          </div>
        </div>
        
        <div className="p-8 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-4xl font-bold overflow-hidden border-4 border-slate-950">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    user.username.substring(0, 2).toUpperCase()
                  )}
                </div>
              </div>
              <button 
                onClick={handleOpenModal}
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-2 border-slate-950 flex items-center justify-center text-white text-xs hover:bg-blue-500 transition-colors"
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-black tracking-tight">{user.username}</h1>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${isTalent ? 'bg-blue-600/10 text-blue-500 border-blue-600/20' : 'bg-purple-600/10 text-purple-500 border-purple-600/20'}`}>
                  {role}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-brands fa-ethereum text-blue-400"></i>
                  {user.address}
                </span>
              </div>
              <p className="text-slate-400 max-w-2xl leading-relaxed mb-4 text-sm md:text-base font-medium">
                {user.bio}
              </p>
              <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2 text-purple-400">
                  <i className="fa-solid fa-award"></i>
                  <span>{user.reputation} Reputation</span>
                </div>
                {isTalent ? (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <i className="fa-solid fa-check-double"></i>
                    <span>{user.completedTasks} Tasks Done</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <i className="fa-solid fa-piggy-bank"></i>
                      <span>{user.totalFunded} Funded</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <i className="fa-solid fa-folder-open"></i>
                      <span>{user.activeGigs} Active Gigs</span>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2 text-slate-500">
                  <i className="fa-solid fa-calendar"></i>
                  <span>Member since {user.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto pb-2">
              <button 
                onClick={handleOpenModal}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-user-pen"></i>
                Edit {isTalent ? 'Bio' : 'Org'}
              </button>
              <button 
                onClick={handleShareClick}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20"
              >
                <i className="fa-solid fa-share-nodes"></i>
                Share {isTalent ? 'Portfolio' : 'Page'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-800 overflow-x-auto no-scrollbar">
          {currentTabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <i className={`fa-solid ${tab.icon} text-xs`}></i>
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>}
            </button>
          ))}
        </div>

        {/* Talent Content */}
        {isTalent && activeTab === 'nfts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {mockNFTs.map(nft => (
              <div key={nft.id} className="group cursor-pointer">
                <div className={`aspect-square rounded-[24px] mb-4 overflow-hidden relative border border-slate-800 group-hover:border-blue-500/50 transition-all shadow-xl`}>
                  <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${nft.color} opacity-20`}></div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black border border-white/10 uppercase tracking-widest">
                    SBT ID: #{nft.id}
                  </div>
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{nft.name}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{nft.date}</p>
              </div>
            ))}
          </div>
        )}

        {isTalent && activeTab === 'history' && (
          <div className="glass rounded-3xl border border-slate-800 overflow-hidden shadow-xl animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                    <th className="px-6 py-5">Project</th>
                    <th className="px-6 py-5">Network</th>
                    <th className="px-6 py-5">Reward</th>
                    <th className="px-6 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mockHistory.map(item => (
                    <tr key={item.id} className="text-sm hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-5 font-bold group-hover:text-blue-400 transition-colors">{item.title}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-400 font-medium">
                          <i className="fa-brands fa-ethereum text-[10px] text-blue-500"></i>
                          {item.network}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-black text-white">{item.reward}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isTalent && activeTab === 'portfolio' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map(item => (
                <div key={item.id} className="group relative rounded-[28px] overflow-hidden border border-slate-800 shadow-xl bg-slate-900">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest">{item.title}</span>
                    <button className="text-slate-500 hover:text-red-500 transition-colors">
                      <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div 
                {...getPortfolioProps()} 
                className="h-60 rounded-[28px] border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center cursor-pointer group"
              >
                <input {...getPortfolioInput()} />
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <i className="fa-solid fa-plus text-slate-500 group-hover:text-white"></i>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400">Add Portfolio Image</span>
              </div>
            </div>
          </div>
        )}

        {/* Sponsor Content */}
        {!isTalent && activeTab === 'listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
             {mockSponsorListings.map(listing => (
               <div key={listing.id} className="glass p-6 rounded-[28px] border border-slate-800 hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                     <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${listing.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                       {listing.status}
                     </span>
                     <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                        <i className="fa-brands fa-ethereum text-blue-400"></i>
                        {listing.network}
                     </div>
                  </div>
                  <h3 className="font-bold text-lg mb-4 group-hover:text-blue-400 transition-colors">{listing.title}</h3>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                     <div className="text-xl font-black">{listing.reward}</div>
                     <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:underline">Manage</button>
                  </div>
               </div>
             ))}
             <button 
                onClick={() => onNavigate?.('sponsor-portal')}
                className="h-full min-h-[180px] rounded-[28px] border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center gap-3 group"
             >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <i className="fa-solid fa-plus text-slate-500 group-hover:text-white"></i>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400">Launch New Gig</span>
             </button>
          </div>
        )}

        {!isTalent && activeTab === 'payouts' && (
          <div className="glass rounded-3xl border border-slate-800 overflow-hidden shadow-xl animate-fadeIn">
            <div className="p-8 text-center py-20">
               <i className="fa-solid fa-money-bill-transfer text-4xl text-slate-700 mb-4"></i>
               <p className="text-slate-500 text-sm font-medium">Historical payouts will appear here once finalized on-chain.</p>
            </div>
          </div>
        )}

        {!isTalent && activeTab === 'about' && (
          <div className="glass p-8 rounded-3xl border border-slate-800 animate-fadeIn">
             <h3 className="text-xl font-black uppercase tracking-tight mb-4">About the Organization</h3>
             <p className="text-slate-400 leading-relaxed mb-6 font-medium">
               This organization is a recognized builder in the Ethereum ecosystem, focusing on developer tooling and L2 scalability. 
               We are committed to open-source software and public goods.
             </p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                   <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">HQ Location</div>
                   <div className="text-xs font-bold">Ethereum P2P</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                   <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Employees</div>
                   <div className="text-xs font-bold">20-50</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                   <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Sector</div>
                   <div className="text-xs font-bold">Infrastructure</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                   <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Verified Since</div>
                   <div className="text-xs font-bold">Oct 2023</div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsShareModalOpen(false)}
          ></div>
          <div className="glass w-full max-w-lg p-8 rounded-[40px] border border-slate-800 relative z-110 animate-scaleIn text-center overflow-hidden">
            <button onClick={() => setIsShareModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>

            {isGenerating ? (
              <div className="py-12 px-4 space-y-8 animate-fadeIn">
                <div className="w-20 h-20 bg-blue-600 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/30 animate-pulse">
                  <i className="fa-solid fa-wand-magic-sparkles text-white text-3xl"></i>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Generating Page...</h2>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${generationProgress}%` }}></div>
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn space-y-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-1">{isTalent ? 'Portfolio' : 'Sponsor Profile'} Ready</h2>
                  <p className="text-slate-400 text-xs">Share your verified on-chain history.</p>
                </div>
                {/* Preview Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden mb-8 shadow-2xl">
                   <div className={`h-24 bg-gradient-to-r ${isTalent ? 'from-blue-600 to-indigo-700' : 'from-purple-600 to-indigo-700'} p-4 flex items-end`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border-2 border-white/20 overflow-hidden shadow-lg">
                          <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-white text-left">
                          <div className="font-black text-sm uppercase tracking-tight">{user.username}</div>
                          <div className="text-[8px] font-black uppercase tracking-widest opacity-70">{role} • {user.address}</div>
                        </div>
                      </div>
                   </div>
                   <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                         <div className="text-center">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Rep</div>
                            <div className="text-lg font-black text-white">{user.reputation}</div>
                         </div>
                         <div className="text-center">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{isTalent ? 'Tasks' : 'Gigs'}</div>
                            <div className="text-lg font-black text-white">{isTalent ? user.completedTasks : user.activeGigs}</div>
                         </div>
                         <div className="text-center">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{isTalent ? 'Member' : 'Verified'}</div>
                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-tight mt-1.5">{user.joinDate}</div>
                         </div>
                      </div>
                   </div>
                </div>
                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => shareResume('chat')} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700/50">
                      <i className="fa-solid fa-comment-dots text-blue-500"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Send to Chat</span>
                    </button>
                    <button onClick={() => shareResume('copy')} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700/50">
                      <i className="fa-regular fa-copy text-amber-500"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Copy Link</span>
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => shareResume('x')} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-900 hover:border-slate-600 transition-all"><i className="fa-brands fa-x-twitter text-lg text-white"></i></button>
                    <button onClick={() => shareResume('linkedin')} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-900 hover:border-slate-600 transition-all"><i className="fa-brands fa-linkedin text-lg text-blue-600"></i></button>
                    <button onClick={() => shareResume('email')} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-900 hover:border-slate-600 transition-all"><i className="fa-solid fa-envelope text-lg text-emerald-500"></i></button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal (Existing logic kept, labels adjusted) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="glass w-full max-w-xl p-8 rounded-[40px] border border-slate-800 relative z-110 animate-scaleIn max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">Edit {isTalent ? 'Profile' : 'Org Info'}</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{isTalent ? 'Username' : 'Organization Name'}</label>
                  <input type="text" value={editForm.username} onChange={(e) => setEditForm({...editForm, username: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-medium" placeholder="Name" required />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{isTalent ? 'Avatar Profile Picture' : 'Org Logo'}</label>
                  <div {...getAvatarProps()} className="flex items-center gap-6 p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-blue-500 cursor-pointer transition-all group">
                    <input {...getAvatarInput()} />
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 shrink-0">
                      {editForm.avatarUrl ? <img src={editForm.avatarUrl} alt="avatar preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600"><i className="fa-solid fa-user text-2xl"></i></div>}
                    </div>
                    <div><div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Upload {isTalent ? 'Avatar' : 'Logo'}</div></div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
                  <textarea value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none h-32 transition-all resize-none font-medium leading-relaxed" placeholder="Description..." required />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold transition-all text-xs uppercase tracking-widest">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-xl shadow-blue-900/30">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
