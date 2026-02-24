import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { generateId } from '../../utils/helpers'
import { Plus, Check, X } from 'lucide-react'
import { Certification } from '../../types/cv'
import { useTranslation } from 'react-i18next'
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

export default function CertificationsForm() {
  const { cvData, addCertification, updateCertification, deleteCertification, updateCVData } = useCV()
  const { t } = useTranslation()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Certification>>({})

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = cvData.certifications.findIndex((cert) => cert.id === active.id)
      const newIndex = cvData.certifications.findIndex((cert) => cert.id === over.id)

      const newOrder = arrayMove(cvData.certifications, oldIndex, newIndex)
      updateCVData({ certifications: newOrder })
    }
  }

  const resetForm = () => {
    setFormData({})
    setIsAdding(false)
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.issuer || !formData.date) return

    const data: Certification = {
      id: editingId || generateId(),
      name: formData.name || '',
      issuer: formData.issuer || '',
      date: formData.date || '',
      expiryDate: formData.expiryDate,
      credentialId: formData.credentialId,
      url: formData.url,
    }

    if (editingId) {
      updateCertification(editingId, data)
    } else {
      addCertification(data)
    }
    resetForm()
  }

  const handleEdit = (cert: Certification) => {
    setFormData(cert)
    setEditingId(cert.id)
    setIsAdding(true)
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.certifications.map(cert => cert.id)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.certifications.map((cert) => (
            <DraggableListItem
              key={cert.id}
              id={cert.id}
              onEdit={() => handleEdit(cert)}
              onDelete={() => deleteCertification(cert.id)}
            >
              <div>
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-gray-700">{cert.issuer}</p>
                <p className="text-sm text-gray-500">
                  Issued: {cert.date}
                  {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                </p>
                {cert.credentialId && (
                  <p className="text-xs text-gray-500 mt-1">ID: {cert.credentialId}</p>
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
          {t('certifications.addCertification')}
        </button>
      )}

      {isAdding && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">{t('certifications.certificationName')} *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder={t('certifications.placeholders.certificationName')}
              />
            </div>
            <div>
              <label className="label-text">{t('certifications.issuer')} *</label>
              <input
                type="text"
                value={formData.issuer || ''}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="input-field"
                placeholder={t('certifications.placeholders.issuer')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">{t('certifications.issueDate')} *</label>
              <input
                type="month"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">{t('certifications.expiryDate')}</label>
              <input
                type="month"
                value={formData.expiryDate || ''}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Credential ID</label>
            <input
              type="text"
              value={formData.credentialId || ''}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              className="input-field"
              placeholder="ABC123XYZ"
            />
          </div>

          <div>
            <label className="label-text">{t('certifications.credentialUrl')}</label>
            <input
              type="url"
              value={formData.url || ''}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="input-field"
              placeholder={t('certifications.placeholders.credentialUrl')}
            />
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
    </div>
  )
}
