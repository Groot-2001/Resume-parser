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
  },
  {timestamps: true}
);

module.exports = mongoose.model("Resume", ResumeSchema);
