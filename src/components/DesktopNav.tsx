
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface DesktopNavProps {
  scrollToSection: (sectionId: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ scrollToSection }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'services', label: t('nav.services') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Siddharth Ahir
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-500 hover:scale-110 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DesktopNav;
