import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Upload,
  Brain,
  MessageSquare,
  BarChart3,
  FileText,
  Zap,
  Shield
} from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload Your Documents',
    description: 'Simply drag and drop your files or upload from cloud storage. We support PDFs, Word docs, spreadsheets, presentations, and more.',
    details: [
      'Drag & drop interface',
      'Bulk upload support',
      'Cloud storage integration',
      'Format auto-detection'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    step: 2,
    icon: Brain,
    title: 'AI Processing & Analysis',
    description: 'Our advanced AI reads, understands, and indexes your documents, creating a comprehensive knowledge base.',
    details: [
      'Natural language processing',
      'Context understanding',
      'Semantic indexing',
      'Key information extraction'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    step: 3,
    icon: MessageSquare,
    title: 'Ask Questions Naturally',
    description: 'Chat with your documents using everyday language. Ask complex questions and get detailed, accurate answers.',
    details: [
      'Natural conversation flow',
      'Context-aware responses',
      'Multi-document queries',
      'Follow-up questions'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    step: 4,
    icon: BarChart3,
    title: 'Get Insights & Analytics',
    description: 'Receive detailed insights, summaries, and analytics about your documents and user interactions.',
    details: [
      'Document summaries',
      'Usage analytics',
      'Key insights extraction',
      'Performance metrics'
    ],
    color: 'from-orange-500 to-yellow-500'
  }
];

const features = [
  {
    icon: FileText,
    title: 'Multi-Format Support',
    description: 'Works with PDFs, Word, Excel, PowerPoint, and more'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get answers in seconds, not minutes or hours'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance standards'
  }
];

export default function StepByStepGuide() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}
                      />
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <Card className="p-8 bg-[#1f1b3a] border border-gray-700 rounded-xl shadow-xl">
                  <CardContent className="p-0 flex items-center justify-center">
                    <div
                      className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="h-16 w-16 text-white" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-[#1f1b3a] border border-gray-700 hover:shadow-xl transition-shadow rounded-xl"
            >
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already transformed their document workflows with DocuMind AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 text-lg hover:scale-105 transition-transform shadow-lg">
                🚀 Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
