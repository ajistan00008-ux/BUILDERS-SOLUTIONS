// ============================================================================
// PRODUCT METADATA — THE BUILDERS SOLUTIONS
// ----------------------------------------------------------------------------
// Bilingual titles & descriptions live in lib/i18n.tsx (keyed by id).
// This file holds the IMAGE (group Sanity CDN) and verified SPECS per id.
// Brand attribution preserved from the group catalogue.
// ============================================================================

const SANITY = 'https://cdn.sanity.io/images/ffdvrpe4/production';

export interface StructuralProduct {
  id: string;
  image: string;
  brandPartner: string;
  specifications: string[];
}

export const CORE_FOCUS_LINE: StructuralProduct[] = [
  { id: 'expansion-joints', brandPartner: 'BCR UK LTD', image: `${SANITY}/4ca212004d4b528e898c9d0e257a1cac9391ba91-1080x1080.jpg`, specifications: [] },
  { id: 'movement-joints', brandPartner: 'BCR UK LTD', image: `${SANITY}/4b056343921a90be1e3a40963df67531d5683deb-1080x1080.jpg`, specifications: [] },
  { id: 'expansion-joint-covers', brandPartner: 'BCR UK LTD', image: `${SANITY}/c3c510e20f5d47ea07b2afd1ce878e26bdf107ed-1080x1080.jpg`, specifications: [] },
  { id: 'tile-trims', brandPartner: 'BCR UK LTD', image: `${SANITY}/f2620d4bdd3a45eafa59fdde2570d81ff39c9848-1080x1080.jpg`, specifications: [] },
  { id: 'skirting', brandPartner: 'Builders Solutions', image: `${SANITY}/54660064a5d18a51c8f74bca1f62321ac3e5d4e8-1080x1080.jpg`, specifications: [] },
  { id: 'stair-nosing', brandPartner: 'Builders Solutions', image: `${SANITY}/01bfa93cf44806dbf8bd413d044537e743ad9b07-3307x3307.jpg`, specifications: [] },
  { id: 'corner-guards', brandPartner: 'Builders Solutions', image: `${SANITY}/43264a69c870c3dc49560c42cc2555a9bfbe896e-3307x3307.jpg`, specifications: [] },
  { id: 'wall-guards', brandPartner: 'Builders Solutions', image: `${SANITY}/2b47076f04580f4eff827832748eae14b1aa44ed-3307x3307.jpg`, specifications: [] },
  { id: 'hand-rails', brandPartner: 'Builders Solutions', image: `${SANITY}/05af0d7052534fc53308365ca07c9a605b365c7b-3307x3307.jpg`, specifications: [] },
];
