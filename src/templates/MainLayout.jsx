import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { useAudioReader } from '../hooks/useAudioReader';
import { Volume2, VolumeX } from 'lucide-react';

export const MainLayout = ({ children }) => {
  const { isSpeaking, stop, activeText } = useAudioReader();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-bangla">
      <DisclaimerBanner />
      <Navbar />

      <main className="flex-1 w-full pb-16">
        {children}
      </main>

      {/* Floating active audio banner if TTS is speaking */}
      {isSpeaking && (
        <aside
          aria-label="অডিও ভয়েস সক্রিয়"
          className="fixed bottom-4 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-bounce duration-1000 max-w-sm"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-emerald-300">অডিও পাঠক চালু আছে</p>
            <p className="text-xs text-slate-200 truncate">{activeText || 'পড়ে শোনানো হচ্ছে...'}</p>
          </div>
          <button
            onClick={stop}
            className="p-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition"
            title="অডিও বন্ধ করুন"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </aside>
      )}

      <Footer />
    </div>
  );
};
