"use client";

import React, { useState } from 'react';
import { useCart } from './CartProvider';

/** Quantity stepper + add button for the product detail page. */
export function AddToBasket({ slug }: { slug: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="inline-flex items-center rounded-full border border-sprig-stone h-12 bg-white">
        <button
          className="w-11 h-full text-lg text-sprig-ink/60 hover:text-leaf-700 disabled:opacity-30"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          aria-label="Reduce quantity"
        >
          −
        </button>
        <span className="w-8 text-center tabular-nums font-medium" aria-live="polite">
          {qty}
        </span>
        <button
          className="w-11 h-full text-lg text-sprig-ink/60 hover:text-leaf-700"
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={() => add(slug, qty)}
        className="flex-1 min-w-[180px] rounded-full bg-leaf-600 hover:bg-leaf-700 active:scale-[0.99] text-white h-12 px-8 font-medium transition-all"
      >
        Add to basket
      </button>
    </div>
  );
}
