'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Sparkles, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/components/providers/CartContext';
import { toBengaliNumber } from '@/lib/utils';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Hide mobile bottom nav on the dedicated reading page to maximize screen space
  if (pathname.startsWith('/read/')) {
    return null;
  }

  const navItems = [
    { label: 'হোম', href: '/', icon: Home, id: 'home' },
    { label: 'বইসমূহ', href: '/books', icon: BookOpen, id: 'books' },
    { label: 'ইসলামিক এআই', href: '/islamic-ai', icon: Sparkles, id: 'ai', isHighlight: true },
    { label: 'কার্ট', href: '/cart', icon: ShoppingBag, id: 'cart', count: totalCartCount },
    { label: 'প্রোফাইল', href: '/account', icon: User, id: 'account' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 font-bengali pointer-events-none pb-[max(env(safe-area-inset-bottom),8px)] pt-1 px-3"
    >
      {/* Floating App Dock — bKash / MyGP Inspired Minimalist Island */}
      <div className="pointer-events-auto max-w-md mx-auto bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200/90 dark:border-stone-800 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;

          // Center Highlight Tab (Islamic AI - like bKash QR / MyGP special action)
          if (item.isHighlight) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative -top-3.5 flex flex-col items-center group active:scale-90 transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-tr from-shubban-gold via-amber-400 to-amber-300 text-stone-950 shadow-amber-500/30 scale-105'
                      : 'bg-gradient-to-tr from-shubban-green via-emerald-800 to-teal-700 text-shubban-ivory shadow-emerald-900/30 group-hover:scale-105'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2] animate-pulse" />
                </div>
                <span
                  className={`text-[9.5px] font-bold mt-0.5 tracking-tight ${
                    isActive
                      ? 'text-shubban-gold dark:text-amber-400'
                      : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-1 px-1 rounded-xl transition-all active:scale-95 relative ${
                isActive
                  ? 'text-shubban-green dark:text-shubban-gold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {/* Active Indicator Background Pill */}
              <div
                className={`relative flex items-center justify-center px-3 py-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-shubban-green/10 dark:bg-shubban-gold/15'
                    : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.75]'
                  }`}
                />

                {/* Cart Badge */}
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {toBengaliNumber(item.count)}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 leading-none tracking-tight ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
