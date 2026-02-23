import { useCV } from '../../contexts/CVContext'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function PersonalInfoForm() {
  const { cvData, updatePersonalInfo } = useCV()
  const { personalInfo } = cvData
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
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
        <label className="label-text">{t('personalInfo.summary')} *</label>
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
      </div>
    </div>
  )
}
