import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Briefcase, Sparkles, X, Check } from 'lucide-react'
import { JobDescription } from '../../types/ats'
import { useAI } from '../../contexts/AIContext'

interface JobDescriptionInputProps {
  onSave: (job: JobDescription | null) => void
  currentJob: JobDescription | null
}

export default function JobDescriptionInput({ onSave, currentJob }: JobDescriptionInputProps) {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const { isConnected } = useAI()
  const [isEditing, setIsEditing] = useState(!currentJob)
  const [formData, setFormData] = useState<Partial<JobDescription>>(
    currentJob || { title: '', description: '' }
  )

  const handleSave = () => {
    if (formData.title && formData.description) {
      onSave(formData as JobDescription)
      setIsEditing(false)
    }
  }

  const handleClear = () => {
    setFormData({ title: '', description: '' })
    onSave(null)
    setIsEditing(false)
  }

  if (!isEditing && currentJob) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''} justify-between mb-2`}>
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-2`}>
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">{currentJob.title}</h4>
          </div>
          <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-2 ${isRTL ? 'ml-4' : 'ml-0'}`}>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {t('ats.edit')}
            </button>
            <button
              onClick={handleClear}
              className={`text-sm text-gray-500 hover:text-gray-700 ${isRTL ? 'ml-2' : ''}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{currentJob.description}</p>
        {isConnected && (
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-2 mt-2 text-xs text-purple-600`}>
            <Sparkles className="w-3 h-3" />
            <span>{t('ats.aiAnalysisEnabled')}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-2 mb-3`}>
        <Briefcase className="w-5 h-5 text-purple-600" />
        <h4 className={`font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('ats.targetJob')}</h4>
      </div>
      
      <p className={`text-sm text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('ats.addJobDescription')}
      </p>

      <div className="space-y-3">
        <div>
          <label className="label-text">{t('ats.jobTitle')}</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder={t('ats.jobTitlePlaceholder')}
          />
        </div>

        <div>
          <label className="label-text">{t('ats.jobDescription')}</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field resize-none"
            rows={6}
            placeholder={t('ats.jobDescriptionPlaceholder')}
          />
          <p className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('ats.jobDescriptionHelper')}
          </p>
        </div>

        {!isConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className={`text-sm text-yellow-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('ats.connectOllamaMessage')}
            </p>
          </div>
        )}

        <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} gap-2`}>
          <button
            onClick={handleSave}
            disabled={!formData.title || !formData.description}
            className={`btn-primary flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'ml-2' : ''}`}
          >
            <Check className="w-4 h-4" />
            {t('ats.saveAndAnalyze')}
          </button>
          {currentJob && (
            <button onClick={() => setIsEditing(false)} className="btn-secondary">
              {t('ats.cancel')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
