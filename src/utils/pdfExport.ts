import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { CVState } from '../types/cv'
import { CoverLetterState } from '../types/coverLetter'

export async function exportToPDF(cvData: CVState): Promise<void> {
  const cvElement = document.getElementById('cv-preview')
  
  if (!cvElement) {
    throw new Error('CV preview element not found')
  }

  // Get the full name for the filename, or use default
  const fileName = cvData.personalInfo.fullName 
    ? `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`
    : 'CV.pdf'

  try {
    // Capture the CV element as canvas
    const canvas = await html2canvas(cvElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    // Calculate PDF dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Save the PDF
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

export async function exportCoverLetterToPDF(_coverLetterData: CoverLetterState, customFileName?: string): Promise<void> {
  // Find the cover letter preview element
  const coverLetterElement = document.querySelector('.bg-white.rounded-lg.overflow-hidden.shadow-xl') as HTMLElement
  
  if (!coverLetterElement) {
    throw new Error('Cover letter preview element not found')
  }

  // Generate filename
  const fileName = customFileName 
    ? `${customFileName}.pdf`
    : `Cover_Letter.pdf`

  try {
    // Capture the cover letter element as canvas
    const canvas = await html2canvas(coverLetterElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    // Calculate PDF dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Save the PDF
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating cover letter PDF:', error)
    throw error
  }
}
