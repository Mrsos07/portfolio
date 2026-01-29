
import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { ViewState, Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  onViewChange: (view: ViewState) => void;
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ onViewChange, language }) => {
  const t = translations[language].hero;
  
  return (
    <section className={`pt-32 pb-20 px-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            {t.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>.
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => {
                onViewChange('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold hover:scale-105 transition-transform shadow-lg"
            >
              {t.cta}
            </button>
            <div className="flex items-center gap-4">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-blue-400 transition-colors">
                <i className="fa-brands fa-github text-xl"></i>
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-blue-400 transition-colors">
                <i className="fa-brands fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative order-first md:order-last">
          <div className="w-64 h-64 md:w-80 md:h-80 relative z-10 mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 rotate-6 opacity-20"></div>
            {/* Fix: Changed fetchpriority to camelCase fetchPriority as per React's type requirements */}
            <img 
              src="https://picsum.photos/seed/cyber/400/400?fm=webp" 
              alt="Profile" 
              width="320"
              height="320"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover rounded-3xl border border-white/10 relative z-10 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full -z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
