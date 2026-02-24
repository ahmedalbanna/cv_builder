import { useTranslation } from 'react-i18next'
import { CVState } from '../../types/cv'
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Terminal, Code, Briefcase, GraduationCap } from 'lucide-react'
import { getDateRange } from '../../utils/helpers'

interface Props {
  data: CVState
}

export default function TechTemplate({ data }: Props) {
  const { t } = useTranslation()
  const { personalInfo, workExperience, education, skills, projects, certifications, languages } = data

  return (
    <div className="w-[210mm] min-h-[297mm] bg-slate-900 text-gray-100 font-mono">
      {/* Tech Header - Terminal Style */}
      <div className="bg-slate-800 border-b-2 border-green-400 p-8">
        <div className="flex items-start gap-2 mb-4">
          <Terminal className="w-5 h-5 text-green-400 mt-1" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-green-400 mb-1">
              {personalInfo.fullName || 'developer@localhost'}
            </h1>
            <p className="text-lg text-gray-300">
              <span className="text-green-400">$</span> {personalInfo.jobTitle || 'Full Stack Developer'}
            </p>
          </div>
        </div>
        
        {/* Contact Info - Terminal style */}
        <div className="bg-slate-900 border border-slate-700 rounded p-4 text-sm">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 truncate">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 truncate">{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 truncate">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* About/Summary - Code comment style */}
        {personalInfo.summary && (
          <div className="mb-6 bg-slate-800 border-l-4 border-green-400 p-4 rounded">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-green-400">// </span>{personalInfo.summary}
            </p>
          </div>
        )}

        {/* Skills - Tags style */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <Code className="w-5 h-5" />
              <span>{'<'}{t('preview.skills')}{'>'}  </span>
            </h2>
            <div className="flex flex-wrap gap-2 ml-6 mb-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-slate-800 border border-green-400 text-green-400 px-3 py-1 rounded text-xs font-semibold"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <p className="text-green-400 ml-0">{'</'}{t('preview.skills')}{'>'}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>{'<'}{t('preview.experience')}{'>'}</span>
            </h2>
            <div className="space-y-4 ml-6">
              {workExperience.map((exp) => (
                <div key={exp.id} className="bg-slate-800 border border-slate-700 rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.position}</h3>
                      <p className="text-sm text-blue-400">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                      {getDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-green-400 mt-2">{'</'}{t('preview.experience')}{'>'}</p>
          </div>
        )}

        {/* Projects - Code block style */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              <span>{'<'}{t('preview.projects')}{'>'}</span>
            </h2>
            <div className="space-y-3 ml-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-800 border-l-4 border-blue-400 p-4 rounded">
                  <h3 className="text-base font-bold text-blue-400 mb-1">{project.name}</h3>
                  {project.technologies && (
                    <p className="text-xs text-gray-400 mb-2">
                      <span className="text-green-400"># </span>{project.technologies}
                    </p>
                  )}
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  {project.url && (
                    <a href={project.url} className="text-xs text-green-400 hover:underline mt-1 inline-block">
                      → {project.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <p className="text-green-400 mt-2">{'</'}{t('preview.projects')}{'>'}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span>{'<'}{t('preview.education')}{'>'}</span>
            </h2>
            <div className="space-y-3 ml-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                    <p className="text-sm text-blue-400">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {getDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-green-400 mt-2">{'</'}{t('preview.education')}{'>'}</p>
          </div>
        )}

        {/* Bottom Section - Certifications and Languages */}
        <div className="grid grid-cols-2 gap-6">
          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-green-400 mb-3">
                {'<'}{t('preview.certifications')}{'>'} 
              </h2>
              <div className="space-y-2 ml-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <p className="text-white font-semibold">{cert.name}</p>
                    <p className="text-xs text-gray-400">{cert.issuer}</p>
                  </div>
                ))}
              </div>
              <p className="text-green-400 mt-2">{'</'}{t('preview.certifications')}{'>'}</p>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-green-400 mb-3">
                {'<'}{t('preview.languages')}{'>'} 
              </h2>
              <div className="space-y-1 ml-4">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="text-white">{lang.name}</span>
                    <span className="text-gray-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
              <p className="text-green-400 mt-2">{'</'}{t('preview.languages')}{'>'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Terminal prompt */}
      <div className="bg-slate-800 border-t-2 border-green-400 p-4 text-xs text-gray-400 font-mono">
        <p><span className="text-green-400">$</span> end_of_cv --status=success</p>
      </div>
    </div>
  )
}
