const express = require('express');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const resumeRoutes = require("./routes/resume.routes");
const atsRoutes = require("./routes/ats.routes");
const multer = require("multer");

require("dotenv").config();
const dbconn = require("./config/db.js");


const app = express();

//Setting up with helmet
app.use(helmet.hidePoweredBy());
app.use(helmet({
  frameguard: false,
    contentSecurityPolicy: false,
}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());


//database connection
dbconn();

// parse application/json
app.use(bodyParser.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
      limit: "10mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  // handling cors
app.use((req, res, next) => {
    const allowedOrigin = process.env.CORS_ORIGIN || "*";
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Custom-Header");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
  
    next();
  });

 //routes
  app.use("/api/resume", resumeRoutes);
  app.use("/api/ats", atsRoutes);
  
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
  
  
  //handling 404 error
  app.use((req, res, next) => {
    console.error(req.path);
    console.error(req.params);
    res.status(404).json("404,Sorry we couldn't find that page");
    next();
  });
  
// Body parser / Multer error handler
app.use((err, req, res, next) => {
    // Log the full error for debugging (but don't expose internals to client)
    console.error('Error caught in global handler:', {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  
    // 1. Handle custom fileFilter rejection
    if (err.message === 'Only PDF and Word (DOC/DOCX) files are allowed!') {
      return res.status(400).json({
        success: false,
        message: err.message,
        error: 'INVALID_FILE_TYPE'
      });
    }
  
    // 2. Handle Multer-specific errors
    if (err instanceof multer.MulterError) {
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 2MB.',
            error: 'FILE_TOO_LARGE'
          });
        case 'LIMIT_UNEXPECTED_FILE':
          return res.status(400).json({
            success: false,
            message: 'Unexpected field. Please upload a single file.',
            error: 'UNEXPECTED_FIELD'
          });
        case 'LIMIT_FILE_COUNT':
          return res.status(400).json({
            success: false,
            message: 'Too many files uploaded.',
            error: 'TOO_MANY_FILES'
          });
        default:
          // Other Multer errors (e.g., LIMIT_PART_COUNT, LIMIT_FIELD_KEY)
          return res.status(400).json({
            success: false,
            message: `Upload error: ${err.message}`,
            error: 'MULTER_ERROR'
          });
      }
    }
  
    // 3. Handle body-parser errors (e.g., invalid JSON)
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON payload',
        error: 'BAD_JSON'
      });
    }
  
    // 4. Handle all other unexpected errors (server faults)
    //    Don't leak internal details in production
    const statusCode = err.status || 500;
    const message = statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message;
  
    res.status(statusCode).json({
      success: false,
      message: message,
      error: err.code || 'SERVER_ERROR'
    });
  });

module.exports = app;