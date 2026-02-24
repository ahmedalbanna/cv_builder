import { CVState } from '../types/cv'
import { ATSAnalysisResult, ATSCheck, ATSCategoryScore, ATSConfig } from '../types/ats'

// Common action verbs for job descriptions
const ACTION_VERBS = [
  'achieved', 'developed', 'implemented', 'managed', 'led', 'created', 'designed',
  'improved', 'increased', 'reduced', 'optimized', 'launched', 'built', 'established',
  'coordinated', 'executed', 'delivered', 'spearheaded', 'streamlined', 'analyzed'
]

export function analyzeCV(cvData: CVState, config: ATSConfig): ATSAnalysisResult {
  const checks: ATSCheck[] = []
  
  // Run all checks
  checks.push(...checkContactInfo(cvData))
  checks.push(...checkKeywords(cvData, config))
  checks.push(...checkFormatting(cvData))
  checks.push(...checkContent(cvData))
  checks.push(...checkSections(cvData))
  
  // Group by category
  const categoryScores = calculateCategoryScores(checks)
  
  // Calculate overall score
  const overallScore = Math.round(
    categoryScores.reduce((sum, cat) => sum + cat.score, 0) / categoryScores.length
  )
  
  // Determine grade
  let grade: ATSAnalysisResult['grade']
  if (overallScore >= 80) grade = 'excellent'
  else if (overallScore >= 60) grade = 'good'
  else if (overallScore >= 40) grade = 'fair'
  else grade = 'poor'
  
  // Separate issues by severity
  const criticalIssues = checks.filter(c => !c.passed && c.severity === 'critical')
  const warnings = checks.filter(c => !c.passed && c.severity === 'warning')
  const suggestions = checks.filter(c => !c.passed && c.severity === 'info')
  
  return {
    overallScore,
    grade,
    categoryScores,
    criticalIssues,
    warnings,
    suggestions,
    timestamp: new Date().toISOString(),
  }
}

function checkContactInfo(cvData: CVState): ATSCheck[] {
  const checks: ATSCheck[] = []
  const { personalInfo } = cvData
  
  // Email check
  checks.push({
    id: 'contact-email',
    category: 'contact',
    name: 'Valid Email',
    passed: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email),
    severity: 'critical',
    message: personalInfo.email ? 'Email format is valid' : 'Email is missing or invalid',
    suggestion: 'Use a professional email address (e.g., firstname.lastname@email.com)',
    score: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email) ? 100 : 0,
  })
  
  // Phone check
  checks.push({
    id: 'contact-phone',
    category: 'contact',
    name: 'Phone Number',
    passed: personalInfo.phone.length >= 10,
    severity: 'critical',
    message: personalInfo.phone ? 'Phone number provided' : 'Phone number is missing',
    suggestion: 'Include a phone number with area code',
    score: personalInfo.phone.length >= 10 ? 100 : 0,
  })
  
  // Location check
  checks.push({
    id: 'contact-location',
    category: 'contact',
    name: 'Location',
    passed: personalInfo.location.length > 0,
    severity: 'warning',
    message: personalInfo.location ? 'Location provided' : 'Location is missing',
    suggestion: 'Include at least city and state/country',
    score: personalInfo.location.length > 0 ? 100 : 0,
  })
  
  // LinkedIn check
  checks.push({
    id: 'contact-linkedin',
    category: 'contact',
    name: 'LinkedIn Profile',
    passed: !!personalInfo.linkedin,
    severity: 'info',
    message: personalInfo.linkedin ? 'LinkedIn profile included' : 'Consider adding LinkedIn profile',
    suggestion: 'Add your LinkedIn URL for better visibility',
    score: personalInfo.linkedin ? 100 : 50,
  })
  
  return checks
}

function checkKeywords(cvData: CVState, _config: ATSConfig): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Get all text from CV
  const cvText = getAllText(cvData).toLowerCase()
  const wordCount = cvText.split(/\s+/).length
  
  // Check for skill keywords
  const skillKeywords = cvData.skills.map(s => s.name.toLowerCase())
  const skillMentions = skillKeywords.filter(skill => cvText.includes(skill)).length
  
  checks.push({
    id: 'keywords-skills',
    category: 'keywords',
    name: 'Skill Keywords',
    passed: skillMentions >= cvData.skills.length * 0.7,
    severity: 'warning',
    message: `${skillMentions} of ${cvData.skills.length} skills mentioned in CV content`,
    suggestion: 'Incorporate your listed skills naturally throughout your experience descriptions',
    score: cvData.skills.length > 0 ? Math.round((skillMentions / cvData.skills.length) * 100) : 100,
  })
  
  // Check keyword density (should be 1-3%)
  const uniqueKeywords = new Set([...skillKeywords]).size
  const keywordDensity = (uniqueKeywords / wordCount) * 100
  
  checks.push({
    id: 'keywords-density',
    category: 'keywords',
    name: 'Keyword Density',
    passed: keywordDensity >= 1 && keywordDensity <= 3,
    severity: 'info',
    message: `Keyword density: ${keywordDensity.toFixed(1)}%`,
    suggestion: 'Aim for 1-3% keyword density for optimal ATS performance',
    score: keywordDensity >= 1 && keywordDensity <= 3 ? 100 : 60,
  })
  
  return checks
}

function checkFormatting(cvData: CVState): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Check for standard section headings
  const hasWorkExperience = cvData.workExperience.length > 0
  const hasEducation = cvData.education.length > 0
  const hasSkills = cvData.skills.length > 0
  
  checks.push({
    id: 'format-sections',
    category: 'formatting',
    name: 'Standard Sections',
    passed: hasWorkExperience && hasEducation && hasSkills,
    severity: 'warning',
    message: 'CV contains standard sections (Experience, Education, Skills)',
    suggestion: 'Include all standard CV sections for better ATS compatibility',
    score: [hasWorkExperience, hasEducation, hasSkills].filter(Boolean).length * 33,
  })
  
  // Check summary length
  const summaryLength = cvData.personalInfo.summary.length
  const summaryOptimal = summaryLength >= 100 && summaryLength <= 300
  
  checks.push({
    id: 'format-summary',
    category: 'formatting',
    name: 'Professional Summary',
    passed: summaryOptimal,
    severity: 'info',
    message: `Summary length: ${summaryLength} characters`,
    suggestion: 'Keep professional summary between 100-300 characters (2-4 sentences)',
    score: summaryOptimal ? 100 : summaryLength > 0 ? 70 : 0,
  })
  
  return checks
}

function checkContent(cvData: CVState): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Check for action verbs in experience
  const experienceText = cvData.workExperience
    .map(exp => exp.description.toLowerCase())
    .join(' ')
  
  const actionVerbsUsed = ACTION_VERBS.filter(verb => experienceText.includes(verb))
  const actionVerbScore = Math.min((actionVerbsUsed.length / 5) * 100, 100)
  
  checks.push({
    id: 'content-action-verbs',
    category: 'content',
    name: 'Action Verbs',
    passed: actionVerbsUsed.length >= 3,
    severity: 'warning',
    message: `${actionVerbsUsed.length} action verbs found in experience descriptions`,
    suggestion: 'Start bullet points with strong action verbs (achieved, developed, led, etc.)',
    score: actionVerbScore,
  })
  
  // Check for quantifiable achievements
  const hasNumbers = /\d+/.test(experienceText)
  const hasPercentage = /%/.test(experienceText)
  
  checks.push({
    id: 'content-metrics',
    category: 'content',
    name: 'Quantifiable Achievements',
    passed: hasNumbers || hasPercentage,
    severity: 'info',
    message: hasNumbers || hasPercentage ? 'Includes quantifiable metrics' : 'No metrics found',
    suggestion: 'Add numbers, percentages, or metrics to demonstrate impact',
    score: (hasNumbers || hasPercentage) ? 100 : 40,
  })
  
  return checks
}

function checkSections(cvData: CVState): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Check experience completeness
  const experienceComplete = cvData.workExperience.every(exp => 
    exp.company && exp.position && exp.startDate && exp.description
  )
  
  checks.push({
    id: 'sections-experience',
    category: 'sections',
    name: 'Work Experience Completeness',
    passed: experienceComplete && cvData.workExperience.length > 0,
    severity: 'warning',
    message: experienceComplete ? 'All experience entries are complete' : 'Some experience entries are incomplete',
    suggestion: 'Fill in all required fields: company, position, dates, and description',
    score: experienceComplete && cvData.workExperience.length > 0 ? 100 : 50,
  })
  
  // Check education completeness
  const educationComplete = cvData.education.every(edu => 
    edu.institution && edu.degree && edu.field
  )
  
  checks.push({
    id: 'sections-education',
    category: 'sections',
    name: 'Education Completeness',
    passed: educationComplete && cvData.education.length > 0,
    severity: 'info',
    message: educationComplete ? 'All education entries are complete' : 'Some education entries are incomplete',
    suggestion: 'Include institution, degree, and field of study',
    score: educationComplete && cvData.education.length > 0 ? 100 : 70,
  })
  
  // Check skills count
  const hasEnoughSkills = cvData.skills.length >= 5
  
  checks.push({
    id: 'sections-skills',
    category: 'sections',
    name: 'Skills Section',
    passed: hasEnoughSkills,
    severity: 'info',
    message: `${cvData.skills.length} skills listed`,
    suggestion: 'List at least 5-10 relevant skills',
    score: Math.min((cvData.skills.length / 8) * 100, 100),
  })
  
  return checks
}

function calculateCategoryScores(checks: ATSCheck[]): ATSCategoryScore[] {
  const categories: ATSCategoryScore[] = [
    { category: 'contact', categoryName: 'Contact Information', score: 0, passed: 0, total: 0, checks: [] },
    { category: 'keywords', categoryName: 'Keywords & Skills', score: 0, passed: 0, total: 0, checks: [] },
    { category: 'formatting', categoryName: 'Formatting', score: 0, passed: 0, total: 0, checks: [] },
    { category: 'content', categoryName: 'Content Quality', score: 0, passed: 0, total: 0, checks: [] },
    { category: 'sections', categoryName: 'Section Completeness', score: 0, passed: 0, total: 0, checks: [] },
  ]
  
  checks.forEach(check => {
    const category = categories.find(c => c.category === check.category)
    if (category) {
      category.checks.push(check)
      category.total++
      if (check.passed) category.passed++
    }
  })
  
  categories.forEach(category => {
    if (category.total > 0) {
      category.score = Math.round(
        category.checks.reduce((sum, check) => sum + check.score, 0) / category.total
      )
    }
  })
  
  return categories
}

function getAllText(cvData: CVState): string {
  const parts: string[] = []
  
  parts.push(cvData.personalInfo.fullName)
  parts.push(cvData.personalInfo.jobTitle)
  parts.push(cvData.personalInfo.summary)
  
  cvData.workExperience.forEach(exp => {
    parts.push(exp.position, exp.company, exp.description)
  })
  
  cvData.education.forEach(edu => {
    parts.push(edu.degree, edu.field, edu.institution)
  })
  
  cvData.skills.forEach(skill => {
    parts.push(skill.name)
  })
  
  cvData.projects.forEach(proj => {
    parts.push(proj.name, proj.description)
  })
  
  return parts.join(' ')
}
