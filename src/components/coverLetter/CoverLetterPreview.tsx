import { useCoverLetter } from '../../contexts/CoverLetterContext'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import SimpleTemplate from './templates/SimpleTemplate'

export default function CoverLetterPreview() {
  const { coverLetterData } = useCoverLetter()

  const renderTemplate = () => {
    switch (coverLetterData.selectedTemplate) {
      case 'professional':
        return <ProfessionalTemplate data={coverLetterData} />
      case 'modern':
        return <ModernTemplate data={coverLetterData} />
      case 'simple':
        return <SimpleTemplate data={coverLetterData} />
      default:
        return <ProfessionalTemplate data={coverLetterData} />
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl">
        {renderTemplate()}
      </div>
    </div>
  )
}
