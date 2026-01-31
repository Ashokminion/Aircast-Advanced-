import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DatasetSection from '@/components/sections/DatasetSection';
import ModelArchitecture from '@/components/sections/ModelArchitecture';
import ResultsSection from '@/components/sections/ResultsSection';
import FeatureImportance from '@/components/sections/FeatureImportance';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        {/* Hero Section with particle animation */}
        <HeroSection />
        
        {/* About / Introduction Section */}
        <AboutSection />
        
        {/* Dataset & Input Features */}
        <DatasetSection />
        
        {/* Model Architecture Visualization */}
        <ModelArchitecture />
        
        {/* Results & Predictions */}
        <ResultsSection />
        
        {/* Feature Importance Analysis */}
        <FeatureImportance />
        
        {/* Contact Form */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
