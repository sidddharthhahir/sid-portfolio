import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Linkedin, Github, Code, Database, Globe, User, Briefcase, Contact, ArrowDown, Sparkles, Star } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const skills = [{
    name: 'Python',
    level: 95
  }, {
    name: 'Django',
    level: 90
  }, {
    name: 'SQL',
    level: 85
  }, {
    name: 'PostgreSQL',
    level: 80
  }, {
    name: 'JavaScript',
    level: 75
  }, {
    name: 'HTML/CSS',
    level: 85
  }, {
    name: 'Git',
    level: 80
  }, {
    name: 'API Integration',
    level: 85
  }];
  const services = [{
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive websites using Django and the latest web technologies.'
  }, {
    icon: Database,
    title: 'Database Services',
    description: 'Efficient database design, optimization, and management with PostgreSQL and MySQL.'
  }, {
    icon: Code,
    title: 'Python Applications',
    description: 'Custom web applications using Django framework with clean, scalable code.'
  }];
  const projects = [{
    title: 'Recipe Manager',
    description: 'Django web application for recipe management with user authentication and image uploads.',
    technologies: ['Django', 'PostgreSQL', 'Python', 'Bootstrap'],
    features: ['User Authentication', 'Image Uploads', 'Advanced Filtering', 'Responsive Design']
  }, {
    title: 'Personal Task Manager',
    description: 'Task management application with secure user data and comprehensive tracking features.',
    technologies: ['Django', 'MySQL', 'JavaScript', 'CSS'],
    features: ['Task Tracking', 'Due Dates', 'Completion Status', 'User Security']
  }, {
    title: 'HCI Portfolio Project',
    description: 'Usability testing for weather website with comprehensive UX analysis and recommendations.',
    technologies: ['UX Research', 'Testing', 'Analysis', 'Documentation'],
    features: ['Test Planning', 'Execution', 'UX Recommendations', 'User Research']
  }];
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
      // Initialize EmailJS with your public key
      emailjs.init('1XEPgOlzfPoTgaput');

      // Send email using EmailJS
      const result = await emailjs.send('service_5n5oy19',
      // Your Service ID
      'template_ixyj8he',
      // Your Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Siddharth Ahir' // Your name
      });
      console.log('Email sent successfully:', result);

      // Show success toast
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);

      // Show error toast
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
  return <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Siddharth Ahir
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Services', 'Portfolio', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-purple-400 transition-colors duration-300">
                  {item}
                </button>)}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with proper spacing */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-gray-900"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-32 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl animate-bounce delay-500"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 py-8">
          {/* Profile Section with Enhanced Animations */}
          <div className="mb-8 animate-fade-in">
            <div className="relative w-56 h-56 mx-auto mb-8 group">
              {/* Animated Border Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-spin" style={{
              animationDuration: '3s'
            }}></div>
              <div className="absolute inset-1 rounded-full bg-gray-900"></div>
              
              {/* Profile Picture Container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-2 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src="https://i.postimg.cc/zBffmxgY/IMG-2591.jpg" alt="Siddharth Ahir Profile" className="w-full h-full object-cover rounded-full scale-110 object-center" />
                </div>
              </div>
              
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 bg-purple-500/20 backdrop-blur-sm rounded-full p-3 animate-bounce delay-300">
                <Code size={20} className="text-purple-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500/20 backdrop-blur-sm rounded-full p-3 animate-bounce delay-700">
                <Database size={20} className="text-blue-400" />
              </div>
            </div>
          </div>

          {/* Enhanced Text Content */}
          <div className="space-y-6">
            {/* Greeting with Sparkle Effect */}
            <div className="flex items-center justify-center gap-2 animate-fade-in delay-200">
              <Sparkles size={24} className="text-yellow-400 animate-pulse" />
              <span className="text-xl text-gray-300">Hello, I'm</span>
              <Sparkles size={24} className="text-yellow-400 animate-pulse delay-500" />
            </div>

            {/* Name with Enhanced Typography */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-300">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite]">
                Siddharth Ahir
              </span>
            </h1>

            {/* Professional Title with Typing Effect */}
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-6 animate-fade-in delay-500">
              <span className="inline-block">Python Developer</span>
              <span className="text-purple-400 mx-2">|</span>
              <span className="inline-block">Django & SQL Specialist</span>
            </h2>

            {/* Description with Stagger Animation */}
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-700">
              Dedicated Python developer specializing in Django and SQL, passionate about building 
              <span className="text-purple-400 font-semibold"> efficient</span>, 
              <span className="text-blue-400 font-semibold"> scalable solutions</span> with 
              <span className="text-purple-400 font-semibold"> clean, reliable code</span>.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-900">
              <Button onClick={() => scrollToSection('portfolio')} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group">
                <span className="flex items-center gap-2">
                  View My Work
                  <Star size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/5">
                Contact Me
              </Button>
            </div>

            {/* Stats or Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in delay-1000">
              
              
              
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="mt-12 animate-fade-in delay-1200">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-400 animate-pulse">Scroll to explore</span>
              <div className="animate-bounce">
                <ArrowDown size={24} className="text-purple-400" />
              </div>
            </div>
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
              {skills.map((skill, index) => <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{
                  width: `${skill.level}%`
                }}></div>
                  </div>
                </div>)}
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
            {services.map((service, index) => <Card key={index} className="bg-gray-700 border-gray-600 hover:border-purple-400 transition-all duration-300 hover:scale-105">
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
              </Card>)}
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
            {projects.map((project, index) => <Card key={index} className="bg-gray-700 border-gray-600 hover:border-purple-400 transition-all duration-300 hover:scale-105">
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
                      {project.technologies.map((tech, techIndex) => <Badge key={techIndex} variant="secondary" className="bg-purple-900 text-purple-200">
                          {tech}
                        </Badge>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {project.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                          {feature}
                        </li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>)}
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
                    <a 
                      href="mailto:sidahir25820@gmail.com" 
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      sidahir25820@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="text-purple-400 mr-3" size={20} />
                    <a 
                      href="https://linkedin.com/in/siddharth-ahir-798754262" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      linkedin.com/in/siddharth-ahir-798754262
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Github className="text-purple-400 mr-3" size={20} />
                    <a 
                      href="https://github.com/sidddharthhahir" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      github.com/sidddharthhahir
                    </a>
                  </div>
                </div>
              </div>
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">Send Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} className="bg-gray-600 border-gray-500 text-white placeholder-gray-400" required disabled={isSubmitting} />
                    <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} className="bg-gray-600 border-gray-500 text-white placeholder-gray-400" required disabled={isSubmitting} />
                    <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} className="bg-gray-600 border-gray-500 text-white placeholder-gray-400 min-h-[120px]" required disabled={isSubmitting} />
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" disabled={isSubmitting}>
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
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Siddharth Ahir. All rights reserved.
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;
