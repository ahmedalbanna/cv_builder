// ATS Check Categories
export type ATSCategory = 'contact' | 'keywords' | 'formatting' | 'content' | 'sections'

// ATS Warning Severity
export type ATSWarningSeverity = 'critical' | 'warning' | 'info'

// Individual ATS Check Result
export interface ATSCheck {
  id: string
  category: ATSCategory
  name: string
  passed: boolean
  severity: ATSWarningSeverity
  message: string
  suggestion?: string
  score: number // 0-100
}

// Category Score
export interface ATSCategoryScore {
  category: ATSCategory
  categoryName: string
  score: number // 0-100
  passed: number
  total: number
  checks: ATSCheck[]
}

// Overall ATS Analysis Result
export interface ATSAnalysisResult {
  overallScore: number // 0-100
  grade: 'excellent' | 'good' | 'fair' | 'poor'
  categoryScores: ATSCategoryScore[]
  criticalIssues: ATSCheck[]
  warnings: ATSCheck[]
  suggestions: ATSCheck[]
  timestamp: string
}

// Job Description for AI Matching
export interface JobDescription {
  title: string
  description: string
  keywords?: string[]
  requiredSkills?: string[]
  preferredSkills?: string[]
}

// AI-Enhanced ATS Analysis
export interface AIATSAnalysis {
  keywordMatch: {
    matched: string[]
    missing: string[]
    score: number
  }
  skillGapAnalysis: {
    hasSkills: string[]
    missingSkills: string[]
    score: number
  }
  contentSuggestions: string[]
}

// ATS Configuration
export interface ATSConfig {
  enableAI: boolean
  jobDescription?: JobDescription
  strictMode: boolean // More stringent checks
  targetKeywordDensity: number // 1-3%
}
