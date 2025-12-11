import React, { useState, useRef, useEffect } from 'react';
import { TEXTS, Language, ViewState } from '../types';
import BackButton from '../components/BackButton';
import { Cpu, Zap, Brain, Monitor, CloudFog, Trash2, Download, Package } from 'lucide-react';

interface SiliconSimulatorProps {
  language: Language;
  onBack: () => void;
}

type ComponentType = 'EMPTY' | 'CPU_P' | 'CPU_E' | 'GPU' | 'NPU' | 'SMOKE';
type SimMode = 'TUTORIAL' | 'DESIGN' | 'PACKAGE';

const COMPONENT_COLORS: Record<ComponentType, string> = {
  EMPTY: 'bg-zinc-900/50',
  CPU_P: 'bg-red-500',
  CPU_E: 'bg-blue-400',
  GPU: 'bg-green-500',
  NPU: 'bg-purple-500',
  SMOKE: 'bg-gray-400',
};

const SiliconSimulator: React.FC<SiliconSimulatorProps> = ({ language, onBack }) => {
  const t = TEXTS[language];
  const [mode, setMode] = useState<SimMode>('TUTORIAL');
  const [gridSize, setGridSize] = useState(4); // 4x4 up to 8x8
  const [grid, setGrid] = useState<ComponentType[]>(Array(16).fill('EMPTY'));
  const [selectedTool, setSelectedTool] = useState<ComponentType>('CPU_P');
  const [engravingText, setEngravingText] = useState('FAI i9-UltraFail');
  
  // Canvas Ref for image generation
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update grid size handler
  const handleGridResize = (size: number) => {
    setGridSize(size);
    setGrid(Array(size * size).fill('EMPTY'));
  };

  const handleCellClick = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = selectedTool;
    setGrid(newGrid);
  };

  // Canvas Drawing Logic for Download
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, 800, 800);

    // 1. Draw Heat Spreader (Silver)
    const gradient = ctx.createLinearGradient(0, 0, 800, 800);
    gradient.addColorStop(0, '#e2e8f0');
    gradient.addColorStop(0.5, '#cbd5e1');
    gradient.addColorStop(1, '#94a3b8');
    
    // Rounded Rect for IHS
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(100, 100, 600, 600, 40);
    ctx.fill();
    
    // Inner border/bevel
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 2. Draw Text (Engraving)
    ctx.fillStyle = '#475569'; // Dark slate for laser etching look
    ctx.font = 'bold 48px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Main Text
    ctx.fillText(engravingText, 400, 350);
    
    // Sub text
    ctx.font = '32px monospace';
    ctx.fillText('MALAYSIA MADE', 400, 450);
    ctx.fillText('BATCH: #NULL000', 400, 500);

    // FAI Logo (Simple text representation)
    ctx.font = 'bold 80px "Playfair Display", serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('FAI', 400, 250);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `FAI-Chip-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const renderTutorial = () => (
    <div className="max-w-3xl mx-auto text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-500">
          {t.simTutorialTitle}
        </h2>
        <div className="h-1 w-32 bg-orange-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
          <div className="text-6xl mb-4">🏜️</div>
          <p className="text-gray-300 font-medium">{t.simTutorialStep1}</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
           <div className="text-6xl mb-4">🪵</div>
          <p className="text-gray-300 font-medium">{t.simTutorialStep2}</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
           <div className="text-6xl mb-4">🖍️</div>
          <p className="text-gray-300 font-medium">{t.simTutorialStep3}</p>
        </div>
      </div>

      <button
        onClick={() => setMode('DESIGN')}
        className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold text-lg tracking-wider transition-all hover:scale-105 shadow-[0_0_30px_rgba(234,88,12,0.4)]"
      >
        {t.simStartDesign}
      </button>
    </div>
  );

  const renderDesign = () => (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto h-[80vh]">
      {/* Tools Panel */}
      <div className="w-full lg:w-80 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h3 className="text-orange-400 font-bold mb-4 uppercase tracking-wider text-sm">{t.simGridSize}</h3>
          <input 
            type="range" 
            min="4" 
            max="10" 
            value={gridSize} 
            onChange={(e) => handleGridResize(parseInt(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="text-right text-gray-400 font-mono mt-1">{gridSize} x {gridSize} nm</div>
        </div>

        <div>
          <h3 className="text-orange-400 font-bold mb-4 uppercase tracking-wider text-sm">{t.simTools}</h3>
          <div className="space-y-2">
            {[
              { id: 'CPU_P', label: t.compCpuP, icon: Cpu, color: 'text-red-400 border-red-900/50 bg-red-900/20' },
              { id: 'CPU_E', label: t.compCpuE, icon: Zap, color: 'text-blue-400 border-blue-900/50 bg-blue-900/20' },
              { id: 'GPU', label: t.compGpu, icon: Monitor, color: 'text-green-400 border-green-900/50 bg-green-900/20' },
              { id: 'NPU', label: t.compNpu, icon: Brain, color: 'text-purple-400 border-purple-900/50 bg-purple-900/20' },
              { id: 'SMOKE', label: t.compSmoke, icon: CloudFog, color: 'text-gray-400 border-gray-700 bg-gray-800/50' },
              { id: 'EMPTY', label: t.compEmpty, icon: Trash2, color: 'text-zinc-400 border-zinc-800 bg-zinc-900' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id as ComponentType)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${tool.color} ${selectedTool === tool.id ? 'ring-2 ring-white/50 scale-105' : 'hover:bg-white/5'}`}
              >
                <tool.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
           onClick={() => setMode('PACKAGE')}
           className="mt-auto w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-900/40 transition-all"
        >
          {t.simPackage} &rarr;
        </button>
      </div>

      {/* Grid Canvas */}
      <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden">
         {/* Circuit Board Background Pattern */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
             backgroundImage: `radial-gradient(#22c55e 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
         }} />
         
         <div 
           className="grid gap-1 bg-green-900/30 p-4 border-4 border-yellow-600/50 rounded shadow-2xl backdrop-blur-sm"
           style={{
             gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
             width: '100%',
             maxWidth: '600px',
             aspectRatio: '1/1'
           }}
         >
           {grid.map((cell, i) => (
             <div
               key={i}
               onClick={() => handleCellClick(i)}
               className={`${COMPONENT_COLORS[cell]} rounded-sm cursor-pointer hover:brightness-125 transition-all border border-black/20 relative group`}
             >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
             </div>
           ))}
         </div>
      </div>
    </div>
  );

  const renderPackage = () => (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-8 animate-in zoom-in duration-500">
      <div className="text-center">
         <h2 className="text-3xl font-bold text-white mb-2">{t.simPackage}</h2>
         <p className="text-gray-400">Ready to overheat.</p>
      </div>

      <div className="relative w-96 h-96 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border-4 border-slate-500">
          {/* FAI Etching */}
          <h1 className="text-5xl font-serif font-bold text-slate-600/80 tracking-tighter mb-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">FAI</h1>
          
          {/* Custom Engraving */}
          <div className="font-sans font-bold text-2xl text-slate-700/80 tracking-wider mb-8 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] uppercase">
            {engravingText}
          </div>

          {/* Details */}
          <div className="font-mono text-sm text-slate-500 flex flex-col items-center gap-1">
             <span>MALAYSIA MADE</span>
             <span>BATCH: #NULL000</span>
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-[2.8rem] pointer-events-none" />
      </div>

      <div className="w-full max-w-md space-y-4 bg-zinc-900/80 p-6 rounded-xl border border-white/10">
        <div>
          <label className="block text-sm text-gray-400 mb-2">{t.simEngraving}</label>
          <input 
            type="text" 
            value={engravingText}
            onChange={(e) => setEngravingText(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-orange-500 focus:outline-none"
            maxLength={15}
          />
        </div>
        
        <div className="flex gap-4">
            <button
              onClick={() => setMode('DESIGN')}
              className="flex-1 py-3 text-gray-400 hover:text-white border border-gray-700 rounded-lg"
            >
              {t.back}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t.simDownload}
            </button>
        </div>
      </div>
      
      {/* Hidden Canvas for generating the download image */}
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={800} 
        className="hidden"
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full pt-24 p-4 relative overflow-y-auto">
      <BackButton onClick={onBack} language={language} />
      
      {mode === 'TUTORIAL' && renderTutorial()}
      {mode === 'DESIGN' && renderDesign()}
      {mode === 'PACKAGE' && renderPackage()}
    </div>
  );
};

export default SiliconSimulator;