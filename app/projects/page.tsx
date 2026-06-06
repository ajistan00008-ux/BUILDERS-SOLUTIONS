import type { Metadata } from 'next';
import { Projects } from '../../components/Projects';

export const metadata: Metadata = { title: 'Projects' };

export default function ProjectsPage() {
  return (
    <>
      <div className="pt-16 bg-white dark:bg-brand-ink" />
      <Projects />
    </>
  );
}
