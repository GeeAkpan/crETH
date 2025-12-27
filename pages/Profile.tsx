
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UserRole } from '../types';

interface ProfileProps {
  onNavigate?: (page: string) => void;
  role: UserRole;
  privacySettings?: { publicRep: boolean; hideEarnings: boolean };
  user: any;
  setUser: (user: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, role, privacySettings, user, setUser }) => {
  const isTalent = role === UserRole.TALENT;
  const [activeTab, setActiveTab] = useState<string>(isTalent ? 'nfts' : 'listings');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const [shareProgress, setShareProgress] = useState(0);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(isTalent ? 'nfts' : 'listings');
  }, [isTalent]);

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
    setStorageError(null);
    setIsEditModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStorageError(null);

    // Simulate on-chain update delay
    setTimeout(() => {
      try {
        setUser({
          ...user,
          username: editForm.username,
          bio: editForm.bio,
          avatarUrl: editForm.avatarUrl,
          bannerUrl: editForm.bannerUrl
        });
        
        // Success check (if the previous line didn't throw an error in the parent state update)
        setTimeout(() => {
          setIsSaving(false);
          setIsEditModalOpen(false);
        }, 500);
      } catch (err) {
        console.error("Save failed:", err);
        setStorageError("Failed to persist images. Try smaller file sizes.");
        setIsSaving(false);
      }
    }, 1200);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
    setIsGeneratingShare(true);
    setShareProgress(0);
  };

  useEffect(() => {
    if (isGeneratingShare) {
      const interval = setInterval(() => {
        setShareProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsGeneratingShare(false), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isGeneratingShare]);

  const handleFileRead = (file: File, callback: (result: string) => void) => {
    // Check for large files (> 2MB) which are risky for localStorage
    if (file.size > 2 * 1024 * 1024) {
      setStorageError("Warning: File is very large and might not persist after refresh.");
    } else {
      setStorageError(null);
    }
    
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onDropAvatar = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) handleFileRead(file, (data) => setEditForm(prev => ({ ...prev, avatarUrl: data })));
  }, []);

  const onDropBanner = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) handleFileRead(file, (data) => setEditForm(prev => ({ ...prev, bannerUrl: data })));
  }, []);

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

  const sharePortfolio = (platform: string) => {
    const url = `https://creth.app/profile/${user.username.toLowerCase()}`;
    const text = `Check out my Proof-of-Work portfolio on crETH! 🚀 #Ethereum #Web3`;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const currentTabs = isTalent 
    ? [ { id: 'nfts', label: 'Vault', icon: 'fa-fingerprint' }, { id: 'portfolio', label: 'Portfolio', icon: 'fa-images' } ] 
    : [ { id: 'listings', label: 'Active Gigs', icon: 'fa-layer-group' } ];

  const mockNFTs = [
    { id: 1, name: 'Optimism Governance Guru', date: 'March 2024', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop', color: 'from-red-500 to-red-800' },
    { id: 2, name: 'Arbitrum Security Warden', date: 'Feb 2024', image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=200&h=200&fit=crop', color: 'from-blue-500 to-indigo-800' },
    { id: 3, name: 'Base Bridge Builder', date: 'Jan 2024', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop', color: 'from-blue-400 to-blue-600' },
    { id: 4, name: 'Mainnet Mastermind', date: 'Dec 2023', image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=200&h=200&fit=crop', color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="animate-fadeIn space-y-8 relative pb-20">
      <div className="glass rounded-[32px] border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="h-48 w-full relative overflow-hidden group">
          <img src={user.bannerUrl} alt="banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={handleOpenModal} className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl text-white border border-white/10 flex items-center gap-2 hover:bg-black/80 transition-all">
              <i className="fa-solid fa-camera text-xs"></i>
              <span className="text-[10px] font-black uppercase tracking-widest">Update Banner</span>
            </button>
          </div>
        </div>
        
        <div className="p-8 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-slate-950">
                  <img src={user.avatarUrl} className="w-full h-full object-cover" alt="avatar" />
                </div>
              </div>
              <button onClick={handleOpenModal} className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full border-2 border-slate-950 flex items-center justify-center text-white text-xs hover:bg-indigo-500 transition-colors shadow-lg">
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-black tracking-tight">{user.username}</h1>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-600/10 text-indigo-500 border border-indigo-600/20">{role}</span>
              </div>
              <p className="text-slate-400 max-w-2xl leading-relaxed mb-4 text-sm font-medium">{user.bio}</p>
              <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-2 text-indigo-400"><i className="fa-solid fa-award"></i> {user.reputation} Rep</div>
                <div className="flex items-center gap-2 text-emerald-400"><i className="fa-solid fa-check-double"></i> {user.completedTasks} Tasks</div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto pb-2">
              <button onClick={handleOpenModal} className="flex-1 md:flex-none px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <i className="fa-solid fa-user-pen"></i> Edit Profile
              </button>
              <button onClick={handleShareClick} className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/20">
                <i className="fa-solid fa-share-nodes"></i> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex border-b border-slate-800">
          {currentTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>
              <i className={`fa-solid ${tab.icon} mr-2`}></i> {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>}
            </button>
          ))}
        </div>

        {activeTab === 'nfts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {mockNFTs.map(nft => (
              <div key={nft.id} className="group cursor-pointer">
                <div className={`aspect-square rounded-[24px] mb-4 overflow-hidden relative border border-slate-800 group-hover:border-indigo-500/50 transition-all shadow-xl`}>
                  <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${nft.color} opacity-20`}></div>
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{nft.name}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{nft.date}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="py-20 text-center glass rounded-[40px] border border-dashed border-slate-800">
            <i className="fa-solid fa-images text-4xl text-slate-800 mb-4"></i>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-500">Upload Your Portfolio</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium">Coming Soon: Host your projects on-chain with crETH Drive.</p>
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-fadeIn" onClick={() => !isSaving && setIsEditModalOpen(false)}></div>
          <div className="relative glass w-full max-w-xl rounded-[40px] border border-slate-800 shadow-2xl overflow-hidden animate-blurReveal">
            <header className="px-8 py-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
              <h2 className="text-lg font-black uppercase tracking-tight">Identity Terminal</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </header>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              {storageError && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-3">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {storageError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                   <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Avatar</label>
                   <div {...getAvatarProps()} className="w-full aspect-square rounded-3xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all overflow-hidden cursor-pointer relative group flex items-center justify-center">
                     <input {...getAvatarInput()} />
                     {editForm.avatarUrl ? (
                        <>
                          <img src={editForm.avatarUrl} className="absolute inset-0 w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center"><i className="fa-solid fa-camera text-white"></i></div>
                        </>
                     ) : <i className="fa-solid fa-user text-slate-800 text-3xl"></i>}
                   </div>
                </div>
                <div className="md:col-span-2">
                   <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Banner</label>
                   <div {...getBannerProps()} className="w-full h-32 rounded-3xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all overflow-hidden cursor-pointer relative group flex items-center justify-center">
                     <input {...getBannerInput()} />
                     {editForm.bannerUrl ? (
                        <>
                          <img src={editForm.bannerUrl} className="absolute inset-0 w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center"><i className="fa-solid fa-image text-white"></i></div>
                        </>
                     ) : <i className="fa-solid fa-image text-slate-800 text-3xl"></i>}
                   </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Username</label>
                <input 
                  type="text" 
                  value={editForm.username} 
                  onChange={e => setEditForm({...editForm, username: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Transmission Bio</label>
                <textarea 
                  value={editForm.bio} 
                  onChange={e => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm font-medium h-24 resize-none focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 bg-slate-800 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Cancel</button>
                <button type="submit" disabled={isSaving} className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2">
                  {isSaving ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-check"></i>}
                  {isSaving ? 'Syncing...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isShareModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-fadeIn" onClick={() => setIsShareModalOpen(false)}></div>
          <div className="relative glass w-full max-w-sm rounded-[56px] border border-indigo-500/20 shadow-[0_0_120px_rgba(79,70,229,0.2)] p-10 text-center animate-blurReveal">
            {isGeneratingShare ? (
              <div className="space-y-8 py-8">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-indigo-500"><i className="fa-solid fa-share-nodes text-2xl"></i></div>
                </div>
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tight mb-2">Generating Link</h3>
                   <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${shareProgress}%` }}></div>
                   </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-indigo-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-600/30">
                  <i className="fa-brands fa-ethereum text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Share Portfolio</h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">Verified Proof-of-Work</p>
                
                <div className="space-y-3">
                  <button onClick={() => sharePortfolio('x')} className="w-full py-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3">
                    <i className="fa-brands fa-x-twitter"></i> Post to X
                  </button>
                  <button onClick={() => sharePortfolio('copy')} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20">
                    <i className="fa-solid fa-link"></i> Copy URL
                  </button>
                </div>
                <button onClick={() => setIsShareModalOpen(false)} className="mt-8 text-slate-500 hover:text-white text-[9px] font-black uppercase tracking-widest">Close Terminal</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
