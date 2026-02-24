import { useCV } from '../contexts/CVContext'
import { TemplateType } from '../types/cv'
import { Check } from 'lucide-react'

export default function TemplateSelector() {
  const { cvData, setTemplate } = useCV()

  const templates: { id: TemplateType; name: string; description: string }[] = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary' },
    { id: 'classic', name: 'Classic', description: 'Traditional and timeless' },
    { id: 'creative', name: 'Creative', description: 'Bold and colorful' },
    { id: 'minimalist', name: 'Minimalist', description: 'Simple and elegant' },
    { id: 'professional', name: 'Professional', description: 'Corporate and polished' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' },
    { id: 'tech', name: 'Tech', description: 'Developer-focused terminal style' },
  ]

  return (
    <div>
      <label className="label-text mb-2">Choose Template</label>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`relative px-4 py-3 rounded-lg border-2 transition-all text-left ${
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
