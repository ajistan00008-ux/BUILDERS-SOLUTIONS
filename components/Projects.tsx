"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLang } from '../lib/providers';
import { Reveal } from './Reveal';
import { ArrowRight } from './icons';
import { projects, SECTORS, type Project } from '../content/projects';

export function Projects() {
  const { t } = useLang();
  const p = t.projects;
  const [active, setActive] = useState<string>('All');

  const chips = ['All', ...SECTORS];
  const visible = active === 'All' ? projects : projects.filter((it) => it.sector === active);

  return (
    <section id="projects" className="py-24 px-5 md:px-10 bg-white dark:bg-brand-ink">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
            <div>
              <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em]">{p.kicker}</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 text-brand-ink dark:text-white">{p.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => {
                const label = c === 'All' ? p.allLabel : (p.sectors[c] ?? c);
                return (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-colors ${
                      active === c
                        ? 'bg-brand-gold text-white'
                        : 'bg-neutral-100 dark:bg-brand-inkSoft text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((proj, i) => (
            <ProjectCard key={proj.slug} project={proj} sectorLabel={p.sectors[proj.sector] ?? proj.sector} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, sectorLabel, delay }: { project: Project; sectorLabel: string; delay: number }) {
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  };

  return (
    <Reveal delay={delay}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="group relative h-72 rounded-2xl overflow-hidden bg-brand-inkSoft cursor-pointer"
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
          style={{
            opacity: spot.on ? 1 : 0,
            background: `radial-gradient(220px circle at ${spot.x}% ${spot.y}%, rgba(224,164,59,0.30), transparent 60%)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">{sectorLabel}</span>
          <h3 className="font-bold text-white text-lg leading-tight">{project.name}</h3>
          <p className="text-xs text-white/60 mt-0.5">{project.location}</p>
          {project.summary && (
            <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-300">
              <p className="text-xs text-white/70 mt-2 leading-relaxed">{project.summary}</p>
            </div>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}
