"use client";

import React from 'react';
import Image from 'next/image';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { ArrowRight } from './icons';
import { PRESENCE_IMAGES } from '../lib/images';

export function Presence() {
  const { t } = useLang();
  const p = t.presence;
  return (
    <section id="presence" className="py-24 px-5 md:px-10 bg-neutral-50 dark:bg-brand-inkSoft">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{p.kicker}</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 text-brand-ink dark:text-white">{p.title}</h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {p.items.map((loc, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group relative h-40 rounded-xl overflow-hidden bg-brand-inkSoft p-5 flex flex-col justify-end">
                <Image src={PRESENCE_IMAGES[i % PRESENCE_IMAGES.length]} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(min-width:1024px) 25vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_50%,rgba(224,164,59,0.25),transparent_70%)]" />
                <div className="relative">
                  <div className="font-bold text-white">{loc.country}</div>
                  <div className="text-xs text-brand-gold mt-1">{loc.projects}</div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <a href="#contact" className="h-40 rounded-xl bg-brand-ink text-white p-5 flex flex-col justify-between hover:bg-brand-goldDark transition-colors">
              <div className="text-3xl font-black text-brand-gold">{p.items.length}+</div>
              <div>
                <div className="text-xs uppercase tracking-wide text-white/70">{p.locationsLabel}</div>
                <span className="inline-flex items-center gap-2 text-xs font-bold mt-2">
                  {p.viewAll} <ArrowRight width={14} height={14} className="rtl:rotate-180" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
