
import React from 'react';
import { SKILLS } from '../constants';
import { Language } from '../types';

interface SkillsProps {
  language: Language;
}

const Skills: React.FC<SkillsProps> = ({ language }) => {
  const categories = [
    { id: 'Frontend', label: { ar: 'الواجهة الأمامية', en: 'Frontend' } },
    { id: 'Backend', label: { ar: 'الواجهة الخلفية', en: 'Backend' } },
    { id: 'Tools', label: { ar: 'الأدوات', en: 'Tools' } },
    { id: 'Soft Skills', label: { ar: 'المهارات الشخصية', en: 'Soft Skills' } }
  ] as const;

  return (
    /* Fix: Handle layout direction based on current language */
    <section id="skills" className={`py-20 px-6 bg-slate-900/50 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {language === 'ar' ? 'المهارات ' : 'Technical '}
          <span className="gradient-text">{language === 'ar' ? 'التقنية' : 'Skills'}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(cat => (
            <div key={cat.id} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-400 px-2">{cat.label[language]}</h3>
              <div className="space-y-2">
                {SKILLS.filter(s => s.category === cat.id).map(skill => (
                  /* Fix: Use unique string as key instead of the name object, and adjust item alignment */
                  <div key={skill.name.en} className={`glass p-4 rounded-2xl flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'} hover:bg-slate-800 transition-colors`}>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <i className={skill.icon}></i>
                    </div>
                    {/* Fix: Access localized skill name string */}
                    <span className="font-medium text-sm">{skill.name[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
