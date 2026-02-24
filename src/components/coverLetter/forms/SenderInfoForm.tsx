import { useCoverLetter } from '../../../contexts/CoverLetterContext'
import { useCV } from '../../../contexts/CVContext'
import { Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function SenderInfoForm() {
  const { t } = useTranslation()
  const { coverLetterData, updateSenderInfo, importFromCV } = useCoverLetter()
  const { cvData } = useCV()
  const { senderInfo } = coverLetterData

  const handleImportFromCV = () => {
    importFromCV(cvData)
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{t('coverLetterForms.senderInfo')}</h2>
        <button
          onClick={handleImportFromCV}
          className="btn-secondary flex items-center gap-2 text-sm"
          title={t('ai.importFromCv')}
        >
          <Download className="w-4 h-4" />
          {t('ai.importFromCv')}
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="label-text">{t('coverLetterForms.fullName')} *</label>
          <input
            type="text"
            value={senderInfo.fullName}
            onChange={(e) => updateSenderInfo({ fullName: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.senderFullName')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">{t('coverLetterForms.email')} *</label>
            <input
              type="email"
              value={senderInfo.email}
              onChange={(e) => updateSenderInfo({ email: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.email')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.phone')} *</label>
            <input
              type="tel"
              value={senderInfo.phone}
              onChange={(e) => updateSenderInfo({ phone: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.phone')}
            />
          </div>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.address')}</label>
          <input
            type="text"
            value={senderInfo.address}
            onChange={(e) => updateSenderInfo({ address: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.senderAddress')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label-text">{t('coverLetterForms.city')}</label>
            <input
              type="text"
              value={senderInfo.city}
              onChange={(e) => updateSenderInfo({ city: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.senderCity')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.stateProvince')}</label>
            <input
              type="text"
              value={senderInfo.state}
              onChange={(e) => updateSenderInfo({ state: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.senderState')}
            />
          </div>
          <div>
            <label className="label-text">{t('coverLetterForms.zipPostalCode')}</label>
            <input
              type="text"
              value={senderInfo.zipCode}
              onChange={(e) => updateSenderInfo({ zipCode: e.target.value })}
              className="input-field"
              placeholder={t('coverLetterForms.placeholders.senderZipCode')}
            />
          </div>
        </div>

        <div>
          <label className="label-text">{t('coverLetterForms.country')}</label>
          <input
            type="text"
            value={senderInfo.country}
            onChange={(e) => updateSenderInfo({ country: e.target.value })}
            className="input-field"
            placeholder={t('coverLetterForms.placeholders.senderCountry')}
          />
        </div>
      </div>
    </div>
  )
}
