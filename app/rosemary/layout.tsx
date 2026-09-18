import type { Metadata } from 'next';
import { CartProvider } from '../../components/rosemary/CartProvider';
import { StoreHeader, StoreFooter, CartDrawer } from '../../components/rosemary/StoreChrome';

export const metadata: Metadata = {
  title: {
    default: 'ROSEMARY.BH — Rosemary Water Spray, delivered in Bahrain from BHD 1.950',
    template: '%s | ROSEMARY.BH',
  },
  description:
    'Steam-distilled rosemary water spray, stocked in Manama and delivered across Bahrain. 100 ml for BHD 1.950 including VAT — roughly half the nearest Gulf shelf price.',
  openGraph: {
    title: 'ROSEMARY.BH — Rosemary Water Spray in Bahrain',
    description:
      '100 ml BHD 1.950 · 200 ml BHD 2.950 · 305 ml refill BHD 3.750. Stocked in Bahrain, same-day in Manama.',
    type: 'website',
  },
};

export default function RosemaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {/* The storefront is light-only regardless of the group site's theme toggle. */}
      <div className="bg-sprig-paper text-sprig-ink min-h-screen flex flex-col [color-scheme:light]">
        <StoreHeader />
        <main className="flex-1">{children}</main>
        <StoreFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
