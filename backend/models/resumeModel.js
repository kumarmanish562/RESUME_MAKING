import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true },
  title: {
    type: String,
    required: true,
  },
  thumbLink: {
    type: String,
  },
  templates: {
    theme: String,
    colorPalette: [String],
  },
  profileInfo: {
    profilePreviewUrl: String,
    FullName: String,
    designation: String,
    summary: String,
  },

  contactInfo: {
    email: String,
    phone: String,
    location: String,
    linkedIn: String,
    github: String,
    website: String,
  },

  workExperience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }
  ],

  education: [
    {
      degree: String,
      institution: String,
      startDate: Date,
      endDate: Date,
    }
  ],

  skills: [
    {
      name: String,
      progress: Number, 
    }
  ],

  project: [
    {
      title: String,
      description: String,
      github: String,
      liveDemo: String,
    },
  ],

  certifications: [
    {
      title: String,
      issuer: String,
     year: String,
    }
  ],


  languages: [
    {
      name: String,
      progress: Number, 
    }
  ],

  interests: [String],
    
}, { 
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } 
});

export default mongoose.model("Resume", resumeSchema);