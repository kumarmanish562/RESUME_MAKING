import path from 'path';
import Resume from '../models/resumeModel.js';
import fs from 'fs';

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    //default templates
    const resume = new Resume({
      userId: req.user._id,
      title,
      profileInfo: {
        FullName: '',
        designation: '',
       summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedIn: '',
       github: '',
        website: '',  
      },
      workExperience: [
        {
          company: '',
          role: '',
          startDate: null,
          endDate: null,
          description: '',
        },
      ],
      education: [
        {
          degree: '',
          institution: '',
          startDate: null,
          endDate: null,
        },
      ],
      skills: [
        {
          name: '',
          progress: 0, 
        },
      ],
      project: [
        {
          title: '',
          description: '',
          githublink: '',
          liveLink: '',
          startDate: null,
          endDate: null,
          link: '',
        },
      ],
      certifications: [
        {
          title: '',
          issuer: '',
          issueDate: null,
          expirationDate: null,
          credentialId: '',
          credentialUrl: '',
        },
      ],
      languages: [
        {
          name: '',
          proficiency: 0, 
        },
      ],
      interests: [''],
      references: [
        {
          name: '',
          relationship: '',
          contactInfo: {
            email: '',
            phone: '',
          },
        },
      ],
    });
    const newResume = await resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });
    res.status(201).json(newResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to create resume', error: error.message });
  }
};

//get Function
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to get resumes', error: error.message });
  }
};

//get resume by id
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to get resume', error: error.message });
  }
};
//update resume

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not authorized' });
    }

    //Merge update resume
    Object.assign(resume, req.body);
    //save update resume
    const savedResume = await resume.save();
    res.status(200).json(savedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to update resume', error: error.message });
  }
};

//Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    // create a upload folder and store the resume there
    const uploadFolder = path.join(process.cwd(), 'uploads')

    //Delete thumnail function
    if(resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink))
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail)
      }
    }
    if(resume.profileInfo?.profilePreviewUrl){
      const oldProfile = path.join(
        uploadFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      )
       if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail)
      }
    }

    //delete resume doc
    const deleted = await Resume.findOneAndDelete({
      _id:req.params.id,
      userId: req.user._id
    })
    if(!deleted){
      return res.status(404).json({ message: "Resume not found or not authorized"})
    }
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to delete resume', error: error.message });
  }
};