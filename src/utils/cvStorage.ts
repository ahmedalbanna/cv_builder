import { CVProfile, CVProfileMetadata, CVState } from '../types/cv'
import { generateId } from './helpers'

const PROFILES_STORAGE_KEY = 'cv-builder-profiles'
const ACTIVE_PROFILE_KEY = 'cv-builder-active-profile'

export const getInitialCVState = (): CVState => ({
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
})

// Get all profiles from local storage
export const getAllProfiles = (): CVProfile[] => {
  try {
    const stored = localStorage.getItem(PROFILES_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load profiles:', e)
  }
  return []
}

// Save all profiles to local storage
export const saveAllProfiles = (profiles: CVProfile[]): void => {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles))
  } catch (e) {
    console.error('Failed to save profiles:', e)
  }
}

// Get active profile ID
export const getActiveProfileId = (): string | null => {
  return localStorage.getItem(ACTIVE_PROFILE_KEY)
}

// Set active profile ID
export const setActiveProfileId = (id: string): void => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id)
}

// Get active profile
export const getActiveProfile = (): CVProfile | null => {
  const activeId = getActiveProfileId()
  if (!activeId) return null
  
  const profiles = getAllProfiles()
  return profiles.find(p => p.id === activeId) || null
}

// Create new profile
export const createProfile = (name: string, cvData?: CVState): CVProfile => {
  const now = new Date().toISOString()
  const profile: CVProfile = {
    id: generateId(),
    name,
    createdAt: now,
    updatedAt: now,
    cvData: cvData || getInitialCVState(),
  }
  
  const profiles = getAllProfiles()
  profiles.push(profile)
  saveAllProfiles(profiles)
  setActiveProfileId(profile.id)
  
  return profile
}

// Update profile
export const updateProfile = (id: string, cvData: CVState): void => {
  const profiles = getAllProfiles()
  const index = profiles.findIndex(p => p.id === id)
  
  if (index !== -1) {
    profiles[index].cvData = cvData
    profiles[index].updatedAt = new Date().toISOString()
    saveAllProfiles(profiles)
  }
}

// Rename profile
export const renameProfile = (id: string, newName: string): void => {
  const profiles = getAllProfiles()
  const index = profiles.findIndex(p => p.id === id)
  
  if (index !== -1) {
    profiles[index].name = newName
    profiles[index].updatedAt = new Date().toISOString()
    saveAllProfiles(profiles)
  }
}

// Delete profile
export const deleteProfile = (id: string): void => {
  const profiles = getAllProfiles()
  const filtered = profiles.filter(p => p.id !== id)
  saveAllProfiles(filtered)
  
  // If deleted profile was active, switch to first available
  if (getActiveProfileId() === id) {
    if (filtered.length > 0) {
      setActiveProfileId(filtered[0].id)
    } else {
      localStorage.removeItem(ACTIVE_PROFILE_KEY)
    }
  }
}

// Duplicate profile
export const duplicateProfile = (id: string): CVProfile | null => {
  const profiles = getAllProfiles()
  const original = profiles.find(p => p.id === id)
  
  if (!original) return null
  
  const now = new Date().toISOString()
  const duplicate: CVProfile = {
    id: generateId(),
    name: `${original.name} (Copy)`,
    createdAt: now,
    updatedAt: now,
    cvData: JSON.parse(JSON.stringify(original.cvData)), // Deep clone
  }
  
  profiles.push(duplicate)
  saveAllProfiles(profiles)
  
  return duplicate
}

// Get profile metadata (without full CV data)
export const getProfilesMetadata = (): CVProfileMetadata[] => {
  const profiles = getAllProfiles()
  return profiles.map(p => ({
    id: p.id,
    name: p.name,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }))
}

// Export profile as JSON file
export const exportProfileAsJSON = (profile: CVProfile): void => {
  const dataStr = JSON.stringify(profile, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${profile.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cv.json`
  link.click()
  
  URL.revokeObjectURL(url)
}

// Import profile from JSON
export const importProfileFromJSON = (jsonData: string): CVProfile | null => {
  try {
    const profile: CVProfile = JSON.parse(jsonData)
    
    // Validate structure
    if (!profile.id || !profile.name || !profile.cvData) {
      throw new Error('Invalid profile structure')
    }
    
    // Create new profile with imported data
    const now = new Date().toISOString()
    const importedProfile: CVProfile = {
      ...profile,
      id: generateId(), // New ID to avoid conflicts
      name: `${profile.name} (Imported)`,
      createdAt: now,
      updatedAt: now,
    }
    
    const profiles = getAllProfiles()
    profiles.push(importedProfile)
    saveAllProfiles(profiles)
    
    return importedProfile
  } catch (e) {
    console.error('Failed to import profile:', e)
    return null
  }
}

// Initialize storage (create default profile if none exists)
export const initializeStorage = (): CVProfile => {
  const profiles = getAllProfiles()
  
  if (profiles.length === 0) {
    // No profiles exist, create default one
    return createProfile('My CV')
  }
  
  // Profiles exist, ensure we have an active one
  let activeProfile = getActiveProfile()
  if (!activeProfile) {
    activeProfile = profiles[0]
    setActiveProfileId(activeProfile.id)
  }
  
  return activeProfile
}
