"use client";

import React from 'react';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { Quote } from './icons';

export function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;
  return (
    <section className="py-24 px-5 md:px-10 bg-white dark:bg-brand-ink">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{tm.kicker}</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 text-brand-ink dark:text-white">{tm.title}</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {tm.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-brand-inkSoft p-7">
                <Quote width={28} height={28} className="text-brand-gold" />
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{item.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-brand-ink dark:text-white">{item.name}</div>
                    <div className="text-xs text-neutral-500">{item.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
