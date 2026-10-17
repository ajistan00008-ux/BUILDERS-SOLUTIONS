import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '../../../../components/store/ProductCard';
import { CATEGORIES, categoryBySlug, productsInCategory } from '../../../../content/daily';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = categoryBySlug(params.slug);
  if (!c) return { title: 'Not found' };
  return { title: `${c.name} — ${c.tagline}`, description: c.blurb };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryBySlug(params.slug);
  if (!category) notFound();

  const products = productsInCategory(category.slug);
  const inStock = products.filter((p) => p.partnerStatus === 'stocked');
  const coming = products.filter((p) => p.partnerStatus !== 'stocked');

  return (
    <>
      <nav className="max-w-6xl mx-auto px-5 pt-6 text-[13px] text-sprig-ink/50">
        <Link href="/daily" className="hover:text-leaf-700">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-sprig-ink/75">{category.name}</span>
      </nav>

      <header className="max-w-6xl mx-auto px-5 pt-5 pb-8">
        <h1 className="text-3xl md:text-[42px] font-bold tracking-tight text-sprig-ink">
          {category.name}
        </h1>
        <p className="text-[15px] text-leaf-700 mt-1" dir="auto">
          <span lang="ar">{category.nameAr}</span>
        </p>
        <p className="mt-4 text-[16px] leading-relaxed text-sprig-ink/70 max-w-2xl">
          {category.blurb}
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {inStock.map((p) => (
            <ProductCard key={p.slug} product={p} compact />
          ))}
        </div>
      </section>

      {coming.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 pt-14">
          <header className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-sprig-ink">
              In testing or on the way
            </h2>
            <p className="text-[13px] text-sprig-ink/55 mt-1.5 max-w-xl">
              Brands have sent these to us and we are three weeks into assessing them. They are not
              on sale yet — we show them because we would rather be honest about the size of the
              shelf than pretend.
            </p>
          </header>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {coming.map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-5 pt-16">
        <div className="rounded-2xl border border-sprig-stone bg-white px-6 py-8">
          <h2 className="font-semibold text-sprig-ink mb-4">Other shelves</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/daily/c/${c.slug}`}
                className="rounded-full border border-sprig-stone hover:border-leaf-400 px-4 h-10 inline-flex items-center text-[14px] text-sprig-ink/75 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
