import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Database, Cpu, MessageSquare, FileText } from 'lucide-react';

export default function DiagramComponent() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            The DocuMind AI Architecture
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See how our advanced RAG (Retrieval-Augmented Generation) pipeline processes 
            your documents to deliver accurate, contextual responses.
          </p>
        </div>

        <div className="space-y-8">
          {/* Flow diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Step 1 */}
            <Card className="p-6 text-center bg-[#1f1b3a] border border-gray-700 rounded-xl shadow-md">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileText className="h-8 w-8 text-cyan-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Document Input</h4>
                <p className="text-sm text-gray-400">
                  Upload documents in any supported format
                </p>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-cyan-300 animate-pulse drop-shadow" />
            </div>

            {/* Step 2 */}
            <Card className="p-6 text-center bg-[#1f1b3a] border border-gray-700 rounded-xl shadow-md">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Cpu className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">AI Processing</h4>
                <p className="text-sm text-gray-400">
                  Advanced NLP extracts and understands content
                </p>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-purple-300 animate-pulse drop-shadow" />
            </div>

            {/* Step 3 */}
            <Card className="p-6 text-center bg-[#1f1b3a] border border-gray-700 rounded-xl shadow-md">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Database className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Knowledge Base</h4>
                <p className="text-sm text-gray-400">
                  Semantic indexing creates searchable knowledge
                </p>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-green-300 animate-pulse drop-shadow" />
            </div>

            {/* Step 4 */}
            <Card className="p-6 text-center bg-[#1f1b3a] border border-gray-700 rounded-xl shadow-md">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageSquare className="h-8 w-8 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Chat Interface</h4>
                <p className="text-sm text-gray-400">
                  Natural conversation with intelligent responses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed architecture */}
          <Card className="p-8 mt-12 bg-gradient-to-br from-[#2e2e4e] to-[#1a1a2f] border border-gray-700 rounded-2xl">
            <CardContent className="p-0">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Advanced RAG Pipeline
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Document Processing</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• OCR for scanned documents</li>
                    <li>• Text extraction and cleaning</li>
                    <li>• Structure recognition</li>
                    <li>• Metadata extraction</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white">AI Intelligence</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• GPT-4 language model</li>
                    <li>• Vector embeddings</li>
                    <li>• Semantic search</li>
                    <li>• Context understanding</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Response Generation</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Relevant context retrieval</li>
                    <li>• Answer synthesis</li>
                    <li>• Source attribution</li>
                    <li>• Confidence scoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
