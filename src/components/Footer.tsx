import { Link } from 'react-router-dom';
import { Bot,  Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DocuMind AI
                </span>
                <Sparkles className="h-4 w-4 text-purple-400 animate-spin" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Transform your documents into intelligent conversations. Our AI-powered assistant 
              helps you extract insights, answer questions, and streamline your workflow with style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">
                deveshofficial18@gmail.com
              </li>
              <li className="text-sm text-gray-400">
                +91 7387983095
              </li>
              <li className="text-sm text-gray-400">
                Pune, MH, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 DocuMind AI. All rights reserved. Built with 💜
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}