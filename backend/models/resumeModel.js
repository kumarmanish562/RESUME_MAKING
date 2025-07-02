import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: {
    type: String,
    required: true,
  },
  theme: String,
  colorPalette: [String],
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
      githubLink: String,
      liveLink: String,
      startDate: Date,
      endDate: Date,
      link: String,
    }
  ],
  certifications: [
    {
      title: String,
      issuer: String,
      issueDate: Date,
      expirationDate: Date,
      credentialId: String,
      credentialUrl: String,
    }
  ],
  languages: [
    {
      name: String,
      proficiency: String,
    }
  ],
  interests: [String],
  references: [
    {
      name: String,
      relationship: String,
      contactInfo: {
        email: String,
        phone: String,
      },
    }
  ],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

export default mongoose.model("Resume", resumeSchema);