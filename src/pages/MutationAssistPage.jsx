import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Printer,
  Check,
} from 'lucide-react';
import { validateMutationForm } from '../validators/mutationValidator';
import { toBengaliDigits } from '../utils/bangla';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Input } from '../components/ui/input';
import confetti from 'canvas-confetti';

const INITIAL_FORM = {
  applicantType: 'individual',
  originType: 'purchase',
  applicantName: '',
  applicantPhone: '',
  applicantNid: '',
  district: 'ঢাকা',
  upazila: 'সাভার',
  mouza: 'সাভার (জেএল নং-৭২)',
  jlNo: '৭২',
  khatianNo: '',
  dagNo: '',
  areaDecimal: '',
  landClass: 'নাল',
  deedNo: '',
  deedYear: '২০২৩',
  registryOffice: 'সাভার সাব-রেজিস্ট্রি অফিস',
  hasMainDeed: false,
  hasBayaDeed: false,
  hasPorcha: false,
  hasTaxReceipt: false,
  hasWarisanCertificate: false,
};

export const MutationAssistPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill demo scenarios
  const loadScenario = (type) => {
    if (type === 'complete_purchase') {
      setForm({
        applicantType: 'individual',
        originType: 'purchase',
        applicantName: 'মোহাম্মদ রফিকুল ইসলাম',
        applicantPhone: '০১৭১১৮৮৯৯০০',
        applicantNid: '১৯৮২২৬১৯৫২০৮০০১২',
        district: 'ঢাকা',
        upazila: 'সাভার',
        mouza: 'সাভার (জেএল নং-৭২)',
        jlNo: '৭২',
        khatianNo: '১৩৪০',
        dagNo: '৮৫২',
        areaDecimal: '৫.০০',
        landClass: 'বাস্তু / আবাসিক',
        deedNo: '৯৮৪২/২০২৩',
        deedYear: '২০২৩',
        registryOffice: 'সাভার সাব-রেজিস্ট্রি অফিস',
        hasMainDeed: true,
        hasBayaDeed: true,
        hasPorcha: true,
        hasTaxReceipt: true,
        hasWarisanCertificate: false,
      });
    } else {
      setForm({
        applicantType: 'individual',
        originType: 'inheritance',
        applicantName: 'আব্দুল করিম',
        applicantPhone: '০১৮১৯২২৩৩৪',
        applicantNid: '১৯৭৫৩৩১৭১০২০০০১১',
        district: 'গাজীপুর',
        upazila: 'গাজীপুর সদর',
        mouza: 'চন্দ্রা (জেএল নং-১৮)',
        jlNo: '১৮',
        khatianNo: '৭৮২',
        dagNo: '৪১২',
        areaDecimal: '১৫.০০',
        landClass: 'নাল',
        deedNo: '',
        deedYear: '',
        registryOffice: '',
        hasMainDeed: false,
        hasBayaDeed: false,
        hasPorcha: true,
        hasTaxReceipt: false,
        hasWarisanCertificate: false, // Missing for warning!
      });
    }
  };

  const validationIssues = validateMutationForm(form);
  const errors = validationIssues.filter((i) => i.severity === 'error');
  const warnings = validationIssues.filter((i) => i.severity === 'warning');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = () => {
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const stepsList = [
    { num: 1, title: 'প্রাথমিক ও আবেদনকারী' },
    { num: 2, title: 'দলিল ও খতিয়ান বিবরণ' },
    { num: 3, title: 'কাগজপত্র চেকলিস্ট' },
    { num: 4, title: 'খসড়া ও ত্রুটি পর্যালোচনা' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="success" className="gap-1.5 px-3 py-1">
              <FileCheck2 className="w-4 h-4 text-land-700" />
              <span>ই-নামজারি আবেদন গাইড ও চেকার</span>
            </Badge>

            {/* Quick Demo Pre-fill Scenarios */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">নমুনা প্রাক-পূরণ:</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadScenario('complete_purchase')}
                className="bg-emerald-50 hover:bg-emerald-100 text-land-800 border-emerald-300"
              >
                নমুনা ১: ক্রয়কৃত জমি (সঠিক)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => loadScenario('faulty_warish')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300"
              >
                নমুনা ২: ওয়ারিশ (ঘাটতি সহ)
              </Button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            নামজারি সহায়ক — নির্ভুল আবেদনের প্রস্তুতি নিন
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            ভূমি অফিসের দালালদের পেছনে ঘুরতে হবে না। এই সহকারীর মাধ্যমে আপনার আবেদনের সকল তথ্য আগে থেকেই যাচাই করে নিন, যাতে শুনানিতে কোনো নথি ঘাটতির কারণে আবেদন বাতিল না হয়।
          </p>

          <div className="pt-1">
            <VoiceButton
              text="নামজারি সহায়ক। আপনার জমির তথ্য ও দলিলের কপি দিয়ে ধাপগুলো পূরণ করুন। কোন তথ্যে ঘাটতি থাকলে সিস্টেম আপনাকে জানিয়ে দেবে।"
              label="নির্দেশনা শুনুন"
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* Stepper Progress Bar */}
      <Card className="p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {stepsList.map((s) => {
            const isCompleted = currentStep > s.num || submitted;
            const isCurrent = currentStep === s.num && !submitted;
            return (
              <div
                key={s.num}
                onClick={() => !submitted && setCurrentStep(s.num)}
                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                  isCurrent
                    ? 'border-land-600 bg-emerald-50 text-land-900 shadow-sm'
                    : isCompleted
                    ? 'border-emerald-300 bg-white text-slate-700'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCompleted
                      ? 'bg-land-700 text-white'
                      : isCurrent
                      ? 'bg-land-700 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : toBengaliDigits(s.num)}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 font-medium">ধাপ {toBengaliDigits(s.num)}</p>
                  <p className="text-xs font-bold truncate">{s.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step Content */}
      {!submitted ? (
        <Card className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Applicant & Basic Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">
                  ধাপ ১: আবেদনকারী ও জমির ভৌগোলিক অবস্থান
                </h2>
                <p className="text-xs text-slate-500">
                  আবেদনকারীর সঠিক নাম ও মোবাইল নম্বর দিন। এই নম্বরেই শুনানির সরকারি এসএমএস আসবে।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মালিকানা অর্জনের সূত্র *
                  </label>
                  <select
                    value={form.originType}
                    onChange={(e) =>
                      setForm({ ...form, originType: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-land-600 outline-none bg-white"
                  >
                    <option value="purchase">ক্রয়কৃত জমি (সাফ-কবালা)</option>
                    <option value="inheritance">ওয়ারিশ / উত্তরাধিকার সূত্রে</option>
                    <option value="gift">হেবা বা দানপত্র সূত্রে</option>
                    <option value="decree">আদালতের ডিক্রি বা নিলাম সূত্রে</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আবেদনকারীর ধরন *
                  </label>
                  <select
                    value={form.applicantType}
                    onChange={(e) =>
                      setForm({ ...form, applicantType: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-land-600 outline-none bg-white"
                  >
                    <option value="individual">একক ব্যক্তি</option>
                    <option value="joint">যৌথ আবেদনকারী (একাধিক)</option>
                    <option value="organization">প্রতিষ্ঠান / ট্রাস্ট</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আবেদনকারীর পুরো নাম (বাংলায় এনআইডি অনুযায়ী) *
                  </label>
                  <Input
                    type="text"
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                    placeholder="উদা: মোহাম্মদ রফিকুল ইসলাম"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মোবাইল নম্বর (এসএমএস নোটিফিকেশনের জন্য) *
                  </label>
                  <Input
                    type="text"
                    value={form.applicantPhone}
                    onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                    placeholder="০১৭১১-৮৮৯৯০০"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    জাতীয় পরিচয়পত্র (NID) নম্বর
                  </label>
                  <Input
                    type="text"
                    value={form.applicantNid}
                    onChange={(e) => setForm({ ...form, applicantNid: e.target.value })}
                    placeholder="১০ বা ১৭ ডিজিটের এনআইডি"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    জেলা *
                  </label>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-land-600 outline-none bg-white"
                  >
                    <option value="ঢাকা">ঢাকা</option>
                    <option value="গাজীপুর">গাজীপুর</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                    <option value="রাজশাহী">রাজশাহী</option>
                    <option value="বগুড়া">বগুড়া</option>
                    <option value="সিলেট">সিলেট</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    উপজেলা / সার্কেল *
                  </label>
                  <Input
                    type="text"
                    value={form.upazila}
                    onChange={(e) => setForm({ ...form, upazila: e.target.value })}
                    placeholder="উপজেলা বা সার্কেল নাম"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মৌজার নাম ও জেএল নম্বর *
                  </label>
                  <Input
                    type="text"
                    value={form.mouza}
                    onChange={(e) => setForm({ ...form, mouza: e.target.value })}
                    placeholder="যেমন: সাভার (জেএল নং-৭২)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Deed and Khatian Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">
                  ধাপ ২: দলিল, খতিয়ান ও দাগ বিবরণ
                </h2>
                <p className="text-xs text-slate-500">
                  সর্বশেষ রেকর্ড অনুযায়ী দাগ নম্বর ও আপনার দাবিকৃত জমির পরিমাণ নিখুঁতভাবে লিখুন।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {form.originType !== 'inheritance' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        রেজিস্ট্রি দলিল নম্বর *
                      </label>
                      <Input
                        type="text"
                        value={form.deedNo}
                        onChange={(e) => setForm({ ...form, deedNo: e.target.value })}
                        placeholder="যেমন: ৯৮৪২/২০২৩"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        সাব-রেজিস্ট্রি অফিসের নাম
                      </label>
                      <Input
                        type="text"
                        value={form.registryOffice}
                        onChange={(e) => setForm({ ...form, registryOffice: e.target.value })}
                        placeholder="যেমন: সাভার সাব-রেজিস্ট্রি অফিস"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    খতিয়ান নম্বর (সর্বশেষ আরএস/বিএস) *
                  </label>
                  <Input
                    type="text"
                    value={form.khatianNo}
                    onChange={(e) => setForm({ ...form, khatianNo: e.target.value })}
                    placeholder="যেমন: ১৩৪০"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    দাগ নম্বর (প্লট নং) *
                  </label>
                  <Input
                    type="text"
                    value={form.dagNo}
                    onChange={(e) => setForm({ ...form, dagNo: e.target.value })}
                    placeholder="যেমন: ৮৫২"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আবেদনকৃত জমির পরিমাণ (শতক হিসেবে) *
                  </label>
                  <Input
                    type="text"
                    value={form.areaDecimal}
                    onChange={(e) => setForm({ ...form, areaDecimal: e.target.value })}
                    placeholder="যেমন: ৫.০০"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    জমির শ্রেণি *
                  </label>
                  <select
                    value={form.landClass}
                    onChange={(e) => setForm({ ...form, landClass: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:border-land-600 outline-none bg-white"
                  >
                    <option value="বাস্তু / আবাসিক">বাস্তু / আবাসিক</option>
                    <option value="নাল">নাল (কৃষি জমি)</option>
                    <option value="ভিটি">ভিটি (উঁচু জমি)</option>
                    <option value="বাণিজ্যিক">বাণিজ্যিক / দোকান</option>
                    <option value="পুকুর / ডোবা">পুকুর / ডোবা</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Document Checklist */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">
                  ধাপ ৩: প্রয়োজনীয় কাগজপত্রের চেকলিস্ট
                </h2>
                <p className="text-xs text-slate-500">
                  আপনার কাছে যে যে কাগজপত্র আছে সেগুলোতে টিক চিহ্ন দিন। কোনো জরুরি কাগজ বাদ পড়লে পরের ধাপে সতর্ক করা হবে।
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={form.hasMainDeed}
                    onChange={(e) => setForm({ ...form, hasMainDeed: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded text-land-700 focus:ring-land-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      ১. মূল রেজিস্ট্রি দলিলের স্পষ্ট স্ক্যান কপি (Main Registered Deed)
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      সাব-রেজিস্ট্রি অফিসের মোহরাঙ্কিত ও সাক্ষরিত মূল দলিল অথবা নকল।
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={form.hasBayaDeed}
                    onChange={(e) => setForm({ ...form, hasBayaDeed: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded text-land-700 focus:ring-land-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      ২. বিগত ২৫ বছরের বায়া দলিল বা পিট দলিল (Prior / Link Deeds)
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      বিক্রেতা যার কাছ থেকে জমি পেয়েছিলেন সেই ধারাবাহিক দলিলের কপি।
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={form.hasPorcha}
                    onChange={(e) => setForm({ ...form, hasPorcha: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded text-land-700 focus:ring-land-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      ৩. সর্বশেষ আরএস বা বিএস পরচার সহি-মোহরর কপি (Khatian Record)
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      রেকর্ড রুম থেকে তোলা খতিয়ানের সার্টিফাইড বা ডিজিটাল কপি।
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={form.hasTaxReceipt}
                    onChange={(e) => setForm({ ...form, hasTaxReceipt: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded text-land-700 focus:ring-land-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      ৪. হাল সনের ভূমি উন্নয়ন কর (খাজনা) দাখিলা (Updated Tax Receipt)
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ldtax.gov.bd পোর্টাল হতে চলতি ১৪৩১ বঙ্গাব্দের পরিশোধিত রসিদ।
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={form.hasWarisanCertificate}
                    onChange={(e) =>
                      setForm({ ...form, hasWarisanCertificate: e.target.checked })
                    }
                    className="w-5 h-5 mt-0.5 rounded text-land-700 focus:ring-land-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      ৫. চেয়ারম্যান / মেয়র কর্তৃক ওয়ারিশান সনদপত্র (Warisan Certificate)
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      উত্তরাধিকার সূত্রে মালিকানা দাবি করলে এটি বাধ্যতামূলক।
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Review and Mistake Detector */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    ধাপ ৪: আবেদন প্রিভিউ ও লাইভ ত্রুটি নিরূপণ
                  </h2>
                  <p className="text-xs text-slate-500">
                    আবেদনের সারাংশ দেখে নিন। কোনো ঘাটতি থাকলে তা সমাধান করে সাবমিট করুন।
                  </p>
                </div>
                <VoiceButton
                  text="আবেদন প্রিভিউ ও লাইভ ত্রুটি নিরূপণ। আপনার আবেদনে কোনো ঘাটতি বা ভুল থাকলে নিচে লাল ও হলুদ বক্সে দেখে নিন।"
                  size="sm"
                />
              </div>

              {/* Error and Warning alerts */}
              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertTitle>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>জরুরি সংশোধন প্রয়োজন ({toBengaliDigits(errors.length)}টি ভুল):</span>
                  </AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      {errors.map((err, idx) => (
                        <li key={idx}>{err.message}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {warnings.length > 0 && (
                <Alert variant="warning">
                  <AlertTitle>
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>সতর্কতা ও ঘাটতি কাগজপত্র ({toBengaliDigits(warnings.length)}টি):</span>
                  </AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      {warnings.map((warn, idx) => (
                        <li key={idx}>{warn.message}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {errors.length === 0 && warnings.length === 0 && (
                <Alert variant="success">
                  <AlertTitle>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>আবেদন সফল হওয়ার জন্য প্রস্তুত!</span>
                  </AlertTitle>
                  <AlertDescription>
                    চমৎকার! আপনার আবেদনপত্রে কোনো মৌলিক তথ্যের ঘাটতি পাওয়া যায়নি। এটি সফলভাবে নামজারি অনুমোদনের উপযোগী।
                  </AlertDescription>
                </Alert>
              )}

              {/* Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b border-slate-200 pb-2">
                  খসড়া আবেদনপত্রের তথ্যাবলি:
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">আবেদনকারী:</span>
                    <span className="font-bold text-slate-800">{form.applicantName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">মোবাইল:</span>
                    <span className="font-bold text-slate-800">{form.applicantPhone || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">মৌজা ও জেএল:</span>
                    <span className="font-bold text-slate-800">{form.mouza || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">দাগ নম্বর:</span>
                    <span className="font-bold text-slate-800">
                      {toBengaliDigits(form.dagNo) || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">খতিয়ান নম্বর:</span>
                    <span className="font-bold text-slate-800">
                      {toBengaliDigits(form.khatianNo) || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">জমির পরিমাণ:</span>
                    <span className="font-bold text-slate-800">
                      {toBengaliDigits(form.areaDecimal)} শতক
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">সরকারি ফি বিবরণী:</span>
                  <span className="text-sm font-black text-land-800">
                    আবেদন কোর্ট ফি ২০ ৳ + নোটিশ ফি ৫০ ৳ (পরবর্তীতে ডিসিআর ১,১০০ ৳)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={handlePrev}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>পূর্ববর্তী ধাপ</span>
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                size="default"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                <span>পরবর্তী ধাপ</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                onClick={handleFinalSubmit}
                disabled={errors.length > 0}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>নমুনা আবেদন সম্পন্ন করুন</span>
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Submission Success / Preview Slip */
        <Card className="p-6 sm:p-10 border-2 border-emerald-300 shadow-xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-3 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-land-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <Badge variant="success" className="px-3 py-1">
              নমুনা আবেদনপত্র সফলভাবে তৈরি হয়েছে
            </Badge>
            <h2 className="text-2xl font-black text-slate-900">
              অভিনন্দন! আপনার নামজারি স্লিপ প্রস্তুত
            </h2>
            <p className="text-xs text-slate-500">
              এটি একটি সচেতনতামূলক ডেমো রসিদ। আপনি চাইলে এই তথ্যাবলি প্রিন্ট করে নিয়ে সরাসরি সরকারি পোর্টালে অথবা ইউনিয়ন ডিজিটাল সেন্টারে গিয়ে দাখিল করতে পারেন।
            </p>
          </div>

          {/* Official Style Slip */}
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">নমুনা ট্র্যাকিং আইডি</p>
                <p className="text-base font-black text-land-900">MUT-2024-DH-88412</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold">তারিখ</p>
                <p className="text-xs font-semibold text-slate-700">১৮ অক্টোবর ২০২৪</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">আবেদনকারী:</span>
                <span className="font-bold text-slate-800">{form.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">মোবাইল:</span>
                <span className="font-bold text-slate-800">{form.applicantPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">উপজেলা ও জেলা:</span>
                <span className="font-bold text-slate-800">
                  {form.upazila}, {form.district}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">মৌজা ও জেএল:</span>
                <span className="font-bold text-slate-800">{form.mouza}</span>
              </div>
              <div>
                <span className="text-slate-400 block">দাগ ও খতিয়ান:</span>
                <span className="font-bold text-slate-800">
                  দাগ {toBengaliDigits(form.dagNo)}, খতিয়ান {toBengaliDigits(form.khatianNo)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">জমির পরিমাণ:</span>
                <span className="font-bold text-slate-800">
                  {toBengaliDigits(form.areaDecimal)} শতক
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-medium text-slate-600">পরবর্তী ধাপ:</span>
              <span className="font-bold text-land-800">তহশিলদার সরজমিন তদন্ত ও শুনানি</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="outline"
              size="default"
              onClick={() => window.print()}
              className="bg-slate-900 hover:bg-black text-white flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>স্লিপ প্রিন্ট করুন</span>
            </Button>

            <Button
              variant="outline"
              size="default"
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
              }}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>নতুন আরেকটি আবেদন করুন</span>
            </Button>

            <Button
              size="default"
              onClick={() => navigate('/mutation-tracker')}
              className="flex items-center gap-2"
            >
              <span>আবেদনের অবস্থা ট্র্যাক করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
