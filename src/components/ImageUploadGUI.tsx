import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

interface PredictionResult {
  prediction: string;
  confidence: number;
  processing_time: number;
}

const ImageUploadGUI: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      toast.error('Please select valid image files only');
      return;
    }

    const newImages: UploadedImage[] = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    setUploadedImages(prev => [...prev, ...newImages]);
    toast.success(`${imageFiles.length} image(s) uploaded successfully`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      // Revoke object URL to prevent memory leaks
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return updated;
    });
  };

  const processImages = async () => {
    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setIsProcessing(true);
    setResults([]);

    try {
      // Simulate API call to your DL model
      // Replace this with your actual API endpoint
      const formData = new FormData();
      uploadedImages.forEach((img, index) => {
        formData.append(`image_${index}`, img.file);
      });

      // Mock API response - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results - replace with actual API response
      const mockResults: PredictionResult[] = uploadedImages.map((_, index) => ({
        prediction: ['Cat', 'Dog', 'Bird', 'Car', 'Person'][Math.floor(Math.random() * 5)],
        confidence: Math.random() * 0.4 + 0.6, // 60-100%
        processing_time: Math.random() * 2 + 0.5 // 0.5-2.5 seconds
      }));

      setResults(mockResults);
      toast.success('Images processed successfully!');

    } catch (error) {
      console.error('Error processing images:', error);
      toast.error('Failed to process images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearAll = () => {
    uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
    setUploadedImages([]);
    setResults([]);
    toast.success('All images cleared');
  };

  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
            AI Image{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Classifier
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Upload your images and let our deep learning model analyze them instantly
          </p>
        </div>

        {/* Upload Area */}
        <Card className="mb-12 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
          <CardContent className="p-12">
            <div
              className={`border-2 border-dashed rounded-xl p-16 text-center transition-all duration-300 ${
                isDragOver
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-gray-600 hover:border-purple-500 hover:bg-purple-500/5'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
                  <Upload className="h-16 w-16 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Drop your images here
                  </h3>
                  <p className="text-lg text-gray-400 mb-6">
                    or click to browse files
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-lg"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Select Images
                  </Button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Images */}
        {uploadedImages.length > 0 && (
          <Card className="mb-12 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Uploaded Images ({uploadedImages.length})
                </h3>
                <div className="flex gap-3">
                  <Button
                    onClick={processImages}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Process Images'
                    )}
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600/10 px-6 py-3"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {uploadedImages.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-700 shadow-lg">
                      <img
                        src={image.preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 p-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                    <div className="mt-3 text-xs text-gray-400 truncate text-center">
                      {image.file.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {results.length > 0 && (
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                Prediction Results
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {results.map((result, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-700/70 transition-colors">
                    <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gray-600 shadow-lg">
                      <img
                        src={uploadedImages[index]?.preview}
                        alt={`Result ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Prediction:</span>
                        <span className="font-bold text-white text-lg">{result.prediction}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="font-bold text-green-400 text-lg">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-gray-300">
                          {result.processing_time.toFixed(2)}s
                        </span>
                      </div>

                      {/* Confidence Bar */}
                      <div className="w-full bg-gray-600 rounded-full h-3 mt-4">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-8 bg-gray-800/30 border-gray-700/30 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-4 text-lg">How to use:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li>• Drag and drop image files or click to browse</li>
                  <li>• Supports JPG, PNG, GIF, and other common image formats</li>
                  <li>• Upload multiple images at once for batch processing</li>
                  <li>• Click "Process Images" to send them to the AI model</li>
                  <li>• View predictions with confidence scores and processing time</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageUploadGUI;