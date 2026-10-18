import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { SAMPLE_DEEDS, SAMPLE_KHATIANS } from '../api/mockData';
import { runConsistencyAudit } from '../validators/consistencyValidator';
import { StatusBadge } from '../components/StatusBadge';
import { toBengaliDigits } from '../utils/bangla';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const ConsistencyCheckerPage = () => {
  const navigate = useNavigate();
  const [selectedDeedIndex, setSelectedDeedIndex] = useState(0);
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Custom inspector state
  const [customDeed, setCustomDeed] = useState({
    mouza: 'দোহার (জেএল নং-০২)',
    dagNo: '৮৫২',
    khatianNo: '১৩৪০',
    areaDecimal: 5.0,
    landClass: 'বাস্তু / আবাসিক',
    sellerName: 'আব্দুল মোতালেব ভূঁইয়া',
    bayaRef: 'দলিল নং-৩৪২১/১৯৯৮',
  });

  const activeDeed = isCustomMode
    ? {
        id: 'custom-deed',
        deedNo: 'কাস্টম-পরীক্ষা/২০২৪',
        year: '২০২৪',
        registryOffice: 'উপজেলা সাব-রেজিস্ট্রি অফিস',
        district: 'ঢাকা',
        mouza: customDeed.mouza,
        jlNo: '০২',
        dagNo: customDeed.dagNo,
        khatianNo: customDeed.khatianNo,
        areaDecimal: customDeed.areaDecimal,
        landClass: customDeed.landClass,
        buyerName: 'পরীক্ষক নাগরিক',
        buyerNid: '১৯৯০১২৩৪৫৬৭৮৯০১২',
        sellerName: customDeed.sellerName,
        sellerNid: '১৯৬৫১২৩৪৫৬৭৮৯০১২',
        bayaDeedRef: customDeed.bayaRef,
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        qrPayload: 'https://land.gov.bd/verify/custom',
        registrationDate: '১৮ অক্টোবর ২০২৪',
        status: 'verified',
      }
    : SAMPLE_DEEDS[selectedDeedIndex];

  const activeKhatian = SAMPLE_KHATIANS[activeDeed.khatianNo];
  const auditResults = runConsistencyAudit(activeDeed, activeKhatian);

  const matchedCount = auditResults.filter((i) => i.status === 'matched').length;
  const mismatchCount = auditResults.filter((i) => i.status === 'mismatch').length;
  const verifyCount = auditResults.filter((i) => i.status === 'needs_verification').length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <Badge variant="success" className="gap-1.5 px-3 py-1">
            <Layers className="w-4 h-4 text-land-700" />
            <span>বহুমাত্রিক রেকর্ড ক্রস-ম্যাচিং ইঞ্জিন</span>
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            ভূমি রেকর্ড গরমিল পরীক্ষক — দলিল ⟷ খতিয়ান মিলমিশ
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            সাব-রেজিস্ট্রি দলিল, আরএস/বিএস খতিয়ান, দাগ নম্বর, জমির শ্রেণি, মালিকানার হিস্যা ও বায়া দলিলের তথ্য পাশাপাশি মিলিয়ে দেখুন। কোথায় গরমিল আছে তা সাধারণ বাংলায় স্পষ্ট জানুন।
          </p>

          <div className="pt-1">
            <VoiceButton
              text={`ভূমি রেকর্ড গরমিল পরীক্ষক। মোট ${toBengaliDigits(auditResults.length)}টি মানদণ্ডের মধ্যে ${toBengaliDigits(matchedCount)}টিতে তথ্যের মিল পাওয়া গেছে এবং ${toBengaliDigits(mismatchCount)}টিতে তথ্যে অমিল রয়েছে।`}
              label="ফলাফল শুনুন"
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* Mode Switcher: Pre-configured Dossiers vs Custom Inspector */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            পরীক্ষার মোড নির্বাচন করুন:
          </h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={!isCustomMode ? 'default' : 'outline'}
              onClick={() => setIsCustomMode(false)}
            >
              নমুনা কেস বিশ্লেষণ
            </Button>
            <Button
              size="sm"
              variant={isCustomMode ? 'default' : 'outline'}
              onClick={() => setIsCustomMode(true)}
            >
              ম্যানুয়াল কাস্টম ইনস্পেক্টর
            </Button>
          </div>
        </div>

        {!isCustomMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedDeedIndex(0)}
              className={`p-4 rounded-2xl border text-left transition ${
                selectedDeedIndex === 0
                  ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-300'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">ডসিয়ার ১: ধানমন্ডি</span>
                <Badge variant="success" className="text-[10px]">
                  ১০০% মিল
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                দলিল নং ৯৮৪২/২০২৩ | ৫ শতক আবাসিক জমি
              </p>
            </button>

            <button
              onClick={() => setSelectedDeedIndex(1)}
              className={`p-4 rounded-2xl border text-left transition ${
                selectedDeedIndex === 1
                  ? 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-300'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">ডসিয়ার ২: চন্দ্রা, গাজীপুর</span>
                <Badge variant="destructive" className="text-[10px]">
                  পরিমাণে অমিল
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                দলিলে ১৫ শতক কিন্তু রেকর্ডে ১২ শতক (৩ শতক ঘাটতি)
              </p>
            </button>

            <button
              onClick={() => setSelectedDeedIndex(2)}
              className={`p-4 rounded-2xl border text-left transition ${
                selectedDeedIndex === 2
                  ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-300'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">ডসিয়ার ৩: পটিয়া, চট্টগ্রাম</span>
                <Badge variant="warning" className="text-[10px]">
                  বায়া চেইন মিসিং
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                ৮.২৫ শতক | ২৫ বছরের পূর্ববর্তী দলিল অনুল্লেখিত
              </p>
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <p className="font-bold text-slate-800">
              আপনার দলিলের তথ্য পরিবর্তন করে দেখুন তাৎক্ষণিক গরমিল নিরূপণ:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">মৌজা ও জেএল:</label>
                <input
                  type="text"
                  value={customDeed.mouza}
                  onChange={(e) => setCustomDeed({ ...customDeed, mouza: e.target.value })}
                  className="w-full border p-1.5 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">দাগ নম্বর:</label>
                <input
                  type="text"
                  value={customDeed.dagNo}
                  onChange={(e) => setCustomDeed({ ...customDeed, dagNo: e.target.value })}
                  className="w-full border p-1.5 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">জমির পরিমাণ (শতক):</label>
                <input
                  type="number"
                  step="0.5"
                  value={customDeed.areaDecimal}
                  onChange={(e) =>
                    setCustomDeed({ ...customDeed, areaDecimal: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full border p-1.5 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">বায়া দলিল রেফারেন্স:</label>
                <input
                  type="text"
                  value={customDeed.bayaRef}
                  placeholder="খালি রাখলে সতর্কতা দেখাবে"
                  onChange={(e) => setCustomDeed({ ...customDeed, bayaRef: e.target.value })}
                  className="w-full border p-1.5 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Audit Summary Badges */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-emerald-800">
            {toBengaliDigits(matchedCount)}
          </span>
          <p className="text-xs font-bold text-emerald-900">তথ্যের মিল পাওয়া গেছে</p>
        </div>

        <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-rose-800">
            {toBengaliDigits(mismatchCount)}
          </span>
          <p className="text-xs font-bold text-rose-900">তথ্যে অমিল</p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl text-center space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-amber-800">
            {toBengaliDigits(verifyCount)}
          </span>
          <p className="text-xs font-bold text-amber-900">আরও যাচাই প্রয়োজন</p>
        </div>
      </div>

      {/* Detailed Audit Table */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          বিশদ গরমিল প্রতিবেদন (Field-by-Field Breakdown)
        </h2>

        <div className="space-y-4">
          {auditResults.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition ${
                item.status === 'matched'
                  ? 'border-emerald-200 bg-emerald-50/40'
                  : item.status === 'mismatch'
                  ? 'border-rose-300 bg-rose-50/40 ring-1 ring-rose-200'
                  : 'border-amber-200 bg-amber-50/40'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {item.field}
                </h3>
                <StatusBadge status={item.status} size="sm" />
              </div>

              {/* Side-by-side values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/80 p-3 rounded-xl border border-slate-200/80 mb-3">
                <div>
                  <span className="text-slate-400 block font-medium">দলিলের তথ্য:</span>
                  <span className="font-bold text-slate-800">{item.deedValue}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">খতিয়ান ও সরকারি রেকর্ড:</span>
                  <span className="font-bold text-slate-800">{item.recordValue}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>ব্যাখ্যা:</strong> {item.explanation}
              </p>

              {item.remedy && (
                <div className="mt-2 text-xs font-semibold text-slate-900 bg-white/90 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-amber-800 font-bold">আইনি পরামর্শ ও প্রতিকার: </span>
                  {item.remedy}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Legal Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-950 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>আইনি সতর্কবার্তা:</strong> এটি একটি সচেতনতামূলক অ্যালগরিদম ভিত্তিক সিমুলেশন। কোনো গরমিল না পাওয়ার অর্থ এই নয় যে জমিটি আদালতে সম্পূর্ণ স্বত্ব বিরোধমুক্ত। জমি ক্রয়ের চূড়ান্ত পূর্বে অবশ্যই একজন দক্ষ আইনজীবী ও সার্ভেয়ারের মাধ্যমে সরেজমিন দখল ও সাব-রেজিস্ট্রি বালাম বই তল্লাশি করা আবশ্যক।
        </p>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          size="default"
          onClick={() => navigate('/risk-passport')}
          className="flex items-center gap-2"
        >
          <span>ভূমি লেনদেন ঝুঁকি পাসপোর্ট দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
