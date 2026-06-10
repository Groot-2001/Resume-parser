const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadResume, analyze_resume, get_resume_analysis , generate_optimzed_resume, download_optimized_resume} = require("../controllers/resume.controller");
const fileFilter = require("../utils/file.filter");
// setup sotrage engine

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 2*1024*1024, //2MB
    },
    fileFilter,
});

router.get("/health",(req,res)=>{
    res.json({
        "success": true,
        "message": "Resume API Working"
      });
});

router.post("/upload_resume",upload.single('file'),uploadResume);
router.post("/analyze_resume",analyze_resume);
router.post("/generate-optimized-resume",generate_optimzed_resume);
router.post("/download-optimized-resume", download_optimized_resume);
router.get("/:id",get_resume_analysis);


module.exports = router;
