/**
 * @fileoverview Resume Form Components Library
 * 
 * A comprehensive collection of form components for building and editing resume
 * sections. Each component handles a specific aspect of the resume data with
 * standardized CRUD operations (Create, Read, Update, Delete) for array-based
 * and object-based data structures.
 * 
 * @author Resume Builder Team
 * @since 1.0.0
 * 
 * Form Components:
 * - AdditionalInfoForm: Languages and interests management
 * - CertificationInfoForm: Professional certifications and credentials
 * - ContactInfoForm: Personal contact information and social links
 * - EducationDetailsForm: Educational background and qualifications
 * - ProfileInfoForm: Personal information and professional summary
 * - ProjectDetailForm: Project portfolio with descriptions and links
 * - SkillsInfoForm: Technical and soft skills with proficiency ratings
 * - WorkExperienceForm: Professional work history and achievements
 * 
 * Key Features:
 * - Standardized array manipulation (add, update, remove items)
 * - Consistent styling through dummystyle design system
 * - Form validation and user input handling
 * - Responsive grid layouts for optimal mobile and desktop experience
 * - Interactive rating systems for skills and language proficiency
 * - Dynamic add/remove functionality with visual feedback
 * 
 * Design Patterns:
 * - Controlled components with external state management
 * - Consistent prop interfaces across all form components
 * - Reusable Input and RatingInput component integration
 * - Grid-based responsive layouts with Tailwind CSS
 * - Icon integration with Lucide React for intuitive UX
 * 
 * Data Flow:
 * 1. Parent component manages resume data state
 * 2. Form components receive data and update callbacks
 * 3. User interactions trigger state updates via callbacks
 * 4. Changes are reflected immediately in the UI and preview
 * 
 * Dependencies:
 * - Input: Reusable input component with validation
 * - RatingInput: Interactive rating component for proficiency levels
 * - Lucide React: Icons for add/remove actions
 * - dummystyle: Comprehensive styling definitions
 * 
 * @example
 * ```jsx
 * // Basic form usage with state management
 * const [resumeData, setResumeData] = useState(initialData);
 * 
 * const updateArrayItem = (section, index, field, value) => {
 *   // Update logic for array-based sections
 * };
 * 
 * const addArrayItem = (section, newItem) => {
 *   // Add logic for array-based sections
 * };
 * 
 * <WorkExperienceForm
 *   workExperience={resumeData.workExperience}
 *   updateArrayItem={updateArrayItem}
 *   addArrayItem={addArrayItem}
 *   removeArrayItem={removeArrayItem}
 * />
 * ```
 */

"use client";

import { Input } from "./Input";
import { RatingInput } from "./ResumeSection";
import { Plus, Trash2 } from "lucide-react";
import {
  commonStyles,
  additionalInfoStyles,
  certificationInfoStyles,
  contactInfoStyles,
  educationDetailsStyles,
  profileInfoStyles,
  projectDetailStyles,
  skillsInfoStyles,
  workExperienceStyles
} from "../assets/dummystyle";

/**
 * Additional Information Form Component
 * 
 * Manages languages and interests sections of the resume. Handles language
 * proficiency ratings and simple text-based interests with dynamic add/remove
 * functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.languages - Array of language objects with name and progress
 * @param {Array<string>} props.interests - Array of interest strings
 * @param {Function} props.updateArrayItem - Callback to update array items
 * @param {Function} props.addArrayItem - Callback to add new array items
 * @param {Function} props.removeArrayItem - Callback to remove array items
 * 
 * @returns {JSX.Element} Form section for languages and interests
 * 
 * @example
 * ```jsx
 * <AdditionalInfoForm
 *   languages={[{name: "English", progress: 100}, {name: "Spanish", progress: 75}]}
 *   interests={["Reading", "Photography", "Travel"]}
 *   updateArrayItem={handleUpdateArrayItem}
 *   addArrayItem={handleAddArrayItem}
 *   removeArrayItem={handleRemoveArrayItem}
 * />
 * ```
 */
// AdditionalInfoForm Component
export const AdditionalInfoForm = ({ languages, interests, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={additionalInfoStyles.container}>
      <h2 className={additionalInfoStyles.heading}>Additional Information</h2>

      {/* Languages Section */}
      <div className="mb-10">
        <h3 className={additionalInfoStyles.sectionHeading}>
          <div className={additionalInfoStyles.dotViolet}></div>
          Languages
        </h3>
        <div className="space-y-6">
          {/* Language items with name and proficiency rating */}
          {languages?.map((lang, index) => (
            <div key={index} className={additionalInfoStyles.languageItem}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Language name input */}
                <Input
                  label="Language"
                  placeholder="e.g. English"
                  value={lang.name || ""}
                  onChange={({ target }) => updateArrayItem("languages", index, "name", target.value)}
                />
                {/* Proficiency rating */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-4">Proficiency</label>
                  <RatingInput
                    value={lang.progress || 0}
                    total={5}
                    color="#8b5cf6"
                    bgColor="#e2e8f0"
                    onChange={(value) => updateArrayItem("languages", index, "progress", value)}
                  />
                </div>
              </div>
              {/* Remove language button (only show if more than one language) */}
              {languages.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem("languages", index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          {/* Add new language button */}
          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${additionalInfoStyles.addButtonLanguage}`}
            onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
          >
            <Plus size={16} /> Add Language
          </button>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-6">
        <h3 className={additionalInfoStyles.sectionHeading}>
          <div className={additionalInfoStyles.dotOrange}></div>
          Interests
        </h3>
        <div className="space-y-4">
          {/* Interest items */}
          {interests?.map((interest, index) => (
            <div key={index} className={additionalInfoStyles.interestItem}>
              <Input
                placeholder="e.g. Reading, Photography"
                value={interest || ""}
                onChange={({ target }) => updateArrayItem("interests", index, null, target.value)}
              />
              {/* Remove interest button (only show if more than one interest) */}
              {interests.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          {/* Add new interest button */}
          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${additionalInfoStyles.addButtonInterest}`}
            onClick={() => addArrayItem("interests", "")}
          >
            <Plus size={16} /> Add Interest
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Certification Information Form Component
 * 
 * Manages professional certifications including title, issuing organization,
 * and year obtained. Supports multiple certifications with add/remove functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.certifications - Array of certification objects
 * @param {Function} props.updateArrayItem - Callback to update certification data
 * @param {Function} props.addArrayItem - Callback to add new certifications
 * @param {Function} props.removeArrayItem - Callback to remove certifications
 * 
 * @returns {JSX.Element} Form section for professional certifications
 * 
 * @example
 * ```jsx
 * <CertificationInfoForm
 *   certifications={[
 *     {title: "AWS Solutions Architect", issuer: "Amazon", year: "2023"}
 *   ]}
 *   updateArrayItem={handleUpdate}
 *   addArrayItem={handleAdd}
 *   removeArrayItem={handleRemove}
 * />
 * ```
 */
// CertificationInfoForm Component
export const CertificationInfoForm = ({ certifications, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={certificationInfoStyles.container}>
      <h2 className={certificationInfoStyles.heading}>Certifications</h2>
      <div className="space-y-6 mb-6">
        {/* Certification items */}
        {certifications.map((cert, index) => (
          <div key={index} className={certificationInfoStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certificate title */}
              <Input
                label="Certificate Title"
                placeholder="Full Stack Web Developer"
                value={cert.title || ""}
                onChange={({ target }) => updateArrayItem(index, "title", target.value)}
              />

              {/* Issuing organization */}
              <Input
                label="Issuer"
                placeholder="Coursera / Google / etc."
                value={cert.issuer || ""}
                onChange={({ target }) => updateArrayItem(index, "issuer", target.value)}
              />

              {/* Year obtained */}
              <Input
                label="Year"
                placeholder="2024"
                value={cert.year || ""}
                onChange={({ target }) => updateArrayItem(index, "year", target.value)}
              />
            </div>

            {/* Remove certification button (only show if more than one certification) */}
            {certifications.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Add new certification button */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${certificationInfoStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              title: "",
              issuer: "",
              year: "",
            })
          }
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>
    </div>
  );
};

/**
 * Contact Information Form Component
 * 
 * Manages personal contact details including address, email, phone, and
 * professional social media links (LinkedIn, GitHub, portfolio website).
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.contactInfo - Contact information object
 * @param {Function} props.updateSection - Callback to update contact fields
 * 
 * @returns {JSX.Element} Form section for contact information
 * 
 * @example
 * ```jsx
 * <ContactInfoForm
 *   contactInfo={{
 *     email: "user@example.com",
 *     phone: "123-456-7890",
 *     linkedin: "linkedin.com/in/user",
 *     github: "github.com/user"
 *   }}
 *   updateSection={handleContactUpdate}
 * />
 * ```
 */
// ContactInfoForm Component
export const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className={contactInfoStyles.container}>
      <h2 className={contactInfoStyles.heading}>Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address (full width) */}
        <div className="md:col-span-2">
          <Input
            label="Address"
            placeholder="Short Address"
            value={contactInfo.location || ""}
            onChange={({ target }) => updateSection("location", target.value)}
          />
        </div>

        {/* Email */}
        <Input
          label="Email"
          placeholder="john@example.com"
          type="email"
          value={contactInfo.email || ""}
          onChange={({ target }) => updateSection("email", target.value)}
        />

        {/* Phone number */}
        <Input
          label="Phone Number"
          placeholder="1234567890"
          value={contactInfo.phone || ""}
          onChange={({ target }) => updateSection("phone", target.value)}
        />

        {/* LinkedIn profile */}
        <Input
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          value={contactInfo.linkedin || ""}
          onChange={({ target }) => updateSection("linkedin", target.value)}
        />

        {/* GitHub profile */}
        <Input
          label="GitHub"
          placeholder="https://github.com/username"
          value={contactInfo.github || ""}
          onChange={({ target }) => updateSection("github", target.value)}
        />

        {/* Portfolio website (full width) */}
        <div className="md:col-span-2">
          <Input
            label="Portfolio / Website"
            placeholder="https://yourwebsite.com"
            value={contactInfo.website || ""}
            onChange={({ target }) => updateSection("website", target.value)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Education Details Form Component
 * 
 * Manages educational background including degree, institution, and date range.
 * Supports multiple education entries with chronological date inputs.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.educationInfo - Array of education objects
 * @param {Function} props.updateArrayItem - Callback to update education data
 * @param {Function} props.addArrayItem - Callback to add new education entries
 * @param {Function} props.removeArrayItem - Callback to remove education entries
 * 
 * @returns {JSX.Element} Form section for educational background
 * 
 * @example
 * ```jsx
 * <EducationDetailsForm
 *   educationInfo={[
 *     {
 *       degree: "Bachelor of Computer Science",
 *       institution: "University of Technology",
 *       startDate: "2018-09",
 *       endDate: "2022-06"
 *     }
 *   ]}
 *   updateArrayItem={handleUpdate}
 *   addArrayItem={handleAdd}
 *   removeArrayItem={handleRemove}
 * />
 * ```
 */
// EducationDetailsForm Component
export const EducationDetailsForm = ({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={educationDetailsStyles.container}>
      <h2 className={educationDetailsStyles.heading}>Education</h2>
      <div className="space-y-6 mb-6">
        {/* Education items */}
        {educationInfo.map((education, index) => (
          <div key={index} className={educationDetailsStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Degree/qualification */}
              <Input
                label="Degree"
                placeholder="BTech in Computer Science"
                value={education.degree || ""}
                onChange={({ target }) => updateArrayItem(index, "degree", target.value)}
              />

              {/* Educational institution */}
              <Input
                label="Institution"
                placeholder="XYZ University"
                value={education.institution || ""}
                onChange={({ target }) => updateArrayItem(index, "institution", target.value)}
              />

              {/* Start date */}
              <Input
                label="Start Date"
                type="month"
                value={education.startDate || ""}
                onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
              />

              {/* End date */}
              <Input
                label="End Date"
                type="month"
                value={education.endDate || ""}
                onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
              />
            </div>
            {/* Remove education button (only show if more than one education entry) */}
            {educationInfo.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Add new education button */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${educationDetailsStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          <Plus size={16} /> Add Education
        </button>
      </div>
    </div>
  );
};

/**
 * Profile Information Form Component
 * 
 * Manages core personal information including full name, professional
 * designation, and summary/bio. Forms the foundation of the resume identity.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.profileData - Profile information object
 * @param {Function} props.updateSection - Callback to update profile fields
 * 
 * @returns {JSX.Element} Form section for personal profile information
 * 
 * @example
 * ```jsx
 * <ProfileInfoForm
 *   profileData={{
 *     fullName: "John Doe",
 *     designation: "Full Stack Developer",
 *     summary: "Experienced developer with expertise in React and Node.js..."
 *   }}
 *   updateSection={handleProfileUpdate}
 * />
 * ```
 */
// ProfileInfoForm Component
export const ProfileInfoForm = ({ profileData, updateSection }) => {
  return (
    <div className={profileInfoStyles.container}>
      <h2 className={profileInfoStyles.heading}>Personal Information</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full name */}
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={profileData.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
          />

          {/* Professional designation */}
          <Input
            label="Designation"
            placeholder="Full Stack Developer"
            value={profileData.designation || ""}
            onChange={({ target }) => updateSection("designation", target.value)}
          />

          {/* Professional summary (full width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-3">Summary</label>
            <textarea
              className={profileInfoStyles.textarea}
              rows={4}
              placeholder="Short introduction about yourself"
              value={profileData.summary || ""}
              onChange={({ target }) => updateSection("summary", target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Project Details Form Component
 * 
 * Manages project portfolio including title, description, and links to
 * GitHub repository and live demos. Essential for showcasing practical work.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.projectInfo - Array of project objects
 * @param {Function} props.updateArrayItem - Callback to update project data
 * @param {Function} props.addArrayItem - Callback to add new projects
 * @param {Function} props.removeArrayItem - Callback to remove projects
 * 
 * @returns {JSX.Element} Form section for project portfolio
 * 
 * @example
 * ```jsx
 * <ProjectDetailForm
 *   projectInfo={[
 *     {
 *       title: "E-commerce Platform",
 *       description: "Full-stack web application...",
 *       github: "https://github.com/user/ecommerce",
 *       liveDemo: "https://demo.example.com"
 *     }
 *   ]}
 *   updateArrayItem={handleUpdate}
 *   addArrayItem={handleAdd}
 *   removeArrayItem={handleRemove}
 * />
 * ```
 */
// ProjectDetailForm Component
export const ProjectDetailForm = ({ projectInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={projectDetailStyles.container}>
      <h2 className={projectDetailStyles.heading}>Projects</h2>
      <div className="space-y-6 mb-6">
        {/* Project items */}
        {projectInfo.map((project, index) => (
          <div key={index} className={projectDetailStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project title (full width) */}
              <div className="md:col-span-2">
                <Input
                  label="Project Title"
                  placeholder="Portfolio Website"
                  value={project.title || ""}
                  onChange={({ target }) => updateArrayItem(index, "title", target.value)}
                />
              </div>

              {/* Project description (full width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-3">Description</label>
                <textarea
                  placeholder="Short description about the project"
                  className={projectDetailStyles.textarea}
                  rows={3}
                  value={project.description || ""}
                  onChange={({ target }) => updateArrayItem(index, "description", target.value)}
                />
              </div>

              {/* GitHub repository link */}
              <Input
                label="GitHub Link"
                placeholder="https://github.com/username/project"
                value={project.github || ""}
                onChange={({ target }) => updateArrayItem(index, "github", target.value)}
              />

              {/* Live demo URL */}
              <Input
                label="Live Demo URL"
                placeholder="https://yourproject.live"
                value={project.liveDemo || ""}
                onChange={({ target }) => updateArrayItem(index, "liveDemo", target.value)}
              />
            </div>

            {/* Remove project button (only show if more than one project) */}
            {projectInfo.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Add new project button */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${projectDetailStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>
    </div>
  );
};

/**
 * Skills Information Form Component
 * 
 * Manages technical and soft skills with proficiency ratings. Uses interactive
 * rating system to indicate skill levels from beginner to expert.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.skillsInfo - Array of skill objects with name and progress
 * @param {Function} props.updateArrayItem - Callback to update skill data
 * @param {Function} props.addArrayItem - Callback to add new skills
 * @param {Function} props.removeArrayItem - Callback to remove skills
 * 
 * @returns {JSX.Element} Form section for skills and proficiency levels
 * 
 * @example
 * ```jsx
 * <SkillsInfoForm
 *   skillsInfo={[
 *     {name: "React", progress: 90},
 *     {name: "Node.js", progress: 85},
 *     {name: "TypeScript", progress: 80}
 *   ]}
 *   updateArrayItem={handleUpdate}
 *   addArrayItem={handleAdd}
 *   removeArrayItem={handleRemove}
 * />
 * ```
 */
// SkillsInfoForm Component
export const SkillsInfoForm = ({ skillsInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={skillsInfoStyles.container}>
      <h2 className={skillsInfoStyles.heading}>Skills</h2>
      <div className="space-y-6 mb-6">
        {/* Skill items */}
        {skillsInfo.map((skill, index) => (
          <div key={index} className={skillsInfoStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill name */}
              <Input
                label="Skill Name"
                placeholder="JavaScript"
                value={skill.name || ""}
                onChange={({ target }) => updateArrayItem(index, "name", target.value)}
              />

              {/* Proficiency rating */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Proficiency ({skill.progress ? Math.round(skill.progress / 20) : 0}/5)
                </label>
                <div className="mt-2">
                  <RatingInput
                    value={skill.progress || 0}
                    total={5}
                    color="#f59e0b"
                    bgColor="#e2e8f0"
                    onChange={(newValue) => updateArrayItem(index, "progress", newValue)}
                  />
                </div>
              </div>
            </div>

            {/* Remove skill button (only show if more than one skill) */}
            {skillsInfo.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Add new skill button */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${skillsInfoStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              name: "",
              progress: 0,
            })
          }
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>
    </div>
  );
};

/**
 * Work Experience Form Component
 * 
 * Manages professional work history including company, role, duration, and
 * detailed job descriptions. Supports chronological date inputs and rich
 * text descriptions of responsibilities and achievements.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.workExperience - Array of work experience objects
 * @param {Function} props.updateArrayItem - Callback to update experience data
 * @param {Function} props.addArrayItem - Callback to add new work experiences
 * @param {Function} props.removeArrayItem - Callback to remove work experiences
 * 
 * @returns {JSX.Element} Form section for professional work history
 * 
 * @example
 * ```jsx
 * <WorkExperienceForm
 *   workExperience={[
 *     {
 *       company: "Tech Solutions Inc.",
 *       role: "Senior Developer",
 *       startDate: "2020-01",
 *       endDate: "2023-12",
 *       description: "Led development of microservices architecture..."
 *     }
 *   ]}
 *   updateArrayItem={handleUpdate}
 *   addArrayItem={handleAdd}
 *   removeArrayItem={handleRemove}
 * />
 * ```
 */
// WorkExperienceForm Component
export const WorkExperienceForm = ({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={workExperienceStyles.container}>
      <h2 className={workExperienceStyles.heading}>Work Experience</h2>
      <div className="space-y-6 mb-6">
        {/* Work experience items */}
        {workExperience.map((experience, index) => (
          <div key={index} className={workExperienceStyles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company name */}
              <Input
                label="Company"
                placeholder="ABC Corp"
                value={experience.company || ""}
                onChange={({ target }) => updateArrayItem(index, "company", target.value)}
              />

              {/* Job role/title */}
              <Input
                label="Role"
                placeholder="Frontend Developer"
                value={experience.role || ""}
                onChange={({ target }) => updateArrayItem(index, "role", target.value)}
              />

              {/* Employment start date */}
              <Input
                label="Start Date"
                type="month"
                value={experience.startDate || ""}
                onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
              />

              {/* Employment end date */}
              <Input
                label="End Date"
                type="month"
                value={experience.endDate || ""}
                onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
              />
            </div>

            {/* Job description */}
            <div className="mt-6">
              <label className="block text-sm font-bold text-slate-700 mb-3">Description</label>
              <textarea
                placeholder="What did you do in this role?"
                className={workExperienceStyles.textarea}
                rows={3}
                value={experience.description || ""}
                onChange={({ target }) => updateArrayItem(index, "description", target.value)}
              />
            </div>

            {/* Remove experience button (only show if more than one experience) */}
            {workExperience.length > 1 && (
              <button
                type="button"
                className={commonStyles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Add new work experience button */}
        <button
          type="button"
          className={`${commonStyles.addButtonBase} ${workExperienceStyles.addButton}`}
          onClick={() =>
            addArrayItem({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <Plus size={16} />
          Add Work Experience
        </button>
      </div>
    </div>
  );
};