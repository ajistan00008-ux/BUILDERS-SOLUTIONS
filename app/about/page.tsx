import type { Metadata } from 'next';
import { About } from '../../components/About';
import { WhyChooseUs } from '../../components/WhyChooseUs';
import { Testimonials } from '../../components/Testimonials';

export const metadata: Metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <>
      <div className="pt-16 bg-white dark:bg-brand-ink" />
      <About />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
