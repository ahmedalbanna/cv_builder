import PersonalInfoForm from './forms/PersonalInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import CertificationsForm from './forms/CertificationsForm'
import ProjectsForm from './forms/ProjectsForm'
import LanguagesForm from './forms/LanguagesForm'
import DraggableSection from './DraggableSection'
import { useCV } from '../contexts/CVContext'
import { SectionType } from '../types/cv'
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

const sectionComponents: Record<SectionType, React.ComponentType> = {
  workExperience: WorkExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  certifications: CertificationsForm,
  languages: LanguagesForm,
}

const sectionTitles: Record<SectionType, string> = {
  workExperience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
}

export default function CVForm() {
  const { cvData, updateSectionOrder } = useCV()
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = cvData.sectionOrder.indexOf(active.id as SectionType)
      const newIndex = cvData.sectionOrder.indexOf(over.id as SectionType)
      
      const newOrder = arrayMove(cvData.sectionOrder, oldIndex, newIndex)
      updateSectionOrder(newOrder)
    }
  }

  return (
    <div className="space-y-4">
      {/* Personal Info - Always first, not draggable */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
        <PersonalInfoForm />
      </div>

      {/* Draggable Sections */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          {cvData.sectionOrder.map((sectionId) => {
            const Component = sectionComponents[sectionId]
            const title = sectionTitles[sectionId]
            
            return (
              <DraggableSection key={sectionId} id={sectionId} title={title}>
                <Component />
              </DraggableSection>
            )
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}
