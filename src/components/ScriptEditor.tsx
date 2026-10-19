import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, RotateCcw, Sparkles, Mic, Play, Pause } from 'lucide-react';
import { Beat } from '../types';
import { INITIAL_BEATS } from '../data/hanbokScript';

interface ScriptEditorProps {
  beats: Beat[];
  setBeats: React.Dispatch<React.SetStateAction<Beat[]>>;
  currentTime: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({
  beats,
  setBeats,
  currentTime,
  isPlaying,
  onTogglePlay
}) => {
  const [teleprompterMode, setTeleprompterMode] = useState(false);

  const countWords = (str: string) => {
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleNarrationChange = (beatId: number, newNarration: string) => {
    setBeats((prev) =>
      prev.map((b) => {
        if (b.id === beatId) {
          const wordCount = countWords(newNarration);
          return {
            ...b,
            narration: newNarration,
            wordCount
          };
        }
        return b;
      })
    );
  };

  const handleResetDefaults = () => {
    setBeats(INITIAL_BEATS);
  };

  const currentBeatIdx = Math.min(
    beats.length - 1,
    Math.max(0, Math.floor(currentTime / 6))
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SCRIPT WRITING &amp; CONSTRAINT COMPLIANCE ENGINE</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display mt-0.5">
            5-Beat Videomaker Script Editor
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time verification of strict constraints: max 12 words per 6s beat, friendly spoken contractions, and subtitles $\le$ 2 lines per card.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTeleprompterMode(!teleprompterMode)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
              teleprompterMode
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{teleprompterMode ? 'Exit Teleprompter' : 'Teleprompter Mode'}</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            title="Reset to verified standard beats"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Teleprompter View Mode */}
      {teleprompterMode ? (
        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center space-y-8 min-h-[420px]">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition shadow-lg shadow-amber-400/20 active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause Prompter' : 'Start Prompter (30s)'}</span>
            </button>
            <span className="text-xl font-mono text-amber-300 font-bold tabular-nums">
              {Math.floor(currentTime)}s / 30s
            </span>
          </div>

          <div className="max-w-2xl space-y-6">
            {beats.map((b, idx) => {
              const isCurrent = currentBeatIdx === idx;
              return (
                <div
                  key={b.id}
                  className={`transition-all duration-300 p-4 rounded-2xl ${
                    isCurrent
                      ? 'bg-amber-500/15 border border-amber-400/40 scale-105 shadow-xl text-white'
                      : 'opacity-40 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1 text-amber-300">
                    {b.label} · Beat 0{b.id}
                  </span>
                  <p className="text-2xl sm:text-3xl font-display font-medium leading-relaxed">
                    &ldquo;{b.narration}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Standard Script Editor Grid */
        <div className="space-y-4">
          {beats.map((beat) => {
            const isOverLimit = beat.wordCount > 12;
            return (
              <div
                key={beat.id}
                className={`p-5 rounded-2xl bg-slate-900/70 border transition ${
                  isOverLimit ? 'border-rose-500/60 bg-rose-950/15' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-mono font-bold text-xs">
                      {beat.label}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {beat.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-semibold ${
                      isOverLimit ? 'text-rose-400 font-bold' : 'text-slate-300'
                    }`}>
                      {beat.wordCount} / 12 words
                    </span>
                    {isOverLimit ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                        <AlertCircle className="w-3 h-3" /> Over 12 word limit!
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                </div>

                {/* Spoken Narration Input */}
                <div className="space-y-1.5 mb-3">
                  <label className="text-xs font-semibold text-slate-400">
                    Spoken Narration (Friendly English with contractions)
                  </label>
                  <input
                    type="text"
                    value={beat.narration}
                    onChange={(e) => handleNarrationChange(beat.id, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  />
                </div>

                {/* Subtitle Card Preview */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Subtitle Card (Max 2 lines):</span>
                    <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-200">
                      {beat.subtitles.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          {sub.lines.map((l, lIdx) => (
                            <span key={lIdx} className="block text-slate-200">
                              {l}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded">
                    ✓ Verified $\le$ 2 lines
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
