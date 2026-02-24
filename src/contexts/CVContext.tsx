import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { CVState, TemplateType, CVProfile, CVProfileMetadata, CVData } from '../types/cv'
import {
  initializeStorage,
  getActiveProfile,
  setActiveProfileId,
  updateProfile,
  createProfile,
  deleteProfile,
  renameProfile,
  duplicateProfile,
  getProfilesMetadata,
  exportProfileAsJSON,
  importProfileFromJSON,
  getInitialCVState,
} from '../utils/cvStorage'

interface CVContextType {
  cvData: CVState
  currentProfile: CVProfile | null
  profiles: CVProfileMetadata[]
  updateCVData: (data: Partial<CVState>) => void
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
  // Profile management
  createNewProfile: (name: string) => void
  switchProfile: (profileId: string) => void
  deleteCurrentProfile: (profileId: string) => void
  renameCurrentProfile: (profileId: string, newName: string) => void
  duplicateCurrentProfile: (profileId: string) => void
  exportProfile: (profileId: string) => void
  importProfile: (jsonData: string) => void
  importFromLinkedIn: (data: Partial<CVData>) => void
  refreshProfiles: () => void
}

const CVContext = createContext<CVContextType | undefined>(undefined)

export function CVProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<CVProfile | null>(null)
  const [profiles, setProfiles] = useState<CVProfileMetadata[]>([])
  const [cvData, setCvData] = useState<CVState>(getInitialCVState())

  // Initialize profiles on mount
  useEffect(() => {
    const profile = initializeStorage()
    setCurrentProfile(profile)
    setCvData(profile.cvData)
    setProfiles(getProfilesMetadata())
  }, [])

  // Save to profile storage whenever data changes
  useEffect(() => {
    if (currentProfile) {
      updateProfile(currentProfile.id, cvData)
    }
  }, [cvData, currentProfile])

  const updateCVData = (data: Partial<CVState>) => {
    setCvData(prev => ({ ...prev, ...data }))
  }

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
    setCvData(getInitialCVState())
  }

  // Profile management functions
  const refreshProfiles = () => {
    setProfiles(getProfilesMetadata())
  }

  const createNewProfile = (name: string) => {
    const newProfile = createProfile(name)
    setCurrentProfile(newProfile)
    setCvData(newProfile.cvData)
    refreshProfiles()
  }

  const switchProfile = (profileId: string) => {
    setActiveProfileId(profileId)
    const profile = getActiveProfile()
    if (profile) {
      setCurrentProfile(profile)
      setCvData(profile.cvData)
    }
  }

  const deleteCurrentProfile = (profileId: string) => {
    deleteProfile(profileId)
    const profile = getActiveProfile()
    if (profile) {
      setCurrentProfile(profile)
      setCvData(profile.cvData)
    } else {
      // No profiles left, create a new one
      createNewProfile('My CV')
    }
    refreshProfiles()
  }

  const renameCurrentProfile = (profileId: string, newName: string) => {
    renameProfile(profileId, newName)
    const profile = getActiveProfile()
    if (profile) {
      setCurrentProfile(profile)
    }
    refreshProfiles()
  }

  const duplicateCurrentProfile = (profileId: string) => {
    const newProfile = duplicateProfile(profileId)
    if (newProfile) {
      setActiveProfileId(newProfile.id)
      setCurrentProfile(newProfile)
      setCvData(newProfile.cvData)
      refreshProfiles()
    }
  }

  const exportProfile = (profileId: string) => {
    const profile = getActiveProfile()
    if (profile && profile.id === profileId) {
      exportProfileAsJSON(profile)
    }
  }

  const importProfile = (jsonData: string) => {
    const newProfile = importProfileFromJSON(jsonData)
    if (newProfile) {
      setActiveProfileId(newProfile.id)
      setCurrentProfile(newProfile)
      setCvData(newProfile.cvData)
      refreshProfiles()
    }
  }

  const importFromLinkedIn = (data: Partial<CVData>) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: data.personalInfo ? { ...prev.personalInfo, ...data.personalInfo } : prev.personalInfo,
      workExperience: data.workExperience ? [...data.workExperience, ...prev.workExperience] : prev.workExperience,
      education: data.education ? [...data.education, ...prev.education] : prev.education,
      skills: data.skills ? [...data.skills, ...prev.skills] : prev.skills,
      certifications: data.certifications ? [...data.certifications, ...prev.certifications] : prev.certifications,
      projects: data.projects ? [...data.projects, ...prev.projects] : prev.projects,
      languages: data.languages ? [...data.languages, ...prev.languages] : prev.languages,
    }))
  }

  return (
    <CVContext.Provider
      value={{
        cvData,
        currentProfile,
        profiles,
        updateCVData,
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
        createNewProfile,
        switchProfile,
        deleteCurrentProfile,
        renameCurrentProfile,
        duplicateCurrentProfile,
        exportProfile,
        importProfile,
        importFromLinkedIn,
        refreshProfiles,
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
