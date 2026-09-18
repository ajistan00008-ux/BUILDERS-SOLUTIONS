"use client";

import React, { useState } from 'react';
import { BENCHMARKS, FAQ, type Benchmark } from '../../content/rosemary';

/** Horizontal bars make the gap between our price and the Gulf shelf obvious. */
export function PriceCompare() {
  const max = Math.max(...BENCHMARKS.map((b) => b.bhd));
  const sorted = [...BENCHMARKS].sort((a, b) => b.bhd - a.bhd);

  return (
    <div className="rounded-2xl border border-sprig-stone bg-white overflow-hidden">
      <div className="px-5 sm:px-7 py-5 border-b border-sprig-stone">
        <h3 className="font-semibold text-sprig-ink">
          What a rosemary water spray costs a shopper in this region today
        </h3>
        <p className="text-[13px] text-sprig-ink/55 mt-1">
          Listed shelf prices, September 2026, converted to BHD at mid-market rates. Sizes differ —
          the point is the order of magnitude, not a like-for-like millilitre comparison.
        </p>
      </div>
      <ul className="divide-y divide-sprig-stone">
        {sorted.map((b: Benchmark) => {
          const ours = b.seller === 'ROSEMARY.BH';
          return (
            <li key={b.seller + b.size} className="px-5 sm:px-7 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className={`text-sm font-medium ${ours ? 'text-leaf-700' : 'text-sprig-ink'}`}>
                  {b.seller}
                  <span className="text-sprig-ink/45 font-normal"> · {b.where}</span>
                </p>
                <p className={`text-sm font-semibold tabular-nums ${ours ? 'text-leaf-700' : 'text-sprig-ink'}`}>
                  BHD {b.bhd.toFixed(3)}
                  <span className="text-sprig-ink/40 font-normal"> ({b.listed})</span>
                </p>
              </div>
              <div className="mt-2 h-2 rounded-full bg-sprig-stone/70 overflow-hidden">
                <div
                  className={`h-full rounded-full ${ours ? 'bg-leaf-600' : 'bg-sprig-ink/25'}`}
                  style={{ width: `${Math.max(2, (b.bhd / max) * 100)}%` }}
                />
              </div>
              <p className="text-[12px] text-sprig-ink/50 mt-1.5">
                {b.product} · {b.size} — {b.note}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="rounded-2xl border border-sprig-stone bg-white divide-y divide-sprig-stone overflow-hidden">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              className="w-full text-left px-5 sm:px-7 py-4 flex items-start justify-between gap-4 hover:bg-leaf-50/60 transition-colors"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-sprig-ink text-[15px]">{item.q}</span>
              <span
                className={`shrink-0 mt-0.5 w-6 h-6 rounded-full border border-sprig-stone flex items-center justify-center text-leaf-700 transition-transform ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="px-5 sm:px-7 pb-5 -mt-1 text-[14px] leading-relaxed text-sprig-ink/70 max-w-2xl">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
