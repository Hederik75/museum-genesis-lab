
import React, { useState } from 'react';
import { MuseumConceptProvider } from '@/context/MuseumConceptContext';
import Header from '@/components/Header';
import ThemeMatrix from '@/components/ThemeMatrix';
import DesignPhilosophy from '@/components/DesignPhilosophy';
import CreativeConstraints from '@/components/CreativeConstraints';
import ArtifactExperience from '@/components/ArtifactExperience';
import ModularApproach from '@/components/ModularApproach';
import SocialLayer from '@/components/SocialLayer';
import ConceptSummary from '@/components/ConceptSummary';

const Index = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    <ThemeMatrix
      key="theme-matrix"
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={0}
      totalSteps={6}
    />,
    <DesignPhilosophy
      key="design-philosophy"
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={1}
      totalSteps={6}
    />,
    <CreativeConstraints
      key="creative-constraints"
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={2}
      totalSteps={6}
    />,
    <ArtifactExperience
      key="artifact-experience"
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={3}
      totalSteps={6}
    />,
    <ModularApproach
      key="modular-approach"
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={4}
      totalSteps={6}
    />,
    <SocialLayer
      key="social-layer"
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentStep={5}
      totalSteps={6}
    />,
    <ConceptSummary key="summary" onPrevious={handlePrevious} />,
  ];

  return (
    <MuseumConceptProvider>
      <div className="min-h-screen bg-background">
        <Header activeStep={activeStep} setActiveStep={setActiveStep} />
        <div className="container max-w-4xl mx-auto py-8 px-4">
          {steps[activeStep]}
        </div>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          <div className="container max-w-6xl mx-auto">
            Museum Genesis Lab - Design innovative museum concepts without copying
          </div>
        </footer>
      </div>
    </MuseumConceptProvider>
  );
};

export default Index;
