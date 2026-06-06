"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { ArrowRight } from './icons';
import { CORE_FOCUS_LINE } from '../content/products';

export function Products() {
  const { t } = useLang();
  const p = t.products;

  // image + verified specs come from content/products.ts, keyed by id
  const meta = Object.fromEntries(CORE_FOCUS_LINE.map((x) => [x.id, x]));

  return (
    <section id="products" className="py-24 px-5 md:px-10 bg-neutral-50 dark:bg-brand-inkSoft">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{p.kicker}</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 text-brand-ink dark:text-white">{p.title}</h2>
            </div>
            <a href="/contact" className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-ink dark:text-white hover:text-brand-gold transition-colors">
              {p.viewAll} <ArrowRight width={14} height={14} className="rtl:rotate-180" />
            </a>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {p.items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.06}>
              <ProductCard
                title={item.title}
                desc={item.desc}
                image={meta[item.id]?.image || ''}
                specs={meta[item.id]?.specifications || []}
                comingSoon={t.comingSoon}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  title, desc, image, specs, comingSoon,
}: { title: string; desc: string; image: string; specs: string[]; comingSoon: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sy = useSpring(ry, { stiffness: 150, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const ox = e.clientX - r.left - r.width / 2;
    const oy = e.clientY - r.top - r.height / 2;
    rx.set(-oy / (r.height / 14));
    ry.set(ox / (r.width / 14));
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group relative h-full rounded-2xl overflow-hidden bg-white dark:bg-brand-ink border border-black/5 dark:border-white/10 hover:border-brand-gold/40 transition-colors"
    >
      <div style={{ transform: 'translateZ(25px)' }}>
        <div className="relative h-40 bg-[linear-gradient(135deg,#1a2230,#0b0e13)]">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width:1024px) 25vw, 50vw" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">{comingSoon}</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-base text-brand-ink dark:text-white group-hover:text-brand-gold transition-colors">{title}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">{desc}</p>
          {specs.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {specs.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />{s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
