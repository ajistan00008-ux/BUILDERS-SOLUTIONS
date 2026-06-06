import { Header } from '../components/Header';
import { HeroCarousel } from '../components/HeroCarousel';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Projects } from '../components/Projects';
import { Products } from '../components/Products';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { Presence } from '../components/Presence';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';
import { News } from '../components/News';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ChatBot } from '../components/ChatBot';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroCarousel />
      <About />
      <Services />
      <Projects />
      <Products />
      <PartnersMarquee />
      <Presence />
      <WhyChooseUs />
      <Testimonials />
      <News />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </main>
  );
}
