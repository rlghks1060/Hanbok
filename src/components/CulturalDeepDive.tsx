import React from 'react';
import { Compass, Sparkles, Feather, Users, Landmark, Shirt } from 'lucide-react';
import { PHILOSOPHY_SECTIONS } from '../data/hanbokScript';

export const CulturalDeepDive: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-2">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CULTURAL CONTEXT GUIDE FOR EXCHANGE STUDENTS</span>
        </div>
        <h2 className="text-3xl font-bold text-white font-display">
          Why Hanbok is More Than &ldquo;Colorful Clothes&rdquo;
        </h2>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          When considering studying in South Korea, learning about Hanbok reveals the core Korean philosophy of living in harmony with nature, bodily comfort, and community welcome.
        </p>
      </div>

      {/* 4 Pillars of Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PHILOSOPHY_SECTIONS.map((section, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-amber-400">
                  {section.korean}
                </span>
                <span className="text-xs text-slate-500 font-mono">Pillar 0{idx + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                {section.title}
              </h3>
              <p className="text-xs font-medium text-amber-200/90 mb-3 italic">
                &ldquo;{section.summary}&rdquo;
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {section.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Grounded in verified historical and contemporary Korean practices</span>
            </div>
          </div>
        ))}
      </div>

      {/* Study in Korea University Insights */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-900/40 space-y-4">
        <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          How International Students Actually Experience Hanbok on Campus
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="font-semibold text-white block mb-1">1. Orientation Week Tradition</span>
            Almost every major university (Yonsei, KU, SNU, Ewha, Sungkyunkwan) organizes an exchange-student Hanbok day in Bukchon and Gyeongbokgung during the first month.
          </div>
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="font-semibold text-white block mb-1">2. Zero Ticket Lines</span>
            Korea’s Ministry of Culture guarantees free admission to the 4 Grand Royal Palaces for anyone wearing complete Hanbok. It is a government-backed cultural celebration.
          </div>
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="font-semibold text-white block mb-1">3. Daily Streetwear Evolution</span>
            Modern students pair cropped Jeogori jackets with straight-leg jeans, sneakers, and backpacks, creating a look that is effortlessly cool, comfortable, and proudly local.
          </div>
        </div>
      </div>
    </div>
  );
};
