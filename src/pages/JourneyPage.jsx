import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  FileCheck2,
  ShieldAlert,
  Layers,
} from 'lucide-react';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

export const JourneyPage = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(null);

  // Branching questions states
  // Purchase
  const [purchaseStep, setPurchaseStep] = useState(null);
  const [hasSellerKhatian, setHasSellerKhatian] = useState(null);
  const [hasPossession, setHasPossession] = useState(null);

  // Inheritance
  const [hasWarisanCert, setHasWarisanCert] = useState(null);
  const [hasPartitionDeed, setHasPartitionDeed] = useState(null);
  const [hasMinorWarish, setHasMinorWarish] = useState(null);

  // Gift
  const [isDirectBlood, setIsDirectBlood] = useState(null);
  const [isGiftRegistered, setIsGiftRegistered] = useState(null);

  const resetAll = () => {
    setOrigin(null);
    setPurchaseStep(null);
    setHasSellerKhatian(null);
    setHasPossession(null);
    setHasWarisanCert(null);
    setHasPartitionDeed(null);
    setHasMinorWarish(null);
    setIsDirectBlood(null);
    setIsGiftRegistered(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <Badge variant="success" className="gap-1.5 px-3 py-1">
            <Compass className="w-4 h-4 text-land-700" />
            <span>স্মার্ট ইন্টারঅ্যাক্টিভ সিদ্ধান্ত গাইড</span>
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            স্মার্ট ভূমি যাত্রা — আপনি জমিটি কীভাবে পেয়েছেন?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            ভূমি বিষয়ে কোনো পূর্ব অভিজ্ঞতা না থাকলেও চিন্তার কিছু নেই। মাত্র কয়েকটি সহজ প্রশ্নের উত্তর দিন, আমাদের সিস্টেম আপনাকে পরবর্তী সঠিক করণীয় ও সতর্কবার্তা বুঝিয়ে দেবে।
          </p>
          <div className="pt-1">
            <VoiceButton
              text="স্মার্ট ভূমি যাত্রা। আপনি জমিটি কীভাবে পেয়েছেন তা নির্বাচন করুন। ক্রয়, ওয়ারিশ, হেবা নাকি আদালত সূত্রে? আপনার উত্তরের ওপর ভিত্তি করে পরবর্তী করণীয় দেখানো হবে।"
              label="নির্দেশনা শুনুন"
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* Step 1: Select Origin */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-land-700 text-white flex items-center justify-center font-bold text-sm">
              ১
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              জমি অর্জনের সূত্র নির্বাচন করুন
            </h2>
          </div>
          {origin && (
            <button
              onClick={resetAll}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 font-medium transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>শুরু থেকে করুন</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Option A: Purchase */}
          <button
            onClick={() => {
              setOrigin('purchase');
              setPurchaseStep(null);
            }}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              origin === 'purchase'
                ? 'border-land-600 bg-emerald-50/80 ring-2 ring-emerald-300 shadow-md'
                : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-3xl mb-3 block">🤝</span>
            <h3 className="font-bold text-base text-slate-900">১. ক্রয় করেছি বা করব</h3>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              অর্থ দিয়ে সাব-রেজিস্ট্রি দলিলের মাধ্যমে সাফ-কবালা বা বায়না সূত্রে।
            </p>
          </button>

          {/* Option B: Inheritance */}
          <button
            onClick={() => {
              setOrigin('inheritance');
              setHasWarisanCert(null);
            }}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              origin === 'inheritance'
                ? 'border-land-600 bg-emerald-50/80 ring-2 ring-emerald-300 shadow-md'
                : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-3xl mb-3 block">👨‍👩‍👧‍👦</span>
            <h3 className="font-bold text-base text-slate-900">২. ওয়ারিশ সূত্রে পেয়েছি</h3>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              পিতা-মাতা বা পূর্বপুরুষের মৃত্যুর পর উত্তরাধিকার সূত্রে প্রাপ্ত পৈত্রিক জমি।
            </p>
          </button>

          {/* Option C: Gift / Heba */}
          <button
            onClick={() => {
              setOrigin('gift');
              setIsDirectBlood(null);
            }}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              origin === 'gift'
                ? 'border-land-600 bg-emerald-50/80 ring-2 ring-emerald-300 shadow-md'
                : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-3xl mb-3 block">🎁</span>
            <h3 className="font-bold text-base text-slate-900">৩. হেবা বা দান সূত্রে</h3>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              রক্তসম্পর্কীয় নিকটাত্মীয় বা অন্য কারো কাছ থেকে হেবা/দানপত্র দলিল মারফত।
            </p>
          </button>

          {/* Option D: Decree / Other */}
          <button
            onClick={() => {
              setOrigin('decree');
            }}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              origin === 'decree'
                ? 'border-land-600 bg-emerald-50/80 ring-2 ring-emerald-300 shadow-md'
                : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-3xl mb-3 block">⚖️</span>
            <h3 className="font-bold text-base text-slate-900">৪. আদালত বা নিলাম সূত্রে</h3>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              দেওয়ানি আদালতের স্বত্ব ঘোষণার রায়, নিলাম খরিদ বা বিনিময় দলিল মারফত।
            </p>
          </button>
        </div>
      </Card>

      {/* Step 2: Branching Questions */}
      {origin === 'purchase' && (
        <Card className="p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              ২
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              ক্রয় সংক্রান্ত নির্দিষ্ট তথ্য দিন
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                ক. দলিল কি সাব-রেজিস্ট্রি অফিসে ইতিমধ্যে রেজিস্ট্রি সম্পন্ন হয়েছে?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setPurchaseStep('registered')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    purchaseStep === 'registered'
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✓ হ্যাঁ, রেজিস্ট্রি দলিল সম্পন্ন হয়েছে
                </button>
                <button
                  onClick={() => setPurchaseStep('bayna')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    purchaseStep === 'bayna'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✕ না, এখনো বায়না বা আলোচনার পর্যায়ে রয়েছে
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                খ. বিক্রেতার নিজের নামে কি হাল খতিয়ান ও চলতি বছরের খাজনা পরিশোধ করা আছে?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setHasSellerKhatian(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasSellerKhatian === true
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✓ হ্যাঁ, হাল খতিয়ান ও খাজনা দাখিলা আছে
                </button>
                <button
                  onClick={() => setHasSellerKhatian(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasSellerKhatian === false
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✕ না বা বিক্রেতা দেখাতে পারেননি
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                গ. জমিটি কি সরেজমিনে পরিমাপ করে বিক্রেতার নিরঙ্কুশ দখলে পাওয়া গেছে?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setHasPossession(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasPossession === true
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✓ হ্যাঁ, সীমানা মেপে দখল পেয়েছি
                </button>
                <button
                  onClick={() => setHasPossession(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasPossession === false
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✕ না, এখনো মাপজোখ ও দখল নিশ্চিত হয়নি
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {origin === 'inheritance' && (
        <Card className="p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              ২
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              ওয়ারিশান সূত্রের বিস্তারিত তথ্য
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                ক. সংশ্লিষ্ট ইউনিয়ন পরিষদ বা পৌরসভা থেকে ‘ওয়ারিশান সনদপত্র’ নিয়েছেন কি?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setHasWarisanCert(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasWarisanCert === true
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✓ হ্যাঁ, চেয়ারম্যান/মেয়র স্বাক্ষরিত সনদ আছে
                </button>
                <button
                  onClick={() => setHasWarisanCert(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasWarisanCert === false
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✕ না, এখনো গ্রহণ করা হয়নি
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                খ. সকল ওয়ারিশের সম্মতিতে সাব-রেজিস্ট্রি অফিসে ‘আপস-বণ্টননামা দলিল’ রেজিস্ট্রি করেছেন?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setHasPartitionDeed(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasPartitionDeed === true
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✓ হ্যাঁ, রেজিস্ট্রি বাটোয়ারা দলিল আছে
                </button>
                <button
                  onClick={() => setHasPartitionDeed(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasPartitionDeed === false
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✕ না, পারিবারিকভাবে মুখে মুখে ভাগ করা
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                গ. ওয়ারিশদের মধ্যে কোনো অপ্রাপ্তবয়স্ক (১৮ বছরের কম) সন্তান আছে কি?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setHasMinorWarish(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasMinorWarish === true
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  হ্যাঁ, অপ্রাপ্তবয়স্ক ওয়ারিশ আছে
                </button>
                <button
                  onClick={() => setHasMinorWarish(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    hasMinorWarish === false
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  না, সবাই প্রাপ্তবয়স্ক
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {origin === 'gift' && (
        <Card className="p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              ২
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              হেবা বা দানপত্রের সম্পর্ক যাচাই
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                ক. যিনি জমি দিয়েছেন তিনি কি আপনার ১ম সারির রক্তের সম্পর্ক (বাবা, মা, স্বামী, স্ত্রী, সন্তান, সহোদর ভাই-বোন)?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsDirectBlood(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    isDirectBlood === true
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✓ হ্যাঁ, সরাসরি রক্তসম্পর্কীয় আত্মীয় (মুসলিম হেবা প্রযোজ্য)
                </button>
                <button
                  onClick={() => setIsDirectBlood(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    isDirectBlood === false
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✕ না, রক্তের সম্পর্কীয় নয় বা সাধারণ দানপত্র
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold text-sm text-slate-800 mb-2">
                খ. দানপত্র বা হেবাটি কি সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রি করা হয়েছে?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsGiftRegistered(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    isGiftRegistered === true
                      ? 'bg-land-700 text-white border-land-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✓ হ্যাঁ, রেজিস্ট্রি সম্পন্ন
                </button>
                <button
                  onClick={() => setIsGiftRegistered(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    isGiftRegistered === false
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  ✕ না, কেবল স্ট্যাম্পে বা মৌখিক ঘোষণা
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Personalized Roadmap & Next Action Output */}
      {origin && (
        <Card className="bg-gradient-to-br from-white to-emerald-50/50 p-6 sm:p-8 border-2 border-land-300 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-land-700 text-white flex items-center justify-center font-bold">
                ৩
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  আপনার জন্য কাস্টমাইজড রোডম্যাপ ও সতর্কবার্তা
                </h3>
                <p className="text-xs text-slate-500">আপনার প্রদত্ত তথ্যের ওপর ভিত্তি করে প্রস্তুতকৃত</p>
              </div>
            </div>
            <VoiceButton
              text="আপনার প্রদত্ত উত্তরের ভিত্তিতে কাস্টমাইজড রোডম্যাপ প্রস্তুত করা হয়েছে। পরবর্তী ধাপগুলো মনোযোগ দিয়ে দেখুন।"
              size="sm"
            />
          </div>

          {/* Conditional Alerts */}
          {origin === 'purchase' && hasSellerKhatian === false && (
            <Alert variant="destructive">
              <AlertTitle>
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <span>গুরুত্বপূর্ণ রেড ফ্ল্যাগ:</span>
              </AlertTitle>
              <AlertDescription>
                বিক্রেতার নিজের নামে হাল খতিয়ান ও খাজনা দাখিলা পরিশোধ না থাকলে সাব-রেজিস্ট্রার দলিল রেজিস্ট্রি করতে পারেন না এবং এসি ল্যান্ড নামজারি বাতিল করে দিতে পারেন। কোনো বায়না বা টাকা দেওয়ার আগে বিক্রেতাকে নিজ নামে হাল খতিয়ান দেখাতে বলুন।
              </AlertDescription>
            </Alert>
          )}

          {origin === 'purchase' && hasPossession === false && (
            <Alert variant="warning">
              <AlertTitle>
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>দখল সংক্রান্ত সতর্কতা:</span>
              </AlertTitle>
              <AlertDescription>
                “দলিল যার জমি তার” কথাটি পুরোপুরি ঠিক নয়; সরেজমিন দখল ও দাগ সীমানা নিশ্চিত না হয়ে জমি কিনলে আদালতে দেওয়ানি মামলায় জড়িয়ে পড়ার চরম ঝুঁকি থাকে। একজন সার্ভেয়ার (আমিন) নিয়ে দাগ মেপে নিন।
              </AlertDescription>
            </Alert>
          )}

          {origin === 'inheritance' && hasPartitionDeed === false && (
            <Alert variant="warning">
              <AlertTitle>
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>বণ্টননামা সতর্কতা:</span>
              </AlertTitle>
              <AlertDescription>
                শুধু মৌখিক বা সাদা কাগজে ভাগ-বাটোয়ারা থাকলে সরকারি খতিয়ানে জমাভাগ করা জটিল হয় এবং শুনানিতে অন্য শরিকরা আপত্তি দিলে নামজারি আটকে যায়। সমাধান: সকল ওয়ারিশ মিলে সাব-রেজিস্ট্রি অফিসে ‘আপস-বণ্টননামা দলিল’ সম্পাদন করুন।
              </AlertDescription>
            </Alert>
          )}

          {origin === 'gift' && isDirectBlood && (
            <Alert variant="success">
              <AlertTitle>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>হেবা দলিলের বিশেষ সুবিধা:</span>
              </AlertTitle>
              <AlertDescription>
                মুসলিম পারিবারিক আইনে ১ম সারির রক্তসম্পর্কীয় আত্মীয়দের ক্ষেত্রে মাত্র ১০০ টাকা স্ট্যাম্প ও নির্ধারিত নামমাত্র ফিতে রেজিস্ট্রি করা যায়। রেজিস্ট্রি দলিলের নকল সংগ্রহ করে সরাসরি ই-নামজারি করা সম্ভব।
              </AlertDescription>
            </Alert>
          )}

          {/* Actionable Steps Roadmap */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              আপনার পরবর্তী করণীয় ধাপসমূহ (পর্যায়ক্রমিক রোডম্যাপ):
            </h4>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ১
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">কাগজপত্র ও বায়া দলিল সংগ্রহ</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    {origin === 'purchase'
                      ? 'মূল সাফ-কবালা দলিল, বিগত ২৫ বছরের বায়া দলিল, আরএস/বিএস পরচা ও হাল খাজনা দাখিলা সংগ্রহ করুন।'
                      : origin === 'inheritance'
                      ? 'চেয়ারম্যান/মেয়র সনদ, পারিবারিক আপস-বণ্টননামা দলিল ও পিতা/মাতার মূল মালিকানার পরচা সংগ্রহ করুন।'
                      : 'রেজিস্ট্রি হেবা/দানপত্র দলিল ও পূর্ববর্তী মূল পরচা প্রস্তুত রাখুন।'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ২
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">রেকর্ড ও দাগ গরমিল পরীক্ষা</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    দলিলে উল্লিখিত দাগ নম্বর ও জমির পরিমাণের সাথে সরকারি খতিয়ানের মিল আছে কি না আমাদের সিস্টেমে পরীক্ষা করে নিন।
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ৩
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">ই-নামজারি আবেদন দাখিল (ফি: ২০ ৳)</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    সহকারী কমিশনার (ভূমি) এর বরাবর অনলাইনে আবেদন ফরম পূরণ ও স্ক্যান কপি সংযুক্ত করে ২০ টাকা কোর্ট ফি দিয়ে সাবমিট করুন।
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ৪
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">শুনানি ও চূড়ান্ত ডিসিআর ও খতিয়ান গ্রহণ (ফি: ১,১০০ ৳)</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    তহশিলদারের ইতিবাচক প্রতিবেদনের পর শুনানিতে অংশ নিন। মঞ্জুর হলে ১,১০০ টাকা দিয়ে কিউআর কোডযুক্ত নতুন ডিজিটাল খতিয়ান সংগ্রহ করুন।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Jump to Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-3">
            <Button
              size="default"
              onClick={() => navigate('/mutation-assist')}
              className="flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>নামজারি সহায়ক শুরু করুন</span>
            </Button>

            <Button
              variant="outline"
              size="default"
              onClick={() => navigate('/consistency-checker')}
              className="flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-land-700" />
              <span>রেকর্ড গরমিল টেস্ট করুন</span>
            </Button>

            <Button
              variant="secondary"
              size="default"
              onClick={() => navigate('/ownership-transfer')}
              className="flex items-center gap-2"
            >
              <span>সরকারি ফি ও খরচ দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
