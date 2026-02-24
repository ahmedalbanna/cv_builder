import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  CoverLetterState,
  CoverLetterTemplateType,
  CoverLetterProfile,
  CoverLetterProfileMetadata,
  SenderInfo,
  RecipientInfo,
  CompanyInfo,
  LetterContent,
} from '../types/coverLetter'
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
  getInitialCoverLetterState,
} from '../utils/coverLetterStorage'

interface CoverLetterContextType {
  coverLetterData: CoverLetterState
  currentProfile: CoverLetterProfile | null
  profiles: CoverLetterProfileMetadata[]
  updateSenderInfo: (data: Partial<SenderInfo>) => void
  updateRecipientInfo: (data: Partial<RecipientInfo>) => void
  updateCompanyInfo: (data: Partial<CompanyInfo>) => void
  updateLetterContent: (data: Partial<LetterContent>) => void
  updateDate: (date: string) => void
  setTemplate: (template: CoverLetterTemplateType) => void
  resetCoverLetter: () => void
  // Profile management
  createNewProfile: (name: string) => void
  switchProfile: (profileId: string) => void
  deleteCurrentProfile: (profileId: string) => void
  renameCurrentProfile: (profileId: string, newName: string) => void
  duplicateCurrentProfile: (profileId: string) => void
  exportProfile: (profileId: string) => void
  importProfile: (jsonData: string) => void
  refreshProfiles: () => void
  // CV data integration
  importFromCV: (cvData: any) => void
}

const CoverLetterContext = createContext<CoverLetterContextType | undefined>(undefined)

export function CoverLetterProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<CoverLetterProfile | null>(null)
  const [profiles, setProfiles] = useState<CoverLetterProfileMetadata[]>([])
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterState>(getInitialCoverLetterState())

  // Initialize profiles on mount
  useEffect(() => {
    const profile = initializeStorage()
    setCurrentProfile(profile)
    setCoverLetterData(profile.coverLetterData)
    setProfiles(getProfilesMetadata())
  }, [])

  // Save to profile storage whenever data changes
  useEffect(() => {
    if (currentProfile) {
      updateProfile(currentProfile.id, coverLetterData)
    }
  }, [coverLetterData, currentProfile])

  const updateSenderInfo = (data: Partial<SenderInfo>) => {
    setCoverLetterData(prev => ({
      ...prev,
      senderInfo: { ...prev.senderInfo, ...data }
    }))
  }

  const updateRecipientInfo = (data: Partial<RecipientInfo>) => {
    setCoverLetterData(prev => ({
      ...prev,
      recipientInfo: { ...prev.recipientInfo, ...data }
    }))
  }

  const updateCompanyInfo = (data: Partial<CompanyInfo>) => {
    setCoverLetterData(prev => ({
      ...prev,
      companyInfo: { ...prev.companyInfo, ...data }
    }))
  }

  const updateLetterContent = (data: Partial<LetterContent>) => {
    setCoverLetterData(prev => ({
      ...prev,
      letterContent: { ...prev.letterContent, ...data }
    }))
  }

  const updateDate = (date: string) => {
    setCoverLetterData(prev => ({ ...prev, date }))
  }

  const setTemplate = (template: CoverLetterTemplateType) => {
    setCoverLetterData(prev => ({ ...prev, selectedTemplate: template }))
  }

  const resetCoverLetter = () => {
    setCoverLetterData(getInitialCoverLetterState())
  }

  // Profile management functions
  const refreshProfiles = () => {
    setProfiles(getProfilesMetadata())
  }

  const createNewProfile = (name: string) => {
    const newProfile = createProfile(name)
    setCurrentProfile(newProfile)
    setCoverLetterData(newProfile.coverLetterData)
    refreshProfiles()
  }

  const switchProfile = (profileId: string) => {
    setActiveProfileId(profileId)
    const profile = getActiveProfile()
    if (profile) {
      setCurrentProfile(profile)
      setCoverLetterData(profile.coverLetterData)
    }
  }

  const deleteCurrentProfile = (profileId: string) => {
    deleteProfile(profileId)
    const profile = getActiveProfile()
    if (profile) {
      setCurrentProfile(profile)
      setCoverLetterData(profile.coverLetterData)
    } else {
      createNewProfile('My Cover Letter')
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
      setCoverLetterData(newProfile.coverLetterData)
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
      setCoverLetterData(newProfile.coverLetterData)
      refreshProfiles()
    }
  }

  const importFromCV = (cvData: any) => {
    if (cvData && cvData.personalInfo) {
      const pi = cvData.personalInfo
      updateSenderInfo({
        fullName: pi.fullName || '',
        phone: pi.phone || '',
        email: pi.email || '',
        address: pi.location || '',
      })
    }
  }

  return (
    <CoverLetterContext.Provider
      value={{
        coverLetterData,
        currentProfile,
        profiles,
        updateSenderInfo,
        updateRecipientInfo,
        updateCompanyInfo,
        updateLetterContent,
        updateDate,
        setTemplate,
        resetCoverLetter,
        createNewProfile,
        switchProfile,
        deleteCurrentProfile,
        renameCurrentProfile,
        duplicateCurrentProfile,
        exportProfile,
        importProfile,
        refreshProfiles,
        importFromCV,
      }}
    >
      {children}
    </CoverLetterContext.Provider>
  )
}

export function useCoverLetter() {
  const context = useContext(CoverLetterContext)
  if (context === undefined) {
    throw new Error('useCoverLetter must be used within a CoverLetterProvider')
  }
  return context
}
