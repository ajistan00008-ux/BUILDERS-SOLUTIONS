// ============================================================================
// PRODUCT METADATA — BUILDERS SOLUTIONS
// Titles & descriptions (bilingual) live in lib/i18n.tsx, keyed by id.
// This file holds the IMAGE and material SPECS for each product id.
// Images match BS_Website_FINAL_LIVE.html (Unsplash); swap for owned photos
// when available. Materials are from the group product data.
// ============================================================================

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export interface StructuralProduct {
  id: string;
  image: string;
  specifications: string[];
}

export const CORE_FOCUS_LINE: StructuralProduct[] = [
  { id: 'tile-trims', image: U('1558618666-fcd25c85cd64'), specifications: ['Aluminium', 'SS304', 'SS316', 'Brass'] },
  { id: 'expansion-joints', image: U('1504307651254-35680f356dfd'), specifications: ['Aluminium', 'Stainless Steel', 'Neoprene', 'EPDM'] },
  { id: 'stern-touchless', image: U('1497366811353-6870744d04b2'), specifications: ['HPL 42mm', 'Aluminium 6063', 'SS Hardware'] },
  { id: 'wall-guards', image: U('1541123437800-1bb1317badc2'), specifications: ['Aluminium', 'PVC', 'Stainless Steel', 'HDPE'] },
  { id: 'bollards', image: U('1587560699334-cc4ff634909a'), specifications: ['SS316', 'Cast Iron', 'Carbon Steel'] },
  { id: 'metal-panels', image: U('1486325212027-8081e485255e'), specifications: ['Aluminium Composite', 'GRP', 'Solid Aluminium'] },
  { id: 'led-profiles', image: U('1524758631624-e2822e304c36'), specifications: ['Aluminium 6063 T5', 'Polycarbonate'] },
  { id: 'skylights', image: U('1501183638710-841dd1904471'), specifications: ['Aluminium Frame', 'Polycarbonate', 'PMMA', 'Safety Glass'] },
  { id: 'hpl', image: U('1558618047-3c8c76ca7d13'), specifications: ['High Pressure Laminate', 'Compact Grade'] },
  { id: 'flooring', image: U('1556909114-f6e7ad7d3136'), specifications: ['Vinyl', 'Epoxy Resin', 'Rubber', 'Carpet'] },
  { id: 'defense', image: U('1508614589041-895b88991e3e'), specifications: ['Armour Steel', 'GRP', 'Ballistic Glass'] },
  { id: 'oilgas', image: U('1518709268805-4e9042af9f23'), specifications: ['GRP', 'Carbon Steel', 'SS316L', 'HDPE'] },
];
