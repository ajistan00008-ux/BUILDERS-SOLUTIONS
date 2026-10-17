import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '../../../../components/store/ProductCard';
import { CATEGORIES, PRODUCTS, type Audience } from '../../../../content/daily';

const AUDIENCES: Record<string, { audience: Audience; title: string; kicker: string; lead: string }> = {
  women: {
    audience: 'women',
    title: 'The shelf, for her',
    kicker: 'For her',
    lead: 'Everything women buy here, plus everything that works for anyone. Five steps on the skin side, and the body and hair basics that run out first.',
  },
  men: {
    audience: 'men',
    title: 'The shelf, for him',
    kicker: 'For him',
    lead: 'Short on purpose. Face wash, moisturiser, beard or shave, deodorant — plus the shared basics. Nobody is selling you a ten-step routine.',
  },
};

export function generateStaticParams() {
  return Object.keys(AUDIENCES).map((audience) => ({ audience }));
}

export function generateMetadata({ params }: { params: { audience: string } }): Metadata {
  const a = AUDIENCES[params.audience];
  if (!a) return { title: 'Not found' };
  return { title: a.title, description: a.lead };
}

export default function AudiencePage({ params }: { params: { audience: string } }) {
  const config = AUDIENCES[params.audience];
  if (!config) notFound();

  // Products made for this audience, plus the unisex shelf.
  const specific = PRODUCTS.filter((p) => p.audience === config.audience);
  const shared = PRODUCTS.filter((p) => p.audience === 'all');

  return (
    <>
      <nav className="max-w-6xl mx-auto px-5 pt-6 text-[13px] text-sprig-ink/50">
        <Link href="/daily" className="hover:text-leaf-700">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-sprig-ink/75">{config.kicker}</span>
      </nav>

      <header className="max-w-6xl mx-auto px-5 pt-5 pb-8">
        <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
          {config.kicker}
        </p>
        <h1 className="text-3xl md:text-[42px] font-bold tracking-tight text-sprig-ink mt-1">
          {config.title}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-sprig-ink/70 max-w-2xl">{config.lead}</p>
      </header>

      <section className="max-w-6xl mx-auto px-5">
        <h2 className="text-xl font-bold tracking-tight text-sprig-ink mb-5">
          Made for {config.audience === 'men' ? 'men' : 'women'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {specific.map((p) => (
            <ProductCard key={p.slug} product={p} compact />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pt-14">
        <h2 className="text-xl font-bold tracking-tight text-sprig-ink mb-1.5">
          Works for everyone
        </h2>
        <p className="text-[13px] text-sprig-ink/55 mb-5 max-w-xl">
          Most of the shelf is not gendered and we are not going to pretend otherwise to sell you a
          second bottle of the same thing.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {shared.map((p) => (
            <ProductCard key={p.slug} product={p} compact />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pt-16">
        <div className="rounded-2xl border border-sprig-stone bg-white px-6 py-8">
          <h2 className="font-semibold text-sprig-ink mb-4">Browse by shelf instead</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
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
