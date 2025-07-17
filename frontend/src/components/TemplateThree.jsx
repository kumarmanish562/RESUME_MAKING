/**
 * @fileoverview Template Three Component for Resume Builder Application
 * 
 * This component renders a sophisticated two-column resume template with a professional
 * sidebar layout. It features intelligent skill categorization, comprehensive contact
 * information display, and optimized content organization for maximum readability.
 * 
 * Key Features:
 * - Two-column layout with dedicated sidebar for contact and skills
 * - Intelligent skill grouping by category (Automation, Product Management, Languages)
 * - Responsive scaling with dynamic width calculations
 * - Professional typography with uppercase section headers
 * - Interactive contact links with proper URL formatting
 * - Comprehensive sections: experience, projects, education, certifications, interests
 * - Clean visual separation with borders and spacing
 * - Optimized for both screen viewing and printing
 * 
 * Design Characteristics:
 * - Left sidebar (5/12 width): Contact info, skills, education, certifications, interests
 * - Main content area (7/12 width): Work experience and projects
 * - Professional gray color scheme with blue accent links
 * - Consistent uppercase section headers with tracking
 * - Bullet points and structured content presentation
 * - Responsive grid system for different screen sizes
 * 
 * Usage:
 * ```jsx
 * <TemplateThree
 *   resumeData={userResumeData}
 *   containerWidth={1100}
 * />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

/**
 * TemplateThree Component
 * 
 * A sophisticated two-column resume template featuring a professional sidebar layout
 * with intelligent content organization. This template emphasizes structured presentation
 * with clear visual hierarchy and categorized skill groupings.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.resumeData={}] - Complete resume data object
 * @param {Object} [props.resumeData.profileInfo] - Personal information (name, designation, summary)
 * @param {Object} [props.resumeData.contactInfo] - Contact details with location, phone, email, social links
 * @param {Array} [props.resumeData.education] - Educational background entries
 * @param {Array} [props.resumeData.workExperience] - Professional work experience with descriptions
 * @param {Array} [props.resumeData.projects] - Project portfolio with links and technologies
 * @param {Array} [props.resumeData.skills] - Technical and soft skills (automatically categorized)
 * @param {Array} [props.resumeData.certifications] - Professional certifications with years
 * @param {Array} [props.resumeData.interests] - Personal interests and hobbies
 * @param {number} props.containerWidth - Width of the container for responsive scaling
 * 
 * @returns {JSX.Element} The rendered two-column resume template
 * 
 * @example
 * ```jsx
 * const resumeData = {
 *   profileInfo: {
 *     fullName: "Jane Smith",
 *     designation: "Senior Software Engineer",
 *     summary: "Experienced full-stack developer with expertise in..."
 *   },
 *   contactInfo: {
 *     location: "San Francisco, CA",
 *     phone: "+1-555-123-4567",
 *     email: "jane@example.com",
 *     linkedin: "https://linkedin.com/in/janesmith",
 *     github: "https://github.com/janesmith"
 *   },
 *   skills: [
 *     { name: "Python" },
 *     { name: "Selenium/Webdriver" },
 *     { name: "Agile" }
 *   ],
 *   // ... other sections
 * };
 * 
 * <TemplateThree resumeData={resumeData} containerWidth={1100} />
 * ```
 */
const TemplateThree = ({ resumeData = {}, containerWidth }) => {
  /**
   * Destructure resume data with default empty values
   * Ensures component stability even with incomplete data
   */
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
  } = resumeData;

  // Reference to the main resume container for dimension calculations
  const resumeRef = useRef(null);
  
  // State for tracking the actual width of the resume container (default: 1100px for wide layout)
  const [baseWidth, setBaseWidth] = useState(1100);
  
  // State for the scaling factor based on container width
  const [scale, setScale] = useState(1);

  /**
   * Effect hook for responsive scaling calculations
   * Updates the scale factor when container width changes to maintain proper proportions
   */
  useEffect(() => {
    if (resumeRef.current) {
      const actualBaseWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualBaseWidth);
      if (containerWidth > 0) {
        setScale(containerWidth / actualBaseWidth);
      }
    }
  }, [containerWidth]);

  /**
   * Intelligent skill categorization system
   * Automatically groups skills into predefined categories for better organization
   * Categories: Automation & Test tools, Product Management, Languages, Other Skills
   */
  const groupedSkills = {
    "Automation & Test tools": [],
    "Product Management": [],
    Languages: [],
    "Other Skills": []
  };

  // Categorize skills based on predefined skill sets
  skills.forEach(skill => {
    if (["Selenium/Webdriver", "TestNG", "Jenkins"].includes(skill.name)) {
      groupedSkills["Automation & Test tools"].push(skill.name);
    } else if (["Agile", "Scrum", "JIRA", "Microsoft TFS"].includes(skill.name)) {
      groupedSkills["Product Management"].push(skill.name);
    } else if (["Python", "Java", "Javascript", "Databases (MySQL)"].includes(skill.name)) {
      groupedSkills.Languages.push(skill.name);
    } else {
      groupedSkills["Other Skills"].push(skill.name);
    }
  });

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans a4-wrapper text-black max-w-screen-lg mx-auto"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      {/* Header Section - Centered layout with name, designation, and summary */}
      <header className="px-8 pt-8 pb-4 mb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase mb-3">{profileInfo.fullName}</h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {profileInfo.designation}
          </h2>
        </div>
        
        {/* Professional summary paragraph */}
        <p className="text-sm text-gray-700 leading-tight mb-4">
          {profileInfo.summary}
        </p>
      </header>

      {/* Two-Column Layout: 12-column grid system */}
      <div className="grid grid-cols-12 gap-4 px-8 pb-8">
        
        {/* LEFT SIDEBAR - 5 columns: Contact, Skills, Education, Certifications, Interests */}
        <aside className="col-span-5 space-y-5 pr-4 border-r border-gray-300">
          
          {/* Contact Information Section */}
          <section>
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">CONTACT</h2>
            <ul className="text-xs text-gray-700 space-y-2 pb-2">
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Location:</span>
                {contactInfo.location}
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Phone:</span>
                {contactInfo.phone}
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Email:</span>
                <a href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 hover:underline">
                  {contactInfo.email}
                </a>
              </li>
              
              {/* LinkedIn profile with shortened display URL */}
              {contactInfo.linkedin && (
                <li className="flex items-start ">
                  <span className="font-semibold min-w-[65px]">LinkedIn:</span>
                  <a href={contactInfo.linkedin}
                    className="text-blue-600 hover:underline truncate pb-1"
                    title={contactInfo.linkedin}>
                    linkedin.com/in/{contactInfo.linkedin.split('/').pop()}
                  </a>
                </li>
              )}
              
              {/* GitHub profile with shortened display URL */}
              {contactInfo.github && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[65px] ">GitHub:</span>
                  <a href={contactInfo.github}
                    className="text-blue-600 hover:underline pb-2 truncate"
                    title={contactInfo.github}>
                    github.com/{contactInfo.github.split('/').pop()}
                  </a>
                </li>
              )}
              
              {/* Portfolio website with cleaned display URL */}
              {contactInfo.website && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[65px]">Portfolio:</span>
                  <a href={contactInfo.website}
                    className="text-blue-600 hover:underline pb-2 truncate"
                    title={contactInfo.website}>
                    {contactInfo.website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </li>
              )}
            </ul>
          </section>

          {/* Skills Section with Intelligent Categorization */}
          <section>
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">SKILLS</h2>
            {Object.entries(groupedSkills).map(([category, skillsList]) => (
              skillsList.length > 0 && (
                <div key={category} className="mb-2">
                  {/* Display category name for organized skill groups */}
                  {category !== "Other Skills" && (
                    <h3 className="text-xs font-semibold italic mb-1">{category}:</h3>
                  )}
                  <ul className="text-xs text-gray-700">
                    {skillsList.map((skill, idx) => (
                      <li key={idx} className="mb-1">{skill}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </section>

          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider">EDUCATION</h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="text-xs">
                    <h3 className="font-bold pb-2">{edu.institution}</h3>
                    <p className=" pb-2 ">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">CERTIFICATIONS</h2>
              <ul className="text-xs text-gray-700 space-y-1">
                {certifications.map((cert, idx) => (
                  <li key={idx}>{cert.title} ({cert.year})</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests Section */}
          {interests.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">INTERESTS</h2>
              <ul className="text-xs text-gray-700 space-y-1">
                {interests.map((interest, idx) => (
                  <li key={idx}>• {interest}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* MAIN CONTENT AREA - 7 columns: Work Experience and Projects */}
        <main className="col-span-7 space-y-5 pl-4">
          
          {/* Work Experience Section */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider border-b border-gray-400 pb-1">WORK EXPERIENCE</h2>
              <div className="space-y-5">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="text-xs">
                    {/* Experience header with role, company, location, and dates */}
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold pb-2">{exp.role}</h3>
                        <p className="italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                      </div>
                      {exp.startDate && exp.endDate && (
                        <div className="text-right italic">
                          {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                        </div>
                      )}
                    </div>
                    
                    {/* Experience description with bullet points */}
                    <ul className="list-disc list-inside space-y-1 mt-1 pl-1">
                      {exp.description?.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                      {!exp.description && idx === 0}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider border-b border-gray-400 pb-1">PROJECTS</h2>
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="text-xs">
                    {/* Project header with title and dates */}
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{proj.title}</h3>
                      {proj.startDate && proj.endDate && (
                        <div className="text-right italic">
                          {formatYearMonth(proj.startDate)} – {formatYearMonth(proj.endDate)}
                        </div>
                      )}
                    </div>

                    {/* Project description */}
                    <p className="mt-1 mb-1">{proj.description}</p>

                    {/* Project links and technologies */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {proj.github && (
                        <a href={proj.github}
                          className="text-blue-600 hover:underline flex items-center text-xs">
                          <span>GitHub</span>
                        </a>
                      )}
                      {proj.liveDemo && (
                        <a href={proj.liveDemo}
                          className="text-blue-600 hover:underline flex items-center text-xs">
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.technologies && (
                        <span className="text-gray-600">
                          <strong>Tech:</strong> {proj.technologies.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TemplateThree;