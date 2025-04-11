
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMuseumConcept } from '@/context/MuseumConceptContext';
import FrameworkStep from './FrameworkStep';
import { SocialLayer as SocialLayerType } from '@/context/MuseumConceptContext';

interface SocialLayerProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const impactTypes: { id: SocialLayerType; title: string; description: string }[] = [
  { 
    id: 'conscience', 
    title: 'Conscience', 
    description: 'Build awareness and moral responsibility around the topic' 
  },
  { 
    id: 'reflection', 
    title: 'Critical reflection', 
    description: 'Encourage deep thinking and questioning assumptions' 
  },
  { 
    id: 'empowerment', 
    title: 'Empowerment', 
    description: 'Enable visitors to take action or make a difference' 
  },
  { 
    id: 'vocabulary', 
    title: 'New vocabulary', 
    description: 'Introduce new concepts, terms, or ways of discussing the topic' 
  }
];

const SocialLayer: React.FC<SocialLayerProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { conceptData, updateSocialLayer, updateStepCompleted, saveToLocalStorage } = useMuseumConcept();
  const { socialLayer } = conceptData;

  const [form, setForm] = useState({
    primaryImpact: socialLayer.primaryImpact as SocialLayerType,
    takeaway: socialLayer.takeaway
  });

  const handleImpactChange = (value: SocialLayerType) => {
    setForm(prev => ({ ...prev, primaryImpact: value }));
  };

  const handleTakeawayChange = (value: string) => {
    setForm(prev => ({ ...prev, takeaway: value }));
  };

  const isFormValid = () => {
    return !!form.primaryImpact;
  };

  const handleNext = () => {
    updateSocialLayer(form);
    updateStepCompleted(6);
    saveToLocalStorage();
    onNext();
  };

  useEffect(() => {
    if (socialLayer.primaryImpact) {
      updateStepCompleted(6);
    }
  }, []);

  return (
    <FrameworkStep
      title="Add a social layer"
      description="What do you want the visitor to take home? What changes in their behavior or thinking?"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onPrevious={onPrevious}
      onNext={handleNext}
      isNextEnabled={isFormValid()}
    >
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-medium mb-3 block">
            Primary Impact Goal
          </Label>
          <RadioGroup 
            value={form.primaryImpact} 
            onValueChange={(value) => handleImpactChange(value as SocialLayerType)}
            className="space-y-4"
          >
            {impactTypes.map((impact) => (
              <div key={impact.id} className="flex items-start space-x-2">
                <RadioGroupItem 
                  value={impact.id} 
                  id={`impact-${impact.id}`} 
                  className="mt-1"
                />
                <Label 
                  htmlFor={`impact-${impact.id}`} 
                  className="grid gap-1 cursor-pointer"
                >
                  <span className="font-medium">{impact.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {impact.description}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="takeaway" className="text-lg font-medium">
            Visitor Takeaway
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Concretely, what do you want visitors to take away from your exhibition?
          </p>
          <Textarea
            id="takeaway"
            placeholder="After visiting, I want people to..."
            value={form.takeaway}
            onChange={(e) => handleTakeawayChange(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
      </div>
    </FrameworkStep>
  );
};

export default SocialLayer;
