import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { TEXTS, Language } from '../types';

interface BackButtonProps {
  onClick: () => void;
  language: Language;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, language }) => {
  const t = TEXTS[language];
  return (
    <button
      onClick={onClick}
      className="fixed top-24 left-8 z-40 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md border border-blue-500/30 rounded-full text-blue-200 hover:text-white hover:bg-blue-900/40 transition-all duration-300 group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium tracking-wide">{t.back}</span>
    </button>
  );
};

export default BackButton;