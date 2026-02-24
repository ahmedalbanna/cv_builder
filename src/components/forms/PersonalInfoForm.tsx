import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { useAI } from '../../contexts/AIContext'
import { useATS } from '../../contexts/ATSContext'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AISuggestionButton from '../AISuggestionButton'
import AISuggestionPanel from '../AISuggestionPanel'
import ATSWarning from '../ats/ATSWarning'
import PhotoUpload from '../PhotoUpload'

export default function PersonalInfoForm() {
  const { cvData, updatePersonalInfo } = useCV()
  const { getSuggestion, isConnected } = useAI()
  const { getWarningsForSection } = useATS()
  const { personalInfo } = cvData
  const { t } = useTranslation()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggestionError, setSuggestionError] = useState<string | null>(null)
  
  const atsWarnings = getWarningsForSection('contact')

  const handleGetAISuggestions = async () => {
    setSuggestionError(null)
    
    // Calculate years of experience from work history
    const yearsOfExperience = cvData.workExperience.length > 0 
      ? `${cvData.workExperience.length}+ years` 
      : 'Several years'
    
    const response = await getSuggestion({
      promptType: 'professionalSummary',
      params: {
        jobTitle: personalInfo.jobTitle || 'Professional',
        experience: yearsOfExperience,
      },
    })

    if (response.success) {
      setSuggestions([response.content])
      setShowSuggestions(true)
    } else {
      setSuggestionError(response.error || 'Failed to generate suggestions')
      setShowSuggestions(true)
    }
  }

  const handleApplySuggestion = (suggestion: string) => {
    updatePersonalInfo({ summary: suggestion })
  }

  return (
    <div className="space-y-4">
      {atsWarnings.length > 0 && (
        <div className="space-y-2">
          {atsWarnings.map(warning => (
            <ATSWarning key={warning.id} check={warning} compact />
          ))}
        </div>
      )}

      {/* Photo Upload */}
      <PhotoUpload
        photo={personalInfo.photo}
        onPhotoChange={(photo) => updatePersonalInfo({ photo })}
        onPhotoRemove={() => updatePersonalInfo({ photo: undefined })}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">{t('personalInfo.fullName')} *</label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.fullName')}
            required
          />
        </div>
        <div>
          <label className="label-text">{t('personalInfo.jobTitle')} *</label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.jobTitle')}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">
            <Mail className="w-4 h-4 inline mr-1" />
            {t('personalInfo.email')} *
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.email')}
            required
          />
        </div>
        <div>
          <label className="label-text">
            <Phone className="w-4 h-4 inline mr-1" />
            {t('personalInfo.phone')} *
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.phone')}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">
            <MapPin className="w-4 h-4 inline mr-1" />
            {t('personalInfo.location')} *
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.location')}
            required
          />
        </div>
        <div>
          <label className="label-text">
            <Globe className="w-4 h-4 inline mr-1" />
            {t('personalInfo.website')}
          </label>
          <input
            type="url"
            value={personalInfo.website || ''}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.website')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">
            <Linkedin className="w-4 h-4 inline mr-1" />
            {t('personalInfo.linkedin')}
          </label>
          <input
            type="url"
            value={personalInfo.linkedin || ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.linkedin')}
          />
        </div>
        <div>
          <label className="label-text">
            <Github className="w-4 h-4 inline mr-1" />
            {t('personalInfo.github')}
          </label>
          <input
            type="url"
            value={personalInfo.github || ''}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            className="input-field"
            placeholder={t('personalInfo.placeholders.github')}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="label-text">{t('personalInfo.summary')} *</label>
          {isConnected && personalInfo.jobTitle && (
            <AISuggestionButton
              onClick={handleGetAISuggestions}
              size="sm"
              label="Generate with AI"
            />
          )}
        </div>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          className="input-field resize-none"
          rows={5}
          placeholder={t('personalInfo.placeholders.summary')}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {personalInfo.summary.length} / 500 characters
        </p>
        {!isConnected && (
          <p className="text-xs text-gray-500 mt-1">
            💡 Connect to Ollama to get AI-powered professional summary suggestions
          </p>
        )}
      </div>

      <AISuggestionPanel
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        suggestions={suggestions}
        onApply={handleApplySuggestion}
        onRetry={handleGetAISuggestions}
        title="AI Professional Summary Suggestions"
        error={suggestionError}
      />
    </div>
  )
}
