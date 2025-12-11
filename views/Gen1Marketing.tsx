import React from 'react';
import { TEXTS, Language } from '../types';
import BackButton from '../components/BackButton';
import { Cpu, Battery, Zap, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface Gen1MarketingProps {
  language: Language;
  onBack: () => void;
}

const Gen1Marketing: React.FC<Gen1MarketingProps> = ({ language, onBack }) => {
  const t = TEXTS[language];

  return (
    <div className="w-full min-h-screen overflow-y-auto no-scrollbar animate-in slide-in-from-bottom-20 duration-1000 bg-black">
      
      <BackButton onClick={onBack} language={language} />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black opacity-50" />
        <h2 className="text-xl md:text-2xl font-semibold text-orange-400 mb-4 animate-bounce z-10">
          New
        </h2>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-600 mb-6 drop-shadow-2xl z-10">
          {t.marketingTitle}
        </h1>
        <p className="text-2xl md:text-5xl font-medium text-gray-300 mb-12 max-w-4xl leading-tight z-10">
          {t.marketingSubtitle}
        </p>
        <div className="text-sm text-gray-500 font-mono border border-gray-800 rounded-full px-4 py-1 z-10 bg-black/50">
           Generation 1 &nbsp;|&nbsp; 0% Useful
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Card */}
          <div className="md:col-span-2 relative h-[500px] rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 flex flex-col justify-end overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay" />
            <div className="absolute top-8 right-8 animate-pulse">
                <Cpu className="w-12 h-12 text-cyan-500" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2 relative z-10">{t.bentoChipTitle}</h3>
            <p className="text-xl text-gray-400 relative z-10">{t.bentoChipDesc}</p>
          </div>

          {/* Side Card 1 */}
          <div className="relative h-[240px] md:h-auto rounded-3xl bg-zinc-900 border border-white/10 p-8 flex flex-col justify-center items-center text-center group hover:bg-zinc-800 transition-colors">
            <Battery className="w-16 h-16 text-green-500 mb-4 group-hover:rotate-90 transition-transform duration-500" />
            <h3 className="text-2xl font-bold text-white mb-2">{t.bentoBatteryTitle}</h3>
            <p className="text-sm text-gray-400">{t.bentoBatteryDesc}</p>
          </div>

          {/* Side Card 2 */}
          <div className="relative h-[240px] md:h-auto rounded-3xl bg-zinc-900 border border-white/10 p-8 flex flex-col justify-center items-center text-center group hover:bg-zinc-800 transition-colors">
             <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
             <h3 className="text-2xl font-bold text-white mb-2">{t.bentoNeuralTitle}</h3>
             <p className="text-sm text-gray-400">{t.bentoNeuralDesc}</p>
          </div>

        </div>
      </section>

      {/* Titanium Pro Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400">
                {t.proTitle}
            </h2>
            <p className="text-2xl md:text-4xl text-gray-500 font-light mb-16 tracking-widest uppercase">
                {t.proSubtitle}
            </p>
            
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl shadow-blue-900/20">
                {/* Simulated Chat Interface */}
                <div className="absolute inset-0 bg-black flex flex-col p-8 font-mono">
                    <div className="flex-1 space-y-8">
                        <div className="flex justify-end">
                            <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none max-w-md text-lg">
                                "Help me write a resignation letter."
                            </div>
                        </div>
                        <div className="flex justify-start">
                             <div className="bg-zinc-800 text-gray-200 p-4 rounded-2xl rounded-tl-none max-w-md text-lg border border-gray-700">
                                <span className="text-xs text-gray-500 mb-2 block">FAI Gen1 (Titanium Mode)</span>
                                "The avocado is a fruit that is technically a large berry containing a single large seed. Would you like a recipe for guacamole?"
                             </div>
                        </div>
                         <div className="flex justify-start opacity-50">
                             <div className="bg-zinc-800 text-gray-200 p-4 rounded-2xl rounded-tl-none max-w-md text-lg border border-gray-700">
                                "Also, clouds are just water vapor floating in the sky. Amazing, isn't it?"
                             </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-4 flex items-center justify-between text-gray-600">
                        <span>Thinking... (50000ms)</span>
                        <Zap className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Comparison Chart */}
      <section className="py-32 px-4 bg-black">
         <div className="max-w-4xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
                 {t.compTitle}
             </h2>

             <div className="grid grid-cols-3 gap-y-8 gap-x-4 border-t border-gray-800 pt-8 text-center items-center">
                 {/* Header */}
                 <div className="text-left font-bold text-gray-500 text-xl">Feature</div>
                 <div className="font-bold text-gray-500 text-xl">{t.compThem}</div>
                 <div className="font-bold text-blue-400 text-2xl">{t.compUs}</div>

                 {/* Row 1 */}
                 <div className="text-left text-white text-lg border-t border-gray-800 pt-8">{t.compF1}</div>
                 <div className="text-gray-400 border-t border-gray-800 pt-8 flex justify-center"><CheckCircle className="text-gray-600" /></div>
                 <div className="text-white border-t border-gray-800 pt-8 flex justify-center"><XCircle className="text-red-500 w-8 h-8" /></div>

                 {/* Row 2 */}
                 <div className="text-left text-white text-lg border-t border-gray-800 pt-8">{t.compF2}</div>
                 <div className="text-gray-400 border-t border-gray-800 pt-8">Low</div>
                 <div className="text-blue-400 font-bold border-t border-gray-800 pt-8 text-xl">Extreme</div>

                 {/* Row 3 */}
                 <div className="text-left text-white text-lg border-t border-gray-800 pt-8">{t.compF3}</div>
                 <div className="text-gray-400 border-t border-gray-800 pt-8">$20/mo</div>
                 <div className="text-blue-400 font-bold border-t border-gray-800 pt-8 text-xl">$9,999/mo</div>
             </div>
         </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-4 bg-zinc-950 text-center">
          <div className="max-w-3xl mx-auto">
             <h3 className="text-3xl md:text-5xl font-serif italic text-gray-300 leading-relaxed mb-8">
                 {t.quote}
             </h3>
             <p className="text-gray-500 font-bold tracking-widest uppercase">{t.quoteAuthor}</p>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-black text-center border-t border-gray-900">
        <p className="text-gray-600 text-sm mb-4">&copy; 2024 Fake Artificial Intelligence. All rights reserved.</p>
        <p className="text-gray-800 text-xs max-w-md mx-auto">
            Disclaimer: This product is a joke. Do not use for medical advice, legal advice, or life advice. Actually, do not use it for anything.
        </p>
      </footer>

    </div>
  );
};

export default Gen1Marketing;