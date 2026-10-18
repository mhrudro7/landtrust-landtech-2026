import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  Workflow,
  Search,
  FileText,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const HomePage = () => {
  const navigate = useNavigate();
  const [quickSearchQuery, setQuickSearchQuery] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const query = quickSearchQuery.trim();
    if (!query) return;

    if (query.toUpperCase().includes('MUT') || query.includes('আবেদন') || query.includes('কেস')) {
      navigate('/mutation-tracker');
    } else if (query.includes('দলিল') || query.includes('৯৮৪২') || query.includes('১২০৫')) {
      navigate('/deed-verify');
    } else if (query.includes('পাসপোর্ট') || query.includes('ঝুঁকি')) {
      navigate('/risk-passport');
    } else if (query.includes('গরমিল') || query.includes('খতিয়ান')) {
      navigate('/consistency-checker');
    } else {
      navigate('/journey');
    }
  };

  const heroAudioText =
    'স্মার্ট ভূমি সেবা বাংলাদেশে আপনাকে স্বাগতম। এই প্ল্যাটফর্মের মাধ্যমে আপনি সহজ বাংলায় নামজারি আবেদন সহকারী, জমি কেনাবেচা ও দলিলের সরকারি ফি, সাব-রেজিস্ট্রি দলিল যাচাই এবং আবেদনের অগ্রগতি দেখতে পারবেন। কোনো সহায়তার জন্য কল করুন ১৬১২২।';

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-land-900 via-land-800 to-land-950 text-white pt-12 pb-20 px-4 sm:px-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-gov-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>সহজ ও দালালমুক্ত ডিজিটাল ভূমি সেবা</span>
              <span className="text-slate-400">|</span>
              <span className="text-white">নাগরিক সহায়ক পোর্টাল</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              সহজ বাংলায় আপনার জমির <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-amber-200">
                দলিল, নামজারি ও রেকর্ড যাচাই
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto">
              জমি কেনাবেচা, ওয়ারিশান সনদ বা নামজারি নিয়ে জটিলতা? কোনো মধ্যস্বত্বভোগী ছাড়া নিজেই নিজের জমির দলিল পরীক্ষা করুন এবং সরকারি নিয়মে আবেদনের প্রস্তুতি নিন।
            </p>

            {/* Audio Voice Narration */}
            <div className="flex justify-center pt-1">
              <VoiceButton
                text={heroAudioText}
                label="মুখ্য বার্তা শুনুন (Audio)"
                className="bg-emerald-800/90 hover:bg-emerald-700 text-white border-emerald-500/60 shadow-lg text-sm"
              />
            </div>

            {/* Quick Interactive Search Bar */}
            <form onSubmit={handleQuickSearch} className="pt-4 max-w-2xl mx-auto">
              <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 border-2 border-emerald-400/30">
                <div className="flex items-center gap-2 px-3 w-full text-slate-800">
                  <Search className="w-5 h-5 text-land-700 shrink-0" />
                  <input
                    type="text"
                    value={quickSearchQuery}
                    onChange={(e) => setQuickSearchQuery(e.target.value)}
                    placeholder="দলিল নং, আবেদন কেস আইডি বা মৌজার নাম লিখুন..."
                    className="w-full text-sm sm:text-base outline-none bg-transparent placeholder:text-slate-400 py-1"
                  />
                </div>
                <Button
                  type="submit"
                  size="default"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-land-700 hover:bg-land-800 text-white font-bold text-sm shrink-0 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>অনুসন্ধান</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Sample Quick Searches */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-300">
                <span className="text-slate-400">নমুনা অনুসন্ধান:</span>
                <button
                  type="button"
                  onClick={() => navigate('/mutation-tracker')}
                  className="bg-land-950/60 hover:bg-land-800 px-2.5 py-1 rounded-lg border border-emerald-600/40 transition"
                >
                  MUT-2024-DH-84920
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/deed-verify')}
                  className="bg-land-950/60 hover:bg-land-800 px-2.5 py-1 rounded-lg border border-emerald-600/40 transition"
                >
                  দলিল নং ৯৮৪২/২০২৩
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/risk-passport')}
                  className="bg-land-950/60 hover:bg-land-800 px-2.5 py-1 rounded-lg border border-emerald-600/40 transition"
                >
                  দোহার ঝুঁকি পাসপোর্ট
                </button>
              </div>
            </form>
          </div>

          {/* 4 Citizen Situation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <div
              onClick={() => navigate('/journey')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 p-4 rounded-2xl cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  ১
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white group-hover:text-emerald-300">
                    জমি ক্রয় করেছি বা করব
                  </h2>
                  <p className="text-xs text-slate-300">বায়া দলিল ও সাফ-কবালা রোডম্যাপ</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate('/journey')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 p-4 rounded-2xl cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  ২
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white group-hover:text-amber-300">
                    ওয়ারিশ সূত্রে জমি পেয়েছি
                  </h2>
                  <p className="text-xs text-slate-300">ওয়ারিশান সনদ ও আপস বণ্টন গাইড</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate('/deed-verify')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 p-4 rounded-2xl cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                  ৩
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white group-hover:text-cyan-300">
                    দলিল আসল নাকি নকল?
                  </h2>
                  <p className="text-xs text-slate-300">SHA-256 হ্যাশ ও কিউআর যাচাই</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate('/mutation-tracker')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 p-4 rounded-2xl cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
                  ৪
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white group-hover:text-rose-300">
                    আবেদনের অবস্থা কত দূর?
                  </h2>
                  <p className="text-xs text-slate-300">এসি ল্যান্ড শুনানির তারিখ ও আপডেট</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Prominent Core Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <Badge variant="success" className="px-3 py-1">
            মূল নাগরিক সেবাসমূহ
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            চারটি প্রধান ডিজিটাল সেবা
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            আপনার কাঙ্ক্ষিত সেবাটি বেছে নিয়ে সরাসরি সম্পূর্ণ নির্দেশিকা ও তথ্য যাচাই শুরু করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Service 1: নামজারি করুন */}
          <Card
            onClick={() => navigate('/mutation-assist')}
            className="p-6 sm:p-8 border-2 border-emerald-100 hover:border-land-500 shadow-land-card hover:shadow-land-hover cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-land-700 flex items-center justify-center shadow-inner group-hover:bg-land-700 group-hover:text-white transition-colors">
                  <FileCheck2 className="w-8 h-8" />
                </div>
                <Badge variant="success">সরকারি ফি: ১,১৭০ ৳</Badge>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-land-800 transition">
                  ১. নামজারি করুন (ই-নামজারি সহায়ক)
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  ধাপে ধাপে সঠিক নিয়মে ই-নামজারি আবেদনের পূর্ণ গাইড। প্রয়োজনীয় কাগজের চেকলিস্ট, আবেদনপত্রের নমুনা পূরণ এবং লাইভ ভুল-ত্রুটি বা মিসিং ডাটা সতর্কতা।
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ ৪ ধাপের সহজ ফরম</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ ভুল শনাক্তকরণ</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ রেডিমেড ডেমো ফাইল</span>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-land-700 group-hover:text-land-900 flex items-center gap-1.5">
                সহায়তা শুরু করুন <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </span>
              <VoiceButton
                text="নামজারি করুন: ধাপে ধাপে সঠিক নিয়মে ই-নামজারি আবেদনের পূর্ণ গাইড। মোট সরকারি খরচ মাত্র এক হাজার একশত সত্তর টাকা।"
                size="sm"
              />
            </div>
          </Card>

          {/* Service 2: মালিকানা বদলের নিয়ম */}
          <Card
            onClick={() => navigate('/ownership-transfer')}
            className="p-6 sm:p-8 border-2 border-emerald-100 hover:border-land-500 shadow-land-card hover:shadow-land-hover cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-inner group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Workflow className="w-8 h-8" />
                </div>
                <Badge variant="warning">খরচ ক্যালকুলেটর সহ</Badge>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-800 transition">
                  ২. মালিকানা বদলের নিয়ম (হস্তান্তর রোডম্যাপ)
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  জমি ক্রয়, রক্তসম্পর্কীয় মুসলিম হেবা দানপত্র কিংবা পৈত্রিক ওয়ারিশ বণ্টন—কোন পরিস্থিতিতে কী নিয়ম এবং স্ট্যাম্প ডিউটি ও সরকারি ফি কত লাগবে তা এক ক্লিকে জানুন।
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ সাফ-কবালা ও হেবা নিয়ম</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ সরকারি ট্যাক্স ক্যালকুলেটর</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ ৫টি গুরুত্বপূর্ণ ধাপ</span>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-amber-700 group-hover:text-amber-900 flex items-center gap-1.5">
                রোডম্যাপ দেখুন <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </span>
              <VoiceButton
                text="মালিকানা বদলের নিয়ম: জমি ক্রয়, মুসলিম হেবা দানপত্র কিংবা পৈত্রিক ওয়ারিশ বণ্টনের সম্পূর্ণ নিয়ম ও সরকারি ফি ক্যালকুলেটর।"
                size="sm"
              />
            </div>
          </Card>

          {/* Service 3: দলিল যাচাই */}
          <Card
            onClick={() => navigate('/deed-verify')}
            className="p-6 sm:p-8 border-2 border-emerald-100 hover:border-land-500 shadow-land-card hover:shadow-land-hover cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center shadow-inner group-hover:bg-cyan-700 group-hover:text-white transition-colors">
                  <Search className="w-8 h-8" />
                </div>
                <Badge variant="outline" className="border-cyan-300 bg-cyan-50 text-cyan-900">
                  SHA-256 ফাইল অখণ্ডতা
                </Badge>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-cyan-800 transition">
                  ৩. দলিল যাচাই (ডিজিটাল ভেরিফিকেশন)
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  সাব-রেজিস্ট্রি দলিলের নম্বর দিয়ে নমুনা তল্লাশি, কিউআর কোড স্ক্যানার এবং ব্রাউজারে ক্রিপ্টোগ্রাফিক হ্যাশ তৈরি করে ফাইলের জালিয়াতি বা পরিবর্তন শনাক্ত করার লাইভ ডেমো।
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ কিউআর স্ক্যান ডেমো</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ হ্যাশ ফিঙ্গারপ্রিন্ট</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ অমিল ব্যাখ্যা</span>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-cyan-700 group-hover:text-cyan-900 flex items-center gap-1.5">
                দলিল পরীক্ষা করুন <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </span>
              <VoiceButton
                text="দলিল যাচাই: সাব-রেজিস্ট্রি দলিলের নমুনা অনুসন্ধান, কিউআর কোড স্ক্যানার এবং ফাইলের আসলত্ব যাচাই ডেমো।"
                size="sm"
              />
            </div>
          </Card>

          {/* Service 4: আবেদনের অবস্থা */}
          <Card
            onClick={() => navigate('/mutation-tracker')}
            className="p-6 sm:p-8 border-2 border-emerald-100 hover:border-land-500 shadow-land-card hover:shadow-land-hover cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center shadow-inner group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <FileText className="w-8 h-8" />
                </div>
                <Badge variant="destructive">৫ ধাপের টাইমলাইন</Badge>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-rose-800 transition">
                  ৪. আবেদনের অবস্থা (ই-নামজারি ট্র্যাকার)
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  আবেদন কেস নম্বর দিয়ে ফাইলটি বর্তমানে সহকারী কমিশনার (ভূমি), তহশিলদার নাকি শুনানির নোটিশে রয়েছে তা সরাসরি টাইমলাইনে দেখুন এবং পরবর্তী করণীয় জানুন।
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ সরাসরি কেস ট্র্যাকিং</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ ঘাটতি কাগজ সতর্কতা</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">✓ মোবাইল এসএমএস লগ</span>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-rose-700 group-hover:text-rose-900 flex items-center gap-1.5">
                আবেদনের অবস্থা ট্র্যাক করুন <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </span>
              <VoiceButton
                text="আবেদনের অবস্থা ট্র্যাকার: নামজারি কেস নম্বর দিয়ে আপনার ফাইল কোন টেবিলে আছে এবং শুনানির তারিখ কত তা সরাসরি জানুন।"
                size="sm"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Innovation: Risk Passport & Consistency Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-900 via-land-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-gov-gold/20 text-amber-300 border border-gov-gold/40 text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ভূমি খাতের সিগনেচার উদ্ভাবন</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              জমি কেনার আগে এক পাতায় জেনে নিন <br />
              <span className="text-amber-300">‘ভূমি লেনদেন ঝুঁকি পাসপোর্ট’</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              নথির ডিজিটাল অখণ্ডতা, খতিয়ান ও দাগ সামঞ্জস্য, ২৫ বছরের বায়া দলিলের ধারাবাহিকতা এবং অর্পিত সম্পত্তি বা স্বত্ব মামলার ঝুঁকি নিয়ে তৈরি সমন্বিত রিপোর্ট কার্ড। টাকা দেওয়ার আগে নিশ্চিত হোন আপনার জমি শতভাগ নিরাপদ।
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={() => navigate('/risk-passport')}
                className="flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>ঝুঁকি পাসপোর্ট দেখুন</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/consistency-checker')}
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>রেকর্ড গরমিল পরীক্ষক</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Citizen Awareness Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold">
              ৳
            </div>
            <h3 className="font-bold text-slate-900 text-base">১,১৭০ টাকার বেশি এক পয়সাও নয়</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              সরকারি ই-নামজারিতে সাকুল্যে মোট ফি মাত্র ১,১৭০ টাকা। এর বাইরে কোনো অর্থ চাওয়া হলে ভূমি হটলাইন ১৬১২২ নম্বরে তাৎক্ষণিক অভিযোগ জানান।
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
              📜
            </div>
            <h3 className="font-bold text-slate-900 text-base">বায়া দলিলের ২৫ বছরের চেইন</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              শুধুমাত্র বিক্রেতার সাম্প্রতিক দলিল দেখেই জমি কিনবেন না। সিএস, এসএ ও আরএস খতিয়ানের সাথে বিগত ২৫ বছরের বায়া দলিলের ধারাবাহিক যোগসূত্র মিলিয়ে দেখুন।
            </p>
          </div>

          <div className="bg-cyan-50/70 border border-cyan-200 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-200 text-cyan-900 flex items-center justify-center font-bold">
              ⏱️
            </div>
            <h3 className="font-bold text-slate-900 text-base">সর্বোচ্চ ২৮ কার্যদিবসে নিষ্পত্তি</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              সরকারি নীতিমালা অনুযায়ী নির্ভেজাল ই-নামজারি আবেদন ২৮ কার্যদিবসের মধ্যে মঞ্জুর করার বাধ্যবাধকতা রয়েছে। অযথা দীর্ঘসূত্রতা হলে ডিজিটালি ট্র্যাকিং করুন।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
