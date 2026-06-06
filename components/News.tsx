"use client";

import React from 'react';
import Image from 'next/image';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { ArrowRight } from './icons';
import { NEWS_IMAGES } from '../lib/images';

export function News() {
  const { t } = useLang();
  const n = t.news;
  return (
    <section id="news" className="py-24 px-5 md:px-10 bg-neutral-50 dark:bg-brand-inkSoft">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{n.kicker}</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 text-brand-ink dark:text-white">{n.title}</h2>
            </div>
            <a href="#" className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-ink dark:text-white hover:text-brand-gold transition-colors">
              {n.viewAll} <ArrowRight width={14} height={14} className="rtl:rotate-180" />
            </a>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {n.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <a href="#" className="group block rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-brand-ink hover:-translate-y-1 transition-transform">
                <div className="relative h-36 bg-brand-inkSoft overflow-hidden">
                  <Image src={NEWS_IMAGES[i % NEWS_IMAGES.length]} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
                </div>
                <div className="p-5">
                  <div className="text-[11px] uppercase tracking-wide text-brand-gold font-bold">{item.date}</div>
                  <h3 className="font-bold text-sm mt-2 text-brand-ink dark:text-white group-hover:text-brand-gold transition-colors leading-snug">{item.title}</h3>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
