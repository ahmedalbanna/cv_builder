import { useState } from 'react'
import { Settings, Check, AlertCircle, Loader2, X } from 'lucide-react'
import { useAI } from '../contexts/AIContext'
import { AI_CONFIG } from '../config/ai'
import { useTranslation } from 'react-i18next'

interface AISettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function AISettingsPanel({ isOpen, onClose }: AISettingsPanelProps) {
  const { t } = useTranslation()
  const {
    isConnected,
    isLoading,
    currentModel,
    apiEndpoint,
    availableModels,
    error,
    checkConnection,
    updateModel,
    updateEndpoint,
    refreshModels,
  } = useAI()

  const [localEndpoint, setLocalEndpoint] = useState(apiEndpoint)
  const [isTesting, setIsTesting] = useState(false)

  if (!isOpen) return null

  const handleUpdateEndpoint = () => {
    updateEndpoint(localEndpoint)
  }

  const handleTestConnection = async () => {
    setIsTesting(true)
    await checkConnection()
    setIsTesting(false)
  }

  const handleRefreshModels = async () => {
    await refreshModels()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t('ui.aiSettings')}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] space-y-6">
          {/* Connection Status */}
          <div className="p-4 rounded-lg border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{t('ui.connectionStatus')}</h4>
              {isConnected ? (
                <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <Check className="w-4 h-4" />
                  {t('ui.connected')}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  {t('ui.disconnected')}
                </span>
              )}
            </div>

            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('ui.testing')}
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {t('ui.testConnection')}
                </>
              )}
            </button>
          </div>

          {/* API Endpoint */}
          <div>
            <label className="label-text">{t('ui.ollamaApiEndpoint')}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={localEndpoint}
                onChange={(e) => setLocalEndpoint(e.target.value)}
                className="input-field flex-1"
                placeholder="http://localhost:11434"
              />
              <button
                onClick={handleUpdateEndpoint}
                className="btn-secondary"
                disabled={localEndpoint === apiEndpoint}
              >
                {t('ui.update')}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('ui.default')} {AI_CONFIG.apiEndpoint}
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="label-text">{t('ui.aiModel')}</label>
              <button
                onClick={handleRefreshModels}
                disabled={isLoading || !isConnected}
                className="text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                {t('ui.refreshModels')}
              </button>
            </div>
            <select
              value={currentModel}
              onChange={(e) => updateModel(e.target.value)}
              className="input-field"
              disabled={!isConnected}
            >
              {availableModels.length > 0 ? (
                availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))
              ) : (
                AI_CONFIG.availableModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} - {model.description}
                  </option>
                ))
              )}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {availableModels.length > 0
                ? `${availableModels.length} ${t('ui.aiModel')}(s) available`
                : 'Connect to see available models'}
            </p>
          </div>

          {/* Setup Instructions */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">{t('ui.setupInstructions')}</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="underline">ollama.ai</a></li>
              <li>Run: <code className="bg-blue-100 px-1 rounded">ollama pull llama2</code></li>
              <li>Start Ollama service (it runs on port 11434 by default)</li>
              <li>{t('ai.testConnection')}</li>
            </ol>
          </div>

          {/* Features Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">{t('ui.aiFeatures')}</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Generate professional summaries</li>
              <li>• Create impactful job descriptions</li>
              <li>• Improve project descriptions</li>
              <li>• Suggest relevant skills</li>
              <li>• All processing happens locally on your machine</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
