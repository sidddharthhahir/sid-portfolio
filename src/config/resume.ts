
// Resume Configuration
// To update your resume link, simply change the URL below and the changes will be reflected across the entire portfolio

export const RESUME_CONFIG = {
  // Google Drive resume link - make sure it's set to "Anyone with the link can view"
  url: 'https://drive.google.com/file/d/1V7nRpW2vbIPUqCLS5JrU08tngmPzDXr8/view?usp=sharing',
  
  // Display name for the resume file
  fileName: 'Siddharth Ahir Resume',
  
  // Instructions for updating:
  // 1. Upload your new resume to Google Drive
  // 2. Set sharing permissions to "Anyone with the link can view"
  // 3. Copy the sharing link
  // 4. Replace the URL above with your new link
  // 5. Save this file and your portfolio will automatically use the new resume
};

// Resume data structure
export const resumeData = {
  personalInfo: {
    name: "Siddharth Ahir",
    title: "Full Stack Developer",
    email: "siddharth.ahir@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    links: [
      { label: "GitHub", url: "https://github.com/siddharthahir", icon: "Github" },
      { label: "LinkedIn", url: "https://linkedin.com/in/siddharthahir", icon: "Linkedin" },
      { label: "Portfolio", url: "https://siddharthahir.dev", icon: "Globe" }
    ]
  },
  summary: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications using modern technologies like React, Node.js, and cloud platforms.",
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      duration: "2022 - Present",
      description: "Lead development of enterprise web applications serving 100K+ users. Implemented microservices architecture and improved system performance by 40%.",
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]
    },
    {
      title: "Full Stack Developer",
      company: "Startup Labs",
      location: "San Jose, CA", 
      duration: "2020 - 2022",
      description: "Built responsive web applications from scratch. Collaborated with design team to create intuitive user interfaces and RESTful APIs.",
      technologies: ["React", "Express.js", "MongoDB", "Docker"]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      year: "2016 - 2020",
      gpa: "3.8/4.0"
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: "Expert", description: "Building modern web applications", detailedDescription: "Expert in React development with hooks, context, and performance optimization", keyProjects: [{ name: "E-commerce Platform", url: "#" }] },
        { name: "TypeScript", level: "Advanced", description: "Type-safe JavaScript development", detailedDescription: "Advanced TypeScript usage for large-scale applications", keyProjects: [{ name: "CRM System" }] }
      ]
    },
    {
      category: "Backend", 
      items: [
        { name: "Node.js", level: "Expert", description: "Server-side JavaScript", detailedDescription: "Expert in Node.js for building scalable backend services", keyProjects: [{ name: "API Gateway" }] }
      ]
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-featured e-commerce platform with payment integration and admin dashboard",
      technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
      link: "https://github.com/siddharthahir/ecommerce"
    }
  ]
};
