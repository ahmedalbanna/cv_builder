import { CoverLetterState, CoverLetterProfile, CoverLetterProfileMetadata } from '../types/coverLetter'
import { generateId } from './helpers'

const STORAGE_KEY = 'coverLetterProfiles'
const ACTIVE_PROFILE_KEY = 'activeCoverLetterProfileId'

export const getInitialCoverLetterState = (): CoverLetterState => ({
  senderInfo: {
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
  },
  recipientInfo: {
    hiringManager: '',
    title: '',
    company: '',
    department: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  companyInfo: {
    companyName: '',
    industry: '',
    jobTitle: '',
    jobReference: '',
    howFound: '',
  },
  letterContent: {
    opening: '',
    body1: '',
    body2: '',
    body3: '',
    closing: '',
    salutation: 'Sincerely',
  },
  date: new Date().toISOString().split('T')[0],
  selectedTemplate: 'professional',
})

export const getAllProfiles = (): CoverLetterProfile[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

export const saveAllProfiles = (profiles: CoverLetterProfile[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
}

export const getActiveProfileId = (): string | null => {
  return localStorage.getItem(ACTIVE_PROFILE_KEY)
}

export const setActiveProfileId = (profileId: string): void => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileId)
}

export const getActiveProfile = (): CoverLetterProfile | null => {
  const activeId = getActiveProfileId()
  if (!activeId) return null
  
  const profiles = getAllProfiles()
  return profiles.find(p => p.id === activeId) || null
}

export const createProfile = (name: string): CoverLetterProfile => {
  const newProfile: CoverLetterProfile = {
    id: generateId(),
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coverLetterData: getInitialCoverLetterState(),
  }
  
  const profiles = getAllProfiles()
  profiles.push(newProfile)
  saveAllProfiles(profiles)
  setActiveProfileId(newProfile.id)
  
  return newProfile
}

export const updateProfile = (profileId: string, coverLetterData: CoverLetterState): void => {
  const profiles = getAllProfiles()
  const index = profiles.findIndex(p => p.id === profileId)
  
  if (index !== -1) {
    profiles[index].coverLetterData = coverLetterData
    profiles[index].updatedAt = new Date().toISOString()
    saveAllProfiles(profiles)
  }
}

export const deleteProfile = (profileId: string): void => {
  let profiles = getAllProfiles()
  profiles = profiles.filter(p => p.id !== profileId)
  saveAllProfiles(profiles)
  
  const activeId = getActiveProfileId()
  if (activeId === profileId) {
    if (profiles.length > 0) {
      setActiveProfileId(profiles[0].id)
    } else {
      localStorage.removeItem(ACTIVE_PROFILE_KEY)
    }
  }
}

export const renameProfile = (profileId: string, newName: string): void => {
  const profiles = getAllProfiles()
  const index = profiles.findIndex(p => p.id === profileId)
  
  if (index !== -1) {
    profiles[index].name = newName
    profiles[index].updatedAt = new Date().toISOString()
    saveAllProfiles(profiles)
  }
}

export const duplicateProfile = (profileId: string): CoverLetterProfile | null => {
  const profiles = getAllProfiles()
  const profile = profiles.find(p => p.id === profileId)
  
  if (!profile) return null
  
  const newProfile: CoverLetterProfile = {
    ...profile,
    id: generateId(),
    name: `${profile.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  profiles.push(newProfile)
  saveAllProfiles(profiles)
  
  return newProfile
}

export const getProfilesMetadata = (): CoverLetterProfileMetadata[] => {
  const profiles = getAllProfiles()
  return profiles.map(({ id, name, createdAt, updatedAt }) => ({
    id,
    name,
    createdAt,
    updatedAt,
  }))
}

export const exportProfileAsJSON = (profile: CoverLetterProfile): void => {
  const dataStr = JSON.stringify(profile, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${profile.name.replace(/\s+/g, '_')}_cover_letter.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const importProfileFromJSON = (jsonData: string): CoverLetterProfile | null => {
  try {
    const profile: CoverLetterProfile = JSON.parse(jsonData)
    profile.id = generateId()
    profile.createdAt = new Date().toISOString()
    profile.updatedAt = new Date().toISOString()
    
    const profiles = getAllProfiles()
    profiles.push(profile)
    saveAllProfiles(profiles)
    
    return profile
  } catch {
    return null
  }
}

export const initializeStorage = (): CoverLetterProfile => {
  const profiles = getAllProfiles()
  
  if (profiles.length === 0) {
    return createProfile('My Cover Letter')
  }
  
  const activeProfile = getActiveProfile()
  if (activeProfile) {
    return activeProfile
  }
  
  setActiveProfileId(profiles[0].id)
  return profiles[0]
}
