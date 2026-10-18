import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertCircle,
  Smartphone,
  ShieldCheck,
  Calendar,
  Building,
} from 'lucide-react';
import { SAMPLE_MUTATION_CASES } from '../api/mockData';
import { toBengaliDigits } from '../utils/bangla';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Input } from '../components/ui/input';

export const MutationTrackerPage = () => {
  const [selectedCase, setSelectedCase] = useState(SAMPLE_MUTATION_CASES[0]);
  const [searchInput, setSearchInput] = useState('MUT-2024-DH-84920');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = SAMPLE_MUTATION_CASES.find(
      (c) => c.caseId.toUpperCase().includes(query) || c.applicantPhone.includes(query)
    );
    if (found) {
      setSelectedCase(found);
    } else {
      alert('নমুনা ডেটাসেটে এই নম্বরের আবেদন পাওয়া যায়নি। নিচের নমুনা বোতামগুলোতে ক্লিক করুন।');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="success" className="gap-1.5 px-3 py-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>অনুমোদিত ও প্রস্তুত</span>
          </Badge>
        );
      case 'action_needed':
        return (
          <Badge variant="destructive" className="gap-1.5 px-3 py-1 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>কাগজপত্রের ঘাটতি / ব্যবস্থা নিন</span>
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="gap-1.5 px-3 py-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>আবেদন বাতিল</span>
          </Badge>
        );
      case 'in_progress':
      default:
        return (
          <Badge variant="outline" className="gap-1.5 px-3 py-1 border-cyan-300 bg-cyan-100 text-cyan-900">
            <Clock className="w-3.5 h-3.5" />
            <span>প্রক্রিয়াধীন / তদন্ত চলমান</span>
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <Badge variant="destructive" className="gap-1.5 px-3 py-1 bg-rose-100 text-rose-900 border-rose-200">
            <FileText className="w-4 h-4 text-rose-700" />
            <span>লাইভ ই-নামজারি ট্র্যাকার ও টাইমলাইন</span>
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            আবেদনের অবস্থা — ফাইল কোন টেবিলে আছে জানুন
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            ভূমি অফিসে যাওয়ার প্রয়োজন নেই। আবেদন করার সময় পাওয়া ট্র্যাকিং কেস আইডি দিয়ে সরাসরি দেখুন আবেদনটি এসি ল্যান্ড, কানুনগো নাকি তহশিলদারের নিকট তদন্তাধীন রয়েছে।
          </p>

          <div className="pt-1">
            <VoiceButton
              text={`আবেদনের বর্তমান অবস্থা: ${selectedCase.statusBangla}। পরবর্তী করণীয়: ${selectedCase.nextAction}`}
              label="অগ্রগতি শুনুন"
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* Case Search & Pre-fill Pills */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          ই-নামজারি আবেদন নম্বর লিখুন অথবা নমুনা বাছাই করুন:
        </h2>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="আবেদন কেস নম্বর লিখুন (যেমন: MUT-2024-DH-84920)..."
              className="pl-10 font-semibold"
            />
          </div>
          <Button type="submit" variant="default" className="px-6 bg-slate-900 hover:bg-black">
            অনুসন্ধান
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-500 font-medium">নমুনা কেসসমূহ:</span>
          {SAMPLE_MUTATION_CASES.map((c) => (
            <Button
              key={c.caseId}
              type="button"
              variant={selectedCase.caseId === c.caseId ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCase(c);
                setSearchInput(c.caseId);
              }}
              className={selectedCase.caseId === c.caseId ? 'bg-rose-700 hover:bg-rose-800 text-white' : ''}
            >
              <span>{c.caseId}</span>
              <span className="text-[10px] opacity-80">({c.district})</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Case Overview Box */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{selectedCase.caseId}</h3>
              {getStatusBadge(selectedCase.status)}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              আবেদনকারী: <strong className="text-slate-800">{selectedCase.applicantName}</strong> | মোবাইল: {selectedCase.applicantPhone}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">আবেদনের তারিখ:</span>
            <span className="text-sm font-bold text-slate-800">{selectedCase.appliedDate}</span>
          </div>
        </div>

        {/* Current Demo Status Highlight */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              বর্তমান সরকারি স্ট্যাটাস:
            </span>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              {selectedCase.statusBangla}
            </p>
          </div>
          <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            আনুমানিক নিষ্পত্তির তারিখ: <strong>{selectedCase.estimatedCompletionDate}</strong>
          </div>
        </div>

        {/* Missing Requirements Box if any */}
        {selectedCase.missingRequirements.length > 0 && (
          <Alert variant="destructive">
            <AlertTitle>
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>জরুরি ঘাটতি কাগজপত্র (আবেদন স্থগিত রাখা হয়েছে):</span>
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {selectedCase.missingRequirements.map((req, idx) => (
                  <li key={idx} className="font-medium">
                    {req}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Next Action Box */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-950">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="font-bold">পরবর্তী করণীয় নাগরিকের জন্য:</strong> {selectedCase.nextAction}
          </div>
        </div>
      </Card>

      {/* 5-Stage Visual Timeline */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            ই-নামজারির ৫ ধাপের ভিজ্যুয়াল টাইমলাইন
          </h2>
          <p className="text-xs text-slate-500">
            আবেদন দাখিল থেকে চূড়ান্ত কিউআর খতিয়ান সৃজন পর্যন্ত প্রতি ধাপের অবস্থা:
          </p>
        </div>

        <div className="space-y-6">
          {selectedCase.stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            const isActionNeeded = stage.status === 'action_needed';

            return (
              <div key={stage.step} className="flex gap-4 relative">
                {idx !== selectedCase.stages.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 animate-pulse'
                      : isActionNeeded
                      ? 'bg-rose-600 text-white ring-4 ring-rose-100 animate-bounce'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActionNeeded ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    toBengaliDigits(stage.step)
                  )}
                </div>

                <div className="flex-1 bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900">
                      ধাপ {toBengaliDigits(stage.step)}: {stage.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {stage.date}
                    </span>
                  </div>

                  <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <Building className="w-3 h-3 text-emerald-600" />
                    <span>{stage.department}</span>
                  </p>

                  <p className="text-xs text-slate-600 leading-normal">{stage.description}</p>

                  {stage.remarks && (
                    <p className="text-xs font-bold text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200 mt-1">
                      {stage.remarks}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Simulated Mobile SMS Notifications */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
          <Smartphone className="w-5 h-5 text-land-700" />
          <span>মোবাইলে প্রেরিত সরকারি বাংলা এসএমএস লগ (সিমুলেশন)</span>
        </div>

        <div className="space-y-3">
          {selectedCase.smsNotifications.map((sms, i) => (
            <div
              key={i}
              className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs space-y-1.5 border border-slate-800 shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span className="text-emerald-400 font-bold">প্রেরক: LANDGOV (১৬১২২)</span>
                <span>{sms.date}</span>
              </div>
              <p className="font-bangla text-xs sm:text-sm text-slate-100 font-medium">
                {sms.message}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
