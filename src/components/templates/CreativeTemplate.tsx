import { CVState } from '../../types/cv'
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, FolderOpen } from 'lucide-react'
import { getDateRange } from '../../utils/helpers'
import { useTranslation } from 'react-i18next'

interface Props {
  data: CVState
}

export default function CreativeTemplate({ data }: Props) {
  const { personalInfo, workExperience, education, skills, certifications, projects, languages } = data
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  return (
    <div className={`bg-white shadow-lg ${isRTL ? 'rtl' : 'ltr'}`} id="cv-preview" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-3 min-h-screen">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="h-1 w-16 bg-primary-500 mb-4"></div>
          </div>

          {/* Contact Info */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-primary-400">
              {t('preview.contact')}
            </h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all text-xs">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all text-xs">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-start gap-2">
                  <Github className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all text-xs">{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-primary-400">
                {t('preview.skills')}
              </h2>
              <div className="space-y-3">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold mb-1.5 text-gray-400 uppercase">
                      {category === 'technical' ? 'Technical' : 
                       category === 'soft' ? 'Soft Skills' : 
                       category === 'language' ? 'Languages' : 'Other'}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="text-xs px-2 py-0.5 bg-gray-700 rounded"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-primary-400">
                {t('preview.languages')}
              </h2>
              <div className="space-y-2 text-sm">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between items-center">
                      <span>{lang.name}</span>
                      <span className="text-xs text-gray-400">{lang.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-primary-400">
                {t('preview.certifications')}
              </h2>
              <div className="space-y-2 text-sm">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-xs text-gray-400">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="h-8 w-1 bg-primary-600"></div>
                {t('preview.summary')}
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="h-8 w-1 bg-primary-600"></div>
                <Briefcase className="w-5 h-5" />
                {t('preview.experience')}
              </h2>
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-gray-300">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-600"></div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap ml-2">
                        {getDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    <p className="text-primary-700 font-semibold">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
                    {exp.description && (
                      <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="h-8 w-1 bg-primary-600"></div>
                <GraduationCap className="w-5 h-5" />
                {t('preview.education')}
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2 border-gray-300">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-600"></div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap ml-2">
                        {getDateRange(edu.startDate, edu.endDate, edu.current)}
                      </span>
                    </div>
                    <p className="text-primary-700 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.location}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="h-8 w-1 bg-primary-600"></div>
                <FolderOpen className="w-5 h-5" />
                {t('preview.projects')}
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-primary-100 text-primary-800 text-xs rounded"
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
          )}
        </div>
      </div>
    </div>
  )
}
