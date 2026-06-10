const z = require("zod");
const {
  validateObjectId,
} = require("../utils/validate.object.id");
const Resume = require("../models/resume_model");
const {
  extractSkillsFromJD,
} = require("../utils/extractors");
const ATSAnalyzeTraditional = require("../utils/ATSAnalzer");
const { analyzeResumeWithAI } = require("../services/ai.service");

const analyzeATSPayloadSchema = z.object({
  resumeId: z.string().min(5, "Resume ID is required"),
  jobDescription: z
    .string()
    .min(
      50,
      "Job description must be at least 50 characters long"
    )
    .max(
      3000,
      "Job description is too long max 3000 characters allowed"
    ),
  analysisType: z.enum(["ai", "traditional"], {
    message: "analysisType must be one of: ai, traditional",
  }),
});

const analyzeATS = async (req, res) => {
  try {
    // check if resume , jobDescription , analysisType is present
    const result = analyzeATSPayloadSchema.safeParse(
      req.body
    );

    if (!result.success) {
      const formattedErrors = result.error.issues.map(
        (issue) => ({
          field: issue.path.join(".") || "unknown",
          message: issue.message,
          received:
            issue.received !== undefined
              ? issue.received
              : undefined,
        })
      );

      return res.status(400).json({
        success: false,
        message:
          "Validation failed. Please check your input.",
        errors: formattedErrors,
        errorCount: formattedErrors.length,
      });
    }

    const validatedData = result.data;

    if (!validateObjectId(validatedData?.resumeId)) {
      return res.status(400).json({
        message: "Invalid Resume Id",
      });
    }

    // fetch resume
    const resume = await Resume.findById(
      validatedData?.resumeId
    );

    if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found",
        });
      }

    // extracted jd skills
    let jdSkills;

    if ( validatedData.analysisType === "traditional") {
         jdSkills =
          extractSkillsFromJD(
            validatedData.jobDescription
          );
      }

    if (!resume.rawText) {
        return res.status(400).json({
          success: false,
          message:
            "Resume analysis not found. Please analyze the resume first.",
        });
      }

      if (validatedData.analysisType === "ai") {
        const aiResult = await analyzeResumeWithAI( resume.rawText, validatedData.jobDescription);
        resume.aiAnalysis = aiResult; 
        await resume.save()
        return res.status(200).json({
          success: true,
          data: aiResult
        });
      }
    
    // compare with resume skills
    const atsData = ATSAnalyzeTraditional(resume.analysis.skills || [],jdSkills);

    //return success
    return res.status(200).json({
        success: true,
        data: atsData
    })

  } catch (error) {
    console.log(error);
    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "AI service is temporarily busy. Please try again in a few moments.",
      });
    }
    return res.status(500).json({
      message: "Internal Server Error analyzeATS ",
    });
  }
};

module.exports = {analyzeATS};
