"use client";

import React from 'react';
import Image from 'next/image';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { ArrowRight } from './icons';
import { ABOUT_IMAGE } from '../lib/images';

export function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="about" className="py-24 px-5 md:px-10 bg-white dark:bg-brand-ink">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{a.kicker}</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 text-brand-ink dark:text-white">{a.title}</h2>
          <p className="mt-6 text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">{a.p1}</p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">{a.p2}</p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-brand-ink dark:bg-white text-white dark:text-brand-ink text-xs font-bold uppercase tracking-wide px-6 py-3.5 rounded-full hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-colors">
            {a.cta}
            <ArrowRight width={16} height={16} className="rtl:rotate-180" />
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative rounded-2xl overflow-hidden h-80 md:h-[26rem] bg-brand-inkSoft">
            <Image src={ABOUT_IMAGE} alt="" fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
            <div className="absolute -bottom-5 start-6 bg-brand-gold text-white rounded-xl px-5 py-4 shadow-xl">
              <div className="text-3xl font-black leading-none">{a.badgeValue}</div>
              <div className="text-[11px] uppercase tracking-wide mt-1">{a.badgeLabel}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
