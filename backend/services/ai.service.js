const {Groq} = require("groq-sdk");
require("dotenv").config();

const ai = new Groq({ apiKey: process.env.GROK_API_KEY });

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
        throw new Error(
          "AI returned invalid JSON"
        );
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

const resumeOptimizeWithAI = async(resume, jobDescription)=>{
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const prompt = `
      You are an ATS resume optimization expert.

      Resume:
      ${JSON.stringify(resume.analysis)}

      Job Description:
      ${jobDescription}

      - Extract achievements and responsibilities from the resume.
      - Rewrite them into ATS-friendly bullet points.
      - Do not invent experience.
      - Preserve all factual information.
      - Use metrics and business impact when available.

      Rules:
      - Do not invent experience.
      - Do not invent technologies.
      - Improve wording.
      - Use achievement-focused bullet points.
      - Increase keyword relevance.

      - Return ONLY valid JSON.
      - Do not use markdown.
      - Do not wrap JSON inside triple backticks json blocks.
      - Do not include explanations before or after JSON.

      {
        "summary": "",
        "skills": [],
        "experience": [
          {
            "title": "",
            "company": "",
            "bulletPoints": []
          }
        ]
      }
      - Keep the original title and company.
      - Only rewrite the bullet points.
      - Do not invent technologies.
      - Do not invent projects.
      - Use the exact experience entries from the resume.
      - Never create new job titles.
      - Never create new company names.
      - Only improve bullet points.
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
        throw new Error(
          "AI returned invalid JSON"
        );
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
}

module.exports = {analyzeResumeWithAI, resumeOptimizeWithAI};
