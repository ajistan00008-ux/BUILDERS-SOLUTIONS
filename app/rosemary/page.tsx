import Link from 'next/link';
import { ProductCard } from '../../components/rosemary/ProductCard';
import { BottleArt } from '../../components/rosemary/BottleArt';
import { PriceCompare, FaqList } from '../../components/rosemary/Sections';
import { SKUS, PROMISES, OPS, bySlug } from '../../content/rosemary';

const hero = bySlug('rosemary-water-100')!;
const core = SKUS.filter((s) => s.hero);
const singles = SKUS.filter((s) => !s.bundleOf && !s.hero);
const bundles = SKUS.filter((s) => s.bundleOf);

export default function RosemaryHome() {
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
              In stock in Manama · ships today
            </p>
            <h1 className="text-[40px] sm:text-[54px] md:text-[62px] leading-[0.95] font-bold tracking-tight text-sprig-ink">
              Rosemary water.
              <br />
              <span className="text-leaf-600">BHD 1.950</span> a bottle.
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-sprig-ink/70 max-w-lg">
              Steam-distilled rosemary hydrosol in a daily spray. The same bottle sells for
              BHD&nbsp;3.670 across the causeway and upwards of BHD&nbsp;25 on the import
              marketplaces. We bring it in ourselves, hold it in Bahrain, and hand it to a local
              driver — so you pay for the product, not for four middlemen.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#shelf"
                className="rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 px-7 inline-flex items-center font-medium transition-colors"
              >
                Shop the shelf
              </Link>
              <Link
                href="#compare"
                className="rounded-full border border-sprig-stone hover:border-leaf-400 h-12 px-7 inline-flex items-center font-medium text-sprig-ink transition-colors"
              >
                Why is it this cheap?
              </Link>
            </div>
            <dl className="mt-9 grid grid-cols-3 gap-4 max-w-md">
              {[
                ['1.950', 'BHD, 100 ml'],
                ['47%', 'below Gulf shelf'],
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
            <BottleArt sku={hero} className="relative w-[240px] sm:w-[300px] h-auto" />
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

      {/* --------------------------------------------------------------- shelf */}
      <section id="shelf" className="max-w-6xl mx-auto px-5 pt-16 md:pt-20 scroll-mt-20">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
              The three sizes
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1">
              Start small. Refill cheap.
            </h2>
          </div>
          <p className="text-[13px] text-sprig-ink/55 max-w-sm">
            All three are the same liquid. The only thing that changes is how much you pay per
            millilitre — and the refill wins by a distance.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {core.map((s) => (
            <ProductCard key={s.slug} sku={s} />
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
            Delivery on this island costs us about a dinar an order whether you buy one bottle or
            six. These three baskets are priced so that both of us come out ahead when you buy the
            bigger one.
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bundles.map((s) => (
            <ProductCard key={s.slug} sku={s} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- routine */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <div className="rounded-3xl bg-leaf-900 text-leaf-50 px-6 sm:px-10 py-10 md:py-14">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-300 font-medium">
            The routine
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1 mb-8">
            Three steps, six to eight weeks
          </h2>
          <ol className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: '01',
                t: 'Spray, daily',
                d: 'Rosemary water on the scalp and lengths every morning. Leave it in. This is the step that matters most and the one people skip.',
              },
              {
                n: '02',
                t: 'Oil, twice a week',
                d: 'Rosemary hair oil the night before a wash, or an hour before. Massage it in, then shampoo it out.',
              },
              {
                n: '03',
                t: 'Judge it at week eight',
                d: 'Hydrosol is not a drug. Shedding usually settles first, around week four; density is a week-eight conversation.',
              },
            ].map((s) => (
              <li key={s.n}>
                <span className="block font-mono text-leaf-400 text-sm mb-2">{s.n}</span>
                <h3 className="text-white font-semibold text-lg mb-2">{s.t}</h3>
                <p className="text-[14px] leading-relaxed text-leaf-100/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- rest of shelf */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <header className="mb-7">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
            Goes with it
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1">
            The rest of the routine
          </h2>
        </header>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {singles.map((s) => (
            <ProductCard key={s.slug} sku={s} compact />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- compare */}
      <section id="compare" className="max-w-6xl mx-auto px-5 pt-20 scroll-mt-20">
        <header className="mb-7 max-w-2xl">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
            The honest version
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1 mb-3">
            Nothing about the product is cheap. The supply chain is.
          </h2>
          <p className="text-[15px] leading-relaxed text-sprig-ink/65">
            Rosemary hydrosol is inexpensive to make and expensive to ship badly. Most of what a
            Gulf shopper pays today is a courier flying single bottles across a border, plus two or
            three re-sellers taking a cut on the way. We buy a pallet at a time, move it by sea,
            clear it once, and store it in Manama. That is the whole trick.
          </p>
        </header>
        <PriceCompare />
      </section>

      {/* ----------------------------------------------------------------- faq */}
      <section id="faq" className="max-w-6xl mx-auto px-5 pt-20 scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mb-7">
          Questions we actually get
        </h2>
        <FaqList />
      </section>

      {/* ------------------------------------------------------------ closing */}
      <section className="max-w-6xl mx-auto px-5 pt-20">
        <div className="rounded-3xl border border-sprig-stone bg-white px-6 sm:px-10 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink">
            One bottle is BHD 1.950. Two is free delivery away.
          </h2>
          <p className="mt-3 text-[15px] text-sprig-ink/60 max-w-xl mx-auto">
            Cash on delivery, BenefitPay or card. Ordered before 2pm in Manama, it is with you this
            evening.
          </p>
          <Link
            href="#shelf"
            className="mt-7 inline-flex items-center rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 px-8 font-medium transition-colors"
          >
            Back to the shelf
          </Link>
        </div>
      </section>
    </>
  );
}
