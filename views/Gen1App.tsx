import React, { useState, useRef, useEffect } from 'react';
import { TEXTS, Language, ViewState } from '../types';
import { generateIrrelevantResponse } from '../services/geminiService';
import { Settings, Sparkles, Send } from 'lucide-react';
import BackButton from '../components/BackButton';

interface Gen1AppProps {
  language: Language;
  onBack: () => void;
}

const MODELS = [
  "GPT-4o",
  "Claude 3.5 Sonnet",
  "Gemini 1.5 Pro",
  "Llama 3 70B",
  "Mistral Large",
  "FAI Chaos Engine"
];

const Gen1App: React.FC<Gen1AppProps> = ({ language, onBack }) => {
  const t = TEXTS[language];
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[5]);
  const [thinkingTime, setThinkingTime] = useState(2000);
  const [showSettings, setShowSettings] = useState(false);
  const [tempThinkingTime, setTempThinkingTime] = useState(2000);

  const handleTitleDoubleClick = () => {
    setTempThinkingTime(thinkingTime);
    setShowSettings(true);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, thinkingTime));

    const result = await generateIrrelevantResponse(input);
    
    // Typewriter effect
    let i = 0;
    const typeWriter = setInterval(() => {
        setResponse(result.substring(0, i + 1));
        i++;
        if (i === result.length) {
            clearInterval(typeWriter);
            setIsLoading(false);
        }
    }, 30);
  };

  const saveSettings = () => {
    setThinkingTime(tempThinkingTime);
    setShowSettings(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 relative animate-in fade-in zoom-in duration-500">
      
      <BackButton onClick={onBack} language={language} />

      {/* Title Area */}
      <div 
        className="absolute top-24 md:top-32 right-8 md:right-16 cursor-pointer select-none group"
        onDoubleClick={handleTitleDoubleClick}
      >
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300 opacity-80 group-hover:opacity-100 transition-opacity">
          {t.gen1}
        </h2>
        <div className="text-xs text-right text-blue-400 opacity-0 group-hover:opacity-60 transition-opacity">
          (Double click to config)
        </div>
      </div>

      {/* Main Interface */}
      <div className="w-full max-w-2xl z-10">
        
        {/* Output Area */}
        <div className="min-h-[200px] mb-8 p-6 rounded-2xl bg-black/40 border border-blue-500/20 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
           {isLoading && !response ? (
             <div className="flex items-center gap-3 text-cyan-400 animate-pulse">
               <Sparkles className="w-5 h-5" />
               <span className="text-sm font-mono">{t.thinking}</span>
             </div>
           ) : (
             <p className="text-lg md:text-xl text-blue-50 font-light leading-relaxed">
               {response}
             </p>
           )}
        </div>

        {/* Input Area */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-black rounded-xl border border-white/10 flex items-center p-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.inputPlaceholder}
              className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-blue-500/50"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selector (Fake) */}
        <div className="mt-6 flex justify-center">
           <div className="relative">
             <select 
               value={selectedModel}
               onChange={(e) => setSelectedModel(e.target.value)}
               className="appearance-none bg-black/50 border border-blue-500/30 text-blue-300 text-sm py-2 pl-4 pr-10 rounded-full focus:outline-none focus:border-cyan-500 cursor-pointer hover:bg-black/70 transition-colors"
             >
               {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
             </div>
           </div>
        </div>

      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-8 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              Settings
            </h3>
            
            <div className="mb-8">
              <label className="block text-sm text-blue-300 mb-2">{t.setThinkingTime}</label>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={tempThinkingTime}
                onChange={(e) => setTempThinkingTime(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="text-right text-cyan-400 mt-2 font-mono">{tempThinkingTime}ms</div>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveSettings}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gen1App;