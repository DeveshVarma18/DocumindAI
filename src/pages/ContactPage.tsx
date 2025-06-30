import ContactForm from '@/components/contact/ContactForm';
import ScheduleCard from '@/components/contact/ScheduleCard';

export default function ContactPage() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 overflow-x-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to transform your document workflow? Contact our team for a personalized demo 
            or get answers to your questions.
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-800 via-gray-900 to-gray-950 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ScheduleCard />
          </div>
        </div>
      </div>
    </div>
  );
}