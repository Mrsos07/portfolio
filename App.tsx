
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { ViewState, Language } from './types';
import { EXPERIENCES } from './constants';
import { translations } from './translations';

// تحميل المكونات الثقيلة برمجياً فقط عند الحاجة
const Contact = lazy(() => import('./components/Contact'));
const AiAssistant = lazy(() => import('./components/AiAssistant'));

// مكون مؤقت (Loading Placeholder) لتحسين CLS
const LoadingPlaceholder = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language].sections;

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <Hero onViewChange={setActiveView} language={language} />
            <section id="about" className="py-20 px-6 border-t border-slate-800">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800&fm=webp" 
                      alt="Saud Alghamdi Professional Photo" 
                      width="800"
                      height="533"
                      loading="lazy"
                      decoding="async"
                      className="rounded-[40px] shadow-2xl border border-white/5 relative z-10"
                    />
                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-2xl rounded-[50px] -z-0"></div>
                  </div>
                </div>
                <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.aboutTitle}</h2>
                  <p className="text-slate-400 mb-6 leading-relaxed text-lg">{t.aboutDesc}</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass p-6 rounded-3xl text-center border-b-2 border-blue-500">
                      <h4 className="text-3xl font-bold text-white mb-1">+10</h4>
                      <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">{t.expYears}</p>
                    </div>
                    <div className="glass p-6 rounded-3xl text-center border-b-2 border-purple-500">
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">Architect</h4>
                      <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">{t.topPercent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Projects featuredOnly language={language} />
            <Skills language={language} />
            <Suspense fallback={<LoadingPlaceholder />}>
              <Contact language={language} />
            </Suspense>
          </>
        );
      case 'projects':
        return (
          <div className="pt-24 min-h-screen">
            <Projects language={language} />
          </div>
        );
      case 'resume':
        return (
          <div className={`pt-32 min-h-screen max-w-7xl mx-auto px-6 pb-20 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-5xl font-bold mb-16 text-center">{t.resumeTitle}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                      <i className="fa-solid fa-graduation-cap text-white text-sm"></i>
                    </div>
                    {t.eduTitle}
                  </h2>
                  <div className="space-y-6">
                    <div className={`glass p-8 rounded-[30px] border-${language === 'ar' ? 'right' : 'left'}-4 border-blue-500`}>
                      <h3 className="text-xl font-bold">{language === 'ar' ? 'ماجستير في الأمن السيبراني' : 'M.Sc. in Cybersecurity'}</h3>
                      <p className="text-blue-400 font-medium mt-1">{language === 'ar' ? 'جامعة ميد أوشن (عن بُعد)' : 'Mid Ocean University (Remote)'} - 2024</p>
                    </div>
                    {/* ... بقية العناصر ... */}
                  </div>
                </section>
                {/* ... بقية الأقسام ... */}
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="pt-32 min-h-[80vh]">
             <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4">{translations[language].sections.contactTitle}</h1>
                <p className="text-slate-400 text-lg">{translations[language].sections.contactDesc}</p>
             </div>
             <Suspense fallback={<LoadingPlaceholder />}>
               <Contact language={language} />
             </Suspense>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative selection:bg-blue-500/30 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full"></div>
      </div>
      <Navbar activeView={activeView} onViewChange={setActiveView} language={language} onLanguageChange={setLanguage} />
      <main className="animate-in fade-in duration-700">{renderContent()}</main>
      <footer className="py-12 px-6 border-t border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-xl font-bold gradient-text mb-2">{language === 'ar' ? 'سعود الغامدي' : 'Saud Alghamdi'}</p>
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} {t.footerRights}.</p>
          </div>
        </div>
      </footer>
      <Suspense fallback={null}>
        <AiAssistant language={language} />
      </Suspense>
    </div>
  );
};

export default App;
