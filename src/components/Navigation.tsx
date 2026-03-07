
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: t('nav.home'), section: 'home' },
    { label: t('nav.about'), section: 'about' },
    { label: t('nav.skills'), section: 'skills' },
    { label: t('nav.projects'), section: 'portfolio' },
    { label: t('nav.github'), section: 'github' },
    { label: t('nav.contact'), section: 'contact' }
  ];

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full backdrop-blur-2xl bg-black/20 border-b border-white/10 z-50 transition-all duration-500 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Siddharth Ahir
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navigationItems.map(item => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className="text-gray-300 hover:text-emerald-400 transition-all duration-500 hover:scale-110 font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-400 after:to-cyan-400 after:left-0 after:-bottom-1 after:transition-all after:duration-500 hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 p-2"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}>
          <div className="pt-4 pb-2 space-y-2">
            {navigationItems.map(item => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-emerald-400 hover:bg-white/5 transition-all duration-300 rounded-lg font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
