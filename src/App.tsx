import { useState } from 'react'
import { CVProvider } from './contexts/CVContext'
import { CoverLetterProvider } from './contexts/CoverLetterContext'
import { AIProvider } from './contexts/AIContext'
import { ATSProvider } from './contexts/ATSContext'
import Header from './components/Header'
import CVForm from './components/CVForm'
import CVPreview from './components/CVPreview'
import TemplateSelector from './components/TemplateSelector'
import ExportButton from './components/ExportButton'
import LinkedInImport from './components/LinkedInImport'
import CoverLetterForm from './components/coverLetter/CoverLetterForm'
import CoverLetterPreview from './components/coverLetter/CoverLetterPreview'
import CoverLetterTemplateSelector from './components/coverLetter/CoverLetterTemplateSelector'
import CoverLetterExportButton from './components/coverLetter/CoverLetterExportButton'
import InstallPrompt from './components/InstallPrompt'
import AISettingsPanel from './components/AISettingsPanel'
import ATSScoreCard from './components/ats/ATSScoreCard'
import ATSDetailedBreakdown from './components/ats/ATSDetailedBreakdown'
import { Settings, Target, Linkedin } from 'lucide-react'
import { useATS } from './contexts/ATSContext'

function AppContent() {
  const [activeTab, setActiveTab] = useState<'cv' | 'coverLetter'>('cv')
  const [showPreview, setShowPreview] = useState(true)
  const [showAISettings, setShowAISettings] = useState(false)
  const [showATSDetails, setShowATSDetails] = useState(false)
  const [showLinkedInImport, setShowLinkedInImport] = useState(false)
  const { analysisResult } = useATS()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="container mx-auto px-4 py-8">
          {/* CV Tab Content */}
          {activeTab === 'cv' && (
            <>
              {/* ATS Score Card */}
              {analysisResult && (
                <div className="mb-6 no-print">
                  <ATSScoreCard 
                    result={analysisResult} 
                    compact 
                    onViewDetails={() => setShowATSDetails(true)}
                  />
                </div>
              )}

              {/* Template Selector and Export */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
                <TemplateSelector />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLinkedInImport(true)}
                    className="btn-secondary flex items-center gap-2"
                    title="Import from LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="hidden sm:inline">Import LinkedIn</span>
                  </button>
                  <button
                    onClick={() => setShowATSDetails(true)}
                    className="btn-secondary flex items-center gap-2"
                    title="ATS Optimization"
                  >
                    <Target className="w-4 h-4" />
                    <span className="hidden sm:inline">ATS Check</span>
                  </button>
                  <button
                    onClick={() => setShowAISettings(true)}
                    className="btn-secondary flex items-center gap-2"
                    title="AI Settings"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">AI Settings</span>
                  </button>
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
            </>
          )}

          {/* Cover Letter Tab Content */}
          {activeTab === 'coverLetter' && (
            <>
              {/* Template Selector and Export */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
                <CoverLetterTemplateSelector />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAISettings(true)}
                    className="btn-secondary flex items-center gap-2"
                    title="AI Settings"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">AI Settings</span>
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn-secondary lg:hidden"
                  >
                    {showPreview ? 'Edit' : 'Preview'}
                  </button>
                  <CoverLetterExportButton />
                </div>
              </div>

              {/* Main Content - Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Section */}
                <div className={`${showPreview ? 'hidden lg:block' : 'block'}`}>
                  <CoverLetterForm />
                </div>

                {/* Preview Section */}
                <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
                  <div className="sticky top-8">
                    <CoverLetterPreview />
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
      <InstallPrompt />
      <LinkedInImport
        isOpen={showLinkedInImport}
        onClose={() => setShowLinkedInImport(false)}
      />
      <AISettingsPanel 
        isOpen={showAISettings} 
        onClose={() => setShowAISettings(false)} 
      />
      <ATSDetailedBreakdown
        isOpen={showATSDetails}
        onClose={() => setShowATSDetails(false)}
      />
    </div>
  )
}

function App() {
  return (
    <AIProvider>
      <CVProvider>
        <CoverLetterProvider>
          <ATSProvider>
            <AppContent />
          </ATSProvider>
        </CoverLetterProvider>
      </CVProvider>
    </AIProvider>
  )
}

export default App
