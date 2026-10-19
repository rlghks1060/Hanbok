import React, { useState } from 'react';
import { Play, Pause, Download, Sparkles } from 'lucide-react';
import { INITIAL_BEATS } from './data/hanbokScript';
import { Beat, ViewTab } from './types';
import { VideoPlayer } from './components/VideoPlayer';
import { StoryboardView } from './components/StoryboardView';
import { ScriptEditor } from './components/ScriptEditor';
import { CulturalDeepDive } from './components/CulturalDeepDive';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [beats, setBeats] = useState<Beat[]>(INITIAL_BEATS);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('player');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleSelectBeat = (beatIndex: number) => {
    setCurrentTime(beatIndex * 6);
    setActiveTab('player');
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (currentTime >= 30) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 rotate-45" />
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); setActiveTab('player'); }}
              className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap"
            >
              Hanbok 30s Studio
            </a>
          </div>

          {/* Zone 2: 4 single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('player')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'player' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Video Player
            </button>
            <button
              onClick={() => setActiveTab('storyboard')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'storyboard' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Storyboard
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'editor' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Script &amp; Constraints
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'guide' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'text-slate-400'
              }`}
            >
              Student Guide
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition shadow-md shadow-amber-400/20 whitespace-nowrap shrink-0 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Production Kit</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around px-2 py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-2 py-1 rounded ${activeTab === 'player' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            Player
          </button>
          <button
            onClick={() => setActiveTab('storyboard')}
            className={`px-2 py-1 rounded ${activeTab === 'storyboard' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            Storyboard
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-2 py-1 rounded ${activeTab === 'editor' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            Script
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-2 py-1 rounded ${activeTab === 'guide' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            Guide
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'player' && (
          <VideoPlayer
            beats={beats}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}

        {activeTab === 'storyboard' && (
          <StoryboardView
            beats={beats}
            onSelectBeat={handleSelectBeat}
          />
        )}

        {activeTab === 'editor' && (
          <ScriptEditor
            beats={beats}
            setBeats={setBeats}
            currentTime={currentTime}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
          />
        )}

        {activeTab === 'guide' && (
          <CulturalDeepDive />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>Hanbok 30s Short-Form Video</span>
            <span>·</span>
            <span>5 Beats (0-6s, 6-12s, 12-18s, 18-24s, 24-30s)</span>
            <span>·</span>
            <span>Subtitles $\le$ 2 Lines per Card</span>
          </div>
          <div>
            <span>Verified Cultural Heritage &amp; Exchange Student Guide</span>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        beats={beats}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
