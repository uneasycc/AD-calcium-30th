// Web Audio API sound effects for AD Calcium Milk H5
// All sounds are synthesized - no external audio files needed

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3): void {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available, silent fallback
  }
}

function playNoise(duration: number, volume = 0.1): void {
  try {
    const ctx = getAudioCtx();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * volume;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime);
  } catch {
    // Audio not available, silent fallback
  }
}

// Bottle opening "pop" sound
export function playPop(): void {
  playNoise(0.08, 0.3);
  playTone(800, 0.1, 'sine', 0.2);
  setTimeout(() => playTone(600, 0.05, 'sine', 0.15), 50);
}

// Bubble sound
export function playBubble(): void {
  playTone(1200 + Math.random() * 400, 0.15, 'sine', 0.1);
}

// Click/select sound
export function playClick(): void {
  playTone(1000, 0.08, 'square', 0.08);
}

// Correct answer sound
export function playCorrect(): void {
  playTone(523, 0.15, 'sine', 0.2);
  setTimeout(() => playTone(659, 0.15, 'sine', 0.2), 100);
  setTimeout(() => playTone(784, 0.2, 'sine', 0.25), 200);
}

// Wrong/fail sound
export function playFail(): void {
  playTone(400, 0.15, 'sawtooth', 0.1);
  setTimeout(() => playTone(300, 0.2, 'sawtooth', 0.08), 120);
}

// Success fanfare
export function playSuccess(): void {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'sine', 0.2), i * 150);
  });
}

// Challenge tick sound
export function playTick(): void {
  playTone(800, 0.05, 'square', 0.05);
}

// Countdown beep
export function playCountdown(final = false): void {
  if (final) {
    playTone(1047, 0.3, 'sine', 0.3);
  } else {
    playTone(660, 0.15, 'sine', 0.2);
  }
}

// Mini-game success
export function playMiniSuccess(): void {
  playTone(880, 0.1, 'sine', 0.15);
  setTimeout(() => playTone(1100, 0.15, 'sine', 0.2), 80);
}

// Mini-game fail
export function playMiniFail(): void {
  playTone(300, 0.15, 'sawtooth', 0.08);
}
