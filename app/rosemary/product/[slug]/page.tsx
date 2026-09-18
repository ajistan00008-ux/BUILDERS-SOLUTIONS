import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BottleArt } from '../../../../components/rosemary/BottleArt';
import { ProductCard } from '../../../../components/rosemary/ProductCard';
import { AddToBasket } from '../../../../components/rosemary/AddToBasket';
import { SKUS, bySlug, OPS } from '../../../../content/rosemary';

export function generateStaticParams() {
  return SKUS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sku = bySlug(params.slug);
  if (!sku) return { title: 'Not found' };
  return {
    title: `${sku.name} ${sku.size} — BHD ${sku.priceBhd.toFixed(3)}`,
    description: sku.blurb,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const sku = bySlug(params.slug);
  if (!sku) notFound();

  const related = SKUS.filter((s) => s.slug !== sku.slug && !s.bundleOf).slice(0, 4);
  const ml = parseInt(sku.size, 10);
  const perMl = ml && !sku.bundleOf ? (sku.priceBhd * 1000) / ml : null;

  return (
    <>
      <nav className="max-w-6xl mx-auto px-5 pt-6 text-[13px] text-sprig-ink/50">
        <Link href="/rosemary" className="hover:text-leaf-700">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-sprig-ink/75">
          {sku.name} {sku.size}
        </span>
      </nav>

      <section className="max-w-6xl mx-auto px-5 pt-6 pb-4 grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="rounded-3xl bg-gradient-to-b from-leaf-50 to-white border border-sprig-stone flex items-center justify-center py-10">
          <BottleArt sku={sku} className="w-[220px] sm:w-[280px] h-auto" />
        </div>

        <div className="flex flex-col">
          {sku.badge && (
            <span className="self-start rounded-full bg-leaf-100 text-leaf-800 text-[12px] font-semibold px-3 py-1 mb-3">
              {sku.badge}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink">
            {sku.name}
          </h1>
          <p className="text-[15px] text-sprig-ink/50 mt-1" dir="auto">
            {sku.size} · <span lang="ar">{sku.nameAr}</span>
          </p>

          <p className="mt-4 text-[16px] leading-relaxed text-sprig-ink/75">{sku.blurb}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-sprig-ink tabular-nums">
              BHD {sku.priceBhd.toFixed(3)}
            </span>
            {sku.compareAtBhd && (
              <span className="text-[15px] text-sprig-ink/40 line-through tabular-nums">
                BHD {sku.compareAtBhd.toFixed(3)}
              </span>
            )}
          </div>
          <p className="text-[12px] text-sprig-ink/50 mt-1">
            Inclusive of 10% VAT{perMl ? ` · ${perMl.toFixed(1)} fils per ml` : ''} · free delivery
            over BHD {OPS.freeDeliveryOverBhd.toFixed(3)}
          </p>

          <AddToBasket slug={sku.slug} />

          <ul className="mt-7 space-y-2.5">
            {sku.benefits.map((b) => (
              <li key={b} className="flex gap-2.5 text-[14px] text-sprig-ink/75 leading-relaxed">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-leaf-500 shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          {sku.bundleOf && (
            <div className="mt-7 rounded-xl border border-sprig-stone bg-white p-4">
              <h2 className="text-[13px] font-semibold text-sprig-ink mb-2">What is in the box</h2>
              <ul className="text-[14px] text-sprig-ink/70 space-y-1">
                {sku.bundleOf.map((b) => {
                  const item = bySlug(b.slug);
                  if (!item) return null;
                  return (
                    <li key={b.slug} className="flex justify-between gap-4">
                      <span>
                        {b.qty} × {item.name} {item.size}
                      </span>
                      <span className="tabular-nums text-sprig-ink/45">
                        BHD {(item.priceBhd * b.qty).toFixed(3)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {sku.howToUse && (
            <div className="mt-7">
              <h2 className="text-[13px] font-semibold text-sprig-ink mb-2 tracking-wide uppercase">
                How to use
              </h2>
              <ol className="text-[14px] text-sprig-ink/70 space-y-1.5 list-decimal list-inside">
                {sku.howToUse.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          <p className="mt-7 text-[12px] leading-relaxed text-sprig-ink/45 border-t border-sprig-stone pt-4">
            Cosmetic product, country of origin India, imported and sold in Bahrain with the
            manufacturer&rsquo;s seal and batch code intact. Not a medicine. For external use on hair
            and scalp only; avoid contact with eyes; discontinue if irritation occurs.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-sprig-ink mb-6">Goes well with</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((s) => (
            <ProductCard key={s.slug} sku={s} compact />
          ))}
        </div>
      </section>
    </>
  );
}
