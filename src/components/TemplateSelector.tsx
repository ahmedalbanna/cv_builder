import { useCV } from '../contexts/CVContext'
import { TemplateType } from '../types/cv'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function TemplateSelector() {
  const { cvData, setTemplate } = useCV()
  const { t } = useTranslation()

  const templates: { id: TemplateType; name: string; description: string }[] = [
    { id: 'modern', name: t('templates.modern'), description: t('templates.modernDesc') },
    { id: 'classic', name: t('templates.classic'), description: t('templates.classicDesc') },
    { id: 'creative', name: t('templates.creative'), description: t('templates.creativeDesc') },
  ]

  return (
    <div>
      <label className="label-text mb-2">{t('templates.title')}</label>
      <div className="flex gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`relative px-4 py-2 rounded-lg border-2 transition-all ${
              cvData.selectedTemplate === template.id
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400'
            }`}
          >
            {cvData.selectedTemplate === template.id && (
              <div className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full p-1">
                <Check className="w-3 h-3" />
              </div>
            )}
            <div className="font-semibold">{template.name}</div>
            <div className="text-xs mt-1 opacity-75">{template.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
