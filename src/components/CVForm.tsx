import { useTranslation } from 'react-i18next'
import PersonalInfoForm from './forms/PersonalInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import CertificationsForm from './forms/CertificationsForm'
import ProjectsForm from './forms/ProjectsForm'
import LanguagesForm from './forms/LanguagesForm'

export default function CVForm() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cvForm.personalInfo')}</h2>
        <PersonalInfoForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cvForm.workExperience')}</h2>
        <WorkExperienceForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cvForm.education')}</h2>
        <EducationForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cvForm.skills')}</h2>
        <SkillsForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cvForm.projects')}</h2>
        <ProjectsForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cvForm.certifications')}</h2>
        <CertificationsForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('cvForm.languages')}</h2>
        <LanguagesForm />
      </div>
    </div>
  )
}
