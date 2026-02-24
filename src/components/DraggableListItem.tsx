import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Edit2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  id: string
  children: React.ReactNode
  onEdit?: () => void
  onDelete?: () => void
}

export default function DraggableListItem({ id, children, onEdit, onDelete }: Props) {
  const { t } = useTranslation()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card mb-4 ${isDragging ? 'shadow-xl ring-2 ring-primary-400' : ''}`}
    >
      <div className="flex gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors pt-1"
          aria-label={t('ui.dragToReorder')}
        >
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
              aria-label="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
