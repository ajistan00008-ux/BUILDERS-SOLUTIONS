import type { Metadata } from 'next';
import { Services } from '../../components/Services';

export const metadata: Metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <>
      <div className="pt-16 bg-brand-ink" />
      <Services />
    </>
  );
}
