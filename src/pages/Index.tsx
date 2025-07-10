import React, { useState } from 'react';
import { Code, Code2, Database, Globe, Server, Braces } from 'lucide-react';
import SkillModal from '@/components/SkillModal';
import { Badge } from "@/components/ui/badge"

interface Skill {
  name: string;
  icon: any;
  description: string;
  detailedDescription: string;
  keyProjects: Array<{
    name: string;
    url?: string;
  }>;
}

const skills = [
  {
    name: "React",
    icon: Code,
    description: "Building dynamic user interfaces",
    detailedDescription: "I leverage React to build dynamic, responsive, and component-based user interfaces, focusing on creating intuitive and engaging web experiences with modern hooks and state management.",
    keyProjects: [
      {
        name: "Recipe Management System",
        url: "https://github.com/sidddharthhahir/recipe-manager"
      },
      {
        name: "Personal Task Manager",
        url: "https://github.com/sidddharthhahir/personal-task-manager"
      },
      {
        name: "Portfolio Website",
        url: "https://github.com/sidddharthhahir/portfolio"
      }
    ]
  },
  {
    name: "Node.js",
    icon: Server,
    description: "Server-side JavaScript development",
    detailedDescription: "I use Node.js to develop robust backend services and RESTful APIs, enabling efficient data handling and server-side logic for web applications with focus on scalability and performance.",
    keyProjects: [
      {
        name: "Task Management Dashboard",
        url: "https://github.com/sidddharthhahir/personal-task-manager"
      },
      {
        name: "Recipe API Backend",
        url: "https://github.com/sidddharthhahir/recipe-manager"
      }
    ]
  },
  {
    name: "Python",
    icon: Code2,
    description: "Advanced programming with Django, Flask",
    detailedDescription: "I use Python for web development with Django and Flask frameworks, data analysis, automation scripts, and building scalable backend solutions with clean, maintainable code.",
    keyProjects: [
      {
        name: "Django Web Application",
        url: "https://github.com/sidddharthhahir/django-project"
      },
      {
        name: "Flask API Service",
        url: "https://github.com/sidddharthhahir/flask-api"
      }
    ]
  },
  {
    name: "JavaScript",
    icon: Braces,
    description: "Modern ES6+, DOM manipulation, and async programming",
    detailedDescription: "I create dynamic and interactive web experiences using modern JavaScript, focusing on clean code practices, async programming, and seamless user interface interactions.",
    keyProjects: [
      {
        name: "Task Management Dashboard",
        url: "https://github.com/sidddharthhahir/personal-task-manager"
      },
      {
        name: "Portfolio Website",
        url: "https://github.com/sidddharthhahir/portfolio"
      }
    ]
  },
  {
    name: "Django",
    icon: Database,
    description: "Full-stack web development",
    detailedDescription: "I use Django to develop comprehensive web applications with robust backend architecture, user authentication, and RESTful API services, focusing on scalable and maintainable code.",
    keyProjects: [
      {
        name: "Recipe Management System",
        url: "https://github.com/sidddharthhahir/recipe-manager"
      },
      {
        name: "Task Management Dashboard",
        url: "https://github.com/sidddharthhahir/personal-task-manager"
      }
    ]
  },
  {
    name: "SQL",
    icon: Database,
    description: "Advanced database management and performance tuning",
    detailedDescription: "Proficient in designing efficient database schemas, writing complex queries, and optimizing database performance for web applications with focus on data integrity and scalability.",
    keyProjects: [
      {
        name: "Recipe Management System",
        url: "https://github.com/sidddharthhahir/recipe-manager"
      },
      {
        name: "Task Management Dashboard", 
        url: "https://github.com/sidddharthhahir/personal-task-manager"
      }
    ]
  },
  {
    name: "PostgreSQL",
    icon: Database,
    description: "Advanced database management and performance tuning",
    detailedDescription: "Expert in PostgreSQL for complex database operations, advanced queries, indexing strategies, and performance optimization for high-traffic web applications.",
    keyProjects: [
      {
        name: "Recipe Management System",
        url: "https://github.com/sidddharthhahir/recipe-manager"
      },
      {
        name: "Task Management Dashboard",
        url: "https://github.com/sidddharthhahir/personal-task-manager"
      }
    ]
  },
  {
    name: "REST APIs",
    icon: Globe,
    description: "API design, integration, and testing",
    detailedDescription: "I design and implement robust RESTful APIs with proper authentication, error handling, and documentation, ensuring seamless integration between frontend and backend systems.",
    keyProjects: [
      {
        name: "Recipe API Backend",
        url: "https://github.com/sidddharthhahir/recipe-manager"
      },
      {
        name: "Task Management API",
        url: "https://github.com/sidddharthhahir/personal-task-manager"
      }
    ]
  }
];

const IndexPage: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">My Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-white/10"
            onClick={() => openModal(skill)}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl">
                {React.createElement(skill.icon, { size: 24, className: "text-cyan-400" })}
              </div>
              <h2 className="text-xl font-semibold text-gray-200">{skill.name}</h2>
            </div>
            <p className="text-gray-300 mt-2">{skill.description}</p>
          </div>
        ))}
      </div>

      <SkillModal isOpen={isModalOpen} onClose={closeModal} skill={selectedSkill} />
    </div>
  );
};

export default IndexPage;
