import { CVState } from '../../types/cv'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getDateRange } from '../../utils/helpers'

interface Props {
  data: CVState
}

export default function MinimalistTemplate({ data }: Props) {
  const { personalInfo, workExperience, education, skills, projects, certifications, languages } = data

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-12 font-sans text-gray-800">
      {/* Header - Ultra Simple */}
      <div className="mb-8 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-base text-gray-600 font-light mb-3">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>
        
        {/* Contact - Inline, minimal */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span className="font-light">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span className="font-light">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="font-light">{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-sm leading-relaxed text-gray-700 font-light">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">
            Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500 font-light">
                    {getDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 font-light">{exp.company}</p>
                <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line">
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
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-500 font-light">
                    {getDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-light">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-sm text-gray-700 font-light"
              >
                {skill.name}
              </span>
            )).reduce((prev: React.ReactNode[], curr, index) => {
              return prev.length ? [...prev, <span key={`sep-${index}`} className="text-gray-400">•</span>, curr] : [curr]
            }, [])}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-base font-medium text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages - Side by side if both exist */}
      <div className="grid grid-cols-2 gap-8">
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-600 font-light">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-sm text-gray-900 font-light">{lang.name}</span>
                  <span className="text-xs text-gray-600 font-light">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
