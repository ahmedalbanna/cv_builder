import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { generateId } from '../../utils/helpers'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { WorkExperience } from '../../types/cv'

export default function WorkExperienceForm() {
  const { cvData, addWorkExperience, updateWorkExperience, deleteWorkExperience } = useCV()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<WorkExperience>>({})

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

  return (
    <div className="space-y-4">
      {cvData.workExperience.map((exp) => (
        <div key={exp.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{exp.position}</h3>
              <p className="text-gray-700">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              {exp.description && (
                <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(exp)}
                className="p-1 text-gray-500 hover:text-primary-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteWorkExperience(exp.id)}
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
          Add Work Experience
        </button>
      )}

      {isAdding && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">Company *</label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-field"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="label-text">Position *</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="input-field"
                placeholder="Job Title"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input-field"
              placeholder="City, Country"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">Start Date *</label>
              <input
                type="month"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">End Date</label>
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
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>
            </div>
          </div>

          <div>
            <label className="label-text">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field resize-none"
              rows={4}
              placeholder="Describe your role, responsibilities, and key achievements..."
            />
          </div>

          <div className="flex gap-2">
            <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
              <Check className="w-4 h-4" />
              {editingId ? 'Update' : 'Add'}
            </button>
            <button onClick={resetForm} className="btn-secondary flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
