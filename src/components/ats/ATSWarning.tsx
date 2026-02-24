import { useTranslation } from 'react-i18next'
import { AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { ATSCheck } from '../../types/ats'

interface ATSWarningProps {
  check: ATSCheck
  compact?: boolean
}

export default function ATSWarning({ check, compact = false }: ATSWarningProps) {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const getIcon = () => {
    switch (check.severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      case 'info':
        return <Info className="w-4 h-4" />
    }
  }

  const getColors = () => {
    switch (check.severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  if (compact) {
    return (
      <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''} gap-2 p-2 rounded border text-xs ${getColors()}`}>
        {getIcon()}
        <div className="flex-1">
          <p className="font-medium">{check.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''} gap-3 p-3 rounded-lg border ${getColors()}`}>
      {getIcon()}
      <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-sm font-medium mb-1">{check.message}</p>
        {check.suggestion && (
          <p className={`text-xs opacity-90 ${isRTL ? 'mr-1' : 'ml-1'}`}>💡 {check.suggestion}</p>
        )}
      </div>
    </div>
  )
}
