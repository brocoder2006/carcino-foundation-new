// Web Audio API procedural mechanical typewriter sound synthesizer

class TypewriterAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private noiseBuffer: AudioBuffer | null = null;

  private init(): boolean {
    if (typeof window === "undefined") return false;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.createNoiseBuffer();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return true;
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * 0.025));
    }
    this.noiseBuffer = buffer;
  }

  public resume() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.resume();
    }
    return this.isMuted;
  }

  public playKeystroke(isSpace: boolean = false) {
    if (this.isMuted) return;
    if (!this.init()) return;
    if (!this.ctx || this.ctx.state !== "running" || !this.noiseBuffer) return;

    try {
      const now = this.ctx.currentTime;
      const jitter = 0.88 + Math.random() * 0.24;

      // 1. Mechanical strike noise through resonant bandpass filter
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = this.noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime((isSpace ? 1200 : 2800) * jitter, now);
      bandpass.Q.setValueAtTime(isSpace ? 2.0 : 4.0, now);

      const noiseGain = this.ctx.createGain();
      const peakVolume = (isSpace ? 0.07 : 0.11) * (0.9 + Math.random() * 0.2);
      noiseGain.gain.setValueAtTime(peakVolume, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + (isSpace ? 0.04 : 0.03));

      noiseSource.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 0.045);

      // 2. High metallic click transient (paper impact)
      if (!isSpace) {
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(3200 * jitter, now);
        clickOsc.frequency.exponentialRampToValueAtTime(1600 * jitter, now + 0.015);

        clickGain.gain.setValueAtTime(0.06, now);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

        clickOsc.connect(clickGain);
        clickGain.connect(this.ctx.destination);

        clickOsc.start(now);
        clickOsc.stop(now + 0.02);
      }

      // 3. Chassis body thud (hollow resonance)
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thudOsc.type = "sine";
      const thudFreq = (isSpace ? 160 : 220) * jitter;
      thudOsc.frequency.setValueAtTime(thudFreq, now);
      thudOsc.frequency.exponentialRampToValueAtTime(thudFreq * 0.6, now + 0.035);

      thudGain.gain.setValueAtTime(isSpace ? 0.08 : 0.06, now);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      thudOsc.connect(thudGain);
      thudGain.connect(this.ctx.destination);

      thudOsc.start(now);
      thudOsc.stop(now + 0.04);
    } catch {
      // Audio errors fail silently
    }
  }

  public playBell() {
    if (this.isMuted) return;
    if (!this.init()) return;
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(2480, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(4960, now);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    } catch {
      // Audio errors fail silently
    }
  }
}

export const typewriterAudio = new TypewriterAudio();

