export interface ATSAnalysis {
    atsScore: number;

    rating: string;

    summary: string;
  
    matchedSkills: string[];
  
    missingSkills: string[];
  
    strengths: string[];
  
    weaknesses: string[];
  
    recommendations: string[];
  }