
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Listing, ListingType, BlockchainNetwork, ListingCategory, ListingStatus } from '../types';

interface ListingDetailProps {
  id: string;
  onBack: () => void;
  onMessageSponsor: (id: string) => void;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ id, onBack, onMessageSponsor }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Simulated data based on context
  const listing: Listing = {
    id,
    title: id === '1' ? 'Ethereum Protocol Research' : id === '2' ? 'DeFi Dashboard Redesign' : 'Ethereum Q1 Research Paper',
    description: `This is a high-priority task for our ecosystem. 

Requirements:
- High quality deliverables meeting the brief.
- Adherence to brand guidelines where applicable.
- Open-source license (MIT/Apache 2.0).

Judging Criteria:
1. Technical implementation / Creative quality
2. Documentation and ease of use
3. Impact on the community`,
    type: id === '1' ? ListingType.PROJECT : ListingType.BOUNTY,
    category: id === '1' ? ListingCategory.DEVELOPMENT : id === '2' ? ListingCategory.DESIGN : ListingCategory.WRITING,
    status: ListingStatus.OPEN,
    rewardAmount: id === '1' ? 3000 : 1500,
    rewardToken: 'USDC',
    network: BlockchainNetwork.ETHEREUM,
    sponsorId: 'sponsor-123',
    sponsorName: id === '1' ? 'Ethereum Foundation' : 'LendProtocol',
    deadline: '2024-06-15',
    tags: id === '1' ? ['Protocol', 'EVM'] : ['UI/UX', 'Figma']
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate IPFS upload with progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const mockCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 10)}`;
          setFileHash(mockCid);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 52428800, // 50MB
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isBounty = listing.type === ListingType.BOUNTY;

  return (
    <div className="animate-slideUp max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-100 transition-colors group">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span className="text-sm font-semibold uppercase tracking-wider">Back to Board</span>
        </button>
        <button 
          onClick={() => onMessageSponsor(listing.sponsorId)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-400 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
        >
          <i className="fa-solid fa-comment-dots"></i>
          Message Sponsor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <header>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${listing.type === ListingType.BOUNTY ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : listing.type === ListingType.PROJECT ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'}`}>
                {listing.type}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {listing.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {listing.network}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight">{listing.title}</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-500 border border-slate-700 text-sm">
                {listing.sponsorName.charAt(0)}
              </div>
              <div>
                <div className="font-bold">{listing.sponsorName}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <i className="fa-solid fa-circle-check text-blue-500"></i>
                  Verified Project
                </div>
              </div>
            </div>
          </header>

          <section className="glass p-8 rounded-3xl border border-slate-800/50 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-file-lines text-slate-500"></i>
              Project Brief
            </h2>
            <div className="text-slate-400 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {listing.description}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                 <div className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest mb-1">Timeline</div>
                 <div className="text-sm font-bold">Ends June 15, 2024</div>
               </div>
               <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                 <div className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest mb-1">Complexity</div>
                 <div className="text-sm font-bold">Expert</div>
               </div>
            </div>
          </section>

          {!submitted ? (
            <section className="glass p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className={`fa-solid ${isBounty ? 'fa-upload' : 'fa-paper-plane'} text-blue-500`}></i>
                {isBounty ? 'Submit Your Work' : 'Submit Application'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">
                    {isBounty ? 'Describe your submission' : 'Why are you the best fit?'}
                  </label>
                  <textarea 
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none h-40 text-sm leading-relaxed transition-all"
                    placeholder={isBounty ? "Explain what you built or created..." : "Tell the sponsor about your relevant experience and how you plan to tackle this project..."}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">Deliverable File (IPFS Upload)</label>
                    <div 
                      {...getRootProps()}
                      className={`relative min-h-[160px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 group
                        ${isDragActive ? 'bg-blue-600/10 border-blue-500 scale-[1.01]' : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/60'}
                        ${fileHash ? 'border-emerald-500/50 bg-emerald-500/5' : ''}
                      `}
                    >
                      <input {...getInputProps()} />
                      
                      {isUploading ? (
                        <div className="w-full flex flex-col items-center max-w-xs">
                          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-3 overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-300" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm font-bold text-blue-400">Storing {fileName} on IPFS... {uploadProgress}%</p>
                        </div>
                      ) : fileHash ? (
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
                            <i className="fa-solid fa-check text-white text-xl"></i>
                          </div>
                          <p className="text-sm font-bold text-emerald-500 mb-1">{fileName} Uploaded</p>
                          <p className="text-[10px] font-mono text-slate-500 break-all max-w-xs">{fileHash}</p>
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setFileHash(null); setFileName(null); }}
                            className="mt-3 text-[10px] font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest"
                          >
                            Remove and re-upload
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${isDragActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300 group-hover:bg-slate-700'}`}>
                            <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-slate-300 mb-1">
                              {isDragActive ? 'Drop file to upload' : 'Drag & drop files here'}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">
                              Supports any file up to 50MB
                            </p>
                          </div>
                          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-50">
                            <i className="fa-solid fa-shield-halved text-[10px] text-blue-500"></i>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Encrypted on IPFS</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">Submission Link (e.g. Github)</label>
                    <div className="relative group">
                      <i className="fa-solid fa-link absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors"></i>
                      <input 
                        type="url"
                        className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition-all"
                        placeholder="Link to code repository or demo"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isUploading || (isBounty && !fileHash)}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-extrabold transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-[0.98]"
                >
                  <i className={`fa-solid ${isBounty ? 'fa-bolt' : 'fa-paper-plane'}`}></i>
                  {isBounty ? 'Submit Work' : 'Apply for Project'}
                </button>
              </form>
            </section>
          ) : (
            <div className="p-12 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl text-center animate-fadeIn shadow-lg">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30">
                <i className="fa-solid fa-check text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl font-black mb-3">Work Submitted!</h3>
              <p className="text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
                Your deliverable is now securely pinned on IPFS and indexed for {listing.sponsorName}. You'll be notified of the outcome via your wallet address.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="px-6 py-3 rounded-xl border border-slate-800 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                  Edit Submission
                </button>
                <button 
                  onClick={onBack} 
                  className="px-6 py-3 bg-blue-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-slate-800 sticky top-24 shadow-2xl">
            <div className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest mb-1">Total Reward Pool</div>
            <div className="text-4xl font-extrabold text-white flex items-baseline gap-2 mb-6">
              {listing.rewardAmount.toLocaleString()} <span className="text-blue-500 text-xl font-bold uppercase">{listing.rewardToken}</span>
            </div>

            <div className="space-y-4 mb-6 pt-6 border-t border-slate-800/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Ecosystem</span>
                <span className="font-bold flex items-center gap-2">
                   <i className="fa-brands fa-ethereum text-blue-500"></i>
                   {listing.network}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Locked in Escrow</span>
                <span className="text-emerald-500 flex items-center gap-1.5 font-bold">
                  <i className="fa-solid fa-lock text-[10px]"></i> 
                  Verified
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Submissions</span>
                <span className="font-bold">14 Active</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/50">
               <div className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest mb-3">On-Chain Reputation</div>
               <div className="group relative flex items-center gap-3 p-4 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all cursor-help">
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                   <i className="fa-solid fa-fingerprint text-xl"></i>
                 </div>
                 <div className="text-[11px] leading-tight text-slate-300 font-medium">
                   Earn a <strong>Soulbound NFT</strong> as proof of completion for your profile.
                 </div>
               </div>
            </div>
          </div>
          
          <div className="p-6 rounded-3xl border border-blue-900/30 bg-blue-950/20">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-[10px]"></i>
              Submission Privacy
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your IPFS CID is stored on-chain. Deliverables are public but owners retain IP rights until the reward is distributed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
