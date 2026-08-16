// Web Audio API procedural sound synthesis engine for Everfold
// Provides zero-asset-dependency, instantaneous, high-fidelity UI cues and subtle ambient soundscapes.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private uiVolume: number = 0.7;
  private ambientVolume: number = 0.3;
  private ambientSource: { stop: () => void } | null = null;
  private currentAmbientMode: string | null = null;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientSource) {
      this.stopAmbient();
    } else if (!muted && this.currentAmbientMode) {
      this.startAmbient(this.currentAmbientMode);
    }
  }

  public setVolumes(uiVol: number, ambVol: number) {
    this.uiVolume = Math.max(0, Math.min(1, uiVol));
    this.ambientVolume = Math.max(0, Math.min(1, ambVol));
  }

  // Play standard UI and ARG sound cues
  public playCue(cue: string) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.uiVolume * 0.4, t);
    masterGain.connect(this.ctx.destination);

    switch (cue) {
      case 'ui.navigation': {
        // Soft fabric/wood tick
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.04);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      }

      case 'ui.save': {
        // Rounded warm pluck
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(160, t + 0.15);
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.16);
        break;
      }

      case 'ui.match': {
        // Two warm harmonic notes (e.g. F4 -> A4)
        [349.23, 440.0].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.12);
          gain.gain.setValueAtTime(0, t + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.35, t + idx * 0.12 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.35);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.12);
          osc.stop(t + idx * 0.12 + 0.36);
        });
        break;
      }

      case 'arg.previouslyMatched': {
        // Match motif one octave lower with slow detune (F3 -> A3)
        [174.61, 220.0].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.18);
          osc.frequency.linearRampToValueAtTime(freq - 4, t + idx * 0.18 + 0.6);
          gain.gain.setValueAtTime(0, t + idx * 0.18);
          gain.gain.linearRampToValueAtTime(0.4, t + idx * 0.18 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.18 + 0.6);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.18);
          osc.stop(t + idx * 0.18 + 0.65);
        });
        break;
      }

      case 'ui.messageSent': {
        // Soft tap
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.06);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.07);
        break;
      }

      case 'ui.messageReceived': {
        // Glass/wood ping
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(660, t + 0.18);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.19);
        break;
      }

      case 'arg.archivedNotification': {
        // Normal ping + faint reverse-filtered swelling tail
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(740, t);
        osc1.frequency.exponentialRampToValueAtTime(520, t + 0.2);
        gain1.gain.setValueAtTime(0.3, t);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc1.connect(gain1);
        gain1.connect(masterGain);
        osc1.start(t);
        osc1.stop(t + 0.22);

        // Reverse tail
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(360, t + 0.1);
        osc2.frequency.linearRampToValueAtTime(540, t + 0.35);
        gain2.gain.setValueAtTime(0.001, t + 0.1);
        gain2.gain.linearRampToValueAtTime(0.18, t + 0.3);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc2.connect(gain2);
        gain2.connect(masterGain);
        osc2.start(t + 0.1);
        osc2.stop(t + 0.46);
        break;
      }

      case 'ui.notification': {
        // Muted chime / bell
        [587.33, 880.0].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.08);
          gain.gain.setValueAtTime(0.25, t + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.08);
          osc.stop(t + idx * 0.08 + 0.26);
        });
        break;
      }

      case 'ui.success': {
        // 3-note ascending motif (C5, E5, G5)
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.09);
          gain.gain.setValueAtTime(0.28, t + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.28);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.09);
          osc.stop(t + idx * 0.09 + 0.29);
        });
        break;
      }

      case 'arg.returnSuccess': {
        // 3-note motif with unresolved final tone
        [523.25, 659.25, 740.0].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.1);
          gain.gain.setValueAtTime(0.3, t + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + (idx === 2 ? 0.6 : 0.25));
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.1);
          osc.stop(t + idx * 0.1 + 0.65);
        });
        break;
      }

      case 'ui.failure': {
        // Soft low thunk
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.18);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.2);
        break;
      }

      case 'ui.archiveOpen': {
        // Paper slide / mechanical latch
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.linearRampToValueAtTime(320, t + 0.08);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.16);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.17);
        break;
      }

      case 'ui.graphAlign': {
        // Converging harmonic tones
        [300, 600].forEach((startFreq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(startFreq, t);
          osc.frequency.exponentialRampToValueAtTime(440, t + 0.35);
          gain.gain.setValueAtTime(0.25, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t);
          osc.stop(t + 0.36);
        });
        break;
      }

      case 'ui.forecast': {
        // Brushed harmonic chord (D major 7th)
        [293.66, 369.99, 440.0, 554.37].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.04);
          gain.gain.setValueAtTime(0.18, t + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.5);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.04);
          osc.stop(t + idx * 0.04 + 0.52);
        });
        break;
      }

      case 'storyAccess.open': {
        // Gentle clean modal reveal tone
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(554.37, t + 0.12);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.16);
        break;
      }

      case 'storyAccess.previewEnabled': {
        // Subtle warm 2-tone chime
        [392.0, 587.33].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.08);
          gain.gain.setValueAtTime(0.22, t + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.08);
          osc.stop(t + idx * 0.08 + 0.26);
        });
        break;
      }

      case 'storyAccess.fullEnabled': {
        // Expanded soft harmonic chord
        [329.63, 493.88, 659.25].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.06);
          gain.gain.setValueAtTime(0.2, t + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.4);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.06);
          osc.stop(t + idx * 0.06 + 0.42);
        });
        break;
      }

      case 'storyAccess.reset': {
        // Soft low descending tone
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.16);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.17);
        break;
      }

      case 'storyAccess.warningOpen': {
        // Gentle alert tap
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(330, t);
        osc.frequency.exponentialRampToValueAtTime(290, t + 0.1);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.11);
        break;
      }

      case 'quiz.complete': {
        // Light upward 3-tone chime (C5 -> E5 -> G5)
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.09);
          gain.gain.setValueAtTime(0.25, t + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.3);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.09);
          osc.stop(t + idx * 0.09 + 0.32);
        });
        break;
      }

      case 'quiz.sharedReveal': {
        // Lush harmonic resonant chord
        [349.23, 440.0, 523.25, 659.25].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.07);
          gain.gain.setValueAtTime(0.18, t + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.45);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.07);
          osc.stop(t + idx * 0.07 + 0.48);
        });
        break;
      }

      case 'dailyQuestion.submit':
      case 'comment.post': {
        // Soft wooden paper drop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.exponentialRampToValueAtTime(130, t + 0.08);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.09);
        break;
      }

      case 'comment.replyArrive': {
        // Soft subtle double tap
        [440, 554.37].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.06);
          gain.gain.setValueAtTime(0.15, t + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.15);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.06);
          osc.stop(t + idx * 0.06 + 0.16);
        });
        break;
      }

      case 'support.ticketCreated':
      case 'memory.saved': {
        // Resonant lock click
        [329.63, 493.88].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.08);
          gain.gain.setValueAtTime(0.2, t + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.2);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.08);
          osc.stop(t + idx * 0.08 + 0.22);
        });
        break;
      }

      case 'event.rsvp':
      case 'magazine.issueOpen': {
        // Crisp turning page shimmer
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, t);
        osc.frequency.exponentialRampToValueAtTime(580, t + 0.12);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.13);
        break;
      }

      case 'ui.dateConfirmed': {
        // Small chime
        [523.25, 659.25, 880.0].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.06);
          gain.gain.setValueAtTime(0.22, t + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.3);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t + idx * 0.06);
          osc.stop(t + idx * 0.06 + 0.31);
        });
        break;
      }

      default:
        break;
    }
  }

  // Synthesize procedural subtle ambient background loops
  public startAmbient(mode: string) {
    this.currentAmbientMode = mode;
    if (this.isMuted) return;
    this.stopAmbient();
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const ambGain = this.ctx.createGain();
    ambGain.gain.setValueAtTime(0, t);
    ambGain.gain.linearRampToValueAtTime(this.ambientVolume * 0.25, t + 1.2);
    ambGain.connect(this.ctx.destination);

    const nodesToStop: { stop: (time?: number) => void }[] = [];

    if (mode === 'home') {
      // Subtle warm room tone: 55Hz sine + soft brown noise filter
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, t);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, t);
      osc.connect(gain);
      gain.connect(ambGain);
      osc.start(t);
      nodesToStop.push(osc);
    } else if (mode === 'archive') {
      // HVAC + distant filtered noise
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(62, t);
      const gain1 = this.ctx.createGain();
      gain1.gain.setValueAtTime(0.12, t);
      osc1.connect(gain1);
      gain1.connect(ambGain);
      osc1.start(t);
      nodesToStop.push(osc1);
    } else if (mode === 'pairwise') {
      // Quiet 60Hz CRT raster hum
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, t);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, t);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ambGain);
      osc.start(t);
      nodesToStop.push(osc);
    } else if (mode === 'affinity') {
      // Quiet computer fan
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95, t);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(120, t);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.07, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ambGain);
      osc.start(t);
      nodesToStop.push(osc);
    } else if (mode === 'internal') {
      // Soft office air
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(70, t);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.1, t);
      osc.connect(gain);
      gain.connect(ambGain);
      osc.start(t);
      nodesToStop.push(osc);
    } else if (mode === 'recurrence') {
      // Binaural/tonal beating: 110Hz and 110.5Hz sine waves
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(110, t);
      osc2.frequency.setValueAtTime(110.5, t);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.14, t);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ambGain);
      osc1.start(t);
      osc2.start(t);
      nodesToStop.push(osc1, osc2);
    }

    this.ambientSource = {
      stop: () => {
        if (!this.ctx) return;
        const stopTime = this.ctx.currentTime;
        ambGain.gain.linearRampToValueAtTime(0.001, stopTime + 0.8);
        setTimeout(() => {
          nodesToStop.forEach((n) => {
            try {
              n.stop();
            } catch (e) {}
          });
        }, 900);
      },
    };
  }

  public stopAmbient() {
    if (this.ambientSource) {
      this.ambientSource.stop();
      this.ambientSource = null;
    }
  }

  // Play audio puzzle motif (visual fallback provided in component)
  public playMotif(pattern: number[]) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const baseFreqs = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];
    pattern.forEach((noteIdx, i) => {
      if (!this.ctx) return;
      const freq = baseFreqs[noteIdx % baseFreqs.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.28);
      gain.gain.setValueAtTime(0.3, t + i * 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.28 + 0.26);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + i * 0.28);
      osc.stop(t + i * 0.28 + 0.27);
    });
  }
}

export const soundEngine = new SoundEngine();
