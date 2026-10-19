/**
 * Interactive Web Audio Synthesizer for Korean Traditional Lo-fi Music & Speech Narration
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingBgm = false;
  private bgmInterval: number | null = null;
  private volumeNode: GainNode | null = null;
  private bgmVolume = 0.25;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pentatonic scale commonly associated with traditional Korean music (Gung, Sang, Gak, Chi, U: C4, D4, F4, G4, A4, C5, D5)
  private pentatonicFreqs = [261.63, 293.66, 349.23, 392.0, 440.0, 523.25, 587.33, 698.46];

  public setVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  public playGayageumPluck(freq: number, time: number = 0, duration: number = 1.2) {
    if (!this.ctx || !this.volumeNode) return;
    const now = this.ctx.currentTime + time;

    // Dual oscillator for rich plucked string resonance
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, now);
    // Slight pitch bend characteristic of Gayageum / geomungo vibrato (nonghyeon)
    osc1.frequency.exponentialRampToValueAtTime(freq * 1.015, now + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.4);

    osc2.frequency.setValueAtTime(freq * 2, now);

    // Fast pluck attack and slow decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.volumeNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  public playLofiKick(time: number = 0) {
    if (!this.ctx || !this.volumeNode) return;
    const now = this.ctx.currentTime + time;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playPalaceChime() {
    this.initContext();
    if (!this.ctx || !this.volumeNode) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      this.playGayageumPluck(freq, i * 0.07, 1.8);
    });
  }

  public startBgm() {
    this.initContext();
    if (this.isPlayingBgm) return;
    this.isPlayingBgm = true;

    let step = 0;
    const loopInterval = 500; // 120 bpm eighth notes

    const tick = () => {
      if (!this.isPlayingBgm) return;

      // Soft kick on beat 1 and 3
      if (step % 4 === 0) {
        this.playLofiKick();
      }

      // Melodic pentatonic notes
      const pattern = [0, 2, 4, 3, 5, 4, 2, 1, 3, 5, 6, 4, 3, 2, 4, 0];
      const noteIdx = pattern[step % pattern.length];
      const freq = this.pentatonicFreqs[noteIdx % this.pentatonicFreqs.length];

      if (step % 2 === 0 || Math.random() > 0.4) {
        this.playGayageumPluck(freq, 0, 0.8);
      }

      step++;
    };

    tick();
    this.bgmInterval = window.setInterval(tick, loopInterval);
  }

  public stopBgm() {
    this.isPlayingBgm = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public playVoiceover(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05; // natural friendly conversational pace
    utterance.pitch = 1.05;

    // Try to find a friendly natural English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Victoria'))) 
      || voices.find(v => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  public stopVoiceover() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
