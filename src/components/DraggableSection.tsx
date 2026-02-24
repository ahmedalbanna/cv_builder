import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface DraggableSectionProps {
  id: string
  title: string
  children: ReactNode
}

export default function DraggableSection({ id, title, children }: DraggableSectionProps) {
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
    <div ref={setNodeRef} style={style} className="mb-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
              title={t('ui.dragToReorder')}
            >
              <GripVertical className="w-5 h-5 text-gray-400" />
            </button>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  )
}
