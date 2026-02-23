import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { CVState, TemplateType } from '../types/cv'

interface CVContextType {
  cvData: CVState
  updatePersonalInfo: (data: Partial<CVState['personalInfo']>) => void
  addWorkExperience: (data: CVState['workExperience'][0]) => void
  updateWorkExperience: (id: string, data: Partial<CVState['workExperience'][0]>) => void
  deleteWorkExperience: (id: string) => void
  addEducation: (data: CVState['education'][0]) => void
  updateEducation: (id: string, data: Partial<CVState['education'][0]>) => void
  deleteEducation: (id: string) => void
  addSkill: (data: CVState['skills'][0]) => void
  updateSkill: (id: string, data: Partial<CVState['skills'][0]>) => void
  deleteSkill: (id: string) => void
  addCertification: (data: CVState['certifications'][0]) => void
  updateCertification: (id: string, data: Partial<CVState['certifications'][0]>) => void
  deleteCertification: (id: string) => void
  addProject: (data: CVState['projects'][0]) => void
  updateProject: (id: string, data: Partial<CVState['projects'][0]>) => void
  deleteProject: (id: string) => void
  addLanguage: (data: CVState['languages'][0]) => void
  updateLanguage: (id: string, data: Partial<CVState['languages'][0]>) => void
  deleteLanguage: (id: string) => void
  setTemplate: (template: TemplateType) => void
  resetCV: () => void
}

const CVContext = createContext<CVContextType | undefined>(undefined)

const STORAGE_KEY = 'cv-builder-data'

const getInitialState = (): CVState => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse stored CV data:', e)
    }
  }
  
  return {
    selectedTemplate: 'modern',
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
  }
}

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCvData] = useState<CVState>(getInitialState)

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData))
  }, [cvData])

  const updatePersonalInfo = (data: Partial<CVState['personalInfo']>) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }))
  }

  const addWorkExperience = (data: CVState['workExperience'][0]) => {
    setCvData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, data]
    }))
  }

  const updateWorkExperience = (id: string, data: Partial<CVState['workExperience'][0]>) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }))
  }

  const deleteWorkExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(item => item.id !== id)
    }))
  }

  const addEducation = (data: CVState['education'][0]) => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, data]
    }))
  }

  const updateEducation = (id: string, data: Partial<CVState['education'][0]>) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }))
  }

  const deleteEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }))
  }

  const addSkill = (data: CVState['skills'][0]) => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, data]
    }))
  }

  const updateSkill = (id: string, data: Partial<CVState['skills'][0]>) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }))
  }

  const deleteSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }))
  }

  const addCertification = (data: CVState['certifications'][0]) => {
    setCvData(prev => ({
      ...prev,
      certifications: [...prev.certifications, data]
    }))
  }

  const updateCertification = (id: string, data: Partial<CVState['certifications'][0]>) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }))
  }

  const deleteCertification = (id: string) => {
    setCvData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(item => item.id !== id)
    }))
  }

  const addProject = (data: CVState['projects'][0]) => {
    setCvData(prev => ({
      ...prev,
      projects: [...prev.projects, data]
    }))
  }

  const updateProject = (id: string, data: Partial<CVState['projects'][0]>) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }))
  }

  const deleteProject = (id: string) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }))
  }

  const addLanguage = (data: CVState['languages'][0]) => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, data]
    }))
  }

  const updateLanguage = (id: string, data: Partial<CVState['languages'][0]>) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(item =>
        item.id === id ? { ...item, ...data } : item
      )
    }))
  }

  const deleteLanguage = (id: string) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(item => item.id !== id)
    }))
  }

  const setTemplate = (template: TemplateType) => {
    setCvData(prev => ({ ...prev, selectedTemplate: template }))
  }

  const resetCV = () => {
    setCvData(getInitialState())
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <CVContext.Provider
      value={{
        cvData,
        updatePersonalInfo,
        addWorkExperience,
        updateWorkExperience,
        deleteWorkExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addCertification,
        updateCertification,
        deleteCertification,
        addProject,
        updateProject,
        deleteProject,
        addLanguage,
        updateLanguage,
        deleteLanguage,
        setTemplate,
        resetCV,
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context = useContext(CVContext)
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider')
  }
  return context
}
