import { CoverLetterState } from '../../../types/coverLetter'
import { Mail, Phone, MapPin } from 'lucide-react'

interface Props {
  data: CoverLetterState
}

export default function ModernTemplate({ data }: Props) {
  const { senderInfo, recipientInfo, companyInfo, letterContent, date } = data

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="bg-white min-h-[297mm]">
      {/* Header with colored bar */}
      <div className="bg-primary-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-3">{senderInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {senderInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{senderInfo.email}</span>
            </div>
          )}
          {senderInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{senderInfo.phone}</span>
            </div>
          )}
          {senderInfo.city && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {[senderInfo.city, senderInfo.state].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Date */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">{formatDate(date)}</p>
        </div>

        {/* Recipient */}
        <div className="mb-6">
          {recipientInfo.hiringManager && (
            <p className="font-semibold">
              {recipientInfo.hiringManager}
              {recipientInfo.title && `, ${recipientInfo.title}`}
            </p>
          )}
          {recipientInfo.company && <p className="font-semibold text-primary-600">{recipientInfo.company}</p>}
          {recipientInfo.department && <p className="text-sm text-gray-600">{recipientInfo.department}</p>}
          {recipientInfo.address && <p className="text-sm text-gray-600">{recipientInfo.address}</p>}
          {(recipientInfo.city || recipientInfo.state) && (
            <p className="text-sm text-gray-600">
              {[recipientInfo.city, recipientInfo.state, recipientInfo.zipCode].filter(Boolean).join(', ')}
            </p>
          )}
        </div>

        {/* Subject */}
        {companyInfo.jobTitle && (
          <div className="mb-6 border-l-4 border-primary-600 pl-4">
            <p className="font-semibold text-gray-900">
              Application for: {companyInfo.jobTitle}
              {companyInfo.jobReference && ` (Ref: ${companyInfo.jobReference})`}
            </p>
          </div>
        )}

        {/* Salutation */}
        <div className="mb-6">
          <p className="font-semibold">
            Dear {recipientInfo.hiringManager || 'Hiring Manager'},
          </p>
        </div>

        {/* Letter Content */}
        <div className="space-y-4 mb-8">
          {letterContent.opening && (
            <p className="leading-relaxed text-gray-800">{letterContent.opening}</p>
          )}
          {letterContent.body1 && (
            <p className="leading-relaxed text-gray-800">{letterContent.body1}</p>
          )}
          {letterContent.body2 && (
            <p className="leading-relaxed text-gray-800">{letterContent.body2}</p>
          )}
          {letterContent.body3 && (
            <p className="leading-relaxed text-gray-800">{letterContent.body3}</p>
          )}
          {letterContent.closing && (
            <p className="leading-relaxed text-gray-800">{letterContent.closing}</p>
          )}
        </div>

        {/* Signature */}
        <div className="mt-8">
          <p className="mb-16">{letterContent.salutation},</p>
          <p className="font-bold text-lg">{senderInfo.fullName}</p>
        </div>
      </div>
    </div>
  )
}
