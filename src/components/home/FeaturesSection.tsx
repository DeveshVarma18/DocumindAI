import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Brain, 
  FileSearch,
  MessageSquare,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI That Actually Gets It',
    description: 'Our AI reads and understands documents like your smartest friend, catching context and nuance.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast Responses',
    description: 'Get answers in seconds, not hours. Process even massive documents instantly.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: FileSearch,
    title: 'Works With Everything',
    description: 'PDFs, Word docs, spreadsheets, presentations - if you can read it, we can chat with it.',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Chat with your documents like texting a friend. No technical jargon or complicated commands.',
    color: 'from-blue-500 to-purple-500'
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Features That Hit{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Different
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            From startups to enterprises, our AI-powered platform scales with your vibe 
            and integrates seamlessly into your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-6 bg-gray-800/50 border-gray-700/50 hover:border-gray-600 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <CardContent className="p-0 relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}