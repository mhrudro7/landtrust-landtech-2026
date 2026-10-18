import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  BookOpen,
  PhoneCall,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileQuestion,
} from 'lucide-react';
import { FAQ_ITEMS, LAND_GLOSSARY } from '../api/mockData';
import { VoiceButton } from '../components/VoiceButton';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

export const HelpCenterPage = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [faqSearch, setFaqSearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState('সব');
  const [expandedFaqId, setExpandedFaqId] = useState('faq-1');

  // Filter FAQ
  const filteredFaqs = FAQ_ITEMS.filter(
    (f) =>
      f.question.includes(faqSearch) ||
      f.answer.includes(faqSearch) ||
      f.category.includes(faqSearch)
  );

  // Filter Glossary
  const filteredGlossary =
    glossaryCategory === 'সব'
      ? LAND_GLOSSARY
      : LAND_GLOSSARY.filter((g) => g.category === glossaryCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <Card className="p-6 sm:p-8 border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10 space-y-3">
          <Badge variant="success" className="gap-1.5 px-3 py-1">
            <HelpCircle className="w-4 h-4 text-land-700" />
            <span>নাগরিক জিজ্ঞাসা ও ভূমির পরিভাষা কোষ</span>
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            সহায়তা কেন্দ্র — ভূমির কঠিন নিয়মের সহজ সমাধান
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            ভূমি সংক্রান্ত আইন, জরিপ বা দলিল নিয়ে যেকোনো প্রশ্নের উত্তর খুঁজে নিন। পাশাপাশি ‘খতিয়ান’, ‘পরচা’, ‘বায়া দলিল’ এর মতো জটিল সরকারি পরিভাষাগুলো সহজ বাংলায় জেনে নিন।
          </p>

          <div className="pt-1">
            <VoiceButton
              text="সহায়তা কেন্দ্রে আপনাকে স্বাগতম। সাধারণ প্রশ্নোত্তর এবং ভূমির কঠিন শব্দের সহজ বাংলা অভিধান পড়তে বা শুনতে পারেন।"
              label="নির্দেশনা শুনুন"
              size="sm"
            />
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('faq')}
          className={`pb-3 px-6 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'faq'
              ? 'border-land-700 text-land-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileQuestion className="w-4 h-4" />
          <span>সাধারণ প্রশ্নোত্তর (FAQ)</span>
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          className={`pb-3 px-6 text-sm font-bold border-b-2 flex items-center gap-2 transition ${
            activeTab === 'glossary'
              ? 'border-land-700 text-land-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>ভূমির কঠিন শব্দের সহজ অভিধান</span>
        </button>
      </div>

      {/* FAQ TAB */}
      {activeTab === 'faq' && (
        <div className="space-y-6 animate-fadeIn">
          {/* FAQ Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <Input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="যেকোনো প্রশ্ন লিখে খুঁজুন (যেমন: খরচ, ওয়ারিশ, হেবা, নামজারি)..."
              className="pl-12 h-12 rounded-2xl"
            />
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{faq.category}</Badge>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900">
                        {faq.question}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/50">
                      <p>{faq.answer}</p>
                      {faq.sourceLaw && (
                        <p className="text-[11px] text-slate-400 font-mono">
                          আইনি রেফারেন্স: {faq.sourceLaw}
                        </p>
                      )}
                      <div className="pt-2 flex justify-end">
                        <VoiceButton text={faq.answer} size="sm" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GLOSSARY TAB */}
      {activeTab === 'glossary' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['সব', 'খতিয়ান', 'দলিল', 'আইন ও রাজস্ব', 'অফিস ও কর্মকর্তা'].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={glossaryCategory === cat ? 'default' : 'outline'}
                onClick={() => setGlossaryCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item) => (
              <Card
                key={item.id}
                className="p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{item.termBangla}</h3>
                      <p className="text-[11px] font-mono text-slate-400">{item.termEnglish}</p>
                    </div>
                    <Badge variant="success" className="text-[10px]">
                      {item.category}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{item.meaning}</p>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                    <strong className="text-land-800">কেন জানা জরুরি: </strong>
                    {item.importance}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <VoiceButton
                    text={`${item.termBangla}: ${item.meaning}. ${item.importance}`}
                    size="sm"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Official Directory & Helpline Card */}
      <div className="bg-gradient-to-br from-slate-900 to-land-950 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>ভূমি কল সেন্টার ও সরকারি পোর্টালসমূহ</span>
            </h2>
            <p className="text-xs text-slate-400">
              যেকোনো জটিলতায় সরকারি কর্মকর্তাদের সাথে সরাসরি যোগাযোগ করুন
            </p>
          </div>

          <a
            href="tel:16122"
            className="px-5 py-2.5 rounded-xl bg-gov-red hover:bg-red-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>সরাসরি ডায়াল: ১৬১২২</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
          <a
            href="https://minland.gov.bd"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center justify-between transition"
          >
            <span>ভূমি মন্ত্রণালয় ওয়েবসাইট</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://mutation.land.gov.bd"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center justify-between transition"
          >
            <span>ই-নামজারি জাতীয় পোর্টাল</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://ldtax.gov.bd"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center justify-between transition"
          >
            <span>অনলাইন খাজনা (LD Tax)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="https://eporcha.gov.bd"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center justify-between transition"
          >
            <span>ই-পরচা ও ডিজিটাল মৌজা ম্যাপ</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
