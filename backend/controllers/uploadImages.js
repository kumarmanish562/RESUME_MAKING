import fs from 'fs';
import path from 'path';

import resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js'

export const uploadResumeImages = async (req, res) => {
  try {
    //confirm multer to handle images
    upload .fields([{name: "thumbnail"}, {name: "profileImage"}])
    (req, res, async (err) => {
      if(err) {
        return res.status(400).json({message: "File upload failed", error: err.message})
      }
      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: res.user._id})
      if(!resume) {
        return res.status(404).json({message: "Resume not found or unauthorized"})
      }
      //Use process CWD to Locate uploads folder
      const uploadsFolder = path.join(process.cwd(), "uploads")
      const baseUrl = `${req.protocal}://${req.get("host")}`;

      const newThumbnail = req.files.thumbnail?.[0];

      if(newThumbnail) {
        if(resume.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
          if(fs.existsSync(oldThumbnail))
            fs.unlinkSync(oldThumbnail)
        }
        resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;

      }


      // Same for profileImage

      if(newProfileImage) {
        if(resume.profileInfo?.profilePreviewUrl) {
          const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
          if(fs.existsSync(oldProfile))
            fs.unlinkSync(oldProfile)
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;

      }
      await resume.save();
      res.status(200).json({ message: "Resume images uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo?.profilePreviewUrl
       });
    });
  } catch (error) {
    console.error("Error uploading resume images:", error);
    res.status(500).json({ message: "Failed to upload image ", error: error.message });
  }
}