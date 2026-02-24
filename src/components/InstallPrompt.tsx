import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const { t } = useTranslation()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running in standalone mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    setIsStandalone(standalone)

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after 3 seconds if not dismissed before
      const dismissed = localStorage.getItem('installPromptDismissed')
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('installPromptDismissed', 'true')
  }

  // Don't show if already installed or dismissed
  if (isStandalone || !showPrompt) {
    return null
  }

  // iOS Install Instructions
  if (isIOS && !isStandalone) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white border-2 border-primary-500 rounded-lg shadow-xl p-4 z-50 no-print animate-slide-up">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Download className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{t('installPrompt.title')}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {t('installPrompt.iosDescription')}
            </p>
            <ol className="text-xs text-gray-600 space-y-1">
              <li>{t('installPrompt.iosStep1')} <span className="inline-block">□↑</span></li>
              <li>{t('installPrompt.iosStep2')}</li>
              <li>{t('installPrompt.iosStep3')}</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  // Android/Desktop Install Prompt
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white border-2 border-primary-500 rounded-lg shadow-xl p-4 z-50 no-print animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="flex items-start gap-3">
        <div className="bg-primary-100 p-2 rounded-lg">
          <Download className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{t('installPrompt.title')}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {t('installPrompt.androidDescription')}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="btn-primary text-sm py-2 px-4"
            >
              {t('installPrompt.installButton')}
            </button>
            <button
              onClick={handleDismiss}
              className="btn-secondary text-sm py-2 px-4"
            >
              {t('installPrompt.notNowButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
