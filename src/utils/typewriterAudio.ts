// Dragon Studio keyboard typing sound effect controller
// File: /sounds/dragon-studio-keyboard-typing-sound-effect-335503.mp3

class TypewriterAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private audioBuffer: AudioBuffer | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private isTyping: boolean = false;
  private isLoaded: boolean = false;
  private isLoading: boolean = false;
  private fallbackAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initFallback();
    }
  }

  private initFallback() {
    if (this.fallbackAudio) return;
    try {
      const audio = new Audio("/sounds/dragon-studio-keyboard-typing-sound-effect-335503.mp3");
      audio.loop = true;
      audio.volume = 0.65;
      audio.preload = "auto";
      this.fallbackAudio = audio;
    } catch {
      // Ignore
    }
  }

  private init(): boolean {
    if (typeof window === "undefined") return false;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => { });
    }
    if (!this.isLoaded && !this.isLoading) {
      this.loadAudio();
    }
    return true;
  }

  private async loadAudio() {
    if (this.isLoading || this.isLoaded || !this.ctx) return;
    this.isLoading = true;
    try {
      const res = await fetch("/sounds/dragon-studio-keyboard-typing-sound-effect-335503.mp3");
      const arrayBuffer = await res.arrayBuffer();
      if (!this.ctx) return;
      this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.isLoaded = true;
      if (this.isTyping && !this.isMuted) {
        this.startTyping();
      }
    } catch {
      // Fallback audio handles playback
    } finally {
      this.isLoading = false;
    }
  }

  public resume() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => { });
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopTyping();
    } else {
      this.resume();
      if (this.isTyping) {
        this.startTyping();
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public startTyping() {
    this.isTyping = true;
    if (this.isMuted) return;
    this.init();

    // 1. Primary: Web Audio API buffer source
    if (this.ctx && this.ctx.state === "running" && this.audioBuffer) {
      if (this.currentSource) return; // already active

      if (this.fallbackAudio && !this.fallbackAudio.paused) {
        this.fallbackAudio.pause();
      }

      try {
        const now = this.ctx.currentTime;
        const source = this.ctx.createBufferSource();
        source.buffer = this.audioBuffer;
        source.loop = true;
        // Start loop at 0.44s to skip the leading silence
        source.loopStart = 0.44;
        source.loopEnd = Math.max(0.44, this.audioBuffer.duration - 0.2);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.65, now + 0.03);

        source.connect(gain);
        gain.connect(this.ctx.destination);

        // Start playback at 0.44s for instant first keystroke sound
        source.start(now, 0.44);
        this.currentSource = source;
        this.gainNode = gain;
        return;
      } catch {
        // Fall through to fallback
      }
    }

    // 2. Fallback: HTML5 Audio
    if (this.fallbackAudio) {
      if (this.fallbackAudio.currentTime < 0.44) {
        this.fallbackAudio.currentTime = 0.44;
      }
      this.fallbackAudio.play().catch(() => { });
    }
  }

  public stopTyping() {
    this.isTyping = false;

    // Stop Web Audio source with gentle micro-fade
    if (this.ctx && this.currentSource && this.gainNode) {
      try {
        const now = this.ctx.currentTime;
        const source = this.currentSource;
        const gain = this.gainNode;
        this.currentSource = null;
        this.gainNode = null;

        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.04);

        setTimeout(() => {
          try {
            source.stop();
            source.disconnect();
            gain.disconnect();
          } catch { }
        }, 50);
      } catch {
        this.currentSource = null;
        this.gainNode = null;
      }
    }

    // Stop fallback Audio
    if (this.fallbackAudio && !this.fallbackAudio.paused) {
      this.fallbackAudio.pause();
      this.fallbackAudio.currentTime = 0.44;
    }
  }

  // Compatibility helpers
  public playKeystroke() {
    this.startTyping();
  }

  public playBell() {
    // No-op or optional subtle bell chime
  }
}

export const typewriterAudio = new TypewriterAudio();
