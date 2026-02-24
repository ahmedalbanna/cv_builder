import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { useAI } from '../../contexts/AIContext'
import { useATS } from '../../contexts/ATSContext'
import { generateId } from '../../utils/helpers'
import { Plus, Check, X } from 'lucide-react'
import { WorkExperience } from '../../types/cv'
import { useTranslation } from 'react-i18next'
import AISuggestionButton from '../AISuggestionButton'
import AISuggestionPanel from '../AISuggestionPanel'
import ATSWarning from '../ats/ATSWarning'
import DraggableListItem from '../DraggableListItem'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

export default function WorkExperienceForm() {
  const { cvData, addWorkExperience, updateWorkExperience, deleteWorkExperience, updateCVData } = useCV()
  const { getSuggestion, isConnected } = useAI()
  const { getWarningsForSection } = useATS()
  const { t } = useTranslation()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<WorkExperience>>({})
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggestionError, setSuggestionError] = useState<string | null>(null)
  
  const atsWarnings = getWarningsForSection('experience')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = cvData.workExperience.findIndex((exp) => exp.id === active.id)
      const newIndex = cvData.workExperience.findIndex((exp) => exp.id === over.id)

      const newOrder = arrayMove(cvData.workExperience, oldIndex, newIndex)
      updateCVData({ workExperience: newOrder })
    }
  }

  const resetForm = () => {
    setFormData({})
    setIsAdding(false)
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (!formData.company || !formData.position || !formData.startDate) return

    const data: WorkExperience = {
      id: editingId || generateId(),
      company: formData.company || '',
      position: formData.position || '',
      location: formData.location || '',
      startDate: formData.startDate || '',
      endDate: formData.endDate || '',
      current: formData.current || false,
      description: formData.description || '',
      achievements: formData.achievements || [],
    }

    if (editingId) {
      updateWorkExperience(editingId, data)
    } else {
      addWorkExperience(data)
    }
    resetForm()
  }

  const handleEdit = (exp: WorkExperience) => {
    setFormData(exp)
    setEditingId(exp.id)
    setIsAdding(true)
  }

  const handleGetAISuggestions = async () => {
    setSuggestionError(null)
    const response = await getSuggestion({
      promptType: 'generateJobDescription',
      params: {
        jobTitle: formData.position || 'Professional',
        company: formData.company || 'Company',
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
      {atsWarnings.length > 0 && (
        <div className="space-y-2">
          {atsWarnings.map(warning => (
            <ATSWarning key={warning.id} check={warning} compact />
          ))}
        </div>
      )}
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.workExperience.map(exp => exp.id)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.workExperience.map((exp) => (
            <DraggableListItem
              key={exp.id}
              id={exp.id}
              onEdit={() => handleEdit(exp)}
              onDelete={() => deleteWorkExperience(exp.id)}
            >
              <div>
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {exp.location} • {exp.startDate} - {exp.current ? t('preview.present') : exp.endDate}
                </p>
                {exp.description && (
                  <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                )}
              </div>
            </DraggableListItem>
          ))}
        </SortableContext>
      </DndContext>

      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t('experience.addExperience')}
        </button>
      )}

      {isAdding && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">{t('experience.company')} *</label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-field"
                placeholder={t('experience.placeholders.company')}
              />
            </div>
            <div>
              <label className="label-text">{t('experience.position')} *</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="input-field"
                placeholder={t('experience.placeholders.position')}
              />
            </div>
          </div>

          <div>
            <label className="label-text">{t('personalInfo.location')}</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input-field"
              placeholder={t('personalInfo.placeholders.location')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">{t('experience.startDate')} *</label>
              <input
                type="month"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">{t('experience.endDate')}</label>
              <input
                type="month"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field"
                disabled={formData.current}
              />
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={formData.current || false}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{t('experience.currentJob')}</span>
              </label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="label-text">{t('experience.description')}</label>
              {isConnected && formData.position && formData.company && (
                <AISuggestionButton
                  onClick={handleGetAISuggestions}
                  size="sm"
                  label="Generate with AI"
                />
              )}
            </div>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field resize-none"
              rows={4}
              placeholder={t('experience.placeholders.description')}
            />
            {!isConnected && (
              <p className="text-xs text-gray-500 mt-1">
                💡 Connect to Ollama to get AI-powered suggestions
              </p>
            )}
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
        title="AI Job Description Suggestions"
        error={suggestionError}
      />
    </div>
  )
}
