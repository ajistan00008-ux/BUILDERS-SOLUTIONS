"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../lib/providers';
import { ArrowRight, ChevronLeft, ChevronRight } from './icons';
import { HERO_IMAGES } from '../lib/images';

export function HeroCarousel() {
  const { t, dir } = useLang();
  const slides = t.hero;
  const stats = t.stats;
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[index];

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden flex items-center">
      {/* Animated backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Image
            src={HERO_IMAGES[index % HERO_IMAGES.length]}
            alt=""
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(224,164,59,0.18),transparent_55%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 pt-28 pb-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
        {/* Copy */}
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="inline-block text-brand-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
                {slide.kicker}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] text-white">
                <span className="block">{slide.titleTop}</span>
                <span className="block text-brand-gold">{slide.titleBottom}</span>
              </h1>
              <p className="mt-6 text-white/80 text-sm md:text-base leading-relaxed max-w-xl">
                {slide.lead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#products" className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-goldDark text-white text-xs font-bold uppercase tracking-wide px-6 py-3.5 rounded-full transition-colors">
                  {slide.ctaPrimary}
                  <ArrowRight width={16} height={16} className="rtl:rotate-180" />
                </a>
                <a href="#about" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-wide px-6 py-3.5 rounded-full border border-white/20 transition-colors">
                  {slide.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats panel */}
        <div className="hidden md:flex flex-col gap-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-72">
          {stats.map((s, i) => (
            <div key={i} className={`py-3 ${i < stats.length - 1 ? 'border-b border-white/10' : ''}`}>
              <div className="text-2xl font-black text-brand-gold leading-none">{s.value}</div>
              <div className="text-[11px] uppercase tracking-wider text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button onClick={dir === 'rtl' ? next : prev} aria-label="Previous" className="absolute start-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors">
        <ChevronLeft width={22} height={22} />
      </button>
      <button onClick={dir === 'rtl' ? prev : next} aria-label="Next" className="absolute end-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors">
        <ChevronRight width={22} height={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-brand-gold' : 'w-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
}
