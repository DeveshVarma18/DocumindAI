import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', company: '', role: '', message: '' });
    } else {
      toast.error(result.error || 'Submission failed. Please try again.');
    }
  } catch (err) {
    console.error('Contact form error:', err);
    toast.error('Something went wrong. Please try again later.');
  }

  setIsSubmitting(false);
};


  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 text-white">
      <Card className="bg-transparent border border-white/10 backdrop-blur-md shadow-2xl max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Send us a message</CardTitle>
          <p className="text-gray-400">Fill out the form below and we'll get back to you as soon as possible.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  className="bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-300">Company</Label>
                <Input
                  id="company"
                  type="text"
                  className="bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                  <SelectTrigger className="bg-white/5 border border-white/10 text-white placeholder:text-gray-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white border border-white/10">
                    <SelectItem value="ceo">CEO/Founder</SelectItem>
                    <SelectItem value="cto">CTO</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="hr">HR Professional</SelectItem>
                    <SelectItem value="legal">Legal Professional</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300">Message *</Label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Tell us about your needs, questions, or how we can help..."
                className="bg-white/5 border border-white/10 text-white placeholder:text-gray-500"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-semibold shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
