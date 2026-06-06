export interface ResumeAnalysis {
    contact: {
      name: string;
      email: string;
      phone: string;
      github: string;
      linkedIn: string;
    };
  
    skills: string[];
  
    education: {
      degree: string;
      institution: string;
      score: string;
      year: string;
    }[];
  
    experience: {
      title: string;
      company: string;
      startDate: string;
      endDate: string;
    }[];
  }