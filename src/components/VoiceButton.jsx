import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioReader } from '../hooks/useAudioReader';
import { cn } from '../utils/cn';

export const VoiceButton = ({
  text,
  label = 'শুনুন',
  size = 'md',
  className = '',
}) => {
  const { isSpeaking, activeText, toggleSpeak, hasSupport } = useAudioReader();
  const isThisSpeaking = isSpeaking && activeText === text;

  if (!hasSupport) {
    return null;
  }

  const basePadding = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleSpeak(text);
      }}
      title={isThisSpeaking ? 'পড়া বন্ধ করুন' : 'পড়ে শোনান'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 select-none',
        isThisSpeaking
          ? 'bg-red-600 text-white shadow-md animate-pulse ring-2 ring-red-300'
          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 active:scale-95',
        basePadding,
        className
      )}
    >
      {isThisSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          <span>থামান</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
