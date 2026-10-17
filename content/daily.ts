// ============================================================================
// DAILY.BH — Bahrain everyday beauty essentials, men and women
// ----------------------------------------------------------------------------
// Single source of truth for the catalogue, the brand-partner programme, and
// the three fulfilment models the business can run on. The storefront and the
// internal plan page both read from here — there is no second copy.
//
// ON THE BRANDS BELOW: `Alps Goodness` is a real brand whose Bahrain supply is
// already scoped (see docs/BAHRAIN_DROPSHIP_PLAN.md). Every other brand name
// here is a PLACEHOLDER house label standing in for a partner slot — they are
// invented, not real companies. Replace each one as a real brand signs, and
// keep `partnerStatus` honest: a product is only `stocked` once its NHRA
// notification is through and units are physically in the Manama 3PL.
//
// Reference figures checked Sep–Oct 2026. Every one is an estimate until a
// signed quote sits behind it.
// ============================================================================

export const FX = {
  /** BHD -> INR mid-market. Re-check before every purchase order. */
  bhdToInr: 254,
  /** BHD is pegged at 2.6525 USD. Price supply deals in USD and FX risk is theirs. */
  bhdToUsd: 2.6525,
  kwdToBhd: 1.223,
  aedToBhd: 0.1027,
};

export const TAX = {
  /** GCC Common External Tariff on HS Chapter 33 (cosmetics / toilet preparations). */
  customsDuty: 0.05,
  /** Bahrain standard VAT since 1 Jan 2022. Reclaimable at import once registered. */
  vat: 0.1,
};

export const OPS = {
  /** Local last-mile per order, Bahrain-wide 3PL contract rate. */
  lastMileBhd: 1.0,
  /** Last-mile once an own driver runs 25+ batched drops a day. */
  ownDriverBhd: 0.4,
  /** Pick, pack, mailer, thermal label — 3PL per-order fee. */
  fulfilmentBhd: 0.18,
  /** Card gateway: % of gross + fixed per transaction. */
  gatewayPct: 0.022,
  gatewayFixedBhd: 0.08,
  /** Cash-on-delivery collection and reconciliation. */
  codFeeBhd: 0.3,
  /** Breakage, returns and short-shipment reserve, % of net revenue. */
  shrinkagePct: 0.015,
  /** Free delivery over this basket value. */
  freeDeliveryOverBhd: 8.0,
  /** Flat delivery charged below the threshold. */
  deliveryFeeBhd: 0.9,
  /** Planning assumptions. */
  targetAovBhd: 11.5,
  targetCacBhd: 1.8,
};

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export interface Category {
  slug: string;
  name: string;
  nameAr: string;
  tagline: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'hair',
    name: 'Hair & Scalp',
    nameAr: 'الشعر وفروة الرأس',
    tagline: 'Wash, treat, and the daily leave-in.',
    blurb:
      'Shampoo, conditioner, scalp treatments and the rosemary water everybody came here for. Built around an every-other-day wash schedule and Bahraini water.',
  },
  {
    slug: 'skin',
    name: 'Skin',
    nameAr: 'البشرة',
    tagline: 'Cleanse, treat, moisturise, protect.',
    blurb:
      'Four steps, no more. Everything here works in Gulf heat and humidity — lightweight textures, no heavy occlusives, SPF on anything worn in daylight.',
  },
  {
    slug: 'body',
    name: 'Body & Bath',
    nameAr: 'الجسم والاستحمام',
    tagline: 'The unglamorous half of the routine.',
    blurb:
      'Wash, lotion, deodorant, hands and feet. The things that run out first and that nobody wants to pay a markup on.',
  },
  {
    slug: 'grooming',
    name: "Men's Grooming",
    nameAr: 'العناية بالرجل',
    tagline: 'Beard, shave, hair, done.',
    blurb:
      'A short, honest men’s shelf: beard care that is not just scented oil, shave products that actually buffer the blade, and one hair clay that holds in 40°C.',
  },
  {
    slug: 'fragrance',
    name: 'Fragrance',
    nameAr: 'العطور',
    tagline: 'Body mists and roll-ons, not retail-counter prices.',
    blurb:
      'Everyday wearable scent at everyday prices. Gulf-leaning notes — oud, amber, cedar, jasmine — in formats you can keep in a bag or a desk drawer.',
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

// ---------------------------------------------------------------------------
// Brands
// ---------------------------------------------------------------------------
export type PartnerStatus = 'stocked' | 'sampling' | 'incoming';

export interface Brand {
  slug: string;
  name: string;
  origin: string;
  /** Where this brand actually stands with us. Never inflate this. */
  status: PartnerStatus;
  note: string;
  /** True only for a real, existing company. Placeholders stay false. */
  real: boolean;
}

export const BRANDS: Brand[] = [
  {
    slug: 'alps-goodness',
    name: 'Alps Goodness',
    origin: 'India',
    status: 'stocked',
    note: 'Rosemary hydrosol and hair care. Supply route scoped; NHRA notification is the gate.',
    real: true,
  },
  {
    slug: 'sidra',
    name: 'Sidra',
    origin: 'Partner slot',
    status: 'stocked',
    note: 'Hair and scalp. Placeholder label held for a signing partner.',
    real: false,
  },
  {
    slug: 'nadeen',
    name: 'Nadeen',
    origin: 'Partner slot',
    status: 'stocked',
    note: 'Skin care. Placeholder label held for a signing partner.',
    real: false,
  },
  {
    slug: 'qamar',
    name: 'Qamar',
    origin: 'Partner slot',
    status: 'stocked',
    note: 'Body and bath. Placeholder label held for a signing partner.',
    real: false,
  },
  {
    slug: 'jarrah',
    name: 'Jarrah',
    origin: 'Partner slot',
    status: 'stocked',
    note: "Men's grooming. Placeholder label held for a signing partner.",
    real: false,
  },
  {
    slug: 'ruwad',
    name: 'Ruwad',
    origin: 'Partner slot',
    status: 'incoming',
    note: "Men's skin. Placeholder label held for a signing partner.",
    real: false,
  },
  {
    slug: 'layali',
    name: 'Layali',
    origin: 'Partner slot',
    status: 'stocked',
    note: "Women's fragrance. Placeholder label held for a signing partner.",
    real: false,
  },
  {
    slug: 'mithqal',
    name: 'Mithqal',
    origin: 'Partner slot',
    status: 'incoming',
    note: "Men's fragrance. Placeholder label held for a signing partner.",
    real: false,
  },
];

export const brandBySlug = (slug: string) => BRANDS.find((b) => b.slug === slug);

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
/** Drawn illustration treatment. Swap for studio photography once stock lands. */
export type Form = 'spray' | 'pump' | 'tube' | 'jar' | 'stick' | 'dropper' | 'refill' | 'box';
export type Audience = 'all' | 'women' | 'men';

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: string;
  audience: Audience;
  size: string;
  form: Form;
  /** Short label drawn on the pack when `size` will not fit. */
  artLabel?: string;
  tagline: string;
  blurb: string;
  benefits: string[];
  /** The one switch controlling whether a product can be bought. Only set
   *  `stocked` once NHRA notification is through and units are in the 3PL. */
  /** VAT-inclusive Bahrain shelf price. */
  priceBhd: number;
  /** Our landed cost per unit into the Manama 3PL under consignment terms. */
  costBhd: number;
  /** Struck-through reference — nearest comparable Gulf shelf price. */
  compareAtBhd?: number;
  partnerStatus: PartnerStatus;
  badge?: string;
  hero?: boolean;
  howToUse?: string[];
  bundleOf?: { slug: string; qty: number }[];
}

export const PRODUCTS: Product[] = [
  // ---------------------------------------------------------------- hair ---
  {
    slug: 'rosemary-water-100',
    name: 'Rosemary Water Spray',
    brand: 'alps-goodness',
    category: 'hair',
    audience: 'all',
    size: '100 ml',
    form: 'spray',
    tagline: 'The BHD 1.950 bottle. Nobody in the Gulf sells it for less.',
    blurb:
      'Steam-distilled rosemary hydrosol in a fine-mist spray. Ready to use — no steeping, no diluting, no silicones. Spray on scalp and lengths daily; leave in.',
    benefits: [
      'Steam-distilled rosemary leaf water — one ingredient family, no fillers',
      'Zero silicones, paraben-free, cruelty-free',
      'Calms an oily scalp and cuts build-up between washes',
      'Safe on colour- and keratin-treated hair',
    ],
    howToUse: [
      'Shake well.',
      'Spray 6–8 inches from clean, damp or dry hair.',
      'Work through the scalp with fingertips.',
      'Do not rinse. Use daily, morning or night.',
    ],
    priceBhd: 1.95,
    costBhd: 0.58,
    compareAtBhd: 3.67,
    partnerStatus: 'stocked',
    badge: 'Best seller',
    hero: true,
  },
  {
    slug: 'rosemary-water-200',
    name: 'Rosemary Water Spray',
    brand: 'alps-goodness',
    category: 'hair',
    audience: 'all',
    size: '200 ml',
    form: 'spray',
    tagline: 'Two months of daily use. The size most people re-order.',
    blurb:
      'The same steam-distilled rosemary hydrosol in the everyday size. Cheaper per millilitre than the 100 ml and still under BHD 3.',
    benefits: [
      '2× the volume for about 1.5× the price',
      'Fine-mist trigger — no drip, no waste',
      'Sealed, batch-coded, 24-month shelf life from manufacture',
    ],
    priceBhd: 2.95,
    costBhd: 1.03,
    compareAtBhd: 4.62,
    partnerStatus: 'stocked',
    badge: 'Best value',
    hero: true,
  },
  {
    slug: 'rosemary-water-305',
    name: 'Rosemary Water Refill',
    brand: 'alps-goodness',
    category: 'hair',
    audience: 'all',
    size: '305 ml',
    form: 'refill',
    tagline: 'Refill your spray bottle. Lowest price per ml on the island.',
    blurb:
      'A 305 ml refill for the spray bottle you already own. Under 1.3 fils per millilitre — the cheapest way to stay on the routine.',
    benefits: [
      'Cheapest per millilitre of anything we stock',
      'Refills a 100 ml spray three times over',
      'Less plastic per ml than buying sprays repeatedly',
    ],
    priceBhd: 3.75,
    costBhd: 1.17,
    compareAtBhd: 6.06,
    partnerStatus: 'stocked',
    badge: 'Lowest per ml',
    hero: true,
  },
  {
    slug: 'rosemary-rice-shampoo',
    name: 'Rosemary & Rice Shampoo',
    brand: 'sidra',
    category: 'hair',
    audience: 'all',
    size: '300 ml',
    form: 'pump',
    tagline: 'Sulphate-light, built for hard water.',
    blurb:
      'A low-lather daily shampoo with rosemary and rice water. Formulated to still clean properly in Bahrain’s hard tap water without stripping colour.',
    benefits: [
      'Sulphate-light — lathers less, rinses cleaner',
      'Holds up in hard water without a chelating pre-wash',
      'Safe every other day on treated hair',
    ],
    priceBhd: 2.85,
    costBhd: 1.05,
    partnerStatus: 'stocked',
  },
  {
    slug: 'daily-conditioner',
    name: 'Daily Slip Conditioner',
    brand: 'sidra',
    category: 'hair',
    audience: 'all',
    size: '300 ml',
    form: 'pump',
    tagline: 'Detangles without coating.',
    blurb:
      'A light conditioner that gives enough slip to get a comb through, then rinses out completely. No silicone build-up to fight later.',
    benefits: ['Silicone-free slip', 'Rinses clean — no weekly clarifying needed', 'pH-balanced for colour'],
    priceBhd: 2.85,
    costBhd: 1.05,
    partnerStatus: 'stocked',
  },
  {
    slug: 'scalp-serum',
    name: 'Scalp Density Serum',
    brand: 'sidra',
    category: 'hair',
    audience: 'all',
    size: '50 ml',
    form: 'dropper',
    tagline: 'The weekly step, not the daily one.',
    blurb:
      'A leave-on scalp serum for three nights a week. Pairs with the daily rosemary water rather than replacing it.',
    benefits: ['Three nights a week, not daily', 'Non-greasy — will not mark a pillow', 'Dropper applicator for parting-line use'],
    priceBhd: 3.45,
    costBhd: 1.3,
    partnerStatus: 'stocked',
  },
  {
    slug: 'dry-shampoo',
    name: 'Dry Shampoo',
    brand: 'sidra',
    category: 'hair',
    audience: 'women',
    size: '150 ml',
    form: 'spray',
    tagline: 'Buys you the day between washes.',
    blurb: 'A fine, non-chalky dry shampoo that does not leave a grey cast on dark hair — the usual failure in this category.',
    benefits: ['No white cast on dark hair', 'Rice starch base, no talc', 'Brush out in 60 seconds'],
    priceBhd: 2.65,
    costBhd: 1.0,
    partnerStatus: 'stocked',
  },

  // ---------------------------------------------------------------- skin ---
  {
    slug: 'gel-cleanser',
    name: 'Gentle Gel Cleanser',
    brand: 'nadeen',
    category: 'skin',
    audience: 'all',
    size: '150 ml',
    form: 'pump',
    tagline: 'Step one, twice a day, for everyone.',
    blurb:
      'A low-pH gel cleanser that removes sunscreen and sweat without the tight, squeaky feeling. The one product in the range nobody should skip.',
    benefits: ['Low pH — does not strip the barrier', 'Removes SPF without a double cleanse', 'Fragrance-free'],
    howToUse: ['Morning and night, on damp skin.', 'Massage 30 seconds.', 'Rinse with lukewarm water.'],
    priceBhd: 2.45,
    costBhd: 0.92,
    partnerStatus: 'stocked',
    hero: true,
  },
  {
    slug: 'niacinamide-serum',
    name: 'Niacinamide 5% Serum',
    brand: 'nadeen',
    category: 'skin',
    audience: 'all',
    size: '30 ml',
    form: 'dropper',
    tagline: 'The boring one that actually works.',
    blurb:
      '5% niacinamide — the concentration with evidence behind it, not the 10% that irritates. For oiliness, texture and post-spot marks.',
    benefits: ['5%, not 10% — effective without the flushing', 'Layers under sunscreen', 'No added fragrance or alcohol'],
    priceBhd: 3.95,
    costBhd: 1.45,
    partnerStatus: 'stocked',
  },
  {
    slug: 'moisturiser-spf30',
    name: 'Daily Moisturiser SPF 30',
    brand: 'nadeen',
    category: 'skin',
    audience: 'all',
    size: '50 ml',
    form: 'tube',
    tagline: 'Two steps collapsed into one, because you will skip the second.',
    blurb:
      'A light moisturiser with broad-spectrum SPF 30 and no white cast. In this climate the sunscreen step is the one that matters most and the one most people drop.',
    benefits: ['Broad-spectrum SPF 30', 'No white cast on medium and deep skin', 'Sits under makeup without pilling'],
    priceBhd: 4.25,
    costBhd: 1.62,
    partnerStatus: 'stocked',
    badge: 'Most re-ordered',
    hero: true,
  },
  {
    slug: 'hydrating-toner',
    name: 'Hyaluronic Hydrating Toner',
    brand: 'nadeen',
    category: 'skin',
    audience: 'women',
    size: '200 ml',
    form: 'spray',
    tagline: 'Damp skin holds everything else better.',
    blurb: 'A watery hydrating layer straight after cleansing. Not an astringent — there is no alcohol in it.',
    benefits: ['Alcohol-free', 'Apply to damp skin, follow immediately with moisturiser', 'Doubles as a midday mist'],
    priceBhd: 2.95,
    costBhd: 1.1,
    partnerStatus: 'stocked',
  },
  {
    slug: 'vitamin-c-serum',
    name: 'Vitamin C Brightening Serum',
    brand: 'nadeen',
    category: 'skin',
    audience: 'women',
    size: '30 ml',
    form: 'dropper',
    tagline: 'Mornings only, under sunscreen.',
    blurb: 'A stabilised vitamin C derivative that does not oxidise orange in a month. For dullness and uneven tone.',
    benefits: ['Stabilised — will not turn orange', 'Morning use, always under SPF', 'Opaque bottle, airless pump'],
    priceBhd: 4.45,
    costBhd: 1.7,
    partnerStatus: 'stocked',
  },
  {
    slug: 'lip-balm-spf',
    name: 'Lip Balm SPF 15',
    brand: 'nadeen',
    category: 'skin',
    audience: 'all',
    size: '4.5 g',
    form: 'stick',
    tagline: 'The under-a-dinar add-on.',
    blurb: 'Plain, effective lip balm with SPF 15. Priced to be the thing you add at checkout without thinking.',
    benefits: ['Under BHD 1', 'SPF 15', 'Unflavoured — no urge to lick it off'],
    priceBhd: 0.95,
    costBhd: 0.3,
    partnerStatus: 'stocked',
  },
  {
    slug: 'mens-face-wash',
    name: 'Daily Face Wash',
    brand: 'ruwad',
    category: 'skin',
    audience: 'men',
    size: '150 ml',
    form: 'pump',
    tagline: 'Not shower gel. Use it on your face.',
    blurb:
      'A face wash for oily and combination skin that cleans after a commute without the stripping that drives the oil straight back.',
    benefits: ['For oily and combination skin', 'No menthol sting', 'Also works as a pre-shave cleanse'],
    priceBhd: 2.25,
    costBhd: 0.85,
    partnerStatus: 'incoming',
  },
  {
    slug: 'mens-moisturiser',
    name: 'Oil-Control Moisturiser',
    brand: 'ruwad',
    category: 'skin',
    audience: 'men',
    size: '75 ml',
    form: 'tube',
    tagline: 'Matte in an hour, not shiny by noon.',
    blurb: 'A gel-cream for men who think moisturiser makes them greasy. It does not — the greasy ones were the wrong texture.',
    benefits: ['Gel-cream, absorbs in under a minute', 'Controls shine through the afternoon', 'Fragrance-light'],
    priceBhd: 2.95,
    costBhd: 1.12,
    partnerStatus: 'incoming',
  },

  // ---------------------------------------------------------------- body ---
  {
    slug: 'shea-body-lotion',
    name: 'Shea Body Lotion',
    brand: 'qamar',
    category: 'body',
    audience: 'all',
    size: '400 ml',
    form: 'pump',
    tagline: 'The big pump bottle that lives by the door.',
    blurb: 'A straightforward daily body lotion in the size that actually lasts. Absorbs before you finish getting dressed.',
    benefits: ['400 ml pump — about three months', 'Absorbs in under two minutes', 'Light, clean scent'],
    priceBhd: 2.65,
    costBhd: 0.98,
    partnerStatus: 'stocked',
    hero: true,
  },
  {
    slug: 'oud-body-wash',
    name: 'Oud & Amber Body Wash',
    brand: 'qamar',
    category: 'body',
    audience: 'all',
    size: '400 ml',
    form: 'pump',
    tagline: 'A Gulf scent profile at a supermarket price.',
    blurb: 'Warm oud and amber in a daily body wash. The fragrance lingers for about an hour, which is the point.',
    benefits: ['Oud and amber, not a generic floral', 'Sulphate-light', '400 ml'],
    priceBhd: 2.45,
    costBhd: 0.9,
    partnerStatus: 'stocked',
  },
  {
    slug: 'hand-cream',
    name: 'Hand Cream',
    brand: 'qamar',
    category: 'body',
    audience: 'all',
    size: '75 ml',
    form: 'tube',
    tagline: 'Desk drawer, handbag, glovebox.',
    blurb: 'Non-greasy hand cream for people who wash their hands fifteen times a day in air conditioning.',
    benefits: ['Non-greasy — you can use a keyboard after', 'Fits a pocket', 'Under BHD 1.5'],
    priceBhd: 1.25,
    costBhd: 0.44,
    partnerStatus: 'stocked',
  },
  {
    slug: 'coffee-body-scrub',
    name: 'Coffee Body Scrub',
    brand: 'qamar',
    category: 'body',
    audience: 'women',
    size: '200 g',
    form: 'jar',
    tagline: 'Twice a week, ten minutes before you rinse.',
    blurb: 'Ground coffee and sugar in an oil base. Messy, effective, and far cheaper than the salon version.',
    benefits: ['Coffee and sugar in oil', 'Twice a week maximum', 'Rinses without a slick residue'],
    priceBhd: 2.85,
    costBhd: 1.05,
    partnerStatus: 'stocked',
  },
  {
    slug: 'roll-on-deodorant',
    name: '48h Roll-On Deodorant',
    brand: 'qamar',
    category: 'body',
    audience: 'all',
    size: '50 ml',
    form: 'stick',
    tagline: 'Rated for a Bahraini August.',
    blurb: 'An aluminium-free roll-on that is still working at 4pm in July. Tested against the climate, not a lab bench.',
    benefits: ['Aluminium-free', 'Holds through a Gulf summer day', 'Dries without a white mark'],
    priceBhd: 1.45,
    costBhd: 0.5,
    partnerStatus: 'stocked',
  },
  {
    slug: 'deodorant-stick',
    name: 'Deodorant Stick',
    brand: 'qamar',
    category: 'body',
    audience: 'men',
    size: '50 g',
    form: 'stick',
    tagline: 'Solid stick, cedar and bergamot.',
    blurb: 'The solid format for people who dislike the wet feeling of a roll-on. Same 48-hour claim, same climate testing.',
    benefits: ['Solid stick, dries instantly', 'Cedar and bergamot', 'Aluminium-free'],
    priceBhd: 1.65,
    costBhd: 0.58,
    partnerStatus: 'stocked',
  },
  {
    slug: 'foot-cream',
    name: 'Foot Repair Cream',
    brand: 'qamar',
    category: 'body',
    audience: 'all',
    size: '100 ml',
    form: 'tube',
    tagline: 'Sandals all year has a cost.',
    blurb: 'A urea-based cream for cracked heels. Apply at night; it works while you are not walking on them.',
    benefits: ['10% urea', 'Night use — socks optional but help', 'Visible difference in about a week'],
    priceBhd: 2.15,
    costBhd: 0.78,
    partnerStatus: 'stocked',
  },
  {
    slug: 'sheet-mask-5',
    name: 'Sheet Mask, 5-pack',
    brand: 'qamar',
    category: 'body',
    audience: 'women',
    size: '5 × 25 ml',
    form: 'box',
    artLabel: '5-pack',
    tagline: 'Under 40 fils a mask.',
    blurb: 'Five hydrating sheet masks. Not a treatment, a twenty-minute top-up — priced so you use them rather than save them.',
    benefits: ['Five masks', 'Hyaluronic and panthenol', 'Keep them in the fridge'],
    priceBhd: 1.95,
    costBhd: 0.7,
    partnerStatus: 'sampling',
  },

  // ------------------------------------------------------------ grooming ---
  {
    slug: 'beard-oil',
    name: 'Beard Oil',
    brand: 'jarrah',
    category: 'grooming',
    audience: 'men',
    size: '30 ml',
    form: 'dropper',
    tagline: 'For the skin under it, not just the hair.',
    blurb:
      'A light beard oil that gets to the skin underneath, where the itch actually comes from. Jojoba-led so it does not sit on top.',
    benefits: ['Jojoba-led — absorbs rather than coats', 'Targets the skin, not just the hair', 'Three to five drops is the whole dose'],
    howToUse: ['Three to five drops in the palm.', 'Work into the skin under the beard first.', 'Then through the hair. Daily after a shower.'],
    priceBhd: 2.75,
    costBhd: 1.0,
    partnerStatus: 'stocked',
    hero: true,
  },
  {
    slug: 'beard-wash',
    name: 'Beard Wash',
    brand: 'jarrah',
    category: 'grooming',
    audience: 'men',
    size: '200 ml',
    form: 'pump',
    tagline: 'Shampoo is too harsh. Body wash is worse.',
    blurb: 'A dedicated beard wash — gentler than scalp shampoo, which is why beards washed with shampoo go wiry.',
    benefits: ['Gentler than scalp shampoo', 'Three times a week, not daily', 'Follow with the oil while damp'],
    priceBhd: 2.45,
    costBhd: 0.9,
    partnerStatus: 'stocked',
  },
  {
    slug: 'shave-gel',
    name: 'Clear Shave Gel',
    brand: 'jarrah',
    category: 'grooming',
    audience: 'men',
    size: '200 ml',
    form: 'tube',
    tagline: 'Clear, so you can see the line you are cutting.',
    blurb: 'A transparent shave gel that buffers the blade properly. Essential if you edge a beard rather than shave clean.',
    benefits: ['Transparent — you can see the edge', 'Cushions the blade, cuts razor burn', 'Rinses off the razor cleanly'],
    priceBhd: 2.25,
    costBhd: 0.82,
    partnerStatus: 'stocked',
  },
  {
    slug: 'post-shave-balm',
    name: 'Post-Shave Balm',
    brand: 'jarrah',
    category: 'grooming',
    audience: 'men',
    size: '100 ml',
    form: 'tube',
    tagline: 'No alcohol. The sting was never the point.',
    blurb: 'An alcohol-free balm that calms the skin instead of punishing it. The sting in traditional aftershave is damage, not disinfection.',
    benefits: ['Alcohol-free — no sting', 'Calms razor burn within minutes', 'Light enough to wear under SPF'],
    priceBhd: 2.65,
    costBhd: 0.95,
    partnerStatus: 'stocked',
  },
  {
    slug: 'matte-hair-clay',
    name: 'Matte Hair Clay',
    brand: 'jarrah',
    category: 'grooming',
    audience: 'men',
    size: '100 g',
    form: 'jar',
    tagline: 'Holds at 40°C. Most products do not.',
    blurb: 'A matte clay with a high enough melting point to survive a Bahraini summer. Washes out with one shampoo.',
    benefits: ['Does not slide out in the heat', 'Matte, not wet-look', 'One wash to remove'],
    priceBhd: 2.95,
    costBhd: 1.08,
    partnerStatus: 'stocked',
  },
  {
    slug: 'trimmer-care-kit',
    name: 'Trimmer Care Kit',
    brand: 'jarrah',
    category: 'grooming',
    audience: 'men',
    size: 'Oil, brush, cloth',
    form: 'box',
    artLabel: 'Care kit',
    tagline: 'Your trimmer dies from neglect, not use.',
    blurb: 'Blade oil, a cleaning brush and a microfibre cloth. Two minutes a month roughly doubles how long a trimmer lasts.',
    benefits: ['Blade oil, brush and cloth', 'Two minutes a month', 'Fits every common trimmer'],
    priceBhd: 3.45,
    costBhd: 1.3,
    partnerStatus: 'sampling',
  },

  // ----------------------------------------------------------- fragrance ---
  {
    slug: 'mist-jasmine',
    name: 'Body Mist — Night Jasmine',
    brand: 'layali',
    category: 'fragrance',
    audience: 'women',
    size: '250 ml',
    form: 'spray',
    tagline: 'Wearable, not a statement.',
    blurb: 'Jasmine over a soft musk. A body mist that lasts about three hours, which is right for an office day.',
    benefits: ['Three-hour wear', 'Alcohol-light — less drying', '250 ml, not a 50 ml counter bottle'],
    priceBhd: 2.35,
    costBhd: 0.85,
    partnerStatus: 'stocked',
  },
  {
    slug: 'mist-oud-rose',
    name: 'Body Mist — Oud Rose',
    brand: 'layali',
    category: 'fragrance',
    audience: 'women',
    size: '250 ml',
    form: 'spray',
    tagline: 'The Gulf pairing, done lightly.',
    blurb: 'Rose and oud, kept deliberately light so it works in daytime heat rather than only at night.',
    benefits: ['Rose and oud, daytime weight', 'Three-hour wear', 'Layers over the body lotion'],
    priceBhd: 2.35,
    costBhd: 0.85,
    partnerStatus: 'stocked',
  },
  {
    slug: 'spray-cedar',
    name: 'Body Spray — Cedar',
    brand: 'mithqal',
    category: 'fragrance',
    audience: 'men',
    size: '200 ml',
    form: 'spray',
    tagline: 'Dry cedar. Not a sports-brand body spray.',
    blurb: 'Dry cedar with a little black pepper. Grown-up, cheap, and not the aerosol everyone wore at school.',
    benefits: ['Cedar and black pepper', 'Non-aerosol pump', 'Gym bag sized'],
    priceBhd: 2.25,
    costBhd: 0.8,
    partnerStatus: 'incoming',
  },
  {
    slug: 'roll-on-perfume-oil',
    name: 'Roll-On Perfume Oil',
    brand: 'mithqal',
    category: 'fragrance',
    audience: 'men',
    size: '10 ml',
    form: 'stick',
    tagline: 'Pocket-sized, six hours, no spray.',
    blurb: 'An oil-based roll-on — longer wear than a mist, and no aerosol to carry through an airport.',
    benefits: ['Six-hour wear from an oil base', 'Cabin-bag friendly', 'Pulse points only — it is concentrated'],
    priceBhd: 2.95,
    costBhd: 1.05,
    partnerStatus: 'incoming',
  },

  // ------------------------------------------------------------- bundles ---
  {
    slug: 'sampler-box',
    name: 'Starter Sampler Box',
    brand: 'nadeen',
    category: 'skin',
    audience: 'all',
    size: '6 minis',
    form: 'box',
    artLabel: 'Sampler',
    tagline: 'Try six before you commit to one.',
    blurb:
      'Six travel sizes across hair, skin and body — the products partner brands sent us to test, in the sizes they sent them. The cheapest way to find what works on you.',
    benefits: [
      'Six travel sizes across three categories',
      'Mixed men’s and women’s — tell us at checkout',
      'Credit the full BHD 4.950 against your first full-size order',
    ],
    priceBhd: 4.95,
    costBhd: 1.55,
    partnerStatus: 'stocked',
    badge: 'Start here',
    hero: true,
  },
  {
    slug: 'her-daily-five',
    name: 'Her Daily Five',
    brand: 'nadeen',
    category: 'skin',
    audience: 'women',
    size: 'Five full sizes',
    form: 'box',
    artLabel: 'Daily 5',
    tagline: 'Cleanser, SPF, rosemary water, lotion, lip balm.',
    blurb: 'The five things that get used every single day, bought together at a lower price than the five separately.',
    benefits: ['Free delivery', 'Saves BHD 1.300 against buying separately', 'The whole daily routine in one box'],
    priceBhd: 11.95,
    costBhd: 4.4,
    compareAtBhd: 13.25,
    partnerStatus: 'stocked',
    badge: 'Free delivery',
    bundleOf: [
      { slug: 'gel-cleanser', qty: 1 },
      { slug: 'moisturiser-spf30', qty: 1 },
      { slug: 'rosemary-water-200', qty: 1 },
      { slug: 'shea-body-lotion', qty: 1 },
      { slug: 'lip-balm-spf', qty: 1 },
    ],
  },
  {
    slug: 'his-daily-five',
    name: 'His Daily Five',
    brand: 'ruwad',
    category: 'grooming',
    audience: 'men',
    size: 'Five full sizes',
    form: 'box',
    artLabel: 'Daily 5',
    tagline: 'Face wash, moisturiser, beard oil, deodorant, body wash.',
    blurb: 'The entire men’s shelf in one order. If you have never bought any of this, start here rather than guessing.',
    benefits: ['Free delivery', 'Saves BHD 0.600 against buying separately', 'Nothing in it you will not use'],
    priceBhd: 11.45,
    costBhd: 4.25,
    compareAtBhd: 12.55,
    partnerStatus: 'incoming',
    badge: 'Free delivery',
    bundleOf: [
      { slug: 'mens-face-wash', qty: 1 },
      { slug: 'mens-moisturiser', qty: 1 },
      { slug: 'beard-oil', qty: 1 },
      { slug: 'deodorant-stick', qty: 1 },
      { slug: 'oud-body-wash', qty: 1 },
    ],
  },
  {
    slug: 'hair-reset-kit',
    name: 'Hair Reset Kit',
    brand: 'sidra',
    category: 'hair',
    audience: 'all',
    size: 'Three full sizes',
    form: 'box',
    artLabel: 'Hair kit',
    tagline: 'Wash, condition, leave in. Six weeks of it.',
    blurb: 'Shampoo, conditioner and the 200 ml rosemary water — the complete hair routine, which is the only way to judge whether it works.',
    benefits: ['Free delivery', 'Six weeks of the full routine', 'Saves BHD 0.700'],
    priceBhd: 7.95,
    costBhd: 3.13,
    compareAtBhd: 8.65,
    partnerStatus: 'stocked',
    badge: 'Free delivery',
    bundleOf: [
      { slug: 'rosemary-rice-shampoo', qty: 1 },
      { slug: 'daily-conditioner', qty: 1 },
      { slug: 'rosemary-water-200', qty: 1 },
    ],
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsInCategory = (slug: string) => PRODUCTS.filter((p) => p.category === slug);
export const productsFor = (audience: Audience) =>
  PRODUCTS.filter((p) => p.audience === audience || (audience !== 'all' && p.audience === 'all'));

// ---------------------------------------------------------------------------
// Unit economics
// ---------------------------------------------------------------------------
export interface Margin {
  cost: number;
  /** Shelf price stripped of the 10% VAT we remit. */
  netRevenue: number;
  grossProfit: number;
  grossMarginPct: number;
}

export function marginFor(p: Product): Margin {
  const netRevenue = p.priceBhd / (1 + TAX.vat);
  const grossProfit = netRevenue - p.costBhd;
  return {
    cost: p.costBhd,
    netRevenue,
    grossProfit,
    grossMarginPct: (grossProfit / netRevenue) * 100,
  };
}

/** Catalogue-wide blended gross margin, as a fraction of net revenue. */
export function blendedGrossMargin(products: Product[] = PRODUCTS) {
  const sum = products.reduce((a, p) => a + marginFor(p).grossMarginPct / 100, 0);
  return sum / products.length;
}

/**
 * Order-level contribution.
 *
 * `basket` is the VAT-inclusive value of the goods, before any delivery fee.
 * Cost of goods comes from the blended gross margin, so the model stays
 * consistent whatever mix the basket is.
 */
export function orderContribution(
  basket: number,
  lastMile: number = OPS.lastMileBhd,
  marginFraction: number = blendedGrossMargin()
) {
  const net = basket / (1 + TAX.vat);
  const cogs = net * (1 - marginFraction);
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
// Fulfilment models — the central decision for this business
// ---------------------------------------------------------------------------
export interface FulfilmentModel {
  id: 'cross-border' | 'consignment' | 'own-stock';
  name: string;
  how: string;
  capital: string;
  speed: string;
  marginNote: string;
  /** Shipping + clearing cost attributable to one BHD 11.5 order. */
  perOrderLogisticsBhd: number;
  nhra: string;
  verdict: 'no' | 'yes' | 'later';
  verdictNote: string;
}

export const FULFILMENT_MODELS: FulfilmentModel[] = [
  {
    id: 'cross-border',
    name: 'Cross-border dropship',
    how: 'Customer orders; the brand or an overseas agent ships one parcel direct to the Bahraini address.',
    capital: 'None — no stock, no warehouse.',
    speed: '10–21 days, customer-visible.',
    marginNote: 'Negative on most orders. Courier alone exceeds the goods value.',
    perOrderLogisticsBhd: 8.5,
    nhra: 'Not satisfied. Each parcel is a commercial import of an unnotified cosmetic.',
    verdict: 'no',
    verdictNote:
      'The model everyone means by "dropshipping", and the one that does not work here. A BHD 11.500 basket carries roughly BHD 8.500 of courier, duty, VAT and per-parcel clearing — before the goods. Worse, NHRA notification is required before a cosmetic is placed on the Bahraini market, and a direct-to-consumer parcel from an unregistered foreign seller does not satisfy it. Customs can hold or return the parcel, and the liability is ours, not the brand’s.',
  },
  {
    id: 'consignment',
    name: 'Consignment — local dropship',
    how: 'The brand ships one bulk case into our Manama 3PL and keeps title. We sell, the 3PL ships same-day, the brand invoices us only on units sold.',
    capital: 'Near zero — we pay for goods after they sell.',
    speed: 'Same day in Manama, next day island-wide.',
    marginNote: '55–65% gross. One clearance covers hundreds of units.',
    perOrderLogisticsBhd: 1.18,
    nhra: 'Satisfied — one notification per SKU, filed before the case ships.',
    verdict: 'yes',
    verdictNote:
      'The model to build on. It keeps what you actually want from dropshipping — no inventory capital, the brand supplies the goods — while clearing customs once per shipment instead of once per order, and giving the customer a next-day delivery they will re-order against. The brand carries the stock risk; we carry the demand risk. This is a normal consignment arrangement and brands that already want sampling distribution will understand it.',
  },
  {
    id: 'own-stock',
    name: 'Buy and hold',
    how: 'We purchase a container or pallet outright at wholesale, clear it, and own the stock.',
    capital: 'BHD 8,000–15,000 tied up per cycle.',
    speed: 'Same day in Manama.',
    marginNote: '62–70% gross — the highest of the three.',
    perOrderLogisticsBhd: 1.18,
    nhra: 'Satisfied — one notification per SKU.',
    verdict: 'later',
    verdictNote:
      'Where the best SKUs end up. Once a product has three months of steady re-order data, buying it outright adds roughly 8 points of gross margin over consignment. Do it per-SKU on proven winners, not across the catalogue — the point of the consignment shelf is that unproven products cost nothing to carry.',
  },
];

// ---------------------------------------------------------------------------
// Brand partner programme — the public pitch
// ---------------------------------------------------------------------------
export const PARTNER_OFFER = [
  {
    title: 'Send samples, not stock',
    body: 'Two to three units per SKU, by courier, at your cost. No fee, no listing charge, no minimum. We test, photograph and write it up — whether or not we end up stocking it.',
  },
  {
    title: 'An honest verdict in 21 days',
    body: 'A written assessment of the product against what already sits on our shelf: formulation, pack, price position and whether it survives a Bahraini summer. You get it even if the answer is no.',
  },
  {
    title: 'We handle Bahrain',
    body: 'NHRA cosmetic notification, Arabic labelling, customs clearance, VAT, warehousing and last-mile delivery. You ship one case to one address and we take it from there.',
  },
  {
    title: 'Consignment terms',
    body: 'You keep title until the unit sells. We invoice monthly on units sold at the agreed consignment price. No purchase order to negotiate and no stock sitting on our balance sheet or yours.',
  },
  {
    title: 'Your product in front of a routine',
    body: 'We sell daily essentials, not one-off treats. A customer who buys a cleanser from us buys it again in eight weeks. That is the audience your sample is being tested for.',
  },
  {
    title: 'Numbers you can see',
    body: 'Monthly sell-through by SKU, re-order rate, basket attachment and what customers actually said. Not a vanity dashboard — the data you would need to decide whether Bahrain is worth a bigger push.',
  },
];

export const PARTNER_STEPS = [
  {
    n: '01',
    title: 'Tell us what you make',
    body: 'The form below, or an email with a line card. We only need the category, the formats and your consignment price — not a full dossier.',
  },
  {
    n: '02',
    title: 'Send two or three units',
    body: 'Per SKU, to our Manama address, marked as commercial samples of no commercial value. We will send you the exact customs wording so nothing gets held.',
  },
  {
    n: '03',
    title: 'We test for three weeks',
    body: 'Real use by real people in this climate, plus a desk review of the ingredient list, the claims and the pack. Heat stability is where most imports fail.',
  },
  {
    n: '04',
    title: 'You get the verdict either way',
    body: 'A yes comes with a proposed shelf price, the consignment price we can work to, and a first case size. A no comes with the reason, which is usually price position or a claim we cannot legally run in Bahrain.',
  },
  {
    n: '05',
    title: 'Notification, then the first case',
    body: 'We file the NHRA cosmetic notification — six to eight working weeks — and approve Arabic artwork with you. Only then does the first case ship.',
  },
];

export const PARTNER_FAQ = [
  {
    q: 'Do you charge a listing fee or ask for marketing money?',
    a: 'No. We make money on the margin between your consignment price and our shelf price, and nowhere else. If the product does not sell, neither of us earns — which is the right incentive and the reason we are picky about what we accept.',
  },
  {
    q: 'What happens to the samples if you say no?',
    a: 'We keep them and use them, or pass them to staff. We do not sell samples, and we do not return them — return courier on two units costs more than the units. That is the deal, and it is why we ask for two or three rather than a case.',
  },
  {
    q: 'Will you say something positive about our product because we sent it?',
    a: 'No, and you should not want us to. Every write-up states plainly that the product was supplied free for testing. A shelf where every review is positive is a shelf nobody trusts, which makes it worthless to you as a channel.',
  },
  {
    q: 'Who pays for NHRA registration?',
    a: 'We do, and we hold the notification through our Bahraini entity as your authorised representative. You supply the documents — ingredient breakdown, GMP certificate, free-sale certificate — which cost you nothing but admin time.',
  },
  {
    q: 'How big is the first case?',
    a: 'Usually 100 to 300 units across two or three SKUs. Small enough that your downside is one pallet of stock in a warehouse you do not pay for; large enough that the per-unit clearing cost is a few fils.',
  },
  {
    q: 'Can we sell in Bahrain through other channels at the same time?',
    a: 'Yes by default. We will ask for category exclusivity only where we are putting real money behind a launch, and then it is time-boxed and written down with a volume commitment on our side.',
  },
  {
    q: 'What if the product fails in the heat?',
    a: 'It is the single most common failure and we test for it specifically — 45°C for 14 days, plus a van run in August. Emulsions split, sticks slump, fragrances turn. Better that it fails in our office than in a customer’s car.',
  },
];

// ---------------------------------------------------------------------------
// Storefront copy
// ---------------------------------------------------------------------------
export const PROMISES = [
  {
    title: 'Everything under BHD 5',
    body: 'Daily essentials priced like daily essentials. The most expensive single item on the shelf is BHD 4.450.',
  },
  {
    title: 'Stocked in Manama',
    body: 'Not a 14-day parcel from abroad. Order before 2pm and it ships the same day, anywhere in Bahrain.',
  },
  {
    title: 'Free delivery over BHD 8',
    body: 'Below that it is a flat BHD 0.900. Cash on delivery, BenefitPay and card all accepted.',
  },
  {
    title: 'NHRA-notified, Arabic-labelled',
    body: 'Every product cleared properly through customs with a readable batch and expiry. Not grey-market parcels.',
  },
];

export const SHOP_FAQ = [
  {
    q: 'How are you cheaper than everywhere else?',
    a: 'Two reasons. We import by the case and clear customs once, instead of flying single parcels in per order. And most of our shelf is on consignment, so we are not paying to warehouse stock that has not sold yet. Neither saving comes out of the product.',
  },
  {
    q: 'Is this dropshipping? Will my order come from abroad?',
    a: 'No. Everything on the site is physically in a warehouse in Manama before you can order it. Nothing ships to you from overseas, which is why it arrives tomorrow and not in three weeks.',
  },
  {
    q: 'Some brands here say "in testing". What does that mean?',
    a: 'It means exactly that — a brand has sent us samples and we are three weeks into assessing them. Those products are not on sale yet. We show them because we would rather be honest about what is coming than pretend the shelf is bigger than it is.',
  },
  {
    q: 'Are the products genuine?',
    a: 'Yes. Everything arrives direct from the brand or its appointed manufacturer against a commercial invoice, is cleared through Bahrain Customs, and carries the manufacturer batch number and a readable expiry date.',
  },
  {
    q: 'How fast is delivery?',
    a: 'Same day within Manama for orders placed before 2pm, next day everywhere else in Bahrain. You get a tracking link on WhatsApp when the driver collects.',
  },
  {
    q: 'Can I pay cash?',
    a: 'Yes — cash on delivery in Bahraini Dinar, or card and BenefitPay at the door. Card online works too.',
  },
  {
    q: 'What if something does not suit my skin?',
    a: 'Tell us within 14 days and we refund it, opened or not. We would rather lose one sale than have you stop trusting the shelf. Patch-test anything new, and if you have a diagnosed skin condition, ask a doctor rather than us.',
  },
  {
    q: 'Do you review products you were sent for free?',
    a: 'We do, and we say so on the product page every time. A free sample buys a brand an honest test, not a good write-up.',
  },
];
