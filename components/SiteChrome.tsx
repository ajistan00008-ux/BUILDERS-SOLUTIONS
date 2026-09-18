"use client";

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { ChatBot } from './ChatBot';

/**
 * The Builders Solutions chrome (header, footer, WhatsApp bubble, chatbot) wraps
 * every page from the root layout. The ROSEMARY.BH storefront under /rosemary is
 * a separate consumer brand with its own navigation, so it opts out here rather
 * than fighting the root layout.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const standalone = pathname.startsWith('/rosemary');

  if (standalone) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="overflow-x-hidden min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </>
  );
}
