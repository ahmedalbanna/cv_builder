import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { useEffect } from 'react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // Set HTML dir attribute based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      title={i18n.language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <Globe className="w-5 h-5 text-gray-600" />
      <span className="font-medium text-gray-700">
        {i18n.language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  )
}
