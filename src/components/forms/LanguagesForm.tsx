import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { generateId } from '../../utils/helpers'
import { Plus, Trash2 } from 'lucide-react'
import { Language } from '../../types/cv'

export default function LanguagesForm() {
  const { cvData, addLanguage, deleteLanguage } = useCV()
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
    native: 'Native',
    fluent: 'Fluent',
    professional: 'Professional',
    intermediate: 'Intermediate',
    basic: 'Basic',
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="label-text">Language</label>
          <input
            type="text"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
            className="input-field"
            placeholder="e.g., English, Spanish"
          />
        </div>
        <div>
          <label className="label-text">Proficiency</label>
          <select
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value as Language['proficiency'])}
            className="input-field"
          >
            <option value="native">Native</option>
            <option value="fluent">Fluent</option>
            <option value="professional">Professional</option>
            <option value="intermediate">Intermediate</option>
            <option value="basic">Basic</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Language
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
          No languages added yet. Add your first language above!
        </p>
      )}
    </div>
  )
}
