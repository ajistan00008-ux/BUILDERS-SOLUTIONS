// ============================================================================
// PRODUCT METADATA — BUILDERS SOLUTIONS (full catalogue)
// Bilingual titles & descriptions live in lib/i18n.tsx, keyed by id.
// image: Unsplash (original lines) or self-hosted /img stock (added lines).
// specifications: real materials. catalogue: PDF under /public/catalogues.
// ============================================================================

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export interface StructuralProduct {
  id: string;
  image: string;
  specifications: string[];
  catalogue?: string;
}

export const CORE_FOCUS_LINE: StructuralProduct[] = [
  { id: 'tile-trims', image: U('1558618666-fcd25c85cd64'), specifications: ['Aluminium', 'SS304', 'SS316', 'Brass'] },
  { id: 'expansion-joints', image: U('1504307651254-35680f356dfd'), specifications: ['Aluminium', 'Stainless Steel', 'Neoprene', 'EPDM'] },
  { id: 'movement-joints', image: '/img/mat-3.jpg', specifications: ['Aluminium', 'PVC', 'EPDM'], catalogue: '/catalogues/movement-joints.pdf' },
  { id: 'compression-seal', image: '/img/infra-2.jpg', specifications: ['EPDM', 'Silicone', 'Pre-compressed Foam'] },
  { id: 'stern-touchless', image: U('1497366811353-6870744d04b2'), specifications: ['HPL 42mm', 'Aluminium 6063', 'SS Hardware'] },
  { id: 'wall-guards', image: U('1541123437800-1bb1317badc2'), specifications: ['Aluminium', 'PVC', 'Stainless Steel', 'HDPE'] },
  { id: 'bollards', image: U('1587560699334-cc4ff634909a'), specifications: ['SS316', 'Cast Iron', 'Carbon Steel'], catalogue: '/catalogues/bollards.pdf' },
  { id: 'metal-panels', image: U('1486325212027-8081e485255e'), specifications: ['Aluminium Composite', 'Perforated', 'Water Ripple SS'], catalogue: '/catalogues/metal-panels.pdf' },
  { id: 'led-profiles', image: U('1524758631624-e2822e304c36'), specifications: ['Aluminium 6063 T5', 'Polycarbonate'] },
  { id: 'skylights', image: U('1501183638710-841dd1904471'), specifications: ['Aluminium Frame', 'Polycarbonate', 'PMMA', 'Safety Glass'] },
  { id: 'hpl', image: U('1558618047-3c8c76ca7d13'), specifications: ['High Pressure Laminate', 'Compact Grade'] },
  { id: 'flooring', image: U('1556909114-f6e7ad7d3136'), specifications: ['Vinyl', 'SPC', 'LVT', 'Epoxy', 'Rubber', 'Raised Access'], catalogue: '/catalogues/flooring.pdf' },
  { id: 'skirting', image: '/img/mat-1.jpg', specifications: ['Aluminium', 'PVC', 'SS304'] },
  { id: 'stair-nosing', image: '/img/build-3.jpg', specifications: ['Aluminium', 'Stainless Steel', 'PVC Insert', 'Anti-Slip'] },
  { id: 'acoustic-panels', image: '/img/build-1.jpg', specifications: ['PET Felt', 'Polyester', 'Wood Wool'] },
  { id: 'silent-pods', image: '/img/build-4.jpg', specifications: ['Acoustic Glass', 'Aluminium', 'HPL'] },
  { id: 'stretch-ceiling', image: '/img/mat-2.jpg', specifications: ['PVC Membrane', 'Matte', 'Gloss', 'Translucent'] },
  { id: 'channel-grating', image: '/img/infra-1.jpg', specifications: ['Stainless Steel', 'Galvanised Steel', 'Polymer Concrete'] },
  { id: 'metal-furniture', image: '/img/city-3.jpg', specifications: ['Steel', 'Aluminium', 'Powder-Coated'] },
  { id: 'prefab-cabins', image: '/img/city-1.jpg', specifications: ['Galvanised Steel', 'PU Insulation', 'Sandwich Panel'] },
  { id: 'smart-solar', image: '/img/city-2.jpg', specifications: ['Steel', 'Solar PV', 'Tempered Glass'] },
  { id: 'defense', image: U('1508614589041-895b88991e3e'), specifications: ['Armour Steel', 'GRP', 'Ballistic Glass'] },
  { id: 'oilgas', image: U('1518709268805-4e9042af9f23'), specifications: ['GRP', 'Carbon Steel', 'SS316L', 'HDPE'] },
];
