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
    const systemPrompt = `You are Siddharth Ahir's personal AI assistant on his portfolio website. You provide precise, contextual answers about Siddharth based on visitor questions.

PERSONAL INFORMATION:
- Full Name: Siddharth Ahir
- Date of Birth: 25 August 2002
- Role: Python Developer & Django Specialist
- Best Friends: Bhavsar, Mihir, Harsh, Bansri, Pranav, Dhruv
- Email: sidahir25820@gmail.com
- LinkedIn: linkedin.com/in/siddharth-ahir-798754262
- GitHub: github.com/sidddharthhahir

EDUCATION:
- Master's in Computer Science (Currently Pursuing) - International University of Applied Sciences, Berlin
- Bachelor in Computer Application (Completed 2022) - Gujarat University

SKILLS: ${portfolioData.skills.join(', ')}

PROJECTS:
${portfolioData.projects.map(p => `- ${p.name}: ${p.description} (Technologies: ${p.technologies.join(', ')})`).join('\n')}

INSTRUCTIONS:
1. Answer ONLY what is specifically asked. Don't provide extra information unless requested.
2. If asked about bachelor's degree, mention only bachelor's details, not master's.
3. If asked about specific skills, focus on those skills mentioned.
4. If asked about best friends, respond exactly: "Bhavsar, Mihir, Harsh, Bansri, Pranav, Dhruv"
5. If asked about age or birth date, use "25 August 2002"
6. Maintain conversation context for follow-up questions.
7. For ambiguous questions, ask for clarification.
8. Keep responses concise (1-3 sentences) unless detailed explanation is requested.
9. Be conversational and helpful.

Remember: You represent Siddharth professionally, so maintain a friendly but professional tone.`;

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

    // Date of birth / age questions
    if (this.containsAny(lowerMessage, ['birthday', 'birth date', 'date of birth', 'when was', 'born', 'age', 'how old'])) {
      console.log('Matched: birthday/age');
      return "Siddharth was born on 25 August 2002.";
    }

    // Best friends question
    if (this.containsAny(lowerMessage, ['best friend', 'friends', 'who is siddharth\'s best friend', 'closest friend'])) {
      console.log('Matched: best friends');
      return "Siddharth's best friends are: Bhavsar, Mihir, Harsh, Bansri, Pranav, Dhruv.";
    }

    // Specific education questions
    if (this.containsAny(lowerMessage, ['bachelor', "bachelor's", 'undergraduate']) && !this.containsAny(lowerMessage, ['master', 'current'])) {
      console.log('Matched: bachelor degree only');
      return "Siddharth completed his Bachelor in Computer Application from Gujarat University in 2022.";
    }

    if (this.containsAny(lowerMessage, ['master', "master's", 'current study', 'currently studying'])) {
      console.log('Matched: master degree');
      return "Siddharth is currently pursuing his Master's in Computer Science at International University of Applied Sciences in Berlin, Germany.";
    }

    // Greetings
    if (this.containsAny(lowerMessage, ['hi', 'hello', 'hey', 'greetings'])) {
      console.log('Matched: greetings');
      return "Hello! I'm Siddharth's AI assistant. I can answer specific questions about his background, skills, projects, and personal information. What would you like to know?";
    }

    // Skills and technologies
    if (this.containsAny(lowerMessage, ['skill', 'technology', 'programming', 'python', 'django'])) {
      console.log('Matched: skills');
      const requestedSkills = portfolioData.skills.filter(skill => 
        lowerMessage.includes(skill.toLowerCase())
      );
      
      if (requestedSkills.length > 0) {
        return `Yes, Siddharth is skilled in ${requestedSkills.join(', ')}. ${requestedSkills.includes('Python') ? 'He specializes in Python development with Django framework.' : ''}`;
      }
      
      return `Siddharth's key skills include: ${portfolioData.skills.slice(0, 6).join(', ')}. He specializes in Python and Django development.`;
    }

    // Projects
    if (this.containsAny(lowerMessage, ['project', 'work', 'portfolio', 'built', 'recipe', 'task manager'])) {
      console.log('Matched: projects');
      if (lowerMessage.includes('recipe')) {
        const project = portfolioData.projects.find(p => p.name.toLowerCase().includes('recipe'));
        return `${project?.name}: ${project?.description} Built with ${project?.technologies.join(', ')}.`;
      }
      if (lowerMessage.includes('task')) {
        const project = portfolioData.projects.find(p => p.name.toLowerCase().includes('task'));
        return `${project?.name}: ${project?.description} Built with ${project?.technologies.join(', ')}.`;
      }
      return "Siddharth has built several projects including a Recipe Manager and Personal Task Manager. Which specific project would you like to know about?";
    }

    // Contact information
    if (this.containsAny(lowerMessage, ['contact', 'email', 'reach', 'linkedin', 'github'])) {
      console.log('Matched: contact');
      return `You can reach Siddharth at ${portfolioData.contact.email}. Find him on LinkedIn or check his GitHub for code samples.`;
    }

    // Location
    if (this.containsAny(lowerMessage, ['where', 'location', 'berlin', 'germany'])) {
      console.log('Matched: location');
      return "Siddharth is currently based in Berlin, Germany, where he's pursuing his Master's degree.";
    }

    // Default with clarification
    console.log('No specific match found');
    return "I can help you learn about Siddharth's background, education, skills, projects, or personal information. Could you be more specific about what you'd like to know?";
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }
}

export type { ChatMessage };
