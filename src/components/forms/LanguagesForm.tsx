import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { generateId } from '../../utils/helpers'
import { Plus, Trash2 } from 'lucide-react'
import { Language } from '../../types/cv'
import { useTranslation } from 'react-i18next'

export default function LanguagesForm() {
  const { cvData, addLanguage, deleteLanguage } = useCV()
  const { t } = useTranslation()
  const [languageName, setLanguageName] = useState('')
  const [proficiency, setProficiency] = useState<Language['proficiency']>('intermediate')

  const handleAdd = () => {
    if (!languageName.trim()) return

    const newLanguage: Language = {
      id: generateId(),
      name: languageName.trim(),
      proficiency,
    }

    addLanguage(newLanguage)
    setLanguageName('')
  }

  const proficiencyLabels = {
    native: t('languages.levels.native'),
    fluent: t('languages.levels.fluent') || 'Fluent',
    professional: t('languages.levels.professional'),
    intermediate: t('languages.levels.intermediate') || 'Intermediate',
    basic: t('languages.levels.basic'),
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="label-text">{t('languages.languageName')}</label>
          <input
            type="text"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
            className="input-field"
            placeholder={t('languages.placeholders.languageName')}
          />
        </div>
        <div>
          <label className="label-text">{t('languages.proficiency')}</label>
          <select
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value as Language['proficiency'])}
            className="input-field"
          >
            <option value="native">{t('languages.levels.native')}</option>
            <option value="fluent">{t('languages.levels.fluent') || 'Fluent'}</option>
            <option value="professional">{t('languages.levels.professional')}</option>
            <option value="intermediate">{t('languages.levels.intermediate') || 'Intermediate'}</option>
            <option value="basic">{t('languages.levels.basic')}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {t('languages.addLanguage')}
      </button>

      {cvData.languages.length > 0 && (
        <div className="space-y-2">
          {cvData.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div>
                <span className="font-medium text-gray-900">{lang.name}</span>
                <span className="ml-2 text-sm text-gray-600">
                  • {proficiencyLabels[lang.proficiency]}
                </span>
              </div>
              <button
                onClick={() => deleteLanguage(lang.id)}
                className="p-1 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {cvData.languages.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          {t('languages.noLanguages') || 'No languages added yet. Add your first language above!'}
        </p>
      )}
    </div>
  )
}
