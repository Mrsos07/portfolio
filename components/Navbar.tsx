
import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange, language, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks: { name: string; id: ViewState }[] = [
    { name: t.home, id: 'home' },
    { name: t.projects, id: 'projects' },
    { name: t.resume, id: 'resume' },
  ];

  const handleLinkClick = (id: ViewState) => {
    onViewChange(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleLinkClick('home')} className="text-2xl font-bold gradient-text">S.G</button>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleLinkClick(link.id)} className={`text-sm font-medium transition-colors relative group ${activeView === link.id ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 transition-all duration-300 ${activeView === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
              className="px-3 py-1.5 rounded-lg glass text-xs font-bold hover:bg-white/10 transition-all uppercase"
            >
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
            <button onClick={() => handleLinkClick('contact')} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg active:scale-95 ${activeView === 'contact' ? 'bg-white text-slate-900 shadow-white/10' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20'}`}>
              {t.contact}
            </button>
          </div>
        </div>

        <button className="md:hidden text-slate-300 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-xl`}></i>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 border-t border-slate-800 p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => handleLinkClick(link.id)} className={`text-lg font-medium py-2 ${activeView === link.id ? 'text-blue-400' : 'text-slate-300'}`}>
              {link.name}
            </button>
          ))}
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-800">
            <button onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')} className="text-slate-300 text-right py-2">
              {language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            </button>
            <button className={`w-full text-center px-5 py-3 rounded-xl font-semibold ${activeView === 'contact' ? 'bg-white text-slate-900' : 'bg-blue-600 text-white'}`} onClick={() => handleLinkClick('contact')}>
              {t.contact}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
