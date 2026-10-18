class BanglaSpeechService {
  constructor() {
    this.synth = null;
    this.voice = null;
    this.isSupported = false;
    this.listeners = new Set();
    this.isCurrentlySpeaking = false;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.isSupported = true;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const bengaliVoice = voices.find(
      (v) => v.lang.toLowerCase().includes('bn') || v.name.toLowerCase().includes('bangla')
    );
    this.voice = bengaliVoice || voices[0] || null;
  }

  subscribe(cb) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  notify(speaking) {
    this.isCurrentlySpeaking = speaking;
    this.listeners.forEach((cb) => cb(speaking));
  }

  speak(text, onEnd) {
    if (!this.isSupported || !this.synth) {
      return false;
    }

    this.stop();

    const cleanText = (text || '')
      .replace(/[#*_`]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    if (this.voice) {
      utterance.voice = this.voice;
    }

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
      onEnd?.();
    };

    utterance.onerror = () => {
      this.notify(false);
    };

    this.synth.speak(utterance);
    return true;
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
    }
  }

  isSpeaking() {
    return this.isCurrentlySpeaking;
  }

  hasSupport() {
    return this.isSupported;
  }
}

export const speechService = new BanglaSpeechService();
