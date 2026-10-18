import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ExternalLink, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-land-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-land-700 flex items-center justify-center text-white text-lg font-bold">
                🇧🇩
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">স্মার্ট ভূমি সেবা</h3>
                <p className="text-xs text-slate-400">সহজ, নিরাপদ ও স্বচ্ছ ডিজিটাল প্ল্যাটফর্ম</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              বাংলাদেশের গ্রামীণ নাগরিক ও স্বল্প ডিজিটাল জ্ঞানসম্পন্ন মানুষের জন্য সহজ বাংলা ভাষায় জমি কেনাবেচা, নামজারি, সাব-রেজিস্ট্রি দলিল যাচাই ও রেকর্ড গরমিল পরীক্ষার একটি আধুনিক ইন্টারঅ্যাক্টিভ সমাধান।
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>মধ্যস্বত্বভোগী ও দালালমুক্ত ডিজিটাল সেবা</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-4 border-land-500 pl-2">
              জরুরি সেবাসমূহ
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/mutation-assist" className="hover:text-emerald-400 transition">
                  → নামজারি আবেদন সহকারী (Step-by-Step)
                </Link>
              </li>
              <li>
                <Link to="/deed-verify" className="hover:text-emerald-400 transition">
                  → সাব-রেজিস্ট্রি দলিল ও SHA-256 হ্যাশ যাচাই
                </Link>
              </li>
              <li>
                <Link to="/ownership-transfer" className="hover:text-emerald-400 transition">
                  → জমি কেনাবেচার সরকারি ফি ও খরচ ক্যালকুলেটর
                </Link>
              </li>
              <li>
                <Link to="/mutation-tracker" className="hover:text-emerald-400 transition">
                  → ই-নামজারি কেস ট্র্যাকিং ও টাইমলাইন
                </Link>
              </li>
              <li>
                <Link to="/consistency-checker" className="hover:text-emerald-400 transition">
                  → খতিয়ান ও দাগ গরমিল পরীক্ষক
                </Link>
              </li>
              <li>
                <Link to="/risk-passport" className="hover:text-emerald-400 transition">
                  → ভূমি লেনদেন ঝুঁকি পাসপোর্ট (Risk Passport)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-4 border-land-500 pl-2">
              সরকারি পোর্টাল ও রিসোর্স
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a
                  href="https://minland.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition"
                >
                  <span>ভূমি মন্ত্রণালয় বাংলাদেশ</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://mutation.land.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition"
                >
                  <span>ই-নামজারি অফিসিয়াল ওয়েবসাইট</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ldtax.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition"
                >
                  <span>অনলাইন ভূমি উন্নয়ন কর (খাজনা)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://eporcha.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition"
                >
                  <span>ই-পরচা (খতিয়ান ও মৌজা ম্যাপ)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Helpline */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-4 border-land-500 pl-2">
              জরুরি হেল্পলাইন
            </h4>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-3">
              <div>
                <p className="text-[11px] text-slate-400">২৪ ঘণ্টা ভূমি সেবা হটলাইন</p>
                <a
                  href="tel:16122"
                  className="inline-flex items-center gap-2 text-xl font-black text-emerald-400 hover:text-emerald-300 transition"
                >
                  <PhoneCall className="w-5 h-5 text-emerald-500" />
                  <span>১৬১২২</span>
                </a>
              </div>
              <div className="pt-2 border-t border-slate-700 text-xs">
                <p className="text-slate-400">প্রবাসী বাংলাদেশিদের জন্য:</p>
                <p className="font-semibold text-white">+৮৮০ ৯৬১২৩ ১৬১২২</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="pt-8 border-t border-slate-800 text-center space-y-2 text-xs text-slate-500">
          <p>
            © ২০২৪–২০২৬ স্মার্ট ভূমি সেবা | গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ডিজিটাল রূপকল্পের আওতায় একটি নাগরিক সহায়ক প্রোটোটাইপ।
          </p>
          <p className="text-[11px] text-slate-500">
            স্বত্বাধিকার ও আইনি তথ্য: এই সাইটের প্রদত্ত সকল যাচাই ফলাফল কৃত্রিম ও সিন্থেটিক ডেটাসেট ভিত্তিক ডেমো। জমি রেজিস্ট্রেশন বা নামজারি সংক্রান্ত চূড়ান্ত সিদ্ধান্ত আইনানুগ সরকারি কর্মকর্তার এখতিয়ারাধীন।
          </p>
        </div>
      </div>
    </footer>
  );
};
