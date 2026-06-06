"use client";

import React from 'react';
import { useLang } from '../lib/providers';
import { ArrowRight } from './icons';

export function CTASection() {
  const { t } = useLang();
  return (
    <section id="contact" className="bg-brand-gold">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-start">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-brand-ink">{t.cta.title}</h2>
          <p className="text-sm text-brand-ink/80 mt-1">{t.cta.text}</p>
        </div>
        <a
          href={`mailto:${t.footer.email}`}
          className="inline-flex items-center gap-2 bg-brand-ink text-white text-xs font-bold uppercase tracking-wide px-7 py-4 rounded-full hover:bg-black transition-colors whitespace-nowrap"
        >
          {t.cta.button}
          <ArrowRight width={16} height={16} className="rtl:rotate-180" />
        </a>
      </div>
    </section>
  );
}
