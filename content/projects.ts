// ============================================================================
// PROJECTS — real reference projects where TBS / group products were supplied.
// Source: AlliedGulf group data. Imagery is on the group's own Sanity CDN.
// Presented as "where our products are used" (supply references), NOT as TBS's
// own construction projects.
// ============================================================================

export interface Project {
  slug: string;
  name: string;
  client?: string;
  location: string;
  sector: string;
  scope?: string[];
  summary?: string;
  brandPartners?: string[];
  cover: { src: string; alt: string; width?: number; height?: number };
  featured?: boolean;
}

const SANITY = 'https://cdn.sanity.io/images/ffdvrpe4/production';

// Curated sector filters shown as chips (data may contain more sectors than this;
// those still appear under "All").
export const SECTORS = ['Hospitality', 'Retail', 'Education', 'Commercial', 'F&B', 'Residential'];

export const projects: Project[] = [
  {
    slug: 'four-seasons-bahrain-bay',
    name: 'Four Seasons Hotels and Resorts',
    client: 'Four Seasons',
    location: 'Bahrain Bay',
    sector: 'Hospitality',
    scope: ['Stainless steel tile trims (BCR UK)'],
    brandPartners: ['BCR UK LTD'],
    summary: 'Supplied stainless steel tile trims across the property.',
    cover: { src: `${SANITY}/f8be5516c68af5e31bae62e91f36499b462dd5e1-930x523.webp`, alt: 'Four Seasons Bahrain Bay', width: 1980, height: 848 },
    featured: true,
  },
  {
    slug: 'marassi-galleria-mall',
    name: 'Marassi Galleria Mall',
    client: 'Marassi',
    location: 'Bahrain',
    sector: 'Retail',
    cover: { src: `${SANITY}/a19d92d202dbdb3d57d0cb32510bf67e5cbd728a-1980x848.jpg`, alt: 'Marassi Galleria Mall' },
    featured: true,
  },
  {
    slug: 'new-exhibition-convention-center',
    name: 'New Exhibition & Convention Center',
    location: 'Bahrain',
    sector: 'Commercial',
    cover: { src: `${SANITY}/987f3066638d702d9aaf64f29d1716ea945562cd-1980x848.jpg`, alt: 'New Exhibition and Convention Center' },
    featured: true,
  },
  {
    slug: 'al-dana-amphitheater',
    name: 'Al-Dana Amphitheater',
    location: 'Bahrain',
    sector: 'Entertainment',
    scope: ['Container conversion', 'Bus toilets', 'Bar counters', 'Rubber fencing', 'Tire screen'],
    summary: 'Container conversion, bus toilets, bar counters and rubber fencing installations.',
    cover: { src: `${SANITY}/03e50730077c54dc41d8001da8b641189fa03755-1980x848.jpg`, alt: 'Al-Dana Amphitheater' },
    featured: true,
  },
  {
    slug: 'choueifat-international-school',
    name: 'Choueifat International School',
    client: 'Choueifat',
    location: 'Bahrain',
    sector: 'Education',
    cover: { src: `${SANITY}/e323beae6fd7b9e3cbf626660cf51f9e3eefe84b-1980x848.jpg`, alt: 'Choueifat International School' },
    featured: true,
  },
  {
    slug: 'al-dur-power-plant',
    name: 'Al Dur Power Plant',
    location: 'Bahrain',
    sector: 'Energy',
    cover: { src: `${SANITY}/6d01c77023df6b7a3a76fa7ca2c9903bd94e6639-1980x848.jpg`, alt: 'Al Dur Power Plant' },
    featured: true,
  },
  {
    slug: 'rcsi-new-building-extension',
    name: 'RCSI — New Building Extension',
    client: 'Royal College of Surgeons in Ireland',
    location: 'Bahrain',
    sector: 'Education',
    scope: ['2-storey portable site cabin — fabricated, manufactured, installed'],
    summary: 'Two-storey portable site cabin fabricated, manufactured, and installed.',
    cover: { src: `${SANITY}/14a87fb67c386ee5d84427013583309666cf9630-1980x848.jpg`, alt: 'RCSI New Building Extension' },
    featured: true,
  },
  {
    slug: 'royal-college-of-surgeons-ireland',
    name: 'Royal College of Surgeons in Ireland',
    client: 'RCSI',
    location: 'Bahrain',
    sector: 'Education',
    cover: { src: `${SANITY}/3ace74f441f0259f1f340cdd728b2443c210d0e1-1980x848.jpg`, alt: 'Royal College of Surgeons in Ireland — Bahrain' },
  },
  {
    slug: 'ikea-bahrain',
    name: 'IKEA — Bahrain',
    client: 'IKEA',
    location: 'Bahrain',
    sector: 'Retail',
    cover: { src: `${SANITY}/80e750df21d5aaf090970a60c374a345fca10bf9-1980x848.jpg`, alt: 'IKEA Bahrain' },
    featured: true,
  },
  {
    slug: 'dhl-bahrain',
    name: 'DHL — Bahrain',
    client: 'DHL',
    location: 'Bahrain',
    sector: 'Logistics',
    cover: { src: `${SANITY}/f8bb7c914d64966fd763f03dd6b66a7f51aeae8a-1980x848.jpg`, alt: 'DHL Bahrain' },
  },
  {
    slug: 'wingman-restaurants',
    name: 'Wingman Restaurants — Bahrain',
    client: 'Wingman',
    location: 'Bahrain',
    sector: 'F&B',
    cover: { src: `${SANITY}/c0b5a1c1d2a86edf2e948678c72a674897488dd1-1980x848.jpg`, alt: 'Wingman Restaurants Bahrain' },
  },
  {
    slug: 'dilmunia-island',
    name: 'Dilmunia Island',
    location: 'Bahrain',
    sector: 'Mixed-Use',
    cover: { src: `${SANITY}/1810bedb438d482dc67582e70d8ae73e682af938-1980x848.jpg`, alt: 'Dilmunia Island' },
  },
  {
    slug: 'copper-chimney-restaurant',
    name: 'Copper Chimney Restaurant',
    client: 'Copper Chimney',
    location: 'Bahrain',
    sector: 'F&B',
    cover: { src: `${SANITY}/5a64849affc45cb8b63bd2686ac2c269e21df10c-1980x848.jpg`, alt: 'Copper Chimney Restaurant' },
  },
  {
    slug: 'sayacorp-tower-hilton',
    name: 'Sayacorp Tower — Hilton Hotel',
    client: 'Sayacorp / Hilton',
    location: 'Bahrain',
    sector: 'Hospitality',
    cover: { src: `${SANITY}/6abbbfaf52d253629d20333c487c5540c965f691-1980x848.jpg`, alt: 'Sayacorp Tower Hilton Hotel' },
    featured: true,
  },
  {
    slug: 'diplomat-vfs-office',
    name: 'Diplomat VFS Office',
    client: 'VFS',
    location: 'Bahrain',
    sector: 'Office',
    cover: { src: `${SANITY}/1d2cae1f40fc97e055954130a76f1ab6d7eed62b-1980x848.jpg`, alt: 'Diplomat VFS Office' },
  },
  {
    slug: 'fatafat-restaurant',
    name: 'Fatafat Restaurant',
    client: 'Fatafat',
    location: 'Bahrain',
    sector: 'F&B',
    cover: { src: `${SANITY}/050288afe2774c2560f635676f8f2af5994f5110-1980x848.jpg`, alt: 'Fatafat Restaurant' },
  },
  {
    slug: 'vida-hotel',
    name: 'Vida Hotel',
    client: 'Vida',
    location: 'Bahrain',
    sector: 'Hospitality',
    cover: { src: `${SANITY}/5feef90e02272e3c9b25464c64f54fd7c896e405-1980x848.jpg`, alt: 'Vida Hotel' },
    featured: true,
  },
  {
    slug: 'bin-hindi-kia-showroom',
    name: 'Bin Hindi — KIA Showroom',
    client: 'Bin Hindi / KIA',
    location: 'Bahrain',
    sector: 'Automotive',
    cover: { src: `${SANITY}/6d2dfeebfb91654d37e10f21ac99e63d052cda8f-1980x848.jpg`, alt: 'Bin Hindi KIA Showroom' },
  },
  {
    slug: 'al-shaya-ihop',
    name: 'Al Shaya — IHOP Restaurant',
    client: 'Al Shaya / IHOP',
    location: 'Bahrain',
    sector: 'F&B',
    cover: { src: `${SANITY}/7d0da60cc4447bea181e0dd31679634eb1dcb072-1980x848.jpg`, alt: 'Al Shaya IHOP Restaurant' },
  },
  {
    slug: 'supreme-council-for-women',
    name: 'Supreme Council for Women',
    location: 'Bahrain',
    sector: 'Government',
    cover: { src: `${SANITY}/6cc2d37d02b6a17af605486356e55d7c7d66c93c-1980x848.jpg`, alt: 'Supreme Council for Women' },
    featured: true,
  },
  {
    slug: 'britus-international-school',
    name: 'Britus International School',
    client: 'Britus',
    location: 'Bahrain',
    sector: 'Education',
    cover: { src: `${SANITY}/5888e3da4747d8f1c8b4d66e970108bbb77ad84c-1980x848.jpg`, alt: 'Britus International School' },
  },
  {
    slug: 'juffair-square',
    name: 'Juffair Square',
    location: 'Juffair, Bahrain',
    sector: 'Mixed-Use',
    cover: { src: `${SANITY}/029bfdff08ce5808556ed9d3e8c6c7874baef749-1980x848.jpg`, alt: 'Juffair Square' },
  },
  {
    slug: 'the-bahrain-mall',
    name: 'The Bahrain Mall',
    location: 'Bahrain',
    sector: 'Retail',
    cover: { src: `${SANITY}/ae2d2d1c63e3b30fc26518a11dea321c60a6e37e-1980x848.jpg`, alt: 'The Bahrain Mall' },
  },
  {
    slug: 'amas-north-islands-apartments',
    name: 'AMAS North Islands Apartments',
    client: 'AMAS',
    location: 'North Islands, Bahrain',
    sector: 'Residential',
    scope: ['Mail boxes', 'Expansion joints — podium parking', 'BCR UK movement joints — landscape'],
    summary: 'Mail boxes, expansion joints for podium parking and BCR UK movement joints for landscape supplied.',
    brandPartners: ['BCR UK LTD'],
    cover: { src: `${SANITY}/07222d372f58785ecbc29521c175d13e19c5deb7-1500x844.webp`, alt: 'AMAS North Islands Apartments' },
  },
  {
    slug: 'amphitheater-bahrain',
    name: 'Amphitheater',
    location: 'Bahrain',
    sector: 'Entertainment',
    scope: ['Container conversion', 'Bus toilets', 'Rubber fencing', 'Bar counters'],
    summary: 'Container conversion, bus toilets, rubber fencing and bar counters completed.',
    cover: { src: `${SANITY}/260f9842db3300a5c6bc042f4693d4697f0a6e2d-1920x1281.webp`, alt: 'Amphitheater Bahrain' },
  },
  {
    slug: 'new-system-control-centre-hidd',
    name: 'New System Control Centre — HIDD',
    location: 'HIDD, Bahrain',
    sector: 'Industrial',
    scope: ['Metal lockers', 'Mobile shelving system'],
    summary: 'Metal lockers and mobile shelving system supplied and installed.',
    cover: { src: `${SANITY}/2132e81e353784361a65051735e7f9765fca14b6-1101x618.webp`, alt: 'New System Control Centre HIDD' },
  },
  {
    slug: 'one-eleven-mixed-use',
    name: 'One Eleven — Mixed-Use Development',
    location: 'Bahrain',
    sector: 'Mixed-Use',
    cover: { src: `${SANITY}/57191e6fbd3c40a3370a0d010f0bb0e64e0cfaed-1980x848.jpg`, alt: 'One Eleven Mixed-Use Development' },
  },
  {
    slug: 'west-riffa-commercial-development',
    name: 'Proposed Commercial Development — West Riffa',
    location: 'West Riffa, Bahrain',
    sector: 'Commercial',
    scope: ['Toilet cubicles', 'Partitions', 'Expansion joint systems'],
    summary: 'Toilet cubicles, partitions and expansion joint systems supplied.',
    cover: { src: `${SANITY}/9f4058d13bbc885bfcb9c746a8c5093aa12aaa37-1980x848.jpg`, alt: 'Proposed Commercial Development West Riffa' },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectsBySector = projects.reduce<Record<string, Project[]>>((acc, p) => {
  (acc[p.sector] ||= []).push(p);
  return acc;
}, {});

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
