import { useState } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import CertificationsForm from './forms/CertificationsForm'
import ProjectsForm from './forms/ProjectsForm'
import LanguagesForm from './forms/LanguagesForm'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Section {
  id: string
  title: string
  component: React.ComponentType
  isOpen: boolean
}

export default function CVForm() {
  const [sections, setSections] = useState<Section[]>([
    { id: 'personal', title: 'Personal Information', component: PersonalInfoForm, isOpen: true },
    { id: 'experience', title: 'Work Experience', component: WorkExperienceForm, isOpen: true },
    { id: 'education', title: 'Education', component: EducationForm, isOpen: true },
    { id: 'skills', title: 'Skills', component: SkillsForm, isOpen: true },
    { id: 'projects', title: 'Projects', component: ProjectsForm, isOpen: false },
    { id: 'certifications', title: 'Certifications', component: CertificationsForm, isOpen: false },
    { id: 'languages', title: 'Languages', component: LanguagesForm, isOpen: false },
  ])

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, isOpen: !section.isOpen } : section
      )
    )
  }

  return (
    <div className="space-y-4">
      {sections.map(section => {
        const Component = section.component
        return (
          <div key={section.id} className="card">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between mb-4 text-left"
            >
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              {section.isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {section.isOpen && <Component />}
          </div>
        )
      })}
    </div>
  )
}
