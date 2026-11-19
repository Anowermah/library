import React from 'react';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import MainPwaManager from '@/components/pwa/MainPwaManager';
import FloatingIslamicAiWidget from '@/components/islamic-ai/FloatingIslamicAiWidget';
import FloatingAdPopup from '@/components/ads/FloatingAdPopup';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { getCachedSiteSettings } from '@/lib/cache';

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: '#C49A45',
};

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Shubban Libery',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/main/apple-touch-icon.png',
  },
};

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getCachedSiteSettings().catch(() => []);
  const stickySetting = siteSettings.find((s: any) => s.key === 'header_sticky_enabled')?.value ?? 'true';
  const isSticky = stickySetting !== 'false';

  return (
    <div className="flex flex-col min-h-screen overflow-x-clip w-full relative">
      <Header isSticky={isSticky} />
      <main className="flex-1 pb-24 md:pb-0 overflow-x-clip w-full">{children}</main>
      <Footer />
      <MobileBottomNav />
      <FloatingIslamicAiWidget />
      <FloatingAdPopup />
      <ScrollToTop />
      <MainPwaManager />
    </div>
  );
}
