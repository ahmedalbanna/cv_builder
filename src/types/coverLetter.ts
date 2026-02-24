export interface RecipientInfo {
  hiringManager: string
  title: string
  company: string
  department?: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface CompanyInfo {
  companyName: string
  industry?: string
  jobTitle: string
  jobReference?: string
  howFound?: string
}

export interface LetterContent {
  opening: string
  body1: string
  body2: string
  body3?: string
  closing: string
  salutation: string
}

export interface SenderInfo {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
}

export interface CoverLetterData {
  senderInfo: SenderInfo
  recipientInfo: RecipientInfo
  companyInfo: CompanyInfo
  letterContent: LetterContent
  date: string
}

export type CoverLetterTemplateType = 'professional' | 'modern' | 'simple'

export interface CoverLetterState extends CoverLetterData {
  selectedTemplate: CoverLetterTemplateType
}

export interface CoverLetterProfile {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  coverLetterData: CoverLetterState
}

export interface CoverLetterProfileMetadata {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}
