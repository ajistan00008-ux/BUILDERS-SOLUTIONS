"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { bhd, useCart } from './CartProvider';
import { BottleArt } from './BottleArt';
import { OPS, bySlug } from '../../content/rosemary';

/**
 * No payment processor is wired up yet. Until a gateway (BenefitPay / Credimax)
 * is live, checkout hands the completed order to WhatsApp — which is how most
 * Bahraini direct-to-consumer stores take their first thousand orders anyway.
 * Swap `handoff` for a POST to /api/orders when the gateway lands.
 */
const WHATSAPP_NUMBER = '97300000000';

const GOVERNORATES = ['Capital', 'Muharraq', 'Northern', 'Southern'];

const PAYMENTS = [
  { id: 'cod', label: 'Cash on delivery', hint: 'Pay the driver in BHD' },
  { id: 'benefit', label: 'BenefitPay', hint: 'Bahrain’s national wallet' },
  { id: 'card', label: 'Card at the door', hint: 'Debit or credit, contactless' },
];

export function CheckoutForm() {
  const { lines, subtotal, delivery, total, vatIncluded, count, freeDeliveryGap, clear } = useCart();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    governorate: 'Capital',
    block: '',
    road: '',
    building: '',
    notes: '',
    payment: 'cod',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const phoneOk = /^[0-9]{8}$/.test(form.phone.replace(/\s/g, ''));
  const ready =
    count > 0 && form.name.trim().length > 1 && phoneOk && form.block.trim() && form.building.trim();

  const message = useMemo(() => {
    const items = lines
      .map((l) => {
        const sku = bySlug(l.slug);
        return sku ? `• ${l.qty} × ${sku.name} ${sku.size} — ${bhd(sku.priceBhd * l.qty)}` : '';
      })
      .filter(Boolean)
      .join('\n');
    const pay = PAYMENTS.find((p) => p.id === form.payment)?.label ?? 'Cash on delivery';
    return [
      'New order — ROSEMARY.BH',
      '',
      items,
      '',
      `Subtotal: ${bhd(subtotal)}`,
      `Delivery: ${delivery === 0 ? 'Free' : bhd(delivery)}`,
      `Total: ${bhd(total)} (incl. VAT ${bhd(vatIncluded)})`,
      '',
      `Name: ${form.name}`,
      `Phone: +973 ${form.phone}`,
      `Address: Building ${form.building}, Road ${form.road}, Block ${form.block}, ${form.governorate} Governorate`,
      form.notes ? `Notes: ${form.notes}` : '',
      `Payment: ${pay}`,
    ]
      .filter((l) => l !== '')
      .join('\n');
  }, [lines, subtotal, delivery, total, vatIncluded, form]);

  const handoff = () => {
    if (!ready) return;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSent(true);
    clear();
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-leaf-200 bg-leaf-50 px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-sprig-ink">Order sent</h2>
        <p className="mt-2 text-[15px] text-sprig-ink/65 max-w-md mx-auto">
          We have your order on WhatsApp. You will get a confirmation and a driver tracking link
          within the hour during working times.
        </p>
        <Link
          href="/rosemary"
          className="mt-6 inline-flex items-center rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 px-7 font-medium"
        >
          Back to the shop
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="rounded-2xl border border-sprig-stone bg-white px-6 py-12 text-center">
        <h2 className="text-xl font-semibold text-sprig-ink">Your basket is empty</h2>
        <p className="mt-2 text-[14px] text-sprig-ink/60">
          The 100 ml spray is BHD 1.950 and two bottles ship free.
        </p>
        <Link
          href="/rosemary#shelf"
          className="mt-6 inline-flex items-center rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 px-7 font-medium"
        >
          Go to the shelf
        </Link>
      </div>
    );
  }

  const field =
    'w-full h-12 rounded-xl border border-sprig-stone bg-white px-4 text-[15px] text-sprig-ink placeholder:text-sprig-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition';
  const labelCls = 'block text-[13px] font-medium text-sprig-ink/70 mb-1.5';

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
      <form
        className="rounded-2xl border border-sprig-stone bg-white p-5 sm:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          handoff();
        }}
      >
        <h2 className="font-semibold text-sprig-ink mb-5">Where is it going?</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="name">
              Full name
            </label>
            <input id="name" className={field} value={form.name} onChange={set('name')} placeholder="Fatima Ahmed" required />
          </div>

          <div>
            <label className={labelCls} htmlFor="phone">
              Mobile
            </label>
            <div className="flex">
              <span className="h-12 px-3 inline-flex items-center rounded-l-xl border border-r-0 border-sprig-stone bg-sprig-stone/30 text-[15px] text-sprig-ink/60">
                +973
              </span>
              <input
                id="phone"
                className={`${field} rounded-l-none`}
                value={form.phone}
                onChange={set('phone')}
                placeholder="3300 0000"
                inputMode="numeric"
                required
              />
            </div>
            {form.phone && !phoneOk && (
              <p className="text-[12px] text-sprig-clay mt-1">Bahrain mobiles are 8 digits.</p>
            )}
          </div>

          <div>
            <label className={labelCls} htmlFor="gov">
              Governorate
            </label>
            <select id="gov" className={field} value={form.governorate} onChange={set('governorate')}>
              {GOVERNORATES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="block">
              Block
            </label>
            <input id="block" className={field} value={form.block} onChange={set('block')} placeholder="316" required />
          </div>
          <div>
            <label className={labelCls} htmlFor="road">
              Road
            </label>
            <input id="road" className={field} value={form.road} onChange={set('road')} placeholder="1705" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="building">
              Building / flat
            </label>
            <input id="building" className={field} value={form.building} onChange={set('building')} placeholder="Building 42, Flat 3" required />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="notes">
              Delivery notes <span className="font-normal text-sprig-ink/40">(optional)</span>
            </label>
            <textarea
              id="notes"
              className={`${field} h-24 py-3`}
              value={form.notes}
              onChange={set('notes')}
              placeholder="Leave with the watchman, call on arrival…"
            />
          </div>
        </div>

        <h2 className="font-semibold text-sprig-ink mt-8 mb-4">How would you like to pay?</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {PAYMENTS.map((p) => {
            const active = form.payment === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, payment: p.id }))}
                className={`text-left rounded-xl border p-4 transition ${
                  active
                    ? 'border-leaf-500 bg-leaf-50 ring-2 ring-leaf-500/20'
                    : 'border-sprig-stone hover:border-leaf-300'
                }`}
                aria-pressed={active}
              >
                <span className="block text-[14px] font-medium text-sprig-ink">{p.label}</span>
                <span className="block text-[12px] text-sprig-ink/50 mt-0.5">{p.hint}</span>
              </button>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={!ready}
          className="mt-7 w-full rounded-full bg-leaf-600 hover:bg-leaf-700 disabled:bg-sprig-stone disabled:text-sprig-ink/40 text-white h-12 font-medium transition-colors"
        >
          Place order · {bhd(total)}
        </button>
        <p className="text-[12px] text-sprig-ink/45 mt-3 text-center">
          Your order opens in WhatsApp so we can confirm stock and a delivery slot with you before
          any money changes hands.
        </p>
      </form>

      <aside className="rounded-2xl border border-sprig-stone bg-white p-5 lg:sticky lg:top-24">
        <h2 className="font-semibold text-sprig-ink mb-4">Order summary</h2>
        <ul className="space-y-3 mb-4">
          {lines.map((l) => {
            const sku = bySlug(l.slug);
            if (!sku) return null;
            return (
              <li key={l.slug} className="flex gap-3 items-center">
                <div className="w-12 h-14 rounded-lg bg-leaf-50 border border-sprig-stone flex items-center justify-center shrink-0">
                  <BottleArt sku={sku} className="w-9 h-12" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-sprig-ink leading-snug">{sku.name}</p>
                  <p className="text-[12px] text-sprig-ink/50">
                    {sku.size} × {l.qty}
                  </p>
                </div>
                <p className="text-[13px] font-semibold tabular-nums">{bhd(sku.priceBhd * l.qty)}</p>
              </li>
            );
          })}
        </ul>

        {freeDeliveryGap > 0 && (
          <p className="text-[12px] text-leaf-700 bg-leaf-50 rounded-lg px-3 py-2 mb-3">
            {bhd(freeDeliveryGap)} more and delivery is free (over{' '}
            {bhd(OPS.freeDeliveryOverBhd)}).
          </p>
        )}

        <dl className="text-[14px] space-y-1.5 text-sprig-ink/70 border-t border-sprig-stone pt-3">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{bhd(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Delivery</dt>
            <dd className="tabular-nums">{delivery === 0 ? 'Free' : bhd(delivery)}</dd>
          </div>
          <div className="flex justify-between font-semibold text-sprig-ink text-base pt-2 border-t border-sprig-stone">
            <dt>Total</dt>
            <dd className="tabular-nums">{bhd(total)}</dd>
          </div>
          <div className="flex justify-between text-[11px] text-sprig-ink/45">
            <dt>of which VAT (10%)</dt>
            <dd className="tabular-nums">{bhd(vatIncluded)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
