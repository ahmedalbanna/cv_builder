import { useTranslation } from 'react-i18next'
import { Download } from 'lucide-react'
import { useCoverLetter } from '../../contexts/CoverLetterContext'
import { exportCoverLetterToPDF } from '../../utils/pdfExport'

export default function CoverLetterExportButton() {
  const { t } = useTranslation()
  const { coverLetterData } = useCoverLetter()

  const handleExport = async () => {
    const fileName = `${coverLetterData.senderInfo.fullName || 'Cover_Letter'}_${
      coverLetterData.companyInfo.companyName || coverLetterData.recipientInfo.company || 'Application'
    }`.replace(/\s+/g, '_')
    
    await exportCoverLetterToPDF(coverLetterData, fileName)
  }

  return (
    <button
      onClick={handleExport}
      className="btn-primary flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      {t('coverLetter.exportPDF')}
    </button>
  )
}
