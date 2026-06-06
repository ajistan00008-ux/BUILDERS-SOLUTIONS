"use client";

import React from 'react';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { ArrowRight } from './icons';

export function Contact() {
  const { t } = useLang();
  const f = t.footer;
  return (
    <section className="pt-32 pb-24 px-5 md:px-10 bg-white dark:bg-brand-ink">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <Reveal>
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{t.nav.contact}</span>
          <h1 className="text-3xl md:text-5xl font-black mt-3 text-brand-ink dark:text-white">{t.cta.title}</h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg">{t.cta.text}</p>

          <div className="mt-10 space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">{f.headOffice}</div>
              <div className="text-sm text-neutral-700 dark:text-neutral-300">{f.address}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">{t.nav.contact}</div>
              <a href={`tel:${f.phone}`} className="block text-sm text-neutral-700 dark:text-neutral-300 hover:text-brand-gold">{f.phone}</a>
              <a href={`mailto:${f.email}`} className="block text-sm text-neutral-700 dark:text-neutral-300 hover:text-brand-gold break-all">{f.email}</a>
            </div>
          </div>

          <a href={`mailto:${f.email}`} className="mt-10 inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-goldDark text-white text-xs font-bold uppercase tracking-wide px-7 py-4 rounded-full transition-colors">
            {t.cta.button}
            <ArrowRight width={16} height={16} className="rtl:rotate-180" />
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-brand-inkSoft p-7">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input className="w-full bg-white dark:bg-brand-ink border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-gold" placeholder="Name" />
                <input className="w-full bg-white dark:bg-brand-ink border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-gold" placeholder="Email" />
              </div>
              <input className="w-full bg-white dark:bg-brand-ink border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-gold" placeholder="Company / Project" />
              <textarea rows={5} className="w-full bg-white dark:bg-brand-ink border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-gold resize-none" placeholder="Tell us about your requirement" />
              <button type="submit" className="w-full bg-brand-ink dark:bg-white text-white dark:text-brand-ink font-bold text-xs uppercase tracking-wide py-3.5 rounded-lg hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-colors">
                {t.cta.button}
              </button>
              <p className="text-[11px] text-neutral-400">This form is a front-end demo — wire it to your email/CRM before launch.</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
