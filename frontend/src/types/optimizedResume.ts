export interface OptimizedResumeType {
  header: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;
  };

  summary: string;

  skills: {
    backend: string[];
    frontend: string[];
    databases: string[];
    cloudAndTools: string[];
    concepts: string[];
  };

  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    bulletPoints: string[];
  }[];

  projects: {
    name: string;
    bulletPoints: string[];
  }[];

  education: {
    degree: string;
    institution: string;
    score: string;
    year: string;
  }[];

  certifications: string[];
}