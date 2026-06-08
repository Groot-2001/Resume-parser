const skillsDB  = [
    // Programming Languages
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Kotlin",
    "Swift",
    "Dart",
    "Scala",
    "R",
    "Perl",
  
    // Frontend
    "HTML",
    "HTML5",
    "CSS",
    "CSS3",
    "Sass",
    "SCSS",
    "Less",
    "Bootstrap",
    "Tailwind CSS",
    "Material UI",
    "Ant Design",
    "React",
    "React.js",
    "Next.js",
    "Redux",
    "Redux Toolkit",
    "Vue.js",
    "Nuxt.js",
    "Angular",
    "jQuery",
    "Webpack",
    "Vite",
    "Parcel",
    "Babel",
    "Framer Motion",
    "Three.js",
    "D3.js",
    "Chart.js",
  
    // Backend
    "Node.js",
    "Express.js",
    "Express",
    "NestJS",
    "Spring",
    "Spring Boot",
    "Hibernate",
    "Django",
    "Flask",
    "FastAPI",
    "Laravel",
    "Ruby on Rails",
    ".NET",
    "ASP.NET",
    "GraphQL",
    "REST API",
    "Microservices",
    "gRPC",
    "WebSocket",
    "Socket.io",
  
    // Databases
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "MariaDB",
    "Oracle",
    "SQL Server",
    "Redis",
    "DynamoDB",
    "Firebase",
    "Supabase",
    "Cassandra",
    "Neo4j",
    "Elasticsearch",
    "OpenSearch",
  
    // Cloud
    "AWS",
    "Amazon Web Services",
    "Azure",
    "Microsoft Azure",
    "Google Cloud",
    "GCP",
    "CloudWatch",
    "Lambda",
    "EC2",
    "S3",
    "RDS",
    "API Gateway",
    "App Runner",
    "ECS",
    "EKS",
  
    // DevOps
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitHub Actions",
    "GitLab CI/CD",
    "Terraform",
    "Ansible",
    "Nginx",
    "Apache",
    "Linux",
    "Ubuntu",
    "Bash",
    "Shell Scripting",
    "CI/CD",
  
    // Messaging
    "Kafka",
    "RabbitMQ",
    "ActiveMQ",
    "SQS",
    "SNS",
  
    // Authentication
    "JWT",
    "OAuth",
    "OAuth2",
    "OpenID Connect",
    "Passport.js",
    "Auth0",
  
    // Testing
    "Jest",
    "Mocha",
    "Chai",
    "Vitest",
    "Cypress",
    "Playwright",
    "Selenium",
    "JUnit",
    "PyTest",
    "Unit Testing",
    "Integration Testing",
    "E2E Testing",
  
    // Mobile
    "React Native",
    "Flutter",
    "Android",
    "Android SDK",
    "iOS",
    "SwiftUI",
    "Expo",
  
    // Data Engineering
    "Apache Spark",
    "PySpark",
    "Apache Airflow",
    "Apache Hadoop",
    "Hive",
    "Databricks",
    "Snowflake",
    "BigQuery",
    "Redshift",
    "ETL",
    "ELT",
    "Data Warehousing",
    "Data Modeling",
  
    // AI/ML
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "OpenCV",
    "NLP",
    "LLM",
    "LangChain",
    "RAG",
    "Vector Database",
    "FAISS",
    "Pinecone",
  
    // Version Control
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
  
    // Monitoring
    "Prometheus",
    "Grafana",
    "New Relic",
    "Datadog",
    "Splunk",
    "ELK Stack",
  
    // Software Engineering
    "Data Structures",
    "Algorithms",
    "System Design",
    "Low Level Design",
    "High Level Design",
    "Object Oriented Programming",
    "OOP",
    "Design Patterns",
    "SOLID Principles",
    "Distributed Systems",
    "Scalability",
    "Caching",
    "Load Balancing",
    "Concurrency",
    "Multithreading",
  
    // Project Management
    "Agile",
    "Scrum",
    "Kanban",
    "Jira",
    "Confluence",
  
    // Security
    "OWASP",
    "Cybersecurity",
    "Penetration Testing",
    "Encryption",
    "SSL",
    "TLS",
  
    // Common Tools
    "Postman",
    "Swagger",
    "OpenAPI",
    "VS Code",
    "IntelliJ IDEA",
    "Eclipse",
    "Figma",
  
    // CMS
    "WordPress",
    "Shopify",
    "Webflow",
  
    // Misc
    "JSON",
    "XML",
    "YAML",
    "CSV",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Software Development",
    "API Development"
  ];


  const degrees = [
    "B.Tech",
    "B.E",
    "BE",
    "BCA",
    "BSc",
    "B.Sc",
    "BSc (IT)",
    "MCA",
    "MBA",
    "M.Tech",
    "MSc",
    "M.Sc",
    "HSC",
    "SSC"
];

const ExtractName = function (text){
    const lines = text.split('\n').map(line=>line.trim()).filter(line=> line.length > 0);
    return lines[0];
}

const ExtractEmail = function (text){
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    return text.match(emailRegex)?.[0] || null;
}

const ExtractPhone = function (text){
    const regex =/(?:\+91[\s-]?)?[6-9]\d{9}/;
    return text.match(regex)?.[0] || null;
}

const ExtractGithub = function (text){
    const regex = /github\.com\/[A-Za-z0-9_-]+/i;
    return text.match(regex)?.[0] || null;
}

const ExtractLinkedIn = function (text){
    const regex = /linkedin\.com\/in\/[A-Za-z0-9_-]+/i;
    return text.match(regex)?.[0] || null;
}

function ExtractSkills(text) {
    const normalizedText = text.toLowerCase();
  
    return skillsDB.filter((skill) => {
      const escapedSkill = skill.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
  
      const regex = new RegExp(
        `\\b${escapedSkill.toLowerCase()}\\b`,
        "i"
      );
  
      return regex.test(normalizedText);
    });
  }

function ExtractExperience(text) {
    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

    const experiences = [];

    const jobRegex =
        /(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*–\s*(.*)/;

    for (const line of lines) {
        const match = line.match(jobRegex);

        if (match) {
            experiences.push({
                title: match[1].trim(),
                company: match[2].trim(),
                startDate: match[3].trim(),
                endDate: match[4].trim()
            });
        }
    }

    return experiences;
}

function ExtractEducation(text) {

    const educationSection =
        text.match(/Education([\s\S]*)$/i)?.[1] || "";

    const lines = educationSection
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

    const education = [];

    for (const line of lines) {

        const degree =
            degrees.find(d => line.includes(d));

        if (!degree) continue;

        const year =
        line.match(/(19|20)\d{2}/)?.[0] || null;

        const score =
            line.match(/(\d+(\.\d+)?\s*CGPA|\d+(\.\d+)?%)/)?.[0] || null;

        let institution = line;

        if (degree) institution = institution.replace(degree, "");
        if (score) institution = institution.replace(score, "");
        if (year) institution = institution.replace(year, "");

        education.push({
            degree,
            institution: institution.trim(),
            score,
            year
        });
    }

    return education;
}

function parseResume(text){
    return {
        contact: {
          name: ExtractName(text),
          email: ExtractEmail(text),
          phone: ExtractPhone(text),
          github: ExtractGithub(text),
          linkedIn: ExtractLinkedIn(text),
        },
        skills: ExtractSkills(text),
        education: ExtractEducation(text),
        experience: ExtractExperience(text),
      };
 }

 function escapeRegex(str) {
    return str.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
  }
  
  function extractSkillsFromJD(text) {
    return skillsDB.filter((skill) => {
      const escapedSkill =
        escapeRegex(skill);
  
      const regex = new RegExp(
        `\\b${escapedSkill}\\b`,
        "i"
      );
  
      return regex.test(text);
    });
  }

module.exports = {parseResume, ExtractName , ExtractEmail , ExtractPhone , ExtractGithub , ExtractLinkedIn , ExtractSkills , ExtractExperience , ExtractEducation , extractSkillsFromJD};
