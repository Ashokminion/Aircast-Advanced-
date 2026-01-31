import Navigation from '../components/Navigation';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import DatasetSection from '../components/sections/DatasetSection';
import ModelArchitecture from '../components/sections/ModelArchitecture';
import ResultsSection from '../components/sections/ResultsSection';
import FeatureImportance from '../components/sections/FeatureImportance';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <DatasetSection />
        <ModelArchitecture />
        <ResultsSection />
        <FeatureImportance />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
