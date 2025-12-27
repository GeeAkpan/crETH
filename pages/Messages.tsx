
import React, { useState, useEffect, useRef } from 'react';

// XMTP Message structure simulation
interface Message {
  id: string;
  senderAddress: string;
  text: string;
  sentAt: Date;
  isMe: boolean;
}

interface Conversation {
  peerAddress: string;
  lastMessage?: string;
  lastMessageDate?: Date;
  unreadCount: number;
  peerName?: string;
  peerAvatar?: string;
}

const Messages: React.FC = () => {
  const [isXmtpInitialized, setIsXmtpInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      peerAddress: '0x1234...5678',
      peerName: 'Ethereum Foundation',
      peerAvatar: 'EF',
      lastMessage: 'Regarding your protocol research submission...',
      lastMessageDate: new Date(Date.now() - 3600000),
      unreadCount: 1,
    },
    {
      peerAddress: '0xabcd...efgh',
      peerName: 'LendProtocol Admin',
      peerAvatar: 'LP',
      lastMessage: 'The award has been released to escrow.',
      lastMessageDate: new Date(Date.now() - 86400000),
      unreadCount: 0,
    }
  ]);

  // Mock messages for the active conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderAddress: '0x1234...5678',
      text: "Hi! We saw your submission for the protocol research bounty.",
      sentAt: new Date(Date.now() - 7200000),
      isMe: false,
    },
    {
      id: '2',
      senderAddress: '0x4c...8e2',
      text: "Great! Let me know if you need any additional documentation or test results.",
      sentAt: new Date(Date.now() - 3600000),
      isMe: true,
    },
    {
      id: '3',
      senderAddress: '0x1234...5678',
      text: "Regarding your protocol research submission, could you clarify the blob throughput calculations on slide 4?",
      sentAt: new Date(Date.now() - 1800000),
      isMe: false,
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isXmtpInitialized) {
      scrollToBottom();
    }
  }, [messages, isXmtpInitialized]);

  const handleInitializeXmtp = () => {
    setIsInitializing(true);
    // Simulate signature and keys derivation
    setTimeout(() => {
      setIsInitializing(false);
      setIsXmtpInitialized(true);
      setActiveConversation(conversations[0].peerAddress);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderAddress: '0x4c...8e2',
      text: messageText,
      sentAt: new Date(),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
    
    // Update last message in list
    if (activeConversation) {
      setConversations(prev => prev.map(c => 
        c.peerAddress === activeConversation 
          ? { ...c, lastMessage: messageText, lastMessageDate: new Date() } 
          : c
      ));
    }
  };

  const startNewChat = (address: string) => {
    const existing = conversations.find(c => c.peerAddress === address);
    if (existing) {
      setActiveConversation(address);
    } else {
      const newConv: Conversation = {
        peerAddress: address,
        peerName: address.startsWith('0x') ? `${address.substring(0, 6)}...${address.substring(38)}` : address,
        peerAvatar: '??',
        unreadCount: 0,
        lastMessage: 'New encrypted conversation started',
        lastMessageDate: new Date(),
      };
      setConversations([newConv, ...conversations]);
      setActiveConversation(address);
    }
    setSearchQuery('');
  };

  const filteredConversations = conversations.filter(c => 
    c.peerName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.peerAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAddress = (q: string) => /^0x[a-fA-F0-9]{40}$/.test(q);

  if (!isXmtpInitialized) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center animate-fadeIn">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/30">
          <i className="fa-solid fa-shield-halved text-4xl text-white"></i>
        </div>
        <h1 className="text-3xl font-black mb-4 uppercase tracking-tight">Encrypted Messaging</h1>
        <p className="text-slate-400 max-w-md mb-8 leading-relaxed font-medium">
          EtherLancer uses the <strong>XMTP Protocol</strong> for end-to-end encrypted direct messaging. 
          Initialize your client to securely chat with sponsors and talent.
        </p>
        <button 
          onClick={handleInitializeXmtp}
          disabled={isInitializing}
          className="px-10 py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3 active:scale-95"
        >
          {isInitializing ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            <i className="fa-solid fa-key"></i>
          )}
          {isInitializing ? 'Generating Secure Keys...' : 'Initialize Secure Inbox'}
        </button>
        <p className="mt-6 text-[10px] text-slate-600 font-black uppercase tracking-widest">
          Requires one-time wallet signature
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-160px)] flex bg-slate-900/40 rounded-[32px] border border-slate-800 overflow-hidden shadow-2xl animate-fadeIn">
      {/* Sidebar: Conversations */}
      <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-950/20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black uppercase tracking-tight">Messages</h2>
            <button 
              onClick={() => startNewChat('0x' + Math.random().toString(16).substr(2, 40))}
              className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all shadow-lg shadow-blue-600/20"
              title="New Message"
            >
              <i className="fa-solid fa-plus text-xs"></i>
            </button>
          </div>
          <div className="relative group">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs group-focus-within:text-blue-500 transition-colors"></i>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or 0x..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {searchQuery && !filteredConversations.length && isAddress(searchQuery) && (
            <button
              onClick={() => startNewChat(searchQuery)}
              className="w-full p-4 flex flex-col gap-2 items-center text-center hover:bg-blue-600/5 border-b border-slate-800"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Start chat with this address
              </div>
            </button>
          )}

          {filteredConversations.length > 0 ? filteredConversations.map((conv) => (
            <button
              key={conv.peerAddress}
              onClick={() => setActiveConversation(conv.peerAddress)}
              className={`w-full p-5 flex gap-4 text-left transition-all border-b border-slate-800/50 hover:bg-slate-800/30 group ${
                activeConversation === conv.peerAddress ? 'bg-blue-600/5 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-xs font-black text-blue-500 border border-slate-700 shrink-0 group-hover:scale-105 transition-transform">
                {conv.peerAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`font-black text-sm truncate uppercase tracking-tight ${activeConversation === conv.peerAddress ? 'text-blue-400' : 'text-slate-100'}`}>{conv.peerName}</span>
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">1h</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate leading-relaxed font-medium">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unreadCount > 0 && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 self-center shadow-lg shadow-blue-500/50"></div>
              )}
            </button>
          )) : !searchQuery && (
            <div className="p-8 text-center text-slate-600">
              <i className="fa-solid fa-ghost text-3xl mb-3 opacity-20"></i>
              <p className="text-[10px] font-black uppercase tracking-widest">No active chats</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900/20">
        {activeConversation ? (
          <>
            <header className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/20 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-xs font-black text-blue-400 border border-blue-500/10">
                  {conversations.find(c => c.peerAddress === activeConversation)?.peerAvatar}
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight">{conversations.find(c => c.peerAddress === activeConversation)?.peerName}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Encrypted via XMTP</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors border border-slate-700/50">
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </button>
                <button className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors border border-slate-700/50">
                  <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              <div className="text-center py-4">
                <span className="px-3 py-1 bg-slate-800/50 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-700/30">
                  Conversation established on-chain
                </span>
              </div>
              
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-slideInRight`}
                >
                  <div className={`max-w-[75%] rounded-[24px] px-5 py-4 text-sm leading-relaxed font-medium ${
                    msg.isMe 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-900/20' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-2 font-black uppercase tracking-widest flex items-center gap-1.5 ${msg.isMe ? 'text-blue-100' : 'text-slate-500'}`}>
                      {msg.sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.isMe && <i className="fa-solid fa-check-double text-[8px]"></i>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-6 border-t border-slate-800 bg-slate-950/20">
              <div className="flex gap-4">
                <button type="button" className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors border border-slate-700/50">
                  <i className="fa-solid fa-paperclip text-lg"></i>
                </button>
                <div className="flex-1 relative">
                   <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your secure message..." 
                    className="w-full h-12 bg-slate-900 border border-slate-800 rounded-2xl px-5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pr-12"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <i className="fa-solid fa-face-smile text-slate-600 hover:text-blue-500 cursor-pointer"></i>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={!messageText.trim()}
                  className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all shadow-xl shadow-blue-900/30 active:scale-95"
                >
                  <i className="fa-solid fa-paper-plane text-lg"></i>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600 animate-fadeIn">
            <div className="w-20 h-20 rounded-[28px] bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 opacity-40">
              <i className="fa-solid fa-comments text-4xl"></i>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest max-w-[200px] text-center leading-relaxed">Select a conversation to start chatting securely</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
