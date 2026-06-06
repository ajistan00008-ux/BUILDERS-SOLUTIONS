import type { Metadata } from 'next';
import { Products } from '../../components/Products';

export const metadata: Metadata = { title: 'Products' };

export default function ProductsPage() {
  return (
    <>
      <div className="pt-16 bg-neutral-50 dark:bg-brand-inkSoft" />
      <Products />
    </>
  );
}
