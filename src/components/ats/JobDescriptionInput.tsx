import { useState } from 'react'
import { Briefcase, Sparkles, X, Check } from 'lucide-react'
import { JobDescription } from '../../types/ats'
import { useAI } from '../../contexts/AIContext'

interface JobDescriptionInputProps {
  onSave: (job: JobDescription | null) => void
  currentJob: JobDescription | null
}

export default function JobDescriptionInput({ onSave, currentJob }: JobDescriptionInputProps) {
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
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">{currentJob.title}</h4>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Edit
            </button>
            <button
              onClick={handleClear}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{currentJob.description}</p>
        {isConnected && (
          <div className="flex items-center gap-2 mt-2 text-xs text-purple-600">
            <Sparkles className="w-3 h-3" />
            <span>AI analysis enabled</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="w-5 h-5 text-purple-600" />
        <h4 className="font-semibold text-gray-900">Target Job (Optional)</h4>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Add a job description to get AI-powered keyword matching and skill gap analysis.
      </p>

      <div className="space-y-3">
        <div>
          <label className="label-text">Job Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div>
          <label className="label-text">Job Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field resize-none"
            rows={6}
            placeholder="Paste the job description here..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Include requirements, responsibilities, and desired skills for best results.
          </p>
        </div>

        {!isConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              💡 Connect to Ollama in AI Settings to enable advanced keyword matching and skill gap analysis.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!formData.title || !formData.description}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            Save & Analyze
          </button>
          {currentJob && (
            <button onClick={() => setIsEditing(false)} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
