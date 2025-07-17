/**
 * Resume Templates and Sample Data
 * 
 * This file contains static data used throughout the Resume Maker application:
 * 
 * Contents:
 * - Resume template configurations with thumbnails and themes
 * - Dummy/sample resume data for testing and demonstrations
 * - Default data structure examples for all resume sections
 * 
 * Purpose:
 * - Provide template options for users to choose from
 * - Supply realistic sample data for development and testing
 * - Define the expected data structure for resume content
 * - Enable quick prototyping and demos
 */

// Import resume template thumbnail images
import Resume1 from "../assets/Resume1.png"  // Professional template preview
import Resume2 from "../assets/Resume2.png"  // Creative template preview  
import Resume3 from "../assets/Resume3.png"  // Modern template preview

/**
 * Resume Template Configurations
 * 
 * Array of available resume templates with their associated themes and thumbnails.
 * Each template represents a different visual design and layout style.
 * 
 * Template Structure:
 * - id: Unique identifier for the template
 * - thumbnailImg: Preview image shown in template selector
 * - colorPaletteCode: CSS theme class name for styling
 * 
 * Usage: Used in template selection component to display available designs
 */
export const resumeTemplates = [
    {
        id: "01",                        // Template identifier
        thumbnailImg: Resume1,           // Preview image for template selection
        colorPaletteCode: "themeOne"     // CSS theme class (professional blue theme)
    },
    {
        id: "02",                        // Template identifier
        thumbnailImg: Resume2,           // Preview image for template selection
        colorPaletteCode: "themeTwo"     // CSS theme class (creative green theme)
    },
    {
        id: "03",                        // Template identifier
        thumbnailImg: Resume3,           // Preview image for template selection
        colorPaletteCode: "themeThree"   // CSS theme class (modern purple theme)
    },
];

/**
 * Sample Resume Data
 * 
 * Complete dummy resume data used for:
 * - Development and testing purposes
 * - Demonstrating the application's capabilities
 * - Providing users with examples of well-formatted content
 * - Template preview generation
 * 
 * Data Structure: Mirrors the expected format for user-generated resumes
 * All sections are included to showcase full functionality
 */
export const DUMMY_RESUME_DATA = {
    
    /**
     * Profile Information Section
     * Contains personal details and professional summary
     */
    profileInfo: {
        previewUrl: "",                  // Profile photo URL (empty for demo)
        fullName: "Manish Kumar",        // Full name displayed prominently
        designation: "Senior Software Developer", // Job title/position
        summary: "Full-stack developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks. Specialized in React, Node.js, and cloud technologies with a strong focus on clean code architecture and performance optimization. Passionate about mentoring junior developers and implementing agile best practices.",
    },
    
    /**
     * Contact Information Section
     * Professional contact details and social media links
     */
    contactInfo: {
        email: "manish.kumar.dev@gmail.com",           // Professional email address
        phone: "+91 9334170935",                    // Phone number with country code
        location: "San Francisco, CA",                 // Current location/city
        linkedin: "https://linkedin.com/in/manishkumar-dev",  // LinkedIn profile URL
        github: "https://github.com/manishkumar-code",        // GitHub profile URL
        website: "https://manishkumar.dev",            // Personal website/portfolio
    },
    
    /**
     * Education Section
     * Academic background and qualifications
     * Array format allows multiple education entries
     */
    education: [
        {
            institution: "Stanford University",         // School/University name
            degree: "Master of Science",               // Degree type (MS, BS, PhD, etc.)
            major: "Computer Science",                 // Primary field of study
            minors: "Data Science",                    // Secondary field (optional)
            location: "Stanford, CA",                 // Institution location
            graduationYear: "2018"                    // Completion year
        },
        {
            institution: "University of California",   // Second education entry
            degree: "Bachelor of Science",            // Undergraduate degree
            major: "Software Engineering",            // Primary major
            minors: "Mathematics",                    // Minor field
            location: "Berkeley, CA",                // UC Berkeley location
            graduationYear: "2016"                   // Graduation year
        }
    ],
    
    /**
     * Work Experience Section
     * Professional employment history with detailed descriptions
     * Ordered chronologically (most recent first)
     */
    workExperience: [
        {
            role: "Senior Software Engineer",          // Job title/position
            company: "TechSolutions Inc.",            // Company name
            location: "San Francisco, CA",           // Work location
            startDate: "2020-06-01",                // Employment start date (YYYY-MM-DD)
            endDate: "2023-12-31",                  // Employment end date (or "Present")
            description: "Led a team of 5 developers in building a SaaS platform serving 50,000+ users.\nArchitected microservices using Node.js and React that improved system performance by 40%.\nImplemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes.\nMentored junior developers through code reviews and pair programming sessions."
        },
        {
            role: "Software Developer",               // Previous role
            company: "InnovateSoft",                 // Previous company
            location: "San Jose, CA",               // Previous work location
            startDate: "2018-07-01",                // Previous job start date
            endDate: "2020-05-31",                  // Previous job end date
            description: "Developed RESTful APIs handling 10,000+ requests per minute with 99.9% uptime.\nRedesigned legacy frontend using React, improving page load speed by 60%.\nCollaborated with UX team to implement responsive designs for mobile users.\nAutomated testing processes increasing test coverage from 65% to 95%."
        }
    ],
    
    /**
     * Projects Section
     * Personal or professional projects showcasing skills and achievements
     * Includes technical details and links to live demos/code
     */
    projects: [
        {
            title: "E-commerce Analytics Dashboard",    // Project name
            startDate: "2022-03-01",                  // Project start date
            endDate: "2022-08-31",                    // Project completion date
            description: "Built a real-time analytics dashboard for e-commerce clients to track sales, inventory, and customer behavior.", // Project description
            technologies: ["React", "D3.js", "Node.js", "MongoDB"], // Tech stack used
            github: "https://github.com/alexjohnson-code/ecommerce-analytics", // Source code link
            liveDemo: "https://demo.alexjohnson.dev/analytics" // Live demo URL
        },
        {
            title: "AI-Powered Code Review Tool",       // Second project
            startDate: "2021-01-01",                  // Start date
            endDate: "2021-06-30",                    // End date
            description: "Developed a machine learning tool that analyzes pull requests and suggests code improvements.", // Description
            technologies: ["Python", "TensorFlow", "Flask", "GitHub API"], // Technologies used
            github: "https://github.com/alexjohnson-code/ai-code-review" // GitHub repository
            // Note: No liveDemo for this project (optional field)
        }
    ],
    
    /**
     * Skills Section
     * Technical and professional competencies
     * Simple array format for easy display and modification
     */
    skills: [
        { name: "JavaScript" },      // Frontend programming language
        { name: "TypeScript" },      // Typed JavaScript superset
        { name: "React" },           // Frontend framework
        { name: "Node.js" },         // Backend runtime
        { name: "Python" },          // Programming language
        { name: "AWS" },             // Cloud platform
        { name: "Docker" },          // Containerization
        { name: "Kubernetes" },      // Container orchestration
        { name: "GraphQL" },         // API query language
        { name: "MongoDB" },         // NoSQL database
        { name: "PostgreSQL" },      // SQL database
        { name: "Git" },             // Version control
        { name: "Agile" },           // Development methodology
        { name: "Scrum" },           // Project management framework
        { name: "JIRA" }             // Project tracking tool
    ],
    
    /**
     * Certifications Section
     * Professional certifications and credentials
     * Demonstrates commitment to continuous learning
     */
    certifications: [
        {
            title: "AWS Certified Solutions Architect", // Certification name
            year: "2022"                               // Year obtained
        },
        {
            title: "Google Professional Cloud Architect", // Google cloud certification
            year: "2021"                                 // Year obtained
        },
        {
            title: "Certified Scrum Master",            // Agile/Scrum certification
            year: "2020"                               // Year obtained
        }
    ],
    
    /**
     * Interests Section
     * Personal and professional interests
     * Shows personality and areas of passion beyond work
     */
    interests: [
        "Open Source Contributions",    // Technical interest
        "Machine Learning",             // Professional development area
        "Blockchain Technology",        // Emerging technology interest
        "Hiking",                      // Personal hobby
        "Photography"                  // Creative pursuit
    ]
};

/**
 * Usage Notes:
 * 
 * 1. Template Selection:
 *    - resumeTemplates array is used in template picker component
 *    - Each template ID corresponds to a specific layout component
 *    - colorPaletteCode maps to CSS theme classes
 * 
 * 2. Sample Data:
 *    - DUMMY_RESUME_DATA provides realistic examples for all resume sections
 *    - Can be used to populate forms during development/testing
 *    - Serves as a template for users creating their first resume
 * 
 * 3. Data Structure:
 *    - All dates use YYYY-MM-DD format for consistency
 *    - Arrays allow multiple entries for education, experience, projects, etc.
 *    - Optional fields (like project liveDemo) can be omitted
 * 
 * 4. Customization:
 *    - Add new templates by including new entries in resumeTemplates
 *    - Modify DUMMY_RESUME_DATA to reflect different professional backgrounds
 *    - Extend data structure as new resume sections are added
 */