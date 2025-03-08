import PricingSection from './pricing-section';
import Features from '@/components/theme/features-05';
import Customers from '@/components/theme/customers';
import Faqs from '@/components/theme/faqs';
import Cta from '@/components/theme/cta';

export default function Pricing() {
  return (
    <>
      <PricingSection />
      <Features />
      <Customers />
      <Faqs />
      <Cta />
    </>
  );
}
