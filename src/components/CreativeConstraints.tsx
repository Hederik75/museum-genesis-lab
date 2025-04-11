
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useMuseumConcept } from '@/context/MuseumConceptContext';
import FrameworkStep from './FrameworkStep';

interface CreativeConstraintsProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const CreativeConstraints: React.FC<CreativeConstraintsProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { conceptData, updateCreativeConstraints, updateStepCompleted, saveToLocalStorage } = useMuseumConcept();
  const { creativeConstraints } = conceptData;

  const [form, setForm] = useState({
    noScreens: creativeConstraints.noScreens,
    mobileConcept: creativeConstraints.mobileConcept,
    activeVisitors: creativeConstraints.activeVisitors,
    customConstraint: creativeConstraints.customConstraint
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    // At least one constraint should be filled
    return (
      form.noScreens.trim() !== '' || 
      form.mobileConcept.trim() !== '' || 
      form.activeVisitors.trim() !== '' || 
      form.customConstraint.trim() !== ''
    );
  };

  const handleNext = () => {
    updateCreativeConstraints(form);
    updateStepCompleted(3);
    saveToLocalStorage();
    onNext();
  };

  useEffect(() => {
    if (
      creativeConstraints.noScreens || 
      creativeConstraints.mobileConcept || 
      creativeConstraints.activeVisitors || 
      creativeConstraints.customConstraint
    ) {
      updateStepCompleted(3);
    }
  }, []);

  return (
    <FrameworkStep
      title="Use creative constraints"
      description="Consciously limit yourself to stimulate creativity."
      toolName="Creative Constraints Cards"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onPrevious={onPrevious}
      onNext={handleNext}
      isNextEnabled={isFormValid()}
    >
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Select at least one constraint and describe how it would affect your concept. Creative constraints often lead to more innovative solutions.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="noScreens" className="text-lg font-medium">
              "What if we weren't allowed to use screens?"
            </Label>
            <Textarea
              id="noScreens"
              placeholder="How would your concept work without digital screens..."
              value={form.noScreens}
              onChange={(e) => handleChange('noScreens', e.target.value)}
              className="min-h-[120px] mt-2"
            />
          </div>

          <div>
            <Label htmlFor="mobileConcept" className="text-lg font-medium">
              "What if the exhibition has to be completely mobile?"
            </Label>
            <Textarea
              id="mobileConcept"
              placeholder="How could your concept be designed to travel or move..."
              value={form.mobileConcept}
              onChange={(e) => handleChange('mobileConcept', e.target.value)}
              className="min-h-[120px] mt-2"
            />
          </div>

          <div>
            <Label htmlFor="activeVisitors" className="text-lg font-medium">
              "What if visitors have to activate everything themselves?"
            </Label>
            <Textarea
              id="activeVisitors"
              placeholder="How could your concept involve active participation..."
              value={form.activeVisitors}
              onChange={(e) => handleChange('activeVisitors', e.target.value)}
              className="min-h-[120px] mt-2"
            />
          </div>

          <div>
            <Label htmlFor="customConstraint" className="text-lg font-medium">
              Create your own constraint
            </Label>
            <Input
              placeholder="What if..."
              value={form.customConstraint}
              onChange={(e) => handleChange('customConstraint', e.target.value)}
              className="mb-2"
            />
            <Textarea
              placeholder="Describe how this constraint affects your concept..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>
    </FrameworkStep>
  );
};

export default CreativeConstraints;
