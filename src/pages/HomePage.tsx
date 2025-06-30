import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import UseCasesSection from '@/components/home/UseCasesSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <CTASection />
    </div>
  );
}