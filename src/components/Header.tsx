import { FileText, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import CVSwitcher from './CVSwitcher'

interface HeaderProps {
  activeTab: 'cv' | 'coverLetter'
  onTabChange: (tab: 'cv' | 'coverLetter') => void
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { t } = useTranslation()
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm no-print">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('app.title')}</h1>
              <p className="text-sm text-gray-600">{t('app.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CVSwitcher />
            <div className="hidden sm:block text-sm text-gray-500">
              {t('app.autoSaved')}
            </div>
            <LanguageSwitcher />
          </div>
        </div>
        
        {/* Document Type Navigation Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => onTabChange('cv')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'cv'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t('header.cv')}
          </button>
          <button
            onClick={() => onTabChange('coverLetter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'coverLetter'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            {t('header.coverLetter')}
          </button>
        </div>
      </div>
    </header>
  )
}
