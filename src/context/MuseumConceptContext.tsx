
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DesignMethod = 'speculative' | 'participatory' | 'critical' | 'systemic' | 'storytelling';
export type SocialLayer = 'conscience' | 'reflection' | 'empowerment' | 'vocabulary';

export interface ThemeMatrixData {
  theme: string;
  urgent: string;
  underexposed: string;
  appealsToAll: string;
}

export interface DesignPhilosophyData {
  mainMethod: DesignMethod | '';
  supportingMethod: DesignMethod | '';
  methodDescription: string;
}

export interface CreativeConstraintsData {
  noScreens: string;
  mobileConcept: string;
  activeVisitors: string;
  customConstraint: string;
}

export interface ArtifactData {
  message: string;
  experience: string;
}

export interface ModularData {
  initialConcept: string;
  testingPlan: string;
  scalingIdeas: string;
}

export interface SocialLayerData {
  primaryImpact: SocialLayer | '';
  takeaway: string;
}

export interface MuseumConceptData {
  title: string;
  stepCompleted: number;
  themeMatrix: ThemeMatrixData;
  designPhilosophy: DesignPhilosophyData;
  creativeConstraints: CreativeConstraintsData;
  artifactExperience: ArtifactData;
  modularApproach: ModularData;
  socialLayer: SocialLayerData;
}

interface MuseumConceptContextType {
  conceptData: MuseumConceptData;
  updateTitle: (title: string) => void;
  updateStepCompleted: (step: number) => void;
  updateThemeMatrix: (data: Partial<ThemeMatrixData>) => void;
  updateDesignPhilosophy: (data: Partial<DesignPhilosophyData>) => void;
  updateCreativeConstraints: (data: Partial<CreativeConstraintsData>) => void;
  updateArtifactExperience: (data: Partial<ArtifactData>) => void;
  updateModularApproach: (data: Partial<ModularData>) => void;
  updateSocialLayer: (data: Partial<SocialLayerData>) => void;
  resetConcept: () => void;
  saveToLocalStorage: () => void;
}

const defaultMuseumConcept: MuseumConceptData = {
  title: 'New Museum Concept',
  stepCompleted: 0,
  themeMatrix: {
    theme: '',
    urgent: '',
    underexposed: '',
    appealsToAll: ''
  },
  designPhilosophy: {
    mainMethod: '',
    supportingMethod: '',
    methodDescription: ''
  },
  creativeConstraints: {
    noScreens: '',
    mobileConcept: '',
    activeVisitors: '',
    customConstraint: ''
  },
  artifactExperience: {
    message: '',
    experience: ''
  },
  modularApproach: {
    initialConcept: '',
    testingPlan: '',
    scalingIdeas: ''
  },
  socialLayer: {
    primaryImpact: '',
    takeaway: ''
  }
};

const MuseumConceptContext = createContext<MuseumConceptContextType | undefined>(undefined);

export const useMuseumConcept = () => {
  const context = useContext(MuseumConceptContext);
  if (!context) {
    throw new Error('useMuseumConcept must be used within a MuseumConceptProvider');
  }
  return context;
};

export const MuseumConceptProvider = ({ children }: { children: ReactNode }) => {
  const loadSavedConcept = (): MuseumConceptData => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('museumConcept');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved concept', e);
        }
      }
    }
    return defaultMuseumConcept;
  };

  const [conceptData, setConceptData] = useState<MuseumConceptData>(loadSavedConcept);

  const updateTitle = (title: string) => {
    setConceptData(prev => ({ ...prev, title }));
  };

  const updateStepCompleted = (step: number) => {
    setConceptData(prev => ({ ...prev, stepCompleted: Math.max(prev.stepCompleted, step) }));
  };

  const updateThemeMatrix = (data: Partial<ThemeMatrixData>) => {
    setConceptData(prev => ({
      ...prev,
      themeMatrix: { ...prev.themeMatrix, ...data }
    }));
  };

  const updateDesignPhilosophy = (data: Partial<DesignPhilosophyData>) => {
    setConceptData(prev => ({
      ...prev,
      designPhilosophy: { ...prev.designPhilosophy, ...data }
    }));
  };

  const updateCreativeConstraints = (data: Partial<CreativeConstraintsData>) => {
    setConceptData(prev => ({
      ...prev,
      creativeConstraints: { ...prev.creativeConstraints, ...data }
    }));
  };

  const updateArtifactExperience = (data: Partial<ArtifactData>) => {
    setConceptData(prev => ({
      ...prev,
      artifactExperience: { ...prev.artifactExperience, ...data }
    }));
  };

  const updateModularApproach = (data: Partial<ModularData>) => {
    setConceptData(prev => ({
      ...prev,
      modularApproach: { ...prev.modularApproach, ...data }
    }));
  };

  const updateSocialLayer = (data: Partial<SocialLayerData>) => {
    setConceptData(prev => ({
      ...prev,
      socialLayer: { ...prev.socialLayer, ...data }
    }));
  };

  const resetConcept = () => {
    setConceptData(defaultMuseumConcept);
    localStorage.removeItem('museumConcept');
  };

  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('museumConcept', JSON.stringify(conceptData));
    }
  };

  return (
    <MuseumConceptContext.Provider
      value={{
        conceptData,
        updateTitle,
        updateStepCompleted,
        updateThemeMatrix,
        updateDesignPhilosophy,
        updateCreativeConstraints,
        updateArtifactExperience,
        updateModularApproach,
        updateSocialLayer,
        resetConcept,
        saveToLocalStorage
      }}
    >
      {children}
    </MuseumConceptContext.Provider>
  );
};
