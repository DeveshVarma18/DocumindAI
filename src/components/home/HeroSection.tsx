import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8 group hover:scale-105 transition-transform">
          <Sparkles className="h-4 w-4 mr-2 text-purple-400 animate-spin" />
          <span className="text-purple-300 text-sm font-medium">AI-Powered Document Intelligence</span>
          <Zap className="h-4 w-4 ml-2 text-pink-400" />
        </div>

        {/* Main headline with gradient text */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight">
          <span className="block text-white mb-2">Turn Your</span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Documents
          </span>
          <span className="block text-white">Into Conversations</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Upload any document and chat with it instantly. Our AI assistant extracts insights, 
          answers questions, and helps you understand complex information in{' '}
          <span className="text-purple-400 font-semibold">seconds</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">

          <Link to="/how-it-works">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
            >
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Floating bot icon */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
            <Bot className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        <div className="absolute top-32 right-10 animate-bounce delay-1000">
          <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-blue-400 animate-spin" />
          </div>
        </div>
      </div>
    </section>
  );
}