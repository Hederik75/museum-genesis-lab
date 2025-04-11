
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download, Copy, CheckCircle } from 'lucide-react';
import { useMuseumConcept } from '@/context/MuseumConceptContext';
import { designMethods, socialImpacts } from '@/lib/constants';

interface ConceptSummaryProps {
  onPrevious: () => void;
}

const ConceptSummary: React.FC<ConceptSummaryProps> = ({ onPrevious }) => {
  const { conceptData, saveToLocalStorage } = useMuseumConcept();
  const [copied, setCopied] = useState(false);
  
  const {
    title,
    themeMatrix,
    designPhilosophy,
    creativeConstraints,
    artifactExperience,
    modularApproach,
    socialLayer
  } = conceptData;

  const mainMethod = designMethods.find(m => m.id === designPhilosophy.mainMethod);
  const supportingMethod = designMethods.find(m => m.id === designPhilosophy.supportingMethod);
  const impact = socialImpacts.find(i => i.id === socialLayer.primaryImpact);

  const getConstraints = () => {
    const constraints = [];
    if (creativeConstraints.noScreens) constraints.push("No screens");
    if (creativeConstraints.mobileConcept) constraints.push("Mobile exhibition");
    if (creativeConstraints.activeVisitors) constraints.push("Active visitor participation");
    if (creativeConstraints.customConstraint) constraints.push(creativeConstraints.customConstraint);
    return constraints.join(", ");
  };

  const handleCopyToClipboard = () => {
    const summaryText = `
MUSEUM CONCEPT: ${title}

THEME: ${themeMatrix.theme}
${themeMatrix.urgent ? `URGENT ASPECT: ${themeMatrix.urgent}` : ''}
${themeMatrix.underexposed ? `UNDEREXPOSED ASPECT: ${themeMatrix.underexposed}` : ''}
${themeMatrix.appealsToAll ? `APPEALS TO ALL AGES: ${themeMatrix.appealsToAll}` : ''}

DESIGN APPROACH: ${mainMethod?.title || ''} ${supportingMethod ? `+ ${supportingMethod.title}` : ''}
${designPhilosophy.methodDescription ? `DESIGN NOTES: ${designPhilosophy.methodDescription}` : ''}

CREATIVE CONSTRAINTS: ${getConstraints()}

CONCEPT TRANSFORMATION:
From message: "${artifactExperience.message}"
To experience: "${artifactExperience.experience}"

MINIMUM VIABLE CONCEPT: ${modularApproach.initialConcept}
${modularApproach.testingPlan ? `TESTING PLAN: ${modularApproach.testingPlan}` : ''}
${modularApproach.scalingIdeas ? `SCALING IDEAS: ${modularApproach.scalingIdeas}` : ''}

SOCIAL IMPACT: ${impact?.title || ''}
${socialLayer.takeaway ? `VISITOR TAKEAWAY: ${socialLayer.takeaway}` : ''}
`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([`
# Museum Genesis Lab: ${title}

## Theme Matrix
- **Theme:** ${themeMatrix.theme}
${themeMatrix.urgent ? `- **What's urgent:** ${themeMatrix.urgent}` : ''}
${themeMatrix.underexposed ? `- **What's underexposed:** ${themeMatrix.underexposed}` : ''}
${themeMatrix.appealsToAll ? `- **Appeals to all ages:** ${themeMatrix.appealsToAll}` : ''}

## Design Philosophy
- **Main method:** ${mainMethod?.title || 'Not specified'}
${supportingMethod ? `- **Supporting method:** ${supportingMethod.title}` : ''}
${designPhilosophy.methodDescription ? `- **Approach details:** ${designPhilosophy.methodDescription}` : ''}

## Creative Constraints
${getConstraints() ? `- **Applied constraints:** ${getConstraints()}` : '- No constraints specified'}

## From Message to Experience
- **Message:** ${artifactExperience.message || 'Not specified'}
- **Experience:** ${artifactExperience.experience || 'Not specified'}

## Modular Implementation
- **Minimum viable concept:** ${modularApproach.initialConcept || 'Not specified'}
${modularApproach.testingPlan ? `- **Testing approach:** ${modularApproach.testingPlan}` : ''}
${modularApproach.scalingIdeas ? `- **Scaling potential:** ${modularApproach.scalingIdeas}` : ''}

## Social Layer
- **Primary impact:** ${impact?.title || 'Not specified'}
${socialLayer.takeaway ? `- **Visitor takeaway:** ${socialLayer.takeaway}` : ''}

---
Created with Museum Genesis Lab
    `], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-concept.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    saveToLocalStorage();
  };

  return (
    <div className="step-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Concept Summary</h2>
        <p className="text-muted-foreground">
          Here's an overview of your museum concept. You can copy or download it for future reference.
        </p>
      </div>

      <Card className="p-6 mb-6 bg-card">
        <h3 className="text-2xl font-bold mb-4 text-primary">{title}</h3>
        
        <section className="mb-6">
          <h4 className="text-lg font-semibold border-b pb-2 mb-3">Theme Matrix</h4>
          <div className="space-y-2">
            <p><span className="font-medium">Theme:</span> {themeMatrix.theme}</p>
            {themeMatrix.urgent && (
              <p><span className="font-medium">What's urgent:</span> {themeMatrix.urgent}</p>
            )}
            {themeMatrix.underexposed && (
              <p><span className="font-medium">What's underexposed:</span> {themeMatrix.underexposed}</p>
            )}
            {themeMatrix.appealsToAll && (
              <p><span className="font-medium">Appeals to all ages:</span> {themeMatrix.appealsToAll}</p>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h4 className="text-lg font-semibold border-b pb-2 mb-3">Design Philosophy</h4>
          <div className="space-y-2">
            {mainMethod && <p><span className="font-medium">Main method:</span> {mainMethod.title}</p>}
            {supportingMethod && <p><span className="font-medium">Supporting method:</span> {supportingMethod.title}</p>}
            {designPhilosophy.methodDescription && (
              <p><span className="font-medium">Approach:</span> {designPhilosophy.methodDescription}</p>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h4 className="text-lg font-semibold border-b pb-2 mb-3">Creative Constraints</h4>
          <div className="space-y-2">
            <p><span className="font-medium">Applied constraints:</span> {getConstraints() || "None specified"}</p>
          </div>
        </section>

        <section className="mb-6">
          <h4 className="text-lg font-semibold border-b pb-2 mb-3">From Message to Experience</h4>
          <div className="space-y-2">
            <p><span className="font-medium">Message:</span> {artifactExperience.message}</p>
            <p><span className="font-medium">Experience:</span> {artifactExperience.experience}</p>
          </div>
        </section>

        <section className="mb-6">
          <h4 className="text-lg font-semibold border-b pb-2 mb-3">Modular Implementation</h4>
          <div className="space-y-2">
            <p><span className="font-medium">Minimum viable concept:</span> {modularApproach.initialConcept}</p>
            {modularApproach.testingPlan && (
              <p><span className="font-medium">Testing approach:</span> {modularApproach.testingPlan}</p>
            )}
            {modularApproach.scalingIdeas && (
              <p><span className="font-medium">Scaling potential:</span> {modularApproach.scalingIdeas}</p>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h4 className="text-lg font-semibold border-b pb-2 mb-3">Social Layer</h4>
          <div className="space-y-2">
            {impact && <p><span className="font-medium">Primary impact:</span> {impact.title}</p>}
            {socialLayer.takeaway && (
              <p><span className="font-medium">Visitor takeaway:</span> {socialLayer.takeaway}</p>
            )}
          </div>
        </section>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex gap-3">
          <Button 
            onClick={handleCopyToClipboard} 
            variant="outline"
            className="flex items-center gap-2"
          >
            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
          
          <Button 
            onClick={handleDownload} 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download as Markdown
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConceptSummary;
