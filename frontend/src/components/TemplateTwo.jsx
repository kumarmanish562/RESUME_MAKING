/**
 * @fileoverview Template Two Component for Resume Builder Application
 * 
 * This component renders a professional, clean resume template with a minimalist design.
 * It features a centered header, well-organized sections, and responsive scaling to fit
 * different container sizes while maintaining proper proportions and readability.
 * 
 * Key Features:
 * - Clean, professional layout with centered header design
 * - Responsive scaling based on container width
 * - Comprehensive sections: summary, experience, projects, education, skills, certifications
 * - Interactive links for contact information and project portfolios
 * - Technology tags and skill badges for better visual organization
 * - Optimized typography with carefully chosen font sizes and spacing
 * - Print-ready design with proper page dimensions (1123px height)
 * 
 * Design Characteristics:
 * - Minimalist aesthetic with subtle borders and spacing
 * - Gray color scheme for professional appearance
 * - Compact layout maximizing content density
 * - Hover effects on interactive elements
 * - Consistent section formatting and typography
 * 
 * Usage:
 * ```jsx
 * <TemplateTwo
 *   resumeData={userResumeData}
 *   containerWidth={800}
 * />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuExternalLink, LuGithub } from "react-icons/lu";
import { formatYearMonth } from "../utils/helper";

/**
 * Shared CSS class for section titles across the template
 * Provides consistent styling for all section headers
 * @constant {string} sectionTitleClass
 */
const sectionTitleClass = "text-base font-bold uppercase tracking-wide mb-1 pb-1 border-b border-gray-300";

/**
 * TemplateTwo Component
 * 
 * A professional resume template featuring a clean, minimalist design with centered
 * header layout. This template emphasizes readability and professional presentation
 * with well-organized sections and responsive scaling capabilities.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.resumeData={}] - Complete resume data object
 * @param {Object} [props.resumeData.profileInfo] - Personal information (name, designation, summary)
 * @param {Object} [props.resumeData.contactInfo] - Contact details (phone, email, social links)
 * @param {Array} [props.resumeData.education] - Educational background entries
 * @param {Array} [props.resumeData.languages] - Language proficiencies
 * @param {Array} [props.resumeData.workExperience] - Professional work experience
 * @param {Array} [props.resumeData.projects] - Project portfolio entries
 * @param {Array} [props.resumeData.skills] - Technical and soft skills
 * @param {Array} [props.resumeData.certifications] - Professional certifications
 * @param {Array} [props.resumeData.interests] - Personal interests and hobbies
 * @param {number} props.containerWidth - Width of the container for responsive scaling
 * 
 * @returns {JSX.Element} The rendered resume template
 * 
 * @example
 * ```jsx
 * const resumeData = {
 *   profileInfo: {
 *     fullName: "John Doe",
 *     designation: "Software Engineer",
 *     summary: "Experienced developer with 5+ years..."
 *   },
 *   contactInfo: {
 *     email: "john@example.com",
 *     phone: "+1-234-567-8900",
 *     linkedin: "https://linkedin.com/in/johndoe"
 *   },
 *   // ... other sections
 * };
 * 
 * <TemplateTwo resumeData={resumeData} containerWidth={800} />
 * ```
 */
const TemplateTwo = ({ resumeData = {}, containerWidth }) => {
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
  
  // State for tracking the actual width of the resume container
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
      className="resume-section p-4 bg-white font-sans text-black max-w-4xl mx-auto"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
        height: "1123px", // Standard A4 height for print compatibility
        overflow: "hidden",
      }}
    >
      {/* Header Section - Centered layout with name, designation, and contact links */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight mb-2">{profileInfo.fullName}</h1>
        <p className="text-sm text-gray-600 font-medium mb-2">{profileInfo.designation}</p>
        
        {/* Contact information with interactive links */}
        <div className="flex flex-wrap justify-center gap-1 text-[11px] text-gray-700">
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="hover:underline text-blue-600">
              {contactInfo.email}
            </a>
          )}
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} className="hover:underline text-blue-600">
              LinkedIn
            </a>
          )}
          {contactInfo.github && (
            <a href={contactInfo.github} className="hover:underline text-blue-600">
              GitHub
            </a>
          )}
          {contactInfo.website && (
            <a href={contactInfo.website} className="hover:underline text-blue-600">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Horizontal divider */}
      <hr className="border-gray-300 mb-2" />

      {/* Professional Summary Section */}
      {profileInfo.summary && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Summary</h2>
          <p className="text-[11px] text-gray-800 leading-tight">{profileInfo.summary}</p>
        </section>
      )}

      {/* Work Experience Section */}
      {workExperience.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Experience</h2>
          <div className="space-y-2">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="space-y-0.5">
                {/* Experience header with role, company, and dates */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[12px] pb-2 text-gray-800">{exp.role}</h3>
                    <p className="italic text-[11px] pb-2 text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-[11px] text-right text-gray-600">
                    <p className="italic">
                      {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                    </p>
                    {exp.location && <p className="text-[11px]">{exp.location}</p>}
                  </div>
                </div>
                
                {/* Technology stack badge */}
                {exp.technologies && (
                  <p className="bg-gray-100 text-[10px] font-mono px-1.5 py-0.5 rounded inline-block">
                    {exp.technologies}
                  </p>
                )}
                
                {/* Experience description with bullet points */}
                <ul className=" mt-0.5 text-[12px] text-gray-700">
                  {exp.description?.split("\n").map((line, i) => (
                    <li key={i} className="pb-1">{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Projects</h2>
          <div className="space-y-2">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                {/* Project header with title and external link */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[12px] text-gray-800">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 text-[11px] hover:underline">
                      {proj.linkType || "Link"}
                    </a>
                  )}
                </div>
                
                {/* Technology stack for the project */}
                {proj.technologies && (
                  <p className="bg-gray-100 pb-2 text-[10px] font-mono px-1.5 py-0.5 rounded inline-block">
                    {proj.technologies}
                  </p>
                )}
                
                {/* Project description */}
                <p className="text-[11px] pb-2 text-gray-700 ">{proj.description}</p>
                
                {/* Project links (GitHub and live demo) */}
                <div className="flex gap-1 mt-0.5 pt-2 text-[11px]">
                  {proj.github && (
                    <a href={proj.github} className="flex items-center gap-0.5 hover:underline text-blue-600">
                      <LuGithub size={10} /> GitHub
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a href={proj.liveDemo} className="flex items-center gap-0.5 hover:underline text-blue-600">
                      <LuExternalLink size={10} /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Education</h2>
          <div className="space-y-1">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-0.25">
                {/* Education header with degree and dates */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[12px] pb-2 text-gray-800">{edu.degree}</h3>
                  <p className="italic text-[11px] pb-2 text-gray-600">
                    {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                  </p>
                </div>
                <p className="italic text-[11px] text-gray-700">{edu.institution}</p>
                
                {/* Relevant coursework */}
                {edu.courses && (
                  <p className="text-[11px]">
                    <strong>Courses:</strong> {edu.courses}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Skills</h2>
          <ul className="text-[11px] text-gray-800 flex flex-wrap gap-1">
            {skills.map((skill, idx) => (
              <li key={idx} className="w-fit">{skill.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Certifications</h2>
          <ul className="list-disc list-inside text-[11px] text-gray-700">
            {certifications.map((cert, idx) => (
              <li key={idx} className="leading-tight">
                {cert.title} — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages & Interests Section - Two-column layout */}
      {(languages.length > 0 || interests.length > 0) && (
        <section className="mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Languages subsection */}
            {languages.length > 0 && (
              <div>
                <h2 className={sectionTitleClass}>Languages</h2>
                <ul className="flex flex-wrap gap-1 text-[11px] text-gray-700">
                  {languages.map((lang, idx) => (
                    <li key={idx} className="bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {lang.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Interests subsection */}
            {interests.length > 0 && interests.some(Boolean) && (
              <div>
                <h2 className={sectionTitleClass}>Interests</h2>
                <ul className="flex flex-wrap gap-1 text-[11px] text-gray-700">
                  {interests.filter(Boolean).map((int, idx) => (
                    <li key={idx} className="bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {int}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default TemplateTwo;