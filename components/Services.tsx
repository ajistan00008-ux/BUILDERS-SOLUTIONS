"use client";

import React from 'react';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { ArrowRight } from './icons';

export function Services() {
  const { t } = useLang();
  const s = t.services;
  return (
    <section id="services" className="py-24 px-5 md:px-10 bg-brand-ink text-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{s.kicker}</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3">{s.title}</h2>
            </div>
            <p className="text-sm text-white/60 max-w-md">{s.subtitle}</p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {s.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group relative h-full rounded-xl border border-white/10 bg-brand-inkSoft p-6 overflow-hidden transition-all hover:border-brand-gold/50 hover:-translate-y-1">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(224,164,59,0.12),transparent_70%)]" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-lg bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-4 font-black">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-base">{item.title}</h3>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed">{item.desc}</p>
                  <ArrowRight width={18} height={18} className="mt-4 text-brand-gold rtl:rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
