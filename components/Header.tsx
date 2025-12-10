import React, { useState, useEffect } from 'react';
import { Language, TEXTS, User } from '../types';
import { Download, Lock, ChevronDown, User as UserIcon, X, Eye } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateHome: () => void;
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const REGIONS = [
  { code: '+1', label: 'US/CA' },
  { code: '+86', label: 'CN' },
  { code: '+44', label: 'UK' },
  { code: '+81', label: 'JP' },
  { code: '+49', label: 'DE' },
  { code: '+33', label: 'FR' },
  { code: '+91', label: 'IN' },
  { code: '+61', label: 'AU' },
];

const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  onNavigateHome,
  users,
  setUsers,
  currentUser,
  setCurrentUser
}) => {
  const t = TEXTS[language];
  const [showTime, setShowTime] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  // Login Modal State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', region: '+1', password: '' });

  // Admin Data Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Admin Check
  const isAdmin = currentUser?.name === 'Henry' && currentUser?.password === '17257mifan';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTitleDoubleClick = () => {
    setShowTime(!showTime);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    // Save to "backend"
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsLoginOpen(false);
    setFormData({ name: '', email: '', phone: '', region: '+1', password: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoginOpen(false);
  };

  const handleDownload = () => {
    if (!isAdmin) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "fai_users_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleArrowDoubleClick = () => {
    if (isAdmin) {
      setIsPreviewOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start select-none pointer-events-none">
        {/* Left Side: Login & Admin Controls (Pointer events enabled) */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800/40 transition-all duration-300"
          >
            <UserIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">{currentUser ? currentUser.name : t.login}</span>
          </button>

          <button
            onClick={handleDownload}
            onDoubleClick={handleArrowDoubleClick}
            className={`flex items-center justify-center w-10 h-10 bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg text-blue-200 transition-all duration-300 ${isAdmin ? 'hover:text-cyan-400 hover:bg-blue-800/40 cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
            title={isAdmin ? "Single click: Download, Double click: Preview" : t.locked}
          >
            {isAdmin ? <ChevronDown className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
          </button>
        </div>

        {/* Center: Title (Pointer events enabled) */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer text-center pointer-events-auto"
          onDoubleClick={handleTitleDoubleClick}
        >
          <h1 
            className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-blue-100 hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {showTime ? currentTime : "Fake Artificial Intelligence"}
          </h1>
          {/* Hit area for home navigation */}
          <div onClick={onNavigateHome} className="h-4 w-full absolute -bottom-2 left-0" />
        </div>

        {/* Right: Language (Pointer events enabled) */}
        <div className="flex gap-4 text-sm font-semibold tracking-wider pointer-events-auto">
          <button 
            onClick={() => setLanguage('ENG')}
            className={`transition-all duration-300 ${language === 'ENG' ? 'text-white border-b-2 border-cyan-400' : 'text-blue-400 hover:text-blue-200'}`}
          >
            ENG
          </button>
          <button 
            onClick={() => setLanguage('CHN')}
            className={`transition-all duration-300 ${language === 'CHN' ? 'text-white border-b-2 border-cyan-400' : 'text-blue-400 hover:text-blue-200'}`}
          >
            CHN
          </button>
        </div>
      </header>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-8 w-96 shadow-2xl relative">
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-cyan-400" />
              {currentUser ? t.logout : t.login}
            </h3>

            {currentUser ? (
              <div className="space-y-6">
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-blue-300">Logged in as:</p>
                  <p className="text-lg font-bold text-white">{currentUser.name}</p>
                  <p className="text-xs text-slate-400">{currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-900/50 hover:bg-red-800/70 border border-red-500/30 text-red-200 rounded-lg font-semibold transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-blue-300 mb-1">{t.name}</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-blue-300 mb-1">{t.email}</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-blue-300 mb-1">{t.phone}</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.region}
                      onChange={e => setFormData({...formData, region: e.target.value})}
                      className="bg-black/50 border border-blue-500/30 rounded-lg px-2 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none"
                    >
                      {REGIONS.map(r => (
                        <option key={r.code} value={r.code}>{r.code} {r.label}</option>
                      ))}
                    </select>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="flex-1 bg-black/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-blue-300 mb-1">{t.password}</label>
                  <input
                    required
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-cyan-900/20"
                >
                  {t.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Data Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 w-[800px] h-[600px] shadow-2xl relative flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                {t.previewData}
              </h3>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-black/50 rounded-lg p-4 border border-white/5">
              <pre className="text-xs md:text-sm font-mono text-cyan-300 whitespace-pre-wrap">
                {JSON.stringify(users, null, 2)}
              </pre>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t.downloadData}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;