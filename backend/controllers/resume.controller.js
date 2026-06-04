const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/resume_model");
const { isValidObjectId } = require("mongoose");
const { parseResume } = require("../utils/extractors");


const uploadResume = async(req,res)=>{
    try {
        // check if file is present
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
                error: "MISSING_FILE"
            })
        }
        // Resume Parse
        const pdfBuffer = fs.readFileSync(req.file.path);
        const parsedData = await pdfParse(pdfBuffer);
        
        // store Resume
         const resume = await Resume.create({
            filename: req.file.originalname,
            filePath: req.file.path,
            rawText: parsedData.text,
         })
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
        if (error.message.includes("Only PDF") || error.message.includes("fileSize")) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            message:"Internal Server Error During UploadResume"
        });
    }
}

const analyze_resume = async (req, res) => {
    try {
      const { resumeId } = req.body;
  
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
  
      const structuredData = parseResume(
        resume.rawText
      );
  
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
        message:
          "Internal Server Error During AnalyzeResume",
      });
    }
  };

module.exports = { uploadResume , analyze_resume };