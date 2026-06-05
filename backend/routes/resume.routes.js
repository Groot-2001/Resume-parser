const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadResume, analyze_resume, get_resume_analysis } = require("../controllers/resume.controller");
const fileFilter = require("../utils/file.filter");
const path = require("path");
const fs = require("fs");
// setup sotrage engine

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage:storage,
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
router.get("/:id",get_resume_analysis);

module.exports = router;
