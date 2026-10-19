import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, MicOff, Heart, MessageCircle, Share2, Music, Sparkles } from 'lucide-react';
import { Beat, SocialPlatform } from '../types';
import { BeatScenes } from './BeatScenes';
import { soundEngine } from '../utils/audioSynth';

interface VideoPlayerProps {
  beats: Beat[];
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onBeatChange?: (beat: Beat) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  beats,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  onBeatChange
}) => {
  const [platform, setPlatform] = useState<SocialPlatform>('reels');
  const [showSocialChrome, setShowSocialChrome] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(18420);

  const lastBeatIndexRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(performance.now());
  const animFrameRef = useRef<number | null>(null);

  // Determine current active beat (0-30s)
  const currentBeatIndex = Math.min(
    beats.length - 1,
    Math.max(0, Math.floor(currentTime / 6))
  );
  const currentBeat = beats[currentBeatIndex] || beats[0];
  const progressInCurrentBeat = (currentTime % 6) / 6;

  // Find active subtitle card (strictly max 2 lines per card)
  const activeSubtitleCard = currentBeat.subtitles.find(
    (card) => currentTime >= card.startTime && currentTime <= card.endTime
  ) || currentBeat.subtitles[0];

  // Trigger voiceover whenever the beat shifts while playing
  useEffect(() => {
    if (isPlaying && isVoiceoverEnabled && currentBeatIndex !== lastBeatIndexRef.current) {
      lastBeatIndexRef.current = currentBeatIndex;
      soundEngine.playVoiceover(currentBeat.narration);
      if (onBeatChange) {
        onBeatChange(currentBeat);
      }
    }
  }, [isPlaying, currentBeatIndex, isVoiceoverEnabled, currentBeat, onBeatChange]);

  // Audio BGM loop control
  useEffect(() => {
    if (isPlaying && !isMuted) {
      soundEngine.startBgm();
    } else {
      soundEngine.stopBgm();
    }
    return () => {
      soundEngine.stopBgm();
    };
  }, [isPlaying, isMuted]);

  // Handle Mute toggle
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setVolume(nextMute ? 0 : 0.25);
  };

  // Main playback timer loop
  const updateLoop = useCallback((now: number) => {
    const delta = (now - lastTimeRef.current) / 1000;
    lastTimeRef.current = now;

    if (isPlaying) {
      setCurrentTime((prev) => {
        const next = prev + delta * playbackSpeed;
        if (next >= 30) {
          setIsPlaying(false);
          soundEngine.stopVoiceover();
          return 30;
        }
        return next;
      });
    }

    animFrameRef.current = requestAnimationFrame(updateLoop);
  }, [isPlaying, playbackSpeed, setCurrentTime, setIsPlaying]);

  useEffect(() => {
    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [updateLoop]);

  const togglePlay = () => {
    if (currentTime >= 30) {
      setCurrentTime(0);
      lastBeatIndexRef.current = -1;
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    soundEngine.stopVoiceover();
    lastBeatIndexRef.current = -1;
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const jumpToBeat = (index: number) => {
    const targetTime = index * 6;
    soundEngine.stopVoiceover();
    lastBeatIndexRef.current = -1;
    setCurrentTime(targetTime);
  };

  const formatTime = (seconds: number) => {
    const secs = Math.floor(seconds);
    const ms = Math.floor((seconds % 1) * 10);
    return `00:${secs < 10 ? '0' : ''}${secs}.${ms}`;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl mx-auto py-2">
      {/* 9:16 Vertical Video Screen Mockup */}
      <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 ring-1 ring-white/10 flex flex-col justify-between select-none">
        {/* Top Story/Shorts Progress Bar (5 Beats) */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-3 px-3 pb-2 flex gap-1.5 bg-gradient-to-b from-black/80 to-transparent">
          {beats.map((beat, idx) => {
            const beatDuration = 6;
            const beatStart = idx * beatDuration;
            let fillPercent = 0;
            if (currentTime >= beatStart + beatDuration) {
              fillPercent = 100;
            } else if (currentTime > beatStart) {
              fillPercent = ((currentTime - beatStart) / beatDuration) * 100;
            }

            return (
              <button
                key={beat.id}
                onClick={() => jumpToBeat(idx)}
                className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden cursor-pointer group py-0.5"
                title={`Jump to Beat ${beat.id}: ${beat.label}`}
              >
                <div 
                  className="h-full bg-white transition-all duration-75 rounded-full group-hover:bg-amber-300"
                  style={{ width: `${fillPercent}%` }}
                />
              </button>
            );
          })}
        </div>

        {/* Video Visual Layer */}
        <div 
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={togglePlay}
        >
          <BeatScenes 
            currentBeat={currentBeat} 
            progressInBeat={progressInCurrentBeat}
            isPlaying={isPlaying} 
          />
        </div>

        {/* Top Header Information Overlay (Safe Zone) */}
        <div className="relative z-20 pt-8 px-4 flex items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-2">
            <span className="font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/10 font-mono text-[11px] tabular-nums">
              {currentBeat.label}
            </span>
            <span className="text-white/80 text-[11px] truncate max-w-[140px]">
              {currentBeat.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSocialChrome(!showSocialChrome);
              }}
              className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-[10px] border border-white/10 text-white/80 hover:text-white"
            >
              {showSocialChrome ? 'Clean' : 'Reel UI'}
            </button>
          </div>
        </div>

        {/* Subtitles Overlay (Strictly Max 2 Lines per Card) */}
        <div className="relative z-20 px-5 mb-14 text-center pointer-events-none">
          {activeSubtitleCard && (
            <div className="inline-block max-w-[92%] bg-black/65 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl shadow-lg transition-all duration-300">
              {activeSubtitleCard.lines.map((line, index) => (
                <p 
                  key={index} 
                  className={`text-sm sm:text-base font-bold text-white tracking-wide leading-tight drop-shadow-md ${
                    index === 1 ? 'text-amber-300 mt-0.5' : ''
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Social Media UI Overlay (Side Buttons & Creator Tag) */}
        {showSocialChrome && (
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4">
            {/* Right Action Rail */}
            <div className="self-end mt-auto mb-20 flex flex-col items-center gap-4 pointer-events-auto">
              <button 
                onClick={() => {
                  setHasLiked(!hasLiked);
                  setLikesCount(prev => hasLiked ? prev - 1 : prev + 1);
                }}
                className="flex flex-col items-center text-white group"
              >
                <div className={`p-2.5 rounded-full transition-transform active:scale-75 ${
                  hasLiked ? 'bg-rose-500 text-white' : 'bg-black/40 text-white group-hover:bg-black/60'
                }`}>
                  <Heart className={`w-5 h-5 ${hasLiked ? 'fill-white' : ''}`} />
                </div>
                <span className="text-[10px] font-mono mt-1 font-semibold tabular-nums">
                  {likesCount.toLocaleString()}
                </span>
              </button>

              <button className="flex flex-col items-center text-white group">
                <div className="p-2.5 rounded-full bg-black/40 text-white group-hover:bg-black/60">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono mt-1 font-semibold tabular-nums">482</span>
              </button>

              <button className="flex flex-col items-center text-white group">
                <div className="p-2.5 rounded-full bg-black/40 text-white group-hover:bg-black/60">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono mt-1 font-semibold">Share</span>
              </button>

              {/* Rotating Audio Disc */}
              <div className="w-8 h-8 rounded-full border-2 border-white/30 bg-stone-900 flex items-center justify-center overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-tr from-amber-400 to-rose-500 ${
                  isPlaying ? 'animate-spin' : ''
                }`}>
                  <Music className="w-3.5 h-3.5 text-stone-950" />
                </div>
              </div>
            </div>

            {/* Bottom Caption & Audio Label */}
            <div className="mt-auto mb-1 pointer-events-auto text-left pr-14 text-white">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-[10px] font-bold">
                  SK
                </div>
                <span className="text-xs font-semibold">@study_korea_official</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-medium">Follow</span>
              </div>
              <p className="text-[11px] text-white/90 line-clamp-2 leading-snug">
                Hanbok isn&apos;t just traditional dress—it&apos;s a living philosophy of freedom and belonging for exchange students in Korea 🌸✨
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-white/70 mt-1 font-mono truncate">
                <Music className="w-3 h-3 shrink-0" />
                <span className="truncate">Traditional Gayageum Lo-Fi · Original Sound</span>
              </div>
            </div>
          </div>
        )}

        {/* Center Pause/Play Indicator when Clicked */}
        {!isPlaying && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 z-25 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 pl-1">
              <Play className="w-8 h-8 fill-slate-900 text-slate-900" />
            </div>
          </div>
        )}
      </div>

      {/* Production Control Deck & Beat Navigation */}
      <div className="flex-1 max-w-xl flex flex-col gap-5 w-full">
        {/* Playback Transport Bar */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 transition flex items-center justify-center font-medium shadow-md shadow-amber-400/20"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 pl-0.5" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                title="Restart from 00:00"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <div className="flex flex-col">
                <span className="text-xl font-bold font-mono tracking-tight text-white tabular-nums">
                  {formatTime(currentTime)} <span className="text-sm font-normal text-slate-400">/ 00:30.0</span>
                </span>
                <span className="text-xs text-amber-300/90 font-medium">
                  {currentBeat.label} · {currentBeat.title}
                </span>
              </div>
            </div>

            {/* Audio Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const nextVoice = !isVoiceoverEnabled;
                  setIsVoiceoverEnabled(nextVoice);
                  if (!nextVoice) soundEngine.stopVoiceover();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  isVoiceoverEnabled 
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
                title="Spoken narration using browser Web Speech"
              >
                {isVoiceoverEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                <span>Voice</span>
              </button>

              <button
                onClick={toggleMute}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  !isMuted 
                    ? 'bg-blue-500/15 border-blue-500/30 text-blue-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
                title="Traditional Korean Lo-fi Background Music"
              >
                {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>BGM</span>
              </button>

              {/* Speed Selector */}
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                {[0.75, 1, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 text-xs font-mono font-medium rounded-md transition ${
                      playbackSpeed === spd 
                        ? 'bg-amber-400 text-slate-950 font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Scrub Slider with 6-Second Markers */}
          <div className="relative pt-2 pb-1">
            <input
              type="range"
              min="0"
              max="30"
              step="0.05"
              value={currentTime}
              onChange={(e) => {
                soundEngine.stopVoiceover();
                lastBeatIndexRef.current = -1;
                setCurrentTime(parseFloat(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
            />
            {/* Beat Marker Ticks */}
            <div className="flex justify-between px-1 text-[11px] font-mono text-slate-400 mt-1.5">
              {beats.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => jumpToBeat(i)}
                  className={`hover:text-amber-300 transition tabular-nums ${
                    currentBeatIndex === i ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  {b.label}
                </button>
              ))}
              <span className="text-slate-600">30s</span>
            </div>
          </div>
        </div>

        {/* 5-Beat Interactive Segment Strips */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>5 Video Beats (6 seconds each)</span>
            <span>Constraint: Max 12 words &amp; 2 lines / card</span>
          </div>

          <div className="space-y-2">
            {beats.map((beat, idx) => {
              const isActive = currentBeatIndex === idx;
              return (
                <div
                  key={beat.id}
                  onClick={() => jumpToBeat(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3.5 ${
                    isActive 
                      ? 'bg-amber-500/10 border-amber-400/50 shadow-lg ring-1 ring-amber-400/30' 
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60'
                  }`}
                >
                  <div className={`px-2 py-1 rounded-md text-xs font-mono font-bold shrink-0 ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {beat.label}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-amber-200' : 'text-slate-200'}`}>
                        {beat.title}
                      </h4>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {beat.wordCount}/12 words
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                          Pass
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 italic mb-2">
                      &ldquo;{beat.narration}&rdquo;
                    </p>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span className="truncate">{beat.visualDirection}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Social Mockup Platform Selector */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
          <span className="text-slate-400">Social Preview Format:</span>
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            {(['reels', 'tiktok', 'shorts'] as SocialPlatform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1 rounded capitalize font-medium transition ${
                  platform === p ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
