import Link from 'next/link';
import { ProductCard } from '../../components/store/ProductCard';
import { ProductArt } from '../../components/store/ProductArt';
import { FaqList } from '../../components/store/Sections';
import {
  BRANDS,
  CATEGORIES,
  OPS,
  PRODUCTS,
  PROMISES,
  SHOP_FAQ,
  productBySlug,
} from '../../content/daily';

const hero = productBySlug('rosemary-water-100')!;
const heroes = PRODUCTS.filter((p) => p.hero);
const bundles = PRODUCTS.filter((p) => p.bundleOf);
const stockedCount = PRODUCTS.filter((p) => p.partnerStatus === 'stocked').length;

export default function DailyHome() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-leaf-50 via-sprig-paper to-sprig-paper">
        <div
          className="pointer-events-none absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full bg-leaf-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto px-5 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-14 items-center relative">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-leaf-100 text-leaf-800 text-[12px] font-medium px-3 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-leaf-600" />
              Stocked in Manama · ships today
            </p>
            <h1 className="text-[40px] sm:text-[52px] md:text-[58px] leading-[0.98] font-bold tracking-tight text-sprig-ink">
              The daily stuff.
              <br />
              <span className="text-leaf-600">Nothing over BHD 5.</span>
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-sprig-ink/70 max-w-lg">
              Hair, skin, body, grooming and fragrance — for men and women — at the prices daily
              essentials should cost. We import by the case and hold most of the shelf on
              consignment, so nothing here is paying for a warehouse full of unsold stock.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#shelf"
                className="rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 px-7 inline-flex items-center font-medium transition-colors"
              >
                Shop the shelf
              </Link>
              <Link
                href="/daily/product/sampler-box"
                className="rounded-full border border-sprig-stone hover:border-leaf-400 h-12 px-7 inline-flex items-center font-medium text-sprig-ink transition-colors"
              >
                Try six for BHD 4.950
              </Link>
            </div>
            <dl className="mt-9 grid grid-cols-3 gap-4 max-w-md">
              {[
                [`${stockedCount}`, 'products in stock'],
                [`${BRANDS.filter((b) => b.status === 'stocked').length}`, 'brands on the shelf'],
                ['Same day', 'in Manama'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-bold text-sprig-ink tabular-nums">{v}</dt>
                  <dd className="text-[12px] text-sprig-ink/55 leading-tight mt-0.5">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-x-8 bottom-6 top-10 rounded-[40px] bg-white/70 border border-white shadow-[0_40px_80px_-50px_rgba(18,24,15,0.5)]" />
            <ProductArt product={hero} className="relative w-[230px] sm:w-[280px] h-auto" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ promises */}
      <section className="border-y border-sprig-stone bg-white">
        <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROMISES.map((p) => (
            <div key={p.title}>
              <h2 className="text-[15px] font-semibold text-sprig-ink">{p.title}</h2>
              <p className="text-[13px] leading-relaxed text-sprig-ink/60 mt-1.5">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- categories */}
      <section id="shelf" className="max-w-6xl mx-auto px-5 pt-16 md:pt-20 scroll-mt-28">
        <header className="mb-7">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
            Five shelves
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1">
            Everything you actually use
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/daily/c/${c.slug}`}
              className="group rounded-2xl border border-sprig-stone bg-white p-5 hover:border-leaf-300 hover:shadow-[0_12px_40px_-28px_rgba(18,24,15,0.4)] transition-all"
            >
              <h3 className="font-semibold text-sprig-ink group-hover:text-leaf-700 transition-colors">
                {c.name}
              </h3>
              <p className="text-[12px] text-sprig-ink/55 mt-1.5 leading-relaxed">{c.tagline}</p>
              <span className="text-[12px] text-leaf-700 mt-3 inline-block">
                {PRODUCTS.filter((p) => p.category === c.slug).length} products →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- him and her */}
      <section className="max-w-6xl mx-auto px-5 pt-14">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              href: '/daily/for/women',
              kicker: 'For her',
              title: 'The five-step shelf',
              body: 'Cleanser, serum, SPF, body, hair. Plus the fragrance mists and the bits that run out first.',
            },
            {
              href: '/daily/for/men',
              kicker: 'For him',
              title: 'The four-product shelf',
              body: 'Face wash, moisturiser, beard or shave, deodorant. Short on purpose — nobody wants a ten-step routine.',
            },
          ].map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-3xl bg-leaf-900 text-leaf-50 px-7 py-9 hover:bg-leaf-800 transition-colors"
            >
              <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-300 font-medium">
                {p.kicker}
              </p>
              <h3 className="text-2xl md:text-[28px] font-bold tracking-tight text-white mt-1.5">
                {p.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-leaf-100/75 mt-2 max-w-sm">{p.body}</p>
              <span className="inline-block mt-5 text-[14px] text-leaf-200 group-hover:text-white transition-colors">
                Shop it →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- bestsellers */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
              Start here
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1">
              What people buy first
            </h2>
          </div>
          <p className="text-[13px] text-sprig-ink/55 max-w-sm">
            Six products that cover most of a routine between them. If you buy nothing else, buy
            the cleanser and the SPF.
          </p>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {heroes.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- bundles */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <header className="mb-7">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
            Bundles
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1">
            Cross BHD {OPS.freeDeliveryOverBhd.toFixed(3)}, delivery is on us
          </h2>
          <p className="text-[13px] text-sprig-ink/55 mt-2 max-w-xl">
            Delivery on this island costs us about a dinar an order whether you buy one tube or
            eight. These are priced so that both of us come out ahead when you buy the bigger one.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bundles.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- brand pitch */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <div className="rounded-3xl border border-leaf-200 bg-leaf-50 px-6 sm:px-10 py-10 md:py-12 grid md:grid-cols-[1fr_auto] gap-8 md:items-center">
          <div>
            <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/80 font-medium">
              Are you a brand?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-sprig-ink mt-1.5">
              Send us two units. We will tell you the truth about them.
            </h2>
            <p className="text-[15px] leading-relaxed text-sprig-ink/70 mt-3 max-w-2xl">
              We test everything in this climate before it goes on the shelf, and we write up the
              verdict whether or not we stock it. If it passes, we handle NHRA notification, Arabic
              labelling, customs and delivery — you ship one case to one address in Manama and keep
              title until it sells.
            </p>
          </div>
          <Link
            href="/daily/partners"
            className="justify-self-start md:justify-self-end rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 px-7 inline-flex items-center font-medium transition-colors whitespace-nowrap"
          >
            How partnering works
          </Link>
        </div>
      </section>

      {/* ----------------------------------------------------------------- faq */}
      <section id="faq" className="max-w-6xl mx-auto px-5 pt-20 scroll-mt-28">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mb-7">
          Questions we actually get
        </h2>
        <FaqList items={SHOP_FAQ} />
      </section>
    </>
  );
}
