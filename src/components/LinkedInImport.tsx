import { useState, useRef } from 'react'
import { Linkedin, Upload, X, AlertCircle, CheckCircle } from 'lucide-react'
import { useCV } from '../contexts/CVContext'
import { parseLinkedInData } from '../utils/linkedinParser'
import { useTranslation } from 'react-i18next'

interface LinkedInImportProps {
  isOpen: boolean
  onClose: () => void
}

export default function LinkedInImport({ isOpen, onClose }: LinkedInImportProps) {
  const { t } = useTranslation()
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { importFromLinkedIn } = useCV()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    setError(null)
    setSuccess(false)

    try {
      const text = await file.text()
      let data: any

      // Parse JSON or CSV
      if (file.name.endsWith('.json')) {
        data = JSON.parse(text)
      } else if (file.name.endsWith('.csv')) {
        // For CSV, we'll need to parse it
        data = parseLinkedInCSV(text)
      } else {
        throw new Error('Unsupported file format. Please upload JSON or CSV file.')
      }

      // Parse the LinkedIn data
      const cvData = parseLinkedInData(data)
      
      // Import into CV
      importFromLinkedIn(cvData)
      
      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import LinkedIn data')
    } finally {
      setImporting(false)
    }
  }

  const parseLinkedInCSV = (csvText: string): any => {
    // Simple CSV parser for LinkedIn export
    const lines = csvText.split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    
    const data: any = {
      profile: {},
      positions: [],
      education: [],
      skills: [],
      certifications: []
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index]
      })
      
      // Categorize based on content
      if (row['Company Name']) {
        data.positions.push(row)
      } else if (row['School Name']) {
        data.education.push(row)
      }
    }

    return data
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Linkedin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Import from LinkedIn</h2>
              <p className="text-sm text-gray-600">Upload your LinkedIn data export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Instructions */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">How to get your LinkedIn data:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Go to LinkedIn Settings & Privacy</li>
              <li>{t('linkedin.dataPrivacy')}</li>
              <li>Select "Want something in particular? Select the data files you're most interested in"</li>
              <li>Check: Profile, Positions, Education, Skills, Certifications</li>
              <li>{t('linkedin.requestArchive')}</li>
              <li>Download and extract the ZIP file</li>
              <li>Upload the JSON files here</li>
            </ol>
          </div>

          {/* Alternative Method */}
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Alternative: Manual Entry</h3>
            <p className="text-sm text-gray-600">
              Or you can use our <strong>LinkedIn Profile Scraper</strong> browser extension to quickly import your profile data.
            </p>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.csv"
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              <Upload className="w-5 h-5" />
              {importing ? 'Importing...' : 'Select LinkedIn Data File'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-semibold">Import Failed</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-semibold">Import Successful!</p>
                <p>Your LinkedIn data has been imported.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
