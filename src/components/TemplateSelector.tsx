import { useCV } from '../contexts/CVContext'
import { TemplateType } from '../types/cv'
import { Check } from 'lucide-react'

export default function TemplateSelector() {
  const { cvData, setTemplate } = useCV()

  const templates: { id: TemplateType; name: string; description: string }[] = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design with color accents' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
    { id: 'creative', name: 'Creative', description: 'Two-column design with sidebar' },
  ]

  return (
    <div>
      <label className="label-text mb-2">Select Template</label>
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
