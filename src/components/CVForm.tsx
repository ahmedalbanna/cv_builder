import { useState } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import CertificationsForm from './forms/CertificationsForm'
import ProjectsForm from './forms/ProjectsForm'
import LanguagesForm from './forms/LanguagesForm'
import ThemeSelector from './ThemeSelector'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Section {
  id: string
  titleKey: string
  component: React.ComponentType
  isOpen: boolean
}

export default function CVForm() {
  const { t } = useTranslation()
  
  const [sections, setSections] = useState<Section[]>([
    { id: 'personal', titleKey: 'personalInfo.title', component: PersonalInfoForm, isOpen: true },
    { id: 'experience', titleKey: 'experience.title', component: WorkExperienceForm, isOpen: true },
    { id: 'education', titleKey: 'education.title', component: EducationForm, isOpen: true },
    { id: 'skills', titleKey: 'skills.title', component: SkillsForm, isOpen: true },
    { id: 'projects', titleKey: 'projects.title', component: ProjectsForm, isOpen: false },
    { id: 'certifications', titleKey: 'certifications.title', component: CertificationsForm, isOpen: false },
    { id: 'languages', titleKey: 'languages.title', component: LanguagesForm, isOpen: false },
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
      {/* Theme Selector */}
      <ThemeSelector />
      
      {sections.map(section => {
        const Component = section.component
        return (
          <div key={section.id} className="card">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between mb-4 text-left"
            >
              <h2 className="text-xl font-semibold text-gray-800">{t(section.titleKey)}</h2>
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
