export enum Category {
  PROFILE = 'PROFILE',
  EXPERIENCE = 'EXPERIENCE',
  PROJECTS = 'PROJECTS',
  EDUCATION = 'EDUCATION',
  SKILLS = 'SKILLS'
}

export type Theme = 'dark' | 'light';

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
  highlights?: string[]; // For specific projects within the job
}

export interface Project {
  title: string;
  subtitle?: string;
  stats: string;
  link: string;
  description?: string;
  tags?: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  major: string;
  highlights?: string[]; // For awards or student works
  description?: string[];
}

export enum SkillLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Skill {
  name: string;
  level: SkillLevel;
  description?: string; // Optional flavor text
}

export interface SkillSet {
  category: string;
  items: Skill[];
}