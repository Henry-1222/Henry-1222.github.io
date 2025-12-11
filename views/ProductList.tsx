import React from 'react';
import { TEXTS, Language, ViewState } from '../types';
import { ArrowRight, Cpu } from 'lucide-react';
import BackButton from '../components/BackButton';

interface ProductListProps {
  language: Language;
  setViewState: (view: ViewState) => void;
  mode: 'PRODUCTS' | 'ABOUT';
}

const ProductList: React.FC<ProductListProps> = ({ language, setViewState, mode }) => {
  const t = TEXTS[language];
  const title = mode === 'PRODUCTS' ? t.products : t.about;
  const targetView = mode === 'PRODUCTS' ? ViewState.GEN1_APP : ViewState.GEN1_MARKETING;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full pt-32 p-4 animate-in slide-in-from-bottom-10 duration-700">
      
      <BackButton onClick={() => setViewState(ViewState.HOME)} language={language} />

      <h2 className="text-3xl md:text-5xl font-light text-blue-50 mb-16 tracking-widest uppercase opacity-90">
        {title}
      </h2>

      <div className="w-full max-w-4xl flex justify-start pl-4 md:pl-0">
        <div className="relative w-80 h-96 border border-white/10 rounded-3xl bg-gradient-to-b from-slate-900/60 to-black/60 backdrop-blur-md overflow-hidden group hover:border-cyan-500/50 transition-all duration-500 shadow-2xl shadow-blue-900/20">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <div className="flex flex-col items-center justify-center h-full p-8">
             <div className="p-4 rounded-full bg-blue-500/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Cpu className="w-16 h-16 text-cyan-200" />
             </div>
             <h3 className="text-2xl font-bold text-white tracking-widest mb-2">{t.gen1}</h3>
             <div className="w-12 h-1 bg-blue-500/50 rounded-full" />
          </div>

          <button 
            onClick={() => setViewState(targetView)}
            className="absolute bottom-0 right-0 p-6 bg-white/5 hover:bg-cyan-600/20 border-t border-l border-white/10 rounded-tl-2xl transition-all duration-300 group-hover:pr-8"
          >
            <ArrowRight className="w-6 h-6 text-cyan-400" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductList;