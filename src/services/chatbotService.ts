interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotData {
  name: "Siddharth Ahir";
  role: "Python Developer & Django Specialist";
  dateOfBirth: "25 August 2002";
  bestFriends: string[];
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
    year?: string;
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
  dateOfBirth: "25 August 2002",
  bestFriends: ["Bhavsar", "Mihir", "Harsh", "Bansri", "Pranav", "Dhruv"],
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
      status: "Completed",
      year: "2022"
    }
  ],
  contact: {
    email: "sidahir25820@gmail.com",
    linkedin: "linkedin.com/in/siddharth-ahir-798754262",
    github: "github.com/sidddharthhahir"
  }
};

export class ChatbotService {
  private static readonly API_KEY_STORAGE = 'chatbot_openai_key';
  private apiKey: string | null = null;
  private conversationHistory: Array<{role: string, content: string}> = [];

  constructor() {
    this.loadStoredApiKey();
  }

  private loadStoredApiKey(): void {
    try {
      const storedKey = localStorage.getItem(ChatbotService.API_KEY_STORAGE);
      if (storedKey) {
        this.apiKey = storedKey;
        console.log('API key loaded from storage');
      }
    } catch (error) {
      console.warn('Failed to load API key from storage:', error);
    }
  }

  setApiKey(key: string): void {
    this.apiKey = key.trim();
    try {
      localStorage.setItem(ChatbotService.API_KEY_STORAGE, this.apiKey);
      console.log('API key stored successfully');
    } catch (error) {
      console.warn('Failed to store API key:', error);
    }
  }

  getStoredApiKey(): string | null {
    return this.apiKey;
  }

  clearApiKey(): void {
    this.apiKey = null;
    try {
      localStorage.removeItem(ChatbotService.API_KEY_STORAGE);
      console.log('API key cleared');
    } catch (error) {
      console.warn('Failed to clear API key:', error);
    }
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
    
    // Rule-based responses as fallback
    const response = this.getRuleBasedResponse(message);
    console.log('Rule-based response:', response);
    return response;
  }

  private async getOpenAIResponse(message: string): Promise<string> {
    const systemPrompt = `You are Siddharth Ahir's personal AI assistant on his portfolio website. Greet visitors warmly and help them explore Siddharth's work and background.

PERSONAL INFORMATION:
- Full Name: Siddharth Ahir
- Date of Birth: 25 August 2002 (22 years old)
- Role: Python Developer & Django Specialist
- Current Location: Berlin, Germany (pursuing Master's degree)
- Best Friends: Bhavsar, Mihir, Harsh, Bansri, Pranav, Dhruv
- Email: sidahir25820@gmail.com
- LinkedIn: linkedin.com/in/siddharth-ahir-798754262
- GitHub: github.com/sidddharthhahir

EDUCATION & BACKGROUND:
- Master's in Computer Science (Currently Pursuing) - International University of Applied Sciences, Berlin, Germany
- Bachelor in Computer Application (Completed 2022) - Gujarat University, India
- Passionate about web development, database optimization, and creating efficient solutions
- Enjoys working on challenging projects that solve real-world problems

TECHNICAL SKILLS: ${portfolioData.skills.join(', ')}

PROJECTS & ACHIEVEMENTS:
${portfolioData.projects.map(p => `- ${p.name}: ${p.description} (Technologies: ${p.technologies.join(', ')})`).join('\n')}

PERSONALITY & INTERESTS:
- Dedicated and passionate about technology
- Enjoys learning new programming languages and frameworks
- Believes in creating user-friendly and efficient solutions
- Team player who values collaboration and friendship
- Currently expanding skills through international education in Berlin

PRIVACY & PERSONAL BOUNDARIES:
- If asked about girlfriend, ex-girlfriend, or romantic relationships: "Sorry, I prefer to keep my personal relationships private."
- If asked about family details beyond education: "I keep my family information private, but I'm happy to share about my professional journey."
- For sensitive personal questions: Redirect to professional topics politely

INSTRUCTIONS:
1. Greet visitors warmly and offer to help them explore Siddharth's work
2. When asked for "more details about Siddharth," provide a comprehensive summary including background, education, skills, achievements, and interests
3. Handle personal/private questions gracefully while maintaining professionalism
4. Be conversational, natural, and context-aware
5. Maintain conversation context for follow-up questions
6. Ask clarifying questions when needed
7. Be enthusiastic about Siddharth's technical achievements and projects
8. Always be friendly, professional, and respectful

Remember: You represent Siddharth professionally while being personable and helpful to visitors.`;

    // Add message to conversation history
    this.conversationHistory.push({ role: 'user', content: message });

    // Keep only last 6 messages for context (3 exchanges)
    if (this.conversationHistory.length > 6) {
      this.conversationHistory = this.conversationHistory.slice(-6);
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.conversationHistory
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();
    
    // Add AI response to conversation history
    this.conversationHistory.push({ role: 'assistant', content: aiResponse });
    
    return aiResponse;
  }

  private getRuleBasedResponse(message: string): string {
    const lowerMessage = message.toLowerCase().trim();
    console.log('Analyzing message:', lowerMessage);

    // Personal relationship questions
    if (this.containsAny(lowerMessage, ['girlfriend', 'ex-girlfriend', 'dating', 'relationship', 'romantic', 'partner'])) {
      console.log('Matched: personal relationships');
      return "Sorry, I prefer to keep my personal relationships private. I'm happy to share about my professional journey and technical skills instead!";
    }

    // Comprehensive details about Siddharth
    if (this.containsAny(lowerMessage, ['more details', 'tell me about', 'who is siddharth', 'about siddharth', 'comprehensive', 'summary'])) {
      console.log('Matched: comprehensive details');
      return `Siddharth Ahir is a 22-year-old Python Developer and Django Specialist currently pursuing his Master's in Computer Science at International University of Applied Sciences in Berlin, Germany. He completed his Bachelor's in Computer Application from Gujarat University in 2022. 

His technical expertise includes Python, Django, SQL, PostgreSQL, JavaScript, HTML/CSS, Git, and API development. He's passionate about creating efficient web applications and robust database solutions.

Notable projects include a Recipe Management System with user authentication and image uploads, and a Task Management Dashboard with real-time updates. He also contributed to HCI research focusing on improving digital interface usability.

Siddharth values collaboration and friendship, with close friends including Bhavsar, Mihir, Harsh, Bansri, Pranav, and Dhruv. He's dedicated to learning new technologies and solving real-world problems through code.`;
    }

    // Date of birth / age questions
    if (this.containsAny(lowerMessage, ['birthday', 'birth date', 'date of birth', 'when was', 'born', 'age', 'how old'])) {
      console.log('Matched: birthday/age');
      return "Siddharth was born on 25 August 2002, making him 22 years old.";
    }

    // Best friends question
    if (this.containsAny(lowerMessage, ['best friend', 'friends', 'who is siddharth\'s best friend', 'closest friend'])) {
      console.log('Matched: best friends');
      return "Siddharth's best friends are: Bhavsar, Mihir, Harsh, Bansri, Pranav, and Dhruv. He values friendship and collaboration highly.";
    }

    // Specific education questions
    if (this.containsAny(lowerMessage, ['bachelor', "bachelor's", 'undergraduate']) && !this.containsAny(lowerMessage, ['master', 'current'])) {
      console.log('Matched: bachelor degree only');
      return "Siddharth completed his Bachelor in Computer Application from Gujarat University in 2022.";
    }

    if (this.containsAny(lowerMessage, ['master', "master's", 'current study', 'currently studying', 'berlin'])) {
      console.log('Matched: master degree');
      return "Siddharth is currently pursuing his Master's in Computer Science at International University of Applied Sciences in Berlin, Germany. This international experience is expanding his technical knowledge and global perspective.";
    }

    // Greetings
    if (this.containsAny(lowerMessage, ['hi', 'hello', 'hey', 'greetings'])) {
      console.log('Matched: greetings');
      return "Hello! Welcome to Siddharth's portfolio! I'm his AI assistant and I'm here to help you explore his work and background. Feel free to ask me about his projects, skills, education, or any other questions you might have!";
    }

    // Skills and technologies
    if (this.containsAny(lowerMessage, ['skill', 'technology', 'programming', 'python', 'django'])) {
      console.log('Matched: skills');
      const requestedSkills = portfolioData.skills.filter(skill => 
        lowerMessage.includes(skill.toLowerCase())
      );
      
      if (requestedSkills.length > 0) {
        return `Yes, Siddharth is skilled in ${requestedSkills.join(', ')}. ${requestedSkills.includes('Python') ? 'He specializes in Python development with Django framework and has experience building full-stack web applications.' : ''}`;
      }
      
      return `Siddharth's technical skills include: ${portfolioData.skills.slice(0, 6).join(', ')}, and more. He specializes in Python and Django development, with strong database management and API integration abilities.`;
    }

    // Projects
    if (this.containsAny(lowerMessage, ['project', 'work', 'portfolio', 'built', 'recipe', 'task manager'])) {
      console.log('Matched: projects');
      if (lowerMessage.includes('recipe')) {
        const project = portfolioData.projects.find(p => p.name.toLowerCase().includes('recipe'));
        return `${project?.name}: ${project?.description} Built with ${project?.technologies.join(', ')}. This project showcases his ability to create user-friendly applications with advanced features.`;
      }
      if (lowerMessage.includes('task')) {
        const project = portfolioData.projects.find(p => p.name.toLowerCase().includes('task'));
        return `${project?.name}: ${project?.description} Built with ${project?.technologies.join(', ')}. This demonstrates his skills in real-time applications and team collaboration features.`;
      }
      return "Siddharth has built several impressive projects including a Recipe Management System with user authentication, a Task Management Dashboard with real-time updates, and contributed to HCI research. Which specific project interests you most?";
    }

    // Contact information
    if (this.containsAny(lowerMessage, ['contact', 'email', 'reach', 'linkedin', 'github'])) {
      console.log('Matched: contact');
      return `You can reach Siddharth at ${portfolioData.contact.email}. Connect with him on LinkedIn for professional networking or check his GitHub to see his code and contributions!`;
    }

    // Location and background
    if (this.containsAny(lowerMessage, ['where', 'location', 'berlin', 'germany', 'india', 'gujarat'])) {
      console.log('Matched: location');
      return "Siddharth is currently based in Berlin, Germany, where he's pursuing his Master's degree. He originally completed his Bachelor's degree in Gujarat, India. This international experience gives him a diverse perspective on technology and collaboration.";
    }

    // Default with helpful suggestions
    console.log('No specific match found');
    return "I'm here to help you learn about Siddharth! You can ask me about his technical skills, educational background, projects he's built, his time in Berlin, or any other questions about his professional journey. What interests you most?";
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }
}

export type { ChatMessage };
