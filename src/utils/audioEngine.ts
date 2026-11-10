// Synthesized realistic audio using Web Audio API (Zero external audio file dependencies!)
class PavilionAudioEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pure English willow "tonk" / crack
  playWillowCrack() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // High transient click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3.5, now);

    gain.gain.setValueAtTime(1.0, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);

    // Wood body resonance
    const woodOsc = this.ctx.createOscillator();
    const woodGain = this.ctx.createGain();
    woodOsc.type = 'sine';
    woodOsc.frequency.setValueAtTime(320, now);
    woodOsc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

    woodGain.gain.setValueAtTime(0.8, now);
    woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    woodOsc.connect(woodGain);
    woodGain.connect(this.ctx.destination);
    woodOsc.start(now);
    woodOsc.stop(now + 0.23);
  }

  // Wooden stump cartwheel & bails clatter
  playStumpClatter() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    [0, 0.04, 0.09, 0.16].forEach((delay, idx) => {
      if (!this.ctx) return;
      const t = now + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(600 + idx * 220, t);
      osc.frequency.exponentialRampToValueAtTime(200, t + 0.06);

      gain.gain.setValueAtTime(0.5 / (idx + 1), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  // Roaring Howzat Appeal
  playHowzat() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Synthesize vocal formants for "HOWWW-ZAAT"
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.linearRampToValueAtTime(280, now + 0.3);
    osc1.frequency.linearRampToValueAtTime(210, now + 0.6);

    osc2.frequency.setValueAtTime(144, now);
    osc2.frequency.linearRampToValueAtTime(285, now + 0.3);
    osc2.frequency.linearRampToValueAtTime(215, now + 0.6);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(2.0, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.75);
    osc2.stop(now + 0.75);
  }

  // Crowd applause / ovation clapping
  playApplause(duration = 2.0) {
    this.initCtx();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Clapping bursts simulation with pink-filtered noise
      const density = Math.random() > 0.94 ? (Math.random() * 2 - 1) * 1.5 : (Math.random() * 2 - 1) * 0.15;
      data[i] = density;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1600;
    filter.Q.value = 1.0;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.7, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Stadium Six Cheering with sweeping harmonics
  playBoundaryCheer() {
    this.playWillowCrack();
    setTimeout(() => {
      this.playApplause(2.8);
    }, 120);
  }
}

export const pavilionAudio = new PavilionAudioEngine();
