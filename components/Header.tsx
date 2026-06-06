"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, useTheme } from '../lib/providers';
import { Sun, Moon, Globe, ArrowRight, Menu } from './icons';

export function Header() {
  const { t, toggleLang, lang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';
  // On interior pages there's no dark hero behind the header, so it must be solid.
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/services', label: t.nav.services },
    { href: '/projects', label: t.nav.projects },
    { href: '/products', label: t.nav.products },
    { href: '/locations', label: t.nav.locations },
    { href: '/news', label: t.nav.news },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/90 dark:bg-brand-ink/90 backdrop-blur-lg shadow-sm border-b border-black/5 dark:border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 rounded-md bg-gradient-to-br from-brand-gold to-brand-goldDark flex items-center justify-center font-black text-white text-sm">
            TBS
          </span>
          <span className="flex flex-col leading-none">
            <span className={`font-extrabold tracking-tight text-sm uppercase ${solid ? 'text-brand-ink dark:text-white' : 'text-white'}`}>
              The Builders
            </span>
            <span className="text-[8px] tracking-[0.35em] uppercase font-bold mt-0.5 text-brand-gold">
              Solutions
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold">
          {navItems.map((item) => {
            const active = item.href === '/' ? isHome : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`uppercase tracking-wide transition-colors hover:text-brand-gold ${
                  active ? 'text-brand-gold' : solid ? 'text-brand-ink dark:text-neutral-200' : 'text-white/90'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full text-xs font-bold transition-colors ${
              solid ? 'text-brand-ink dark:text-white hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'
            }`}
          >
            <Globe width={16} height={16} />
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.controls.lightMode : t.controls.darkMode}
            className={`p-2 rounded-full transition-colors ${
              solid ? 'text-brand-ink dark:text-white hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'
            }`}
          >
            {theme === 'dark' ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
          </button>

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-goldDark text-white text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-full transition-colors"
          >
            {t.nav.getQuote}
            <ArrowRight width={15} height={15} className="rtl:rotate-180" />
          </Link>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            className={`lg:hidden p-2 rounded-full ${solid ? 'text-brand-ink dark:text-white' : 'text-white'}`}
          >
            <Menu width={22} height={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-brand-inkSoft border-t border-black/5 dark:border-white/10 px-5 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 text-sm font-semibold uppercase tracking-wide text-brand-ink dark:text-neutral-200 hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-brand-gold text-white text-xs font-bold uppercase tracking-wide px-4 py-3 rounded-full"
            >
              {t.nav.getQuote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
