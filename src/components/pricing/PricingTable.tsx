import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Zap, Crown, Building } from 'lucide-react';

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for individuals and small teams',
      monthlyPrice: 8999,
      annualPrice: 149999,
      features: [
        'Up to 100 documents per month',
        'Basic AI chat functionality',
        'Email support',
        'PDF, Word, PowerPoint support',
        '5GB storage',
        'Standard processing speed'
      ],
      buttonText: 'Contact Us',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Professional',
      icon: Crown,
      description: 'Ideal for growing businesses',
      monthlyPrice: 19999,
      annualPrice: 219999,
      features: [
        'Up to 1,000 documents per month',
        'Advanced AI with GPT-4',
        'Priority support',
        'All file formats supported',
        '50GB storage',
        'Fast processing speed',
        'Team collaboration',
        'Custom integrations',
        'Advanced analytics'
      ],
      buttonText: 'Contact Us',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Building,
      description: 'For large organizations',
      monthlyPrice: 49999,
      annualPrice: 499999,
      features: [
        'Unlimited documents',
        'Custom AI model training',
        'Dedicated support manager',
        'All formats + custom parsers',
        'Unlimited storage',
        'Priority processing',
        'Advanced team features',
        'API access',
        'SSO integration',
        'Custom workflows',
        'Compliance reporting',
        'On-premise deployment'
      ],
      buttonText: 'Contact Us',
      buttonVariant: 'outline' as const,
      popular: false
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f172a] via-[#0e0e1f] to-[#1e1b4b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Billing toggle */}
        <div className="flex items-center justify-center mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="mx-4"
          />
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
            Annual
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 rounded-2xl transition-all duration-300 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-lg scale-105 hover:shadow-blue-500/40' 
                  : 'border border-gray-700 hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="p-0 mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    plan.popular ? 'bg-blue-900' : 'bg-gray-700'
                  }`}>
                    <plan.icon className={`h-6 w-6 ${
                      plan.popular ? 'text-blue-400' : 'text-gray-300'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-white">
                    {formatRupees(isAnnual ? plan.annualPrice : plan.monthlyPrice)}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button 
                    variant={plan.buttonVariant} 
                    className={`w-full py-3 text-lg transition-all duration-300 ease-in-out rounded-xl ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-transparent border border-gray-500 text-white hover:bg-gray-700'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <span>✓ 99.9% Uptime SLA</span>
            <span>✓ Enterprise Security</span>
            <span>✓ GDPR Compliant</span>
            <span>✓ 24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
