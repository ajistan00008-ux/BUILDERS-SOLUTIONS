import type { Metadata } from 'next';
import { Presence } from '../../components/Presence';

export const metadata: Metadata = { title: 'Locations' };

export default function LocationsPage() {
  return (
    <>
      <div className="pt-16 bg-neutral-50 dark:bg-brand-inkSoft" />
      <Presence />
    </>
  );
}
