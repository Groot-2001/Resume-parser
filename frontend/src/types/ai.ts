
  export interface AIAnalysis {
    overallAssessment: string;
    strengths: string[];
    areasForImprovement: string[];
    actionPlan: string[];
    resumeBulletSuggestions: string[];
    hiringRecommendation: {
      status: string;
      reasoning: string;
    };
  }