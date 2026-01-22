import React, { useState } from 'react';
import { useCases } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuantumTimeline } from './components/QuantumTimeline';
import { Sidebar } from './components/Sidebar';
import { DetailPanel } from './components/DetailPanel';

const PQCSecurityDashboard = () => {
  // State
  const [selectedUseCase, setSelectedUseCase] = useState('inference');
  const [activeTab, setActiveTab] = useState('threat');
  const [expandedCategories, setExpandedCategories] = useState({
    critical: true,
    high: true,
    plan: false
  });

  // Derived state
  const selectedCase = useCases[selectedUseCase];

  // Handlers
  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <Header />
      <QuantumTimeline />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <Sidebar
            selectedUseCase={selectedUseCase}
            setSelectedUseCase={setSelectedUseCase}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
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
