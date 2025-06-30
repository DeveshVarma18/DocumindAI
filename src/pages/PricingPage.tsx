import PricingTable from '@/components/pricing/PricingTable';

export default function PricingPage() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 overflow-x-hidden">
      <div className="bg-gradient-to-br from-purple-800 via-gray-900 to-gray-950 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI features with no hidden fees.
          </p>
        </div>
      </div>
      <PricingTable />
    </div>
  );
}