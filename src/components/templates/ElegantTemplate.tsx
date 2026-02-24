import { useTranslation } from 'react-i18next'
import { CVState } from '../../types/cv'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getDateRange } from '../../utils/helpers'

interface Props {
  data: CVState
}

export default function ElegantTemplate({ data }: Props) {
  const { t } = useTranslation()
  const { personalInfo, workExperience, education, skills, projects, certifications, languages } = data

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white font-serif text-gray-900">
      {/* Elegant Header with centered name */}
      <div className="text-center pt-12 pb-8 px-10 border-b border-gray-300">
        <h1 className="text-5xl font-light tracking-wide text-gray-900 mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg italic text-gray-600 mb-4">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        
        {/* Contact - Elegant inline */}
        <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
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
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Elegant Summary */}
        {personalInfo.summary && (
          <div className="mb-10 text-center">
            <p className="text-sm leading-relaxed text-gray-700 italic max-w-3xl mx-auto">
              "{personalInfo.summary}"
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-light text-center mb-6 text-gray-900">
              <span className="inline-block border-b-2 border-gray-900 pb-1">{t('preview.experience')}</span>
            </h2>
            <div className="space-y-6">
              {workExperience.map((exp, index) => (
                <div key={exp.id} className={index > 0 ? 'pt-6 border-t border-gray-200' : ''}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500 italic">
                      {getDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-base text-gray-700 mb-2 italic">{exp.company}</p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pl-4">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-light text-center mb-6 text-gray-900">
              <span className="inline-block border-b-2 border-gray-900 pb-1">{t('preview.education')}</span>
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-700 italic">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500 italic">
                    {getDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-light text-center mb-6 text-gray-900">
              <span className="inline-block border-b-2 border-gray-900 pb-1">{t('preview.skills')}</span>
            </h2>
            <div className="text-center">
              <p className="text-sm text-gray-700 leading-relaxed">
                {skills.map(s => s.name).join(' • ')}
              </p>
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-light text-center mb-6 text-gray-900">
              <span className="inline-block border-b-2 border-gray-900 pb-1">{t('preview.projects')}</span>
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed pl-4">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages - Elegant two column */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-2 gap-10 pt-6 border-t border-gray-200">
            {certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-light text-center mb-4 text-gray-900">
                  {t('preview.certifications')}
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-center">
                      <p className="text-sm font-semibold text-gray-900">{cert.name}</p>
                      <p className="text-xs text-gray-600 italic">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className="text-xl font-light text-center mb-4 text-gray-900">
                  {t('preview.languages')}
                </h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-900">{lang.name}</span>
                      <span className="text-xs text-gray-600 italic">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
