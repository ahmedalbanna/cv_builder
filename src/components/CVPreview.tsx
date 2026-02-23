import { useCV } from '../contexts/CVContext'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import CreativeTemplate from './templates/CreativeTemplate'

export default function CVPreview() {
  const { cvData } = useCV()

  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={cvData} />
      case 'classic':
        return <ClassicTemplate data={cvData} />
      case 'creative':
        return <CreativeTemplate data={cvData} />
      default:
        return <ModernTemplate data={cvData} />
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
