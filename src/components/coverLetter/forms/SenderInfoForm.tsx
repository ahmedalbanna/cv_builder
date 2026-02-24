import { useCoverLetter } from '../../../contexts/CoverLetterContext'
import { useCV } from '../../../contexts/CVContext'
import { Download } from 'lucide-react'

export default function SenderInfoForm() {
  const { coverLetterData, updateSenderInfo, importFromCV } = useCoverLetter()
  const { cvData } = useCV()
  const { senderInfo } = coverLetterData

  const handleImportFromCV = () => {
    importFromCV(cvData)
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Information</h2>
        <button
          onClick={handleImportFromCV}
          className="btn-secondary flex items-center gap-2 text-sm"
          title="Import from CV"
        >
          <Download className="w-4 h-4" />
          Import from CV
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="label-text">Full Name *</label>
          <input
            type="text"
            value={senderInfo.fullName}
            onChange={(e) => updateSenderInfo({ fullName: e.target.value })}
            className="input-field"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Email *</label>
            <input
              type="email"
              value={senderInfo.email}
              onChange={(e) => updateSenderInfo({ email: e.target.value })}
              className="input-field"
              placeholder="john.doe@email.com"
            />
          </div>
          <div>
            <label className="label-text">Phone *</label>
            <input
              type="tel"
              value={senderInfo.phone}
              onChange={(e) => updateSenderInfo({ phone: e.target.value })}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="label-text">Address</label>
          <input
            type="text"
            value={senderInfo.address}
            onChange={(e) => updateSenderInfo({ address: e.target.value })}
            className="input-field"
            placeholder="123 Main Street, Apt 4B"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label-text">City</label>
            <input
              type="text"
              value={senderInfo.city}
              onChange={(e) => updateSenderInfo({ city: e.target.value })}
              className="input-field"
              placeholder="New York"
            />
          </div>
          <div>
            <label className="label-text">State/Province</label>
            <input
              type="text"
              value={senderInfo.state}
              onChange={(e) => updateSenderInfo({ state: e.target.value })}
              className="input-field"
              placeholder="NY"
            />
          </div>
          <div>
            <label className="label-text">ZIP/Postal Code</label>
            <input
              type="text"
              value={senderInfo.zipCode}
              onChange={(e) => updateSenderInfo({ zipCode: e.target.value })}
              className="input-field"
              placeholder="10001"
            />
          </div>
        </div>

        <div>
          <label className="label-text">Country</label>
          <input
            type="text"
            value={senderInfo.country}
            onChange={(e) => updateSenderInfo({ country: e.target.value })}
            className="input-field"
            placeholder="United States"
          />
        </div>
      </div>
    </div>
  )
}
