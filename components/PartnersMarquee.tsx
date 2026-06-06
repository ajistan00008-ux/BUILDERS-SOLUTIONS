"use client";

import React from 'react';
import { useLang } from '../lib/providers';

// Placeholder partner labels. Replace with REAL partner logos you are
// authorised to display: drop SVG/PNG files in /public/partners and render
// them here as <img>. Do NOT list a brand you do not have rights to use.
const PLACEHOLDER_PARTNERS = [
  'Partner One', 'Partner Two', 'Partner Three', 'Partner Four',
  'Partner Five', 'Partner Six', 'Partner Seven', 'Partner Eight',
];

export function PartnersMarquee() {
  const { t } = useLang();
  const items = [...PLACEHOLDER_PARTNERS, ...PLACEHOLDER_PARTNERS]; // duplicate for seamless loop

  return (
    <section className="py-16 px-5 md:px-10 bg-white dark:bg-brand-ink border-y border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{t.partners.kicker}</span>
            <h2 className="text-xl md:text-2xl font-black mt-2 text-brand-ink dark:text-white">{t.partners.title}</h2>
          </div>
        </div>

        <div className="relative overflow-hidden" dir="ltr">
          <div className="flex w-max gap-12 marquee-track animate-marquee">
            {items.map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-12 px-6 shrink-0 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
              >
                <span className="text-lg font-black tracking-tight text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-white dark:from-brand-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-white dark:from-brand-ink to-transparent" />
        </div>
        <p className="text-[11px] text-neutral-400 dark:text-neutral-600 mt-4">{t.partners.note}</p>
      </div>
    </section>
  );
}
