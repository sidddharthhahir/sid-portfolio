import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Github, 
  Linkedin, 
  ExternalLink,
  Calendar,
  Award,
  Users,
  Code,
  Database,
  Server,
  Smartphone,
  Globe,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GameSelector from '@/components/GameSelector';
import TripleClickHint from '@/components/TripleClickHint';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import EndlessRunnerGame from '@/components/EndlessRunnerGame';
import SkillModal from '@/components/SkillModal';
import ConfettiCelebration from '@/components/ConfettiCelebration';
import { VibrationManager } from '@/utils/vibrationUtils';

const Index = () => {
  const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isHintDismissed, setIsHintDismissed] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Check if user has discovered the triple-click feature
  useEffect(() => {
    const hasDiscovered = localStorage.getItem('triple-click-discovered');
    if (!hasDiscovered) {
      setShowHint(true);
    }
  }, []);

  const handleAvatarClick = useCallback(() => {
    setClickCount(prev => prev + 1);
    
    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    // Set new timeout to reset count
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 800);
    
    if (clickCount === 2) { // This will be the third click
      // Mark as discovered
      localStorage.setItem('triple-click-discovered', 'true');
      setShowHint(false);
      setIsHintDismissed(true);
      
      // Vibration feedback for game reveal
      const avatarElement = document.querySelector('[data-avatar-wrapper]') as HTMLElement;
      VibrationManager.gameReveal(avatarElement);
      
      // Show confetti and open game selector
      setShowConfetti(true);
      setTimeout(() => {
        setIsGameSelectorOpen(true);
        setShowConfetti(false);
      }, 1000);
      
      toast({
        title: "🎮 Games Unlocked!",
        description: "Welcome to the secret gaming area!",
      });
    }
  }, [clickCount, toast]);

  const handleDismissHint = () => {
    setShowHint(false);
    setIsHintDismissed(true);
  };

  const handleCloseGameSelector = () => {
    setIsGameSelectorOpen(false);
  };

  const handleSelectMemoryGame = () => {
    setActiveGame('memory');
    setIsGameSelectorOpen(false);
  };

  const handleSelectTicTacToe = () => {
    setActiveGame('tictactoe');
    setIsGameSelectorOpen(false);
  };

  const handleSelectEndlessRunner = () => {
    setActiveGame('runner');
    setIsGameSelectorOpen(false);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
  };

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill);
  };

  const handleCloseSkillModal = () => {
    setSelectedSkill(null);
  };

  const skills = [
    {
      name: "React",
      level: 90,
      category: "Frontend",
      icon: <Code className="w-5 h-5" />,
      description: "Expert in React hooks, context, and modern patterns",
      projects: ["E-commerce Platform", "Dashboard UI", "Real-time Chat"],
      yearsOfExperience: 4
    },
    {
      name: "Node.js",
      level: 85,
      category: "Backend",
      icon: <Server className="w-5 h-5" />,
      description: "Proficient in building scalable server-side applications",
      projects: ["RESTful API", "Microservices", "Real-time Server"],
      yearsOfExperience: 3
    },
    {
      name: "Databases",
      level: 95,
      category: "Backend",
      icon: <Database className="w-5 h-5" />,
      description: "Deep understanding of SQL and NoSQL database systems",
      projects: ["Data Migration", "Database Optimization", "Schema Design"],
      yearsOfExperience: 5
    },
    {
      name: "Mobile Development",
      level: 75,
      category: "Mobile",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Experience in React Native and cross-platform mobile apps",
      projects: ["Mobile E-commerce App", "Social Media App", "Task Manager"],
      yearsOfExperience: 2
    },
    {
      name: "Cloud Services",
      level: 80,
      category: "DevOps",
      icon: <Globe className="w-5 h-5" />,
      description: "Skilled in AWS and Google Cloud for deployment and scaling",
      projects: ["Cloud Migration", "Serverless Architecture", "CI/CD Pipeline"],
      yearsOfExperience: 3
    },
    {
      name: "UI/UX Design",
      level: 70,
      category: "Design",
      icon: <Settings className="w-5 h-5" />,
      description: "Knowledgeable in creating intuitive and visually appealing interfaces",
      projects: ["Dashboard Redesign", "Mobile App UI", "Website Mockups"],
      yearsOfExperience: 2
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Triple-click hint */}
      <TripleClickHint 
        isVisible={showHint && !isHintDismissed} 
        onDismiss={handleDismissHint}
      />

      {/* Confetti celebration */}
      {showConfetti && <ConfettiCelebration />}

      {/* Header */}
      <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <span className="text-white font-semibold text-lg">Siddharth Ahir</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                English
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          {/* Avatar with triple-click functionality */}
          <div 
            className="relative mb-8 cursor-pointer select-none"
            onClick={handleAvatarClick}
            data-avatar-wrapper
          >
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                <div className="w-44 h-44 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-6xl font-bold">
                  SA
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <span className="text-2xl">✨</span>
            <h1 className="text-4xl md:text-6xl font-bold mx-4">Hello, I'm</h1>
            <span className="text-2xl">✨</span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            Siddharth Ahir
          </h2>
          
          <h3 className="text-2xl md:text-4xl text-gray-300 mb-8 font-light">
            Full-Stack Developer & Database Expert
          </h3>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about creating efficient web applications and robust database solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3">
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate full-stack developer with expertise in modern web technologies and database management. 
                With years of experience in building scalable applications, I love turning complex problems into simple, 
                beautiful, and intuitive solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-bold text-purple-400 mb-2">4+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
                <Calendar className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-white font-semibold">Experience</h3>
                  <p className="text-gray-400">4+ Years in Web Development</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
                <Award className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="text-white font-semibold">Certifications</h3>
                  <p className="text-gray-400">AWS, Google Cloud, MongoDB</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
                <Users className="w-6 h-6 text-pink-400" />
                <div>
                  <h3 className="text-white font-semibold">Clients</h3>
                  <p className="text-gray-400">30+ Satisfied Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card 
                key={index} 
                className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                onClick={() => handleSkillClick(skill)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                        {skill.icon}
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {skill.name}
                      </CardTitle>
                    </div>
                    <Badge variant="outline" className="border-purple-400 text-purple-400">
                      {skill.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Proficiency</span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-gray-400 text-sm">{skill.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                  Web Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Full-stack web applications using modern technologies like React, Node.js, and cloud services.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">React</Badge>
                  <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">Node.js</Badge>
                  <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white group-hover:text-purple-400 transition-colors duration-300">
                  Database Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Expert database architecture and optimization for SQL and NoSQL databases.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-400/50 text-purple-400">PostgreSQL</Badge>
                  <Badge variant="outline" className="border-purple-400/50 text-purple-400">MongoDB</Badge>
                  <Badge variant="outline" className="border-purple-400/50 text-purple-400">Redis</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-pink-500/30 group-hover:to-yellow-500/30 transition-all duration-300">
                  <Server className="w-6 h-6 text-pink-400" />
                </div>
                <CardTitle className="text-white group-hover:text-pink-400 transition-colors duration-300">
                  Cloud Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Scalable cloud infrastructure and deployment solutions on AWS and Google Cloud.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-pink-400/50 text-pink-400">AWS</Badge>
                  <Badge variant="outline" className="border-pink-400/50 text-pink-400">Docker</Badge>
                  <Badge variant="outline" className="border-pink-400/50 text-pink-400">Kubernetes</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Let's Work Together</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    I'm always interested in new opportunities and exciting projects. 
                    Whether you need a full-stack developer or database expert, let's discuss how we can work together.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
                    <Mail className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-gray-400">siddharth@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
                    <Phone className="w-6 h-6 text-purple-400" />
                    <div>
                      <h4 className="text-white font-semibold">Phone</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
                    <MapPin className="w-6 h-6 text-pink-400" />
                    <div>
                      <h4 className="text-white font-semibold">Location</h4>
                      <p className="text-gray-400">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Send Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-medium block mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm font-medium block mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Game Components */}
      <GameSelector
        isOpen={isGameSelectorOpen}
        onClose={handleCloseGameSelector}
        onSelectMemoryGame={handleSelectMemoryGame}
        onSelectTicTacToe={handleSelectTicTacToe}
        onSelectEndlessRunner={handleSelectEndlessRunner}
      />

      {activeGame === 'memory' && (
        <MemoryGame isOpen={true} onClose={handleCloseGame} />
      )}

      {activeGame === 'tictactoe' && (
        <TicTacToeGame isOpen={true} onClose={handleCloseGame} />
      )}

      {activeGame === 'runner' && (
        <EndlessRunnerGame isOpen={true} onClose={handleCloseGame} />
      )}

      {/* Skill Modal */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={handleCloseSkillModal}
        />
      )}
    </div>
  );
};

export default Index;
