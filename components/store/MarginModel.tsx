"use client";

import React, { useMemo, useState } from 'react';
import {
  CATEGORIES,
  FULFILMENT_MODELS,
  OPS,
  PRODUCTS,
  TAX,
  blendedGrossMargin,
  marginFor,
  orderContribution,
  type FulfilmentModel,
} from '../../content/daily';

const f3 = (n: number) => n.toFixed(3);
const pct = (n: number) => `${n.toFixed(1)}%`;

/** Side-by-side of the three ways this business can actually be run. */
export function ModelComparison() {
  const tone: Record<FulfilmentModel['verdict'], string> = {
    no: 'border-sprig-clay/40 bg-sprig-clay/5',
    yes: 'border-leaf-400 bg-leaf-50',
    later: 'border-sprig-stone bg-white',
  };
  const label: Record<FulfilmentModel['verdict'], string> = {
    no: 'Does not work here',
    yes: 'Build on this',
    later: 'Later, per SKU',
  };
  const labelTone: Record<FulfilmentModel['verdict'], string> = {
    no: 'bg-sprig-clay text-white',
    yes: 'bg-leaf-600 text-white',
    later: 'bg-sprig-stone text-sprig-ink/70',
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4 not-prose">
      {FULFILMENT_MODELS.map((m) => (
        <article key={m.id} className={`rounded-2xl border p-5 flex flex-col ${tone[m.verdict]}`}>
          <span
            className={`self-start rounded-full px-2.5 py-1 text-[11px] font-semibold mb-3 ${labelTone[m.verdict]}`}
          >
            {label[m.verdict]}
          </span>
          <h3 className="font-semibold text-sprig-ink text-[17px]">{m.name}</h3>
          <p className="text-[13px] text-sprig-ink/70 mt-1.5 leading-relaxed">{m.how}</p>

          <dl className="mt-4 space-y-2 text-[12.5px]">
            {[
              ['Capital', m.capital],
              ['Speed to customer', m.speed],
              ['Margin', m.marginNote],
              ['Logistics per order', `BHD ${f3(m.perOrderLogisticsBhd)}`],
              ['NHRA', m.nhra],
            ].map(([k, v]) => (
              <div key={k as string}>
                <dt className="text-sprig-ink/45">{k as string}</dt>
                <dd className="text-sprig-ink/80">{v as string}</dd>
              </div>
            ))}
          </dl>

          <p className="text-[13px] leading-relaxed text-sprig-ink/70 mt-4 pt-4 border-t border-sprig-stone/70">
            {m.verdictNote}
          </p>
        </article>
      ))}
    </div>
  );
}

/**
 * Interactive version of the unit economics in content/daily.ts.
 * The levers are the three real negotiations: what the brand charges us on
 * consignment, what the last mile costs, and how big the basket is.
 */
export function MarginModel() {
  const [costShift, setCostShift] = useState(0); // % change to every consignment cost
  const [aov, setAov] = useState(OPS.targetAovBhd);
  const [lastMile, setLastMile] = useState(OPS.lastMileBhd);
  const [category, setCategory] = useState<string>('all');

  const rows = useMemo(() => {
    const scaled = PRODUCTS.filter((p) => !p.bundleOf).map((p) => ({
      ...p,
      costBhd: p.costBhd * (1 + costShift / 100),
    }));
    const shown = category === 'all' ? scaled : scaled.filter((p) => p.category === category);
    return shown.map((p) => ({ sku: p, m: marginFor(p) }));
  }, [costShift, category]);

  const blended = useMemo(
    () =>
      blendedGrossMargin(
        PRODUCTS.filter((p) => !p.bundleOf).map((p) => ({
          ...p,
          costBhd: p.costBhd * (1 + costShift / 100),
        }))
      ),
    [costShift]
  );

  const order = useMemo(
    () => orderContribution(aov, lastMile, blended),
    [aov, lastMile, blended]
  );

  const slider =
    'w-full accent-leaf-600 h-1.5 rounded-full appearance-none bg-sprig-stone cursor-pointer';

  return (
    <div className="space-y-6">
      {/* levers */}
      <div className="rounded-2xl border border-sprig-stone bg-white p-5 sm:p-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-[13px] font-medium text-sprig-ink/75" htmlFor="costshift">
              Consignment price vs. plan
            </label>
            <span className="text-sm font-semibold tabular-nums text-leaf-700">
              {costShift > 0 ? '+' : ''}
              {costShift}%
            </span>
          </div>
          <input
            id="costshift"
            type="range"
            min={-25}
            max={40}
            value={costShift}
            onChange={(e) => setCostShift(Number(e.target.value))}
            className={slider}
          />
          <p className="text-[12px] text-sprig-ink/50 mt-2 leading-relaxed">
            What every brand charges us per unit, against the costs modelled in the catalogue. This
            is the negotiation that decides the business. Push it past +30% and most of the shelf
            stops clearing a sensible margin.
          </p>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-[13px] font-medium text-sprig-ink/75" htmlFor="lastmile">
              Last-mile cost per order
            </label>
            <span className="text-sm font-semibold tabular-nums text-leaf-700">
              BHD {f3(lastMile)}
            </span>
          </div>
          <input
            id="lastmile"
            type="range"
            min={0.3}
            max={2}
            step={0.05}
            value={lastMile}
            onChange={(e) => setLastMile(Number(e.target.value))}
            className={slider}
          />
          <p className="text-[12px] text-sprig-ink/50 mt-2 leading-relaxed">
            BHD {f3(OPS.lastMileBhd)} on a local 3PL contract, around BHD {f3(OPS.ownDriverBhd)}{' '}
            once an own driver runs 25+ batched drops a day.
          </p>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-[13px] font-medium text-sprig-ink/75" htmlFor="aov">
              Basket value (goods, before delivery)
            </label>
            <span className="text-sm font-semibold tabular-nums text-leaf-700">BHD {f3(aov)}</span>
          </div>
          <input
            id="aov"
            type="range"
            min={1}
            max={25}
            step={0.25}
            value={aov}
            onChange={(e) => setAov(Number(e.target.value))}
            className={slider}
          />
          <p className="text-[12px] text-sprig-ink/50 mt-2 leading-relaxed">
            Below BHD {f3(OPS.freeDeliveryOverBhd)} the customer pays BHD {f3(OPS.deliveryFeeBhd)}{' '}
            towards delivery; above it the whole last mile is ours. A multi-category shelf is what
            lifts this — a single BHD 2 bottle never pays for a van.
          </p>
        </div>

        <div>
          <span className="block text-[13px] font-medium text-sprig-ink/75 mb-2">
            Filter the table
          </span>
          <div className="flex flex-wrap gap-2">
            {[{ slug: 'all', name: 'All' }, ...CATEGORIES].map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                className={`rounded-full border px-3 h-9 text-[13px] transition ${
                  category === c.slug
                    ? 'border-leaf-500 bg-leaf-50 text-leaf-800'
                    : 'border-sprig-stone text-sprig-ink/65 hover:border-leaf-300'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-sprig-ink/50 mt-3 leading-relaxed">
            Blended gross margin across the catalogue:{' '}
            <strong className="text-leaf-700">{pct(blended * 100)}</strong>
          </p>
        </div>
      </div>

      {/* per-SKU */}
      <div className="rounded-2xl border border-sprig-stone bg-white overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-sprig-stone">
          <h3 className="font-semibold text-sprig-ink">Margin by SKU</h3>
          <p className="text-[12px] text-sprig-ink/50 mt-1">
            All figures BHD per unit. Cost is the consignment price landed into the Manama 3PL;
            duty ({(TAX.customsDuty * 100).toFixed(0)}%) and clearing are already inside it. Net
            revenue is the shelf price with {(TAX.vat * 100).toFixed(0)}% VAT stripped out.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[700px]">
            <thead className="bg-leaf-50 text-sprig-ink/70">
              <tr>
                {['Product', 'Category', 'Cost', 'Shelf', 'Net rev.', 'Gross profit', 'GM%'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-3 py-2.5 font-medium whitespace-nowrap ${i < 2 ? 'text-left' : 'text-right'}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sprig-stone">
              {rows.map(({ sku, m }) => {
                const thin = m.grossMarginPct < 45;
                return (
                  <tr key={sku.slug} className={thin ? 'bg-sprig-clay/5' : ''}>
                    <td className="px-3 py-2.5 text-left whitespace-nowrap">
                      <span className="font-medium text-sprig-ink">{sku.name}</span>
                      <span className="text-sprig-ink/45"> {sku.size}</span>
                    </td>
                    <td className="px-3 py-2.5 text-left text-sprig-ink/50 capitalize">{sku.category}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{f3(m.cost)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{f3(sku.priceBhd)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-sprig-ink/55">
                      {f3(m.netRevenue)}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right tabular-nums font-medium ${
                        m.grossProfit < 0 ? 'text-sprig-clay' : 'text-leaf-700'
                      }`}
                    >
                      {f3(m.grossProfit)}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right tabular-nums font-semibold ${
                        thin ? 'text-sprig-clay' : 'text-leaf-700'
                      }`}
                    >
                      {pct(m.grossMarginPct)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* order level */}
      <div className="rounded-2xl border border-sprig-stone bg-white p-5 sm:p-6">
        <h3 className="font-semibold text-sprig-ink mb-1">What survives at order level</h3>
        <p className="text-[12px] text-sprig-ink/50 mb-5">
          Gross margin is not the business. Delivery, packing, the gateway and breakage all land on
          the order, not the bottle — which is why a multi-category shelf beats a single hero
          product. Cost of goods here is the basket at the blended {pct(blended * 100)} margin.
        </p>
        <dl className="space-y-2 text-[14px] max-w-lg">
          {[
            ['Net revenue on goods (ex-VAT)', order.net, false],
            ['Cost of goods', -order.cogs, true],
            [
              order.feeCharged > 0
                ? `Last-mile, net of the BHD ${f3(order.feeCharged)} the customer pays`
                : 'Last-mile delivery (free to the customer)',
              -order.delivery,
              true,
            ],
            ['Pick, pack, mailer', -order.fulfilment, true],
            ['Payment fees', -order.payments, true],
            ['Breakage & returns reserve', -order.shrink, true],
          ].map(([label, v, neg]) => (
            <div key={label as string} className="flex justify-between gap-4">
              <dt className="text-sprig-ink/70">{label as string}</dt>
              <dd className={`tabular-nums ${neg ? 'text-sprig-ink/55' : 'text-sprig-ink'}`}>
                {(v as number) < 0 ? '−' : ''}BHD {f3(Math.abs(v as number))}
              </dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 border-t border-sprig-stone pt-2.5 font-semibold">
            <dt className="text-sprig-ink">Contribution per order</dt>
            <dd className={`tabular-nums ${order.contribution < 0 ? 'text-sprig-clay' : 'text-leaf-700'}`}>
              BHD {f3(order.contribution)} ({pct(order.contributionPct)})
            </dd>
          </div>
          <div className="flex justify-between gap-4 text-[13px]">
            <dt className="text-sprig-ink/60">After acquisition at BHD {f3(OPS.targetCacBhd)}</dt>
            <dd className={`tabular-nums ${order.afterCac < 0 ? 'text-sprig-clay' : 'text-leaf-700'}`}>
              BHD {f3(order.afterCac)}
            </dd>
          </div>
        </dl>

        <p
          className={`mt-5 text-[13px] leading-relaxed rounded-xl px-4 py-3 ${
            order.afterCac < 0 ? 'bg-sprig-clay/10 text-sprig-clay' : 'bg-leaf-50 text-leaf-800'
          }`}
        >
          {order.afterCac < 0
            ? 'This basket loses money on a paid first order. It only works on repeat, where acquisition is zero — so either lift the basket or do not buy this customer.'
            : `Every paid first order clears acquisition with BHD ${f3(
                order.afterCac
              )} left over, and every repeat order returns the full BHD ${f3(order.contribution)}.`}
        </p>
      </div>
    </div>
  );
}
