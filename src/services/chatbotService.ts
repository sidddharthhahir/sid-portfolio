
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotData {
  name: "Siddharth Ahir";
  role: "Python Developer & Django Specialist";
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    status: string;
  }>;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

const portfolioData: ChatbotData = {
  name: "Siddharth Ahir",
  role: "Python Developer & Django Specialist",
  skills: [
    "Python", "Django", "SQL", "PostgreSQL", "JavaScript", 
    "HTML/CSS", "Git", "API Integration", "Database Design",
    "Web Development", "Backend Development"
  ],
  projects: [
    {
      name: "Recipe Manager",
      description: "Django web application for recipe management with user authentication and image uploads",
      technologies: ["Django", "PostgreSQL", "Python", "Bootstrap"]
    },
    {
      name: "Personal Task Manager", 
      description: "Task management application with secure user data and comprehensive tracking features",
      technologies: ["Django", "MySQL", "JavaScript", "CSS"]
    },
    {
      name: "HCI Portfolio Project",
      description: "Usability testing for weather website with comprehensive UX analysis and recommendations",
      technologies: ["UX Research", "Testing", "Analysis", "Documentation"]
    }
  ],
  education: [
    {
      degree: "Master's in Computer Science",
      institution: "International University of Applied Sciences, Berlin",
      status: "Currently Pursuing"
    },
    {
      degree: "Bachelor in Computer Application",
      institution: "Gujarat University", 
      status: "Completed 2022"
    }
  ],
  contact: {
    email: "sidahir25820@gmail.com",
    linkedin: "linkedin.com/in/siddharth-ahir-798754262",
    github: "github.com/sidddharthhahir"
  }
};

export class ChatbotService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async getResponse(message: string): Promise<string> {
    // Try OpenAI API first if key is available
    if (this.apiKey) {
      try {
        return await this.getOpenAIResponse(message);
      } catch (error) {
        console.error('OpenAI API error:', error);
        // Fall back to rule-based responses
      }
    }
    
    // Rule-based responses
    return this.getRuleBasedResponse(message);
  }

  private async getOpenAIResponse(message: string): Promise<string> {
    const systemPrompt = `You are an AI assistant for Siddharth Ahir's portfolio website. You help visitors learn about his background, skills, and projects. 

About Siddharth:
- Python Developer & Django Specialist
- Currently pursuing Master's in Computer Science at International University of Applied Sciences, Berlin
- Bachelor in Computer Application from Gujarat University (2022)
- Skills: ${portfolioData.skills.join(', ')}
- Projects: ${portfolioData.projects.map(p => `${p.name} (${p.technologies.join(', ')})`).join('; ')}
- Contact: ${portfolioData.contact.email}

Keep responses concise (1-3 sentences), professional, and helpful. Guide visitors to relevant portfolio sections when appropriate.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  private getRuleBasedResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
      return "Hello! I'm Siddharth's AI assistant. I can help you learn about his skills, projects, and background. What would you like to know?";
    }

    // Skills
    if (lowerMessage.match(/\b(skill|technology|programming|language|tech)\b/)) {
      return `Siddharth specializes in ${portfolioData.skills.slice(0, 5).join(', ')} and more. He's particularly strong in Python backend development and Django web applications. Check out the Skills section for details!`;
    }

    // Projects
    if (lowerMessage.match(/\b(project|work|portfolio|app|application)\b/)) {
      const project = portfolioData.projects[0];
      return `Siddharth has built several impressive projects, including a ${project.name} using ${project.technologies.join(', ')}. Visit the Portfolio section to see all his work!`;
    }

    // Education/Background
    if (lowerMessage.match(/\b(education|study|degree|university|background)\b/)) {
      return `Siddharth is currently pursuing a Master's in Computer Science in Berlin and holds a Bachelor's in Computer Application. He has professional experience as a Software Developer Intern.`;
    }

    // Contact
    if (lowerMessage.match(/\b(contact|email|reach|hire|work)\b/)) {
      return `You can reach Siddharth at ${portfolioData.contact.email} or connect via LinkedIn. Check the Contact section for all ways to get in touch!`;
    }

    // Experience
    if (lowerMessage.match(/\b(experience|work|job|professional)\b/)) {
      return "Siddharth has experience as a Software Developer Intern and specializes in Django web development with database optimization. He's passionate about creating efficient, scalable solutions.";
    }

    // Navigation help
    if (lowerMessage.match(/\b(section|page|navigate|find|where)\b/)) {
      return "The portfolio has sections for About Me, Skills, Services, Portfolio projects, and Contact information. You can navigate using the menu or scroll through the page!";
    }

    // Goodbye
    if (lowerMessage.match(/\b(bye|goodbye|thanks|thank you)\b/)) {
      return "Thank you for visiting Siddharth's portfolio! Feel free to reach out if you have any questions or opportunities to discuss.";
    }

    // Default response
    return "I'd be happy to help! You can ask me about Siddharth's skills, projects, education, or how to contact him. For specific details, feel free to explore the portfolio sections or reach out directly!";
  }
}

export type { ChatMessage };
