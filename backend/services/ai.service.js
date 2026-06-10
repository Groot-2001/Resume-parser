const {Groq} = require("groq-sdk");
require("dotenv").config();

const ai = new Groq({apiKey: process.env.GROK_API_KEY});

const analyzeResumeWithAI = async (
  resumeAnalysis,
  jobDescription
) => {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const prompt = `
      You are an expert technical recruiter and ATS consultant.
      
      Resume:
      ${JSON.stringify(resumeAnalysis, null, 2)}
      
      Job Description:
      ${jobDescription}
      
      Analyze the resume against the job description.
      
      Return ONLY valid JSON.
      
      {
        "overallAssessment": "",
        "strengths": [],
        "areasForImprovement": [],
        "actionPlan": [],
        "resumeBulletSuggestions": [],
        "hiringRecommendation": {
          "status": "",
          "reasoning": ""
        }
      }
      
      Rules:
      - Do not wrap the response in markdown.
      - Do not return explanations outside JSON.
      - Do not invent experience that does not exist in the resume.
      - Generate resume bullet suggestions using ONLY the candidate's existing experience. 
        -Prioritize:
        - Achievements
        - Impact
        - Backend engineering work
        - APIs
        - Databases
        - Performance improvements
        - Integrations
          - Avoid generic statements.
          - Use action verbs.
          - Each bullet should sound like a real resume achievement.
      - Action plan should contain practical next steps to improve ATS match.
      `;
      const response = await ai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      });

      const content = response.choices[0].message.content;
      const cleanedResponse = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsedResponse;

      try {
        parsedResponse = JSON.parse(cleanedResponse);
      } catch (err) {
        throw new Error("AI returned invalid JSON");
      }
      return parsedResponse;
    } catch (error) {
      console.log(error);
      if (error.status === 503 && attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );

        continue;
      }

      throw error;
    }
  }
};

const resumeOptimizeWithAI = async (
  resume,
  jobDescription
) => {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const prompt = `
      YYou are a senior technical recruiter, ATS optimization expert, and resume writer.

      Your goal is to maximize ATS compatibility while preserving factual accuracy.
      
      Resume:
      ${resume}
      
      Job Description:
      ${jobDescription}
      
      The resume above is the ONLY source of truth.
      
      STRICT RULES:
      
      FACTUAL ACCURACY
      
      * Never invent experience.
      * Never invent companies.
      * Never invent projects.
      * Never invent job titles.
      * Never invent certifications.
      * Never invent education.
      * Never invent achievements.
      * Never invent metrics.
      * Never invent technologies.
      
      PRESERVE IMPORTANT DATA
      
      * Preserve all percentages.
      * Preserve all measurable impact.
      * Preserve all uptime figures.
      * Preserve all performance improvements.
      * Preserve all production-scale metrics.
      * Preserve all technologies already present in the resume.
      
      ATS OPTIMIZATION RULES
      
      1. JOB TITLE MATCH
      
      * Identify the target role from the Job Description.
      * If appropriate, naturally include the target role keywords inside the professional summary.
      * Do not falsely claim previous job titles.
      
      2. KEYWORD OPTIMIZATION
      
      * Extract important keywords from the Job Description.
      * Prioritize:
      
        * Skills
        * Technologies
        * Frameworks
        * Backend concepts
        * Cloud tools
        * Soft skills
      * Only include keywords already supported by the resume.
      
      3. EXPERIENCE OPTIMIZATION
      
      * Rewrite every experience bullet.
      * Start each bullet with a strong action verb.
      * Focus on:
      
        * Business impact
        * Technical impact
        * Scale
        * Performance improvements
        * Reliability improvements
        * Automation
        * Integrations
        * Backend engineering contributions
      
      4. MEASURABLE RESULTS
      
      * Every metric found in the resume must be preserved.
      * Highlight measurable results whenever available.
      * Prefer quantified achievements.
      
      5. SEARCHABILITY
      
      * Ensure important technologies appear naturally throughout the resume.
      * Optimize for recruiter keyword searches.
      
      6. SUMMARY OPTIMIZATION
      
      * Create a concise professional summary.
      * Include:
      
        * Years of experience
        * Primary backend technologies
        * Domain expertise
        * Target role alignment
      
      7. SKILLS ORGANIZATION
      
      * Group skills into categories:
      
        * Backend
        * Frontend
        * Databases
        * Cloud & Tools
        * Concepts
      
      8. PROJECT OPTIMIZATION
      
      * Rewrite project descriptions into ATS-friendly bullets.
      * Preserve technologies and functionality.
      * Focus on engineering value and technical complexity.
      * atleast two bullent points
      
      OUTPUT REQUIREMENTS
      
      Return ONLY valid JSON.
      
      Do not use markdown.
      Do not use code blocks.
      Do not include explanations.
      
      {
      "header": {
      "name": "",
      "title": "",
      "location": "",
      "phone": "",
      "email": "",
      "github": "",
      "linkedin": ""
      },
      
      "summary": "",
      
      "skills": {
      "backend": [],
      "frontend": [],
      "databases": [],
      "cloudAndTools": [],
      "concepts": []
      },
      
      "experience": [
      {
      "title": "",
      "company": "",
      "startDate": "",
      "endDate": "",
      "bulletPoints": []
      }
      ],
      
      "projects": [
      {
      "name": "",
      "bulletPoints": []
      }
      ],
      
      "education": [
      {
      "degree": "",
      "institution": "",
      "score": "",
      "year": ""
      }
      ],
      
      "certifications": []
      }
      `;

      const response = await ai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      });

      const content = response.choices[0].message.content;
      const cleanedResponse = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanedResponse);
      } catch (err) {
        throw new Error("AI returned invalid JSON");
      }
      return parsedResponse;
    } catch (error) {
      console.log(error);
      if (error.status === 503 && attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );

        continue;
      }

      throw error;
    }
  }
};

module.exports = {
  analyzeResumeWithAI,
  resumeOptimizeWithAI,
};
