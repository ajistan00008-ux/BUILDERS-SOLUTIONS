"use client";

import React from 'react';
import { useLang } from '../lib/providers';

export function Ticker() {
  const { t } = useLang();
  const items = [...t.ticker, ...t.ticker]; // duplicate for seamless loop

  return (
    <div className="bg-gradient-to-r from-brand-gold to-brand-gold2 py-2.5 overflow-hidden" dir="ltr">
      <div className="flex w-max marquee-track animate-ticker">
        {items.map((item, i) => (
          <span key={i} className="flex items-center font-display text-brand-ink text-sm tracking-[0.2em] uppercase whitespace-nowrap">
            {item}
            <span className="mx-6 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
