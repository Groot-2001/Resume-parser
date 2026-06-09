const mongoose = require("mongoose");

const ResumeSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filePath: {
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
      summary: String,
    
      skills: {
        type: [String],
        default: [],
      },
    
      experience: [
        {
          title: String,
          company: String,
    
          bulletPoints: {
            type: [String],
            default: [],
          },
        },
      ],
    
      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Resume", ResumeSchema);
