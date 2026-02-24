import { CVData, WorkExperience, Education, Skill, Certification, Language } from '../types/cv'
import { generateId } from './helpers'

interface LinkedInProfile {
  'First Name'?: string
  'Last Name'?: string
  firstName?: string
  lastName?: string
  headline?: string
  'Headline'?: string
  summary?: string
  'Summary'?: string
  emailAddress?: string
  'Email Address'?: string
  'Phone Numbers'?: string
  address?: string
  'Geo Location'?: string
  websites?: string[]
  'Websites'?: string
}

interface LinkedInPosition {
  'Company Name'?: string
  companyName?: string
  title?: string
  'Title'?: string
  location?: string
  'Location'?: string
  'Started On'?: string
  startedOn?: string
  'Finished On'?: string
  finishedOn?: string
  description?: string
  'Description'?: string
}

interface LinkedInEducation {
  'School Name'?: string
  schoolName?: string
  'Degree Name'?: string
  degreeName?: string
  'Field Of Study'?: string
  fieldOfStudy?: string
  'Start Date'?: string
  startDate?: string
  'End Date'?: string
  endDate?: string
  grade?: string
  'Grade'?: string
  activities?: string
  'Activities'?: string
  notes?: string
  'Notes'?: string
}

interface LinkedInSkill {
  Name?: string
  name?: string
}

interface LinkedInCertification {
  Name?: string
  name?: string
  Authority?: string
  authority?: string
  'Started On'?: string
  startedOn?: string
  'Finished On'?: string
  finishedOn?: string
  'License Number'?: string
  licenseNumber?: string
  Url?: string
  url?: string
}

interface LinkedInLanguage {
  Name?: string
  name?: string
  Proficiency?: string
  proficiency?: string
}

interface LinkedInData {
  profile?: LinkedInProfile | LinkedInProfile[]
  Profile?: LinkedInProfile | LinkedInProfile[]
  positions?: LinkedInPosition[]
  Positions?: LinkedInPosition[]
  education?: LinkedInEducation[]
  Education?: LinkedInEducation[]
  skills?: LinkedInSkill[]
  Skills?: LinkedInSkill[]
  certifications?: LinkedInCertification[]
  Certifications?: LinkedInCertification[]
  languages?: LinkedInLanguage[]
  Languages?: LinkedInLanguage[]
}

export function parseLinkedInData(data: LinkedInData): Partial<CVData> {
  const cvData: Partial<CVData> = {}

  // Parse Profile
  const profile = extractArray(data.profile || data.Profile)?.[0]
  if (profile) {
    cvData.personalInfo = {
      fullName: `${profile['First Name'] || profile.firstName || ''} ${profile['Last Name'] || profile.lastName || ''}`.trim(),
      jobTitle: profile.Headline || profile.headline || '',
      email: profile['Email Address'] || profile.emailAddress || '',
      phone: profile['Phone Numbers'] || '',
      location: profile['Geo Location'] || profile.address || '',
      linkedin: extractLinkedInUrl(profile.websites || profile.Websites),
      summary: profile.Summary || profile.summary || '',
      website: extractWebsiteUrl(profile.websites || profile.Websites),
    }
  }

  // Parse Work Experience
  const positions = extractArray(data.positions || data.Positions)
  if (positions && positions.length > 0) {
    cvData.workExperience = positions.map(pos => {
      const startDate = parseLinkedInDate(pos['Started On'] || pos.startedOn)
      const endDate = parseLinkedInDate(pos['Finished On'] || pos.finishedOn)
      const isCurrent = !endDate || endDate === ''

      return {
        id: generateId(),
        company: pos['Company Name'] || pos.companyName || '',
        position: pos.Title || pos.title || '',
        location: pos.Location || pos.location || '',
        startDate,
        endDate: isCurrent ? '' : endDate,
        current: isCurrent,
        description: pos.Description || pos.description || '',
        achievements: extractAchievements(pos.Description || pos.description || '')
      } as WorkExperience
    })
  }

  // Parse Education
  const education = extractArray(data.education || data.Education)
  if (education && education.length > 0) {
    cvData.education = education.map(edu => {
      const startDate = parseLinkedInDate(edu['Start Date'] || edu.startDate)
      const endDate = parseLinkedInDate(edu['End Date'] || edu.endDate)
      const isCurrent = !endDate || endDate === ''

      return {
        id: generateId(),
        institution: edu['School Name'] || edu.schoolName || '',
        degree: edu['Degree Name'] || edu.degreeName || '',
        field: edu['Field Of Study'] || edu.fieldOfStudy || '',
        location: '',
        startDate,
        endDate: isCurrent ? '' : endDate,
        current: isCurrent,
        gpa: edu.Grade || edu.grade,
        achievements: extractAchievements(edu.Activities || edu.activities || edu.Notes || edu.notes || '')
      } as Education
    })
  }

  // Parse Skills
  const skills = extractArray(data.skills || data.Skills)
  if (skills && skills.length > 0) {
    cvData.skills = skills.map(skill => ({
      id: generateId(),
      name: skill.Name || skill.name || '',
      category: 'technical' as const,
      level: 'intermediate' as const
    } as Skill))
  }

  // Parse Certifications
  const certifications = extractArray(data.certifications || data.Certifications)
  if (certifications && certifications.length > 0) {
    cvData.certifications = certifications.map(cert => ({
      id: generateId(),
      name: cert.Name || cert.name || '',
      issuer: cert.Authority || cert.authority || '',
      date: parseLinkedInDate(cert['Started On'] || cert.startedOn) || '',
      expiryDate: parseLinkedInDate(cert['Finished On'] || cert.finishedOn),
      credentialId: cert['License Number'] || cert.licenseNumber,
      url: cert.Url || cert.url
    } as Certification))
  }

  // Parse Languages
  const languages = extractArray(data.languages || data.Languages)
  if (languages && languages.length > 0) {
    cvData.languages = languages.map(lang => ({
      id: generateId(),
      name: lang.Name || lang.name || '',
      proficiency: mapProficiency(lang.Proficiency || lang.proficiency || '')
    } as Language))
  }

  return cvData
}

function extractArray<T>(data: T | T[] | undefined): T[] {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

function parseLinkedInDate(dateStr: string | undefined): string {
  if (!dateStr) return ''
  
  // LinkedIn dates can be in various formats
  // "2020-01-01" or "Jan 2020" or "2020"
  try {
    // If it's already in ISO format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr
    }
    
    // If it's "MMM YYYY" format
    if (/^[A-Za-z]{3}\s\d{4}$/.test(dateStr)) {
      const [month, year] = dateStr.split(' ')
      const monthNum = new Date(Date.parse(month + ' 1, 2020')).getMonth() + 1
      return `${year}-${String(monthNum).padStart(2, '0')}-01`
    }
    
    // If it's just a year
    if (/^\d{4}$/.test(dateStr)) {
      return `${dateStr}-01-01`
    }
    
    return dateStr
  } catch {
    return dateStr
  }
}

function extractLinkedInUrl(websites: string | string[] | undefined): string | undefined {
  if (!websites) return undefined
  
  const urls = Array.isArray(websites) ? websites : [websites]
  const linkedinUrl = urls.find(url => url.includes('linkedin.com'))
  return linkedinUrl
}

function extractWebsiteUrl(websites: string | string[] | undefined): string | undefined {
  if (!websites) return undefined
  
  const urls = Array.isArray(websites) ? websites : [websites]
  const websiteUrl = urls.find(url => !url.includes('linkedin.com') && !url.includes('github.com'))
  return websiteUrl
}

function extractAchievements(description: string): string[] {
  if (!description) return []
  
  // Split by bullet points, newlines, or numbered lists
  const achievements = description
    .split(/[•\-\*\n]|^\d+\./)
    .map(item => item.trim())
    .filter(item => item.length > 10) // Only keep substantial items
    .slice(0, 5) // Limit to 5 achievements
  
  return achievements
}

function mapProficiency(proficiency: string): 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic' {
  const lower = proficiency.toLowerCase()
  
  if (lower.includes('native') || lower.includes('mother tongue')) return 'native'
  if (lower.includes('fluent') || lower.includes('full professional')) return 'fluent'
  if (lower.includes('professional') || lower.includes('working')) return 'professional'
  if (lower.includes('intermediate') || lower.includes('limited')) return 'intermediate'
  
  return 'basic'
}
