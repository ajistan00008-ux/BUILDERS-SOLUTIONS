import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductArt } from '../../../../components/store/ProductArt';
import { ProductCard } from '../../../../components/store/ProductCard';
import { AddToBasket } from '../../../../components/store/AddToBasket';
import {
  OPS,
  PRODUCTS,
  brandBySlug,
  categoryBySlug,
  productBySlug,
} from '../../../../content/daily';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = productBySlug(params.slug);
  if (!p) return { title: 'Not found' };
  return {
    title: `${p.name} ${p.size} — BHD ${p.priceBhd.toFixed(3)}`,
    description: p.blurb,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const brand = brandBySlug(product.brand);
  const category = categoryBySlug(product.category);
  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category && !p.bundleOf
  ).slice(0, 4);
  const buyable = product.partnerStatus === 'stocked';

  return (
    <>
      <nav className="max-w-6xl mx-auto px-5 pt-6 text-[13px] text-sprig-ink/50">
        <Link href="/daily" className="hover:text-leaf-700">Shop</Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link href={`/daily/c/${category.slug}`} className="hover:text-leaf-700">
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-sprig-ink/75">{product.name}</span>
      </nav>

      <section className="max-w-6xl mx-auto px-5 pt-6 pb-4 grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="rounded-3xl bg-gradient-to-b from-leaf-50 to-white border border-sprig-stone flex items-center justify-center py-10">
          <ProductArt product={product} className="w-[220px] sm:w-[270px] h-auto" />
        </div>

        <div className="flex flex-col">
          {brand && (
            <p className="text-[12px] tracking-[0.14em] uppercase text-leaf-700/80 font-medium mb-2">
              {brand.name}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink">
            {product.name}
          </h1>
          <p className="text-[15px] text-sprig-ink/50 mt-1">{product.size}</p>

          <p className="mt-4 text-[16px] leading-relaxed text-sprig-ink/75">{product.blurb}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-sprig-ink tabular-nums">
              BHD {product.priceBhd.toFixed(3)}
            </span>
            {product.compareAtBhd && (
              <span className="text-[15px] text-sprig-ink/40 line-through tabular-nums">
                BHD {product.compareAtBhd.toFixed(3)}
              </span>
            )}
          </div>
          <p className="text-[12px] text-sprig-ink/50 mt-1">
            Inclusive of 10% VAT · free delivery over BHD {OPS.freeDeliveryOverBhd.toFixed(3)}
          </p>

          {buyable ? (
            <AddToBasket slug={product.slug} />
          ) : (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
              <p className="text-[13px] font-semibold text-amber-900 mb-1">
                {product.partnerStatus === 'sampling' ? 'In testing — not on sale' : 'Not in yet'}
              </p>
              <p className="text-[14px] leading-relaxed text-sprig-ink/70">
                {product.partnerStatus === 'sampling'
                  ? 'The brand has sent us samples and we are part-way through three weeks of testing in this climate. It goes on sale only if it passes and its NHRA notification clears.'
                  : 'This one has passed testing and is waiting on its first consignment case and NHRA notification. Weeks, not months.'}
              </p>
            </div>
          )}

          <ul className="mt-7 space-y-2.5">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-2.5 text-[14px] text-sprig-ink/75 leading-relaxed">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-leaf-500 shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          {product.bundleOf && (
            <div className="mt-7 rounded-xl border border-sprig-stone bg-white p-4">
              <h2 className="text-[13px] font-semibold text-sprig-ink mb-2">What is in the box</h2>
              <ul className="text-[14px] text-sprig-ink/70 space-y-1">
                {product.bundleOf.map((b) => {
                  const item = productBySlug(b.slug);
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

          {product.howToUse && (
            <div className="mt-7">
              <h2 className="text-[13px] font-semibold text-sprig-ink mb-2 tracking-wide uppercase">
                How to use
              </h2>
              <ol className="text-[14px] text-sprig-ink/70 space-y-1.5 list-decimal list-inside">
                {product.howToUse.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Disclosure. A free sample buys an honest test, not a good write-up. */}
          {product.partnerStatus !== 'stocked' && (
            <p className="mt-7 text-[12px] leading-relaxed text-sprig-ink/55 rounded-lg bg-sprig-stone/40 px-3.5 py-3">
              <strong className="text-sprig-ink/75">Disclosure:</strong> units of this product were
              supplied to us free of charge by the brand for testing. That buys an honest
              assessment, not a positive one — if it fails, it does not go on the shelf and we say
              why.
            </p>
          )}

          <p className="mt-5 text-[12px] leading-relaxed text-sprig-ink/45 border-t border-sprig-stone pt-4">
            Cosmetic product, not a medicine. Imported and sold in Bahrain with the manufacturer
            seal and batch code intact. For external use only; avoid contact with eyes; patch-test
            before first use and discontinue if irritation occurs.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 pt-16">
          <h2 className="text-2xl font-bold tracking-tight text-sprig-ink mb-6">
            More from {category?.name ?? 'the shelf'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
