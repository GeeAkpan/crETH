
import React, { useState } from 'react';
import { Listing, ListingType, ListingStatus, BlockchainNetwork, ListingCategory } from '../types';

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Ethereum Protocol Research',
    description: 'Help research and document EIP-4844 impact on blob throughput and fee markets.',
    type: ListingType.PROJECT,
    category: ListingCategory.DEVELOPMENT,
    status: ListingStatus.OPEN,
    rewardAmount: 3000,
    rewardToken: 'USDC',
    network: BlockchainNetwork.ETHEREUM,
    sponsorId: 'ef-research',
    sponsorName: 'Ethereum Foundation',
    deadline: '2024-06-15',
    tags: ['Research', 'EVM', 'Solidity']
  },
  {
    id: '2',
    title: 'DeFi Dashboard Redesign',
    description: 'Create a new UI for a prominent Ethereum lending protocol focusing on accessibility.',
    type: ListingType.BOUNTY,
    category: ListingCategory.DESIGN,
    status: ListingStatus.OPEN,
    rewardAmount: 1500,
    rewardToken: 'USDC',
    network: BlockchainNetwork.ETHEREUM,
    sponsorId: 'defi-dao',
    sponsorName: 'LendProtocol',
    deadline: '2024-05-30',
    tags: ['UI/UX', 'Figma', 'Web3']
  },
  {
    id: '3',
    title: 'Ethereum Security Explainer Video',
    description: 'Produce a 2-minute animation explaining the merge and proof-of-stake security model.',
    type: ListingType.BOUNTY,
    category: ListingCategory.VIDEO,
    status: ListingStatus.OPEN,
    rewardAmount: 2000,
    rewardToken: 'ETH',
    network: BlockchainNetwork.ETHEREUM,
    sponsorId: 'edu-eth',
    sponsorName: 'EthEducation',
    deadline: '2024-06-20',
    tags: ['Video', 'Educational', 'PoS']
  }
];

const CategoryIcon = ({ category }: { category: ListingCategory }) => {
  switch (category) {
    case ListingCategory.DEVELOPMENT: return <i className="fa-solid fa-code text-indigo-500"></i>;
    case ListingCategory.DESIGN: return <i className="fa-solid fa-palette text-rose-500"></i>;
    case ListingCategory.WRITING: return <i className="fa-solid fa-pen-nib text-amber-500"></i>;
    case ListingCategory.VIDEO: return <i className="fa-solid fa-video text-red-500"></i>;
    case ListingCategory.MARKETING: return <i className="fa-solid fa-bullhorn text-emerald-500"></i>;
    case ListingCategory.HACKATHON: return <i className="fa-solid fa-laptop-code text-purple-500"></i>;
    default: return <i className="fa-solid fa-star text-indigo-500"></i>;
  }
};

interface ExploreProps {
  onSelectListing: (id: string) => void;
}

const Explore: React.FC<ExploreProps> = ({ onSelectListing }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = MOCK_LISTINGS.filter(l => 
    (activeCategory === 'All' || l.category === activeCategory) &&
    (l.title.toLowerCase().includes(search.toLowerCase()) || 
     l.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="space-y-10 animate-fadeIn pt-4">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight">Ethereum Board</h1>
          <p className="text-slate-500 font-medium text-lg">Join high-impact projects funded by the biggest names in ETH.</p>
        </div>
        
        <div className="flex flex-wrap gap-2.5 no-scrollbar">
          {['All', ...Object.values(ListingCategory)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/30' 
                  : 'bg-slate-900/50 dark:text-slate-400 light:text-slate-600 border-slate-800 hover:border-indigo-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors"></i>
        <input 
          type="text" 
          placeholder="Search by keyword, tag, or project..." 
          className="w-full bg-slate-900/30 dark:bg-slate-900/50 light:bg-white border dark:border-slate-800 light:border-slate-200 rounded-[32px] py-5 pl-16 pr-8 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-2xl text-lg font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.length > 0 ? filtered.map((listing) => (
          <div 
            key={listing.id} 
            onClick={() => onSelectListing(listing.id)}
            className="glass p-8 rounded-[40px] border border-slate-800/60 hover:border-indigo-500/50 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700">
                   <CategoryIcon category={listing.category} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{listing.category}</div>
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">Mainnet Active</div>
                </div>
              </div>
              <div className="text-2xl font-black font-heading text-emerald-500">
                {listing.rewardAmount.toLocaleString()} <span className="text-xs uppercase opacity-70">{listing.rewardToken}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-black mb-3 group-hover:text-indigo-500 transition-colors uppercase tracking-tight">{listing.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
              {listing.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {listing.tags.map(tag => (
                <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-800/40 text-slate-400 rounded-lg border border-slate-700/50 group-hover:border-indigo-500/30 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-[10px] font-black text-indigo-400">
                  {listing.sponsorName.charAt(0)}
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-tight">{listing.sponsorName}</span>
              </div>
              <div className="px-3 py-1.5 bg-slate-900 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-800">
                <i className="fa-regular fa-clock mr-2 opacity-50"></i>
                {new Date(listing.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-32 text-center glass rounded-[48px] border-dashed">
            <i className="fa-solid fa-ghost text-5xl text-slate-800 mb-6"></i>
            <h3 className="text-2xl font-black text-slate-500 uppercase tracking-tight">No active gigs found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
