import { useTranslation } from 'react-i18next'
import { CVState } from '../../types/cv'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import { getDateRange } from '../../utils/helpers'

interface Props {
  data: CVState
}

export default function ProfessionalTemplate({ data }: Props) {
  const { t } = useTranslation()
  const { personalInfo, workExperience, education, skills, projects, certifications, languages } = data

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white font-serif text-gray-900">
      {/* Header - Professional with blue accent */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-10">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-blue-100 mb-4">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        
        {/* Contact Info - Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-blue-100">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="truncate">{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span className="truncate">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span className="truncate">{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-10">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              {t('preview.professionalSummary')}
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              {t('preview.professionalExperience')}
            </h2>
            <div className="space-y-5">
              {workExperience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute w-3 h-3 bg-blue-900 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-sm font-semibold text-blue-800">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                      {getDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              {t('preview.education')}
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-blue-800">{edu.institution}</p>
                    {edu.location && (
                      <p className="text-xs text-gray-500">{edu.location}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                    {getDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              {t('preview.coreCompetencies')}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  <span className="text-sm text-gray-800">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              {t('preview.keyProjects')}
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{project.name}</h3>
                  {project.technologies && (
                    <p className="text-xs text-blue-800 mb-1">
                      {t('preview.technologies')}: {project.technologies}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                  {project.url && (
                    <a href={project.url} className="text-xs text-blue-600 hover:underline">
                      {project.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section - Certifications and Languages */}
        <div className="grid grid-cols-2 gap-8">
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
                {t('preview.certifications')}
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-semibold text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-xs text-gray-500">{cert.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
                {t('preview.languages')}
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-900">{lang.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
