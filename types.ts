
export type Language = 'ar' | 'en';

export interface Project {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  longDescription: { ar: string; en: string };
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: { ar: string; en: string };
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
  icon: string;
}

export interface Experience {
  company: { ar: string; en: string };
  role: { ar: string; en: string };
  period: { ar: string; en: string };
  description: { ar: string; en: string };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type ViewState = 'home' | 'projects' | 'resume' | 'contact';
