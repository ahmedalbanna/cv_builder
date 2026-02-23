import { useState } from 'react'
import { useCV } from '../contexts/CVContext'
import { Download, Loader2 } from 'lucide-react'
import { exportToPDF } from '../utils/pdfExport'

export default function ExportButton() {
  const { cvData } = useCV()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(cvData)
    } catch (error) {
      console.error('Failed to export PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Export to PDF
        </>
      )}
    </button>
  )
}
