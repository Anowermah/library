'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck, Scale, PhoneCall } from 'lucide-react';

const QUICK_TOPICS = [
  { label: 'নামাজের আরকান', query: 'নামাজের ফরজ ও আরকানসমূহ কি কি?' },
  { label: 'যাকাতের নিসাব', query: 'যাকাতের নিসাব ও প্রদানের খাতসমূহ' },
  { label: 'রোজা ভঙ্গের কারণ', query: 'রোজা ভঙ্গের কারণসমূহ কি কি?' },
  { label: 'সহীহ হাদিস সার্চ', query: 'সকল কাজের ভিত্তি নিয়তের উপর হাদিসটির ব্যাখ্যা' },
];

export default function HomeIslamicAiSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      router.push('/islamic-ai');
      return;
    }
    router.push(`/islamic-ai?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 font-bengali">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 text-white shadow-xl border border-emerald-800/50 p-5 sm:p-10">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-shubban-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          {/* Minimal Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ইসলামিক এআই নলেজ অ্যাসিস্ট্যান্ট</span>
          </div>

          {/* Clean Heading */}
          <h2 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-white">
            আপনার ইসলামিক প্রশ্নের নির্ভরযোগ্য উত্তর
          </h2>

          {/* Single-line concise subtitle */}
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-lg mx-auto">
            পবিত্র কুরআন ও বিশুদ্ধ হাদিসের আলোকে যেকোনো জিজ্ঞাসার তাৎক্ষণিক দলিলভিত্তিক সমাধান
          </p>

          {/* Minimal Interactive Prompt Bar */}
          <form onSubmit={handleSearch} className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30 transition-all p-1.5 shadow-lg">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="যেকোনো ইসলামিক প্রশ্ন বা মাসআলা লিখুন..."
                className="w-full bg-transparent px-3.5 py-2 text-xs sm:text-sm text-white placeholder-emerald-100/50 focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-shubban-gold hover:bg-shubban-gold-hover text-stone-950 text-xs sm:text-sm font-bold shadow transition-transform active:scale-95"
              >
                <span>প্রশ্ন করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Quick Topics — Minimal Clean Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className="text-[11px] text-emerald-200/70 mr-1 hidden sm:inline">দ্রুত খুঁজুন:</span>
            {QUICK_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => router.push(`/islamic-ai?q=${encodeURIComponent(topic.query)}`)}
                className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-emerald-100/90 border border-white/10 hover:border-amber-400/40 transition-colors"
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Minimal Trust Indicator Line */}
          <div className="pt-3 border-t border-emerald-800/50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-emerald-200/70">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>১০০% বিশুদ্ধ সনদ ও দলিল</span>
            </span>
            <span className="hidden xs:inline">•</span>
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>৪ মাযহাবের প্রামাণ্য পর্যালোচনা</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <Link href="/islamic-ai#hotline" className="flex items-center gap-1 text-amber-300 hover:underline">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>লাইভ শাইখ হটলাইন</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
