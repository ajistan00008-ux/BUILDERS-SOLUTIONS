"use client";

import React from 'react';
import { useLang } from '../lib/providers';
import { WhatsApp } from './icons';

// Builders Solutions WhatsApp (Bahrain), international format, digits only.
const WHATSAPP_NUMBER = '97334685656';

export function WhatsAppButton() {
  const { t, dir } = useLang();
  const href = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp}
      className="group fixed bottom-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-full shadow-lg shadow-black/20 transition-all"
      style={dir === 'rtl' ? { left: '1.5rem' } : { right: '1.5rem' }}
    >
      <span className="flex items-center justify-center w-14 h-14 rounded-full">
        <WhatsApp width={28} height={28} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:pe-5 transition-all duration-300 text-sm font-semibold">
        {t.whatsapp}
      </span>
    </a>
  );
}
