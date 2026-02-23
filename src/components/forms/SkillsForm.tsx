import { useState } from 'react'
import { useCV } from '../../contexts/CVContext'
import { generateId } from '../../utils/helpers'
import { Plus, X } from 'lucide-react'
import { Skill } from '../../types/cv'

export default function SkillsForm() {
  const { cvData, addSkill, deleteSkill } = useCV()
  const [skillName, setSkillName] = useState('')
  const [category, setCategory] = useState<Skill['category']>('technical')
  const [level, setLevel] = useState<Skill['level']>('intermediate')

  const handleAdd = () => {
    if (!skillName.trim()) return

    const newSkill: Skill = {
      id: generateId(),
      name: skillName.trim(),
      category,
      level,
    }

    addSkill(newSkill)
    setSkillName('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  const groupedSkills = cvData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categoryLabels = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    language: 'Language Skills',
    other: 'Other Skills',
  }

  return (
    <div className="space-y-6">
      {/* Add Skill Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <label className="label-text">Skill Name</label>
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field"
            placeholder="e.g., JavaScript, Leadership"
          />
        </div>
        <div>
          <label className="label-text">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Skill['category'])}
            className="input-field"
          >
            <option value="technical">Technical</option>
            <option value="soft">Soft Skills</option>
            <option value="language">Language</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="label-text">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Skill['level'])}
            className="input-field"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </button>

      {/* Display Skills by Category */}
      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([cat, skills]) => (
          <div key={cat}>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              {categoryLabels[cat as Skill['category']]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm"
                >
                  <span>
                    {skill.name}
                    {skill.level && (
                      <span className="ml-1 text-xs opacity-75">
                        ({skill.level})
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {cvData.skills.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No skills added yet. Add your first skill above!
        </p>
      )}
    </div>
  )
}
