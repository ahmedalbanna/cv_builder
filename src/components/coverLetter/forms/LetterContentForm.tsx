import { useTranslation } from 'react-i18next'
import { useCoverLetter } from '../../../contexts/CoverLetterContext'
import { useState } from 'react'

export default function LetterContentForm() {
  const { t } = useTranslation()
  const { coverLetterData, updateLetterContent } = useCoverLetter()
  const { letterContent } = coverLetterData
  const [showBody3, setShowBody3] = useState(!!letterContent.body3)

  const salutations = [
    t('coverLetterForms.salutationOptions.sincerely'),
    t('coverLetterForms.salutationOptions.bestRegards'),
    t('coverLetterForms.salutationOptions.kindRegards'),
    t('coverLetterForms.salutationOptions.respectfully'),
    t('coverLetterForms.salutationOptions.yoursTruly'),
    t('coverLetterForms.salutationOptions.warmRegards'),
  ]

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('coverLetterForms.letterContent')}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="label-text">{t('coverLetterForms.openingParagraph')} *</label>
          <textarea
            value={letterContent.opening}
            onChange={(e) => updateLetterContent({ opening: e.target.value })}
            className="input-field min-h-[100px]"
            placeholder={t('coverLetterForms.placeholders.opening')}
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('coverLetterForms.openingParagraphHelper')}
          </p>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.bodyParagraph1')} *</label>
          <textarea
            value={letterContent.body1}
            onChange={(e) => updateLetterContent({ body1: e.target.value })}
            className="input-field min-h-[120px]"
            placeholder={t('coverLetterForms.placeholders.body1')}
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('coverLetterForms.bodyParagraph1Helper')}
          </p>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.bodyParagraph2')} *</label>
          <textarea
            value={letterContent.body2}
            onChange={(e) => updateLetterContent({ body2: e.target.value })}
            className="input-field min-h-[120px]"
            placeholder={t('coverLetterForms.placeholders.body2')}
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('coverLetterForms.bodyParagraph2Helper')}
          </p>
        </div>

        {showBody3 ? (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="label-text">{t('coverLetterForms.bodyParagraph3Optional')}</label>
              <button
                onClick={() => {
                  setShowBody3(false)
                  updateLetterContent({ body3: '' })
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                {t('coverLetterForms.remove')}
              </button>
            </div>
            <textarea
              value={letterContent.body3}
              onChange={(e) => updateLetterContent({ body3: e.target.value })}
              className="input-field min-h-[120px]"
              placeholder={t('coverLetterForms.placeholders.body3')}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowBody3(true)}
            className="btn-secondary w-full"
          >
            {t('coverLetterForms.addAdditionalParagraph')}
          </button>
        )}

        <div>
          <label className="label-text">{t('coverLetterForms.closingParagraph')} *</label>
          <textarea
            value={letterContent.closing}
            onChange={(e) => updateLetterContent({ closing: e.target.value })}
            className="input-field min-h-[80px]"
            placeholder={t('coverLetterForms.placeholders.closing')}
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('coverLetterForms.closingParagraphHelper')}
          </p>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.salutation')}</label>
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
