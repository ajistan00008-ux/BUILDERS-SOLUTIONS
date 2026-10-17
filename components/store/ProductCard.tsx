"use client";

import React from 'react';
import Link from 'next/link';
import { ProductArt } from './ProductArt';
import { bhd, useCart } from './CartProvider';
import { brandBySlug, type Product } from '../../content/daily';

const STATUS: Record<Product['partnerStatus'], { label: string; cls: string } | null> = {
  stocked: null,
  sampling: { label: 'In testing', cls: 'bg-amber-100 text-amber-800' },
  incoming: { label: 'Arriving soon', cls: 'bg-sprig-stone text-sprig-ink/60' },
};

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart();
  const brand = brandBySlug(product.brand);
  const status = STATUS[product.partnerStatus];
  const buyable = product.partnerStatus === 'stocked';

  return (
    <article className="group relative flex flex-col rounded-2xl border border-sprig-stone bg-white overflow-hidden hover:border-leaf-300 hover:shadow-[0_12px_40px_-24px_rgba(18,24,15,0.4)] transition-all">
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-leaf-600 text-white text-[11px] font-semibold px-2.5 py-1">
          {product.badge}
        </span>
      )}
      {status && (
        <span
          className={`absolute top-3 right-3 z-10 rounded-full text-[11px] font-semibold px-2.5 py-1 ${status.cls}`}
        >
          {status.label}
        </span>
      )}

      <Link
        href={`/daily/product/${product.slug}`}
        className="block bg-gradient-to-b from-leaf-50 to-white pt-6 pb-2"
        aria-label={`${product.name} ${product.size}`}
      >
        <ProductArt
          product={product}
          className={`mx-auto transition-transform duration-500 group-hover:-translate-y-1 ${
            compact ? 'w-28 h-36' : 'w-36 h-48'
          }`}
        />
      </Link>

      <div className="flex flex-col flex-1 p-4 pt-3">
        {brand && (
          <p className="text-[11px] tracking-[0.12em] uppercase text-leaf-700/70 font-medium mb-1">
            {brand.name}
          </p>
        )}
        <Link href={`/daily/product/${product.slug}`} className="hover:text-leaf-700">
          <h3 className="font-semibold text-sprig-ink leading-snug text-[15px]">{product.name}</h3>
        </Link>
        <p className="text-[13px] text-sprig-ink/55">{product.size}</p>

        {!compact && (
          <p className="text-[13px] text-sprig-ink/70 mt-2 leading-relaxed line-clamp-2">
            {product.tagline}
          </p>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-sprig-ink tabular-nums">{bhd(product.priceBhd)}</span>
          {product.compareAtBhd && (
            <span className="text-[13px] text-sprig-ink/40 line-through tabular-nums">
              {bhd(product.compareAtBhd)}
            </span>
          )}
        </div>

        {buyable ? (
          <button
            onClick={() => add(product.slug)}
            className="mt-4 w-full rounded-full bg-leaf-600 hover:bg-leaf-700 active:scale-[0.99] text-white h-11 text-sm font-medium transition-all"
          >
            Add to basket
          </button>
        ) : (
          <div className="mt-4">
            <span className="w-full rounded-full border border-sprig-stone text-sprig-ink/45 h-11 text-sm font-medium flex items-center justify-center cursor-default">
              {product.partnerStatus === 'sampling' ? 'Being tested' : 'Not in yet'}
            </span>
            <p className="text-[11px] text-sprig-ink/40 mt-1.5 text-center">
              Not on sale until it passes testing
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
