import type { Metadata } from 'next';
import Link from 'next/link';
import { MarginModel, ModelComparison } from '../../../components/store/MarginModel';

export const metadata: Metadata = {
  title: 'Operating plan — DAILY.BH',
  description:
    'Internal: fulfilment model, NHRA compliance, brand acquisition, unit economics and the first 120 days for the DAILY.BH shelf.',
  robots: { index: false, follow: false },
};

function Section({
  n,
  title,
  lead,
  children,
  wide = false,
}: {
  n: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section className="scroll-mt-24" id={`step-${n}`}>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-[13px] text-leaf-600">{n}</span>
        <h2 className="text-2xl md:text-[28px] font-bold tracking-tight text-sprig-ink">{title}</h2>
      </div>
      {lead && <p className="text-[15px] text-sprig-ink/65 leading-relaxed mb-4 max-w-3xl">{lead}</p>}
      <div
        className={`space-y-4 text-[15px] leading-relaxed text-sprig-ink/75 ${wide ? '' : 'max-w-3xl'}`}
      >
        {children}
      </div>
    </section>
  );
}

function Table({ head, rows, note }: { head: string[]; rows: (string | number)[][]; note?: string }) {
  return (
    <div className="rounded-xl border border-sprig-stone bg-white overflow-hidden not-prose">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] min-w-[520px]">
          <thead className="bg-leaf-50 text-sprig-ink/70">
            <tr>
              {head.map((h, i) => (
                <th
                  key={h}
                  className={`px-3.5 py-2.5 font-medium whitespace-nowrap ${i === 0 ? 'text-left' : 'text-right'}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sprig-stone">
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) => (
                  <td
                    key={ci}
                    className={`px-3.5 py-2.5 ${
                      ci === 0 ? 'text-left text-sprig-ink' : 'text-right tabular-nums text-sprig-ink/75'
                    }`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && (
        <p className="px-3.5 py-2.5 text-[12px] text-sprig-ink/45 border-t border-sprig-stone">{note}</p>
      )}
    </div>
  );
}

function Callout({
  tone = 'leaf',
  title,
  children,
}: {
  tone?: 'leaf' | 'clay';
  title: string;
  children: React.ReactNode;
}) {
  const styles = tone === 'clay' ? 'border-sprig-clay/30 bg-sprig-clay/5' : 'border-leaf-200 bg-leaf-50';
  return (
    <div className={`rounded-xl border ${styles} px-4 py-3.5`}>
      <p className={`text-[13px] font-semibold mb-1 ${tone === 'clay' ? 'text-sprig-clay' : 'text-leaf-800'}`}>
        {title}
      </p>
      <div className="text-[14px] leading-relaxed text-sprig-ink/75">{children}</div>
    </div>
  );
}

export default function PlanPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10 md:py-14">
      <header className="max-w-3xl mb-12">
        <p className="text-[12px] tracking-[0.18em] uppercase text-leaf-700/70 font-medium">
          Internal · operating plan
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-sprig-ink mt-2">
          A beauty shelf in Bahrain that carries no stock
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-sprig-ink/70">
          How DAILY.BH gets products, clears them into the country, prices them and delivers them —
          and why the version of &ldquo;dropshipping&rdquo; everyone pictures is the one thing that
          does not work here. The numbers are live; they come from the same file the shop prices
          itself from.
        </p>
        <Link
          href="/daily"
          className="mt-6 inline-flex items-center gap-2 text-[14px] text-leaf-700 hover:text-leaf-800 font-medium"
        >
          ← Back to the shop
        </Link>
      </header>

      <div className="grid lg:grid-cols-[210px_1fr] gap-10">
        <nav className="hidden lg:block sticky top-32 self-start text-[13px] space-y-2">
          {[
            ['01', 'Fulfilment model'],
            ['02', 'The NHRA gate'],
            ['03', 'Getting brands'],
            ['04', 'Consignment terms'],
            ['05', 'Inbound & clearing'],
            ['06', 'Warehouse & last mile'],
            ['07', 'The model'],
            ['08', 'Pricing policy'],
            ['09', 'Capital & risk'],
            ['10', 'First 120 days'],
          ].map(([n, l]) => (
            <a
              key={n}
              href={`#step-${n}`}
              className="flex gap-2.5 text-sprig-ink/55 hover:text-leaf-700 transition-colors"
            >
              <span className="font-mono text-leaf-600/70">{n}</span>
              {l}
            </a>
          ))}
        </nav>

        <div className="space-y-14 min-w-0">
          <Section
            n="01"
            wide
            title="Pick the fulfilment model first"
            lead="Everything else follows from this. Three ways to run the shelf; only one of them survives contact with Bahraini customs."
          >
            <ModelComparison />
            <div className="max-w-3xl space-y-4 pt-2">
              <Callout tone="clay" title="Why cross-border dropship fails here, specifically">
                <p>
                  It is not a margin problem you can optimise away, it is two hard walls. First,
                  cost: a BHD 11.500 basket shipped as one parcel from India or China carries
                  roughly BHD 6–7 of courier, BHD 0.60 of duty and VAT, and a per-parcel clearing
                  fee. You are paying more to move the goods than the goods are worth.
                </p>
                <p className="mt-2">
                  Second, and worse: a cosmetic may not be placed on the Bahraini market without an
                  NHRA notification, and a parcel shipped direct from an unregistered foreign
                  seller to a consumer does not have one. Customs can hold or return it, and
                  because we took the order and the money, the exposure is ours — not the
                  supplier&rsquo;s. Scale that to a hundred orders a week and it stops being a
                  logistics inefficiency and becomes a regulatory problem with our name on it.
                </p>
              </Callout>
              <Callout title="What we keep from the dropship idea">
                <p>
                  Everything that actually mattered. Under consignment we still carry no inventory
                  on the balance sheet, still pay for goods only after they sell, still let the
                  brand take the stock risk, and still list a product without buying it first. We
                  give up only the thing that was never an advantage — shipping each order
                  individually from abroad.
                </p>
              </Callout>
            </div>
          </Section>

          <Section
            n="02"
            title="The NHRA gate, and planning around it"
            lead="Six to eight working weeks per SKU, and nothing can be sold before it clears. It is the schedule, so build the schedule around it."
          >
            <Table
              head={['What', 'Who', 'Time', 'Rough cost']}
              rows={[
                ['CR with import/export + retail activity', 'MOIC (Sijilat)', '1–2 weeks', 'BHD 50–300'],
                ['Customs importer code (OFOQ)', 'Bahrain Customs', 'Days', 'Nominal'],
                ['VAT registration', 'NBR', '1–2 weeks', 'Free'],
                ['Cosmetic product notification, per SKU', 'NHRA', '30–40 working days', 'Per-SKU fee'],
                ['Arabic label / artwork approval', 'NHRA + MOIC', 'With the above', 'Artwork cost'],
              ]}
            />
            <p>
              <strong>File in waves, not one at a time.</strong> The six-to-eight weeks runs in
              parallel across SKUs, so a batch of twelve notifications costs the same elapsed time
              as one. Hold samples until you have enough to file a wave, then file the wave.
            </p>
            <p>
              <strong>Register for VAT voluntarily from the start.</strong> Mandatory above BHD
              37,500 turnover, voluntary above BHD 18,750. Registering turns import VAT from a cost
              into reclaimable input tax.
            </p>
            <Callout tone="clay" title="Two categories to refuse at the door">
              <p>
                <strong>Medical claims.</strong> Anything presenting itself as treating hair loss,
                acne or a skin condition — including anything containing minoxidil — is a
                pharmaceutical, not a cosmetic. Different regulator, different process, and a claim
                like that on a cosmetic notification gets the whole filing rejected.
              </p>
              <p className="mt-2">
                <strong>Skin lightening.</strong> Whatever it is called on the pack, it is a
                category with real regulatory and reputational risk across the GCC. It is also
                lucrative, which is exactly why the decision to stay out of it should be written
                down now rather than argued about later.
              </p>
            </Callout>
          </Section>

          <Section
            n="03"
            title="Getting brands to send samples"
            lead="The free-sample flow is real, but it is earned, not asked for. Brands seed channels that can show them something they want."
          >
            <p>
              A brand sends free product when the recipient offers one of three things: an audience,
              a market they cannot reach, or a decision they need made cheaply. We lead with the
              second and third — a Bahraini entity that will handle NHRA, customs and shelf
              placement is worth far more to a mid-size Indian or Turkish brand than another
              reviewer.
            </p>
            <Table
              head={['Source', 'Volume', 'Conversion', 'Effort']}
              rows={[
                ['Indian D2C brands already exporting to GCC', '~200 reachable', 'Medium', 'Cold email, line card attached'],
                ['Beautyworld Middle East (Dubai, annual)', '1,500+ exhibitors', 'High', 'Three days, ~BHD 400 all-in'],
                ['Turkish and Korean export agents', '~50 agencies', 'High per contact', 'One agent opens twenty brands'],
                ['GCC distributors seeking a Bahrain sub-channel', '~30', 'Medium', 'They already hold NHRA files'],
                ['Inbound via /daily/partners', 'Slow to start', 'Highest', 'Compounds once the shelf is visible'],
              ]}
              note="Target: 40 brands contacted, 12 sending samples, 5 stocked in the first 120 days."
            />
            <p>
              <strong>The pitch that works</strong> is not &ldquo;we will promote you&rdquo; — every
              brand hears that daily. It is: <em>we will tell you whether Bahrain is worth your
              time, for the cost of two units, and if it is we will do the regulatory work.</em>{' '}
              That is a cheap option on a new market, and it is honest.
            </p>
            <Callout title="Say the disclosure out loud, on every page">
              Every product supplied free carries a visible line saying so. This is not only an
              advertising-standards point — a shelf where every verdict is positive is a shelf
              nobody believes, which destroys the thing the brands are paying attention to. The
              refusals are the asset.
            </Callout>
          </Section>

          <Section
            n="04"
            title="Consignment terms worth signing"
            lead="The brand keeps title until the unit sells. Get these six things written down and the rest is detail."
          >
            <ul className="list-disc list-inside space-y-1.5 marker:text-leaf-500">
              <li>
                <strong>Title passes on sale, not on delivery.</strong> The whole point. Their stock
                sits in our 3PL; we invoice monthly on units sold.
              </li>
              <li>
                <strong>Consignment price fixed 12 months, quoted in USD.</strong> BHD is pegged to
                USD, so pricing in USD removes the currency risk entirely and leaves it with them.
              </li>
              <li>
                <strong>Minimum 18 months residual shelf life on arrival</strong>, and a written
                rule for what happens to stock inside six months — usually return at their cost or
                markdown by agreement.
              </li>
              <li>
                <strong>They supply the regulatory pack:</strong> full ingredient breakdown, GMP
                certificate, free-sale certificate, and artwork files we can adapt for Arabic.
              </li>
              <li>
                <strong>An authorisation letter naming our Bahraini entity</strong> as authorised
                representative. Without it there is no NHRA filing.
              </li>
              <li>
                <strong>Either side can exit on 60 days</strong>, with unsold stock returned at
                their cost or bought out at consignment price at our option.
              </li>
            </ul>
            <Callout title="When to stop consigning and start buying">
              Once a SKU has three months of steady re-orders, buying it outright adds roughly 8
              points of gross margin. Do that per-SKU on proven winners only. The consignment shelf
              exists so that unproven products cost nothing to carry — converting the whole
              catalogue to owned stock would throw that away.
            </Callout>
          </Section>

          <Section
            n="05"
            title="Getting the case into the country"
            lead="One clearance per shipment, not one per order. This is the entire cost advantage."
          >
            <Table
              head={['Lane', 'Rate', 'Per unit (≈250 g)', 'Transit', 'Use for']}
              rows={[
                ['Courier (DHL/FedEx, <30 kg)', '₹950–2,300/kg', '~BHD 0.85', '2–4 days', 'Samples and the NHRA dossier'],
                ['Air consolidated (50–100 kg)', '₹700–900/kg', '~BHD 0.53', '4–7 days', 'First case, stock-outs'],
                ['Sea LCL (1 CBM+)', '~USD 550–650/CBM', '~BHD 0.09', '18–28 days', 'Every repeat case'],
                ['Sea FCL 20ft', 'USD 1,400–2,200', '~BHD 0.03', '18–28 days', 'Above 2,000 units/month'],
              ]}
              note="All-in figures include origin charges, destination THC, clearance and delivery to a Manama warehouse."
            />
            <p>
              Duty is 5% on CIF for HS Chapter 33; import VAT is 10% on CIF plus duty and is
              reclaimable once registered. Get a binding classification ruling on the first shipment
              so the rate never moves.
            </p>
            <p>
              Lead time door-to-door on the sea lane is four to six weeks, so you are always
              ordering against demand you have not seen. Hold eight weeks of cover and re-order at
              four — easier under consignment, because the cover costs the brand, not us.
            </p>
          </Section>

          <Section
            n="06"
            title="Warehouse and last mile"
            lead="Bahrain is 780 km². You do not need a distribution network; you need one air-conditioned room and a driver."
          >
            <ul className="list-disc list-inside space-y-1.5 marker:text-leaf-500">
              <li>
                <strong>Air-conditioned storage is not optional.</strong> Emulsions split and sticks
                slump above about 40°C, and a non-conditioned unit in a Bahraini August will cost
                you the batch — someone else&rsquo;s batch, under consignment, which is a faster way
                to lose a brand than anything else on this page.
              </li>
              <li>
                <strong>Start with a 3PL, not your own unit.</strong> Pick-pack at roughly BHD
                0.18/order plus storage. It buys back evenings and it scales without a lease.
              </li>
              <li>
                <strong>Batch and expiry logged at goods-in, FEFO picking, monthly count.</strong> A
                recall you cannot trace to a batch is existential, and with consigned stock you are
                holding someone else&rsquo;s liability.
              </li>
              <li>
                <strong>Last mile from BHD 1.000</strong> on a local 3PL contract, falling to about
                BHD 0.400 once an own driver runs 25+ batched drops a day. Offer cash on delivery
                from day one.
              </li>
            </ul>
            <Callout tone="clay" title="The free-delivery line costs 83 fils at the boundary">
              <p>
                A BHD 7.950 basket contributes BHD 3.706; a BHD 8.050 basket contributes BHD 2.878,
                because crossing the line hands us the whole dinar of delivery. Contribution only
                recovers past about BHD 9.600, so there is a ~1.6 dinar dead zone just above the
                threshold. We accept it because almost nothing lands there — the bundles sit at
                7.950, 11.450 and 11.950, deliberately either side of it. Watch for the dead zone
                filling up; if it does, move the line to BHD 9.500 before touching shelf prices.
              </p>
            </Callout>
            <Callout tone="clay" title="Why the line exists at all">
              Last mile costs about a dinar an order whatever is in the box. At a BHD 2 basket that
              is most of the revenue; at BHD 11.500 it is under a tenth. A broad shelf across five
              categories is not merchandising ambition — it is the mechanism that makes the delivery
              cost survivable. Watch basket size, not traffic.
            </Callout>
          </Section>

          <Section
            n="07"
            wide
            title="The model, with the levers exposed"
            lead="Move the consignment price, the last mile and the basket. Those are the only three numbers that decide this."
          >
            <div className="not-prose">
              <MarginModel />
            </div>
          </Section>

          <Section
            n="08"
            title="Pricing policy"
            lead="One rule, written down before anyone is tempted: nothing on this shelf goes above BHD 5."
          >
            <p>
              The ceiling is the positioning. The moment a BHD 9 serum appears, the shelf stops
              being &ldquo;the place daily essentials are sensibly priced&rdquo; and becomes another
              beauty shop competing on range, which we would lose. Bundles may exceed BHD 5; single
              units may not.
            </p>
            <p>
              Hold the headline prices publicly and discount through bundles and subscription, never
              the shelf price. Once BHD 1.750 has been advertised, BHD 1.950 reads as an increase
              forever.
            </p>
            <Table
              head={['Tier', 'Price band', 'Role']}
              rows={[
                ['Hooks', 'BHD 0.950–1.950', 'Lip balm, hand cream, deodorant, rosemary 100 ml — get the first order'],
                ['Core', 'BHD 2.250–3.450', 'The re-ordered middle: cleansers, washes, lotions, beard oil'],
                ['Ceiling', 'BHD 3.950–4.450', 'Serums and SPF — highest margin, slowest to re-order'],
                ['Bundles', 'BHD 4.950–11.950', 'Cross the free-delivery line and set the routine'],
              ]}
            />
          </Section>

          <Section
            n="09"
            title="Capital and the things that go wrong"
            lead="Consignment means the stock line nearly vanishes. What is left is compliance, marketing and a buffer."
          >
            <Table
              head={['Line', 'Launch outlay (BHD)']}
              rows={[
                ['CR, customs code, VAT registration', '≈ 350'],
                ['NHRA notification, first wave of 12 SKUs', '≈ 1,800'],
                ['Arabic artwork across 12 SKUs', '≈ 600'],
                ['Inbound freight and clearing, first cases', '≈ 900'],
                ['Owned stock — hero SKUs only, not the shelf', '≈ 1,200'],
                ['3PL deposit + 3 months storage', '≈ 450'],
                ['Site, payments, packaging', '≈ 700'],
                ['Brand acquisition (trade show, samples, travel)', '≈ 900'],
                ['Launch marketing, 10 weeks', '≈ 2,000'],
                ['Working-capital buffer', '≈ 1,500'],
                ['Total', '≈ 10,400'],
              ]}
              note="Roughly the same as the single-product plan, but it buys a 37-SKU shelf instead of three sizes of one bottle — because the stock line moved onto the brands."
            />
            <p className="font-medium text-sprig-ink">The five risks worth writing down:</p>
            <ul className="list-disc list-inside space-y-1.5 marker:text-leaf-500">
              <li>
                <strong>NHRA timing.</strong> Six to eight weeks per wave, and it gates revenue
                entirely. File the first wave before the storefront is finished, not after.
              </li>
              <li>
                <strong>Brand concentration.</strong> If three brands are 70% of the shelf, any one
                of them leaving is an extinction event. No brand above 25% of revenue past month
                six.
              </li>
              <li>
                <strong>Consigned stock damage.</strong> Heat, breakage or a mis-pick destroys
                someone else&rsquo;s property. Insure the warehoused value and agree the liability
                split in writing before the first case ships.
              </li>
              <li>
                <strong>Grey-market undercutting.</strong> Someone will fly product in as luggage
                and sell it on Instagram with no VAT and no notification. You cannot beat that on
                price — you beat it on next-day delivery, a real invoice, returns and traceability.
              </li>
              <li>
                <strong>Breadth without depth.</strong> Thirty-seven SKUs is a lot to photograph,
                describe, notify and forecast. Better twelve that re-order than forty that sit.
                Cut anything with no second order by month four.
              </li>
            </ul>
          </Section>

          <Section n="10" title="The first 120 days">
            <Table
              head={['Weeks', 'What happens']}
              rows={[
                ['1–2', 'CR with import + retail. Customs code and VAT registration. Build the brand target list of 40.'],
                ['3–5', 'First outreach wave. Sample parcels start arriving. Begin the 21-day testing protocol — including 45°C for 14 days.'],
                ['6–8', 'First verdicts out, to every brand including the refusals. Sign the first three consignment agreements. Appoint the authorised representative.'],
                ['9–10', 'File NHRA wave one (10–12 SKUs). Approve Arabic artwork. Sign the 3PL and the last-mile contract.'],
                ['11–14', 'Notification clears. First cases ship by air, repeat cases by sea. Photograph everything in Manama and replace the drawn pack art.'],
                ['15–17', 'Soft launch to a WhatsApp list plus a small paid test. Watch basket size and attachment rate, not traffic.'],
                ['18+', 'Outreach wave two off the back of a live shelf — far easier. Convert the top three SKUs from consignment to owned stock.'],
              ]}
            />
            <Callout title="The one metric to run this on">
              Not revenue, not SKU count — <strong>contribution per order after delivery</strong>.
              Above BHD 1.800 you can buy customers profitably and grow as fast as working capital
              allows. Below BHD 0.900 the basket is too small and no amount of traffic fixes it.
            </Callout>
          </Section>

          <footer className="border-t border-sprig-stone pt-6 text-[13px] text-sprig-ink/45 leading-relaxed">
            <p>
              Reference figures checked September–October 2026: 5% duty from the Bahrain Customs HS
              tariff, Chapter 33; 10% VAT from the NBR imports and exports guide; NHRA cosmetic
              notification requirement and timeline from NHRA and GCC regulatory summaries; freight
              from Indian consolidator and courier rate cards; last mile from published Bahraini
              courier and Bahrain Post rates. Consignment unit costs are planning assumptions, not
              quotes — every one is an estimate until a signed supply agreement sits behind it.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
