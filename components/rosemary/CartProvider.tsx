"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { OPS, TAX, bySlug } from '../../content/rosemary';

const STORAGE_KEY = 'rosemary-bh-cart';

export interface CartLine {
  slug: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  /** VAT-inclusive value of the goods. */
  subtotal: number;
  delivery: number;
  total: number;
  /** The 10% VAT already contained in `total`. */
  vatIncluded: number;
  freeDeliveryGap: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  /** Bumped every time something is added — drives the "added" pulse. */
  lastAdded: string | null;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(parsed.filter((l) => l && typeof l.slug === 'string' && bySlug(l.slug)));
        }
      }
    } catch {
      /* private mode, cleared storage — an empty cart is a fine fallback */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* nothing to do — the cart still works for this session */
    }
  }, [lines, hydrated]);

  const add = useCallback((slug: string, qty = 1) => {
    if (!bySlug(slug)) return;
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, 99) } : l));
      }
      return [...prev, { slug, qty }];
    });
    setLastAdded(slug);
    setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 99) } : l))
    );
  }, []);

  const remove = useCallback(
    (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
    []
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => {
      const sku = bySlug(l.slug);
      return sku ? sum + sku.priceBhd * l.qty : sum;
    }, 0);
    const delivery =
      count === 0 || subtotal >= OPS.freeDeliveryOverBhd ? 0 : OPS.deliveryFeeBhd;
    const total = subtotal + delivery;
    return {
      lines,
      count,
      subtotal,
      delivery,
      total,
      vatIncluded: total - total / (1 + TAX.vat),
      freeDeliveryGap: Math.max(0, OPS.freeDeliveryOverBhd - subtotal),
      add,
      setQty,
      remove,
      clear,
      open,
      setOpen,
      lastAdded,
    };
  }, [lines, add, setQty, remove, clear, open, lastAdded]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

/** BHD is quoted to three decimals (fils). */
export const bhd = (n: number) => `BHD ${n.toFixed(3)}`;
