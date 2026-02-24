import { CVState } from '../../types/cv'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import { getDateRange } from '../../utils/helpers'
import { useTranslation } from 'react-i18next'
import { predefinedThemes } from '../../types/theme'

interface Props {
  data: CVState
}

export default function ModernTemplate({ data }: Props) {
  const { personalInfo, workExperience, education, skills, certifications, projects, languages, colorTheme, sectionOrder } = data
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  
  const theme = colorTheme || predefinedThemes[0]

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'workExperience':
        return workExperience.length > 0 ? (
          <section className="mb-6" key="workExperience">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-1" style={{ color: theme.text, borderColor: theme.primary }}>
              {t('preview.experience')}
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{getDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'education':
        return education.length > 0 ? (
          <section className="mb-6" key="education">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-1" style={{ color: theme.text, borderColor: theme.primary }}>
              {t('preview.education')}
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700 font-medium">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{getDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                      {edu.location && <p>{edu.location}</p>}
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'skills':
        return skills.length > 0 ? (
          <section className="mb-6" key="skills">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-1" style={{ color: theme.text, borderColor: theme.primary }}>
              {t('preview.skills')}
            </h2>
            <div className="space-y-3">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1 capitalize">
                    {category === 'technical' ? 'Technical Skills' : 
                     category === 'soft' ? 'Soft Skills' : 
                     category === 'language' ? 'Language Skills' : 'Other Skills'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'projects':
        return projects.length > 0 ? (
          <section className="mb-6" key="projects">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-1" style={{ color: theme.text, borderColor: theme.primary }}>
              {t('preview.projects')}
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mb-6" key="certifications">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-1" style={{ color: theme.text, borderColor: theme.primary }}>
              {t('preview.certifications')}
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600">
                    {cert.issuer} • {cert.date}
                    {cert.credentialId && ` • ID: ${cert.credentialId}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'languages':
        return languages.length > 0 ? (
          <section className="mb-6" key="languages">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-1" style={{ color: theme.text, borderColor: theme.primary }}>
              {t('preview.languages')}
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <div key={lang.id} className="text-gray-700">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-sm text-gray-600"> - {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null

      default:
        return null
    }
  }

  return (
    <div className={`bg-white shadow-lg ${isRTL ? 'rtl' : 'ltr'}`} id="cv-preview" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-white p-8" style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}>
        <div className="flex items-start gap-6">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-2 opacity-90">
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span className="truncate">{personalInfo.github.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>
            {personalInfo.jobTitle && (
              <p className="text-xl mt-4">{personalInfo.jobTitle}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3 border-b-2 pb-1" style={{ color: theme.text, borderColor: theme.primary }}>
              {t('preview.summary')}
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Render sections in custom order */}
        {sectionOrder.map(sectionType => renderSection(sectionType))}
      </div>
    </div>
  )
}
