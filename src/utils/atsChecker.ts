import { CVState } from '../types/cv'
import { ATSAnalysisResult, ATSCheck, ATSCategoryScore, ATSConfig } from '../types/ats'

// Common action verbs for job descriptions
const ACTION_VERBS = [
  'achieved', 'developed', 'implemented', 'managed', 'led', 'created', 'designed',
  'improved', 'increased', 'reduced', 'optimized', 'launched', 'built', 'established',
  'coordinated', 'executed', 'delivered', 'spearheaded', 'streamlined', 'analyzed'
]

export function analyzeCV(cvData: CVState, config: ATSConfig, t?: (key: string, options?: any) => string | undefined): ATSAnalysisResult {
  // Fallback translation function if not provided
  const translate = (key: string, options?: string | any): string => {
    if (t) {
      // If options is a string, use it as default value
      if (typeof options === 'string') {
        const result = t(key)
        return result || options || key
      }
      // If options is an object, pass it for interpolation
      const result = t(key, options)
      return result || key
    }
    return typeof options === 'string' ? options : key
  }
  const checks: ATSCheck[] = []
  
  // Run all checks
  checks.push(...checkContactInfo(cvData, translate))
  checks.push(...checkKeywords(cvData, config, translate))
  checks.push(...checkFormatting(cvData, translate))
  checks.push(...checkContent(cvData, translate))
  checks.push(...checkSections(cvData, translate))
  
  // Group by category
  const categoryScores = calculateCategoryScores(checks, translate)
  
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

function checkContactInfo(cvData: CVState, t: (key: string, options?: string | any) => string): ATSCheck[] {
  const checks: ATSCheck[] = []
  const { personalInfo } = cvData
  
  // Email check
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
  checks.push({
    id: 'contact-email',
    category: 'contact',
    name: t('ats.checks.validEmail', 'Valid Email'),
    passed: emailValid,
    severity: 'critical',
    message: emailValid ? t('ats.messages.emailValid', 'Email format is valid') : t('ats.messages.emailInvalid', 'Email is missing or invalid'),
    suggestion: t('ats.suggestions.professionalEmail', 'Use a professional email address (e.g., firstname.lastname@email.com)'),
    score: emailValid ? 100 : 0,
  })
  
  // Phone check
  const phoneValid = personalInfo.phone.length >= 10
  checks.push({
    id: 'contact-phone',
    category: 'contact',
    name: t('ats.checks.phoneNumber', 'Phone Number'),
    passed: phoneValid,
    severity: 'critical',
    message: personalInfo.phone ? t('ats.messages.phoneProvided', 'Phone number provided') : t('ats.messages.phoneMissing', 'Phone number is missing'),
    suggestion: t('ats.suggestions.includePhone', 'Include a phone number with area code'),
    score: phoneValid ? 100 : 0,
  })
  
  // Location check
  const locationValid = personalInfo.location.length > 0
  checks.push({
    id: 'contact-location',
    category: 'contact',
    name: t('ats.checks.location', 'Location'),
    passed: locationValid,
    severity: 'warning',
    message: locationValid ? t('ats.messages.locationProvided', 'Location provided') : t('ats.messages.locationMissing', 'Location is missing'),
    suggestion: t('ats.suggestions.includeLocation', 'Include at least city and state/country'),
    score: locationValid ? 100 : 0,
  })
  
  // LinkedIn check
  const linkedinValid = !!personalInfo.linkedin
  checks.push({
    id: 'contact-linkedin',
    category: 'contact',
    name: t('ats.checks.linkedinProfile', 'LinkedIn Profile'),
    passed: linkedinValid,
    severity: 'info',
    message: linkedinValid ? t('ats.messages.linkedinIncluded', 'LinkedIn profile included') : t('ats.messages.linkedinOptional', 'Consider adding LinkedIn profile'),
    suggestion: t('ats.suggestions.addLinkedin', 'Add your LinkedIn URL for better visibility'),
    score: linkedinValid ? 100 : 50,
  })
  
  return checks
}

function checkKeywords(cvData: CVState, _config: ATSConfig, t: (key: string, options?: string | any) => string): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Get all text from CV
  const cvText = getAllText(cvData).toLowerCase()
  const wordCount = cvText.split(/\s+/).length
  
  // Check for skill keywords
  const skillKeywords = cvData.skills.map(s => s.name.toLowerCase())
  const skillMentions = skillKeywords.filter(skill => cvText.includes(skill)).length
  const skillsValid = skillMentions >= cvData.skills.length * 0.7
  
  checks.push({
    id: 'keywords-skills',
    category: 'keywords',
    name: t('ats.checks.skillKeywords', 'Skill Keywords'),
    passed: skillsValid,
    severity: 'warning',
    message: t('ats.messages.skillsMentioned', { count: skillMentions, total: cvData.skills.length }),
    suggestion: t('ats.suggestions.incorporateSkills', 'Incorporate your listed skills naturally throughout your experience descriptions'),
    score: cvData.skills.length > 0 ? Math.round((skillMentions / cvData.skills.length) * 100) : 100,
  })
  
  // Check keyword density (should be 1-3%)
  const uniqueKeywords = new Set([...skillKeywords]).size
  const keywordDensity = (uniqueKeywords / wordCount) * 100
  const densityValid = keywordDensity >= 1 && keywordDensity <= 3
  
  checks.push({
    id: 'keywords-density',
    category: 'keywords',
    name: t('ats.checks.keywordDensity', 'Keyword Density'),
    passed: densityValid,
    severity: 'info',
    message: t('ats.messages.keywordDensity', { density: keywordDensity.toFixed(1) }),
    suggestion: t('ats.suggestions.keywordDensity', 'Aim for 1-3% keyword density for optimal ATS performance'),
    score: densityValid ? 100 : 60,
  })
  
  return checks
}

function checkFormatting(cvData: CVState, t: (key: string, options?: string | any) => string): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Check for standard section headings
  const hasWorkExperience = cvData.workExperience.length > 0
  const hasEducation = cvData.education.length > 0
  const hasSkills = cvData.skills.length > 0
  const sectionsValid = hasWorkExperience && hasEducation && hasSkills
  
  checks.push({
    id: 'format-sections',
    category: 'formatting',
    name: t('ats.checks.standardSections', 'Standard Sections'),
    passed: sectionsValid,
    severity: 'warning',
    message: t('ats.messages.standardSections', 'CV contains standard sections (Experience, Education, Skills)'),
    suggestion: t('ats.suggestions.includeAllSections', 'Include all standard CV sections for better ATS compatibility'),
    score: [hasWorkExperience, hasEducation, hasSkills].filter(Boolean).length * 33,
  })
  
  // Check summary length
  const summaryLength = cvData.personalInfo.summary.length
  const summaryOptimal = summaryLength >= 100 && summaryLength <= 300
  
  checks.push({
    id: 'format-summary',
    category: 'formatting',
    name: t('ats.checks.professionalSummary', 'Professional Summary'),
    passed: summaryOptimal,
    severity: 'info',
    message: t('ats.messages.summaryLength', { length: summaryLength }),
    suggestion: t('ats.suggestions.summaryLength', 'Keep professional summary between 100-300 characters (2-4 sentences)'),
    score: summaryOptimal ? 100 : summaryLength > 0 ? 70 : 0,
  })
  
  return checks
}

function checkContent(cvData: CVState, t: (key: string, options?: string | any) => string): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Check for action verbs in experience
  const experienceText = cvData.workExperience
    .map(exp => exp.description.toLowerCase())
    .join(' ')
  
  const actionVerbsUsed = ACTION_VERBS.filter(verb => experienceText.includes(verb))
  const actionVerbScore = Math.min((actionVerbsUsed.length / 5) * 100, 100)
  const verbsValid = actionVerbsUsed.length >= 3
  
  checks.push({
    id: 'content-action-verbs',
    category: 'content',
    name: t('ats.checks.actionVerbs', 'Action Verbs'),
    passed: verbsValid,
    severity: 'warning',
    message: t('ats.messages.actionVerbsFound', { count: actionVerbsUsed.length }),
    suggestion: t('ats.suggestions.useActionVerbs', 'Start bullet points with strong action verbs (achieved, developed, led, etc.)'),
    score: actionVerbScore,
  })
  
  // Check for quantifiable achievements
  const hasNumbers = /\d+/.test(experienceText)
  const hasPercentage = /%/.test(experienceText)
  const metricsValid = hasNumbers || hasPercentage
  
  checks.push({
    id: 'content-metrics',
    category: 'content',
    name: t('ats.checks.quantifiableAchievements', 'Quantifiable Achievements'),
    passed: metricsValid,
    severity: 'info',
    message: metricsValid ? t('ats.messages.metricsIncluded', 'Includes quantifiable metrics') : t('ats.messages.noMetrics', 'No metrics found'),
    suggestion: t('ats.suggestions.addMetrics', 'Add numbers, percentages, or metrics to demonstrate impact'),
    score: metricsValid ? 100 : 40,
  })
  
  return checks
}

function checkSections(cvData: CVState, t: (key: string, options?: string | any) => string): ATSCheck[] {
  const checks: ATSCheck[] = []
  
  // Check experience completeness
  const experienceComplete = cvData.workExperience.every(exp => 
    exp.company && exp.position && exp.startDate && exp.description
  )
  const expValid = experienceComplete && cvData.workExperience.length > 0
  
  checks.push({
    id: 'sections-experience',
    category: 'sections',
    name: t('ats.checks.workExperienceCompleteness', 'Work Experience Completeness'),
    passed: expValid,
    severity: 'warning',
    message: experienceComplete ? t('ats.messages.experienceComplete', 'All experience entries are complete') : t('ats.messages.experienceIncomplete', 'Some experience entries are incomplete'),
    suggestion: t('ats.suggestions.fillExperienceFields', 'Fill in all required fields: company, position, dates, and description'),
    score: expValid ? 100 : 50,
  })
  
  // Check education completeness
  const educationComplete = cvData.education.every(edu => 
    edu.institution && edu.degree && edu.field
  )
  const eduValid = educationComplete && cvData.education.length > 0
  
  checks.push({
    id: 'sections-education',
    category: 'sections',
    name: t('ats.checks.educationCompleteness', 'Education Completeness'),
    passed: eduValid,
    severity: 'info',
    message: educationComplete ? t('ats.messages.educationComplete', 'All education entries are complete') : t('ats.messages.educationIncomplete', 'Some education entries are incomplete'),
    suggestion: t('ats.suggestions.fillEducationFields', 'Include institution, degree, and field of study'),
    score: eduValid ? 100 : 70,
  })
  
  // Check skills count
  const hasEnoughSkills = cvData.skills.length >= 5
  
  checks.push({
    id: 'sections-skills',
    category: 'sections',
    name: t('ats.checks.skillsSection', 'Skills Section'),
    passed: hasEnoughSkills,
    severity: 'info',
    message: t('ats.messages.skillsCount', { count: cvData.skills.length }),
    suggestion: t('ats.suggestions.listSkills', 'List at least 5-10 relevant skills'),
    score: Math.min((cvData.skills.length / 8) * 100, 100),
  })
  
  return checks
}

function calculateCategoryScores(checks: ATSCheck[], t?: (key: string, options?: string | any) => string): ATSCategoryScore[] {
  const translate = t || ((key: string, options?: string | any): string => typeof options === 'string' ? options : key)
  
  const categories: ATSCategoryScore[] = [
    { category: 'contact', categoryName: translate('ats.checkCategories.contactInformation', 'Contact Information'), score: 0, passed: 0, total: 0, checks: [] },
    { category: 'keywords', categoryName: translate('ats.checkCategories.keywordsAndSkills', 'Keywords & Skills'), score: 0, passed: 0, total: 0, checks: [] },
    { category: 'formatting', categoryName: translate('ats.checkCategories.formatting', 'Formatting'), score: 0, passed: 0, total: 0, checks: [] },
    { category: 'content', categoryName: translate('ats.checkCategories.contentQuality', 'Content Quality'), score: 0, passed: 0, total: 0, checks: [] },
    { category: 'sections', categoryName: translate('ats.checkCategories.sectionCompleteness', 'Section Completeness'), score: 0, passed: 0, total: 0, checks: [] },
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
