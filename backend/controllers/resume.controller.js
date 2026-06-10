const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/resume_model");
const {isValidObjectId} = require("mongoose");
const {parseResume} = require("../utils/extractors");
const path = require("path");
const z = require("zod");
const {
  resumeOptimizeWithAI,
} = require("../services/ai.service");
const {
  validateObjectId,
} = require("../utils/validate.object.id");
const PDFDocument = require("pdfkit");
const { s3, PutObjectCommand } = require("../services/s3.service");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");

const generateResumeSchema = z.object({
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
});

const optimizedResumeSchema = z.object({
  header: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    phone: z.string(),
    email: z.string(),
    github: z.string(),
    linkedin: z.string(),
  }),

  summary: z.string(),

  skills: z.object({
    backend: z.array(z.string()),
    frontend: z.array(z.string()),
    databases: z.array(z.string()),
    cloudAndTools: z.array(z.string()),
    concepts: z.array(z.string()),
  }),

  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      bulletPoints: z.array(z.string()),
    })
  ),

  projects: z.array(
    z.object({
      name: z.string(),
      bulletPoints: z.array(z.string()),
    })
  ),

  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      score: z.string(),
      year: z.string(),
    })
  ),

  certifications: z.array(z.string()),
});

const addSectionHeading = (doc, title) => {
  doc.moveDown(0.5);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(title.toUpperCase());

  const lineY = doc.y + 3;

  doc
    .moveTo(40, lineY)
    .lineTo(555, lineY)
    .stroke();

  doc.y = lineY + 8;

  doc.x = 40;

  doc.font("Helvetica");
};


const uploadResume = async (req, res) => {
  try {
    // check if file is present
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
        error: "MISSING_FILE",
      });
    }
    // Resume Parse
    const pdfBuffer = req.file.buffer;
    const parsedData = await pdfParse(pdfBuffer);

    const key = `resumes/${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: "application/pdf",
      })
    );

    const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    const resume = await Resume.create({
      filename: req.file.originalname,
      s3Key: key,
      s3Url,
      rawText: parsedData.text,
    });
    // return success
    res.status(200).json({
      success: true,
      resumeId: resume._id,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      characterCount: parsedData.text.length,
      text: parsedData.text,
    });
  } catch (error) {
    console.log(error);
    if (
      error.message.includes("Only PDF") ||
      error.message.includes("fileSize")
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Internal Server Error During UploadResume",
    });
  }
};

const analyze_resume = async (req, res) => {
  try {
    const {resumeId} = req.body;

    if (!isValidObjectId(resumeId)) {
      return res.status(400).json({
        message: "Invalid Resume Id",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (resume.analysis?.contact?.email) {
      return res.status(200).json({
        success: true,
        resumeId,
        data: resume.analysis,
      });
    }

    const structuredData = parseResume(resume.rawText);

    resume.analysis = structuredData;

    await resume.save();

    return res.status(200).json({
      success: true,
      resumeId,
      data: structuredData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error During AnalyzeResume",
    });
  }
};

const get_resume_analysis = async (req, res) => {
  try {
    const {id} = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: resume.s3Key,
      }),
      { expiresIn: 3600 }
    );

    return res.status(200).json({
      success: true,
      resumeId: resume._id,
      resumeUrl: signedUrl,
      data: resume.analysis,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const generate_optimzed_resume = async (req, res) => {
  try {
    // check if resume , jobDescription , analysisType is present
    const result = generateResumeSchema.safeParse(req.body);

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

    if (!resume.rawText) {
      return res.status(400).json({
        success: false,
        message:
          "Resume content not found. Please upload and parse the resume again.",
      });
    }

    const optimizedResume = await resumeOptimizeWithAI(
      resume.rawText,
      validatedData.jobDescription
    );
    const validated =
      optimizedResumeSchema.parse(optimizedResume);
    resume.optimizedResume = validated;
    await resume.save();
    return res.status(200).json({
      success: true,
      data: validated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const download_optimized_resume = async (req, res) => {
  try {
    const {resumeId} = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume?.optimizedResume) {
      return res.status(404).json({
        success: false,
        message: "Optimized resume not found",
      });
    }

    const optimized = resume.optimizedResume;

    const { header } = optimized;

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    doc.info.Title = `${header.name} Resume`;
    doc.info.Author = header.name;
    doc.info.Subject = "ATS Optimized Resume";
    doc.info.Creator = "Resume Optimizer";
    
    doc.font("Helvetica");

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${optimized.header.name.replace(
        /\s+/g,
        "_"
      )}_Resume.pdf`
    );

    doc.pipe(res);

    // Header

    doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .text(header.name, {
      align: "center",
    });
  
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(header.title, {
      align: "center",
    });
  
  doc
    .fontSize(9)
    .text(
      `${header.location} | ${header.phone} | ${header.email}`,
      {
        align: "center",
      }
    );
  
  
    doc
    .fontSize(9)
    .fillColor("black")
    .text(
      `${header.github} | ${header.linkedin}`,
      {
        align: "center",
        underline: true,
      }
    );
  
  doc.fillColor("black");
    doc.moveDown();

  
  doc.fillColor("black");
  
  doc.moveDown(0.5);
  
  doc
    .moveTo(40, doc.y)
    .lineTo(555, doc.y)
    .stroke();

    // Summary

    addSectionHeading(
      doc,
      "Professional Summary"
    );
    
    doc
      .fontSize(9)
      .text(optimized.summary);

    doc.moveDown();

    addSectionHeading(
      doc,
      "Technical Skills"
    );
    
    doc.fontSize(9);
    
    doc
  .font("Helvetica-Bold")
  .text("Backend: ", {
    continued: true,
  });

doc
  .font("Helvetica")
  .text(
    optimized.skills.backend.join(", ")
  );
    
  doc
  .font("Helvetica-Bold")
  .text("Frontend: ", {
    continued: true,
  });

doc
  .font("Helvetica")
  .text(
    optimized.skills.frontend.join(", ")
  );
    
  doc
  .font("Helvetica-Bold")
  .text("Databases: ", {
    continued: true,
  });

doc
  .font("Helvetica")
  .text(
    optimized.skills.databases.join(", ")
  );
    
  doc
  .font("Helvetica-Bold")
  .text("Cloud & Tools: ", {
    continued: true,
  });

doc
  .font("Helvetica")
  .text(
    optimized.skills.cloudAndTools.join(", ")
  );
    
  doc
  .font("Helvetica-Bold")
  .text("Concepts: ", {
    continued: true,
  });

doc
  .font("Helvetica")
  .text(
    optimized.skills.concepts.join(", ")
  );

    doc.moveDown();

    addSectionHeading(
      doc,
      "Professional Experience"
    );
    
    optimized.experience.forEach((exp) => {
      doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(exp.title);
    
    doc
      .font("Helvetica")
      .fontSize(9)
      .text(`${exp.company} - ${exp.startDate} - ${exp.endDate}`,{
        align:"left"
      });
    
    doc.fillColor("black");
    
      exp.bulletPoints.forEach(
        (bullet) => {
          doc
            .fontSize(9)
            .text(`• ${bullet}`, {
              indent: 10,
            });
        }
      );
    
      doc.moveDown(0.2);
    });

    doc.moveDown();

    addSectionHeading(
      doc,
      "Projects"
    );
    
    optimized.projects.forEach((project) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(`${project.name}: `);
    
        project.bulletPoints
        ?.slice(0, 2)
        .forEach((bullet) => {
          doc
            .font("Helvetica")
            .fontSize(9)
            .text(`• ${bullet}`, {
              indent: 10,
            });
        });
    
      doc.moveDown(0.2);
    });
    doc.moveDown();

    // Education 
    addSectionHeading(doc, "Education");

    optimized.education.forEach((edu) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(edu.degree, {
          continued: true,
        });
    
      doc
        .font("Helvetica")
        .text(` | ${edu.institution}`,{
          continued: true,
        });
    
      doc
        .fontSize(9)
        .fillColor("black")
        .text(`  | ${edu.score} | ${edu.year}`);
    
      doc.fillColor("black");
    
      doc.moveDown(0.2);
    });

    doc.x = 40;
    doc.moveDown(0.5);

    // certificates
    addSectionHeading(doc, "Certifications");

    doc.font("Helvetica").fontSize(9);
    
    optimized.certifications.forEach((cert) => {
      doc.text(`• ${cert}`, {
        indent: 10,
      });
    });

    doc.end();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF",
    });
  }
};

module.exports = {
  uploadResume,
  analyze_resume,
  get_resume_analysis,
  generate_optimzed_resume,
  download_optimized_resume,
};
