import { useState, useEffect, useCallback } from 'react';
import { speechService } from '../utils/tts';

export function useAudioReader() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeText, setActiveText] = useState(null);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((speaking) => {
      setIsSpeaking(speaking);
      if (!speaking) {
        setActiveText(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const speak = useCallback((text) => {
    setActiveText(text);
    speechService.speak(text, () => {
      setActiveText(null);
    });
  }, []);

  const stop = useCallback(() => {
    speechService.stop();
    setActiveText(null);
  }, []);

  const toggleSpeak = useCallback(
    (text) => {
      if (isSpeaking && activeText === text) {
        stop();
      } else {
        speak(text);
      }
    },
    [isSpeaking, activeText, speak, stop]
  );

  return {
    isSpeaking,
    activeText,
    speak,
    stop,
    toggleSpeak,
    hasSupport: speechService.hasSupport(),
  };
}
