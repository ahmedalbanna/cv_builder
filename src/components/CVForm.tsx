import PersonalInfoForm from './forms/PersonalInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import CertificationsForm from './forms/CertificationsForm'
import ProjectsForm from './forms/ProjectsForm'
import LanguagesForm from './forms/LanguagesForm'

export default function CVForm() {
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
        <PersonalInfoForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
        <WorkExperienceForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
        <EducationForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
        <SkillsForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
        <ProjectsForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
        <CertificationsForm />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Languages</h2>
        <LanguagesForm />
      </div>
    </div>
  )
}
