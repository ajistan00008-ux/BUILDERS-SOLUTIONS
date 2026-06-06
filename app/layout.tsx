import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../lib/providers';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ChatBot } from '../components/ChatBot';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thebuilderssolutions.com'),
  title: {
    default: 'The Builders Solutions — Architectural & Structural Components',
    template: '%s | The Builders Solutions',
  },
  description:
    'Supplier of architectural and structural building components for commercial construction projects.',
  openGraph: {
    title: 'The Builders Solutions',
    description:
      'Architectural and structural building components for commercial construction projects.',
    url: 'https://www.thebuilderssolutions.com',
    siteName: 'The Builders Solutions',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

// Apply stored theme + language before paint to avoid a flash / hydration shift.
const noFlash = `(function(){try{
  var th=localStorage.getItem('tbs-theme');
  if(!th){th=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
  if(th==='dark'){document.documentElement.classList.add('dark');}
  var lg=localStorage.getItem('tbs-lang')||'en';
  document.documentElement.setAttribute('lang',lg);
  document.documentElement.setAttribute('dir',lg==='ar'?'rtl':'ltr');
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <main className="overflow-x-hidden min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
