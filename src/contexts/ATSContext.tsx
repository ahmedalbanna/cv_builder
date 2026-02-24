import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useCV } from './CVContext'
import { useAI } from './AIContext'
import { 
  ATSAnalysisResult, 
  ATSConfig, 
  JobDescription, 
  AIATSAnalysis 
} from '../types/ats'
import { analyzeCV } from '../utils/atsChecker'
import { CVState } from '../types/cv'

interface ATSContextType {
  analysisResult: ATSAnalysisResult | null
  aiAnalysis: AIATSAnalysis | null
  config: ATSConfig
  jobDescription: JobDescription | null
  isAnalyzing: boolean
  setJobDescription: (job: JobDescription | null) => void
  updateConfig: (config: Partial<ATSConfig>) => void
  runAnalysis: () => Promise<void>
  runAIAnalysis: () => Promise<void>
  getWarningsForSection: (section: string) => ATSAnalysisResult['criticalIssues']
}

const ATSContext = createContext<ATSContextType | undefined>(undefined)

export function ATSProvider({ children }: { children: ReactNode }) {
  const { cvData } = useCV()
  const { getSuggestion, isConnected } = useAI()
  
  const [analysisResult, setAnalysisResult] = useState<ATSAnalysisResult | null>(null)
  const [aiAnalysis, setAIAnalysis] = useState<AIATSAnalysis | null>(null)
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [config, setConfig] = useState<ATSConfig>({
    enableAI: true,
    strictMode: false,
    targetKeywordDensity: 2,
  })

  // Auto-run analysis when CV data changes
  useEffect(() => {
    runAnalysis()
  }, [cvData])

  // Auto-run AI analysis when job description changes and AI is available
  useEffect(() => {
    if (jobDescription && isConnected && config.enableAI) {
      runAIAnalysis()
    }
  }, [jobDescription, isConnected])

  const updateConfig = (newConfig: Partial<ATSConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }))
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      const result = analyzeCV(cvData, config)
      setAnalysisResult(result)
    } catch (error) {
      console.error('ATS analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const runAIAnalysis = async () => {
    if (!jobDescription || !isConnected) {
      setAIAnalysis(null)
      return
    }

    setIsAnalyzing(true)
    try {
      // Extract keywords from job description
      const keywordResponse = await getSuggestion({
        promptType: 'extractKeywords',
        params: { jobDescription: jobDescription.description },
      })

      const extractedKeywords = keywordResponse.success
        ? keywordResponse.content.split(',').map(k => k.trim())
        : []

      // Get CV skills as string
      const cvSkills = cvData.skills.map(s => s.name).join(', ')
      const jobSkills = [...(jobDescription.requiredSkills || []), ...(jobDescription.preferredSkills || [])].join(', ')

      // Analyze skill gap
      const skillGapResponse = await getSuggestion({
        promptType: 'analyzeSkillGap',
        params: {
          cvSkills,
          jobRequirements: jobSkills || jobDescription.description,
        },
      })

      // Parse skill gap analysis
      let hasSkills: string[] = []
      let missingSkills: string[] = []
      let suggestions: string[] = []

      if (skillGapResponse.success) {
        const lines = skillGapResponse.content.split('\n')
        lines.forEach(line => {
          if (line.includes('MATCHED SKILLS:')) {
            hasSkills = line.replace('MATCHED SKILLS:', '').split(',').map(s => s.trim()).filter(Boolean)
          } else if (line.includes('MISSING SKILLS:')) {
            missingSkills = line.replace('MISSING SKILLS:', '').split(',').map(s => s.trim()).filter(Boolean)
          } else if (line.includes('RECOMMENDATIONS:')) {
            suggestions.push(line.replace('RECOMMENDATIONS:', '').trim())
          } else if (line.trim() && !line.includes(':')) {
            suggestions.push(line.trim())
          }
        })
      }

      // Calculate keyword match
      const cvText = getCVText(cvData).toLowerCase()
      const matchedKeywords = extractedKeywords.filter(keyword => 
        cvText.includes(keyword.toLowerCase())
      )
      const missingKeywords = extractedKeywords.filter(keyword => 
        !cvText.includes(keyword.toLowerCase())
      )

      const keywordScore = extractedKeywords.length > 0
        ? Math.round((matchedKeywords.length / extractedKeywords.length) * 100)
        : 0

      const skillScore = [...hasSkills, ...missingSkills].length > 0
        ? Math.round((hasSkills.length / (hasSkills.length + missingSkills.length)) * 100)
        : 0

      setAIAnalysis({
        keywordMatch: {
          matched: matchedKeywords,
          missing: missingKeywords,
          score: keywordScore,
        },
        skillGapAnalysis: {
          hasSkills,
          missingSkills,
          score: skillScore,
        },
        contentSuggestions: suggestions.filter(Boolean),
      })
    } catch (error) {
      console.error('AI ATS analysis error:', error)
      setAIAnalysis(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getWarningsForSection = (section: string) => {
    if (!analysisResult) return []
    
    const allIssues = [
      ...analysisResult.criticalIssues,
      ...analysisResult.warnings,
    ]

    // Filter by section based on check ID or category
    return allIssues.filter(issue => {
      const idLower = issue.id.toLowerCase()
      const sectionLower = section.toLowerCase()
      
      if (sectionLower === 'personal' || sectionLower === 'contact') {
        return issue.category === 'contact'
      }
      if (sectionLower === 'experience' || sectionLower === 'work') {
        return idLower.includes('experience') || idLower.includes('action')
      }
      if (sectionLower === 'skills') {
        return idLower.includes('skill')
      }
      if (sectionLower === 'education') {
        return idLower.includes('education')
      }
      
      return false
    })
  }

  return (
    <ATSContext.Provider
      value={{
        analysisResult,
        aiAnalysis,
        config,
        jobDescription,
        isAnalyzing,
        setJobDescription,
        updateConfig,
        runAnalysis,
        runAIAnalysis,
        getWarningsForSection,
      }}
    >
      {children}
    </ATSContext.Provider>
  )
}

export function useATS() {
  const context = useContext(ATSContext)
  if (context === undefined) {
    throw new Error('useATS must be used within an ATSProvider')
  }
  return context
}

// Helper function to extract all text from CV
function getCVText(cvData: CVState): string {
  const parts: string[] = []
  
  parts.push(cvData.personalInfo.fullName)
  parts.push(cvData.personalInfo.jobTitle)
  parts.push(cvData.personalInfo.summary)
  
  cvData.workExperience.forEach(exp => {
    parts.push(exp.position)
    parts.push(exp.company)
    parts.push(exp.description)
    parts.push(...exp.achievements)
  })
  
  cvData.education.forEach(edu => {
    parts.push(edu.degree)
    parts.push(edu.field)
    parts.push(edu.institution)
  })
  
  cvData.skills.forEach(skill => {
    parts.push(skill.name)
  })
  
  cvData.projects.forEach(proj => {
    parts.push(proj.name)
    parts.push(proj.description)
    parts.push(...proj.technologies)
  })
  
  return parts.join(' ')
}
