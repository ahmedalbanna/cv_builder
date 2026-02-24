import { useCoverLetter } from '../../../contexts/CoverLetterContext'

export default function RecipientInfoForm() {
  const { coverLetterData, updateRecipientInfo } = useCoverLetter()
  const { recipientInfo } = coverLetterData

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recipient Information</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Hiring Manager Name</label>
            <input
              type="text"
              value={recipientInfo.hiringManager}
              onChange={(e) => updateRecipientInfo({ hiringManager: e.target.value })}
              className="input-field"
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label className="label-text">Title</label>
            <input
              type="text"
              value={recipientInfo.title}
              onChange={(e) => updateRecipientInfo({ title: e.target.value })}
              className="input-field"
              placeholder="HR Manager"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Company Name *</label>
            <input
              type="text"
              value={recipientInfo.company}
              onChange={(e) => updateRecipientInfo({ company: e.target.value })}
              className="input-field"
              placeholder="Acme Corporation"
            />
          </div>
          <div>
            <label className="label-text">Department</label>
            <input
              type="text"
              value={recipientInfo.department}
              onChange={(e) => updateRecipientInfo({ department: e.target.value })}
              className="input-field"
              placeholder="Human Resources"
            />
          </div>
        </div>

        <div>
          <label className="label-text">Address</label>
          <input
            type="text"
            value={recipientInfo.address}
            onChange={(e) => updateRecipientInfo({ address: e.target.value })}
            className="input-field"
            placeholder="456 Business Ave, Suite 100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label-text">City</label>
            <input
              type="text"
              value={recipientInfo.city}
              onChange={(e) => updateRecipientInfo({ city: e.target.value })}
              className="input-field"
              placeholder="San Francisco"
            />
          </div>
          <div>
            <label className="label-text">State/Province</label>
            <input
              type="text"
              value={recipientInfo.state}
              onChange={(e) => updateRecipientInfo({ state: e.target.value })}
              className="input-field"
              placeholder="CA"
            />
          </div>
          <div>
            <label className="label-text">ZIP/Postal Code</label>
            <input
              type="text"
              value={recipientInfo.zipCode}
              onChange={(e) => updateRecipientInfo({ zipCode: e.target.value })}
              className="input-field"
              placeholder="94102"
            />
          </div>
        </div>

        <div>
          <label className="label-text">Country</label>
          <input
            type="text"
            value={recipientInfo.country}
            onChange={(e) => updateRecipientInfo({ country: e.target.value })}
            className="input-field"
            placeholder="United States"
          />
        </div>
      </div>
    </div>
  )
}
