import React, { useState } from 'react';
import { Copy, Check, Download, X, FileText, Subtitles, Share2 } from 'lucide-react';
import { Beat } from '../types';

interface ExportModalProps {
  beats: Beat[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ beats, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'script' | 'srt' | 'caption'>('script');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format full master script
  const fullScriptText = beats
    .map((b) => {
      const subLines = b.subtitles
        .flatMap((s) => s.lines)
        .join('\n');
      return `[BEAT ${b.id} | ${b.label}] (${b.wordCount} words)
SPOKEN: "${b.narration}"
SUBTITLES (Max 2 lines per card):
${subLines}
VISUAL: ${b.visualDirection}
CAMERA: ${b.cameraMovement}
AUDIO/SFX: ${b.audioCue}
CULTURAL FACT: ${b.culturalFact}
`;
    })
    .join('\n----------------------------------------\n\n');

  // Format standard SubRip (.SRT) format
  const formatSrtTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
  };

  let srtIndex = 1;
  const srtContent = beats
    .flatMap((b) =>
      b.subtitles.map((sub) => {
        const item = `${srtIndex}\n${formatSrtTime(sub.startTime)} --> ${formatSrtTime(sub.endTime)}\n${sub.lines.join('\n')}\n`;
        srtIndex++;
        return item;
      })
    )
    .join('\n');

  // Social caption
  const socialCaption = `Think Hanbok is just Korea's traditional outfit? It's actually way deeper than that. ✨ From curves shaped to move with nature's breeze to five colors balancing cosmic harmony, wearing it isn't just dressing up—it's belonging. If you're planning to study in Korea, get ready for an unforgettable adventure! 🇰🇷🌸

#StudyInKorea #KoreaUniversity #SeoulLife #ExchangeStudent #Hanbok #KoreanCulture #StudyAbroadKorea #Gyeongbokgung #SaenghwalHanbok`;

  const getCurrentText = () => {
    if (activeTab === 'script') return fullScriptText;
    if (activeTab === 'srt') return srtContent;
    return socialCaption;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeTab === 'srt' ? 'srt' : 'txt';
    const filename = `hanbok_30s_${activeTab}.${ext}`;
    const blob = new Blob([getCurrentText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white font-display text-lg">
              Export Production Assets
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800/60 pb-3">
          <button
            onClick={() => setActiveTab('script')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'script'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Master 5-Beat Script</span>
          </button>

          <button
            onClick={() => setActiveTab('srt')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'srt'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Subtitles className="w-3.5 h-3.5" />
            <span>Subtitles (.SRT File)</span>
          </button>

          <button
            onClick={() => setActiveTab('caption')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'caption'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Post Caption</span>
          </button>
        </div>

        {/* Preview Content Area */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950/60 select-all">
          <pre className="whitespace-pre-wrap leading-relaxed">{getCurrentText()}</pre>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/90">
          <span className="text-xs text-slate-400">
            {activeTab === 'srt' ? 'Ready to import into Premiere / CapCut / DaVinci' : '5 beats · Max 12 words · Max 2 lines/card'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 text-xs font-bold transition shadow-md shadow-amber-400/20 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
