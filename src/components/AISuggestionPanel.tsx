import { X, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AISuggestionPanelProps {
  isOpen: boolean
  onClose: () => void
  suggestions: string[]
  onApply: (suggestion: string) => void
  onRetry?: () => Promise<void>
  title?: string
  error?: string | null
}

export default function AISuggestionPanel({
  isOpen,
  onClose,
  suggestions,
  onApply,
  onRetry,
  title = 'AI Suggestions',
  error = null,
}: AISuggestionPanelProps) {
  const { t } = useTranslation()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)

  if (!isOpen) return null

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleApply = (suggestion: string) => {
    onApply(suggestion)
    onClose()
  }

  const handleRetry = async () => {
    if (!onRetry) return
    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  const parseSuggestions = (text: string): string[] => {
    // Handle numbered lists (1., 2., 3.)
    if (text.match(/^\d+\./m)) {
      return text
        .split(/\n\d+\.\s*/)
        .filter(s => s.trim())
        .map(s => s.trim())
    }
    
    // Handle bullet points
    if (text.includes('•')) {
      return text
        .split('•')
        .filter(s => s.trim())
        .map(s => s.trim())
    }
    
    // Handle newline-separated suggestions
    const lines = text.split('\n').filter(s => s.trim())
    if (lines.length > 1) {
      return lines
    }
    
    // Single suggestion
    return [text]
  }

  const displaySuggestions = suggestions.length > 0 
    ? suggestions.flatMap(s => parseSuggestions(s))
    : []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {onRetry && (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                title={t('ai.generateNewSuggestions')}
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isRetrying ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {error ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900 mb-1">{t('ui.error')}</h4>
                <p className="text-sm text-red-700">{error}</p>
                {onRetry && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="mt-3 text-sm text-red-700 underline hover:text-red-900"
                  >
                    {t('ui.tryAgain')}
                  </button>
                )}
              </div>
            </div>
          ) : displaySuggestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>{t('ui.noSuggestionsAvailable')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {displaySuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group relative p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200"
                >
                  <p className="text-gray-800 pr-20 whitespace-pre-wrap">{suggestion}</p>
                  
                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleCopy(suggestion, index)}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors"
                      title={t('ai.copyToClipboard')}
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApply(suggestion)}
                      className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      {t('ui.apply')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info message */}
          {!error && displaySuggestions.length > 0 && (
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Review suggestions carefully and customize them to match your experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
