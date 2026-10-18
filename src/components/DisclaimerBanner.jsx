import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export const DisclaimerBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="সচেতনতামূলক নোটিশ"
      className="bg-amber-500/10 border-b border-amber-300/60 px-4 py-2 text-xs md:text-sm text-amber-950 flex items-center justify-between"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
        <p className="leading-snug">
          <strong className="font-semibold text-amber-900">নাগরিক সচেতনতামূলক ডেমো:</strong>{' '}
          এই প্ল্যাটফর্মের সকল তথ্য, দলিল ও খতিয়ান অনুসন্ধান একটি শিক্ষামূলক ও প্রযুক্তিগত সিমুলেশন। এটি কোনো আইনি বা সরকারি স্বত্ব প্রমাণপত্র নয়। মূল আইনি দলিলের জন্য সর্বদা সংশ্লিষ্ট সাব-রেজিস্ট্রি ও উপজেলা সহকারী কমিশনার (ভূমি) অফিসে যোগাযোগ করুন।
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="নোটিশ বন্ধ করুন"
        className="ml-3 p-1 text-amber-800 hover:text-black rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};
