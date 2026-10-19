import React from 'react';
import { Beat } from '../types';

interface BeatScenesProps {
  currentBeat: Beat;
  progressInBeat: number; // 0 to 1
  isPlaying: boolean;
}

export const BeatScenes: React.FC<BeatScenesProps> = ({ currentBeat, progressInBeat }) => {
  const { id } = currentBeat;

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-slate-950">
      {/* Background Ambience Layer with Smooth Dissolve */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          id === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <SceneIntro progress={id === 1 ? progressInBeat : 0} />
      </div>

      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          id === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <SceneCurves progress={id === 2 ? progressInBeat : 0} />
      </div>

      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          id === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <SceneObangsaek progress={id === 3 ? progressInBeat : 0} />
      </div>

      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          id === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <SceneCampus progress={id === 4 ? progressInBeat : 0} />
      </div>

      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          id === 5 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <SceneBelonging progress={id === 5 ? progressInBeat : 0} />
      </div>

      {/* Floating Cultural Ambient Particles (Cherry Blossom / Silk Glimmer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-rose-300/30 blur-[1px] animate-pulse"
            style={{
              width: `${6 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 4}px`,
              top: `${15 + (i * 14)}%`,
              left: `${10 + ((i * 29) % 80)}%`,
              transform: `translateY(${Math.sin(progressInBeat * Math.PI * 2 + i) * 15}px) rotate(${progressInBeat * 360}deg)`,
              transition: 'transform 0.4s ease-out'
            }}
          />
        ))}
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />
    </div>
  );
};

/* Beat 1 Scene: The Hook & Reimagining Hanbok */
const SceneIntro: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = 1 + progress * 0.08;
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-indigo-950 via-slate-900 to-stone-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Dynamic Background Hanok Eaves Architectural Pattern */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{ transform: `scale(${scale})`, transition: 'transform 0.2s linear' }}
      >
        <svg viewBox="0 0 400 700" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Traditional Korean Curved Roof Eave Line */}
          <path d="M -50 180 Q 200 230 450 180 L 450 220 Q 200 270 -50 220 Z" fill="url(#roofGrad)" />
          <path d="M -50 260 Q 200 310 450 260 L 450 280 Q 200 330 -50 280 Z" fill="#64748b" fillOpacity="0.2" />
          {/* Lattice window motif */}
          <g stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.15">
            {[...Array(8)].map((_, i) => (
              <line key={`v-${i}`} x1={40 + i * 45} y1="340" x2={40 + i * 45} y2="520" />
            ))}
            {[...Array(6)].map((_, j) => (
              <line key={`h-${j}`} x1="30" y1={350 + j * 32} x2="360" y2={350 + j * 32} />
            ))}
          </g>
        </svg>
      </div>

      {/* Visual Focal Element: Modern Student in Hanbok Silhouette & Silk Ribbons */}
      <div 
        className="relative z-10 flex flex-col items-center max-w-[280px]"
        style={{ transform: `translateY(${Math.sin(progress * Math.PI) * -8}px)` }}
      >
        <div className="relative mb-5">
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-400/30 to-rose-500/30 blur-lg animate-pulse" />
          
          {/* Central Stylized Hanbok Icon / Avatar */}
          <div className="relative w-32 h-32 rounded-full border border-amber-300/40 bg-gradient-to-b from-stone-800 to-slate-900 flex items-center justify-center shadow-2xl overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              {/* Jeogori collar (Dongjeong) white crisp band */}
              <path d="M 28 40 L 50 62 L 72 40 L 64 35 L 50 50 L 36 35 Z" fill="#ffffff" />
              {/* Outer overlap jacket (Jeogori) in modern jade silk */}
              <path d="M 20 45 Q 50 68 80 45 L 86 70 Q 50 85 14 70 Z" fill="#0d9488" fillOpacity="0.85" />
              {/* Otgoreum (Chest Ribbon) hanging gracefully */}
              <path d="M 50 58 Q 54 75 48 95" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 50 58 Q 58 72 62 88" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Subtle gold floral emblem */}
              <circle cx="50" cy="58" r="3" fill="#fde047" />
            </svg>
          </div>
        </div>

        {/* Dynamic Graphic Badges */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs font-medium tracking-wide mb-2">
          <span>01 · THE PERSPECTIVE SHIFT</span>
        </div>
        <div className="text-xl font-bold tracking-tight text-white font-display">
          More Than a Costume
        </div>
        <p className="text-xs text-slate-300 mt-1 max-w-[240px] leading-relaxed">
          Behind the colors lies a living philosophy of movement, balance, and identity.
        </p>
      </div>
    </div>
  );
};

/* Beat 2 Scene: The Philosophy of Flowing Curves (Baerae) */
const SceneCurves: React.FC<{ progress: number }> = ({ progress }) => {
  const waveOffset = progress * 40;
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-teal-950 via-emerald-950 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Flowing Silk Waves SVG Simulation */}
      <div className="absolute inset-0 opacity-40">
        <svg viewBox="0 0 400 700" className="w-full h-full">
          <defs>
            <linearGradient id="silkGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="silkGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Baerae Sleeve Curves */}
          <path 
            d={`M -20 ${200 + Math.sin(waveOffset * 0.1) * 20} Q 200 ${320 + Math.cos(waveOffset * 0.1) * 25} 420 ${220 + Math.sin(waveOffset * 0.1) * 20} L 420 500 Q 200 450 -20 500 Z`}
            fill="url(#silkGrad1)"
          />
          <path 
            d={`M -20 ${280 + Math.cos(waveOffset * 0.08) * 15} Q 200 ${380 + Math.sin(waveOffset * 0.08) * 20} 420 ${300 + Math.cos(waveOffset * 0.08) * 15} L 420 600 Q 200 550 -20 600 Z`}
            fill="url(#silkGrad2)"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[280px]">
        {/* Animated Wind & Sleeve Icon */}
        <div className="relative w-28 h-28 mb-4 rounded-2xl bg-teal-900/40 border border-teal-400/30 flex items-center justify-center backdrop-blur-sm shadow-xl">
          <svg viewBox="0 0 80 80" className="w-20 h-20">
            {/* The Famous Korean Baerae Curved Sleeve Outline */}
            <path 
              d="M 15 25 Q 40 22 65 25 L 60 45 Q 40 65 15 50 Z" 
              fill="none" 
              stroke="#5eead4" 
              strokeWidth="3.5" 
              strokeLinecap="round"
            />
            {/* Wind flow arrows */}
            <path d="M 22 36 Q 42 33 55 36" stroke="#ccfbf1" strokeWidth="2" strokeDasharray="3 3" fill="none" />
            <path d="M 25 43 Q 40 48 50 43" stroke="#ccfbf1" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-200 text-xs font-medium tracking-wide mb-2">
          <span>02 · NATURAL HARMONY</span>
        </div>
        <div className="text-xl font-bold tracking-tight text-white font-display">
          Form Follows the Breeze
        </div>
        <p className="text-xs text-teal-100/80 mt-1 max-w-[240px] leading-relaxed">
          No corsets or stiff bonds. The curves (Baerae) mimic mountain ridges, moving with your body.
        </p>
      </div>
    </div>
  );
};

/* Beat 3 Scene: Color as Philosophy (Obangsaek) */
const SceneObangsaek: React.FC<{ progress: number }> = ({ progress }) => {
  const elements = [
    { name: 'Blue', element: 'Wood · East', color: 'bg-blue-600', border: 'border-blue-400' },
    { name: 'Red', element: 'Fire · South', color: 'bg-rose-600', border: 'border-rose-400' },
    { name: 'Yellow', element: 'Earth · Center', color: 'bg-amber-400', border: 'border-amber-300' },
    { name: 'White', element: 'Metal · West', color: 'bg-slate-100', border: 'border-slate-300' },
    { name: 'Black', element: 'Water · North', color: 'bg-stone-900', border: 'border-stone-500' },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-950 via-zinc-900 to-stone-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Radiating Color Spectrum Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div 
          className="w-80 h-80 rounded-full border border-rose-500/40"
          style={{ transform: `scale(${1 + progress * 0.15}) rotate(${progress * 60}deg)` }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full border border-amber-400/40"
          style={{ transform: `scale(${1 + progress * 0.1}) rotate(${-progress * 45}deg)` }}
        />
        <div 
          className="absolute w-48 h-48 rounded-full border border-blue-500/40"
          style={{ transform: `scale(${1 + progress * 0.05}) rotate(${progress * 30}deg)` }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[280px]">
        {/* The 5 Obangsaek Color Circles */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {elements.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center"
              style={{
                transform: `translateY(${Math.sin((progress * 4) + idx) * 4}px)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div className={`w-9 h-9 rounded-full ${item.color} border-2 ${item.border} shadow-lg`} />
              <span className="text-[10px] text-slate-300 font-mono mt-1">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs font-medium tracking-wide mb-2">
          <span>03 · OBANGSAEK (오방색)</span>
        </div>
        <div className="text-xl font-bold tracking-tight text-white font-display">
          5 Elements of Nature
        </div>
        <p className="text-xs text-slate-300 mt-1 max-w-[240px] leading-relaxed">
          Not random dyes—every shade harmonizes natural cosmic energies for protection and joy.
        </p>
      </div>
    </div>
  );
};

/* Beat 4 Scene: Modern Campus Life & Living Culture */
const SceneCampus: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Modern Seoul University Architectural Motif */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 400 700" className="w-full h-full">
          {/* University library pillars & arch */}
          <rect x="60" y="240" width="280" height="20" fill="#93c5fd" />
          {[...Array(6)].map((_, i) => (
            <rect key={i} x={80 + i * 45} y="260" width="16" height="220" fill="#60a5fa" />
          ))}
          {/* Steps */}
          <rect x="40" y="480" width="320" height="15" fill="#3b82f6" />
          <rect x="20" y="495" width="360" height="15" fill="#2563eb" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[280px]">
        {/* Modern Saenghwal Hanbok Illustration */}
        <div className="relative w-28 h-28 mb-4 rounded-2xl bg-indigo-900/40 border border-indigo-400/30 flex items-center justify-center backdrop-blur-sm shadow-xl">
          <svg viewBox="0 0 80 80" className="w-20 h-20">
            {/* Modern cropped jacket + backpack strap */}
            <path d="M 22 28 L 40 44 L 58 28 L 54 24 L 40 36 L 26 24 Z" fill="#ffffff" />
            <path d="M 16 32 L 64 32 L 60 56 L 20 56 Z" fill="#4f46e5" />
            {/* Backpack strap diagonal */}
            <line x1="28" y1="26" x2="24" y2="58" stroke="#1e1b4b" strokeWidth="4" />
            <line x1="52" y1="26" x2="56" y2="58" stroke="#1e1b4b" strokeWidth="4" />
            {/* Modern sneakers symbol at bottom */}
            <rect x="25" y="62" width="12" height="6" rx="2" fill="#e2e8f0" />
            <rect x="43" y="62" width="12" height="6" rx="2" fill="#e2e8f0" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 text-xs font-medium tracking-wide mb-2">
          <span>04 · LIVING HERITAGE</span>
        </div>
        <div className="text-xl font-bold tracking-tight text-white font-display">
          Saenghwal Hanbok Today
        </div>
        <p className="text-xs text-indigo-100/80 mt-1 max-w-[240px] leading-relaxed">
          Reinvented by university students with sneakers and denim. A heritage woven into daily youth life.
        </p>
      </div>
    </div>
  );
};

/* Beat 5 Scene: Belonging & Invitation to Seoul */
const SceneBelonging: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-amber-950 via-rose-950 to-purple-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Sunset Skyline with Namsan Tower Silhouette */}
      <div className="absolute inset-0 opacity-35">
        <svg viewBox="0 0 400 700" className="w-full h-full">
          {/* N Seoul Tower atop mountain */}
          <path d="M 0 480 Q 200 420 400 480 L 400 700 L 0 700 Z" fill="#4c0519" />
          {/* Tower needle */}
          <line x1="200" y1="310" x2="200" y2="440" stroke="#f43f5e" strokeWidth="3" />
          <ellipse cx="200" cy="360" rx="14" ry="6" fill="#fb7185" />
          <line x1="200" y1="270" x2="200" y2="310" stroke="#fda4af" strokeWidth="2" />
          <circle cx="200" cy="270" r="3" fill="#ffe4e6" />
          {/* Glowing sunset sun */}
          <circle cx="200" cy="380" r="45" fill="#f59e0b" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[280px]">
        {/* Warm Open Arms / Friendship Icon */}
        <div className="relative w-28 h-28 mb-4 rounded-full bg-gradient-to-tr from-amber-500/20 via-rose-500/30 to-purple-500/20 border border-amber-300/40 flex items-center justify-center backdrop-blur-sm shadow-2xl">
          <svg viewBox="0 0 80 80" className="w-20 h-20">
            {/* Friendly Open Heart / Welcoming Hanbok Knot */}
            <circle cx="40" cy="30" r="9" fill="#fde68a" />
            <path d="M 22 55 Q 40 42 58 55 L 60 70 Q 40 76 20 70 Z" fill="#fb7185" />
            <path d="M 12 48 Q 24 38 32 46" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 68 48 Q 56 38 48 46" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-medium tracking-wide mb-2">
          <span>05 · YOUR INVITATION</span>
        </div>
        <div className="text-xl font-bold tracking-tight text-white font-display">
          You Won't Just Wear It
        </div>
        <p className="text-xs text-amber-100/90 mt-1 max-w-[240px] leading-relaxed">
          You'll be part of the story. Study abroad in Korea and find your place in the living culture.
        </p>
      </div>
    </div>
  );
};
