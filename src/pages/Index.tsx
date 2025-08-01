import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Linkedin, Github, Code, Database, Globe, User, Briefcase, Contact, ArrowDown, Sparkles, Star, Server, Braces, FileCode, GitBranch, Layers, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ChatButton from '@/components/ChatButton';
import ChatWindow from '@/components/ChatWindow';
import Navigation from '@/components/Navigation';
import VisitorGreeting from '@/components/VisitorGreeting';
import ConfettiEasterEgg from '@/components/ConfettiEasterEgg';
import SkillModal from '@/components/SkillModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { RESUME_CONFIG } from '@/config/resume';

const Index = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const { toast } = useToast();

  // Static content - no editing functionality for public users
  const content = {
    professionalSummary: "Results-driven Software Engineer with hands-on experience building and optimizing web applications using Python, Django, JavaScript, React, and SQL. Skilled in both backend and frontend development, with a strong foundation in designing scalable systems and creating responsive user interfaces. Demonstrated ability to learn new technologies quickly, solve complex problems, and deliver high-quality solutions through personal and academic projects. Committed to writing maintainable code and contributing effectively to collaborative teams.",
    heroTitle: "Full-Stack Developer & Database Expert",
    heroDescription: "Passionate about creating efficient web applications and robust database solutions. Currently pursuing Master's in Computer Science with expertise in Python, Django, and modern web technologies."
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const skills = [
    { 
      name: 'Python', 
      icon: Code, 
      description: 'Advanced programming with Django, Flask frameworks',
      detailedDescription: 'I leverage Python to build robust backend applications, automation scripts, and data processing solutions. My expertise spans web development with Django and Flask, API development, and database integration.',
      keyProjects: [
        { name: 'Personal Finance Management Web Application', url: 'https://github.com/sidddharthhahir/MoneyBook.git' },
        { name: 'Recipe Manager', url: 'https://github.com/sidddharthhahir/recipe-manager' },
        { name: 'Personal Task Manager', url: 'https://github.com/sidddharthhahir/personal-task-manager' }
      ]
    },
    { 
      name: 'JavaScript', 
      icon: Braces, 
      description: 'Modern ES6+, React, Node.js development',
      detailedDescription: 'Proficient in modern JavaScript (ES6+), React for frontend development, and Node.js for backend services. I create dynamic and interactive web experiences with clean code practices and async programming.',
      keyProjects: [
        { name: 'Portfolio Website' },
        { name: 'Personal Finance Management Web Application', url: 'https://github.com/sidddharthhahir/MoneyBook.git' },
        { name: 'Personal Task Manager', url: 'https://github.com/sidddharthhahir/personal-task-manager' }
      ]
    },
    { 
      name: 'Django', 
      icon: Server, 
      description: 'Full-stack web development and REST APIs',
      detailedDescription: 'I use Django to develop comprehensive web applications with robust backend architecture, user authentication, and RESTful API services, focusing on scalable and maintainable code.',
      keyProjects: [
        { name: 'Personal Finance Management Web Application', url: 'https://github.com/sidddharthhahir/MoneyBook.git' },
        { name: 'Recipe Manager', url: 'https://github.com/sidddharthhahir/recipe-manager' },
        { name: 'Personal Task Manager', url: 'https://github.com/sidddharthhahir/personal-task-manager' }
      ]
    },
    { 
      name: 'React', 
      icon: Layers, 
      description: 'Modern frontend development with hooks and TypeScript',
      detailedDescription: 'Expert in building dynamic user interfaces with React, utilizing hooks, context, and TypeScript for type-safe development. I create responsive and accessible web applications.',
      keyProjects: [
        { name: 'Portfolio Website' }
      ]
    },
    { 
      name: 'SQL', 
      icon: Database, 
      description: 'Database design, optimization, and complex queries',
      detailedDescription: 'Proficient in designing efficient database schemas, writing complex queries, and optimizing database performance for web applications with focus on data integrity and scalability.',
      keyProjects: [
        { name: 'Personal Finance Management Web Application' },
        { name: 'Recipe Manager' },
        { name: 'Personal Task Manager' }
      ]
    },
    { 
      name: 'PostgreSQL', 
      icon: Database, 
      description: 'Advanced database management and performance tuning',
      detailedDescription: 'I utilize PostgreSQL for robust data storage solutions, implementing advanced features like indexing, stored procedures, and performance optimization for high-traffic applications.',
      keyProjects: [
        { name: 'Recipe Manager', url: 'https://github.com/sidddharthhahir/recipe-manager' }
      ]
    },
    { 
      name: 'Git', 
      icon: GitBranch, 
      description: 'Version control, branching strategies, and collaboration',
      detailedDescription: 'I use Git for comprehensive version control, implementing effective branching strategies and collaborative development workflows to maintain clean and organized codebases.',
      keyProjects: [
        { name: 'All Projects' }
      ]
    },
    { 
      name: 'REST APIs', 
      icon: Layers, 
      description: 'API design, integration, and testing',
      detailedDescription: 'I design and implement RESTful APIs with proper authentication, error handling, and documentation, ensuring seamless integration between frontend and backend systems.',
      keyProjects: [
        { name: 'Personal Finance Management Web Application' },
        { name: 'Recipe Manager' },
        { name: 'Personal Task Manager' }
      ]
    }
  ];

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Creating responsive, user-friendly websites and web applications using modern technologies and best practices.'
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Designing and optimizing databases, ensuring data integrity, and implementing efficient query strategies.'
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Building complete applications from frontend to backend, ensuring seamless integration and optimal performance.'
    }
  ];

  const projects = [
    {
      title: 'Personal Finance Management Web Application',
      description: 'A comprehensive web application for managing personal finances with secure user authentication, expense tracking, and financial data visualization.',
      technologies: ['Django', 'Bootstrap', 'JavaScript', 'Chart.js', 'EmailJS'],
      features: [
        'Secure user registration and login with email verification',
        'Add and manage expenses and income with dynamic visualization',
        'Export financial reports in PDF, Excel, and CSV formats',
        'User currency preference settings for personalized experience',
        'Django RESTful APIs with JSON and EmailJS integration',
        'Responsive design with Bootstrap for intuitive user interface'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/MoneyBook.git',
      timeline: 'June 2025 – July 2025'
    },
    {
      title: 'Recipe Manager',
      description: 'A comprehensive recipe management platform with authentication, image upload, advanced search capabilities, and optimized database performance.',
      technologies: ['Django', 'PostgreSQL', 'Python', 'Bootstrap', 'HTML5', 'CSS3'],
      features: [
        'User authentication and profile management',
        'Recipe CRUD operations with image upload functionality', 
        'Advanced search and filtering system with optimized queries',
        'RESTful API design with PostgreSQL schema optimization',
        '35% faster data retrieval through optimized database schemas',
        'Social features for sharing and rating recipes'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/recipe-manager',
      timeline: 'April 2025 – May 2025'
    },
    {
      title: 'Personal Task Manager',
      description: 'An intuitive task management system with real-time updates, user authentication, and motivational features for enhanced productivity.',
      technologies: ['Django', 'MySQL', 'JavaScript', 'AJAX', 'HTML5', 'CSS3'],
      features: [
        'User registration and secure login system',
        'Task management with due dates and priority levels',
        'Motivational quotes integration for user engagement',
        'Real-time AJAX updates for seamless user experience',
        'Statistics dashboard with progress tracking',
        'Responsive design for all devices'
      ],
      githubUrl: 'https://github.com/sidddharthhahir/personal-task-manager',
      timeline: 'Feb 2025 – March 2025'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, interactive portfolio website built with React and TypeScript, featuring AI integration and multi-language support.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn-ui', 'AI Integration'],
      features: [
        'Interactive AI chatbot for visitor engagement',
        'Multi-language support for international accessibility',
        'Responsive design with modern UI components',
        'Real-time analytics and visitor tracking',
        '500+ unique visitors achieved in the first month',
        'SEO optimized with fast loading performance'
      ],
      timeline: 'Ongoing'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      emailjs.init('1XEPgOlzfPoTgaput');
      const result = await emailjs.send('service_5n5oy19', 'template_ixyj8he', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Siddharth Ahir'
      });
      console.log('Email sent successfully:', result);
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.desc')
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.desc'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleProfileClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setShowConfetti(true);
        return 0; // Reset counter
      }
      return newCount;
    });
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleResumeDownload = () => {
    try {
      // Convert Google Drive view link to direct download link
      let downloadUrl = RESUME_CONFIG.url;
      
      // If it's a Google Drive link, convert to direct download format
      if (downloadUrl.includes('drive.google.com')) {
        const fileId = downloadUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) {
          downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
      }
      
      // Open the resume in a new tab
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      
      toast({
        title: "Resume Opened",
        description: `${RESUME_CONFIG.fileName} has been opened in a new tab!`
      });
    } catch (error) {
      console.error('Failed to open resume:', error);
      toast({
        title: "Download Error",
        description: "Failed to open resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill);
    setIsSkillModalOpen(true);
  };

  const handleProjectClick = (githubUrl?: string) => {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Add custom animations in a style tag */}
      <style>
        {`
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-up-down-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        .float-animation {
          animation: float-up-down 3s ease-in-out infinite;
        }
        
        .float-animation-delayed {
          animation: float-up-down-delayed 3s ease-in-out infinite 1.5s;
        }
        `}
      </style>

      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-400/30 rounded-full animate-ping delay-300"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-ping delay-1000"></div>
        </div>
      </div>

      {/* Responsive Navigation */}
      <Navigation scrollToSection={scrollToSection} />

      {/* Enhanced Dark Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-24" data-animate>
        <div className={`container mx-auto px-6 text-center transition-all duration-1500 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Enhanced Profile Section with fixed image positioning */}
          <div className="mb-8">
            <div className="relative w-80 h-80 mx-auto mb-8 group p-8">
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-spin opacity-75" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-6 rounded-full backdrop-blur-xl bg-black/30 border border-white/20 shadow-2xl"></div>
              <div 
                className="relative w-64 h-64 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-3 group-hover:scale-110 transition-all duration-700 shadow-2xl cursor-pointer"
                onClick={handleProfileClick}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <img 
                    src="https://i.postimg.cc/jdKRxWhL/IMG-1242.jpg" 
                    alt="Siddharth Ahir Profile" 
                    className="w-full h-full object-cover rounded-full object-center transition-all duration-700 group-hover:scale-105 filter brightness-110 contrast-110"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Text Content */}
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-3">
              <Sparkles size={28} className="text-yellow-400 animate-pulse" />
              <span className="text-2xl text-gray-300 font-medium">Hello, I'm</span>
              <Sparkles size={28} className="text-yellow-400 animate-pulse delay-500" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Siddharth Ahir
              </span>
            </h1>

            <h2 className="text-3xl md:text-4xl text-gray-200 mb-8 font-medium">
              {content.heroTitle}
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              {content.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => scrollToSection('portfolio')} 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-10 py-5 text-lg rounded-full hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/25 backdrop-blur-xl border border-white/20 group"
              >
                <span className="flex items-center gap-3">
                  View My Work
                  <Star size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="backdrop-blur-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 px-10 py-5 text-lg rounded-full hover:scale-110 transition-all duration-500 font-medium shadow-xl hover:shadow-purple-500/25"
              >
                Contact Me
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-gray-400 animate-pulse">Scroll to explore</span>
              <div className="animate-bounce">
                <ArrowDown size={28} className="text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Dark About Section */}
      <section id="about" className="py-24" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1500 delay-300 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-center gap-4 mb-16">
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t('about.title')}
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-cyan-400">Professional Summary</h3>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {content.professionalSummary}
                  </p>
                </div>
              </div>
              <div>
                <Card className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 text-2xl">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <h4 className="font-semibold text-gray-200 text-lg">MSc Computer Science</h4>
                      <p className="text-gray-300">International University of Applied Sciences</p>
                      <p className="text-gray-300">Berlin, Germany</p>
                      <p className="text-sm text-cyan-400 font-medium">Sept 2023 – Present</p>
                    </div>
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <h4 className="font-semibold text-gray-200 text-lg">Bachelor of Computer Application</h4>
                      <p className="text-gray-300">Gujarat University</p>
                      <p className="text-gray-300">Ahmedabad, India</p>
                      <p className="text-sm text-cyan-400 font-medium">July 2019 – April 2022</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Dark Skills Section - Fixed Grid Layout */}
      <section id="skills" className="py-24" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1500 delay-500 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Academic Projects
          </h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
              {skills.map((skill, index) => (
                <div key={index} className="w-full max-w-xs">
                  <Card 
                    className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-125 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 cursor-pointer hover:border-cyan-400/50 h-full"
                    onClick={() => handleSkillClick(skill)}
                  >
                    <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                      <div className="mb-6 flex justify-center">
                        <div className="p-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all duration-500 backdrop-blur-xl border border-white/20 group-hover:scale-110">
                          <skill.icon size={40} className="text-cyan-400 group-hover:text-purple-400 transition-all duration-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-200 mb-3 group-hover:text-cyan-400 transition-all duration-500">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-500 text-center">
                        {skill.description}
                      </p>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs text-cyan-400 font-medium">Click for details</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dark Services Section */}
      <section id="services" className="py-24" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1500 delay-700 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/20 group transform hover:-translate-y-3">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-6 p-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl w-fit shadow-2xl group-hover:shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110">
                    <service.icon size={40} className="text-white" />
                  </div>
                  <CardTitle className="text-gray-200 group-hover:text-cyan-400 transition-all duration-500 text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center leading-relaxed text-lg">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Dark Portfolio Section */}
      <section id="portfolio" className="py-24" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1500 delay-900 ${visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('portfolio.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 group transform hover:-translate-y-3 ${project.githubUrl ? 'cursor-pointer hover:border-purple-400/50' : ''}`}
                onClick={() => handleProjectClick(project.githubUrl)}
              >
                <CardHeader>
                  <CardTitle className="text-gray-200 group-hover:text-cyan-400 transition-all duration-500 text-xl flex items-center justify-between">
                    {project.title}
                    {project.githubUrl && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={20} className="text-purple-400" />
                      </div>
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed text-base">
                    {project.description}
                  </CardDescription>
                  {project.githubUrl && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge className="bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs">
                        <Github size={12} className="mr-1" />
                        View Code
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">{t('portfolio.technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} className="backdrop-blur-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-500 hover:scale-105">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">{t('portfolio.features')}</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Dark Contact Section */}
      <section id="contact" className="py-24" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1500 delay-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-3xl font-bold mb-8 text-gray-200">Let's Work Together</h3>
                <p className="text-gray-300 mb-10 leading-relaxed text-lg">
                  I'm always interested in new opportunities and collaborations. 
                  Feel free to reach out if you'd like to discuss a project or just say hello!
                </p>
                <div className="space-y-6">
                  <div className="flex items-center p-6 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-500 group hover:scale-105">
                    <Mail className="text-cyan-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={24} />
                    <a 
                      href="mailto:sidahir25820@gmail.com" 
                      className="text-gray-200 hover:text-cyan-400 transition-colors duration-500 font-medium text-lg"
                    >
                      Email
                    </a>
                  </div>
                  <div className="flex items-center p-6 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-500 group hover:scale-105">
                    <Linkedin className="text-cyan-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={24} />
                    <a 
                      href="https://linkedin.com/in/siddharth-ahir-798754262" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-cyan-400 transition-colors duration-500 font-medium text-lg"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="flex items-center p-6 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-500 group hover:scale-105">
                    <Github className="text-cyan-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={24} />
                    <a 
                      href="https://github.com/sidddharthhahir" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-cyan-400 transition-colors duration-500 font-medium text-lg"
                    >
                      GitHub
                    </a>
                  </div>
                  <button 
                    onClick={handleResumeDownload}
                    className="flex items-center w-full p-6 rounded-xl backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-500 group hover:scale-105"
                  >
                    <User className="text-cyan-400 mr-4 group-hover:scale-125 transition-transform duration-500" size={24} />
                    <span className="text-gray-200 hover:text-cyan-400 transition-colors duration-500 font-medium text-lg">
                      Download Resume
                    </span>
                  </button>
                </div>
              </div>
              <Card className="backdrop-blur-2xl bg-black/30 border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-700 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-200 text-2xl">Send Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="backdrop-blur-xl bg-black/40 border border-white/30 text-gray-200 placeholder-gray-400 focus:bg-black/60 transition-all duration-500 text-lg py-3" 
                      required 
                      disabled={isSubmitting} 
                    />
                    <Input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="backdrop-blur-xl bg-black/40 border border-white/30 text-gray-200 placeholder-gray-400 focus:bg-black/60 transition-all duration-500 text-lg py-3" 
                      required 
                      disabled={isSubmitting} 
                    />
                    <Textarea 
                      name="message" 
                      placeholder="Your Message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      className="backdrop-blur-xl bg-black/40 border border-white/30 text-gray-200 placeholder-gray-400 min-h-[150px] focus:bg-black/60 transition-all duration-500 text-lg" 
                      required 
                      disabled={isSubmitting} 
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/30 py-4 text-lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Footer */}
      <footer className="py-10 backdrop-blur-2xl bg-black/30 border-t border-white/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300 font-medium text-lg">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>

      {/* Visitor Greeting */}
      <VisitorGreeting />

      {/* Chatbot Components */}
      <ChatButton 
        onClick={() => setIsChatOpen(true)} 
        isOpen={isChatOpen}
      />
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
      />

      {/* Easter Egg Confetti */}
      <ConfettiEasterEgg 
        isActive={showConfetti} 
        onComplete={handleConfettiComplete} 
      />

      {/* Skill Modal */}
      <SkillModal 
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        skill={selectedSkill}
      />
    </div>
  );
};

export default Index;
