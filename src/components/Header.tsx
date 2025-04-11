
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMuseumConcept } from "@/context/MuseumConceptContext";
import { cn } from "@/lib/utils";
import { Sparkles, Save, RefreshCw } from "lucide-react";

interface HeaderProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const Header: React.FC<HeaderProps> = ({ activeStep, setActiveStep }) => {
  const { conceptData, updateTitle, saveToLocalStorage, resetConcept } = useMuseumConcept();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(conceptData.title);

  const handleTitleSubmit = () => {
    updateTitle(title);
    setIsEditing(false);
    saveToLocalStorage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    }
  };

  return (
    <header className="py-6 px-4 border-b border-border bg-background sticky top-0 z-10">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-museum-terracotta" />
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleKeyDown}
                  className="text-lg font-semibold"
                  autoFocus
                />
                <Button size="sm" onClick={handleTitleSubmit}>Save</Button>
              </div>
            ) : (
              <h1 
                className="text-xl sm:text-2xl font-semibold cursor-pointer hover:text-primary/80 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                {conceptData.title}
              </h1>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => {
                saveToLocalStorage();
                // Add a toast notification here in the future
              }}
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => {
                if (window.confirm("Are you sure you want to reset your concept? This action cannot be undone.")) {
                  resetConcept();
                  setActiveStep(0);
                }
              }}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-6 overflow-x-auto pb-2">
          {['Theme Matrix', 'Design Philosophy', 'Creative Constraints', 'Artifact Experience', 'Modular Approach', 'Social Layer'].map((step, index) => (
            <Button 
              key={index}
              variant="ghost"
              size="sm"
              className={cn(
                "flex-shrink-0 rounded-full text-sm",
                activeStep === index ? "bg-primary text-primary-foreground" : "",
                conceptData.stepCompleted >= index ? "opacity-100" : "opacity-50"
              )}
              onClick={() => conceptData.stepCompleted >= index && setActiveStep(index)}
              disabled={conceptData.stepCompleted < index}
            >
              {index + 1}. {step}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-shrink-0 rounded-full text-sm",
              activeStep === 6 ? "bg-primary text-primary-foreground" : "",
              conceptData.stepCompleted >= 5 ? "opacity-100" : "opacity-50"
            )}
            onClick={() => conceptData.stepCompleted >= 5 && setActiveStep(6)}
            disabled={conceptData.stepCompleted < 5}
          >
            Summary
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
