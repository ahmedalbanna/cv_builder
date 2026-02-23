import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { useAI } from '../../contexts/AIContext'
import { generateId } from '../../utils/helpers'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { Project } from '../../types/cv'
import { useTranslation } from 'react-i18next'
import AISuggestionButton from '../AISuggestionButton'
import AISuggestionPanel from '../AISuggestionPanel'

export default function ProjectsForm() {
  const { cvData, addProject, updateProject, deleteProject } = useCV()
  const { getSuggestion, isConnected } = useAI()
  const { t } = useTranslation()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [techInput, setTechInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggestionError, setSuggestionError] = useState<string | null>(null)

  const resetForm = () => {
    setFormData({})
    setIsAdding(false)
    setEditingId(null)
    setTechInput('')
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.description) return

    const data: Project = {
      id: editingId || generateId(),
      name: formData.name || '',
      description: formData.description || '',
      technologies: formData.technologies || [],
      url: formData.url,
      github: formData.github,
      startDate: formData.startDate || '',
      endDate: formData.endDate,
    }

    if (editingId) {
      updateProject(editingId, data)
    } else {
      addProject(data)
    }
    resetForm()
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setEditingId(project.id)
    setIsAdding(true)
  }

  const addTechnology = () => {
    if (!techInput.trim()) return
    const technologies = formData.technologies || []
    setFormData({ ...formData, technologies: [...technologies, techInput.trim()] })
    setTechInput('')
  }

  const removeTechnology = (index: number) => {
    const technologies = formData.technologies || []
    setFormData({
      ...formData,
      technologies: technologies.filter((_, i) => i !== index),
    })
  }

  const handleGetAISuggestions = async () => {
    setSuggestionError(null)
    const response = await getSuggestion({
      promptType: 'improveProjectDescription',
      params: {
        projectName: formData.name || 'Project',
        currentDescription: formData.description || '',
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
    setFormData({ ...formData, description: suggestion })
  }

  return (
    <div className="space-y-4">
      {cvData.projects.map((project) => (
        <div key={project.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {(project.url || project.github) && (
                <div className="flex gap-3 mt-2 text-xs text-primary-600">
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="p-1 text-gray-500 hover:text-primary-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                className="p-1 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('projects.addProject')}
        </button>
      )}

      {isAdding && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
          <div>
            <label className="label-text">{t('projects.projectName')} *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder={t('projects.placeholders.projectName')}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="label-text">{t('projects.description')} *</label>
              {isConnected && formData.name && (
                <AISuggestionButton
                  onClick={handleGetAISuggestions}
                  size="sm"
                  label="Improve with AI"
                />
              )}
            </div>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field resize-none"
              rows={3}
              placeholder={t('projects.placeholders.description')}
            />
            {!isConnected && (
              <p className="text-xs text-gray-500 mt-1">
                💡 Connect to Ollama to get AI-powered description suggestions
              </p>
            )}
          </div>

          <div>
            <label className="label-text">{t('projects.technologies')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                className="input-field"
                placeholder={t('projects.placeholders.technologies')}
              />
              <button
                onClick={addTechnology}
                className="btn-secondary"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.technologies && formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {tech}
                    <button onClick={() => removeTechnology(idx)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">{t('projects.projectUrl')}</label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="input-field"
                placeholder={t('projects.placeholders.projectUrl')}
              />
            </div>
            <div>
              <label className="label-text">GitHub URL</label>
              <input
                type="url"
                value={formData.github || ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="input-field"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
              <Check className="w-4 h-4" />
              {editingId ? t('actions.save') : t('actions.add')}
            </button>
            <button onClick={resetForm} className="btn-secondary flex items-center gap-2">
              <X className="w-4 h-4" />
              {t('actions.cancel')}
            </button>
          </div>
        </div>
      )}

      <AISuggestionPanel
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        suggestions={suggestions}
        onApply={handleApplySuggestion}
        onRetry={handleGetAISuggestions}
        title="AI Project Description Suggestions"
        error={suggestionError}
      />
    </div>
  )
}
