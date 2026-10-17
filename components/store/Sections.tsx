"use client";

import React, { useState } from 'react';

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="rounded-2xl border border-sprig-stone bg-white divide-y divide-sprig-stone overflow-hidden">
      {items.map((item, i) => {
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

/**
 * Brand application form. No backend yet — it hands the enquiry to WhatsApp,
 * the same as checkout. Swap `handoff` for a POST to /api/partners when there
 * is somewhere to put it.
 */
const WHATSAPP_NUMBER = '97300000000';

const CATEGORY_OPTIONS = ['Hair & scalp', 'Skin', 'Body & bath', "Men's grooming", 'Fragrance', 'Something else'];

export function PartnerForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    brand: '',
    contact: '',
    email: '',
    country: '',
    category: CATEGORY_OPTIONS[0],
    skus: '',
    notes: '',
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const ready =
    form.brand.trim().length > 1 && form.contact.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email);

  const handoff = () => {
    if (!ready) return;
    const message = [
      'Brand partner enquiry — DAILY.BH',
      '',
      `Brand: ${form.brand}`,
      `Contact: ${form.contact}`,
      `Email: ${form.email}`,
      form.country ? `Based in: ${form.country}` : '',
      `Category: ${form.category}`,
      form.skus ? `SKUs to propose: ${form.skus}` : '',
      form.notes ? `Notes: ${form.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-leaf-200 bg-leaf-50 px-6 py-12 text-center">
        <h3 className="text-xl font-bold text-sprig-ink">Thanks — that reached us</h3>
        <p className="mt-2 text-[15px] text-sprig-ink/65 max-w-md mx-auto">
          We reply to every enquiry within three working days, including the ones we turn down. If
          it is a yes we will send the Manama address and the exact customs wording for the sample
          parcel.
        </p>
      </div>
    );
  }

  const field =
    'w-full h-12 rounded-xl border border-sprig-stone bg-white px-4 text-[15px] text-sprig-ink placeholder:text-sprig-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 transition';
  const labelCls = 'block text-[13px] font-medium text-sprig-ink/70 mb-1.5';

  return (
    <form
      className="rounded-2xl border border-sprig-stone bg-white p-5 sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        handoff();
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="brand">Brand name</label>
          <input id="brand" className={field} value={form.brand} onChange={set('brand')} required />
        </div>
        <div>
          <label className={labelCls} htmlFor="contact">Your name</label>
          <input id="contact" className={field} value={form.contact} onChange={set('contact')} required />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" type="email" className={field} value={form.email} onChange={set('email')} required />
        </div>
        <div>
          <label className={labelCls} htmlFor="country">Where you ship from</label>
          <input id="country" className={field} value={form.country} onChange={set('country')} placeholder="India, UAE, Türkiye…" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="category">Category</label>
          <select id="category" className={field} value={form.category} onChange={set('category')}>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="skus">
            Which SKUs would you propose? <span className="font-normal text-sprig-ink/40">(optional)</span>
          </label>
          <input id="skus" className={field} value={form.skus} onChange={set('skus')} placeholder="Two or three to start — not the whole line card" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="notes">
            Anything else <span className="font-normal text-sprig-ink/40">(optional)</span>
          </label>
          <textarea
            id="notes"
            className={`${field} h-28 py-3`}
            value={form.notes}
            onChange={set('notes')}
            placeholder="Consignment price range, existing GCC distribution, certifications you already hold…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="mt-6 w-full sm:w-auto rounded-full bg-leaf-600 hover:bg-leaf-700 disabled:bg-sprig-stone disabled:text-sprig-ink/40 text-white h-12 px-8 font-medium transition-colors"
      >
        Send enquiry
      </button>
      <p className="text-[12px] text-sprig-ink/45 mt-3">
        Opens in WhatsApp so we can reply quickly. No fee, no listing charge, and we answer the
        no&apos;s as well as the yes&apos;s.
      </p>
    </form>
  );
}
