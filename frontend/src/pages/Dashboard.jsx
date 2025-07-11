import React, { use, useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { dashboardStyles as styles } from '../assets/dummystyle'
import { useNavigate } from 'react-router-dom'
import { all } from 'axios'
import { LucideFilePlus } from 'lucide-react'

const Dashboard = () => {

  const navigate = useNavigate()
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Calculate completion percentage for a resume
  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

    return Math.round((completedFields / totalFields) * 100);
  };

  //it will show if complete or filled it wiil do ++.
  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUMES.GET_ALL);
      //Add completeion percentage to each resume
      const resumesWithCompletion = response.data.map(resume => ({
        ...resume,
        completion: calculateCompletion(resume)
      }));
      setAllResumes(resumesWithCompletion);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAllResumes();
  }, []);


  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>

          <div>
            <h1 className={styles.headerTitle}>My Resume</h1>
           
              <p className={styles.headerSubtitle}>
                {allResumes.length > 0 ? `You have ${allResumes.length} resumes${allResumes.length !== 1 ? 's' : ''}.` : 'Start building your professional resume now!'}
              </p>
          </div>

          <div className=' flex gap-4'>
            <button className={styles.createButton} onClick={() => setOpenCreateModal(true)}>
              <div className={styles.createButtonOverlay}> </div>
                <span className={styles.createButtonContent}>
                  Create Now
                  <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={18} />
                </span>
            </button>
          </div>
          </div>



          {/* Loading State */}
          {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
            </div>
            )}

            {/* Empty State */}
            {!loading && allResumes.length === 0 && (
              <div className={styles.emptyStateWrapper}>
                <div className={styles.emptyIconWrapper}>
                  <LucideFilePlus className='text-violet-600' size={32} />
                </div>

                <h3 className={styles.emptyTitle}>
                  No Resumes Yet
                </h3>
                <p  className={styles.emptyText}>
                  you haven't created any resumes yet. Start building your professional resume now!
                </p>
                <button className={styles.createButton} onClick={() => setOpenCreateModal(true)}>
                  <div className={styles.createButtonOverlay}> </div>
                  <span className={styles.createButtonContent}>
                    Create Your First Resume
                    <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={20} />
                  </span>
                </button>
              </div>
            )}

            {/* Grid View  */}

            {!loading && allResumes.length > 0 && (
              <div className={styles.grid}>
                <div className={styles.newResumeCard} onClick={() => setOpenCreateModal(true)}>
                  <div className={styles.newResumeIcon}>
                    <LucideFilePlus className='text-white' size={32} />
                  </div>
                  <h3 className={styles.newResumeTitle}>Create New Resume</h3>
                  <p className={styles.newResumeText}>
                    Start building career
                  </p>
                </div>

                {allResumes.map((resume) => (
                  
                ))}}

      </div>
    </DashboardLayout>
  )
}

export default Dashboard