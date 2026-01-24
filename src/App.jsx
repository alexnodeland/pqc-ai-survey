import React, { useState, useEffect } from 'react';
import { useCases } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { DetailPanel } from './components/DetailPanel';

const PQCSecurityDashboard = () => {
  // State
  const [showLanding, setShowLanding] = useState(true);
  const [selectedUseCase, setSelectedUseCase] = useState('inference');
  const [activeTab, setActiveTab] = useState('threat');
  const [expandedCategories, setExpandedCategories] = useState({
    critical: true,
    high: true,
    plan: false
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Derived state
  const selectedCase = useCases[selectedUseCase];

  // Handlers
  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Show landing page or dashboard
  if (showLanding) {
    return <LandingPage onEnterDashboard={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onLogoClick={() => setShowLanding(true)}
        />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <Sidebar
            selectedUseCase={selectedUseCase}
            setSelectedUseCase={setSelectedUseCase}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <DetailPanel
            selectedCase={selectedCase}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PQCSecurityDashboard;
