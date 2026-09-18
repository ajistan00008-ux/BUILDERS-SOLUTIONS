import type { Metadata } from 'next';
import Link from 'next/link';
import { MarginModel } from '../../../components/rosemary/MarginModel';

export const metadata: Metadata = {
  title: 'Trade plan — buying in India, delivering in Bahrain',
  description:
    'How ROSEMARY.BH sources rosemary water in India, imports it into Bahrain, clears customs, and delivers to the customer — with the landed cost and margin behind the BHD 1.950 price.',
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
  /** Let a section (the margin model) use the full column instead of a reading measure. */
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
        className={`space-y-4 text-[15px] leading-relaxed text-sprig-ink/75 ${
          wide ? '' : 'max-w-3xl'
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function Table({
  head,
  rows,
  note,
}: {
  head: string[];
  rows: (string | number)[][];
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-sprig-stone bg-white overflow-hidden not-prose">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] min-w-[520px]">
          <thead className="bg-leaf-50 text-sprig-ink/70">
            <tr>
              {head.map((h, i) => (
                <th
                  key={h}
                  className={`px-3.5 py-2.5 font-medium whitespace-nowrap ${
                    i === 0 ? 'text-left' : 'text-right'
                  }`}
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
                      ci === 0
                        ? 'text-left text-sprig-ink'
                        : 'text-right tabular-nums text-sprig-ink/75'
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
      {note && <p className="px-3.5 py-2.5 text-[12px] text-sprig-ink/45 border-t border-sprig-stone">{note}</p>}
    </div>
  );
}

function Callout({ tone = 'leaf', title, children }: { tone?: 'leaf' | 'clay'; title: string; children: React.ReactNode }) {
  const styles =
    tone === 'clay'
      ? 'border-sprig-clay/30 bg-sprig-clay/5'
      : 'border-leaf-200 bg-leaf-50';
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
          Internal · trade plan
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-sprig-ink mt-2">
          Buy it in India. Deliver it in Bahrain. Keep the margin.
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-sprig-ink/70">
          This is the operating plan behind the storefront: who we buy from, how the goods reach
          Manama, what the government takes at the border, what it costs to put a bottle in a
          customer&rsquo;s hand, and what is left. The numbers are live — they come from the same
          file the shop prices itself from.
        </p>
        <Link
          href="/rosemary"
          className="mt-6 inline-flex items-center gap-2 text-[14px] text-leaf-700 hover:text-leaf-800 font-medium"
        >
          ← Back to the shop
        </Link>
      </header>

      <div className="grid lg:grid-cols-[200px_1fr] gap-10">
        <nav className="hidden lg:block sticky top-24 self-start text-[13px] space-y-2">
          {[
            ['01', 'Supply'],
            ['02', 'Compliance'],
            ['03', 'Freight'],
            ['04', 'Customs & VAT'],
            ['05', 'Warehouse'],
            ['06', 'Last mile'],
            ['07', 'The model'],
            ['08', 'Pricing ladder'],
            ['09', 'Cash & risk'],
            ['10', 'First 90 days'],
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
            title="Who we buy from, and at what price"
            lead="There are three ways to source this product. Only one of them supports a BHD 1.950 shelf price, and it is the one that takes the longest to set up."
          >
            <Table
              head={['Route', 'Price per 100 ml', 'Lead time', 'Verdict']}
              rows={[
                ['Retail arbitrage (Nykaa, Amazon.in)', '₹199–207', '3–5 days', 'Fine for samples. Never for stock.'],
                ['Indian wholesaler / super-stockist', '₹135–150', '1–2 weeks', 'Workable fallback. ~35% off MRP.'],
                ['Brand owner direct — export terms', '₹105–125', '3–5 weeks', 'The target. 45–55% off MRP.'],
              ]}
              note="Indian MRP for the 100 ml is ₹230; the brand's own site sells it at ₹199."
            />
            <p>
              The brand is owned by <strong>Manash Lifestyle Pvt. Ltd.</strong> (Mumbai) and made by{' '}
              <strong>Naturis Cosmetics Pvt. Ltd.</strong> in Samba, J&amp;K. Approach the brand
              owner&rsquo;s exports desk, not the factory — the factory is a contract manufacturer and
              cannot sell you the brand.
            </p>
            <p>What to put in the supply agreement, in order of how much it is worth:</p>
            <ul className="list-disc list-inside space-y-1.5 marker:text-leaf-500">
              <li>
                <strong>Exclusive Bahrain distribution</strong> for 24 months against a minimum
                annual volume. Exclusivity is what stops a competitor undercutting you next year.
              </li>
              <li>
                <strong>Ex-works price at 45–55% off MRP</strong>, in USD, fixed for 12 months.
                Price the deal in USD — BHD is pegged to USD, so this removes the currency risk
                entirely and leaves it with them.
              </li>
              <li>
                <strong>Export documentation set</strong> per shipment: commercial invoice, packing
                list, certificate of origin, free-sale certificate, GMP certificate, full ingredient
                breakdown, and a Bahrain-compliant artwork file.
              </li>
              <li>
                <strong>Minimum 18 months residual shelf life</strong> on arrival, and batch codes
                that survive the sea lane.
              </li>
              <li>
                <strong>An authorisation letter naming your Bahrain entity</strong> as the
                authorised importer. You cannot register the product without this, so get it before
                you pay a deposit.
              </li>
            </ul>
            <Callout title="Terms to push for">
              First order: 50% advance, 50% against scan of the bill of lading. From order three:
              30/70, or a documentary LC at sight if the volume justifies the bank charges. Never
              pay 100% in advance to a supplier you have not received goods from.
            </Callout>
          </Section>

          <Section
            n="02"
            title="Getting legal in Bahrain before the first carton moves"
            lead="This is the part that decides whether you launch in eight weeks or eight months. Start it on day one; it runs in parallel with everything else."
          >
            <Table
              head={['What', 'Who', 'Time', 'Rough cost']}
              rows={[
                ['CR with import/export + retail activity', 'MOIC (Sijilat)', '1–2 weeks', 'BHD 50–300'],
                ['Customs importer code (OFOQ)', 'Bahrain Customs', 'Days', 'Nominal'],
                ['VAT registration', 'NBR', '1–2 weeks', 'Free'],
                ['Cosmetic product notification', 'NHRA', '30–40 working days', 'Per-SKU fee'],
                ['Arabic label / artwork approval', 'NHRA + MOIC', 'With the above', 'Artwork cost'],
              ]}
            />
            <p>
              <strong>NHRA registration is the long pole.</strong> Cosmetics must be notified before
              they can be cleared or sold, the application goes in through a Bahrain-established
              authorised representative, and it takes six to eight working weeks. File the moment
              you have the authorisation letter and the ingredient breakdown — do not wait for the
              supply agreement to be signed.
            </p>
            <p>
              <strong>VAT registration is optional but you want it.</strong> It is mandatory above
              BHD 37,500 of annual turnover and voluntary above BHD 18,750. Register voluntarily
              from the start: the 10% VAT you pay at the border becomes reclaimable input tax
              instead of a cost, which is worth roughly 6 fils on every 100 ml bottle.
            </p>
            <Callout tone="clay" title="Two claims to fix before the label goes to NHRA">
              Some third-party listings of this product carry a &ldquo;20% minoxidil&rdquo; line.
              That is a marketplace listing error, not the formulation — but a cosmetic notification
              carrying a drug claim gets rejected, and a drug claim on a Bahraini shelf is a
              regulatory problem, not a marketing one. Keep every claim cosmetic: appearance of
              thickness, scalp freshness, frizz. No &ldquo;treats hair loss&rdquo;, no
              &ldquo;minoxidil&rdquo;, no before-and-after medical framing.
            </Callout>
          </Section>

          <Section
            n="03"
            title="How the goods actually move"
            lead="This single decision is worth more than every marketing choice combined. Air freight costs about 530 fils per 100 ml bottle. Sea costs about 9."
          >
            <Table
              head={['Lane', 'Rate', 'Per 100 ml unit', 'Transit', 'Use it for']}
              rows={[
                ['Courier (DHL/FedEx, <30 kg)', '₹950–2,300/kg', '~BHD 0.85', '2–4 days', 'Samples, NHRA dossier, emergency top-ups'],
                ['Air consolidated (50–100 kg)', '₹700–900/kg', '~BHD 0.53', '4–7 days', 'Launch stock, stock-outs'],
                ['Sea LCL (1 CBM+)', '~USD 550–650/CBM all-in', '~BHD 0.094', '18–28 days', 'Every repeat order'],
                ['Sea FCL 20ft', 'USD 1,400–2,200', '~BHD 0.03', '18–28 days', 'Once you sell 2,000+ units a month'],
              ]}
              note="All-in figures include origin charges, destination THC, clearance and delivery to a Manama warehouse. 1 CBM holds roughly 2,500 × 100 ml bottles."
            />
            <p>
              <strong>The plan is therefore split.</strong> Fly the first 60–80 kg so the shop can
              open and NHRA has physical samples; put everything after that on the water. The sea
              lane is Nhava Sheva or Mundra to Khalifa Bin Salman Port, consolidated by an Indian
              freight forwarder with a Bahrain clearing agent at the other end.
            </p>
            <p>
              Because the lead time is four to six weeks door to door, you are always ordering for a
              demand you have not seen yet. Hold eight weeks of cover and re-order at four. A
              hydrosol with a 24-month shelf life forgives over-ordering far more cheaply than a
              stock-out costs you.
            </p>
            <Callout title="Export paperwork on the Indian side">
              File a Letter of Undertaking so exports go out <strong>zero-rated for GST</strong> —
              otherwise 18% GST sits in your cost until you claw it back. You need an IEC code, an
              AD Code registered at the port, and a shipping bill per consignment. If the supplier
              exports for you on FOB terms, they handle this and you handle freight onward; if you
              buy ex-works, you need an Indian forwarder to do it.
            </Callout>
          </Section>

          <Section
            n="04"
            title="What the border takes"
            lead="Bahrain applies the GCC common external tariff. Cosmetics sit in HS Chapter 33 at a flat 5%, and VAT is charged on top of the duty-inclusive value."
          >
            <Table
              head={['Line', 'Basis', 'Rate', 'On a 100 ml bottle']}
              rows={[
                ['Customs duty', 'CIF value', '5%', 'BHD 0.027'],
                ['Import VAT', 'CIF + duty', '10%', 'BHD 0.060 — reclaimable'],
                ['Clearance & handling', 'Per consignment', '—', 'Under 1 fils at volume'],
              ]}
              note="HS 3307.90 / 3305.90 depending on how the product is presented. Get a binding ruling from Bahrain Customs on the first shipment so the classification never moves."
            />
            <p>
              Duty is a real cost. Import VAT is not, once you are registered — you pay it at the
              border, reclaim it on the return, and charge 10% to the customer which you then remit.
              The storefront quotes VAT-inclusive prices because that is what Bahraini shoppers
              expect to see.
            </p>
          </Section>

          <Section
            n="05"
            title="Where the stock sits"
            lead="Bahrain is 780 square kilometres. You do not need a distribution network; you need one air-conditioned room and a shelf."
          >
            <ul className="list-disc list-inside space-y-1.5 marker:text-leaf-500">
              <li>
                <strong>Start:</strong> 20–30 m² of racked, air-conditioned storage in Sitra or
                Tubli, roughly BHD 80–150 a month. Hydrosol degrades in heat — a non-conditioned
                unit in a Bahraini August will cost you the batch.
              </li>
              <li>
                <strong>Scale:</strong> move to a 3PL that does pick-pack and hands over to the
                courier. Around BHD 0.12–0.20 an order, and it buys back the founder&rsquo;s
                evenings.
              </li>
              <li>
                <strong>Discipline:</strong> FEFO picking, batch and expiry logged at goods-in, a
                monthly count. A cosmetics recall you cannot trace to a batch is an existential
                problem, not an inconvenience.
              </li>
            </ul>
          </Section>

          <Section
            n="06"
            title="Getting it to the customer"
            lead="Roughly a dinar an order, whether the basket is one bottle or six. Everything about the pricing follows from that one fact."
          >
            <Table
              head={['Option', 'Cost per order', 'Speed', 'COD']}
              rows={[
                ['Local Bahraini 3PL (e.g. Oreem, Wasel)', 'From BHD 1.000', 'Same day', 'Yes, settled in BHD'],
                ['Aramex Bahrain domestic', 'BHD 1.200–2.000', 'Next day', 'Yes'],
                ['Bahrain Post local parcel (≤2 kg)', 'BHD 1.200', '2–3 days', 'No'],
                ['Own driver, batched routes', '~BHD 0.400 at 25+ drops/day', 'Same day', 'Yes'],
              ]}
            />
            <p>
              Start with a local 3PL on a monthly contract, and offer cash on delivery from day one
              — it is still around an eighth of Bahraini e-commerce payments and it removes the
              trust objection for a first-time buyer of a cheap import. Add BenefitPay next; cards
              third.
            </p>
            <Callout tone="clay" title="The uncomfortable arithmetic of a BHD 1.950 order">
              <p>
                One bottle sold at BHD 1.950 with <em>free</em> delivery loses money: net revenue is
                BHD 1.773, landed cost takes 0.622, and the last mile alone takes a full dinar —
                about −BHD 0.149 an order. Charge the flat BHD 0.900 below the threshold and the
                same order contributes BHD 0.732, which is real but still short of a BHD 1.200
                acquisition cost.
              </p>
              <p className="mt-2">
                So the BHD 1.950 headline is a customer-acquisition price, not a profit centre. It
                pays for itself on the second order, and only then. Every piece of merchandising on
                the site — bundles, the refill twin, subscription — exists to move the basket above
                BHD 5.000, where an order contributes BHD 1.65 and clears acquisition on the first
                purchase. Do not let anyone quietly make delivery free on a single bottle.
              </p>
            </Callout>

            <Callout title="A known 13-fils cliff at the free-delivery line">
              A basket at BHD 3.900 contributes BHD 1.813; one at BHD 5.250 contributes BHD 1.681,
              because crossing BHD 5.000 hands us the whole dinar of delivery. The line only breaks
              even again at about BHD 5.500. We keep the threshold at 5.000 anyway, because almost
              no real basket lands at 3.900 — the natural steps are 1.950, 2.950 and 4.900, all of
              which improve sharply when pulled over the line. If contribution tightens, raise the
              threshold to BHD 5.500 before touching the shelf price.
            </Callout>
          </Section>

          <Section
            n="07"
            wide
            title="The model, with the levers exposed"
            lead="Move the discount, the freight lane and the basket size and watch the margin respond. These are the only three numbers that matter."
          >
            <div className="not-prose">
              <MarginModel />
            </div>
          </Section>

          <Section
            n="08"
            title="The pricing ladder"
            lead="Priced from the bottom up — BHD 1.950 is the anchor the customer remembers, and everything above it is engineered to be the obviously better buy."
          >
            <Table
              head={['SKU', 'Our price', 'Nearest Gulf shelf', 'Undercut']}
              rows={[
                ['100 ml spray', 'BHD 1.950', 'BHD 3.670 (Kuwait)', '−47%'],
                ['200 ml spray', 'BHD 2.950', 'BHD 4.620 (UAE, like-for-like)', '−36%'],
                ['305 ml refill', 'BHD 3.750', 'BHD 6.060 (UAE, 475 ml)', '−38% (−4% per ml)'],
                ['Spray + refill duo', 'BHD 5.250', '— (no equivalent)', 'Free delivery'],
                ['Refill saver twin', 'BHD 6.950', '— (no equivalent)', 'Lowest per ml on the island'],
              ]}
            />
            <p>
              The ladder does three things at once. It gives you a price nobody in the region can
              advertise against. It makes the refill — your highest-margin, lowest-freight,
              most-repeatable SKU — the obviously rational choice. And it puts the free-delivery
              line at BHD 5.000, exactly where a second item has to join the basket.
            </p>
            <p>
              Hold the BHD 1.950 line publicly. Discount through bundles and subscription instead,
              never through the headline price: once you have advertised BHD 1.750, BHD 1.950 reads
              as an increase forever.
            </p>
          </Section>

          <Section
            n="09"
            title="Cash, and the things that go wrong"
            lead="A 65% gross margin does not protect you from running out of money in month four."
          >
            <Table
              head={['Line', 'Launch outlay (BHD)']}
              rows={[
                ['First order: 3,000 × 100 ml + 1,500 × 200 ml + 800 refill, FOB', '≈ 3,850'],
                ['Air freight for the launch 80 kg', '≈ 240'],
                ['Sea LCL for the balance, all-in', '≈ 620'],
                ['Duty + clearance', '≈ 250'],
                ['CR, NHRA notification, artwork, legal', '≈ 900'],
                ['Warehouse deposit + 3 months', '≈ 450'],
                ['Site, payments setup, packaging', '≈ 700'],
                ['Launch marketing, 8 weeks', '≈ 1,500'],
                ['Working-capital buffer', '≈ 1,500'],
                ['Total', '≈ 10,000'],
              ]}
              note="Indicative. The stock line is the one that moves most with the negotiated discount."
            />
            <p className="font-medium text-sprig-ink">The five risks worth writing down:</p>
            <ul className="list-disc list-inside space-y-1.5 marker:text-leaf-500">
              <li>
                <strong>NHRA delay.</strong> Six to eight weeks, and it gates everything. File
                first, negotiate second. Do not let stock arrive before the notification is in.
              </li>
              <li>
                <strong>Losing distribution.</strong> Without exclusivity, your own success invites
                the next importer. Get 24 months in writing or accept you are renting the market.
              </li>
              <li>
                <strong>Grey-market undercutting.</strong> Someone will fly bottles in as personal
                luggage and sell them on Instagram at BHD 1.500 with no VAT and no duty. You cannot
                beat that on price; you beat it on same-day delivery, a real invoice, returns, and
                batch traceability. Say so on the site.
              </li>
              <li>
                <strong>Heat.</strong> Non-conditioned storage or an uninsulated van in August
                degrades hydrosol. Condition the warehouse, and do not let a 3PL leave stock on a
                loading bay.
              </li>
              <li>
                <strong>Freight shock.</strong> Red Sea and Gulf routing disruptions have doubled
                container rates twice in recent years. Keep eight weeks of cover and price in USD so
                only one variable can move at a time.
              </li>
            </ul>
          </Section>

          <Section n="10" title="The first ninety days">
            <Table
              head={['Weeks', 'What happens']}
              rows={[
                ['1–2', 'Incorporate / extend CR with import + retail. Approach the brand owner. Order retail samples for photography and the dossier.'],
                ['3–4', 'Agree heads of terms and the authorisation letter. Appoint the Bahrain authorised representative. Register for VAT and the customs importer code.'],
                ['5–6', 'File the NHRA cosmetic notification. Sign the supply agreement. Place PO #1. Approve Arabic artwork.'],
                ['7–9', 'Air the launch 80 kg; book the LCL balance. Sign the warehouse and the 3PL. Take real product photography in Manama and swap out the drawn artwork.'],
                ['10–12', 'NHRA clears. Stock lands and is counted in. Soft launch to a WhatsApp list and a small paid test. Watch basket size, not traffic.'],
                ['13+', 'Re-order on the sea lane before you think you need to. Launch subscription on the 305 ml refill. Only then widen the range.'],
              ]}
            />
            <Callout title="The one metric to run the business on">
              Not revenue, not traffic — <strong>contribution per order after delivery</strong>. If
              that number is above BHD 1.200 you can buy customers profitably and grow as fast as
              working capital allows. If it drops below BHD 0.600, the basket is too small and no
              amount of traffic will fix it.
            </Callout>
          </Section>

          <footer className="border-t border-sprig-stone pt-6 text-[13px] text-sprig-ink/45 leading-relaxed">
            <p>
              Reference figures checked September 2026: Indian MRP and selling prices from the
              brand&rsquo;s own site and Apollo Pharmacy; Gulf shelf prices from Kuwaiti, UAE and
              Bahraini online retailers; 5% duty from the Bahrain Customs HS tariff, Chapter 33; 10%
              VAT from the NBR imports and exports guide; freight from Indian consolidator and
              courier rate cards; last-mile from published Bahraini courier and Bahrain Post rates.
              FX at 254 INR per BHD. Every one of these is an estimate until you have a signed quote
              against it — re-verify before committing cash.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
