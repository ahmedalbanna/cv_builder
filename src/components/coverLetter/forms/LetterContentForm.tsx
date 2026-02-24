import { useCoverLetter } from '../../../contexts/CoverLetterContext'
import { useState } from 'react'

export default function LetterContentForm() {
  const { coverLetterData, updateLetterContent } = useCoverLetter()
  const { letterContent } = coverLetterData
  const [showBody3, setShowBody3] = useState(!!letterContent.body3)

  const salutations = [
    'Sincerely',
    'Best regards',
    'Kind regards',
    'Respectfully',
    'Yours truly',
    'Warm regards',
  ]

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Letter Content</h2>
      
      <div className="space-y-4">
        <div>
          <label className="label-text">Opening Paragraph *</label>
          <textarea
            value={letterContent.opening}
            onChange={(e) => updateLetterContent({ opening: e.target.value })}
            className="input-field min-h-[100px]"
            placeholder="Introduce yourself and state the position you're applying for. Mention how you found the job opening and express your enthusiasm..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Introduce yourself, mention the position, and express your interest
          </p>
        </div>

        <div>
          <label className="label-text">Body Paragraph 1 *</label>
          <textarea
            value={letterContent.body1}
            onChange={(e) => updateLetterContent({ body1: e.target.value })}
            className="input-field min-h-[120px]"
            placeholder="Highlight your relevant experience and skills. Provide specific examples of your accomplishments..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Highlight your most relevant experience and qualifications
          </p>
        </div>

        <div>
          <label className="label-text">Body Paragraph 2 *</label>
          <textarea
            value={letterContent.body2}
            onChange={(e) => updateLetterContent({ body2: e.target.value })}
            className="input-field min-h-[120px]"
            placeholder="Explain why you're interested in this company and position. Show that you've researched the company..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Explain your interest in the company and how you align with their values
          </p>
        </div>

        {showBody3 ? (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="label-text">Body Paragraph 3 (Optional)</label>
              <button
                onClick={() => {
                  setShowBody3(false)
                  updateLetterContent({ body3: '' })
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <textarea
              value={letterContent.body3}
              onChange={(e) => updateLetterContent({ body3: e.target.value })}
              className="input-field min-h-[120px]"
              placeholder="Add additional relevant information, achievements, or reasons why you're a great fit..."
            />
          </div>
        ) : (
          <button
            onClick={() => setShowBody3(true)}
            className="btn-secondary w-full"
          >
            + Add Additional Paragraph
          </button>
        )}

        <div>
          <label className="label-text">Closing Paragraph *</label>
          <textarea
            value={letterContent.closing}
            onChange={(e) => updateLetterContent({ closing: e.target.value })}
            className="input-field min-h-[80px]"
            placeholder="Express your enthusiasm for an interview, thank them for their consideration, and provide your contact information..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Thank them, express eagerness for an interview, and provide next steps
          </p>
        </div>

        <div>
          <label className="label-text">Salutation</label>
          <select
            value={letterContent.salutation}
            onChange={(e) => updateLetterContent({ salutation: e.target.value })}
            className="input-field"
          >
            {salutations.map((sal) => (
              <option key={sal} value={sal}>
                {sal}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
