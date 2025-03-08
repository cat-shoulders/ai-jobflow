import Hero from '@/components/theme/hero';
import Clients from '@/components/theme/clients';
import Features from '@/components/theme/features';
import Features02 from '@/components/theme/features-02';
import Features03 from '@/components/theme/features-03';
import TestimonialsCarousel from '@/components/theme/testimonials-carousel';
import Features04 from '@/components/theme/features-04';
import Pricing from './pricing-section';
import Testimonials from '@/components/theme/testimonials';
import Cta from '@/components/theme/cta';

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Features />
      <Features02 />
      <Features03 />
      <TestimonialsCarousel />
      {/*<Features04 />*/}
      <Pricing />
      <Testimonials />
      <Cta />
    </>
  );
}
