export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
  photo?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  achievements: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'language' | 'other'
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate: string
  endDate?: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic'
}

export interface CVData {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  certifications: Certification[]
  projects: Project[]
  languages: Language[]
}

export type TemplateType = 'modern' | 'classic' | 'creative'

export interface CVState extends CVData {
  selectedTemplate: TemplateType
  colorTheme?: {
    id: string
    name: string
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    isCustom?: boolean
  }
}

export interface CVProfile {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  cvData: CVState
}

export interface CVProfileMetadata {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}
