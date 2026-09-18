"use client";

import React, { useMemo, useState } from 'react';
import {
  FX,
  OPS,
  SKUS,
  TAX,
  blendedGrossMargin,
  costFor,
  orderContribution,
  type Lane,
  type Sku,
} from '../../content/rosemary';

const f3 = (n: number) => n.toFixed(3);
const pct = (n: number) => `${n.toFixed(1)}%`;

/**
 * Interactive version of the landed-cost model in content/rosemary.ts.
 * Every lever here is a real negotiation: the discount off Indian MRP, the
 * freight lane, and the average basket. Move them and the margin moves.
 */
export function MarginModel() {
  const [lane, setLane] = useState<Lane>('sea');
  const [discount, setDiscount] = useState(50); // % off Indian MRP
  const [aov, setAov] = useState(OPS.targetAovBhd);
  const [lastMile, setLastMile] = useState(OPS.lastMileBhd);

  const rows = useMemo(
    () =>
      SKUS.filter((s) => !s.bundleOf).map((s) => {
        // Re-price FOB from the discount lever rather than the stored default.
        const scaled: Sku = { ...s, fobInr: Math.round(s.mrpInr * (1 - discount / 100)) };
        return { sku: scaled, cost: costFor(scaled, lane) };
      }),
    [lane, discount]
  );

  const order = useMemo(
    () => orderContribution(aov, lastMile, lane, discount),
    [aov, lastMile, lane, discount]
  );

  const slider =
    'w-full accent-leaf-600 h-1.5 rounded-full appearance-none bg-sprig-stone cursor-pointer';

  return (
    <div className="space-y-6">
      {/* levers */}
      <div className="rounded-2xl border border-sprig-stone bg-white p-5 sm:p-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-[13px] font-medium text-sprig-ink/75" htmlFor="discount">
              Discount off Indian MRP
            </label>
            <span className="text-sm font-semibold tabular-nums text-leaf-700">{discount}%</span>
          </div>
          <input
            id="discount"
            type="range"
            min={30}
            max={62}
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className={slider}
          />
          <p className="text-[12px] text-sprig-ink/50 mt-2 leading-relaxed">
            The number to win in the supply agreement. 40% is a normal Indian distributor rate; 50%
            is achievable at export volumes with prepayment; below 35% the BHD 1.950 price stops
            working on the air lane.
          </p>
        </div>

        <div>
          <span className="block text-[13px] font-medium text-sprig-ink/75 mb-2">Inbound lane</span>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ['sea', 'Sea LCL', '18–28 days'],
                ['air', 'Air consolidated', '4–7 days'],
              ] as const
            ).map(([id, label, note]) => (
              <button
                key={id}
                onClick={() => setLane(id)}
                className={`rounded-xl border p-3 text-left transition ${
                  lane === id
                    ? 'border-leaf-500 bg-leaf-50 ring-2 ring-leaf-500/20'
                    : 'border-sprig-stone hover:border-leaf-300'
                }`}
                aria-pressed={lane === id}
              >
                <span className="block text-[14px] font-medium text-sprig-ink">{label}</span>
                <span className="block text-[12px] text-sprig-ink/50">{note}</span>
              </button>
            ))}
          </div>
          <p className="text-[12px] text-sprig-ink/50 mt-2 leading-relaxed">
            Sea costs roughly 9 fils per 100&nbsp;ml bottle; air costs roughly 530 fils. That single
            choice is the difference between a 67% gross margin and a loss.
          </p>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-[13px] font-medium text-sprig-ink/75" htmlFor="aov">
              Basket value (goods, before delivery)
            </label>
            <span className="text-sm font-semibold tabular-nums text-leaf-700">
              BHD {f3(aov)}
            </span>
          </div>
          <input
            id="aov"
            type="range"
            min={1.95}
            max={12}
            step={0.05}
            value={aov}
            onChange={(e) => setAov(Number(e.target.value))}
            className={slider}
          />
          <p className="text-[12px] text-sprig-ink/50 mt-2 leading-relaxed">
            Below BHD {f3(OPS.freeDeliveryOverBhd)} the customer pays BHD{' '}
            {f3(OPS.deliveryFeeBhd)} towards delivery; above it, the whole last-mile cost is ours.
            Drag across the threshold and watch the cliff.
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
            BHD {f3(OPS.lastMileBhd)} on a local 3PL contract, around BHD{' '}
            {f3(OPS.ownDriverBhd)} once an own driver is running 25+ batched drops a day. On a
            BHD 1.950 order this line is bigger than the cost of the product.
          </p>
        </div>
      </div>

      {/* per-SKU landed cost */}
      <div className="rounded-2xl border border-sprig-stone bg-white overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-sprig-stone">
          <h3 className="font-semibold text-sprig-ink">Landed cost and gross margin by SKU</h3>
          <p className="text-[12px] text-sprig-ink/50 mt-1">
            All figures BHD per unit. FX {FX.bhdToInr} INR/BHD · duty{' '}
            {(TAX.customsDuty * 100).toFixed(0)}% on CIF · VAT {(TAX.vat * 100).toFixed(0)}%
            stripped from the shelf price and reclaimed at import.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[860px]">
            <thead className="bg-leaf-50 text-sprig-ink/70">
              <tr>
                {['SKU', 'MRP ₹', 'FOB', 'Freight', 'CIF', 'Duty', 'Landed', 'Shelf', 'Net rev.', 'Gross profit', 'GM%'].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`px-3 py-2.5 font-medium whitespace-nowrap ${
                        i === 0 ? 'text-left' : 'text-right'
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-sprig-stone">
              {rows.map(({ sku, cost }) => {
                const thin = cost.grossMarginPct < 35;
                return (
                  <tr key={sku.slug} className={thin ? 'bg-sprig-clay/5' : ''}>
                    <td className="px-3 py-2.5 text-left whitespace-nowrap">
                      <span className="font-medium text-sprig-ink">{sku.name}</span>
                      <span className="text-sprig-ink/45"> {sku.size}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-sprig-ink/55">
                      {sku.mrpInr}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{f3(cost.fob)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{f3(cost.freight)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{f3(cost.cif)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{f3(cost.duty)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-medium">
                      {f3(cost.landed)}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{f3(sku.priceBhd)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-sprig-ink/55">
                      {f3(cost.netRevenue)}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right tabular-nums font-medium ${
                        cost.grossProfit < 0 ? 'text-sprig-clay' : 'text-leaf-700'
                      }`}
                    >
                      {f3(cost.grossProfit)}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right tabular-nums font-semibold ${
                        cost.grossMarginPct < 0
                          ? 'text-sprig-clay'
                          : thin
                          ? 'text-sprig-clay'
                          : 'text-leaf-700'
                      }`}
                    >
                      {pct(cost.grossMarginPct)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* order-level */}
      <div className="rounded-2xl border border-sprig-stone bg-white p-5 sm:p-6">
        <h3 className="font-semibold text-sprig-ink mb-1">
          What survives at order level
        </h3>
        <p className="text-[12px] text-sprig-ink/50 mb-5">
          Gross margin is not the business. Delivery, packing, the gateway and breakage all land on
          the order, not the bottle — which is exactly why a single BHD 1.950 bottle is a thin
          order and a BHD 6.950 refill twin is a good one. Cost of goods here is the basket at the
          blended {pct(blendedGrossMargin(lane, discount) * 100)} gross margin from the table above.
        </p>
        <dl className="space-y-2 text-[14px] max-w-lg">
          {[
            ['Net revenue on goods (ex-VAT)', order.net, false],
            ['Landed cost of goods', -order.cogs, true],
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
            <dd
              className={`tabular-nums ${
                order.contribution < 0 ? 'text-sprig-clay' : 'text-leaf-700'
              }`}
            >
              BHD {f3(order.contribution)} ({pct(order.contributionPct)})
            </dd>
          </div>
          <div className="flex justify-between gap-4 text-[13px]">
            <dt className="text-sprig-ink/60">
              After acquisition at BHD {f3(OPS.targetCacBhd)}
            </dt>
            <dd
              className={`tabular-nums ${order.afterCac < 0 ? 'text-sprig-clay' : 'text-leaf-700'}`}
            >
              BHD {f3(order.afterCac)}
            </dd>
          </div>
        </dl>

        <p
          className={`mt-5 text-[13px] leading-relaxed rounded-xl px-4 py-3 ${
            order.afterCac < 0
              ? 'bg-sprig-clay/10 text-sprig-clay'
              : 'bg-leaf-50 text-leaf-800'
          }`}
        >
          {order.afterCac < 0
            ? 'This basket loses money on a paid first order. It only works on repeat, where acquisition is zero — so either lift the basket, or do not buy this customer.'
            : `Every paid first order clears acquisition with BHD ${f3(
                order.afterCac
              )} left over, and every repeat order returns the full BHD ${f3(
                order.contribution
              )}.`}
        </p>
      </div>
    </div>
  );
}
