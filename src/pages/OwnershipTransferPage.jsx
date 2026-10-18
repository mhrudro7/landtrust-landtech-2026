import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Workflow,
  Calculator,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { toBengaliDigits, formatBengaliCurrency } from '../utils/bangla';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const OwnershipTransferPage = () => {
  const navigate = useNavigate();
  const [activeSituation, setActiveSituation] = useState('sale');

  // Calculator states
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [locationType, setLocationType] = useState('rural');

  const stampDutyRate = activeSituation === 'heba' ? 0 : 0.015;
  const regFeeRate = 0.01;
  const localTaxRate = locationType === 'city' ? 0.03 : locationType === 'pauroshova' ? 0.02 : 0.01;
  const aitRate = locationType === 'city' ? 0.03 : locationType === 'pauroshova' ? 0.02 : 0.015;

  const stampDuty = activeSituation === 'heba' ? 100 : Math.round(propertyValue * stampDutyRate);
  const regFee = Math.round(propertyValue * regFeeRate);
  const localTax = activeSituation === 'heba' ? 0 : Math.round(propertyValue * localTaxRate);
  const aitTax = activeSituation === 'heba' ? 0 : Math.round(propertyValue * aitRate);
  const affidavitNFee = 500;
  const mutationFee = 1170;

  const totalCost = stampDuty + regFee + localTax + aitTax + affidavitNFee + mutationFee;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <Badge variant="warning" className="gap-1.5 px-3 py-1">
            <Workflow className="w-4 h-4 text-amber-800" />
            <span>মালিকানা বদলের পূর্ণাঙ্গ নিয়মাবলী ও হিসাব</span>
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            মালিকানা বদল — সঠিক আইনি প্রক্রিয়া ও সরকারি খরচ
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            জমি হস্তান্তর শুধুমাত্র সাব-রেজিস্ট্রারে সই করলেই শেষ হয় না। সঠিক রোডম্যাপ অনুসরণ না করলে জমি ভবিষ্যতে আইনি বিরোধে পড়ার আশঙ্কা থাকে। নিচে পরিস্থিতি নির্বাচন করে সঠিক নিয়ম ও মোট খরচ হিসাব করে নিন।
          </p>

          <div className="pt-1">
            <VoiceButton
              text="মালিকানা বদলের নিয়ম ও খরচ ক্যালকুলেটর। জমি ক্রয়, মুসলিম হেবা, দানপত্র বা ওয়ারিশ বণ্টনের জন্য কত টাকা সরকারি ফি লাগবে তা হিসাব করুন।"
              label="নির্দেশনা শুনুন"
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* 5 Core Pillars */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            আইনানুগ জমি হস্তান্তরের ৫টি প্রধান ধাপ
          </h2>
          <p className="text-xs text-slate-500">
            যেকোনো পরিস্থিতিতে এই পাঁচটি স্তর সম্পন্ন করতে হবে:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              ১
            </span>
            <h3 className="font-bold text-sm text-slate-900">বায়া দলিল ও স্বত্ব তল্লাশি</h3>
            <p className="text-xs text-slate-600 leading-normal">
              বিগত ২৫ বছরের বায়া দলিল ও আরএস/বিএস পরচা সাব-রেজিস্ট্রি অফিসে তল্লাশি দিয়ে স্বত্ব যাচাই।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              ২
            </span>
            <h3 className="font-bold text-sm text-slate-900">সাব-রেজিস্ট্রি দলিল সম্পাদন</h3>
            <p className="text-xs text-slate-600 leading-normal">
              সরকারি নিয়মে স্ট্যাম্প ডিউটি ও পে-অর্ডারের মাধ্যমে রেজিস্ট্রেশন ফি পরিশোধ করে দলিল রেজিস্ট্রি।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              ৩
            </span>
            <h3 className="font-bold text-sm text-slate-900">অনলাইনে ই-নামজারি আবেদন</h3>
            <p className="text-xs text-slate-600 leading-normal">
              এসি ল্যান্ড অফিসে ২০ টাকা কোর্ট ফি দিয়ে অনলাইনে নামজারি ও জমাভাগ আবেদন দাখিল।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              ৪
            </span>
            <h3 className="font-bold text-sm text-slate-900">শুনানি ও খতিয়ান সৃজন (DCR)</h3>
            <p className="text-xs text-slate-600 leading-normal">
              তহশিলদার প্রতিবেদন ও শুনানির পর ১,১০০ টাকা দিয়ে কিউআর কোডযুক্ত নতুন খতিয়ান সংগ্রহ।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-left space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              ৫
            </span>
            <h3 className="font-bold text-sm text-slate-900">অনলাইন খাজনা দাখিলা শুরু</h3>
            <p className="text-xs text-slate-600 leading-normal">
              নতুন খতিয়ান নম্বরে হোল্ডিং খুলে অনলাইনে ldtax.gov.bd-তে নিয়মিত খাজনা প্রদান।
            </p>
          </div>
        </div>
      </Card>

      {/* Situation Tabs */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            পরিস্থিতি অনুযায়ী বিস্তারিত নির্দেশিকা
          </h2>
          <p className="text-xs text-slate-500">
            আপনার প্রযোজ্য ক্ষেত্রটি নির্বাচন করুন:
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeSituation === 'sale' ? 'default' : 'outline'}
            onClick={() => setActiveSituation('sale')}
          >
            ১. সাধারণ জমি বিক্রয় (সাফ-কবালা)
          </Button>
          <Button
            variant={activeSituation === 'heba' ? 'default' : 'outline'}
            onClick={() => setActiveSituation('heba')}
          >
            ২. মুসলিম হেবা দলিল (রক্তের আত্মীয়)
          </Button>
          <Button
            variant={activeSituation === 'partition' ? 'default' : 'outline'}
            onClick={() => setActiveSituation('partition')}
          >
            ৩. ওয়ারিশ বাটোয়ারা (আপস-বণ্টননামা)
          </Button>
          <Button
            variant={activeSituation === 'gift' ? 'default' : 'outline'}
            onClick={() => setActiveSituation('gift')}
          >
            ৪. সাধারণ দানপত্র দলিল (Gift Deed)
          </Button>
        </div>

        {/* Detailed Tab Content */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
          {activeSituation === 'sale' && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900">
                সাফ-কবালা বিক্রয় দলিলের নিয়ম ও চেকলিস্ট
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                অর্থের বিনিময়ে চূড়ান্ত মালিকানা হস্তান্তরের ক্ষেত্রে সাফ-কবালা দলিল সম্পাদিত হয়। এখানে বিক্রেতার পূর্বের কোনো দাবি থাকে না।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <strong className="text-slate-800 block mb-1">প্রয়োজনীয় কাগজপত্র:</strong>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>বিক্রেতার হাল নামজারি খতিয়ান ও খাজনা দাখিলা</li>
                    <li>বিগত ২৫ বছরের মূল বায়া দলিলসমূহ</li>
                    <li>ক্রেতা ও বিক্রেতার এনআইডি ও ছবি</li>
                    <li>মৌজা ম্যাপে দাগের অবস্থান ও সীমানা পরিমাপ রসিদ</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <strong className="text-slate-800 block mb-1">সতর্কতামূলক পরামর্শ:</strong>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>টাকা সবসময় ব্যাংক ড্রাফট বা পে-অর্ডারে পরিশোধ করুন</li>
                    <li>দলিলে বাস্তব হস্তান্তরিত জমির পরিমাণই উল্লেখ করুন</li>
                    <li>রেজিস্ট্রেশনের পর বিলম্ব না করে দ্রুত নামজারি করান</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSituation === 'heba' && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900">
                মুসলিম হেবা দলিলের বিশেষ সুবিধাসমূহ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                মুসলিম পারিবারিক আইন অনুযায়ী বাবা-মা, সন্তান, স্বামী-স্ত্রী ও আপন ভাই-বোনের মধ্যে জমি দান করলে তাকে ‘হেবা’ বলা হয়। এতে সরকার বিপুল রাজস্ব ছাড় দিয়েছে।
              </p>
              <div className="bg-emerald-100/60 border border-emerald-300 p-4 rounded-xl text-xs space-y-2">
                <p className="font-bold text-emerald-950">
                  🎉 বিশেষ সুবিধা: হেবা দলিলের জন্য কোনো শতাংশ হারে স্ট্যাম্প ডিউটি দিতে হয় না! মাত্র ১০০ টাকার স্ট্যাম্পেই দলিল সম্পন্ন করা যায়।
                </p>
                <p className="text-emerald-900">
                  তবে মনে রাখতে হবে, রক্তসম্পর্কের বাইরের কোনো ব্যক্তির সাথে হেবা প্রযোজ্য নয়; তাদের ক্ষেত্রে সাধারণ দানপত্র করতে হবে।
                </p>
              </div>
            </div>
          )}

          {activeSituation === 'partition' && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900">
                পৈত্রিক ওয়ারিশ বাটোয়ারা ও আপস-বণ্টননামা দলিল
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                পিতা-মাতার মৃত্যুর পর ভাই-বোন ও মা মিলে নিজেদের মধ্যে হিস্যা ভাগ করার আইনি উপায় হলো রেজিস্ট্রি ‘আপস-বণ্টননামা দলিল’।
              </p>
              <div className="bg-amber-100/60 border border-amber-300 p-4 rounded-xl text-xs text-amber-950 space-y-2">
                <p className="font-bold">
                  ⚠️ সাধারণ ভুল: অনেকেই সাদা কাগজে বা আত্মীয়দের সামনে বসে মৌখিক ভাগ করে ঘর তোলেন।
                </p>
                <p>
                  আইন অনুযায়ী রেজিস্ট্রি বাটোয়ারা ছাড়া মৌখিক বণ্টনের কোনো ভিত্তি নেই। কোনো ভাই বা বোন পরবর্তীতে আদালতে বাটোয়ারা মামলা করলে পুরো জমি স্থগিত হয়ে যেতে পারে।
                </p>
              </div>
            </div>
          )}

          {activeSituation === 'gift' && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900">
                সাধারণ দানপত্র দলিল (Gift Deed)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                অমুসলিম নাগরিকদের ক্ষেত্রে অথবা রক্তসম্পর্কহীন কাউকে স্বেচ্ছায় জমি দান করার ক্ষেত্রে সাধারণ দানপত্র দলিল করতে হয়।
              </p>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
                এক্ষেত্রে সাফ-কবালার মতোই সাধারণ স্ট্যাম্প ডিউটি ও সরকারি কর প্রযোজ্য হয়।
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Interactive Fee & Tax Calculator */}
      <Card className="p-6 sm:p-8 border-2 border-emerald-200 shadow-md space-y-6">
        <div className="border-b border-emerald-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-land-700 text-white flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                ভূমি খরচ ও সরকারি ফি ক্যালকুলেটর
              </h2>
              <p className="text-xs text-slate-500">
                জমির ঘোষিত মূল্য ও এলাকা নির্বাচন করুন, মুহূর্তেই সরকারি খরচের হিসাব পেয়ে যাবেন।
              </p>
            </div>
          </div>
          <VoiceButton
            text={`আপনার নির্ধারিত মোট সরকারি খরচ ${formatBengaliCurrency(totalCost)}। এর বাইরে কোনো দালালকে বাড়তি অর্থ দেবেন না।`}
            size="sm"
          />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              জমির ঘোষিত মূল্য (টাকায়)
            </label>
            <div className="relative">
              <input
                type="number"
                min="50000"
                step="50000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:border-land-600 outline-none"
              />
              <span className="absolute right-4 top-2.5 text-sm font-bold text-slate-400">৳</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              বাংলায়: {formatBengaliCurrency(propertyValue)}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              জমির ভৌগোলিক এলাকা
            </label>
            <select
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-land-600 outline-none bg-white"
            >
              <option value="rural">ইউনিয়ন পরিষদ / গ্রামীণ এলাকা (কর কম)</option>
              <option value="pauroshova">জেলা সদর বা পৌরসভা এলাকা</option>
              <option value="city">সিটি কর্পোরেশন / ক্যান্টনমেন্ট এলাকা</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              এলাকার ওপর স্থানীয় কর ও উৎসে কর নির্ভর করে।
            </p>
          </div>
        </div>

        {/* Breakdown Result */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wide text-slate-600 border-b border-slate-200 pb-2">
            সরকারি খরচের পুঙ্খানুপুঙ্খ বিবরণ:
          </h3>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center text-slate-700">
              <span>১. স্ট্যাম্প ডিউটি (Stamp Duty) {activeSituation === 'heba' ? '(হেবায় ফ্ল্যাট ১০০ ৳)' : '(১.৫%)'}</span>
              <span className="font-bold">{formatBengaliCurrency(stampDuty)}</span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>২. রেজিস্ট্রেশন ফি (Registration Fee ১.০%)</span>
              <span className="font-bold">{formatBengaliCurrency(regFee)}</span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>৩. স্থানীয় সরকার কর (Local Govt Tax {toBengaliDigits(localTaxRate * 100)}%)</span>
              <span className="font-bold">{formatBengaliCurrency(localTax)}</span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>৪. উৎসে আয়কর / এআইটি (AIT {toBengaliDigits(aitRate * 100)}%)</span>
              <span className="font-bold">{formatBengaliCurrency(aitTax)}</span>
            </div>

            <div className="flex justify-between items-center text-slate-700">
              <span>৫. হলফনামা স্ট্যাম্প ও এন-ফি (স্থির খরচ)</span>
              <span className="font-bold">{formatBengaliCurrency(affidavitNFee)}</span>
            </div>

            <div className="flex justify-between items-center text-emerald-800 bg-emerald-50 p-2 rounded-xl">
              <span className="font-medium">৬. ই-নামজারি সরকারি ফি (কোর্ট ফি + নোটিশ + ডিসিআর)</span>
              <span className="font-bold">{formatBengaliCurrency(mutationFee)}</span>
            </div>

            <div className="pt-3 border-t-2 border-slate-300 flex justify-between items-center text-base sm:text-lg font-black text-slate-900">
              <span>সর্বমোট সরকারি খরচ:</span>
              <span className="text-land-800 text-xl">{formatBengaliCurrency(totalCost)}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>দালালদের সাবধানবার্তা:</strong> এই হিসাবটি সরকারি গেজেট মোতাবেক প্রণীত। কোনো সাব-রেজিস্ট্রি কর্মকর্তা বা দলিল লেখককে এর বাইরে ব্যক্তিগত কমিশন দেবেন না। সব ফি ব্যাংকে জমা দিয়ে রসিদ গ্রহণ করুন।
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            size="default"
            onClick={() => navigate('/mutation-assist')}
            className="flex items-center gap-2"
          >
            <span>দলিল তৈরির পর নামজারি করুন</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
