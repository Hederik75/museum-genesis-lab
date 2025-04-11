
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useMuseumConcept } from '@/context/MuseumConceptContext';
import FrameworkStep from './FrameworkStep';

interface ThemeMatrixProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ThemeMatrix: React.FC<ThemeMatrixProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { conceptData, updateThemeMatrix, updateStepCompleted, saveToLocalStorage } = useMuseumConcept();
  const { themeMatrix } = conceptData;

  const [form, setForm] = useState({
    theme: themeMatrix.theme,
    urgent: themeMatrix.urgent,
    underexposed: themeMatrix.underexposed,
    appealsToAll: themeMatrix.appealsToAll
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return form.theme.trim() !== '';
  };

  const handleNext = () => {
    updateThemeMatrix(form);
    updateStepCompleted(1);
    saveToLocalStorage();
    onNext();
  };

  useEffect(() => {
    if (themeMatrix.theme) {
      updateStepCompleted(1);
    }
  }, []);

  return (
    <FrameworkStep
      title="Identify your substantive anchor points"
      description="Define the core elements that will ground your museum concept."
      toolName="Theme Matrix"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onPrevious={onPrevious}
      onNext={handleNext}
      isNextEnabled={isFormValid()}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="theme" className="text-lg font-medium">
            What is the theme or challenge you want to work with?
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            For example: climate, AI, circularity, behavioral change, STEM education...
          </p>
          <Textarea
            id="theme"
            placeholder="Enter your main theme or challenge..."
            value={form.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="urgent" className="text-lg font-medium">
              What is urgent?
            </Label>
            <Textarea
              id="urgent"
              placeholder="What makes this theme timely and important..."
              value={form.urgent}
              onChange={(e) => handleChange('urgent', e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="underexposed" className="text-lg font-medium">
              What is underexposed?
            </Label>
            <Textarea
              id="underexposed"
              placeholder="Aspects of this theme that aren't getting enough attention..."
              value={form.underexposed}
              onChange={(e) => handleChange('underexposed', e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="appealsToAll" className="text-lg font-medium">
              What appeals to children and adults?
            </Label>
            <Textarea
              id="appealsToAll"
              placeholder="Elements that can engage all age groups..."
              value={form.appealsToAll}
              onChange={(e) => handleChange('appealsToAll', e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
      </div>
    </FrameworkStep>
  );
};

export default ThemeMatrix;
