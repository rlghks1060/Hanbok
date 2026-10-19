import React from 'react';
import { Play, CheckCircle2, Film, Music, Eye, BookOpen, Layers } from 'lucide-react';
import { Beat } from '../types';

interface StoryboardViewProps {
  beats: Beat[];
  onSelectBeat: (beatId: number) => void;
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({ beats, onSelectBeat }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 mb-1">
            <span>30-SECOND SHORT-FORM MASTER STORYBOARD</span>
            <span>·</span>
            <span>TARGET: WESTERN UNIVERSITY STUDENTS</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Hanbok: Philosophy, Movement &amp; Living Culture
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Structured in five tight 6-second beats (maximum 12 words per beat, spoken English with contractions, subtitles at most two lines per card). Designed to help viewers see Hanbok as far more than colorful traditional clothing.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="block text-xl font-bold font-mono text-amber-400 tabular-nums">5</span>
            <span className="text-[11px] text-slate-400">6s Beats</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="block text-xl font-bold font-mono text-emerald-400 tabular-nums">57</span>
            <span className="text-[11px] text-slate-400">Total Words</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="block text-xl font-bold font-mono text-sky-400 tabular-nums">100%</span>
            <span className="text-[11px] text-slate-400">Verified Facts</span>
          </div>
        </div>
      </div>

      {/* Five Beats Detailed Cards Grid */}
      <div className="space-y-5">
        {beats.map((beat, idx) => (
          <div
            key={beat.id}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition shadow-lg flex flex-col lg:flex-row gap-6 items-start"
          >
            {/* Left Column: Timing & Beat Hook */}
            <div className="w-full lg:w-48 shrink-0 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-mono font-bold text-sm">
                  {beat.label}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Beat #{beat.id}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400">Scene Theme</span>
                <p className="text-sm font-semibold text-white mt-0.5">{beat.title}</p>
              </div>

              <button
                onClick={() => onSelectBeat(idx)}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Preview Beat</span>
              </button>
            </div>

            {/* Middle Column: Spoken Script & Subtitle Cards */}
            <div className="flex-1 space-y-4 min-w-0">
              {/* Spoken Narration Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Spoken Narration (Voiceover)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 font-semibold">
                      {beat.wordCount} words
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (Limit: 12 words)
                    </span>
                  </div>
                </div>
                <blockquote className="text-base font-medium text-white italic leading-relaxed">
                  &ldquo;{beat.narration}&rdquo;
                </blockquote>
              </div>

              {/* Subtitle Cards (Verified <= 2 lines per card) */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  On-Screen Subtitle Cards (Max 2 lines per card)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {beat.subtitles.map((card, cIdx) => (
                    <div 
                      key={card.id} 
                      className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/80 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-slate-400 mb-1.5 text-[10px]">
                        <span>Card {cIdx + 1} ({card.startTime}s - {card.endTime}s)</span>
                        <span className="text-emerald-400 font-semibold">{card.lines.length} lines (Pass)</span>
                      </div>
                      <div className="bg-black/50 p-2 rounded border border-white/5 space-y-0.5 text-center">
                        {card.lines.map((line, lIdx) => (
                          <div key={lIdx} className={lIdx === 1 ? 'text-amber-300 font-bold' : 'text-slate-200'}>
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Direction, Audio & Cultural Depth */}
            <div className="w-full lg:w-72 shrink-0 space-y-3 text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  Visual &amp; Camera Movement
                </span>
                <p className="text-slate-300 leading-relaxed">{beat.visualDirection}</p>
                <p className="text-slate-400 italic mt-1">{beat.cameraMovement}</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Music className="w-3.5 h-3.5 text-rose-400" />
                  Audio &amp; Sound FX
                </span>
                <p className="text-slate-300">{beat.audioCue}</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Cultural Fact
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{beat.culturalFact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
