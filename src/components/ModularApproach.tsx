
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useMuseumConcept } from '@/context/MuseumConceptContext';
import FrameworkStep from './FrameworkStep';

interface ModularApproachProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ModularApproach: React.FC<ModularApproachProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { conceptData, updateModularApproach, updateStepCompleted, saveToLocalStorage } = useMuseumConcept();
  const { modularApproach } = conceptData;

  const [form, setForm] = useState({
    initialConcept: modularApproach.initialConcept,
    testingPlan: modularApproach.testingPlan,
    scalingIdeas: modularApproach.scalingIdeas
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return form.initialConcept.trim() !== '';
  };

  const handleNext = () => {
    updateModularApproach(form);
    updateStepCompleted(5);
    saveToLocalStorage();
    onNext();
  };

  useEffect(() => {
    if (modularApproach.initialConcept) {
      updateStepCompleted(5);
    }
  }, []);

  return (
    <FrameworkStep
      title="Work modularly & iteratively"
      description="Use micro-installations or 'experience modules' that you can quickly test or scale. Start small, test with real audiences, repeat."
      toolName="MVP Canvas for Museum Concepts"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onPrevious={onPrevious}
      onNext={handleNext}
      isNextEnabled={isFormValid()}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="initialConcept" className="text-lg font-medium">
            Minimum Viable Concept
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            What's the smallest version of your concept that could still deliver value and be tested with visitors?
          </p>
          <Textarea
            id="initialConcept"
            placeholder="Describe a small-scale version that captures the essence of your concept..."
            value={form.initialConcept}
            onChange={(e) => handleChange('initialConcept', e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <Label htmlFor="testingPlan" className="text-lg font-medium">
            Testing Plan
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            How would you test this concept with real visitors? What would you measure?
          </p>
          <Textarea
            id="testingPlan"
            placeholder="Outline your approach to gathering visitor feedback and measuring success..."
            value={form.testingPlan}
            onChange={(e) => handleChange('testingPlan', e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <Label htmlFor="scalingIdeas" className="text-lg font-medium">
            Scaling Ideas
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            If your initial tests are successful, how might you expand or scale the concept?
          </p>
          <Textarea
            id="scalingIdeas"
            placeholder="Describe potential expansion paths or ways to grow your concept..."
            value={form.scalingIdeas}
            onChange={(e) => handleChange('scalingIdeas', e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </div>
    </FrameworkStep>
  );
};

export default ModularApproach;
