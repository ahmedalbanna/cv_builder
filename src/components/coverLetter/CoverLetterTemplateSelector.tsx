import { useCoverLetter } from '../../contexts/CoverLetterContext'
import { CoverLetterTemplateType } from '../../types/coverLetter'
import { FileText, Sparkles, Minimize2 } from 'lucide-react'

export default function CoverLetterTemplateSelector() {
  const { coverLetterData, setTemplate } = useCoverLetter()

  const templates: { id: CoverLetterTemplateType; name: string; icon: typeof FileText; description: string }[] = [
    { 
      id: 'professional', 
      name: 'Professional', 
      icon: FileText,
      description: 'Traditional business format'
    },
    { 
      id: 'modern', 
      name: 'Modern', 
      icon: Sparkles,
      description: 'Contemporary with color'
    },
    { 
      id: 'simple', 
      name: 'Simple', 
      icon: Minimize2,
      description: 'Clean minimalist design'
    },
  ]

  return (
    <div className="flex gap-2">
      <span className="text-sm font-medium text-gray-700 self-center mr-2">Template:</span>
      {templates.map((template) => {
        const Icon = template.icon
        return (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
              coverLetterData.selectedTemplate === template.id
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
            title={template.description}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{template.name}</span>
          </button>
        )
      })}
    </div>
  )
}
