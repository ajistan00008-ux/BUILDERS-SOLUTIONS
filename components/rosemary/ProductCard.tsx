"use client";

import React from 'react';
import Link from 'next/link';
import { BottleArt } from './BottleArt';
import { bhd, useCart } from './CartProvider';
import type { Sku } from '../../content/rosemary';

export function ProductCard({ sku, compact = false }: { sku: Sku; compact?: boolean }) {
  const { add } = useCart();
  const perMl = (() => {
    const ml = parseInt(sku.size, 10);
    if (!ml || sku.bundleOf) return null;
    return (sku.priceBhd * 1000) / ml; // fils per ml
  })();

  return (
    <article className="group relative flex flex-col rounded-2xl border border-sprig-stone bg-white overflow-hidden hover:border-leaf-300 hover:shadow-[0_12px_40px_-24px_rgba(18,24,15,0.4)] transition-all">
      {sku.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-leaf-600 text-white text-[11px] font-semibold px-2.5 py-1">
          {sku.badge}
        </span>
      )}

      <Link
        href={`/rosemary/product/${sku.slug}`}
        className="block bg-gradient-to-b from-leaf-50 to-white pt-6 pb-2"
        aria-label={`${sku.name} ${sku.size}`}
      >
        <BottleArt
          sku={sku}
          className={`mx-auto transition-transform duration-500 group-hover:-translate-y-1 ${
            compact ? 'w-28 h-36' : 'w-40 h-52'
          }`}
        />
      </Link>

      <div className="flex flex-col flex-1 p-4 pt-3">
        <Link href={`/rosemary/product/${sku.slug}`} className="hover:text-leaf-700">
          <h3 className="font-semibold text-sprig-ink leading-snug">{sku.name}</h3>
        </Link>
        <p className="text-[13px] text-sprig-ink/55">{sku.size}</p>

        {!compact && (
          <p className="text-[13px] text-sprig-ink/70 mt-2 leading-relaxed line-clamp-2">
            {sku.tagline}
          </p>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-sprig-ink tabular-nums">{bhd(sku.priceBhd)}</span>
          {sku.compareAtBhd && (
            <span className="text-[13px] text-sprig-ink/40 line-through tabular-nums">
              {bhd(sku.compareAtBhd)}
            </span>
          )}
        </div>
        {perMl && (
          <p className="text-[11px] text-leaf-700/80 mt-0.5 tabular-nums">
            {perMl.toFixed(1)} fils per ml
          </p>
        )}

        <button
          onClick={() => add(sku.slug)}
          className="mt-4 w-full rounded-full bg-leaf-600 hover:bg-leaf-700 active:scale-[0.99] text-white h-11 text-sm font-medium transition-all"
        >
          Add to basket
        </button>
      </div>
    </article>
  );
}
