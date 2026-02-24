import { useTranslation } from 'react-i18next'
import { useCoverLetter } from '../../../contexts/CoverLetterContext'

export default function RecipientInfoForm() {
  const { t } = useTranslation()
  const { coverLetterData, updateRecipientInfo } = useCoverLetter()
  const { recipientInfo } = coverLetterData

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('coverLetterForms.recipientInfo')}</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">{t('coverLetterForms.hiringManagerName')}</label>
            <input
              type="text"
              value={recipientInfo.hiringManager}
              onChange={(e) => updateRecipientInfo({ hiringManager: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.hiringManager')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.title')}</label>
            <input
              type="text"
              value={recipientInfo.title}
              onChange={(e) => updateRecipientInfo({ title: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.title')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">{t('coverLetterForms.companyName')} *</label>
            <input
              type="text"
              value={recipientInfo.company}
              onChange={(e) => updateRecipientInfo({ company: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.company')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.department')}</label>
            <input
              type="text"
              value={recipientInfo.department}
              onChange={(e) => updateRecipientInfo({ department: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.department')}
            />
          </div>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.address')}</label>
          <input
            type="text"
            value={recipientInfo.address}
            onChange={(e) => updateRecipientInfo({ address: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.address')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label-text">{t('coverLetterForms.city')}</label>
            <input
              type="text"
              value={recipientInfo.city}
              onChange={(e) => updateRecipientInfo({ city: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.city')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.stateProvince')}</label>
            <input
              type="text"
              value={recipientInfo.state}
              onChange={(e) => updateRecipientInfo({ state: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.state')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.zipPostalCode')}</label>
            <input
              type="text"
              value={recipientInfo.zipCode}
              onChange={(e) => updateRecipientInfo({ zipCode: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.zipCode')}
            />
          </div>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.country')}</label>
          <input
            type="text"
            value={recipientInfo.country}
            onChange={(e) => updateRecipientInfo({ country: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.country')}
          />
        </div>
      </div>
    </div>
  )
}
