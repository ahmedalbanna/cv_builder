import { useState } from 'react'
import { CVProvider } from './contexts/CVContext'
import Header from './components/Header'
import CVForm from './components/CVForm'
import CVPreview from './components/CVPreview'
import TemplateSelector from './components/TemplateSelector'
import ExportButton from './components/ExportButton'
import InstallPrompt from './components/InstallPrompt'

function App() {
  const [showPreview, setShowPreview] = useState(true)

  return (
    <CVProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Template Selector and Export */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
            <TemplateSelector />
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary lg:hidden"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <ExportButton />
            </div>
          </div>

          {/* Main Content - Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className={`${showPreview ? 'hidden lg:block' : 'block'}`}>
              <CVForm />
            </div>

            {/* Preview Section */}
            <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-8">
                <CVPreview />
              </div>
            </div>
          </div>
        </div>
        <InstallPrompt />
      </div>
    </CVProvider>
  )
}

export default App
