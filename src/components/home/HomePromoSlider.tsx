'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Gift,
  HeartHandshake,
  Store,
  Flame,
  Truck,
  RotateCcw,
} from 'lucide-react';

interface SlideData {
  id: number;
  badge: string;
  badgeIcon: React.ReactNode;
  headline: string;
  subhead: string;
  couponCode?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgGradient: string;
  image: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    badge: 'শুব্বান বইমেলা ও সাহিত্য উৎসব ২০২৬',
    badgeIcon: <Flame className="w-3.5 h-3.5 text-amber-400" />,
    headline: 'চিরায়ত ও আধুনিক শ্রেষ্ঠ গ্রন্থসম্ভারে ৩০% পর্যন্ত বিশেষ ছাড়!',
    subhead: 'রবীন্দ্রনাথ, নজরুল, মীর মশাররফ হোসেন থেকে শুরু করে বরেণ্য গবেষকদের বই এখন এক ঠিকানায়। রকমারি-স্টাইল উপহার মোড়কীকরণ সুবিধা সহ।',
    couponCode: 'SHUBBAN10',
    primaryCtaText: 'সকল বই দেখুন',
    primaryCtaLink: '/books',
    secondaryCtaText: 'ডিজিটাল লাইব্রেরী (PDF)',
    secondaryCtaLink: '/digital-library',
    bgGradient: 'from-shubban-green via-emerald-950 to-shubban-green',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  },
  {
    id: 2,
    badge: 'ওয়াফিজীবন অনুপ্রাণিত সুন্নাহ লাইফস্টাইল',
    badgeIcon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
    headline: 'মদিনার খাঁটি রয়্যাল উদ আতর ও তুর্কি মখমল জায়নামাজ',
    subhead: 'প্রাকৃতিক অ্যালকোহলমুক্ত হালাল আতর (৬ মিলি / ১২ মিলি), প্রিমিয়াম কাঠের তসবিহ ও প্রাকৃতিক জয়তুন মিসওয়াক দিয়ে সাজান আপনার আত্মিক জীবন।',
    primaryCtaText: 'লাইফস্টাইল সংগ্রহ',
    primaryCtaLink: '/books?category=islamic-lifestyle',
    secondaryCtaText: 'দারুল হুদা স্টোর',
    secondaryCtaLink: '/sellers/darul-huda-lifestyle',
    bgGradient: 'from-amber-950 via-stone-900 to-amber-950',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
  },
  {
    id: 3,
    badge: 'আস-সুন্নাহ ও শুব্বান সদকাহ ফান্ড',
    badgeIcon: <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />,
    headline: 'বন্যাদুর্গতদের স্থায়ী পুনর্বাসন ও বিনামূল্যে কুরআন বিতরণ',
    subhead: 'শতভাগ আমানতদারিতা ও শরিয়াহ বোর্ড কর্তৃক নিয়মিত অডিটকৃত ফান্ড। প্রতিটি দানের সাথে তাৎক্ষণিক ভেরিফায়েড ডিজিটাল কিউআর রসিদ পাবেন।',
    primaryCtaText: 'সরাসরি দান করুন',
    primaryCtaLink: '/donations',
    secondaryCtaText: 'সকল ক্যাম্পেইন ও রিপোর্ট',
    secondaryCtaLink: '/donations',
    bgGradient: 'from-emerald-950 via-teal-950 to-emerald-950',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  },
  {
    id: 4,
    badge: 'দারাজ স্টাইল মাল্টি-ভেন্ডর মার্কেটপ্লেস',
    badgeIcon: <Store className="w-3.5 h-3.5 text-amber-400" />,
    headline: 'দেশের শীর্ষ ৫০+ ইসলামিক প্রকাশনী ও স্বতন্ত্র বিক্রেতা',
    subhead: 'মাকতাবাতুল আযহার, দারুল হুদা সহ দেশের নির্ভরযোগ্য সব প্রকাশনীর মূল বই কিনুন অথবা আপনার প্রকাশনীর জন্য ডিজিটাল শপ খুলুন।',
    couponCode: 'VENDOR2026',
    primaryCtaText: 'দোকান খুলুন (বিক্রেতা)',
    primaryCtaLink: '/seller/apply',
    secondaryCtaText: 'অনুমোদিত ভেন্ডরসমূহ',
    secondaryCtaLink: '/sellers/maktabatul-azhar',
    bgGradient: 'from-slate-950 via-shubban-green to-slate-950',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80',
  },
];

export interface DynamicHeroSlide {
  id: string | number;
  badge: string;
  badgeIcon?: string | React.ReactNode;
  headline: string;
  subhead: string;
  couponCode?: string | null;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string | null;
  secondaryCtaLink?: string | null;
  bgGradient: string;
  imageUrl?: string;
  image?: string;
}

interface HomePromoSliderProps {
  initialSlides?: DynamicHeroSlide[];
}

function resolveIcon(icon: any) {
  if (React.isValidElement(icon)) return icon;
  switch (icon) {
    case 'Flame':
      return <Flame className="w-3.5 h-3.5 text-amber-400" />;
    case 'Sparkles':
      return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
    case 'BookOpen':
      return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
    case 'Gift':
      return <Gift className="w-3.5 h-3.5 text-rose-400" />;
    case 'HeartHandshake':
      return <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />;
    case 'Store':
      return <Store className="w-3.5 h-3.5 text-amber-400" />;
    default:
      return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
  }
}

export default function HomePromoSlider({ initialSlides }: HomePromoSliderProps = {}) {
  const activeSlides = (initialSlides && initialSlides.length > 0)
    ? initialSlides.map((s) => ({
      id: s.id,
      badge: s.badge,
      badgeIcon: resolveIcon(s.badgeIcon),
      headline: s.headline,
      subhead: s.subhead,
      couponCode: s.couponCode || undefined,
      primaryCtaText: s.primaryCtaText,
      primaryCtaLink: s.primaryCtaLink,
      secondaryCtaText: s.secondaryCtaText || '',
      secondaryCtaLink: s.secondaryCtaLink || '',
      bgGradient: s.bgGradient,
      image: s.imageUrl || s.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    }))
    : SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = activeSlides.length;

  useEffect(() => {
    if (isPaused || slideCount <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slideCount]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const slide = activeSlides[currentSlide] || activeSlides[0];

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative overflow-hidden font-bengali px-3 sm:px-0 pt-2 sm:pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Slide Stage — MyGP / bKash Compact App Banner Style on Mobile */}
      <div
        className={`relative bg-gradient-to-r ${slide.bgGradient} text-shubban-ivory rounded-2xl sm:rounded-none min-h-[170px] sm:min-h-[440px] lg:min-h-[500px] flex items-center transition-all duration-700 shadow-md sm:shadow-none overflow-hidden`}
      >
        {/* Mobile Background Image Layer */}
        <div className="sm:hidden absolute inset-0 z-0">
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority={currentSlide === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Background geometry pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A45_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-3.5 sm:py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (Text & CTAs) */}
            <div className="lg:col-span-7 space-y-2 sm:space-y-5 text-left">
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-shubban-gold shadow-sm max-w-full">
                {slide.badgeIcon}
                <span className="truncate max-w-[150px] sm:max-w-none">{slide.badge}</span>
                {slide.couponCode && (
                  <span className="ml-1 px-1.5 py-0.2 rounded bg-shubban-gold text-shubban-green-950 font-mono text-[8px] sm:text-[10px] font-bold">
                    কুপন: {slide.couponCode}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-sm sm:text-3xl lg:text-5xl font-bold text-white leading-snug sm:leading-tight line-clamp-2 sm:line-clamp-none">
                {slide.headline}
              </h1>

              <p className="hidden sm:block text-xs sm:text-base text-shubban-ivory/85 leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
                {slide.subhead}
              </p>

              <div className="pt-0.5 sm:pt-2 flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-3">
                <Link
                  href={slide.primaryCtaLink}
                  className="px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-shubban-gold hover:bg-shubban-gold-hover text-shubban-green-950 font-bold text-[11px] sm:text-sm shadow-md transition-transform hover:-translate-y-0.5 flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                >
                  <span>{slide.primaryCtaText}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>

                <Link
                  href={slide.secondaryCtaLink}
                  className="px-2.5 sm:px-5 py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                >
                  <span>{slide.secondaryCtaText}</span>
                </Link>
              </div>
            </div>

            {/* Right Content (Visual Showcase Card) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative mx-auto max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/15 bg-stone-900 group">
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  priority={currentSlide === 0}
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold block text-shubban-gold">শুব্বান প্রামাণ্য কালেকশন</span>
                    <span className="text-[11px] text-stone-300">শতভাগ আসল সংস্করণ ও নির্ভরযোগ্য বিতরণ</span>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-shubban-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls — Hidden on Mobile to prevent text obstruction, visible on tablet/desktop */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 transition-all z-20 items-center justify-center shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/15 transition-all z-20 items-center justify-center shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 sm:h-2 transition-all rounded-full ${
                currentSlide === idx ? 'w-6 sm:w-8 bg-shubban-gold' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Banner Strip — App Chip Track on Mobile, Grid on Desktop */}
      <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 py-2 sm:py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex sm:grid sm:grid-cols-4 items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-0.5 -mx-1 px-1">
            <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:p-0 rounded-full sm:rounded-none bg-emerald-50/80 dark:bg-emerald-950/40 sm:bg-transparent border border-emerald-200/50 dark:border-emerald-800/40 sm:border-none text-[11px] sm:text-xs font-medium text-stone-700 dark:text-stone-300">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span className="whitespace-nowrap">দেশব্যাপী দ্রুত হোম ডেলিভারি</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:p-0 rounded-full sm:rounded-none bg-rose-50/80 dark:bg-rose-950/40 sm:bg-transparent border border-rose-200/50 dark:border-rose-800/40 sm:border-none text-[11px] sm:text-xs font-medium text-stone-700 dark:text-stone-300">
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 flex-shrink-0" />
              <span className="whitespace-nowrap">রকমারি গিফট র‍্যাপিং (+৳৩০)</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:p-0 rounded-full sm:rounded-none bg-amber-50/80 dark:bg-amber-950/40 sm:bg-transparent border border-amber-200/50 dark:border-amber-800/40 sm:border-none text-[11px] sm:text-xs font-medium text-stone-700 dark:text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-shubban-gold flex-shrink-0" />
              <span className="whitespace-nowrap">১০০% আসল বই ও সুন্নাহ</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:p-0 rounded-full sm:rounded-none bg-teal-50/80 dark:bg-teal-950/40 sm:bg-transparent border border-teal-200/50 dark:border-teal-800/40 sm:border-none text-[11px] sm:text-xs font-medium text-stone-700 dark:text-stone-300">
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <span className="whitespace-nowrap">আস-সুন্নাহ সদকাহ ফান্ড</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

