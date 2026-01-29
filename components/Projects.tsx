
import React from 'react';
import { PROJECTS } from '../constants';
import { Project, Language } from '../types';
import { translations } from '../translations';

const ProjectCard: React.FC<{ project: Project; language: Language }> = ({ project, language }) => {
  return (
    <div className={`group glass rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'} h-full`}>
      <div className="aspect-video overflow-hidden relative bg-slate-800">
        <img 
          src={`${project.imageUrl}&fm=webp&q=80`} 
          alt={project.title[language]} 
          width="400"
          height="225"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-[10px] font-bold bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400">{tag}</span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{project.title[language]}</h3>
        <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">{project.description[language]}</p>
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex gap-2">
            {project.githubUrl && <a href={project.githubUrl} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white"><i className="fa-brands fa-github"></i></a>}
            {project.liveUrl && <a href={project.liveUrl} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white"><i className="fa-solid fa-link"></i></a>}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsProps {
  featuredOnly?: boolean;
  language: Language;
}

const Projects: React.FC<ProjectsProps> = ({ featuredOnly = false, language }) => {
  const t = translations[language].sections;
  const filteredProjects = PROJECTS.filter(p => featuredOnly ? p.featured : true);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.projectsTitle}</h2>
          <p className="text-slate-400 text-lg">{t.projectsDesc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
