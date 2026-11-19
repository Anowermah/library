import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Compass,
  Feather,
  Landmark,
  Newspaper,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
  Flame,
  Bot,
} from 'lucide-react';

interface QuickServiceItem {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  badge?: string;
  badgeColor?: string;
}

const QUICK_SERVICES: QuickServiceItem[] = [
  {
    id: 'books',
    name: 'সব বই',
    href: '/books',
    icon: <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/60 dark:border-emerald-800/50',
    badge: '১৪৩+',
  },
  {
    id: 'islamic-ai',
    name: 'ইসলামিক এআই',
    href: '/islamic-ai',
    icon: <Bot className="w-5 h-5 text-teal-700 dark:text-teal-300" />,
    iconBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200/60 dark:border-teal-800/50',
    badge: 'নতুন',
    badgeColor: 'bg-amber-500 text-stone-950',
  },
  {
    id: 'free-pdf',
    name: 'ফ্রি ই-বুক',
    href: '/digital-library?free=true',
    icon: <GraduationCap className="w-5 h-5 text-blue-700 dark:text-blue-300" />,
    iconBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/60 dark:border-blue-800/50',
    badge: 'মুক্ত',
    badgeColor: 'bg-blue-600 text-white',
  },
  {
    id: 'lifestyle',
    name: 'আতর ও সুন্নাহ',
    href: '/books?category=islamic-lifestyle',
    icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200/60 dark:border-amber-800/50',
  },
  {
    id: 'magazines',
    name: 'সাময়িকী',
    href: '/magazines',
    icon: <Newspaper className="w-5 h-5 text-orange-700 dark:text-orange-300" />,
    iconBg: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200/60 dark:border-orange-800/50',
  },
  {
    id: 'donations',
    name: 'সদকাহ ফান্ড',
    href: '/donations',
    icon: <HeartHandshake className="w-5 h-5 text-rose-700 dark:text-rose-300" />,
    iconBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200/60 dark:border-rose-800/50',
    badge: 'সদকাহ',
    badgeColor: 'bg-rose-600 text-white',
  },
  {
    id: 'history',
    name: 'ইতিহাস ও ফিকহ',
    href: '/books?category=history',
    icon: <Landmark className="w-5 h-5 text-purple-700 dark:text-purple-300" />,
    iconBg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200/60 dark:border-purple-800/50',
  },
  {
    id: 'deals',
    name: 'বিশেষ অফার',
    href: '/books?filter=discount',
    icon: <Flame className="w-5 h-5 text-red-600 dark:text-red-400" />,
    iconBg: 'bg-red-50 dark:bg-red-950/60 border-red-200/60 dark:border-red-800/50',
    badge: '৩০%',
    badgeColor: 'bg-red-600 text-white',
  },
];

export default function CategoryIconGrid() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 font-bengali">
      {/* Mobile App Section Header (Compact bKash / MyGP style) */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-4 rounded-full bg-shubban-gold inline-block" />
          <h2 className="font-bold text-sm sm:text-lg text-stone-900 dark:text-stone-100 tracking-tight">
            জরুরি সেবা ও বিভাগসমূহ
          </h2>
        </div>
        <Link
          href="/categories"
          className="text-[11px] sm:text-xs font-bold text-shubban-green dark:text-shubban-gold hover:underline flex items-center gap-0.5"
        >
          <span>সব বিভাগ</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 4-Column Grid on Mobile (bKash / MyGP / Nagad exact layout) */}
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-3 bg-white/80 dark:bg-stone-900/70 backdrop-blur-md p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm w-full">
        {QUICK_SERVICES.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex flex-col items-center justify-center text-center py-1 px-0.5 rounded-xl transition-all active:scale-95 w-full min-w-0"
          >
            <div className="relative flex items-center justify-center">
              {/* App Icon Squircle */}
              <div
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shadow-2xs group-hover:shadow-md group-hover:scale-105 transition-all ${item.iconBg}`}
              >
                {item.icon}
              </div>

              {/* Optional Micro Badge */}
              {item.badge && (
                <span
                  className={`absolute -top-1 -right-1.5 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold shadow-xs leading-none whitespace-nowrap z-10 ${
                    item.badgeColor || 'bg-shubban-gold text-stone-950'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span className="mt-1.5 text-[10px] sm:text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-shubban-gold transition-colors block w-full text-center truncate tracking-tight px-0.5">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
