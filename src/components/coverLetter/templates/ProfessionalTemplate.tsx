import { useTranslation } from 'react-i18next'
import { CoverLetterState } from '../../../types/coverLetter'

interface Props {
  data: CoverLetterState
}

export default function ProfessionalTemplate({ data }: Props) {
  const { t } = useTranslation()
  const { senderInfo, recipientInfo, companyInfo, letterContent, date } = data

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="bg-white p-12 min-h-[297mm] font-serif text-gray-900">
      {/* Sender Information */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{senderInfo.fullName}</h1>
        {senderInfo.address && <p className="text-sm">{senderInfo.address}</p>}
        {(senderInfo.city || senderInfo.state || senderInfo.zipCode) && (
          <p className="text-sm">
            {[senderInfo.city, senderInfo.state, senderInfo.zipCode].filter(Boolean).join(', ')}
          </p>
        )}
        {senderInfo.country && <p className="text-sm">{senderInfo.country}</p>}
        <p className="text-sm mt-2">{senderInfo.phone}</p>
        <p className="text-sm">{senderInfo.email}</p>
      </div>

      {/* Date */}
      <div className="mb-8">
        <p className="text-sm">{formatDate(date)}</p>
      </div>

      {/* Recipient Information */}
      <div className="mb-8">
        {recipientInfo.hiringManager && (
          <p className="text-sm font-semibold">
            {recipientInfo.hiringManager}
            {recipientInfo.title && `, ${recipientInfo.title}`}
          </p>
        )}
        {recipientInfo.company && <p className="text-sm font-semibold">{recipientInfo.company}</p>}
        {recipientInfo.department && <p className="text-sm">{recipientInfo.department}</p>}
        {recipientInfo.address && <p className="text-sm">{recipientInfo.address}</p>}
        {(recipientInfo.city || recipientInfo.state || recipientInfo.zipCode) && (
          <p className="text-sm">
            {[recipientInfo.city, recipientInfo.state, recipientInfo.zipCode].filter(Boolean).join(', ')}
          </p>
        )}
        {recipientInfo.country && <p className="text-sm">{recipientInfo.country}</p>}
      </div>

      {/* Subject Line */}
      {companyInfo.jobTitle && (
        <div className="mb-6">
          <p className="text-sm font-semibold">
            {t('coverLetter.applicationForSubject')} {companyInfo.jobTitle}
            {companyInfo.jobReference && ` (${companyInfo.jobReference})`}
          </p>
        </div>
      )}

      {/* Salutation */}
      <div className="mb-6">
        <p className="text-sm">
          {t('coverLetter.dear')} {recipientInfo.hiringManager || t('coverLetter.hiringManager')},
        </p>
      </div>

      {/* Letter Content */}
      <div className="space-y-4 mb-6">
        {letterContent.opening && (
          <p className="text-sm leading-relaxed text-justify">{letterContent.opening}</p>
        )}
        {letterContent.body1 && (
          <p className="text-sm leading-relaxed text-justify">{letterContent.body1}</p>
        )}
        {letterContent.body2 && (
          <p className="text-sm leading-relaxed text-justify">{letterContent.body2}</p>
        )}
        {letterContent.body3 && (
          <p className="text-sm leading-relaxed text-justify">{letterContent.body3}</p>
        )}
        {letterContent.closing && (
          <p className="text-sm leading-relaxed text-justify">{letterContent.closing}</p>
        )}
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="text-sm mb-16">{letterContent.salutation},</p>
        <p className="text-sm font-semibold">{senderInfo.fullName}</p>
      </div>
    </div>
  )
}
