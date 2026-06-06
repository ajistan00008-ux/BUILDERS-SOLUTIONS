import { HeroCarousel } from '../components/HeroCarousel';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { CTASection } from '../components/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <PartnersMarquee />
      <CTASection />
    </>
  );
}
