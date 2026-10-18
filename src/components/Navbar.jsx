import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FileText,
  Search,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Compass,
  PhoneCall,
  Menu,
  X,
  Type,
  FileCheck2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { useFontSize } from '../hooks/useFontSize';
import { cn } from '../utils/cn';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { fontSize, cycleFontSize, getLabel } = useFontSize();
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { path: '/', label: 'হোম', icon: Sparkles },
    { path: '/journey', label: 'স্মার্ট ভূমি যাত্রা', icon: Compass },
    { path: '/mutation-assist', label: 'নামজারি সহায়ক', icon: FileCheck2 },
    { path: '/ownership-transfer', label: 'মালিকানা বদল', icon: Workflow },
    { path: '/deed-verify', label: 'দলিল যাচাই', icon: Search },
    { path: '/mutation-tracker', label: 'আবেদনের অবস্থা', icon: FileText },
    { path: '/consistency-checker', label: 'গরমিল পরীক্ষক', icon: CheckCircle },
    { path: '/risk-passport', label: 'ঝুঁকি পাসপোর্ট', icon: ShieldCheck },
    { path: '/help', label: 'সহায়তা কেন্দ্র', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-land-100 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-land-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">স্মার্ট বাংলাদেশ ডিজিটাল ভূমি ব্যবস্থাপনা পোর্টাল</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Font Size Accessibility toggle */}
            <button
              onClick={cycleFontSize}
              title="হরফের আকার পরিবর্তন করুন"
              className="flex items-center gap-1 bg-land-800/80 hover:bg-land-700 px-2.5 py-0.5 rounded text-white text-xs border border-land-700 transition"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{getLabel()}</span>
            </button>

            {/* Hotline */}
            <a
              href="tel:16122"
              className="flex items-center gap-1.5 bg-gov-red hover:bg-red-700 text-white font-bold px-3 py-0.5 rounded-full text-xs shadow transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ভূমি কল সেন্টার: ১৬১২২</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Logo emblem */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-land-700 to-land-900 flex items-center justify-center shadow-md shadow-land-800/20 group-hover:scale-105 transition-transform">
            <div className="w-8 h-8 rounded-full bg-gov-red flex items-center justify-center text-white font-bold text-base shadow-inner">
              🇧🇩
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-land-900 tracking-tight">
                স্মার্ট ভূমি সেবা
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                ডিজিটাল
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              সহজ বাংলায় জমি রেজিস্ট্রেশন, নামজারি ও দলিল যাচাই
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-land-700 text-white shadow-md shadow-land-800/20'
                    : 'text-slate-700 hover:text-land-800 hover:bg-land-50'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-land-700')} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-land-50 text-land-900 border border-land-200"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-land-100 px-4 pt-2 pb-6 space-y-1 shadow-xl animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all',
                  isActive
                    ? 'bg-land-700 text-white'
                    : 'text-slate-700 hover:bg-land-50 hover:text-land-900'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-land-700')} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>সহায়তার জন্য ১৬১২২ ডায়াল করুন</span>
            <button
              onClick={cycleFontSize}
              className="px-2.5 py-1 bg-land-100 text-land-900 rounded font-medium"
            >
              {getLabel()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
