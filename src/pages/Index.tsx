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
        { name: 'Recipe Management System', url: 'https://github.com/sidddharthhahir/recipe-manager' },
        { name: 'Task Management Dashboard', url: 'https://github.com/sidddharthhahir/personal-task-manager' }
      ]
    },
    { 
      name: 'Django', 
      icon: Server, 
      description: 'Full-stack web development and REST APIs',
      detailedDescription: 'I use Django to develop comprehensive web applications with robust backend architecture, user authentication, and RESTful API services, focusing on scalable and maintainable code.',
      keyProjects: [
        { name: 'Recipe Management System', url: 'https://github.com/sidddharthhahir/recipe-manager' },
        { name: 'Task Management Dashboard', url: 'https://github.com/sidddharthhahir/personal-task-manager' }
      ]
    },
    { 
      name: 'SQL', 
      icon: Database, 
      description: 'Database design, optimization, and complex queries',
      detailedDescription: 'Proficient in designing efficient database schemas, writing complex queries, and optimizing database performance for web applications with focus on data integrity and scalability.',
      keyProjects: [
        { name: 'Recipe Management System' },
        { name: 'Task Management Dashboard' }
      ]
    },
    { 
      name: 'PostgreSQL', 
      icon: Database, 
      description: 'Advanced database management and performance tuning',
      detailedDescription: 'I utilize PostgreSQL for robust data storage solutions, implementing advanced features like indexing, stored procedures, and performance optimization for high-traffic applications.',
      keyProjects: [
        { name: 'Recipe Management System', url: 'https://github.com/sidddharthhahir/recipe-manager' }
      ]
    },
    { 
      name: 'JavaScript', 
      icon: Braces, 
      description: 'Modern ES6+, DOM manipulation, and async programming',
      detailedDescription: 'I create dynamic and interactive web experiences using modern JavaScript, focusing on clean code practices, async programming, and seamless user interface interactions.',
      keyProjects: [
        { name: 'Task Management Dashboard', url: 'https://github.com/sidddharthhahir/personal-task-manager' },
        { name: 'Portfolio Website' }
      ]
    },
    { 
      name: 'HTML/CSS', 
      icon: FileCode, 
      description: 'Semantic markup, responsive design, and animations',
      detailedDescription: 'Proficient in crafting well-structured and visually appealing web layouts using semantic HTML and modern CSS techniques for responsive design and engaging user experiences.',
      keyProjects: [
        { name: 'Recipe Management System' },
        { name: 'Task Management Dashboard' },
        { name: 'Portfolio Website' }
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
        { name: 'Recipe Management System' },
        { name: 'Task Management Dashboard' }
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
      title: 'Python Development',
      description: 'Building robust applications, automation scripts, and data processing solutions using Python and its frameworks.'
    }
  ];

  const projects = [
    {
      title: 'Recipe Management System',
      description: 'A comprehensive web application for managing and sharing recipes with advanced search and categorization features.',
      technologies: ['Django', 'PostgreSQL', 'Python', 'Bootstrap'],
      features: ['User authentication and profiles', 'Recipe CRUD operations with image upload', 'Advanced search and filtering system', 'Social features for sharing and rating recipes'],
      githubUrl: 'https://github.com/sidddharthhahir/recipe-manager'
    },
    {
      title: 'Task Management Dashboard',
      description: 'An intuitive task management system with real-time updates and collaborative features for team productivity.',
      technologies: ['Django', 'MySQL', 'JavaScript', 'CSS'],
      features: ['Real-time task updates and notifications', 'Team collaboration and assignment features', 'Progress tracking with visual analytics', 'Responsive design for all devices'],
      githubUrl: 'https://github.com/sidddharthhahir/personal-task-manager'
    },
    {
      title: 'HCI Research Project',
      description: 'Comprehensive user experience research and analysis project focusing on improving digital interface usability.',
      technologies: ['UX Research', 'Testing', 'Analysis', 'Documentation'],
      features: ['User behavior analysis and insights', 'Usability testing and evaluation', 'Interface design recommendations', 'Comprehensive research documentation']
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
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = '/siddharth-ahir-resume.pdf';
      link.download = 'siddharth-ahir-resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been downloaded successfully!"
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Error",
        description: "Failed to download resume. Please try again.",
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
              Python Developer & Database Expert
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating efficient web applications and robust database solutions. 
              Currently pursuing Master's in Computer Science with expertise in Python, Django, and modern web technologies.
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

      {/* Dark About Section */}
      <section id="about" className="py-24" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1500 delay-300 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('about.description1')}
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('about.description2')}
                </p>
              </div>
              <div>
                <Card className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-105 hover:bg-black/40">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 text-2xl">{t('about.education')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <h4 className="font-semibold text-gray-200 text-lg">{t('about.masters')}</h4>
                      <p className="text-gray-300">{t('about.mastersSchool')}</p>
                      <p className="text-sm text-cyan-400 font-medium">{t('about.mastersStatus')}</p>
                    </div>
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <h4 className="font-semibold text-gray-200 text-lg">{t('about.bachelors')}</h4>
                      <p className="text-gray-300">{t('about.bachelorsSchool')}</p>
                      <p className="text-sm text-cyan-400 font-medium">{t('about.bachelorsYear')}</p>
                    </div>
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <h4 className="font-semibold text-gray-200 text-lg">{t('about.internship')}</h4>
                      <p className="text-gray-300">{t('about.internshipType')}</p>
                      <p className="text-sm text-cyan-400 font-medium">{t('about.internshipYear')}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Dark Skills Section */}
      <section id="skills" className="py-24" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1500 delay-500 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <Card 
                    className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-125 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 cursor-pointer hover:border-cyan-400/50"
                    onClick={() => handleSkillClick(skill)}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mb-6 flex justify-center">
                        <div className="p-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all duration-500 backdrop-blur-xl border border-white/20 group-hover:scale-110">
                          <skill.icon size={40} className="text-cyan-400 group-hover:text-purple-400 transition-all duration-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-200 mb-3 group-hover:text-cyan-400 transition-all duration-500">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-500">
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
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/20 group transform hover:-translate-y-3 ${project.githubUrl ? 'cursor-pointer hover:border-purple-400/50' : ''}`}
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
                        <li key={featureIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3"></span>
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

      {/* Dark Contact Section */}
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
                      sidahir25820@gmail.com
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
                      linkedin.com/in/siddharth-ahir-798754262
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
                      github.com/sidddharthhahir
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
