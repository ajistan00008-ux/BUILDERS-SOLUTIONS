import type { Metadata } from 'next';
import { CartProvider } from '../../components/store/CartProvider';
import { StoreHeader, StoreFooter, CartDrawer } from '../../components/store/StoreChrome';

export const metadata: Metadata = {
  title: {
    default: 'DAILY.BH — Everyday beauty essentials for men and women, delivered in Bahrain',
    template: '%s | DAILY.BH',
  },
  description:
    'Hair, skin, body, grooming and fragrance essentials stocked in Manama and delivered across Bahrain. Nothing over BHD 5, same-day in Manama, free delivery over BHD 8.',
  openGraph: {
    title: 'DAILY.BH — Everyday beauty essentials, Bahrain',
    description:
      'Daily hair, skin, body and grooming essentials for men and women. Stocked in Manama, same-day delivery, nothing over BHD 5.',
    type: 'website',
  },
};

export default function DailyLayout({ children }: { children: React.ReactNode }) {
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
