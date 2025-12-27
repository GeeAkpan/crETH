
import React, { useState, useEffect, useRef } from 'react';

// Mock Registry of users on the network to simulate "searching for usernames"
const MOCK_USER_REGISTRY = [
  { address: '0x1111222233334444555566667777888899990000', username: 'vitalik.eth', avatar: 'V' },
  { address: '0x3333444455556666777788889999000011112222', username: 'cryptopunk_99', avatar: 'CP' },
  { address: '0x5555666677778888999900001111222233334444', username: 'base_builder', avatar: 'BB' },
  { address: '0x7777888899990000111122223333444455556666', username: 'optimism_prime', avatar: 'OP' },
  { address: 'ef-research', username: 'EF Research Pool', avatar: 'EF' },
  { address: 'defi-dao', username: 'LendProtocol Core', avatar: 'LP' },
];

interface Message {
  id: string;
  senderAddress: string;
  text: string;
  sentAt: string; // Stored as string for JSON persistence
  isMe: boolean;
}

interface Conversation {
  peerAddress: string;
  lastMessage?: string;
  lastMessageDate?: string;
  unreadCount: number;
  peerName?: string;
  peerAvatar?: string;
  isNew?: boolean;
  messages: Message[];
}

interface MessagesProps {
  initialPeer?: string | null;
}

const STORAGE_KEY = 'creth_conversations_v1';

const Messages: React.FC<MessagesProps> = ({ initialPeer }) => {
  const [isXmtpInitialized, setIsXmtpInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from local storage or use defaults
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse conversations", e);
      }
    }
    return [
      {
        peerAddress: '0x1234567890abcdef1234567890abcdef12345678',
        peerName: 'Ethereum Foundation',
        peerAvatar: 'EF',
        lastMessage: 'Regarding your protocol research submission...',
        lastMessageDate: new Date(Date.now() - 3600000).toISOString(),
        unreadCount: 1,
        messages: [
          {
            id: '1',
            senderAddress: '0x1234567890abcdef1234567890abcdef12345678',
            text: "Hi! We saw your submission for the protocol research bounty.",
            sentAt: new Date(Date.now() - 7200000).toISOString(),
            isMe: false,
          },
          {
            id: '2',
            senderAddress: '0x4c21...8e2',
            text: "Great! Let me know if you need any additional documentation.",
            sentAt: new Date(Date.now() - 3600000).toISOString(),
            isMe: true,
          }
        ]
      }
    ];
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isXmtpInitialized) {
      scrollToBottom();
    }
  }, [activeConversation, conversations, isXmtpInitialized]);

  // Handle incoming deep-linked peer
  useEffect(() => {
    if (initialPeer && isXmtpInitialized) {
      startNewChat(initialPeer);
    }
  }, [initialPeer, isXmtpInitialized]);

  const handleInitializeXmtp = () => {
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      setIsXmtpInitialized(true);
      // If we have an initial peer, open it, otherwise open the first conversation
      if (initialPeer) {
        startNewChat(initialPeer);
      } else if (conversations.length > 0) {
        setActiveConversation(conversations[0].peerAddress);
      }
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderAddress: '0x4c21...8e2',
      text: messageText,
      sentAt: new Date().toISOString(),
      isMe: true,
    };

    setConversations(prev => prev.map(c => 
      c.peerAddress === activeConversation 
        ? { 
            ...c, 
            messages: [...c.messages, newMessage], 
            lastMessage: messageText, 
            lastMessageDate: new Date().toISOString(),
            isNew: false 
          } 
        : c
    ));
    setMessageText('');
  };

  const startNewChat = (address: string, name?: string, avatar?: string) => {
    const existing = conversations.find(c => c.peerAddress === address);
    if (existing) {
      setActiveConversation(address);
    } else {
      // Find info in registry if not provided
      const registryEntry = MOCK_USER_REGISTRY.find(u => u.address === address);
      const newConv: Conversation = {
        peerAddress: address,
        peerName: name || registryEntry?.username || (address.length > 10 ? `${address.substring(0, 6)}...${address.substring(38)}` : address),
        peerAvatar: avatar || registryEntry?.avatar || '??',
        unreadCount: 0,
        isNew: true, 
        messages: [],
        lastMessageDate: new Date().toISOString(),
      };
      setConversations([newConv, ...conversations]);
      setActiveConversation(address);
    }
    setSearchQuery('');
    setShowMobileChat(true);
  };

  const currentChat = conversations.find(c => c.peerAddress === activeConversation);

  // Search results from registry
  const registryResults = MOCK_USER_REGISTRY.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConversations = conversations.filter(c => 
    c.peerName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.peerAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isXmtpInitialized) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center animate-fadeIn px-6">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-600/30">
          <i className="fa-solid fa-shield-halved text-3xl md:text-4xl text-white"></i>
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight">Encrypted Terminal</h1>
        <p className="text-slate-400 max-w-md mb-8 leading-relaxed font-medium text-sm md:text-base">
          Initialize your secure inbox to chat with builders and sponsors across the Ethereum ecosystem.
        </p>
        <button 
          onClick={handleInitializeXmtp}
          disabled={isInitializing}
          className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-3 active:scale-95"
        >
          {isInitializing ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-key"></i>}
          {isInitializing ? 'Generating Keys...' : 'Initialize XMTP'}
        </button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] flex flex-col md:flex-row bg-slate-900/40 rounded-[24px] md:rounded-[32px] border border-slate-800 overflow-hidden shadow-2xl animate-fadeIn">
      
      {/* Sidebar: Conversations */}
      <div className={`${showMobileChat ? 'hidden' : 'flex'} md:flex w-full md:w-80 border-r border-slate-800 flex-col bg-slate-950/20`}>
        <div className="p-4 md:p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">Messages</h2>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white"><i className="fa-solid fa-plus text-xs"></i></button>
          </div>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users or addresses..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {searchQuery && registryResults.length > 0 && (
            <div className="p-2">
              <div className="text-[9px] font-black text-indigo-500 uppercase tracking-widest px-3 mb-2">Network Registry</div>
              {registryResults.map(user => (
                <button
                  key={user.address}
                  onClick={() => startNewChat(user.address, user.username, user.avatar)}
                  className="w-full p-3 flex items-center gap-3 hover:bg-indigo-500/10 rounded-xl transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400">{user.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-white truncate">{user.username}</div>
                    <div className="text-[8px] text-slate-500 truncate">{user.address}</div>
                  </div>
                </button>
              ))}
              <div className="h-px bg-slate-800 my-2 mx-3"></div>
            </div>
          )}

          {filteredConversations.length > 0 ? filteredConversations.map((conv) => (
            <button
              key={conv.peerAddress}
              onClick={() => { setActiveConversation(conv.peerAddress); setShowMobileChat(true); }}
              className={`w-full p-4 md:p-5 flex gap-4 text-left transition-all border-b border-slate-800/50 hover:bg-slate-800/30 group ${
                activeConversation === conv.peerAddress ? 'bg-indigo-600/5 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-indigo-500 border border-slate-700 shrink-0">
                {conv.peerAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`font-black text-sm truncate uppercase tracking-tight ${activeConversation === conv.peerAddress ? 'text-indigo-400' : 'text-slate-100'}`}>{conv.peerName}</span>
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                    {conv.lastMessageDate ? new Date(conv.lastMessageDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate leading-relaxed font-medium">
                  {conv.isNew ? <span className="text-indigo-500 italic">No messages yet</span> : conv.lastMessage}
                </p>
              </div>
            </button>
          )) : !searchQuery && (
            <div className="p-8 text-center text-slate-700">
              <i className="fa-solid fa-ghost text-3xl mb-3 opacity-20"></i>
              <p className="text-[10px] font-black uppercase tracking-widest">Inbox is empty</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${!showMobileChat ? 'hidden' : 'flex'} md:flex flex-1 flex-col min-w-0 bg-slate-950/20`}>
        {activeConversation && currentChat ? (
          <>
            <header className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/40 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <button onClick={() => setShowMobileChat(false)} className="md:hidden w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-xs font-black text-indigo-400 border border-indigo-500/10">
                  {currentChat.peerAvatar}
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-tight">{currentChat.peerName}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">Encrypted Terminal</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 text-xs border border-slate-700/50">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-fixed opacity-90">
              {currentChat.isNew && currentChat.messages.length === 0 && (
                <div className="animate-blurReveal">
                  <div className="max-w-md mx-auto p-6 rounded-3xl bg-indigo-600/5 border border-indigo-500/20 text-center space-y-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-indigo-600/20">
                      <i className="fa-solid fa-hand-sparkles"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">First Connection</h4>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        This is your first time chatting with <strong>{currentChat.peerName}</strong>. 
                        Messages are end-to-end encrypted and persistent.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-blurReveal`}
                >
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-[20px] md:rounded-[24px] px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm leading-relaxed font-medium ${
                    msg.isMe 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-900/20' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}>
                    {msg.text}
                    <div className={`text-[8px] md:text-[9px] mt-2 font-black uppercase tracking-widest flex items-center gap-1.5 ${msg.isMe ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.isMe && <i className="fa-solid fa-check-double"></i>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/40">
              <div className="flex gap-3 md:gap-4 items-center">
                <input 
                  type="text" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type secure message..." 
                  className="flex-1 h-12 bg-slate-900 border border-slate-800 rounded-2xl px-5 text-xs md:text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!messageText.trim()}
                  className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all shadow-xl shadow-indigo-900/30 active:scale-95 shrink-0"
                >
                  <i className="fa-solid fa-paper-plane text-base"></i>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-700 animate-fadeIn p-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 opacity-30">
              <i className="fa-solid fa-comments text-2xl"></i>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center">Select a secure node to begin transmission</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
