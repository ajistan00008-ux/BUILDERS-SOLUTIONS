"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bhd, useCart } from './CartProvider';
import { ProductArt } from './ProductArt';
import { CATEGORIES, OPS, productBySlug } from '../../content/daily';

// Customer-facing only. /daily/plan is internal (supplier, costs, margins) and
// is deliberately not linked from anywhere public — it is reachable by URL and
// gated behind Basic auth in middleware.ts.
const NAV = [
  { href: '/daily', label: 'Shop' },
  { href: '/daily/for/women', label: 'For her' },
  { href: '/daily/for/men', label: 'For him' },
  { href: '/daily/partners', label: 'For brands' },
];

function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 6.5 C 14.6 9 14.6 15 12 17.5 C 9.4 15 9.4 9 12 6.5 Z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function StoreHeader() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <div className="bg-leaf-900 text-leaf-50 text-[12px] md:text-[13px] tracking-wide">
        <div className="max-w-6xl mx-auto px-5 py-2 flex items-center justify-center gap-2 text-center">
          <Mark className="w-3.5 h-3.5 opacity-70 shrink-0" />
          <span>
            Everyday essentials, all under BHD 5 · free delivery over{' '}
            <strong className="font-semibold">{bhd(OPS.freeDeliveryOverBhd)}</strong> · same-day in
            Manama
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-sprig-paper/90 backdrop-blur border-b border-sprig-stone">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <Link href="/daily" className="flex items-center gap-2 shrink-0">
            <span className="w-9 h-9 rounded-full bg-leaf-600 text-leaf-50 flex items-center justify-center">
              <Mark className="w-5 h-5" />
            </span>
            <span className="leading-none">
              <span className="block font-semibold tracking-tight text-sprig-ink text-[17px]">
                DAILY<span className="text-leaf-600">.BH</span>
              </span>
              <span className="block text-[10px] tracking-[0.18em] text-leaf-700/70 uppercase mt-0.5">
                Manama · Bahrain
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-[14px] text-sprig-ink/75">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-leaf-600 transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-full bg-leaf-600 hover:bg-leaf-700 text-white px-4 h-10 text-sm font-medium transition-colors"
              aria-label={`Open basket, ${count} item${count === 1 ? '' : 's'}`}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
                <path d="M6 7h12l-1 13H7L6 7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Basket</span>
              {count > 0 && (
                <span className="min-w-[20px] h-5 px-1 rounded-full bg-white text-leaf-700 text-[11px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              className="md:hidden w-10 h-10 rounded-full border border-sprig-stone flex items-center justify-center text-sprig-ink"
              onClick={() => setMenu((m) => !m)}
              aria-label="Menu"
              aria-expanded={menu}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category strip — the real navigation for a 37-SKU shelf. */}
        <div className="hidden md:block border-t border-sprig-stone/70">
          <div className="max-w-6xl mx-auto px-5 h-11 flex items-center gap-7 text-[13px] text-sprig-ink/65">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/daily/c/${c.slug}`}
                className={`hover:text-leaf-700 transition-colors ${
                  pathname === `/daily/c/${c.slug}` ? 'text-leaf-700 font-medium' : ''
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {menu && (
          <nav className="md:hidden border-t border-sprig-stone bg-sprig-paper px-5 py-3 flex flex-col gap-3 text-[15px]">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-sprig-ink/80">
                {n.label}
              </Link>
            ))}
            <span className="h-px bg-sprig-stone my-1" />
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/daily/c/${c.slug}`} className="text-sprig-ink/65 text-[14px]">
                {c.name}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

export function CartDrawer() {
  const { lines, open, setOpen, subtotal, delivery, total, vatIncluded, freeDeliveryGap, setQty, remove, count } =
    useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-sprig-ink/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className="relative w-full max-w-[420px] h-full bg-sprig-paper flex flex-col shadow-2xl"
        role="dialog"
        aria-label="Basket"
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-sprig-stone shrink-0">
          <h2 className="font-semibold text-sprig-ink">Your basket ({count})</h2>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-sprig-stone/60 flex items-center justify-center"
            aria-label="Close basket"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <Mark className="w-10 h-10 text-leaf-300" />
            <p className="text-sprig-ink/60 text-sm">
              Nothing here yet. The sampler box is BHD&nbsp;4.950 if you want to start somewhere.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-leaf-600 hover:bg-leaf-700 text-white px-5 h-11 text-sm font-medium"
            >
              Browse the shelf
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {lines.map((l) => {
                const sku = productBySlug(l.slug);
                if (!sku) return null;
                return (
                  <div key={l.slug} className="flex gap-3 items-start">
                    <div className="w-16 h-20 rounded-lg bg-leaf-50 border border-sprig-stone flex items-center justify-center shrink-0">
                      <ProductArt product={sku} className="w-12 h-16" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-sprig-ink leading-snug">{sku.name}</p>
                      <p className="text-xs text-sprig-ink/55">{sku.size}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-flex items-center rounded-full border border-sprig-stone">
                          <button
                            className="w-8 h-8 text-sprig-ink/70 hover:text-leaf-700"
                            onClick={() => setQty(l.slug, l.qty - 1)}
                            aria-label={`Reduce ${sku.name}`}
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm tabular-nums">{l.qty}</span>
                          <button
                            className="w-8 h-8 text-sprig-ink/70 hover:text-leaf-700"
                            onClick={() => setQty(l.slug, l.qty + 1)}
                            aria-label={`Add another ${sku.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-xs text-sprig-ink/45 hover:text-sprig-clay"
                          onClick={() => remove(l.slug)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold tabular-nums text-sprig-ink">
                      {bhd(sku.priceBhd * l.qty)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-sprig-stone px-5 py-4 shrink-0 bg-white/60">
              {freeDeliveryGap > 0 && (
                <p className="text-[13px] text-leaf-700 bg-leaf-50 rounded-lg px-3 py-2 mb-3">
                  Add {bhd(freeDeliveryGap)} more for free delivery.
                </p>
              )}
              <dl className="text-sm space-y-1.5 text-sprig-ink/75">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{bhd(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Delivery</dt>
                  <dd className="tabular-nums">{delivery === 0 ? 'Free' : bhd(delivery)}</dd>
                </div>
                <div className="flex justify-between font-semibold text-sprig-ink text-base pt-1.5 border-t border-sprig-stone">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{bhd(total)}</dd>
                </div>
                <div className="flex justify-between text-[11px] text-sprig-ink/45">
                  <dt>includes VAT at 10%</dt>
                  <dd className="tabular-nums">{bhd(vatIncluded)}</dd>
                </div>
              </dl>
              <Link
                href="/daily/checkout"
                onClick={() => setOpen(false)}
                className="mt-4 w-full rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 flex items-center justify-center font-medium transition-colors"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function StoreFooter() {
  return (
    <footer className="bg-leaf-950 text-leaf-100/80 mt-24">
      <div className="max-w-6xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-leaf-600 text-white flex items-center justify-center">
              <Mark className="w-4 h-4" />
            </span>
            <span className="font-semibold text-white text-lg">
              DAILY<span className="text-leaf-400">.BH</span>
            </span>
          </div>
          <p className="text-sm max-w-md leading-relaxed">
            Everyday beauty essentials for men and women, stocked in Manama and delivered across
            Bahrain. We import by the case and hold most of the shelf on consignment, which is the
            whole reason nothing here costs more than BHD&nbsp;5.
          </p>
          <p className="text-xs mt-4 text-leaf-100/45 leading-relaxed">
            Cosmetic products. Not medicines. Patch-test anything new, keep it away from eyes, and
            see a doctor rather than a shop for a diagnosed skin condition. Products supplied to us
            free for testing are labelled as such on their page.
          </p>
        </div>
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/daily/c/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">More</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/daily/for/women" className="hover:text-white">For her</Link></li>
            <li><Link href="/daily/for/men" className="hover:text-white">For him</Link></li>
            <li><Link href="/daily/partners" className="hover:text-white">Brand partners</Link></li>
            <li><Link href="/daily#faq" className="hover:text-white">FAQ</Link></li>
            <li><a href="https://wa.me/97300000000" className="hover:text-white">WhatsApp us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-5 text-xs flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-leaf-100/50">
          <p>© {new Date().getFullYear()} DAILY.BH — a Builders Solutions group venture.</p>
          <p>Prices in Bahraini Dinar, inclusive of 10% VAT. CR and VAT number on invoice.</p>
        </div>
      </div>
    </footer>
  );
}
