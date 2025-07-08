import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Download, MapPin, Calendar, Award, Code, GraduationCap, Briefcase } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

const InteractiveResume = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleResumeDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/siddharth-ahir-resume.pdf';
      link.download = 'siddharth-ahir-resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
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

  const education = [
    {
      id: 'masters',
      degree: 'Master of Science in Computer Science',
      school: 'Indiana State University, Terre Haute, IN',
      period: '2024 - Present',
      status: 'Currently Pursuing',
      details: [
        'Advanced coursework in software engineering and data structures',
        'Research focus on web development and database optimization',
        'Maintaining high academic performance',
        'Active participation in computer science seminars'
      ],
      gpa: '3.8/4.0'
    },
    {
      id: 'bachelors',
      degree: 'Bachelor of Engineering in Information Technology',
      school: 'Government Engineering College, Gandhinagar',
      period: '2020 - 2024',
      status: 'Completed',
      details: [
        'Comprehensive study of computer systems and programming',
        'Strong foundation in algorithms and data structures',
        'Practical experience with multiple programming languages',
        'Final year project on web application development'
      ],
      gpa: '3.7/4.0'
    }
  ];

  const experience = [
    {
      id: 'internship',
      title: 'Python Development Intern',
      company: 'Tech Solutions Inc.',
      period: 'Summer 2023',
      location: 'Remote',
      type: 'Internship',
      details: [
        'Developed web applications using Django framework',
        'Implemented RESTful APIs for data management',
        'Collaborated with senior developers on code reviews',
        'Optimized database queries improving performance by 30%',
        'Wrote comprehensive unit tests for new features'
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'Git']
    }
  ];

  const skills = [
    {
      id: 'programming',
      category: 'Programming Languages',
      items: [
        { name: 'Python', level: 'Advanced', experience: '3+ years' },
        { name: 'JavaScript', level: 'Intermediate', experience: '2+ years' },
        { name: 'SQL', level: 'Advanced', experience: '3+ years' },
        { name: 'HTML/CSS', level: 'Advanced', experience: '3+ years' }
      ]
    },
    {
      id: 'frameworks',
      category: 'Frameworks & Technologies',
      items: [
        { name: 'Django', level: 'Advanced', experience: '2+ years' },
        { name: 'Flask', level: 'Intermediate', experience: '1+ year' },
        { name: 'React', level: 'Intermediate', experience: '1+ year' },
        { name: 'Bootstrap', level: 'Advanced', experience: '2+ years' }
      ]
    },
    {
      id: 'databases',
      category: 'Databases & Tools',
      items: [
        { name: 'PostgreSQL', level: 'Advanced', experience: '2+ years' },
        { name: 'MySQL', level: 'Advanced', experience: '2+ years' },
        { name: 'Git', level: 'Advanced', experience: '3+ years' },
        { name: 'REST APIs', level: 'Advanced', experience: '2+ years' }
      ]
    }
  ];

  return (
    <section id="resume" className="py-24" data-animate>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Interactive Resume
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Click on any section below to explore my background in detail
          </p>
          <Button 
            onClick={handleResumeDownload}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-500 shadow-xl"
          >
            <Download size={20} className="mr-2" />
            Download PDF Resume
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Education Section */}
          <Card className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-200">Education</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map((edu) => (
                <Collapsible key={edu.id}>
                  <CollapsibleTrigger 
                    className="w-full text-left"
                    onClick={() => toggleSection(edu.id)}
                  >
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-300">{edu.school}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-cyan-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={16} />
                              {edu.period}
                            </span>
                            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                              {edu.status}
                            </Badge>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 transition-transform duration-300 ${
                            openSections.has(edu.id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-6 pb-4 mt-4">
                      <div className="p-4 rounded-lg bg-black/20 border border-white/10">
                        <p className="text-sm font-medium text-cyan-400 mb-2">GPA: {edu.gpa}</p>
                        <ul className="space-y-2">
                          {edu.details.map((detail, index) => (
                            <li key={index} className="text-gray-300 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Briefcase size={24} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-200">Experience</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {experience.map((exp) => (
                <Collapsible key={exp.id}>
                  <CollapsibleTrigger 
                    className="w-full text-left"
                    onClick={() => toggleSection(exp.id)}
                  >
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-gray-300">{exp.company}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-purple-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={16} />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={16} />
                              {exp.location}
                            </span>
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                              {exp.type}
                            </Badge>
                          </div>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 transition-transform duration-300 ${
                            openSections.has(exp.id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-6 pb-4 mt-4">
                      <div className="p-4 rounded-lg bg-black/20 border border-white/10 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-purple-400 mb-2">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {exp.details.map((detail, index) => (
                              <li key={index} className="text-gray-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-purple-400 mb-2">Technologies Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, index) => (
                              <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="backdrop-blur-2xl bg-black/30 border border-white/20 hover:bg-black/40 transition-all duration-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl">
                  <Code size={24} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-200">Technical Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skillGroup) => (
                <Collapsible key={skillGroup.id}>
                  <CollapsibleTrigger 
                    className="w-full text-left"
                    onClick={() => toggleSection(skillGroup.id)}
                  >
                    <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-200 group-hover:text-pink-400 transition-colors">
                            {skillGroup.category}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {skillGroup.items.length} skills
                          </p>
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`text-gray-400 transition-transform duration-300 ${
                            openSections.has(skillGroup.id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-6 pb-4 mt-4">
                      <div className="grid gap-3">
                        {skillGroup.items.map((skill, index) => (
                          <div key={index} className="p-3 rounded-lg bg-black/20 border border-white/10 flex items-center justify-between">
                            <div>
                              <span className="text-gray-200 font-medium">{skill.name}</span>
                              <span className="text-gray-400 text-sm ml-2">({skill.experience})</span>
                            </div>
                            <Badge 
                              className={`${
                                skill.level === 'Advanced' 
                                  ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                  : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                              }`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveResume;