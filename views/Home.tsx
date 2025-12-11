import React from 'react';
import { TEXTS, Language, ViewState } from '../types';
import { Box, Layers, ExternalLink, Cpu } from 'lucide-react';

interface HomeProps {
  language: Language;
  setViewState: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ language, setViewState }) => {
  const t = TEXTS[language];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen w-full gap-8 md:gap-12 p-4 animate-in fade-in duration-1000 relative">
      
      <button 
        onClick={() => setViewState(ViewState.MY_PRODUCTS)}
        className="group relative flex flex-col items-center justify-center w-64 h-64 border border-blue-500/30 rounded-2xl bg-black/20 backdrop-blur-sm hover:bg-blue-900/20 hover:border-blue-400 transition-all duration-500 hover:scale-105"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Box className="w-12 h-12 text-blue-300 mb-4 group-hover:text-cyan-300 transition-colors" />
        <span className="text-xl font-light tracking-[0.2em] text-blue-100 group-hover:text-white uppercase">
          {t.products}
        </span>
      </button>

      <button 
        onClick={() => setViewState(ViewState.ABOUT_IT)}
        className="group relative flex flex-col items-center justify-center w-64 h-64 border border-blue-500/30 rounded-2xl bg-black/20 backdrop-blur-sm hover:bg-blue-900/20 hover:border-blue-400 transition-all duration-500 hover:scale-105"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Layers className="w-12 h-12 text-blue-300 mb-4 group-hover:text-cyan-300 transition-colors" />
        <span className="text-xl font-light tracking-[0.2em] text-blue-100 group-hover:text-white uppercase">
          {t.about}
        </span>
      </button>

      <button 
        onClick={() => setViewState(ViewState.SILICON_SIM)}
        className="group relative flex flex-col items-center justify-center w-64 h-64 border border-orange-500/30 rounded-2xl bg-black/20 backdrop-blur-sm hover:bg-orange-900/20 hover:border-orange-400 transition-all duration-500 hover:scale-105"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Cpu className="w-12 h-12 text-orange-300 mb-4 group-hover:text-orange-200 transition-colors" />
        <span className="text-lg font-light tracking-widest text-orange-100 group-hover:text-white uppercase text-center px-2">
          {t.simTitle}
        </span>
      </button>

      <a 
        href="https://www.oscarstudio.cn" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-8 left-8 flex items-center gap-2 text-blue-400/60 hover:text-white text-sm font-light tracking-wider transition-all duration-300 hover:scale-105"
      >
        <span className="border-b border-transparent hover:border-blue-300 pb-0.5">{t.visitFriend}</span>
        <ExternalLink className="w-3 h-3 opacity-70" />
      </a>

    </div>
  );
};

export default Home;