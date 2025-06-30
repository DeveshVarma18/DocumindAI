import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Scale, 
  Headphones, 
  GraduationCap, 
  Building, 
  Heart,
  Briefcase,
  TrendingUp
} from 'lucide-react';

const useCases = [
  {
    icon: Users,
    title: 'HR & People Ops',
    description: 'Turn boring employee handbooks into instant Q&A sessions. No more hunting through policy docs.',
    benefits: ['Policy Q&A', 'Compliance Checks', 'Onboarding Magic'],
    color: 'from-blue-500 to-cyan-500',
    emoji: '👥'
  },
  {
    icon: Scale,
    title: 'Legal & Compliance',
    description: 'Analyze contracts and legal docs with AI precision. Your paralegal just got an upgrade.',
    benefits: ['Contract Analysis', 'Legal Research', 'Compliance Monitoring'],
    color: 'from-purple-500 to-indigo-500',
    emoji: '⚖️'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Turn your knowledge base into a 24/7 support superhero. Instant answers, happy customers.',
    benefits: ['Instant Support', 'Knowledge Base', 'Training Materials'],
    color: 'from-green-500 to-emerald-500',
    emoji: '🎧'
  },
  {
    icon: GraduationCap,
    title: 'Education & Learning',
    description: 'Transform textbooks into interactive study buddies. Learning just got a major glow-up.',
    benefits: ['Course Materials', 'Research Papers', 'Study Guides'],
    color: 'from-orange-500 to-red-500',
    emoji: '🎓'
  },
  {
    icon: Building,
    title: 'Finance & Accounting',
    description: 'Make financial reports actually readable. Turn spreadsheet nightmares into clear insights.',
    benefits: ['Financial Reports', 'Audit Documents', 'Regulatory Filings'],
    color: 'from-teal-500 to-blue-500',
    emoji: '💰'
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Navigate medical records and research papers with AI precision. HIPAA-compliant and secure.',
    benefits: ['Medical Records', 'Clinical Research', 'Patient Documentation'],
    color: 'from-red-500 to-pink-500',
    emoji: '🏥'
  },
  {
    icon: Briefcase,
    title: 'Sales & Marketing',
    description: 'Extract insights from proposals and market research. Turn data into deals.',
    benefits: ['Proposals', 'Market Research', 'Competitor Analysis'],
    color: 'from-indigo-500 to-purple-500',
    emoji: '📈'
  },
  {
    icon: TrendingUp,
    title: 'Business Intelligence',
    description: 'Turn boring reports into actionable insights. Make data-driven decisions like a boss.',
    benefits: ['Business Reports', 'Analytics', 'Strategic Planning'],
    color: 'from-pink-500 to-rose-500',
    emoji: '📊'
  }
];

export default function UseCasesSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Built for{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Every Vibe
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Whether you're in healthcare, legal, education, or any other field, 
            DocuMind AI adapts to your specific needs and speaks your language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card 
              key={index} 
              className="group p-6 bg-gray-800/40 border-gray-700/50 hover:border-gray-600 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <CardContent className="p-0 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <useCase.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {useCase.emoji}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {useCase.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {useCase.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <Badge 
                      key={benefitIndex} 
                      variant="secondary" 
                      className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-600/50 transition-colors group-hover:border-gray-500"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}