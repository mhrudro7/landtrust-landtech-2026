import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  QrCode,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  Upload,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { SAMPLE_DEEDS, SAMPLE_KHATIANS } from '../api/mockData';
import { calculateSHA256 } from '../utils/crypto';
import { toBengaliDigits, formatBengaliDecimal } from '../utils/bangla';
import { StatusBadge } from '../components/StatusBadge';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export const DeedVerifyPage = () => {
  const navigate = useNavigate();
  const [selectedDeed, setSelectedDeed] = useState(SAMPLE_DEEDS[0]);
  const [searchTerm, setSearchTerm] = useState('৯৮৪২/২০২৩');

  // QR scanner state
  const [qrScanning, setQrScanning] = useState(false);
  const [qrVerified, setQrVerified] = useState(false);

  // File integrity state
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [calculatedHash, setCalculatedHash] = useState(null);
  const [hashStatus, setHashStatus] = useState('idle');

  const handleSelectDeed = (deed) => {
    setSelectedDeed(deed);
    setSearchTerm(deed.deedNo);
    setQrVerified(false);
    setUploadedFileName(null);
    setCalculatedHash(null);
    setHashStatus('idle');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const clean = searchTerm.trim();
    const found = SAMPLE_DEEDS.find(
      (d) => d.deedNo.includes(clean) || d.id.includes(clean) || d.mouza.includes(clean)
    );
    if (found) {
      handleSelectDeed(found);
    } else {
      alert('নমুনা ডেটাসেটে এই নম্বরের দলিল পাওয়া যায়নি। অনুগ্রহ করে নিচের নমুনা বোতামগুলোর একটিতে ক্লিক করুন।');
    }
  };

  const triggerQrScan = () => {
    setQrScanning(true);
    setQrVerified(false);
    setTimeout(() => {
      setQrScanning(false);
      setQrVerified(true);
    }, 1200);
  };

  const testSampleFile = async (isAuthentic) => {
    setUploadedFileName(
      isAuthentic
        ? `মূল_ডিজিটাল_দলিল_${selectedDeed.deedNo.replace('/', '_')}.pdf`
        : `পরিমার্জিত_জাল_দলিল_${selectedDeed.deedNo.replace('/', '_')}.pdf`
    );
    setHashStatus('matching');

    const sampleContent = isAuthentic
      ? `AUTHENTIC_DEED_DOCUMENT_CONTENT_${selectedDeed.id}_${selectedDeed.sha256Hash}`
      : `TAMPERED_DEED_DOCUMENT_ALTERED_AREA_FROM_5_TO_15_${selectedDeed.id}`;

    const computed = await calculateSHA256(sampleContent);
    const finalHash = isAuthentic ? selectedDeed.sha256Hash : computed;

    setTimeout(() => {
      setCalculatedHash(finalHash);
      setHashStatus(isAuthentic ? 'matched' : 'mismatch');
    }, 600);
  };

  const handleRealFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setHashStatus('matching');

    const hash = await calculateSHA256(file);
    setCalculatedHash(hash);
    const isMatch = hash.toLowerCase() === selectedDeed.sha256Hash.toLowerCase();
    setHashStatus(isMatch ? 'matched' : 'mismatch');
  };

  const matchingKhatian = SAMPLE_KHATIANS[selectedDeed.khatianNo];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <Badge variant="outline" className="gap-1.5 px-3 py-1 border-cyan-300 bg-cyan-100 text-cyan-900">
            <Search className="w-4 h-4 text-cyan-700" />
            <span>ডিজিটাল দলিল ভেরিফায়ার ও জালিয়াতি রোধ</span>
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            দলিল যাচাই — সাব-রেজিস্ট্রি রেকর্ড ও ক্রিপ্টোগ্রাফিক অখণ্ডতা
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            ভূমি প্রতারণা ও জাল দলিল রোধে ডিজিটাল ভেরিফিকেশন। সাব-রেজিস্ট্রি দলিলের নম্বর অনুসন্ধান, কিউআর কোড স্ক্যান এবং ব্রাউজার-ভিত্তিক SHA-256 ক্রিপ্টোগ্রাফিক হ্যাশ যাচাইয়ের মাধ্যমে নিশ্চিত হোন আপনার দলিল সম্পূর্ণ আসল।
          </p>

          <div className="pt-1">
            <VoiceButton
              text="দলিল যাচাই পৃষ্ঠা। এখানে আপনি দলিলের নম্বর দিয়ে বা কিউআর কোড স্ক্যান করে দলিলের আসলত্ব এবং খতিয়ানের সাথে সামঞ্জস্য পরীক্ষা করতে পারেন।"
              label="নির্দেশনা শুনুন"
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* Search & Sample Deeds Selector */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          দলিল নম্বর অনুসন্ধান করুন অথবা নমুনা নির্বাচন করুন:
        </h2>

        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="দলিল নম্বর লিখুন (যেমন: ৯৮৪২/২০২৩)..."
              className="pl-10 font-semibold"
            />
          </div>
          <Button type="submit" variant="default" className="px-6 bg-slate-900 hover:bg-black">
            খুঁজুন
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-500 font-medium">নমুনা ফাইলসমূহ:</span>
          {SAMPLE_DEEDS.map((d) => (
            <Button
              key={d.id}
              type="button"
              variant={selectedDeed.id === d.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSelectDeed(d)}
              className={selectedDeed.id === d.id ? 'bg-cyan-700 hover:bg-cyan-800 text-white' : ''}
            >
              <span>দলিল {d.deedNo}</span>
              <span className="text-[10px] opacity-80">({d.district})</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Deed Details Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">
                  দলিল নং: {selectedDeed.deedNo}
                </h3>
                <StatusBadge status={selectedDeed.status} size="sm" />
              </div>
              <p className="text-xs text-slate-500">{selectedDeed.registryOffice}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">রেজিস্ট্রেশন তারিখ:</span>
            <span className="text-sm font-bold text-slate-800">{selectedDeed.registrationDate}</span>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span className="text-slate-400 block">মৌজা ও জেএল:</span>
            <span className="font-bold text-slate-800">{selectedDeed.mouza}</span>
          </div>
          <div>
            <span className="text-slate-400 block">দাগ ও খতিয়ান:</span>
            <span className="font-bold text-slate-800">
              দাগ {toBengaliDigits(selectedDeed.dagNo)}, খতিয়ান {toBengaliDigits(selectedDeed.khatianNo)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">জমির পরিমাণ:</span>
            <span className="font-bold text-slate-800">
              {formatBengaliDecimal(selectedDeed.areaDecimal)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">শ্রেণি:</span>
            <span className="font-bold text-slate-800">{selectedDeed.landClass}</span>
          </div>
          <div>
            <span className="text-slate-400 block">ক্রেতা:</span>
            <span className="font-bold text-slate-800">{selectedDeed.buyerName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">ক্রেতার এনআইডি:</span>
            <span className="font-bold text-slate-800">{selectedDeed.buyerNid}</span>
          </div>
          <div>
            <span className="text-slate-400 block">বিক্রেতা:</span>
            <span className="font-bold text-slate-800">{selectedDeed.sellerName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">বায়া দলিল সূত্র:</span>
            <span className="font-bold text-slate-800">
              {selectedDeed.bayaDeedRef || 'অনুপস্থিত / উল্লিখিত নেই'}
            </span>
          </div>
        </div>
      </Card>

      {/* Two Pillars: QR Verification Simulator & SHA-256 Hash Tamper Checker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Verification Simulator */}
        <Card className="p-6 sm:p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm">
              <QrCode className="w-5 h-5 text-cyan-600" />
              <span>১. কিউআর কোড ভেরিফিকেশন ডেমো</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              আধুনিক ডিজিটাল দলিলের পাতার শীর্ষে সিকিউরিটি কিউআর কোড থাকে। এটি স্ক্যান করলে সরকারের মূল সার্ভার থেকে দলিলের মেটাডাটা সরাসরি যাচাই করা যায়।
            </p>

            <div className="bg-slate-900 rounded-2xl p-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
              {qrScanning ? (
                <div className="space-y-2">
                  <RefreshCw className="w-8 h-8 animate-spin text-cyan-400 mx-auto" />
                  <p className="text-xs text-cyan-300 font-medium">কিউআর ডাটা ডিকোড করা হচ্ছে...</p>
                </div>
              ) : qrVerified ? (
                <div className="space-y-2 animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-emerald-300">
                    রেজিস্ট্রেশন অধিদপ্তরের ডিজিটাল সিলমোহর যাচাইকৃত!
                  </p>
                  <p className="text-[11px] text-slate-300 break-all px-2">
                    {selectedDeed.qrPayload}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto border border-white/20">
                    <QrCode className="w-10 h-10 text-cyan-300" />
                  </div>
                  <p className="text-xs text-slate-300">
                    দলিল নং {selectedDeed.deedNo}-এর ডিজিটাল কিউআর কোড
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="button"
              disabled={qrScanning}
              onClick={triggerQrScan}
              className="w-full bg-cyan-700 hover:bg-cyan-800 text-white flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>{qrVerified ? 'পুনরায় কিউআর স্ক্যান করুন' : 'কিউআর কোড স্ক্যান করুন'}</span>
            </Button>
          </div>
        </Card>

        {/* SHA-256 Cryptographic File Integrity Checker */}
        <Card className="p-6 sm:p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Lock className="w-5 h-5 text-emerald-600" />
              <span>২. ব্রাউজার SHA-256 ফাইল অখণ্ডতা যাচাই</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              দলিলের স্ক্যান কপির প্রতিটি অক্ষরের জন্য একটি অনন্য ক্রিপ্টোগ্রাফিক হ্যাশ থাকে। ফাইলে কোনো তথ্য পরিবর্তন করলে হ্যাশ তৎক্ষণাৎ অমিল হয়ে জালিয়াতি ফাঁস হয়ে যায়!
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => testSampleFile(true)}
                className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300"
              >
                আসল ফাইল টেস্ট করুন
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => testSampleFile(false)}
                className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300"
              >
                জাল/পরিবর্তিত ফাইল টেস্ট
              </Button>
            </div>

            <label className="block p-3 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 cursor-pointer text-center text-xs text-slate-500 transition">
              <input
                type="file"
                onChange={handleRealFileUpload}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
              />
              <Upload className="w-4 h-4 mx-auto mb-1 text-slate-400" />
              <span>অথবা আপনার কম্পিউটার থেকে দলিলের PDF / ছবি আপলোড করুন</span>
            </label>

            {hashStatus !== 'idle' && (
              <div
                className={`p-3 rounded-xl border text-xs space-y-1.5 animate-fadeIn ${
                  hashStatus === 'matched'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : hashStatus === 'mismatch'
                    ? 'bg-rose-50 border-rose-300 text-rose-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>ফাইল: {uploadedFileName}</span>
                  {hashStatus === 'matched' && (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> আসল ও অপরিবর্তিত
                    </span>
                  )}
                  {hashStatus === 'mismatch' && (
                    <span className="text-rose-700 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> জালিয়াতি / হ্যাশ অমিল!
                    </span>
                  )}
                </div>

                <div className="font-mono text-[10px] break-all bg-white/80 p-2 rounded border border-slate-200">
                  <span className="text-slate-400 block font-sans">গণনাকৃত SHA-256 হ্যাশ:</span>
                  {calculatedHash || 'হিসাব হচ্ছে...'}
                </div>

                <p className="text-[11px] pt-1">
                  {hashStatus === 'matched'
                    ? 'রেজিস্ট্রি লেজারের সাথে এই ফাইলের ক্রিপ্টোগ্রাফিক হ্যাশ হুবহু মিলেছে। এই দলিলের কোনো তথ্য পরিবর্তন করা হয়নি।'
                    : 'সতর্কতা: দলিলের হ্যাশ সরকারি ডাটাবেসের সাথে মেলেনি! দলিলটিতে কোনো সংখ্যা বা নাম পরিমার্জন করা হয়েছে বলে প্রতীয়মান হয়।'}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Deed vs Record Room Deep Comparison */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              দলিল বনাম খতিয়ান তুলনামূলক বিশ্লেষণ
            </h2>
            <p className="text-xs text-slate-500">
              দলিলে যা লেখা আছে বনাম সরকারি রেকর্ড রুমে যা লিপিবদ্ধ রয়েছে
            </p>
          </div>
          <VoiceButton
            text="দলিল বনাম খতিয়ান তুলনামূলক বিশ্লেষণ। দলিলে জমির পরিমাণ এবং সরকারি রেকর্ডের পরিমাণ মিলিয়ে দেখুন।"
            size="sm"
          />
        </div>

        {matchingKhatian ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-cyan-50/50 p-5 rounded-2xl border border-cyan-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-cyan-950">সাব-রেজিস্ট্রি দলিলের তথ্য</h3>
                  <Badge variant="outline" className="text-[10px] bg-cyan-200 text-cyan-900 border-none">
                    দলিল নং {selectedDeed.deedNo}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-cyan-100 pb-1">
                    <span className="text-slate-500">জমির পরিমাণ:</span>
                    <span className="font-bold text-slate-900">{formatBengaliDecimal(selectedDeed.areaDecimal)}</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-100 pb-1">
                    <span className="text-slate-500">দাগ নম্বর:</span>
                    <span className="font-bold text-slate-900">দাগ নং {toBengaliDigits(selectedDeed.dagNo)}</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-100 pb-1">
                    <span className="text-slate-500">বিক্রেতার নাম:</span>
                    <span className="font-bold text-slate-900">{selectedDeed.sellerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">জমির শ্রেণি:</span>
                    <span className="font-bold text-slate-900">{selectedDeed.landClass}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-emerald-950">সরকারি আরএস/বিএস খতিয়ান রেকর্ড</h3>
                  <Badge variant="success" className="text-[10px]">
                    খতিয়ান নং {toBengaliDigits(matchingKhatian.khatianNo)}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-emerald-100 pb-1">
                    <span className="text-slate-500">রেকর্ডেড মোট জমি:</span>
                    <span className="font-bold text-slate-900">{formatBengaliDecimal(matchingKhatian.recordedAreaDecimal)}</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-100 pb-1">
                    <span className="text-slate-500">দাগ নম্বর:</span>
                    <span className="font-bold text-slate-900">দাগ নং {toBengaliDigits(matchingKhatian.dagNo)}</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-100 pb-1">
                    <span className="text-slate-500">খতিয়ানের মালিক:</span>
                    <span className="font-bold text-slate-900">
                      {matchingKhatian.owners.map((o) => o.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">খাজনা পরিশোধ:</span>
                    <span className={`font-bold ${matchingKhatian.isTaxClear ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {matchingKhatian.taxPaidUpTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedDeed.areaDecimal > matchingKhatian.recordedAreaDecimal && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>গুরুতর অমিল ব্যাখ্যা: জমির পরিমাণে অতিরিক্ত দাবি</span>
                </div>
                <p>
                  দলিলে জমির পরিমাণ উল্লেখ করা হয়েছে <strong>{formatBengaliDecimal(selectedDeed.areaDecimal)}</strong>, কিন্তু সরকারি খতিয়ানে মোট জমির পরিমাণ মাত্র <strong>{formatBengaliDecimal(matchingKhatian.recordedAreaDecimal)}</strong>। অর্থাৎ দলিলে ৩ শতক জমি অতিরিক্ত বিক্রি করা হয়েছে যা খতিয়ানে অস্তিত্বহীন।
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-rose-200">
                  <strong className="text-rose-900 block mb-0.5">ক্রেতার করণীয়:</strong>
                  <span>
                    এই জমিতে কোনোভাবেই নামজারি হবে না। বিক্রেতার সাথে সাব-রেজিস্ট্রি অফিসে গিয়ে ‘ভ্রম সংশোধন দলিল’ রেজিস্ট্রি করিয়ে পরিমাণের সঠিক হিসাব সমন্বয় করতে হবে।
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-500">এই দলিলের সাথে সরাসরি সংযুক্ত খতিয়ান রেকর্ড লোড করা হয়নি।</p>
        )}

        <div className="pt-2 flex justify-between items-center border-t border-slate-100">
          <span className="text-xs text-slate-500">সম্পূর্ণ স্বত্ব নিরীক্ষার জন্য:</span>
          <Button
            size="sm"
            onClick={() => navigate('/consistency-checker')}
            className="flex items-center gap-1.5"
          >
            <span>রেকর্ড গরমিল বিস্তারিত দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
