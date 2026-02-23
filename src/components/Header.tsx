import { FileText } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm no-print">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
              <p className="text-sm text-gray-600">Create your professional resume</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Auto-saved locally
          </div>
        </div>
      </div>
    </header>
  )
}
