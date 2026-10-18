import React, { useState } from 'react';
import {
  ShieldAlert,
  Printer,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Lock,
  Workflow,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { SAMPLE_RISK_PASSPORTS } from '../api/mockData';
import { toBengaliDigits, formatBengaliDecimal } from '../utils/bangla';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const RiskPassportPage = () => {
  const [selectedType, setSelectedType] = useState('green');
  const passport = SAMPLE_RISK_PASSPORTS[selectedType];

  const getPassportTheme = () => {
    switch (passport.overallRisk) {
      case 'low':
        return {
          border: 'border-emerald-500',
          badgeBg: 'bg-emerald-600 text-white',
          badgeText: 'সবুজ পাসপোর্ট — নিরাপদ ও নির্ভেজাল লেনদেনযোগ্য',
        };
      case 'medium':
        return {
          border: 'border-amber-500',
          badgeBg: 'bg-amber-600 text-white',
          badgeText: 'হলুদ পাসপোর্ট — মাঝারি ঝুঁকি / শর্তসাপেক্ষ লেনদেন',
        };
      case 'high':
      default:
        return {
          border: 'border-rose-600',
          badgeBg: 'bg-rose-600 text-white',
          badgeText: 'লাল পাসপোর্ট — উচ্চ ঝুঁকি / অর্থ লেনদেন বন্ধ রাখুন',
        };
    }
  };

  const theme = getPassportTheme();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 print:p-0 print:m-0">
      {/* Header (Hidden in Print) */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <Badge variant="warning" className="gap-1.5 px-3 py-1 bg-gov-gold/20 text-amber-900 border-gov-gold/40">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>১-পাতার সমন্বিত স্বত্ব ও অখণ্ডতা অডিট রিপোর্ট</span>
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            ভূমি লেনদেন ঝুঁকি পাসপোর্ট (Land Risk Passport)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            জমি কেনার আগে বায়না বা নগদ অর্থ দেওয়ার পূর্বে এই পাসপোর্ট কার্ডটি দেখে নিন। নথির ডিজিটাল সত্যতা, রেকর্ড গরমিল ও আইনি জটিলতার সমন্বিত স্কোরিং।
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={selectedType === 'green' ? 'default' : 'outline'}
                onClick={() => setSelectedType('green')}
                className={selectedType === 'green' ? 'bg-emerald-700 text-white' : ''}
              >
                🟢 দোহার (নিরাপদ)
              </Button>
              <Button
                size="sm"
                variant={selectedType === 'yellow' ? 'default' : 'outline'}
                onClick={() => setSelectedType('yellow')}
                className={selectedType === 'yellow' ? 'bg-amber-600 text-white' : ''}
              >
                🟡 চন্দ্রা (মাঝারি ঝুঁকি)
              </Button>
              <Button
                size="sm"
                variant={selectedType === 'red' ? 'default' : 'outline'}
                onClick={() => setSelectedType('red')}
                className={selectedType === 'red' ? 'bg-rose-700 text-white' : ''}
              >
                🔴 কেরানীগঞ্জ (উচ্চ ঝুঁকি)
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <VoiceButton
                text={`ভূমি লেনদেন ঝুঁকি পাসপোর্ট। এই সম্পত্তির ঝুঁকি স্তর: ${passport.riskLabelBangla}।`}
                size="sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="bg-slate-900 hover:bg-black text-white flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট / PDF ডাউনলোড</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* THE 1-PAGE PASSPORT DOCUMENT CARD */}
      <div
        id="risk-passport-card"
        className={`bg-white rounded-3xl border-4 ${theme.border} shadow-2xl p-6 sm:p-10 relative overflow-hidden space-y-6 print:border-2 print:shadow-none print:rounded-none`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center select-none font-black text-7xl text-slate-900 rotate-12">
          SMART LAND PASSPORT
        </div>

        {/* Passport Header Banner */}
        <div className="border-b-2 border-slate-200 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-land-700 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              🇧🇩
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                গণপ্রজাতন্ত্রী বাংলাদেশ — ডিজিটাল ভূমি সুরক্ষা
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                ভূমি লেনদেন ঝুঁকি পাসপোর্ট (Land Risk Passport)
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                আইডি: <strong className="text-slate-800">{passport.passportId}</strong> | যাচাই তারিখ: {passport.verifiedAt}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-md ${theme.badgeBg}`}>
              {passport.riskLabelBangla}
            </span>
            <p className="text-[10px] text-slate-400 font-mono">
              ডিজিটাল ভেরিফিকেশন কোড: {passport.digitalSeal}
            </p>
          </div>
        </div>

        {/* Property Identifiers */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">সম্পত্তির শিরোনাম:</span>
            <span className="font-bold text-slate-900">{passport.propertyTitle}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">মৌজা ও উপজেলা:</span>
            <span className="font-bold text-slate-900">
              {passport.mouza}, {passport.upazila}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">দাগ ও খতিয়ান নম্বর:</span>
            <span className="font-bold text-slate-900">
              দাগ {toBengaliDigits(passport.dagNo)}, খতিয়ান {toBengaliDigits(passport.khatianNo)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">জমির মোট পরিমাণ:</span>
            <span className="font-bold text-slate-900">
              {formatBengaliDecimal(passport.areaDecimal)}
            </span>
          </div>
        </div>

        {/* 4 Pillars Metrics */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            চারটি মূল স্তম্ভে নিরাপত্তা ও সামঞ্জস্য স্কোর:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-600" />
                  <span>নথি অখণ্ডতা (SHA-256)</span>
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {toBengaliDigits(passport.integrityScore)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-600 h-full rounded-full"
                  style={{ width: `${passport.integrityScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">ডিজিটাল সিল ও ক্রিপ্টোগ্রাফিক হ্যাশ মিল</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>রেকর্ড সামঞ্জস্য</span>
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {toBengaliDigits(passport.consistencyScore)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${passport.consistencyScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">দলিল বনাম আরএস/বিএস খতিয়ান ও দাগ</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5 text-indigo-600" />
                  <span>মালিকানা শৃঙ্খল (চেইন)</span>
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {toBengaliDigits(passport.chainScore)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${passport.chainScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">বিগত ২৫ বছরের বায়া দলিলের ধারাবাহিকতা</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>আইনি ও কর ছাড়পত্র</span>
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {toBengaliDigits(passport.legalClearanceScore)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${passport.legalClearanceScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">হাল খাজনা, দেওয়ানি মামলা ও নিষেধাজ্ঞা</p>
            </div>
          </div>
        </div>

        {/* Positives & Red Flags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wide text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>ইতিবাচক ও স্বত্ব সংগতি নির্দেশক ({toBengaliDigits(passport.positives.length)}টি):</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-950">
              {passport.positives.map((pos, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{pos}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`p-5 rounded-2xl border space-y-2 ${
              passport.redFlags.length > 0
                ? 'bg-rose-50/80 border-rose-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h4 className="font-bold text-xs uppercase tracking-wide text-rose-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>অমীমাংসিত ঝুঁকি ও রেড ফ্ল্যাগ ({toBengaliDigits(passport.redFlags.length)}টি):</span>
            </h4>
            {passport.redFlags.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-rose-950">
                {passport.redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-emerald-700 font-medium">
                কোনো উল্লেখযোগ্য রেড ফ্ল্যাগ বা আইনি বাধা পরিলক্ষিত হয়নি।
              </p>
            )}
          </div>
        </div>

        {/* Buyer Checklist */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>ক্রেতার বাধ্যতামূলক চেকলিস্ট (টাকা দেওয়ার পূর্বে যা যা তলব করবেন):</span>
            </h4>
            <span className="text-[10px] text-slate-400">নাগরিক সতর্কতা নির্দেশিকা</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
            {passport.buyerChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span className="w-5 h-5 rounded-full bg-slate-700 text-amber-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                  {toBengaliDigits(idx + 1)}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Passport Footer Seal */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-dashed rounded-full flex items-center justify-center text-center text-[8px] font-bold uppercase p-1">
              DIGITAL SEAL
            </div>
            <div>
              <p className="font-semibold text-slate-700">স্মার্ট ভূমি সেবা পোর্টাল বাংলাদেশ</p>
              <p className="text-[10px]">এই নথিটি কিউআর ও ব্লকচেইন-রেডি হ্যাশ সুরক্ষিত</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 max-w-xs text-center sm:text-right">
            ডিসক্লেইমার: এটি একটি প্রযুক্তিগত নাগরিক ঝুঁকি বিশ্লেষণ ডেমো। চূড়ান্ত জমি কেনার আগে স্থানীয় ভূমি অফিসের রেকর্ড ও বালাম পরীক্ষা অপরিহার্য।
          </p>
        </div>
      </div>
    </div>
  );
};
