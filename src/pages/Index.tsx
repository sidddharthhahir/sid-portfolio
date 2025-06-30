
import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Smartphone, Globe, Database, Cloud, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import ChatButton from '@/components/ChatButton';
import ChatWindow from '@/components/ChatWindow';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';

const Index = () => {
  const { t } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionId: string) => {
    const refs = {
      hero: heroRef,
      about: aboutRef,
      skills: skillsRef,
      services: servicesRef,
      portfolio: portfolioRef,
      contact: contactRef,
    };
    
    const targetRef = refs[sectionId as keyof typeof refs];
    if (targetRef?.current) {
      const offsetTop = targetRef.current.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <DesktopNav scrollToSection={scrollToSection} />
      <MobileNav scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0">
        <div className="container mx-auto text-center z-10 relative">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Siddharth Dubey
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Python Developer | Django & SQL Specialist | Full-stack developer passionate about creating innovative web solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold text-lg hover:bg-cyan-400 hover:text-black transition-all duration-500 hover:scale-110"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm Siddharth Dubey, a passionate Python developer with expertise in Django, SQL, and modern web technologies. I love creating efficient, scalable solutions that make a real impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                As a dedicated Python developer, I specialize in building robust web applications using Django framework. My expertise extends to database management with SQL, creating RESTful APIs, and developing scalable backend solutions. I'm passionate about clean code, efficient algorithms, and solving complex problems through technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full text-cyan-400 border border-cyan-400/30">
                  Problem Solver
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full text-purple-400 border border-purple-400/30">
                  Backend Expert
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-cyan-600/20 rounded-full text-pink-400 border border-pink-400/30">
                  Full-Stack Developer
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-purple-400 mb-6">Experience</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Code size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">3+ Years</h4>
                      <p className="text-gray-400">Python Development</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <Database size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">50+ Projects</h4>
                      <p className="text-gray-400">Successfully Completed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My technical skills and areas of expertise in modern development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code size={32} />,
                title: 'Python Development',
                skills: ['Python', 'Django', 'Flask', 'FastAPI', 'REST APIs'],
                gradient: 'from-blue-500 to-cyan-600'
              },
              {
                icon: <Database size={32} />,
                title: 'Database & SQL',
                skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Database Design', 'Query Optimization'],
                gradient: 'from-green-500 to-emerald-600'
              },
              {
                icon: <Globe size={32} />,
                title: 'Frontend Technologies',
                skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
                gradient: 'from-purple-500 to-indigo-600'
              },
              {
                icon: <Cloud size={32} />,
                title: 'DevOps & Deployment',
                skills: ['Docker', 'AWS', 'Linux', 'Git', 'CI/CD'],
                gradient: 'from-orange-500 to-red-600'
              },
              {
                icon: <Smartphone size={32} />,
                title: 'Web Development',
                skills: ['Responsive Design', 'Web APIs', 'Authentication', 'Security', 'Performance'],
                gradient: 'from-pink-500 to-rose-600'
              },
              {
                icon: <Palette size={32} />,
                title: 'Tools & Frameworks',
                skills: ['VS Code', 'PyCharm', 'Postman', 'Jupyter', 'Testing'],
                gradient: 'from-teal-500 to-cyan-600'
              }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${skill.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((item, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent Python and web development projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Backend API',
                description: 'Complete Django REST API for e-commerce platform with user authentication, product management, and order processing',
                tech: ['Django', 'PostgreSQL', 'REST API'],
                gradient: 'from-blue-500 to-purple-600'
              },
              {
                title: 'Data Analytics Dashboard',
                description: 'Python-based data visualization dashboard using Django and Chart.js for business intelligence',
                tech: ['Python', 'Django', 'Chart.js'],
                gradient: 'from-green-500 to-teal-600'
              },
              {
                title: 'Task Management System',
                description: 'Full-stack web application for project and task management with real-time updates',
                tech: ['Django', 'JavaScript', 'WebSocket'],
                gradient: 'from-pink-500 to-rose-600'
              },
              {
                title: 'Inventory Management',
                description: 'Comprehensive inventory tracking system with barcode scanning and automated reporting',
                tech: ['Python', 'SQLite', 'Django'],
                gradient: 'from-purple-500 to-indigo-600'
              },
              {
                title: 'Blog Platform',
                description: 'Content management system with user authentication, rich text editor, and comment system',
                tech: ['Django', 'PostgreSQL', 'Bootstrap'],
                gradient: 'from-orange-500 to-red-600'
              },
              {
                title: 'Weather API Service',
                description: 'RESTful API service that aggregates weather data from multiple sources with caching',
                tech: ['FastAPI', 'Redis', 'Docker'],
                gradient: 'from-cyan-500 to-blue-600'
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 h-full">
                  <div className={`h-48 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group">
                      View Project
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional development services tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code size={40} />,
                title: 'Python Development',
                description: 'Custom Python applications, automation scripts, and backend development using modern frameworks',
                features: ['Django Applications', 'API Development', 'Database Integration'],
                gradient: 'from-blue-500 to-cyan-600'
              },
              {
                icon: <Database size={40} />,
                title: 'Database Solutions',
                description: 'Database design, optimization, and management for scalable applications',
                features: ['Database Design', 'Performance Optimization', 'Data Migration'],
                gradient: 'from-green-500 to-emerald-600'
              },
              {
                icon: <Globe size={40} />,
                title: 'Web Development',
                description: 'Full-stack web applications with modern technologies and responsive design',
                features: ['Responsive Design', 'User Experience', 'Modern Frameworks'],
                gradient: 'from-purple-500 to-pink-600'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 h-full">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how we can work together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-400">siddharth.dubey@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-400">+91 9876543210</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-400">New Delhi, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Github size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chat Button - positioned to avoid conflicts with mobile nav */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatButton onClick={() => setIsChatOpen(true)} isOpen={isChatOpen} />
      </div>

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
