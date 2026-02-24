import { CVState } from '../../types/cv'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getDateRange } from '../../utils/helpers'
import { useTranslation } from 'react-i18next'
import { predefinedThemes } from '../../types/theme'

interface Props {
  data: CVState
}

export default function ClassicTemplate({ data }: Props) {
  const { personalInfo, workExperience, education, skills, certifications, projects, languages, colorTheme } = data
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

  return (
    <div className={`bg-white shadow-lg font-serif ${isRTL ? 'rtl' : 'ltr'}`} id="cv-preview" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="p-8">
        {/* Header */}
        <div className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: theme.primary }}>
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-28 h-28 rounded-full object-cover border-3 border-gray-800 mx-auto mb-4"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600 mt-2">
              {personalInfo.website && (
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              )}
              {personalInfo.linkedin && (
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              )}
              {personalInfo.github && (
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              )}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide" style={{ color: theme.primary }}>
              {t('preview.summary')}
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
              {t('preview.experience')}
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {getDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="italic text-gray-700">{exp.company}</p>
                    <span className="text-sm text-gray-600">{exp.location}</span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 mt-2 leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
              {t('preview.education')}
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {getDateRange(edu.startDate, edu.endDate, edu.current)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="italic text-gray-700">{edu.institution}</p>
                    <span className="text-sm text-gray-600">
                      {edu.location}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
              {t('preview.skills')}
            </h2>
            <div className="space-y-2">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <span className="font-bold text-gray-800">
                    {category === 'technical' ? 'Technical:' : 
                     category === 'soft' ? 'Soft Skills:' : 
                     category === 'language' ? 'Languages:' : 'Other:'}
                  </span>
                  <span className="text-gray-700 ml-2">
                    {categorySkills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
              {t('preview.projects')}
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 text-justify">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
              {t('preview.certifications')}
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  <span className="text-gray-600"> - {cert.issuer}, {cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
              {t('preview.languages')}
            </h2>
            <p className="text-gray-700">
              {languages.map((lang, idx) => (
                <span key={lang.id}>
                  {lang.name} ({lang.proficiency})
                  {idx < languages.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
