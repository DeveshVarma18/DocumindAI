import StepByStepGuide from '@/components/how-it-works/StepByStepGuide';
import DiagramComponent from '@/components/how-it-works/DiagramComponent';

export default function HowItWorksPage() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-x-hidden text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            How DocuMind AI Works
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover how our advanced AI transforms your documents into intelligent, 
            conversational experiences — in just a few simple steps.
          </p>
        </div>
      </div>

      {/* Core Workflow Steps */}
      <StepByStepGuide />

      {/* AI Architecture Diagram */}
      <DiagramComponent />
    </div>
  );
}
