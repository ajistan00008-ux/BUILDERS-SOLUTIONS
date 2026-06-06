import type { Metadata } from 'next';
import { News } from '../../components/News';

export const metadata: Metadata = { title: 'News' };

export default function NewsPage() {
  return (
    <>
      <div className="pt-16 bg-neutral-50 dark:bg-brand-inkSoft" />
      <News />
    </>
  );
}
