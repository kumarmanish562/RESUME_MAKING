/**
 * @fileoverview Template One Component for Resume Builder Application
 * 
 * This component renders the primary resume template featuring a classic two-column layout
 * with customizable color theming. It provides a professional, clean design suitable for
 * traditional resume formats with emphasis on work experience and projects in the main column.
 * 
 * Key Features:
 * - Classic two-column layout (2/3 main content, 1/3 sidebar)
 * - Customizable color palette with default blue theme
 * - Professional header with split contact information layout
 * - Responsive scaling with dynamic width calculations
 * - Reusable section components for consistent formatting
 * - Interactive contact links with proper accessibility
 * - Comprehensive sections: summary, experience, projects, skills, education
 * - Tag-based skill and interest display with themed backgrounds
 * - Icon integration for enhanced visual appeal
 * 
 * Design Characteristics:
 * - Left column (2/3): Professional summary, work experience, projects
 * - Right column (1/3): Skills, education, certifications, languages, interests
 * - Header split: Contact info on left, social links on right
 * - Color-coded section titles with underline accents
 * - Rounded skill tags with theme-based background colors
 * - Professional typography with consistent spacing
 * 
 * Usage:
 * ```jsx
 * <TemplateOne
 *   resumeData={userResumeData}
 *   colorPalette={customColors}
 *   containerWidth={800}
 * />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

import React, { useEffect, useRef, useState } from "react";
import { LuMail, LuPhone, LuGithub, LuGlobe } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import {
  EducationInfo,
  WorkExperience,
  ProjectInfo,
  CertificationInfo,
} from "./ResumeSection";
import { formatYearMonth } from "../utils/helper";

/**
 * Default color palette for the template
 * Professional blue theme with varying shades for different elements
 * @constant {string[]} DEFAULT_THEME
 */
const DEFAULT_THEME = ["#ffffff", "#0d47a1", "#1e88e5", "#64b5f6", "#bbdefb"];

/**
 * Title Component
 * 
 * Renders section titles with colored underlines for visual hierarchy
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The title text to display
 * @param {string} props.color - The color for the title and underline
 * 
 * @returns {JSX.Element} The styled section title with underline
 */
const Title = ({ text, color }) => (
  <div className="relative w-fit mb-2 resume-section-title">
    <h2 className="relative text-base font-bold uppercase tracking-wide pb-2" style={{ color }}>
      {text}
    </h2>
    <div className="w-full h-[2px] mt-1" style={{ backgroundColor: color }} />
  </div>
);

/**
 * TemplateOne Component
 * 
 * The primary resume template featuring a classic two-column layout with customizable
 * color theming. This template emphasizes professional presentation with work experience
 * and projects taking prominence in the main content area.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.resumeData={}] - Complete resume data object
 * @param {Object} [props.resumeData.profileInfo] - Personal information (name, designation, summary)
 * @param {Object} [props.resumeData.contactInfo] - Contact details (email, phone, location, social links)
 * @param {Array} [props.resumeData.education] - Educational background entries
 * @param {Array} [props.resumeData.languages] - Language proficiencies
 * @param {Array} [props.resumeData.workExperience] - Professional work experience with detailed descriptions
 * @param {Array} [props.resumeData.projects] - Project portfolio with GitHub and demo links
 * @param {Array} [props.resumeData.skills] - Technical and soft skills (displayed as tags)
 * @param {Array} [props.resumeData.certifications] - Professional certifications with issuers and years
 * @param {Array} [props.resumeData.interests] - Personal interests and hobbies (displayed as tags)
 * @param {string[]} [props.colorPalette] - Custom color palette (falls back to DEFAULT_THEME)
 * @param {number} props.containerWidth - Width of the container for responsive scaling
 * 
 * @returns {JSX.Element} The rendered classic two-column resume template
 * 
 * @example
 * ```jsx
 * const resumeData = {
 *   profileInfo: {
 *     fullName: "Alex Johnson",
 *     designation: "Full Stack Developer",
 *     summary: "Passionate developer with 3+ years of experience..."
 *   },
 *   contactInfo: {
 *     email: "alex@example.com",
 *     phone: "+1-555-987-6543",
 *     location: "New York, NY",
 *     linkedin: "https://linkedin.com/in/alexjohnson",
 *     github: "https://github.com/alexjohnson",
 *     website: "https://alexjohnson.dev"
 *   },
 *   skills: [
 *     { name: "React" },
 *     { name: "Node.js" },
 *     { name: "TypeScript" }
 *   ],
 *   // ... other sections
 * };
 * 
 * const customColors = ["#ffffff", "#2e7d32", "#4caf50", "#81c784", "#c8e6c9"];
 * 
 * <TemplateOne
 *   resumeData={resumeData}
 *   colorPalette={customColors}
 *   containerWidth={800}
 * />
 * ```
 */
const TemplateOne = ({ resumeData = {}, colorPalette, containerWidth }) => {
  /**
   * Destructure resume data with default empty values
   * Ensures component stability even with incomplete data
   */
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
  } = resumeData;

  // Reference to the main resume container for dimension calculations
  const resumeRef = useRef(null);
  
  // State for tracking the actual width of the resume container (default: 800px)
  const [baseWidth, setBaseWidth] = useState(800);
  
  // State for the scaling factor based on container width
  const [scale, setScale] = useState(1);

  /**
   * Effect hook for responsive scaling calculations
   * Updates the scale factor when container width changes to maintain proper proportions
   */
  useEffect(() => {
    if (resumeRef.current && containerWidth > 0) {
      const actualWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualWidth);
      setScale(containerWidth / actualWidth);
    }
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-6 bg-white font-sans text-gray-800"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Header Section - Split layout with contact info and social links */}
      <div className="resume-section flex justify-between items-start mb-6">
        
        {/* Left side: Name, designation, and primary contact info */}
        <div>
          <h1 className="text-3xl font-bold pb-2" >
            {profileInfo.fullName}
          </h1>
          <p className="text-lg font-medium pb-2">{profileInfo.designation}</p>
          
          {/* Primary contact information with icons */}
          <div className="flex flex-wrap gap-3 text-sm">
            {contactInfo.email && (
              <div className="flex items-center">
                <LuMail className="mr-1" />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center">
                <LuPhone className="mr-1" />
                <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                  {contactInfo.phone}
                </a>
              </div>
            )}
            {contactInfo.location && (
              <div className="flex items-center">
                <span>{contactInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side: Social media and portfolio links */}
        <div className="flex flex-col items-end text-sm">
          {contactInfo.linkedin && (
            <div className="flex items-center mb-1">
              <RiLinkedinLine className="mr-1" />
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {contactInfo.github && (
            <div className="flex items-center mb-1">
              <LuGithub className="mr-1" />
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </div>
          )}
          {contactInfo.website && (
            <div className="flex items-center">
              <LuGlobe className="mr-1" />
              <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary Section */}
      {profileInfo.summary && (
        <div className="resume-section mb-3">
          <Title text="Professional Summary" />
          <p className="text-sm leading-relaxed">{profileInfo.summary}</p>
        </div>
      )}

      {/* Two-Column Layout: Main content (2/3) and Sidebar (1/3) */}
      <div className="grid grid-cols-3 gap-8">
        
        {/* Left Column - Main Content Area (2/3 width) */}
        <div className="col-span-2 space-y-4">
          
          {/* Work Experience Section */}
          {workExperience.length > 0 && (
            <div className="resume-section">
              <Title text="Work Experience" />
              <div className="space-y-6">
                {workExperience.map((exp, i) => (
                  <WorkExperience
                    key={i}
                    company={exp.company}
                    role={exp.role}
                    duration={`${formatYearMonth(exp.startDate)} - ${formatYearMonth(
                      exp.endDate
                    )}`}
                    description={exp.description}
                    durationColor={[2]} // Theme color index for duration text
                  />
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <div className="resume-section">
              <Title text="Projects" />
              <div className="space-y-4">
                {projects.map((proj, i) => (
                  <ProjectInfo
                    key={i}
                    title={proj.title}
                    description={proj.description}
                    githubLink={proj.github}
                    liveDemoUrl={proj.liveDemo}
                    bgColor={[4]} // Theme color index for project backgrounds
                    headingClass="pb-2" // Additional styling for project headings
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar Content (1/3 width) */}
        <div className="col-span-1 space-y-6">
          
          {/* Skills Section with Tag Display */}
          {skills.length > 0 && (
            <div className="resume-section">
              <Title text="Skills" />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{ backgroundColor: [4] }} // Theme color for skill tags
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="resume-section">
              <Title text="Education" />
              <div className="space-y-4 pb-2">
                {education.map((edu, i) => (
                  <EducationInfo
                    key={i}
                    degree={edu.degree}
                    institution={edu.institution}
                    duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(
                      edu.endDate
                    )}`}
                  />
                ))}
                <br />
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <div className="resume-section">
              <Title text="Certifications" />
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <CertificationInfo
                    key={i}
                    title={cert.title}
                    issuer={cert.issuer}
                    year={cert.year}
                    bgColor={[4]} // Theme color for certification backgrounds
                  />
                ))}
              </div>
            </div>
          )}

          {/* Languages Section with Tag Display */}
          {languages.length > 0 && (
            <div className="resume-section">
              <Title text="Languages" />
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{ backgroundColor: [4] }} // Theme color for language tags
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests Section with Tag Display */}
          {interests.length > 0 && interests.some((i) => i) && (
            <div className="resume-section">
              <Title text="Interests" />
              <div className="flex flex-wrap gap-2">
                {interests.map((int, i) =>
                  int ? (
                    <span
                      key={i}
                      className="text-xs font-medium px-2 py-1 rounded"
                      style={{ backgroundColor: [4] }} // Theme color for interest tags
                    >
                      {int}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;