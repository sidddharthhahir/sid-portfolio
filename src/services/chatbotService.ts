
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
    console.log('API key set for enhanced responses');
  }

  async getResponse(message: string): Promise<string> {
    console.log('Processing message:', message);
    
    // Try OpenAI API first if key is available
    if (this.apiKey) {
      try {
        const response = await this.getOpenAIResponse(message);
        console.log('OpenAI response:', response);
        return response;
      } catch (error) {
        console.error('OpenAI API error:', error);
        // Fall back to rule-based responses
      }
    }
    
    // Rule-based responses
    const response = this.getRuleBasedResponse(message);
    console.log('Rule-based response:', response);
    return response;
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
    const lowerMessage = message.toLowerCase().trim();
    console.log('Analyzing message:', lowerMessage);

    // Greetings and introductions
    if (this.containsAny(lowerMessage, ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'])) {
      console.log('Matched: greetings');
      return "Hello! I'm Siddharth's AI assistant. I can help you learn about his skills, projects, education, and background. What would you like to know?";
    }

    // Skills and technologies
    if (this.containsAny(lowerMessage, ['skill', 'technology', 'programming', 'language', 'tech', 'python', 'django', 'database', 'sql', 'javascript', 'what can you do', 'what do you know', 'expertise', 'proficient'])) {
      console.log('Matched: skills');
      return `Siddharth specializes in Python development with Django framework, SQL databases (PostgreSQL, MySQL), and web technologies like JavaScript and HTML/CSS. His core skills include: ${portfolioData.skills.slice(0, 6).join(', ')}. He's particularly strong in backend development and database design!`;
    }

    // Projects and portfolio
    if (this.containsAny(lowerMessage, ['project', 'work', 'portfolio', 'app', 'application', 'built', 'created', 'developed', 'recipe', 'task manager', 'what have you built', 'show me work'])) {
      console.log('Matched: projects');
      const randomProject = portfolioData.projects[Math.floor(Math.random() * portfolioData.projects.length)];
      return `Siddharth has built several impressive projects! For example, his ${randomProject.name}: ${randomProject.description}. It uses ${randomProject.technologies.join(', ')}. Check out the Portfolio section to see all his work and detailed case studies!`;
    }

    // Education and background
    if (this.containsAny(lowerMessage, ['education', 'study', 'degree', 'university', 'background', 'school', 'college', 'where did you study', 'qualification', 'academic'])) {
      console.log('Matched: education');
      return `Siddharth is currently pursuing a Master's in Computer Science at International University of Applied Sciences in Berlin, Germany. He completed his Bachelor's in Computer Application from Gujarat University in 2022. He combines academic knowledge with practical development experience.`;
    }

    // Contact and hiring
    if (this.containsAny(lowerMessage, ['contact', 'email', 'reach', 'hire', 'work together', 'collaborate', 'get in touch', 'linkedin', 'github', 'how to contact'])) {
      console.log('Matched: contact');
      return `You can reach Siddharth at ${portfolioData.contact.email} for professional opportunities. Connect with him on LinkedIn or check out his GitHub for code samples. Visit the Contact section for all the ways to get in touch!`;
    }

    // Experience and professional background
    if (this.containsAny(lowerMessage, ['experience', 'job', 'professional', 'career', 'internship', 'work experience', 'how long', 'years of experience'])) {
      console.log('Matched: experience');
      return "Siddharth has hands-on experience as a Software Developer Intern and specializes in Django web development with database optimization. He's passionate about creating efficient, scalable backend solutions and has worked on multiple full-stack projects.";
    }

    // Location and availability
    if (this.containsAny(lowerMessage, ['where', 'location', 'berlin', 'germany', 'available', 'remote', 'timezone'])) {
      console.log('Matched: location');
      return "Siddharth is currently based in Berlin, Germany, where he's pursuing his Master's degree. He's available for remote work opportunities and collaborations across different time zones.";
    }

    // Specific technologies
    if (this.containsAny(lowerMessage, ['django', 'postgresql', 'mysql', 'bootstrap', 'css', 'html', 'git'])) {
      console.log('Matched: specific tech');
      return "Yes! Siddharth has extensive experience with that technology. He uses it regularly in his projects and has built several applications leveraging its capabilities. Check out his portfolio for specific examples and implementations!";
    }

    // Navigation and website help
    if (this.containsAny(lowerMessage, ['section', 'page', 'navigate', 'find', 'menu', 'how to', 'website'])) {
      console.log('Matched: navigation');
      return "The portfolio has several sections: About Me (background & skills), Services (what he offers), Portfolio (projects & case studies), and Contact (ways to reach him). You can navigate using the menu or scroll through the page. What specific information are you looking for?";
    }

    // Thank you and goodbye
    if (this.containsAny(lowerMessage, ['bye', 'goodbye', 'thanks', 'thank you', 'appreciate', 'great', 'awesome', 'perfect'])) {
      console.log('Matched: farewell');
      return "Thank you for visiting Siddharth's portfolio! Feel free to explore the different sections, check out his projects, and don't hesitate to reach out for opportunities or collaborations. Have a great day!";
    }

    // Who is questions
    if (this.containsAny(lowerMessage, ['who is', 'who are you', 'tell me about', 'about siddharth', 'about you'])) {
      console.log('Matched: who is');
      return "Siddharth Ahir is a Python Developer & Django Specialist currently pursuing his Master's in Computer Science in Berlin. He specializes in backend development, database design, and building scalable web applications. He's passionate about clean code and efficient solutions!";
    }

    // Default response with helpful suggestions
    console.log('No match found, using default response');
    const suggestions = [
      "his technical skills and programming languages",
      "his projects like the Recipe Manager or Task Manager apps", 
      "his educational background and current studies in Berlin",
      "how to contact him for work opportunities",
      "his experience with Django and Python development"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    return `I'd be happy to help! You can ask me about ${randomSuggestion}, or explore the portfolio sections for detailed information. For specific questions not covered here, feel free to contact Siddharth directly!`;
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }
}

export type { ChatMessage };
