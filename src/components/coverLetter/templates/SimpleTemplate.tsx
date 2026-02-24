import { useTranslation } from 'react-i18next'
import { CoverLetterState } from '../../../types/coverLetter'

interface Props {
  data: CoverLetterState
}

export default function SimpleTemplate({ data }: Props) {
  const { t } = useTranslation()
  const { senderInfo, recipientInfo, companyInfo, letterContent, date } = data

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="bg-white p-10 min-h-[297mm] font-sans text-gray-900">
      {/* Header - Sender Info */}
      <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold mb-2">{senderInfo.fullName}</h1>
        <div className="text-sm text-gray-600 space-x-3">
          {senderInfo.email && <span>{senderInfo.email}</span>}
          {senderInfo.phone && <span>•</span>}
          {senderInfo.phone && <span>{senderInfo.phone}</span>}
          {senderInfo.city && <span>•</span>}
          {senderInfo.city && (
            <span>{[senderInfo.city, senderInfo.state].filter(Boolean).join(', ')}</span>
          )}
        </div>
      </div>

      {/* Date */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">{formatDate(date)}</p>
      </div>

      {/* Recipient */}
      <div className="mb-6">
        {recipientInfo.hiringManager && (
          <p className="font-medium">
            {recipientInfo.hiringManager}
            {recipientInfo.title && `, ${recipientInfo.title}`}
          </p>
        )}
        {recipientInfo.company && <p className="font-medium">{recipientInfo.company}</p>}
        {recipientInfo.address && <p className="text-sm text-gray-700">{recipientInfo.address}</p>}
        {(recipientInfo.city || recipientInfo.state) && (
          <p className="text-sm text-gray-700">
            {[recipientInfo.city, recipientInfo.state, recipientInfo.zipCode].filter(Boolean).join(', ')}
          </p>
        )}
      </div>

      {/* Subject */}
      {companyInfo.jobTitle && (
        <div className="mb-6">
          <p className="font-semibold">
            {t('coverLetter.subjectLabel')} {companyInfo.jobTitle}
            {companyInfo.jobReference && ` - ${companyInfo.jobReference}`}
          </p>
        </div>
      )}

      {/* Salutation */}
      <div className="mb-6">
        <p>{t('coverLetter.dear')} {recipientInfo.hiringManager || t('coverLetter.hiringManager')},</p>
      </div>

      {/* Letter Body */}
      <div className="space-y-4 mb-8 text-gray-800">
        {letterContent.opening && (
          <p className="leading-relaxed">{letterContent.opening}</p>
        )}
        {letterContent.body1 && (
          <p className="leading-relaxed">{letterContent.body1}</p>
        )}
        {letterContent.body2 && (
          <p className="leading-relaxed">{letterContent.body2}</p>
        )}
        {letterContent.body3 && (
          <p className="leading-relaxed">{letterContent.body3}</p>
        )}
        {letterContent.closing && (
          <p className="leading-relaxed">{letterContent.closing}</p>
        )}
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="mb-16">{letterContent.salutation},</p>
        <p className="font-semibold">{senderInfo.fullName}</p>
      </div>
    </div>
  )
}
