
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { useMuseumConcept } from '@/context/MuseumConceptContext';
import FrameworkStep from './FrameworkStep';
import { DesignMethod } from '@/context/MuseumConceptContext';
import { cn } from '@/lib/utils';

interface DesignPhilosophyProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const designMethods: { id: DesignMethod; title: string; description: string }[] = [
  { 
    id: 'speculative',
    title: 'Speculative design', 
    description: 'What if... (future scenarios)' 
  },
  { 
    id: 'participatory', 
    title: 'Participatory design', 
    description: 'Learning by doing' 
  },
  { 
    id: 'critical', 
    title: 'Critical design', 
    description: 'Expose instead of solve' 
  },
  { 
    id: 'systemic', 
    title: 'Systemic design', 
    description: 'Making layers of a complex problem visible' 
  },
  { 
    id: 'storytelling', 
    title: 'Immersive storytelling', 
    description: 'Immersing the visitor in an experience' 
  }
];

const DesignPhilosophy: React.FC<DesignPhilosophyProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { conceptData, updateDesignPhilosophy, updateStepCompleted, saveToLocalStorage } = useMuseumConcept();
  const { designPhilosophy } = conceptData;

  const [form, setForm] = useState({
    mainMethod: designPhilosophy.mainMethod as DesignMethod,
    supportingMethod: designPhilosophy.supportingMethod as DesignMethod,
    methodDescription: designPhilosophy.methodDescription
  });

  const handleMethodChange = (field: 'mainMethod' | 'supportingMethod', value: DesignMethod) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setForm(prev => ({ ...prev, methodDescription: value }));
  };

  const isFormValid = () => {
    return !!form.mainMethod;
  };

  const handleNext = () => {
    updateDesignPhilosophy(form);
    updateStepCompleted(2);
    saveToLocalStorage();
    onNext();
  };

  useEffect(() => {
    if (designPhilosophy.mainMethod) {
      updateStepCompleted(2);
    }
  }, []);

  return (
    <FrameworkStep
      title="Determine your design philosophy"
      description="What perspective do you want to use to tackle this theme?"
      toolName="Design Mode Selector"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onPrevious={onPrevious}
      onNext={handleNext}
      isNextEnabled={isFormValid()}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-lg font-medium mb-3 block">
              Main Method
            </Label>
            <RadioGroup 
              value={form.mainMethod} 
              onValueChange={(value) => handleMethodChange('mainMethod', value as DesignMethod)}
              className="space-y-3"
            >
              {designMethods.map((method) => (
                <div key={method.id} className="flex items-start space-x-2">
                  <RadioGroupItem 
                    value={method.id} 
                    id={`main-${method.id}`}
                    className="mt-1" 
                  />
                  <Label 
                    htmlFor={`main-${method.id}`} 
                    className="grid gap-1 cursor-pointer"
                  >
                    <span className="font-medium">{method.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {method.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-lg font-medium mb-3 block">
              Supporting Method
            </Label>
            <RadioGroup 
              value={form.supportingMethod} 
              onValueChange={(value) => handleMethodChange('supportingMethod', value as DesignMethod)}
              className="space-y-3"
            >
              {designMethods.map((method) => (
                <div key={method.id} className="flex items-start space-x-2">
                  <RadioGroupItem 
                    value={method.id} 
                    id={`supporting-${method.id}`} 
                    className="mt-1"
                    disabled={form.mainMethod === method.id}
                  />
                  <Label 
                    htmlFor={`supporting-${method.id}`} 
                    className={cn(
                      "grid gap-1 cursor-pointer",
                      form.mainMethod === method.id && "opacity-50"
                    )}
                  >
                    <span className="font-medium">{method.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {method.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div>
          <Label htmlFor="methodDescription" className="text-lg font-medium">
            Describe how you'll apply these design methods
          </Label>
          <Textarea
            id="methodDescription"
            placeholder="Explain how these methods will shape your museum concept..."
            value={form.methodDescription}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="min-h-[150px] mt-2"
          />
        </div>

        {form.mainMethod && (
          <Card className="p-4 bg-accent/10 border-accent">
            <p className="text-sm font-medium">Selected approach: </p>
            <p className="text-sm">
              {designMethods.find(m => m.id === form.mainMethod)?.title} (primary) 
              {form.supportingMethod && (
                <> + {designMethods.find(m => m.id === form.supportingMethod)?.title} (supporting)</>
              )}
            </p>
          </Card>
        )}
      </div>
    </FrameworkStep>
  );
};

export default DesignPhilosophy;
