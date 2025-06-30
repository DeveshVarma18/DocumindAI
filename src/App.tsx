import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import PricingPage from '@/pages/PricingPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import ContactPage from '@/pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;