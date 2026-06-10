const mongoose = require("mongoose");

const ResumeSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    s3Key: {
      type: String,
      required: true,
    },
    
    s3Url: {
      type: String,
      required: true,
    },
    rawText: {
      type: String,
    },
    analysis: {
      contact: {
        name: String,
        email: String,
        phone: String,
        github: String,
        linkedIn: String,
      },

      skills: {
        type: [String],
        default: [],
      },

      education: [{
        degree: String,
        institution: String,
        score: String,
        year: String,
      }],

      experience: [{
        title: String,
        company: String,
        startDate: String,
        endDate: String,
      }],
    },
    aiAnalysis: {
      overallAssessment: String,

      strengths: {
        type: [String],
        default: [],
      },

      areasForImprovement: {
        type: [String],
        default: [],
      },

      actionPlan: {
        type: [String],
        default: [],
      },

      resumeBulletSuggestions: {
        type: [String],
        default: [],
      },

      hiringRecommendation: {
        status: String,
        reasoning: String,
      },

      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    optimizedResume: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Resume", ResumeSchema);
