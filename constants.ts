
import { Project, Skill, Experience } from './types';
import personalData from './content/personal';
import projectsData from './content/projects';
import skillsData from './content/skills';
import experienceData from './content/experience';

export const PERSONAL_INFO = personalData;
export const PROJECTS: Project[] = projectsData as Project[];
export const SKILLS: Skill[] = skillsData as Skill[];
export const EXPERIENCES: Experience[] = experienceData as Experience[];
