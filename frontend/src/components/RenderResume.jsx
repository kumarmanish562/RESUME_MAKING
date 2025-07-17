/**
 * @fileoverview Resume Template Renderer Component
 * 
 * This component serves as a template factory that dynamically renders different
 * resume templates based on the provided template ID. It acts as a central router
 * for all available resume templates in the application.
 * 
 * @author Resume Builder Team
 * @since 1.0.0
 * 
 * Available Templates:
 * - Template 01: Classic resume template with customizable color theming
 * - Template 02: Minimalist resume template with centered header design  
 * - Template 03: Two-column resume template with intelligent skill categorization
 * 
 * Key Features:
 * - Dynamic template switching based on template ID
 * - Consistent prop interface across all templates
 * - Fallback to default template for invalid IDs
 * - Responsive design support through containerWidth prop
 * 
 * Dependencies:
 * - TemplateOne: Classic resume template component
 * - TemplateTwo: Minimalist resume template component
 * - TemplateThree: Two-column resume template component
 * 
 * @example
 * ```jsx
 * <RenderResume
 *   templateId="02"
 *   resumeData={userResumeData}
 *   containerWidth={800}
 * />
 * ```
 */

import React from 'react';
import TemplateTwo from './TemplateTwo';
import TemplateThree from './TemplateThree';
import TemplateOne from './TemplateOne';

/**
 * Resume Template Renderer Component
 * 
 * A factory component that renders the appropriate resume template based on
 * the provided template ID. This component provides a unified interface for
 * displaying different resume layouts while maintaining consistent data flow.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.templateId - Template identifier ("01", "02", "03")
 * @param {Object} props.resumeData - Complete resume data object containing all sections
 * @param {Object} props.resumeData.personalInfo - Personal information (name, title, contact)
 * @param {Array} props.resumeData.workExperience - Work experience entries
 * @param {Array} props.resumeData.education - Education background
 * @param {Array} props.resumeData.skills - Skills and competencies
 * @param {Array} props.resumeData.projects - Project portfolio
 * @param {Array} props.resumeData.certifications - Professional certifications
 * @param {Array} props.resumeData.languages - Language proficiencies
 * @param {number} props.containerWidth - Container width for responsive scaling
 * 
 * @returns {JSX.Element} The rendered resume template component
 * 
 * @example
 * ```jsx
 * const resumeData = {
 *   personalInfo: { name: "John Doe", title: "Software Engineer" },
 *   workExperience: [...],
 *   education: [...],
 *   skills: [...],
 *   projects: [...],
 *   certifications: [...],
 *   languages: [...]
 * };
 * 
 * <RenderResume
 *   templateId="01"
 *   resumeData={resumeData}
 *   containerWidth={800}
 * />
 * ```
 */
const RenderResume = ({ templateId, resumeData, containerWidth }) => {
  switch (templateId) {
    // Classic template with customizable color theming
    case "01":
      return (
        <TemplateOne
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );

    // Minimalist template with centered header design
    case "02":
      return (
        <TemplateTwo
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );

    // Two-column template with intelligent skill categorization
    case "03":
      return (
        <TemplateThree
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );

    // Default fallback to classic template for invalid or missing template IDs
    default:
      return (
        <TemplateOne
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
  }
};

export default RenderResume;
