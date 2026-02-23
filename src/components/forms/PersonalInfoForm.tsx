import { useCV } from '../../contexts/CVContext'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

export default function PersonalInfoForm() {
  const { cvData, updatePersonalInfo } = useCV()
  const { personalInfo } = cvData

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">Full Name *</label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            className="input-field"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="label-text">
            <Mail className="w-4 h-4 inline mr-1" />
            Email *
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className="input-field"
            placeholder="john.doe@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-text">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone *
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            className="input-field"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
        <div>
          <label className="label-text">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location *
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            className="input-field"
            placeholder="New York, NY"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label-text">
            <Globe className="w-4 h-4 inline mr-1" />
            Website
          </label>
          <input
            type="url"
            value={personalInfo.website || ''}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            className="input-field"
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <label className="label-text">
            <Linkedin className="w-4 h-4 inline mr-1" />
            LinkedIn
          </label>
          <input
            type="url"
            value={personalInfo.linkedin || ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            className="input-field"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="label-text">
            <Github className="w-4 h-4 inline mr-1" />
            GitHub
          </label>
          <input
            type="url"
            value={personalInfo.github || ''}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            className="input-field"
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>

      <div>
        <label className="label-text">Professional Summary *</label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          className="input-field resize-none"
          rows={5}
          placeholder="A brief summary of your professional background, skills, and career objectives..."
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {personalInfo.summary.length} / 500 characters
        </p>
      </div>
    </div>
  )
}
