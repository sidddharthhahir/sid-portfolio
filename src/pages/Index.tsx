import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SidAvatar from '@/components/SidAvatar';
import VisitorGreeting from '@/components/VisitorGreeting';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EditableSection from '@/components/EditableSection';
import SkillModal from '@/components/SkillModal';
import ChatWindow from '@/components/ChatWindow';
import ChatButton from '@/components/ChatButton';
import GameSelector from '@/components/GameSelector';
import MemoryGame from '@/components/MemoryGame';
import TicTacToeGame from '@/components/TicTacToeGame';
import HitTheIslandGame from '@/components/HitTheIslandGame';
import TripleClickHint from '@/components/TripleClickHint';
import ConfettiEasterEgg from '@/components/ConfettiEasterEgg';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { resumeData } from '@/config/resume';
import { Mail, Phone, MapPin, Calendar, ExternalLink, Github, Linkedin, Globe, Download } from 'lucide-react';

export default function Index() {
  const { t } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);
  const [isMemoryGameActive, setIsMemoryGameActive] = useState(false);
  const [isTicTacToeActive, setIsTicTacToeActive] = useState(false);
  const [isHitTheIslandActive, setIsHitTheIslandActive] = useState(false);
  const [showTripleClickHint, setShowTripleClickHint] = useState(false);

  // Game progression state
  const [completedGames, setCompletedGames] = useState<string[]>([]);

  // Load completed games from localStorage
  useEffect(() => {
    const savedCompletedGames = localStorage.getItem('completedChallenges');
    if (savedCompletedGames) {
      setCompletedGames(JSON.parse(savedCompletedGames));
    }
  }, []);

  // Save completed games to localStorage
  const saveCompletedGames = (games: string[]) => {
    setCompletedGames(games);
    localStorage.setItem('completedChallenges', JSON.stringify(games));
  };

  // Triple-click hint logic
  useEffect(() => {
    const gamesDiscovered = localStorage.getItem('gamesDiscovered');
    if (!gamesDiscovered) {
      const timer = setTimeout(() => {
        setShowTripleClickHint(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAvatarTripleClick = () => {
    setIsGameSelectorOpen(true);
    localStorage.setItem('gamesDiscovered', 'true');
    setShowTripleClickHint(false);
  };

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill);
  };

  const closeSkillModal = () => {
    setSelectedSkill(null);
  };

  // Game completion handlers
  const handleMemoryGameComplete = () => {
    setIsMemoryGameActive(false);
    if (!completedGames.includes('memory')) {
      const updatedGames = [...completedGames, 'memory'];
      saveCompletedGames(updatedGames);
    }
  };

  const handleTicTacToeComplete = () => {
    setIsTicTacToeActive(false);
    if (!completedGames.includes('ticTacToe')) {
      const updatedGames = [...completedGames, 'ticTacToe'];
      saveCompletedGames(updatedGames);
    }
  };

  const handleHitTheIslandComplete = () => {
    setIsHitTheIslandActive(false);
    if (!completedGames.includes('hitTheIsland')) {
      const updatedGames = [...completedGames, 'hitTheIsland'];
      saveCompletedGames(updatedGames);
    }
  };

  // Game selection handlers
  const handleSelectMemoryGame = () => {
    setIsGameSelectorOpen(false);
    setIsMemoryGameActive(true);
  };

  const handleSelectTicTacToe = () => {
    if (completedGames.includes('memory')) {
      setIsGameSelectorOpen(false);
      setIsTicTacToeActive(true);
    }
  };

  const handleSelectHitTheIsland = () => {
    if (completedGames.includes('memory') && completedGames.includes('ticTacToe')) {
      setIsGameSelectorOpen(false);
      setIsHitTheIslandActive(true);
    }
  };

  const handleHintDismiss = () => {
    setShowTripleClickHint(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation and Language Switcher */}
      <div className="flex justify-between items-center p-4 sm:p-6">
        <Navigation />
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <TripleClickHint 
            isVisible={showTripleClickHint}
            onDismiss={handleHintDismiss}
          />
          
          <SidAvatar 
            onTripleClick={handleAvatarTripleClick}
            className="mx-auto mb-6"
            size="xl"
          />
          
          <VisitorGreeting />
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {resumeData.personalInfo.name}
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            {t(resumeData.personalInfo.title)}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href={`mailto:${resumeData.personalInfo.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={18} />
              {resumeData.personalInfo.email}
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Phone size={18} />
              {resumeData.personalInfo.phone}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={18} />
              {t(resumeData.personalInfo.location)}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {resumeData.personalInfo.links.map((link, index) => {
              const IconComponent = link.icon === 'Github' ? Github : 
                                   link.icon === 'Linkedin' ? Linkedin : 
                                   Globe;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary/30 transition-colors"
                >
                  <IconComponent size={18} />
                  {t(link.label)}
                </a>
              );
            })}
            <a
              href="/siddharth-ahir-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary hover:bg-primary/30 transition-colors"
            >
              <Download size={18} />
              {t('resume.download')}
            </a>
          </div>
        </div>

        {/* About Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('resume.about')}</h2>
            <EditableSection 
              content={resumeData.summary} 
              className="text-lg leading-relaxed text-muted-foreground text-center"
            />
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('resume.experience')}</h2>
            <div className="space-y-8">
              {resumeData.experience.map((job, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-6 relative">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-0"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="text-xl font-semibold text-primary">{t(job.title)}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="text-sm">{job.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <p className="text-lg font-medium">{job.company}</p>
                    <span className="text-sm text-muted-foreground">{job.location}</span>
                  </div>
                  <EditableSection content={job.description} className="text-muted-foreground mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('resume.education')}</h2>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-secondary/30 pl-6 relative">
                  <div className="absolute w-4 h-4 bg-secondary rounded-full -left-2 top-0"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h3 className="text-xl font-semibold text-secondary">{t(edu.degree)}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="text-sm">{edu.year}</span>
                    </div>
                  </div>
                  <p className="text-lg font-medium mb-2">{edu.school}</p>
                  <p className="text-muted-foreground">{edu.location}</p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground mt-2">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('resume.skills')}</h2>
            <div className="space-y-8">
              {resumeData.skills.map((skillCategory, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{t(skillCategory.category)}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <Button
                        key={skillIndex}
                        variant="outline"
                        className="h-auto p-4 text-left justify-start hover:bg-primary/10 transition-colors"
                        onClick={() => handleSkillClick(skill)}
                      >
                        <div>
                          <div className="font-medium">{skill.name}</div>
                          <div className="text-sm text-muted-foreground">{skill.level}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('resume.projects')}</h2>
            <div className="grid gap-8">
              {resumeData.projects.map((project, index) => (
                <Card key={index} className="border-2 border-muted/20 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <h3 className="text-xl font-semibold text-primary mb-2 sm:mb-0">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink size={16} />
                          {t('resume.viewProject')}
                        </a>
                      )}
                    </div>
                    <EditableSection content={project.description} className="text-muted-foreground mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="my-12" />

        {/* Footer */}
        <div className="text-center text-muted-foreground">
          <p>© 2024 {resumeData.personalInfo.name}. {t('resume.footer')}</p>
        </div>
      </div>

      {/* Modals and Games */}
      <SkillModal skill={selectedSkill} onClose={closeSkillModal} />
      
      <GameSelector
        isOpen={isGameSelectorOpen}
        onClose={() => setIsGameSelectorOpen(false)}
        onSelectMemoryGame={handleSelectMemoryGame}
        onSelectTicTacToe={handleSelectTicTacToe}
        onSelectHitTheIsland={handleSelectHitTheIsland}
        completedGames={completedGames}
      />

      <MemoryGame
        isActive={isMemoryGameActive}
        onComplete={handleMemoryGameComplete}
      />

      <TicTacToeGame
        isActive={isTicTacToeActive}
        onComplete={handleTicTacToeComplete}
      />

      <HitTheIslandGame
        isActive={isHitTheIslandActive}
        onComplete={handleHitTheIslandComplete}
      />

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ChatButton onClick={() => setIsChatOpen(true)} />
      <ConfettiEasterEgg />
    </div>
  );
}
