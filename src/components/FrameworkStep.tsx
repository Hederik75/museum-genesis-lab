
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Wrench } from 'lucide-react';

interface FrameworkStepProps {
  title: string;
  description: string;
  children: ReactNode;
  toolName?: string;
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isNextEnabled: boolean;
}

const FrameworkStep: React.FC<FrameworkStepProps> = ({
  title,
  description,
  children,
  toolName,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isNextEnabled,
}) => {
  return (
    <div className="step-container">
      <div className="mb-6">
        <h2 className="step-title">
          <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full inline-flex items-center justify-center text-sm mr-3">
            {currentStep + 1}
          </span>
          {title}
        </h2>
        <p className="step-description">{description}</p>
        
        {toolName && (
          <div className="tool-label">
            <Wrench className="h-4 w-4" />
            <span>{toolName}</span>
          </div>
        )}
      </div>

      <Card className="p-6 mb-6">
        {children}
      </Card>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isNextEnabled}
          className="flex items-center gap-2"
        >
          {currentStep < totalSteps - 1 ? (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            'View Summary'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FrameworkStep;
