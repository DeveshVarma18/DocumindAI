import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Zap } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating icons */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm animate-bounce">
              <Bot className="h-8 w-8 text-purple-400" />
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm animate-bounce delay-300">
              <Sparkles className="h-8 w-8 text-blue-400 animate-spin" />
            </div>
            <div className="p-3 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30 backdrop-blur-sm animate-bounce delay-700">
              <Zap className="h-8 w-8 text-pink-400" />
            </div>
          </div>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
          Ready to{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Level Up
          </span>{' '}
          Your Workflow?
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Join thousands of professionals who have already transformed their document workflows. 
          Start your free trial today and see the magic happen.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <Link to="/contact">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
            >
              Schedule Demo
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
            <span>7-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}