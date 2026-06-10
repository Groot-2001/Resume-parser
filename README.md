# AI Resume Analyzer & ATS Optimizer

An AI-powered Resume Analyzer and ATS Optimization platform that helps job seekers evaluate, improve, and optimize their resumes against target job descriptions.

The platform combines traditional ATS analysis, AI-powered resume coaching, resume optimization, PDF generation, and AWS cloud storage into a single workflow.

---

## Features

### Resume Upload & Parsing

* Upload resumes in PDF format
* Extract raw resume text using PDF parsing
* Store resumes securely in AWS S3
* Generate signed URLs for secure resume preview
* Persist resume metadata in MongoDB

---

### Resume Analysis

Extract structured resume information including:

* Contact Information
* Skills
* Education
* Professional Experience

Provides a clean overview of the candidate profile before ATS analysis.

---

### ATS Analysis

Analyze resumes against a target Job Description.

#### Traditional ATS Analysis

* Skill matching
* Missing skills identification
* ATS match percentage
* Keyword gap analysis

#### AI Resume Coach

Powered by Groq LLM (Llama 3.3 70B).

Provides:

* Overall assessment
* Strengths
* Areas for improvement
* Action plan
* ATS-friendly resume suggestions
* Hiring recommendation

---

### ATS Resume Optimization

Generate a fully optimized ATS-friendly resume.

The optimizer:

* Preserves factual information
* Preserves metrics and achievements
* Preserves technologies actually used
* Rewrites experience bullets for recruiter impact
* Improves ATS keyword relevance
* Maintains resume authenticity

Generated sections include:

* Header
* Professional Summary
* Technical Skills
* Professional Experience
* Projects
* Education
* Certifications

---

### Resume Preview

* Secure PDF preview using AWS S3 Signed URLs
* Embedded resume viewer
* Side-by-side resume analysis workflow

---

### Professional PDF Export

Generate recruiter-ready resumes in PDF format.

Features:

* ATS-friendly layout
* One-page formatting
* Consistent typography
* Clean section hierarchy
* Optimized spacing
* Professional resume structure

Included sections:

* Contact Information
* Professional Summary
* Skills
* Experience
* Projects
* Education
* Certifications

---

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### AI

* Groq API
* Llama 3.3 70B

### Cloud

* AWS S3
* Signed URL Access

### PDF Generation

* PDFKit

### Validation

* Zod

### Resume Parsing

* PDF Parse

---

## Architecture

```text
User Uploads Resume
        │
        ▼
Multer Memory Storage
        │
        ▼
PDF Parse
        │
        ▼
AWS S3 Upload
        │
        ▼
MongoDB Storage
        │
        ▼
Resume Analysis
        │
        ▼
ATS Analysis
        │
        ▼
AI Resume Coach
        │
        ▼
ATS Resume Optimization
        │
        ▼
PDF Generation
```

---

## Project Structure

```text
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   └── utils/

server/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
├── middleware/
└── config/
```

---

## API Endpoints

### Upload Resume

```http
POST /api/resume/upload_resume
```

Upload and parse a PDF resume.

---

### Analyze Resume

```http
POST /api/resume/analyze_resume
```

Extract structured resume information.

---

### ATS Analysis

```http
POST /api/ats/analyze
```

Supports:

* Traditional ATS Analysis
* AI Resume Coach

---

### Generate ATS Optimized Resume

```http
POST /api/resume/generate-optimized-resume
```

Returns:

```json
{
  "header": {},
  "summary": "",
  "skills": {},
  "experience": [],
  "projects": [],
  "education": [],
  "certifications": []
}
```

---

### Download ATS Optimized Resume

```http
POST /api/resume/download-optimized-resume
```

Returns a professionally formatted PDF.

---

### Get Resume Analysis

```http
GET /api/resume/:id
```

Returns:

* Resume analysis
* Signed resume preview URL

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGODB_URI=

GROK_API_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>

cd Resume-Parser
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## AWS Setup

### Create S3 Bucket

Example:

```text
resume-parser-shiva
```

### Configure IAM User

Grant:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET/*"
      ]
    }
  ]
}
```

### Store Credentials

Add IAM credentials to `.env`.

---

## Deployment

### Frontend

* Vercel

### Backend

* AWS EC2

### Database

* MongoDB Atlas

### File Storage

* AWS S3

---

## Roadmap

Upcoming improvements:

* Resume comparison view
* ATS score improvement tracking
* Resume history
* DOCX export
* Multiple resume templates
* Authentication
* Resume versioning
* Cover letter generation

---

## Author

**Shiva Silmawala**

Backend Engineer

Mumbai, India

GitHub: github.com/shivasilmawala

LinkedIn: linkedin.com/in/shivasilmawala
