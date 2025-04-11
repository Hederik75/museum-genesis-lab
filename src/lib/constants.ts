
import { DesignMethod, SocialLayer } from '@/context/MuseumConceptContext';

export const designMethods: { id: DesignMethod; title: string; description: string }[] = [
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

export const socialImpacts: { id: SocialLayer; title: string; description: string }[] = [
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
