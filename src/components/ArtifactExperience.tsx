
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useMuseumConcept } from '@/context/MuseumConceptContext';
import FrameworkStep from './FrameworkStep';

interface ArtifactExperienceProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

const ArtifactExperience: React.FC<ArtifactExperienceProps> = ({ onNext, onPrevious, currentStep, totalSteps }) => {
  const { conceptData, updateArtifactExperience, updateStepCompleted, saveToLocalStorage } = useMuseumConcept();
  const { artifactExperience } = conceptData;

  const [form, setForm] = useState({
    message: artifactExperience.message,
    experience: artifactExperience.experience
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return form.message.trim() !== '' && form.experience.trim() !== '';
  };

  const handleNext = () => {
    updateArtifactExperience(form);
    updateStepCompleted(4);
    saveToLocalStorage();
    onNext();
  };

  useEffect(() => {
    if (artifactExperience.message && artifactExperience.experience) {
      updateStepCompleted(4);
    }
  }, []);

  const examples = [
    { message: "AI can replace human jobs", experience: "An interactive job interview with an AI interviewer that demonstrates both capabilities and limitations of AI in hiring" },
    { message: "Climate change affects oceans", experience: "A room where the water level rises gradually as visitors engage with different scenarios and make choices" },
    { message: "Space exploration is important", experience: "A collaborative mission control experience where visitors must work together to solve unexpected space problems" }
  ];

  return (
    <FrameworkStep
      title="Start from an artifact or experience, not a message"
      description="Show good exhibitions are felt or experienced, not just understood. Transform abstract messages into tangible experiences."
      toolName="From Message to Medium"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onPrevious={onPrevious}
      onNext={handleNext}
      isNextEnabled={isFormValid()}
    >
      <div className="space-y-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Convert abstract messages into memorable, interactive experiences. For example: not "AI is replacing jobs", but "You have a job interview with an AI."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="message" className="text-lg font-medium">
              The message or concept
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              What information or idea are you trying to convey?
            </p>
            <Textarea
              id="message"
              placeholder="Write the message or key concept here..."
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="experience" className="text-lg font-medium">
              The experience or artifact
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              How can visitors experience this idea in an engaging way?
            </p>
            <Textarea
              id="experience"
              placeholder="Describe the interactive experience that brings this message to life..."
              value={form.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Examples</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {examples.map((example, index) => (
              <Card key={index} className="p-4 text-sm">
                <p className="font-medium">{example.message}</p>
                <div className="flex items-center my-2 text-museum-terracotta">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span className="text-xs">transforms into</span>
                </div>
                <p className="italic">{example.experience}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </FrameworkStep>
  );
};

export default ArtifactExperience;
