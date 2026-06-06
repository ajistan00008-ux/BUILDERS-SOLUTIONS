"use client";

import React from 'react';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';

export function WhyChooseUs() {
  const { t } = useLang();
  const w = t.why;
  return (
    <section className="py-20 px-5 md:px-10 bg-brand-ink text-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{w.kicker}</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3">{w.title}</h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {w.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="border-t-2 border-brand-gold/40 pt-5">
                <div className="text-brand-gold font-black text-2xl mb-3">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
