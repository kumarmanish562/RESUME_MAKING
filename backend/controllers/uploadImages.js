import fs from 'fs';
import path from 'path';
import resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js'
import { error } from 'console';

export const uploadResumeImages = async (req, res) => {
  try { 
    //configure multer to handle images
    upload.fields([{name: "thumbnail"}, {name: "profileImage"}])
    (req, res, async (err) => {
      if(err) {
        return res.status(400).json({message: "File upload failed", error: err.message})
      }
      const resumeId = req.params.id;
      const resumeDoc = await resume.findOne({ _id: resumeId, userId: req.user._id})
      if(!resumeDoc) {
        return res.status(404).json({message: "Resume not found or unauthorized"})
      }
      //Use process CWD to Locate uploads folder
      const uploadsFolder = path.join(process.cwd(), "uploads")
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileImage?.[0];

      if(newThumbnail) {
        if(resumeDoc.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resumeDoc.thumbnailLink));
          if(fs.existsSync(oldThumbnail))
            fs.unlinkSync(oldThumbnail)
        }
        resumeDoc.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;

      }


      // Same for profileImage

      if(newProfileImage) {
        if(resumeDoc.profileInfo?.profilePreviewUrl) {
          const oldProfile = path.join(uploadsFolder, path.basename(resumeDoc.profileInfo.profilePreviewUrl));
          if(fs.existsSync(oldProfile))
            fs.unlinkSync(oldProfile)
        }
        resumeDoc.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;

      }
      await resumeDoc.save();
      res.status(200).json({ message: "Resume images uploaded successfully",
        thumbnailLink: resumeDoc.thumbnailLink,
        profilePreviewUrl: resumeDoc.profileInfo?.profilePreviewUrl
       });
    });
  } catch (error) {
    console.error("Error uploading resume images:", error);
    res.status(500).json({ message: "Failed to upload image ", error: error.message });
  }
}