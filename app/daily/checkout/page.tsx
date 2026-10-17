import type { Metadata } from 'next';
import { CheckoutForm } from '../../../components/store/CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Delivery across Bahrain. Cash on delivery, BenefitPay or card.',
};

export default function CheckoutPage() {
  return (
    <section className="max-w-5xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-sprig-ink mb-2">
        Checkout
      </h1>
      <p className="text-[14px] text-sprig-ink/55 mb-8">
        We deliver across all governorates. Manama before 2pm goes out the same day.
      </p>
      <CheckoutForm />
    </section>
  );
}
