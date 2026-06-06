import { HeroCarousel } from '../components/HeroCarousel';
import { Ticker } from '../components/Ticker';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { CTASection } from '../components/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Ticker />
      <PartnersMarquee />
      <CTASection />
    </>
  );
}
