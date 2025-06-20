
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, Code, Database, Globe, User, Briefcase, Contact, ArrowDown } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const skills = [
    { name: 'Python', level: 95 },
    { name: 'Django', level: 90 },
    { name: 'SQL', level: 85 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'JavaScript', level: 75 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'Git', level: 80 },
    { name: 'API Integration', level: 85 }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically handle form submission
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Siddharth Ahir
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-gray-900"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User size={80} className="text-gray-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hello, I'm{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Siddharth Ahir
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
            Python Developer | Django & SQL Specialist
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Dedicated Python developer specializing in Django and SQL, passionate about building efficient, scalable solutions with clean, reliable code.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('portfolio')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
            >
              View My Work
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg"
            >
              Contact Me
            </Button>
          </div>
          <div className="mt-12 animate-bounce">
            <ArrowDown size={24} className="mx-auto text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-300 mb-6">
                  I am a passionate Python developer with a strong foundation in Django and SQL, dedicated to creating efficient and scalable web solutions. My approach to development emphasizes clean code, optimal performance, and user-centered design.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  With experience in full-stack development and database optimization, I enjoy tackling complex problems and transforming ideas into robust applications that make a difference.
                </p>
              </div>
              <div>
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white">Master's in Computer Science</h4>
                      <p className="text-gray-400">International University of Applied Sciences, Berlin</p>
                      <p className="text-sm text-gray-500">Currently Pursuing</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Bachelor in Computer Application</h4>
                      <p className="text-gray-400">Gujarat University</p>
                      <p className="text-sm text-gray-500">2022</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Software Developer Intern</h4>
                      <p className="text-gray-400">Professional Experience</p>
                      <p className="text-sm text-gray-500">2022</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit">
                    <service.icon size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 hover:border-purple-400 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-purple-900 text-purple-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
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
      <section id="contact" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Let's Work Together</h3>
                <p className="text-gray-300 mb-8">
                  I'm always interested in new opportunities and exciting projects. 
                  Feel free to reach out if you'd like to discuss potential collaborations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="text-purple-400 mr-3" size={20} />
                    <span className="text-gray-300">siddharth.ahir@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="text-purple-400 mr-3" size={20} />
                    <span className="text-gray-300">linkedin.com/in/siddharth-ahir</span>
                  </div>
                  <div className="flex items-center">
                    <Github className="text-purple-400 mr-3" size={20} />
                    <span className="text-gray-300">github.com/siddharth-ahir</span>
                  </div>
                </div>
              </div>
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">Send Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                      required
                    />
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-600 border-gray-500 text-white placeholder-gray-400 min-h-[120px]"
                      required
                    />
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Siddharth Ahir. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
