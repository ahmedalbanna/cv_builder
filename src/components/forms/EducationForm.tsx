import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { generateId } from '../../utils/helpers'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { Education } from '../../types/cv'
import { useTranslation } from 'react-i18next'

export default function EducationForm() {
  const { cvData, addEducation, updateEducation, deleteEducation } = useCV()
  const { t } = useTranslation()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Education>>({})

  const resetForm = () => {
    setFormData({})
    setIsAdding(false)
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (!formData.institution || !formData.degree || !formData.startDate) return

    const data: Education = {
      id: editingId || generateId(),
      institution: formData.institution || '',
      degree: formData.degree || '',
      field: formData.field || '',
      location: formData.location || '',
      startDate: formData.startDate || '',
      endDate: formData.endDate || '',
      current: formData.current || false,
      gpa: formData.gpa,
      achievements: formData.achievements || [],
    }

    if (editingId) {
      updateEducation(editingId, data)
    } else {
      addEducation(data)
    }
    resetForm()
  }

  const handleEdit = (edu: Education) => {
    setFormData(edu)
    setEditingId(edu.id)
    setIsAdding(true)
  }

  return (
    <div className="space-y-4">
      {cvData.education.map((edu) => (
        <div key={edu.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
              <p className="text-gray-700">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                {edu.location} • {edu.startDate} - {edu.current ? t('preview.present') : edu.endDate}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(edu)}
                className="p-1 text-gray-500 hover:text-primary-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteEducation(edu.id)}
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
          {t('education.addEducation')}
        </button>
      )}

      {isAdding && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">{t('education.institution')} *</label>
              <input
                type="text"
                value={formData.institution || ''}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="input-field"
                placeholder={t('education.placeholders.institution')}
              />
            </div>
            <div>
              <label className="label-text">{t('education.degree')} *</label>
              <input
                type="text"
                value={formData.degree || ''}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="input-field"
                placeholder={t('education.placeholders.degree')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">{t('education.field')}</label>
              <input
                type="text"
                value={formData.field || ''}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="input-field"
                placeholder={t('education.placeholders.field')}
              />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label-text">{t('education.startDate')} *</label>
              <input
                type="month"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">{t('education.endDate')}</label>
              <input
                type="month"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field"
                disabled={formData.current}
              />
            </div>
            <div>
              <label className="label-text">GPA (optional)</label>
              <input
                type="text"
                value={formData.gpa || ''}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="input-field"
                placeholder="3.8/4.0"
              />
            </div>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.current || false}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">{t('education.currentlyStudying')}</span>
          </label>

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
    </div>
  )
}
