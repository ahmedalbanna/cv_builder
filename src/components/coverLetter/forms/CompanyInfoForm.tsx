import { useCoverLetter } from '../../../contexts/CoverLetterContext'

export default function CompanyInfoForm() {
  const { coverLetterData, updateCompanyInfo, updateDate } = useCoverLetter()
  const { companyInfo } = coverLetterData

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Position & Company Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="label-text">Date</label>
          <input
            type="date"
            value={coverLetterData.date}
            onChange={(e) => updateDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Position/Job Title *</label>
            <input
              type="text"
              value={companyInfo.jobTitle}
              onChange={(e) => updateCompanyInfo({ jobTitle: e.target.value })}
              className="input-field"
              placeholder="Senior Software Engineer"
            />
          </div>
          <div>
            <label className="label-text">Job Reference Number</label>
            <input
              type="text"
              value={companyInfo.jobReference}
              onChange={(e) => updateCompanyInfo({ jobReference: e.target.value })}
              className="input-field"
              placeholder="REF-2024-001"
            />
          </div>
        </div>

        <div>
          <label className="label-text">Company Name</label>
          <input
            type="text"
            value={companyInfo.companyName}
            onChange={(e) => updateCompanyInfo({ companyName: e.target.value })}
            className="input-field"
            placeholder="Acme Corporation"
          />
        </div>

        <div>
          <label className="label-text">Industry</label>
          <input
            type="text"
            value={companyInfo.industry}
            onChange={(e) => updateCompanyInfo({ industry: e.target.value })}
            className="input-field"
            placeholder="Technology, Finance, Healthcare, etc."
          />
        </div>

        <div>
          <label className="label-text">How did you find this position?</label>
          <input
            type="text"
            value={companyInfo.howFound}
            onChange={(e) => updateCompanyInfo({ howFound: e.target.value })}
            className="input-field"
            placeholder="LinkedIn, Company website, Referral, etc."
          />
        </div>
      </div>
    </div>
  )
}
