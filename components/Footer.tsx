"use client";

import React from 'react';
import { useLang } from '../lib/providers';

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: f.quickLinks,
      links: [
        { label: t.nav.home, href: '/' },
        { label: t.nav.about, href: '/about' },
        { label: t.nav.services, href: '/services' },
        { label: t.nav.projects, href: '/projects' },
      ],
    },
    { title: f.servicesCol, links: t.services.items.map((s) => ({ label: s.title, href: '/services' })) },
    { title: f.productsCol, links: t.products.items.slice(0, 5).map((p) => ({ label: p.title, href: '/products' })) },
    { title: f.locationsCol, links: t.presence.items.map((p) => ({ label: p.country, href: '/locations' })) },
  ];

  return (
    <footer className="bg-brand-ink text-white pt-16 pb-8 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-9 h-9 rounded-md bg-gradient-to-br from-brand-gold to-brand-goldDark flex items-center justify-center font-display text-brand-ink text-xl leading-none pt-1">BS</span>
            <span className="font-display text-2xl leading-none"><span className="text-white">BUILDERS</span> <span className="text-brand-gold">SOLUTIONS</span></span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">{f.tagline}</p>
        </div>

        {cols.map((col, i) => (
          <div key={i}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-brand-gold transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4">{f.contactCol}</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li className="font-semibold text-white/80">{f.headOffice}</li>
            <li>{f.address}</li>
            <li><a href={`tel:${f.phone}`} className="hover:text-brand-gold">{f.phone}</a></li>
            <li><a href={`mailto:${f.email}`} className="hover:text-brand-gold break-all">{f.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-white/40">
        © {new Date().getFullYear()} The Builders Solutions. {f.rights}
      </div>
    </footer>
  );
}
