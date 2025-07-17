/**
 * @fileoverview Resume Section Components Library for Resume Builder Application
 * 
 * This module provides a comprehensive collection of reusable UI components specifically
 * designed for resume templates. Each component is optimized for professional presentation
 * and consistent styling across different resume layouts and themes.
 * 
 * Key Features:
 * - Modular component architecture for maximum reusability
 * - Consistent styling system with customizable colors and themes
 * - Professional typography and layout patterns
 * - Interactive elements with hover effects and animations
 * - Accessibility-compliant markup and semantic HTML
 * - Responsive design that adapts to different container sizes
 * - Icon integration with Lucide React for modern visual appeal
 * - Progress indicators and rating systems for skills visualization
 * - External link handling with proper security attributes
 * 
 * Component Categories:
 * - **Progress & Ratings**: Visual progress bars and interactive rating inputs
 * - **Contact & Links**: Contact information display and action links
 * - **Education & Certifications**: Academic and professional credential components
 * - **Skills & Languages**: Skill assessment and language proficiency displays
 * - **Projects**: Project showcase with repository and demo links
 * - **Work Experience**: Professional experience with company and role details
 * 
 * Design System:
 * - Consistent color theming with customizable accent colors
 * - Professional spacing and typography hierarchy
 * - Modern card-based layouts with subtle shadows
 * - Icon-text combinations for enhanced visual communication
 * - Hover states and interactive feedback for better UX
 * 
 * Usage:
 * ```jsx
 * import {
 *   WorkExperience,
 *   ProjectInfo,
 *   EducationInfo,
 *   SkillSection,
 *   CertificationInfo
 * } from './ResumeSection';
 * 
 * // In resume templates
 * <WorkExperience
 *   company="Tech Corp"
 *   role="Senior Developer"
 *   duration="2020 - Present"
 *   description="Led development of key features..."
 * />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { infoStyles as styles } from '../assets/dummystyle';

/**
 * Progress Bar Component
 * 
 * Displays a visual progress indicator with customizable color and progress value.
 * Used for skill levels, language proficiency, and other measurable competencies.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.progress - Progress value (0-5 scale, multiplied by 20% for width)
 * @param {string} props.color - Background color for the progress bar
 * 
 * @returns {JSX.Element} A horizontal progress bar with specified width and color
 * 
 * @example
 * ```jsx
 * <Progress progress={4} color="#3b82f6" />
 * ```
 */
export const Progress = ({ progress, color }) => (
  <div className={styles.progressWrapper}>
    <div className={styles.progressBar(color)} style={{ width: `${progress * 20}%`, backgroundColor: color }} />
  </div>
);

/**
 * Action Link Component
 * 
 * Displays an icon with accompanying link text, commonly used for portfolio
 * links, social media, or other external references.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} props.link - Link text or URL to display
 * @param {string} props.bgColor - Background color for the icon wrapper
 * 
 * @returns {JSX.Element} An icon-text combination with styled background
 * 
 * @example
 * ```jsx
 * <ActionLink
 *   icon={<Github size={16} />}
 *   link="github.com/username"
 *   bgColor="#1f2937"
 * />
 * ```
 */
export const ActionLink = ({ icon, link, bgColor }) => (
  <div className={styles.actionWrapper}>
    <div className={styles.actionIconWrapper} style={{ backgroundColor: bgColor }}>
      {icon}
    </div>
    <p className={styles.actionLink}>{link}</p>
  </div>
);

/**
 * Certification Information Component
 * 
 * Displays professional certification details including title, issuing organization,
 * and year obtained with optional color-coded year badge.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Certification title or name
 * @param {string} props.issuer - Organization that issued the certification
 * @param {string|number} props.year - Year the certification was obtained
 * @param {string} props.bgColor - Background color for the year badge
 * 
 * @returns {JSX.Element} A structured certification display with title, issuer, and year
 * 
 * @example
 * ```jsx
 * <CertificationInfo
 *   title="AWS Certified Solutions Architect"
 *   issuer="Amazon Web Services"
 *   year="2023"
 *   bgColor="#ff9500"
 * />
 * ```
 */
export const CertificationInfo = ({ title, issuer, year, bgColor }) => (
  <div className={styles.certContainer}>
    <h3 className={styles.certTitle}>{title}</h3>
    <div className={styles.certRow}>
      {year && <div className={styles.certYear(bgColor)} style={{ backgroundColor: bgColor }}>{year}</div>}
      <p className={styles.certIssuer}>{issuer}</p>
    </div>
  </div>
);

/**
 * Contact Information Component
 * 
 * Displays contact details with an icon and background color for visual organization.
 * Commonly used for phone, email, location, and social media information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon element representing the contact type
 * @param {string} props.iconBG - Background color for the icon wrapper
 * @param {string} props.value - Contact information value (email, phone, etc.)
 * 
 * @returns {JSX.Element} An icon-value pair for contact information display
 * 
 * @example
 * ```jsx
 * <ContactInfo
 *   icon={<Mail size={16} />}
 *   iconBG="#3b82f6"
 *   value="user@example.com"
 * />
 * ```
 */
export const ContactInfo = ({ icon, iconBG, value }) => (
  <div className={styles.contactRow}>
    <div className={styles.contactIconWrapper} style={{ backgroundColor: iconBG }}>{icon}</div>
    <p className={styles.contactText}>{value}</p>
  </div>
);

/**
 * Education Information Component
 * 
 * Displays educational background including degree, institution, and duration
 * in a structured, professional format.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.degree - Degree title or educational program name
 * @param {string} props.institution - Educational institution or university name
 * @param {string} props.duration - Time period of education (e.g., "2018 - 2022")
 * 
 * @returns {JSX.Element} A structured education entry with degree, institution, and duration
 * 
 * @example
 * ```jsx
 * <EducationInfo
 *   degree="Bachelor of Science in Computer Science"
 *   institution="University of California, Berkeley"
 *   duration="2018 - 2022"
 * />
 * ```
 */
export const EducationInfo = ({ degree, institution, duration }) => (
  <div className={styles.eduContainer}>
    <h3 className={styles.eduDegree}>{degree}</h3>
    <p className={styles.eduInstitution}>{institution}</p>
    <p className={styles.eduDuration}>{duration}</p>
  </div>
);

/**
 * Information Block Component (Internal)
 * 
 * Internal component used by LanguageSection and SkillSection to display
 * items with optional progress indicators.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Display label for the item
 * @param {number} props.progress - Progress value (0-100)
 * @param {string} props.accentColor - Color for the progress indicator
 * 
 * @returns {JSX.Element} A label with optional progress bar
 */
const InfoBlock = ({ label, progress, accentColor }) => (
  <div className={styles.infoRow}>
    <p className={styles.infoLabel}>{label}</p>
    {progress > 0 && <Progress progress={(progress / 100) * 5} color={accentColor} />}
  </div>
);

/**
 * Language Section Component
 * 
 * Displays a list of languages with optional proficiency indicators.
 * Each language can include a progress bar showing proficiency level.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.languages - Array of language objects
 * @param {string} props.languages[].name - Language name
 * @param {number} props.languages[].progress - Proficiency level (0-100)
 * @param {string} props.accentColor - Color for progress indicators
 * 
 * @returns {JSX.Element} A list of languages with proficiency bars
 * 
 * @example
 * ```jsx
 * const languages = [
 *   { name: "English", progress: 100 },
 *   { name: "Spanish", progress: 75 },
 *   { name: "French", progress: 50 }
 * ];
 * 
 * <LanguageSection languages={languages} accentColor="#10b981" />
 * ```
 */
export const LanguageSection = ({ languages, accentColor }) => (
  <div>
    {languages.map((lang, idx) => (
      <InfoBlock key={idx} label={lang.name} progress={lang.progress} accentColor={accentColor} />
    ))}
  </div>
);

/**
 * Skill Section Component
 * 
 * Displays technical and soft skills in a grid layout with optional
 * proficiency indicators for each skill.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.skills - Array of skill objects
 * @param {string} props.skills[].name - Skill name
 * @param {number} props.skills[].progress - Skill level (0-100)
 * @param {string} props.accentColor - Color for progress indicators
 * 
 * @returns {JSX.Element} A grid of skills with proficiency indicators
 * 
 * @example
 * ```jsx
 * const skills = [
 *   { name: "React", progress: 90 },
 *   { name: "Node.js", progress: 85 },
 *   { name: "TypeScript", progress: 80 }
 * ];
 * 
 * <SkillSection skills={skills} accentColor="#3b82f6" />
 * ```
 */
export const SkillSection = ({ skills, accentColor }) => (
  <div className={styles.skillGrid}>
    {skills.map((skill, idx) => (
      <InfoBlock key={idx} label={skill.name} progress={skill.progress} accentColor={accentColor} />
    ))}
  </div>
);

/**
 * Project Information Component
 * 
 * Displays project details with title, description, and external links
 * to GitHub repository and live demo. Includes proper security attributes
 * for external links.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Project title or name
 * @param {string} props.description - Project description or summary
 * @param {string} [props.githubLink] - GitHub repository URL (optional)
 * @param {string} [props.liveDemoUrl] - Live demo URL (optional)
 * @param {boolean} [props.isPreview] - Whether this is a preview display
 * 
 * @returns {JSX.Element} A project card with title, description, and action links
 * 
 * @example
 * ```jsx
 * <ProjectInfo
 *   title="E-commerce Platform"
 *   description="Full-stack web application built with React and Node.js"
 *   githubLink="https://github.com/user/ecommerce-app"
 *   liveDemoUrl="https://ecommerce-demo.com"
 *   isPreview={false}
 * />
 * ```
 */
export const ProjectInfo = ({ title, description, githubLink, liveDemoUrl, isPreview }) => (
  <div className={styles.projectContainer}>
    <h3 className={styles.projectTitle(isPreview)}>{title}</h3>
    <p className={styles.projectDesc}>{description}</p>
    <div className={styles.projectLinks}>
      {/* GitHub repository link with icon */}
      {githubLink && (
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
          <Github size={16} /><span>GitHub</span>
        </a>
      )}
      {/* Live demo link with icon */}
      {liveDemoUrl && (
        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
          <ExternalLink size={16} /><span>Live Demo</span>
        </a>
      )}
    </div>
  </div>
);

/**
 * Rating Input Component
 * 
 * Interactive rating component with clickable dots for skill assessment.
 * Converts percentage values to visual dot representation.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.value=0] - Current rating value (0-100)
 * @param {number} [props.total=5] - Total number of rating dots
 * @param {Function} [props.onChange] - Callback function for rating changes
 * @param {string} [props.color='#10b981'] - Color for active rating dots
 * @param {string} [props.bgColor='#e5e7eb'] - Color for inactive rating dots
 * 
 * @returns {JSX.Element} An interactive dot-based rating system
 * 
 * @example
 * ```jsx
 * const [skillLevel, setSkillLevel] = useState(80);
 * 
 * <RatingInput
 *   value={skillLevel}
 *   total={5}
 *   onChange={setSkillLevel}
 *   color="#3b82f6"
 *   bgColor="#e5e7eb"
 * />
 * ```
 */
export const RatingInput = ({ value = 0, total = 5, onChange = () => {}, color = '#10b981', bgColor = '#e5e7eb' }) => {
  const displayValue = Math.round((value / 100) * total);
  return (
    <div className={styles.ratingWrapper}>
      {[...Array(total)].map((_, idx) => (
        <div
          key={idx}
          onClick={() => onChange(Math.round(((idx + 1) / total) * 100))}
          className={styles.ratingDot}
          style={{ backgroundColor: idx < displayValue ? color : bgColor }}
        />
      ))}
    </div>
  );
};

/**
 * Work Experience Component
 * 
 * Displays professional work experience with company, role, duration,
 * and detailed description in a structured format.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.company - Company or organization name
 * @param {string} props.role - Job title or position
 * @param {string} props.duration - Employment duration (e.g., "2020 - Present")
 * @param {string} props.durationColor - Color for the duration text
 * @param {string} props.description - Detailed job description or responsibilities
 * 
 * @returns {JSX.Element} A structured work experience entry
 * 
 * @example
 * ```jsx
 * <WorkExperience
 *   company="Tech Solutions Inc."
 *   role="Senior Software Engineer"
 *   duration="2020 - Present"
 *   durationColor="#6b7280"
 *   description="Led development of microservices architecture and mentored junior developers..."
 * />
 * ```
 */
export const WorkExperience = ({ company, role, duration, durationColor, description }) => (
  <div className={styles.workContainer}>
    {/* Header with company, role, and duration */}
    <div className={styles.workHeader}>
      <div>
        <h3 className={styles.workCompany}>{company}</h3>
        <p className={styles.workRole}>{role}</p>
      </div>
      <p className={styles.workDuration(durationColor)} style={{ color: durationColor }}>{duration}</p>
    </div>
    {/* Job description */}
    <p className={styles.workDesc}>{description}</p>
  </div>
);