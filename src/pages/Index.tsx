import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Linkedin, Github, Code, Database, Globe, User, Briefcase, Contact, ArrowDown, Sparkles, Star, Server, Braces, FileCode, GitBranch, Layers } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
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
    { name: 'Python', icon: Code, description: 'Backend Development' },
    { name: 'Django', icon: Server, description: 'Web Framework' },
    { name: 'SQL', icon: Database, description: 'Database Queries' },
    { name: 'PostgreSQL', icon: Database, description: 'Database System' },
    { name: 'JavaScript', icon: Braces, description: 'Frontend Development' },
    { name: 'HTML/CSS', icon: FileCode, description: 'Web Markup & Styling' },
    { name: 'Git', icon: GitBranch, description: 'Version Control' },
    { name: 'API Integration', icon: Layers, description: 'System Integration' }
  ];

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive websites using Django and the latest web technologies.'
    },
    {
      icon: Database,
      title: 'Database Services',
      description: 'Efficient database design, optimization, and management with PostgreSQL and MySQL.'
    },
    {
      icon: Code,
      title: 'Python Applications',
      description: 'Custom web applications using Django framework with clean, scalable code.'
    }
  ];

  const projects = [
    {
      title: 'Recipe Manager',
      description: 'Django web application for recipe management with user authentication and image uploads.',
      technologies: ['Django', 'PostgreSQL', 'Python', 'Bootstrap'],
      features: ['User Authentication', 'Image Uploads', 'Advanced Filtering', 'Responsive Design']
    },
    {
      title: 'Personal Task Manager',
      description: 'Task management application with secure user data and comprehensive tracking features.',
      technologies: ['Django', 'MySQL', 'JavaScript', 'CSS'],
      features: ['Task Tracking', 'Due Dates', 'Completion Status', 'User Security']
    },
    {
      title: 'HCI Portfolio Project',
      description: 'Usability testing for weather website with comprehensive UX analysis and recommendations.',
      technologies: ['UX Research', 'Testing', 'Analysis', 'Documentation'],
      features: ['Test Planning', 'Execution', 'UX Recommendations', 'User Research']
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
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!"
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glassmorphism Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/10 border-b border-white/20 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Siddharth Ahir
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Services', 'Portfolio', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-24" data-animate>
        <div className={`container mx-auto px-6 text-center transition-all duration-1000 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Section with Glassmorphism */}
          <div className="mb-8">
            <div className="relative w-56 h-56 mx-auto mb-8 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-1 rounded-full backdrop-blur-lg bg-white/20 border border-white/30"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-2 group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/zBffmxgY/IMG-2591.jpg" 
                    alt="Siddharth Ahir Profile" 
                    className="w-full h-full object-cover rounded-full scale-110 object-center transition-transform duration-500 group-hover:scale-125" 
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-3 animate-bounce delay-300">
                <Code size={20} className="text-indigo-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-3 animate-bounce delay-700">
                <Database size={20} className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* Enhanced Text Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={24} className="text-yellow-500 animate-pulse" />
              <span className="text-xl text-gray-600 font-medium">Hello, I'm</span>
              <Sparkles size={24} className="text-yellow-500 animate-pulse delay-500" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Siddharth Ahir
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium">
              <span className="inline-block">Python Developer</span>
              <span className="text-indigo-500 mx-2">|</span>
              <span className="inline-block">Django & SQL Specialist</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Dedicated Python developer specializing in Django and SQL, passionate about building 
              <span className="text-indigo-600 font-semibold"> efficient</span>, 
              <span className="text-purple-600 font-semibold"> scalable solutions</span> with 
              <span className="text-indigo-600 font-semibold"> clean, reliable code</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('portfolio')} 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-lg border border-white/20 group"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <Star size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="backdrop-blur-lg bg-white/20 border border-white/30 text-indigo-600 hover:bg-white/30 px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 font-medium"
              >
                Contact Me
              </Button>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500 animate-pulse">Scroll to explore</span>
              <div className="animate-bounce">
                <ArrowDown size={24} className="text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Glassmorphism */}
      <section id="about" className="py-20" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1000 delay-300 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  I am a passionate Python developer with a strong foundation in Django and SQL, dedicated to creating efficient and scalable web solutions. My approach to development emphasizes clean code, optimal performance, and user-centered design.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With experience in full-stack development and database optimization, I enjoy tackling complex problems and transforming ideas into robust applications that make a difference.
                </p>
              </div>
              <div>
                <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-indigo-600 text-xl">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20">
                      <h4 className="font-semibold text-gray-800">Master's in Computer Science</h4>
                      <p className="text-gray-600">International University of Applied Sciences, Berlin</p>
                      <p className="text-sm text-indigo-600 font-medium">Currently Pursuing</p>
                    </div>
                    <div className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20">
                      <h4 className="font-semibold text-gray-800">Bachelor in Computer Application</h4>
                      <p className="text-gray-600">Gujarat University</p>
                      <p className="text-sm text-indigo-600 font-medium">2022</p>
                    </div>
                    <div className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20">
                      <h4 className="font-semibold text-gray-800">Software Developer Intern</h4>
                      <p className="text-gray-600">Professional Experience</p>
                      <p className="text-sm text-indigo-600 font-medium">2022</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Modern Glassmorphism */}
      <section id="skills" className="py-20" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1000 delay-500 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <Card className="backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500 hover:scale-110 hover:shadow-2xl">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 backdrop-blur-sm border border-white/20">
                          <skill.icon size={32} className="text-indigo-600 group-hover:text-purple-600 transition-colors duration-300" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {skill.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1000 delay-700 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl w-fit shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <service.icon size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1000 delay-900 ${visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                <CardHeader>
                  <CardTitle className="text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-indigo-600 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} className="backdrop-blur-sm bg-indigo-100/50 text-indigo-700 border border-indigo-200/50 hover:bg-indigo-200/50 transition-colors duration-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-600 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mr-2"></span>
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

      {/* Contact Section */}
      <section id="contact" className="py-20" data-animate>
        <div className={`container mx-auto px-6 transition-all duration-1000 delay-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Let's Work Together</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Feel free to reach out if you'd like to discuss potential collaborations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center p-4 rounded-lg backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                    <Mail className="text-indigo-600 mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                    <a 
                      href="mailto:sidahir25820@gmail.com" 
                      className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
                    >
                      sidahir25820@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center p-4 rounded-lg backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                    <Linkedin className="text-indigo-600 mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                    <a 
                      href="https://linkedin.com/in/siddharth-ahir-798754262" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
                    >
                      linkedin.com/in/siddharth-ahir-798754262
                    </a>
                  </div>
                  <div className="flex items-center p-4 rounded-lg backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                    <Github className="text-indigo-600 mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                    <a 
                      href="https://github.com/sidddharthhahir" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
                    >
                      github.com/sidddharthhahir
                    </a>
                  </div>
                </div>
              </div>
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-gray-800">Send Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="backdrop-blur-sm bg-white/50 border border-white/50 text-gray-800 placeholder-gray-500 focus:bg-white/70 transition-all duration-300" 
                      required 
                      disabled={isSubmitting} 
                    />
                    <Input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="backdrop-blur-sm bg-white/50 border border-white/50 text-gray-800 placeholder-gray-500 focus:bg-white/70 transition-all duration-300" 
                      required 
                      disabled={isSubmitting} 
                    />
                    <Textarea 
                      name="message" 
                      placeholder="Your Message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      className="backdrop-blur-sm bg-white/50 border border-white/50 text-gray-800 placeholder-gray-500 min-h-[120px] focus:bg-white/70 transition-all duration-300" 
                      required 
                      disabled={isSubmitting} 
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" 
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

      {/* Footer */}
      <footer className="py-8 backdrop-blur-lg bg-white/10 border-t border-white/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 font-medium">
            © 2024 Siddharth Ahir. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
