import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, PartnerForm } from '../../../components/store/Sections';
import {
  BRANDS,
  CATEGORIES,
  PARTNER_FAQ,
  PARTNER_OFFER,
  PARTNER_STEPS,
  PRODUCTS,
} from '../../../content/daily';

export const metadata: Metadata = {
  title: 'For brands — send samples, get an honest verdict, sell in Bahrain',
  description:
    'We test beauty products in Bahraini conditions and stock what passes. You ship samples; if it works we handle NHRA notification, Arabic labelling, customs, warehousing and delivery on consignment terms.',
};

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  stocked: { text: 'On the shelf', cls: 'bg-leaf-600 text-white' },
  sampling: { text: 'In testing', cls: 'bg-amber-100 text-amber-800' },
  incoming: { text: 'Signed, arriving', cls: 'bg-sprig-stone text-sprig-ink/70' },
};

export default function PartnersPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-leaf-50 via-sprig-paper to-sprig-paper">
        <div className="max-w-6xl mx-auto px-5 pt-14 pb-14 md:pt-20 md:pb-18">
          <p className="inline-flex items-center gap-2 rounded-full bg-leaf-100 text-leaf-800 text-[12px] font-medium px-3 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf-600" />
            Brand partnerships
          </p>
          <h1 className="text-[38px] sm:text-[50px] md:text-[56px] leading-[1.0] font-bold tracking-tight text-sprig-ink max-w-3xl">
            Send us two units.
            <br />
            <span className="text-leaf-600">We will tell you the truth.</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-sprig-ink/70 max-w-2xl">
            We are a Bahraini retailer of everyday beauty essentials. If you make something good in
            hair, skin, body, grooming or fragrance, send samples and we will test them properly in
            this climate — then tell you whether we want to sell them, and why, either way.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#apply"
              className="rounded-full bg-leaf-600 hover:bg-leaf-700 text-white h-12 px-7 inline-flex items-center font-medium transition-colors"
            >
              Apply to send samples
            </Link>
            <Link
              href="#how"
              className="rounded-full border border-sprig-stone hover:border-leaf-400 h-12 px-7 inline-flex items-center font-medium text-sprig-ink transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- numbers */}
      <section className="border-y border-sprig-stone bg-white">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            [`${PRODUCTS.length}`, 'SKUs on or entering the shelf'],
            [`${CATEGORIES.length}`, 'categories, men and women'],
            ['21 days', 'from samples to a written verdict'],
            ['BHD 0', 'listing fee, now and ever'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="text-3xl font-bold text-sprig-ink tabular-nums">{v}</p>
              <p className="text-[13px] text-sprig-ink/55 leading-tight mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- what we do */}
      <section className="max-w-6xl mx-auto px-5 pt-16 md:pt-20">
        <header className="mb-8 max-w-2xl">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
            What you get
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1">
            A route into Bahrain that costs you one case
          </h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PARTNER_OFFER.map((o) => (
            <div key={o.title} className="rounded-2xl border border-sprig-stone bg-white p-5">
              <h3 className="font-semibold text-sprig-ink text-[16px]">{o.title}</h3>
              <p className="text-[14px] leading-relaxed text-sprig-ink/65 mt-2">{o.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- steps */}
      <section id="how" className="max-w-6xl mx-auto px-5 pt-16 scroll-mt-28">
        <div className="rounded-3xl bg-leaf-900 text-leaf-50 px-6 sm:px-10 py-10 md:py-14">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-300 font-medium">
            The process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1 mb-9">
            Five steps, about three months
          </h2>
          <ol className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {PARTNER_STEPS.map((s) => (
              <li key={s.n}>
                <span className="block font-mono text-leaf-400 text-sm mb-2">{s.n}</span>
                <h3 className="text-white font-semibold text-[16px] mb-2 leading-snug">{s.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-leaf-100/75">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-leaf-100/55 mt-9 pt-6 border-t border-white/10 max-w-3xl leading-relaxed">
            The long pole is step five. NHRA cosmetic notification takes six to eight working weeks
            and nothing can be sold in Bahrain before it clears — so the honest answer to &ldquo;how
            soon can we be live&rdquo; is about three months from the day your samples arrive, not
            three weeks.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- what we want */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-6 sm:p-7">
            <h2 className="font-semibold text-sprig-ink text-lg mb-4">What tends to pass</h2>
            <ul className="space-y-2.5">
              {[
                'Daily-use products someone re-orders every six to twelve weeks',
                'A shelf price we can land under BHD 5 and still clear 55% gross',
                'Formulations that survive 45°C — no splitting emulsions, no slumping sticks',
                'Honest claims we can legally print in Bahrain',
                'Pack sizes that post cheaply: under 400 ml, nothing glass and heavy',
                'Brands happy to start on consignment rather than demanding a purchase order',
              ].map((x) => (
                <li key={x} className="flex gap-2.5 text-[14px] text-sprig-ink/75 leading-relaxed">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-leaf-600 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-sprig-clay/30 bg-sprig-clay/5 p-6 sm:p-7">
            <h2 className="font-semibold text-sprig-ink text-lg mb-4">What we turn down</h2>
            <ul className="space-y-2.5">
              {[
                'Anything making a medical claim — hair-loss cures, acne "treatment", minoxidil',
                'Skin-lightening and whitening products, whatever they are called on the pack',
                'Products that need a BHD 12+ shelf price to work for either of us',
                'Line cards of forty SKUs where nobody can say which three matter',
                'Brands wanting guaranteed positive coverage in exchange for samples',
                'Anything we cannot get an ingredient breakdown and a free-sale certificate for',
              ].map((x) => (
                <li key={x} className="flex gap-2.5 text-[14px] text-sprig-ink/75 leading-relaxed">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-sprig-clay shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- brands */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <header className="mb-6 max-w-2xl">
          <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
            Where everyone stands
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mt-1 mb-3">
            The current board
          </h2>
          <p className="text-[14px] leading-relaxed text-sprig-ink/65">
            We keep this honest rather than impressive. A brand is only &ldquo;on the shelf&rdquo;
            once its NHRA notification is through and units are physically in Manama.
          </p>
        </header>
        <div className="rounded-2xl border border-sprig-stone bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] min-w-[560px]">
              <thead className="bg-leaf-50 text-sprig-ink/70">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Brand</th>
                  <th className="px-4 py-3 text-left font-medium">Ships from</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sprig-stone">
                {BRANDS.map((b) => {
                  const s = STATUS_LABEL[b.status];
                  return (
                    <tr key={b.slug}>
                      <td className="px-4 py-3 font-medium text-sprig-ink whitespace-nowrap">
                        {b.name}
                      </td>
                      <td className="px-4 py-3 text-sprig-ink/60 whitespace-nowrap">{b.origin}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}>
                          {s.text}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sprig-ink/60">{b.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-[12px] text-sprig-ink/45 border-t border-sprig-stone leading-relaxed">
            Names marked &ldquo;Partner slot&rdquo; are placeholder labels held open for signing
            brands — they are not real companies, and we would rather show the shape of the shelf
            than invent logos.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- apply */}
      <section id="apply" className="max-w-6xl mx-auto px-5 pt-20 scroll-mt-28">
        <header className="mb-7 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink">
            Apply to send samples
          </h2>
          <p className="text-[15px] leading-relaxed text-sprig-ink/65 mt-3">
            Six fields. We reply within three working days — including the no&apos;s, with the
            reason.
          </p>
        </header>
        <PartnerForm />
      </section>

      {/* ---------------------------------------------------------------- faq */}
      <section className="max-w-6xl mx-auto px-5 pt-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mb-7">
          What brands ask us
        </h2>
        <FaqList items={PARTNER_FAQ} />
      </section>
    </>
  );
}
