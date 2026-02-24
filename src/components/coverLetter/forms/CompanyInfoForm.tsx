import { useTranslation } from 'react-i18next'
import { useCoverLetter } from '../../../contexts/CoverLetterContext'

export default function CompanyInfoForm() {
  const { t } = useTranslation()
  const { coverLetterData, updateCompanyInfo, updateDate } = useCoverLetter()
  const { companyInfo } = coverLetterData

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('coverLetterForms.companyInfo')}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="label-text">{t('coverLetterForms.date')}</label>
          <input
            type="date"
            value={coverLetterData.date}
            onChange={(e) => updateDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">{t('coverLetterForms.positionJobTitle')} *</label>
            <input
              type="text"
              value={companyInfo.jobTitle}
              onChange={(e) => updateCompanyInfo({ jobTitle: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.jobTitle')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.jobReferenceNumber')}</label>
            <input
              type="text"
              value={companyInfo.jobReference}
              onChange={(e) => updateCompanyInfo({ jobReference: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.jobReference')}
            />
          </div>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.companyName')}</label>
          <input
            type="text"
            value={companyInfo.companyName}
            onChange={(e) => updateCompanyInfo({ companyName: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.companyName')}
          />
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.industry')}</label>
          <input
            type="text"
            value={companyInfo.industry}
            onChange={(e) => updateCompanyInfo({ industry: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.industry')}
          />
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.howDidYouFindThisPosition')}</label>
          <input
            type="text"
            value={companyInfo.howFound}
            onChange={(e) => updateCompanyInfo({ howFound: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.howFound')}
          />
        </div>
      </div>
    </div>
  )
}
