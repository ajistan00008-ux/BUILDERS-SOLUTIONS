// ============================================================================
// ROSEMARY.BH — Bahrain storefront catalogue + landed-cost model
// ----------------------------------------------------------------------------
// Single source of truth for: retail prices (BHD, VAT-inclusive), the India ->
// Bahrain landed-cost build-up, and the competitor benchmark table.
//
// Every number below is an INPUT you can renegotiate. The derived margins on
// /rosemary/plan recompute from these constants, so update here and the whole
// model moves.
//
// Sources for the reference figures (checked Sep 2026):
//  - Alps Goodness India MRP / selling price: alpsgoodness.com, Apollo Pharmacy
//  - Bahrain duty 5% on HS Ch.33, VAT 10% on CIF+duty: Bahrain Customs / NBR
//  - India->Bahrain freight: consolidator air ~INR 700-900/kg; LCL sea per CBM
//  - Bahrain last-mile ~BHD 1.000/order (local 3PL), Bahrain Post parcel 1.200
// ============================================================================

// ---------------------------------------------------------------------------
// Macro constants
// ---------------------------------------------------------------------------
export const FX = {
  /** BHD -> INR mid-market, Sep 2026. Re-check before every purchase order. */
  bhdToInr: 254,
  /** BHD -> USD (BHD is pegged at 2.6525 USD). */
  bhdToUsd: 2.6525,
  /** 1 KWD in BHD — used to restate Kuwaiti shelf prices. */
  kwdToBhd: 1.223,
  /** 1 AED in BHD — used to restate UAE shelf prices. */
  aedToBhd: 0.1027,
};

export const TAX = {
  /** GCC Common External Tariff on HS Chapter 33 (cosmetics / toilet waters). */
  customsDuty: 0.05,
  /** Bahrain standard VAT since 1 Jan 2022. Reclaimable at import once registered. */
  vat: 0.10,
  /** Marine / all-risk cargo insurance, % of (FOB + freight). */
  insurance: 0.005,
};

export const OPS = {
  /** Local last-mile per order, Bahrain-wide 3PL contract rate. */
  lastMileBhd: 1.0,
  /** Pick, pack, mailer, thermal label. */
  fulfilmentBhd: 0.15,
  /** Card gateway: % of gross + fixed per transaction. */
  gatewayPct: 0.022,
  gatewayFixedBhd: 0.08,
  /** Cash-on-delivery collection + reconciliation fee. */
  codFeeBhd: 0.3,
  /** Breakage, returns and short-shipment reserve, % of net revenue. */
  shrinkagePct: 0.015,
  /** Free-delivery threshold shown on the storefront. */
  freeDeliveryOverBhd: 5.0,
  /** Flat delivery charged below the threshold. */
  deliveryFeeBhd: 0.9,
  /** Planning assumptions used on the margin page. */
  targetAovBhd: 5.2,
  targetCacBhd: 1.2,
  /** Last-mile if we batch routes with our own driver rather than a 3PL. */
  ownDriverBhd: 0.4,
};

// ---------------------------------------------------------------------------
// SKUs
// ---------------------------------------------------------------------------
export type Lane = 'sea' | 'air';

export interface Sku {
  slug: string;
  name: string;
  nameAr: string;
  size: string;
  /** Short shelf-edge line. */
  tagline: string;
  blurb: string;
  /** Indian MRP in INR — the anchor we buy against. */
  mrpInr: number;
  /** Negotiated ex-works / FOB India price per unit, INR, net of GST (LUT export). */
  fobInr: number;
  /** Our VAT-inclusive Bahrain shelf price. */
  priceBhd: number;
  /** Struck-through "market" reference price (nearest GCC shelf equivalent). */
  compareAtBhd?: number;
  /** Per-unit inbound freight, BHD, by lane. */
  freight: Record<Lane, number>;
  /** Gross shipping weight per unit, kg (carton share included). */
  unitKg: number;
  unitsPerCarton: number;
  /** Illustration treatment. */
  art: 'spray' | 'refill' | 'dropper' | 'pump';
  /** Short label drawn on the bottle when `size` is too long to fit. */
  artLabel?: string;
  hero?: boolean;
  badge?: string;
  benefits: string[];
  howToUse?: string[];
  /** Bundle contents, by slug. Bundles have no freight/fob of their own. */
  bundleOf?: { slug: string; qty: number }[];
}

export const SKUS: Sku[] = [
  {
    slug: 'rosemary-water-100',
    name: 'Rosemary Water Spray',
    nameAr: 'بخاخ ماء إكليل الجبل',
    size: '100 ml',
    tagline: 'The BHD 1.950 bottle. Nobody in the Gulf sells it for less.',
    blurb:
      'Steam-distilled rosemary hydrosol in a fine-mist spray. Ready to use — no steeping, no diluting, no silicones. Spray on scalp and lengths daily; leave in.',
    mrpInr: 230,
    fobInr: 115,
    priceBhd: 1.95,
    compareAtBhd: 3.67,
    freight: { sea: 0.094, air: 0.53 },
    unitKg: 0.18,
    unitsPerCarton: 48,
    art: 'spray',
    hero: true,
    badge: 'Best seller',
    benefits: [
      'Steam-distilled rosemary leaf water — one ingredient family, no fillers',
      'Zero silicones, paraben-free, cruelty-free',
      'Calms an oily scalp and cuts build-up between washes',
      'Daily leave-in — works on colour- and keratin-treated hair',
    ],
    howToUse: [
      'Shake well.',
      'Spray 6–8 inches from clean, damp or dry hair.',
      'Work through the scalp with fingertips.',
      'Do not rinse. Use daily, morning or night.',
    ],
  },
  {
    slug: 'rosemary-water-200',
    name: 'Rosemary Water Spray',
    nameAr: 'بخاخ ماء إكليل الجبل',
    size: '200 ml',
    tagline: 'Two months of daily use. The size most people re-order.',
    blurb:
      'The same steam-distilled rosemary hydrosol in the everyday size. Works out cheaper per millilitre than the 100 ml and still lands under BHD 3.',
    mrpInr: 399,
    fobInr: 200,
    priceBhd: 2.95,
    compareAtBhd: 4.62,
    freight: { sea: 0.189, air: 0.94 },
    unitKg: 0.32,
    unitsPerCarton: 24,
    art: 'spray',
    hero: true,
    badge: 'Best value',
    benefits: [
      '2× the volume for about 1.5× the price',
      'Same fine-mist trigger — no drip, no waste',
      'Sealed, batch-coded, 24-month shelf life from manufacture',
      'Ships free when your basket passes BHD 5.000',
    ],
    howToUse: [
      'Shake well.',
      'Spray 6–8 inches from clean, damp or dry hair.',
      'Work through the scalp with fingertips.',
      'Do not rinse. Use daily, morning or night.',
    ],
  },
  {
    slug: 'rosemary-water-305',
    name: 'Rosemary Water Refill',
    nameAr: 'عبوة تعبئة ماء إكليل الجبل',
    size: '305 ml',
    tagline: 'Refill your spray bottle. Lowest price per ml on the island.',
    blurb:
      'A 305 ml refill pack for the spray bottle you already own. Under 1.3 fils per millilitre — the cheapest way to stay on the routine.',
    mrpInr: 425,
    fobInr: 213,
    priceBhd: 3.75,
    compareAtBhd: 6.06,
    freight: { sea: 0.269, air: 1.36 },
    unitKg: 0.46,
    unitsPerCarton: 24,
    art: 'refill',
    hero: true,
    badge: 'Lowest per ml',
    benefits: [
      'Cheapest per millilitre of anything we stock',
      'Refills any 100 ml or 200 ml spray bottle three times over',
      'Less plastic per ml than buying sprays repeatedly',
      'The subscription SKU — set it and forget it',
    ],
    howToUse: [
      'Unscrew the trigger head from your spray bottle.',
      'Pour in, leaving a finger of headroom.',
      'Re-seal the refill cap and store away from direct sun.',
    ],
  },
  {
    slug: 'rosemary-essential-oil',
    name: 'Pure Rosemary Essential Oil',
    nameAr: 'زيت إكليل الجبل العطري',
    size: '30 ml',
    tagline: 'Undiluted. For oiling nights and carrier-oil blends.',
    blurb:
      'Steam-distilled rosemary essential oil, undiluted. Blend 3–5 drops into a carrier oil for a weekly scalp massage — the concentrated partner to the daily spray.',
    mrpInr: 199,
    fobInr: 100,
    priceBhd: 1.75,
    freight: { sea: 0.03, air: 0.18 },
    unitKg: 0.06,
    unitsPerCarton: 72,
    art: 'dropper',
    benefits: [
      'Undiluted steam-distilled oil — never use neat on skin',
      '3–5 drops per tablespoon of carrier oil',
      'Amber glass with an integrated dropper',
    ],
  },
  {
    slug: 'rosemary-hair-oil',
    name: 'Rosemary Hair Oil',
    nameAr: 'زيت شعر إكليل الجبل',
    size: '100 ml',
    tagline: 'The pre-wash half of the routine.',
    blurb:
      'A pre-blended rosemary scalp oil for the night before a wash. Non-sticky base, rinses out clean, pairs with the daily leave-in spray.',
    mrpInr: 289,
    fobInr: 145,
    priceBhd: 2.45,
    freight: { sea: 0.09, air: 0.44 },
    unitKg: 0.16,
    unitsPerCarton: 48,
    art: 'pump',
    benefits: [
      'Pre-blended — no measuring, no mixing',
      'Light base that actually washes out',
      'Use twice a week, 30–60 minutes before shampoo',
    ],
  },
  {
    slug: 'rosemary-foaming-shampoo',
    name: 'Rosemary Foaming Shampoo',
    nameAr: 'شامبو رغوي بإكليل الجبل',
    size: '150 ml',
    tagline: 'Keeps the routine on-brand all the way through the shower.',
    blurb:
      'A cloud-textured foaming shampoo with rosemary, rice water and amla. Gentle enough for the every-other-day wash schedule the spray assumes.',
    mrpInr: 250,
    fobInr: 125,
    priceBhd: 2.35,
    freight: { sea: 0.13, air: 0.62 },
    unitKg: 0.21,
    unitsPerCarton: 36,
    art: 'pump',
    benefits: [
      'Foam pump — no over-pouring',
      'Rosemary + rice water + amla',
      'Sulphate-light, safe for treated hair',
    ],
  },
  {
    slug: 'fermented-rice-water',
    name: 'Fermented Rice Water',
    nameAr: 'ماء الأرز المخمر',
    size: '200 ml',
    tagline: 'The other half of the viral rinse.',
    blurb:
      'Fermented rice water in the same spray format. Alternate with rosemary water, or layer them — rice for slip and shine, rosemary for the scalp.',
    mrpInr: 225,
    fobInr: 113,
    priceBhd: 1.95,
    freight: { sea: 0.189, air: 0.94 },
    unitKg: 0.32,
    unitsPerCarton: 24,
    art: 'spray',
    benefits: [
      'Ready-fermented — none of the smell of a home batch',
      'Layer over rosemary water on damp hair',
      'Same trigger spray, same 200 ml size',
    ],
  },
  // --- Bundles -------------------------------------------------------------
  {
    slug: 'duo-spray-refill',
    name: 'Spray + Refill Duo',
    nameAr: 'مجموعة البخاخ وعبوة التعبئة',
    size: '100 ml + 305 ml',
    artLabel: '405 ml',
    tagline: 'Buy the bottle once. Refill it for a year.',
    blurb:
      'The 100 ml spray to start with and the 305 ml refill behind it. Crosses the free-delivery line on its own.',
    mrpInr: 655,
    fobInr: 328,
    priceBhd: 5.25,
    compareAtBhd: 5.7,
    freight: { sea: 0.363, air: 1.89 },
    unitKg: 0.64,
    unitsPerCarton: 12,
    art: 'refill',
    badge: 'Free delivery',
    bundleOf: [
      { slug: 'rosemary-water-100', qty: 1 },
      { slug: 'rosemary-water-305', qty: 1 },
    ],
    benefits: [
      'Free delivery — clears the BHD 5.000 threshold',
      'Works out to roughly 1.3 fils per ml',
      'One spray head, 405 ml of hydrosol',
    ],
  },
  {
    slug: 'growth-ritual-kit',
    name: 'Growth Ritual Kit',
    nameAr: 'طقم روتين النمو',
    size: '200 ml spray + 100 ml oil + 30 ml essential oil',
    artLabel: '3-step kit',
    tagline: 'Daily spray, weekly oiling, one concentrate.',
    blurb:
      'The full three-step routine: leave-in spray every day, pre-wash oil twice a week, and undiluted essential oil to boost either one.',
    mrpInr: 887,
    fobInr: 445,
    priceBhd: 6.5,
    compareAtBhd: 7.15,
    freight: { sea: 0.309, air: 1.56 },
    unitKg: 0.54,
    unitsPerCarton: 12,
    art: 'pump',
    badge: 'Free delivery',
    bundleOf: [
      { slug: 'rosemary-water-200', qty: 1 },
      { slug: 'rosemary-hair-oil', qty: 1 },
      { slug: 'rosemary-essential-oil', qty: 1 },
    ],
    benefits: [
      'Free delivery',
      'Every step of the routine in one box',
      'Cheaper than the three bought separately',
    ],
  },
  {
    slug: 'refill-saver-twin',
    name: 'Refill Saver Twin',
    nameAr: 'عبوتا تعبئة موفرتان',
    size: '2 × 305 ml',
    artLabel: '610 ml',
    tagline: 'Six months of daily use, delivered free.',
    blurb:
      'Two 305 ml refills. The lowest cost-per-millilitre order we take, and the one we would rather you subscribed to.',
    mrpInr: 850,
    fobInr: 426,
    priceBhd: 6.95,
    compareAtBhd: 7.5,
    freight: { sea: 0.538, air: 2.72 },
    unitKg: 0.92,
    unitsPerCarton: 12,
    art: 'refill',
    badge: 'Free delivery',
    bundleOf: [{ slug: 'rosemary-water-305', qty: 2 }],
    benefits: [
      'Free delivery',
      '610 ml — about six months of daily spraying',
      'Subscribe and take a further 10% off',
    ],
  },
];

export const bySlug = (slug: string) => SKUS.find((s) => s.slug === slug);

export const CORE_SLUGS = [
  'rosemary-water-100',
  'rosemary-water-200',
  'rosemary-water-305',
];

// ---------------------------------------------------------------------------
// Landed-cost maths
// ---------------------------------------------------------------------------
export interface CostLine {
  fob: number;
  freight: number;
  insurance: number;
  cif: number;
  duty: number;
  landed: number;
  /** Shelf price stripped of the 10% VAT we remit. */
  netRevenue: number;
  grossProfit: number;
  grossMarginPct: number;
  /** Import VAT paid at the border — reclaimable once VAT-registered. */
  importVat: number;
}

export function costFor(sku: Sku, lane: Lane = 'sea'): CostLine {
  const fob = sku.fobInr / FX.bhdToInr;
  const freight = sku.freight[lane];
  const insurance = (fob + freight) * TAX.insurance;
  const cif = fob + freight + insurance;
  const duty = cif * TAX.customsDuty;
  const landed = cif + duty;
  const importVat = (cif + duty) * TAX.vat;
  const netRevenue = sku.priceBhd / (1 + TAX.vat);
  const grossProfit = netRevenue - landed;
  return {
    fob,
    freight,
    insurance,
    cif,
    duty,
    landed,
    netRevenue,
    grossProfit,
    grossMarginPct: (grossProfit / netRevenue) * 100,
    importVat,
  };
}

/**
 * Blended gross margin across the three SKUs that carry the volume. Expressed
 * as a fraction of net revenue so it holds at any basket value.
 */
export function blendedGrossMargin(lane: Lane = 'sea', discountPct?: number) {
  const cores = CORE_SLUGS.map((slug) => {
    const sku = bySlug(slug)!;
    return discountPct == null
      ? sku
      : { ...sku, fobInr: Math.round(sku.mrpInr * (1 - discountPct / 100)) };
  });
  const sum = cores.reduce((a, s) => a + costFor(s, lane).grossMarginPct / 100, 0);
  return sum / cores.length;
}

/**
 * Order-level contribution.
 *
 * `basket` is the VAT-inclusive value of the goods, before any delivery fee.
 * Cost of goods is derived from the blended gross margin rather than a per-unit
 * average, so the model stays self-consistent whatever mix the basket is.
 */
export function orderContribution(
  basket: number,
  lastMile: number = OPS.lastMileBhd,
  lane: Lane = 'sea',
  discountPct?: number
) {
  const net = basket / (1 + TAX.vat);
  const cogs = net * (1 - blendedGrossMargin(lane, discountPct));
  // Below the threshold the customer pays a delivery fee, so only the shortfall
  // is ours. Above it, the whole last-mile cost lands on us.
  const feeCharged = basket >= OPS.freeDeliveryOverBhd ? 0 : OPS.deliveryFeeBhd;
  const delivery = lastMile - feeCharged;
  const payments = (basket + feeCharged) * OPS.gatewayPct + OPS.gatewayFixedBhd;
  const shrink = net * OPS.shrinkagePct;
  const contribution = net - cogs - delivery - OPS.fulfilmentBhd - payments - shrink;
  return {
    net,
    cogs,
    delivery,
    feeCharged,
    fulfilment: OPS.fulfilmentBhd,
    payments,
    shrink,
    contribution,
    contributionPct: (contribution / net) * 100,
    afterCac: contribution - OPS.targetCacBhd,
  };
}

// ---------------------------------------------------------------------------
// Competitor benchmarks — what a Bahraini shopper pays today
// ---------------------------------------------------------------------------
export interface Benchmark {
  seller: string;
  where: string;
  product: string;
  size: string;
  listed: string;
  bhd: number;
  note: string;
}

export const BENCHMARKS: Benchmark[] = [
  {
    seller: 'Ubuy Bahrain',
    where: 'Import marketplace',
    product: 'AVEYA rosemary + batana growth spray',
    size: '60 ml',
    listed: 'KWD 21.000',
    bhd: 21 * FX.kwdToBhd,
    note: 'Ships from abroad, duty and handling rolled into the price.',
  },
  {
    seller: 'whlsome',
    where: 'GCC online',
    product: 'Mamaearth rosemary water',
    size: '200 ml',
    listed: 'AED 93.00',
    bhd: 93 * FX.aedToBhd,
    note: 'Indian brand, GCC import markup of roughly 9×.',
  },
  {
    seller: 'LOOKFANTASTIC AE',
    where: 'UAE online',
    product: 'As I Am rosemary water',
    size: '475 ml',
    listed: 'AED 59.00',
    bhd: 59 * FX.aedToBhd,
    note: 'US brand, cross-border delivery to Bahrain adds more.',
  },
  {
    seller: 'Mohajer',
    where: 'UAE online',
    product: 'Bare Anatomy rosemary water',
    size: '200 ml',
    listed: 'AED 44.99',
    bhd: 44.99 * FX.aedToBhd,
    note: 'Closest like-for-like Indian competitor in the Gulf.',
  },
  {
    seller: 'Makeup in Kuwait',
    where: 'Kuwait online',
    product: 'Alps rosemary water spray',
    size: '100 ml',
    listed: 'KWD 3.000',
    bhd: 3 * FX.kwdToBhd,
    note: 'Same product, same size — the number we undercut.',
  },
  {
    seller: 'ROSEMARY.BH',
    where: 'Bahrain, in stock',
    product: 'Rosemary water spray',
    size: '100 ml',
    listed: 'BHD 1.950',
    bhd: 1.95,
    note: 'Held in Bahrain, delivered same or next day, VAT included.',
  },
];

// ---------------------------------------------------------------------------
// Storefront copy
// ---------------------------------------------------------------------------
export const PROMISES = [
  {
    title: 'Under BHD 2 a bottle',
    body: 'The 100 ml spray is BHD 1.950 including VAT. The nearest Gulf shelf price for the same bottle is BHD 3.670.',
  },
  {
    title: 'Stocked in Bahrain',
    body: 'We hold inventory in Manama. Order before 2pm and it ships the same day, anywhere on the island.',
  },
  {
    title: 'Free delivery over BHD 5',
    body: 'Below that it is a flat BHD 0.900. Cash on delivery and BenefitPay both accepted.',
  },
  {
    title: 'Sealed and batch-coded',
    body: 'Every bottle arrives factory-sealed with a readable batch and expiry, imported through customs, not a grey parcel.',
  },
];

export const FAQ = [
  {
    q: 'How is it this much cheaper than everywhere else in the Gulf?',
    a: 'We import it ourselves by sea container instead of buying it through a re-seller, and we hold it in Bahrain. Every step another party takes out of the chain is a markup that is not in our price. Nothing about the product is different — same manufacturer, same factory seal, same batch codes.',
  },
  {
    q: 'Is it genuine?',
    a: 'Yes. It is imported in commercial quantities against a supplier invoice and cleared through Bahrain Customs under HS Chapter 33. Every carton carries the manufacturer batch number, and every bottle shows a manufacturing and expiry date you can read.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Same day within Manama for orders placed before 2pm, next day everywhere else in Bahrain. You get a tracking link by WhatsApp when the driver picks it up.',
  },
  {
    q: 'What does it actually do?',
    a: 'It is steam-distilled rosemary hydrosol — rosemary leaf water, ready to use. People use it daily on the scalp for build-up and oiliness, and on lengths for frizz. It is a cosmetic, not a medicine, and it is not minoxidil. Give it six to eight weeks of consistent daily use before you judge it.',
  },
  {
    q: 'Is it safe on coloured or keratin-treated hair?',
    a: 'Yes. There are no silicones and no harsh solvents, so it does not strip colour or lift a keratin treatment.',
  },
  {
    q: 'Can I pay cash?',
    a: 'Yes — cash on delivery in Bahraini Dinar, or card and BenefitPay at the door. Card online works too.',
  },
  {
    q: 'What if the bottle arrives damaged?',
    a: 'Tell us within 48 hours with a photo and we replace it on the next run, no return needed. Unopened bottles can be returned within 14 days.',
  },
];
