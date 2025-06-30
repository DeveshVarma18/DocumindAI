import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Users } from 'lucide-react';

export default function ScheduleCard() {
  return (
    <div className="space-y-8 text-white">
      <Card className="bg-transparent border border-white/10 backdrop-blur-md shadow-2xl max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Schedule a Demo
          </CardTitle>
          <p className="text-gray-400">
            See DocuMind AI in action with a personalized demo tailored to your use case.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Demo options */}
          <div className="space-y-4">
            {[
              {
                icon: <Video className="h-5 w-5 text-blue-400 mt-1" />,
                title: '15-min Quick Demo',
                desc: 'Perfect for a quick overview of features and capabilities',
                duration: '15 minutes',
                people: '1-2 people',
              },
              {
                icon: <Users className="h-5 w-5 text-purple-400 mt-1" />,
                title: '30-min Deep Dive',
                desc: 'Detailed walkthrough with Q&A and use case discussion',
                duration: '30 minutes',
                people: 'Team friendly',
              },
              {
                icon: <Calendar className="h-5 w-5 text-green-400 mt-1" />,
                title: 'Custom Workshop',
                desc: 'Tailored session using your actual documents and workflows',
                duration: '60 minutes',
                people: 'Enterprise',
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 border border-white/10 rounded-lg hover:bg-gradient-to-br from-white/5 to-white/10 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  {item.icon}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{item.desc}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-white/10 text-white text-xs border border-white/10">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.duration}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/10 text-white text-xs border border-white/10">
                        <Users className="h-3 w-3 mr-1" />
                        {item.people}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">What you'll get:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                'Live demonstration with your use case',
                'Q&A with our AI experts',
                'Custom implementation roadmap',
                'Pricing and next steps discussion'
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
