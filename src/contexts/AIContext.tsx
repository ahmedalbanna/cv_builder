import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { aiService, AIResponse, AISuggestionOptions } from '../services/aiService'
import { AI_CONFIG } from '../config/ai'

interface AIContextState {
  isConnected: boolean
  isLoading: boolean
  currentModel: string
  apiEndpoint: string
  availableModels: string[]
  error: string | null
  
  // Actions
  checkConnection: () => Promise<boolean>
  getSuggestion: (options: AISuggestionOptions) => Promise<AIResponse>
  updateModel: (model: string) => void
  updateEndpoint: (endpoint: string) => void
  refreshModels: () => Promise<void>
}

const AIContext = createContext<AIContextState | undefined>(undefined)

const AI_STORAGE_KEY = 'cv_builder_ai_config'

interface AIProviderProps {
  children: ReactNode
}

export function AIProvider({ children }: AIProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentModel, setCurrentModel] = useState(AI_CONFIG.defaultModel)
  const [apiEndpoint, setApiEndpoint] = useState(AI_CONFIG.apiEndpoint)
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Load saved configuration from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(AI_STORAGE_KEY)
    if (saved) {
      try {
        const config = JSON.parse(saved)
        if (config.model) setCurrentModel(config.model)
        if (config.endpoint) setApiEndpoint(config.endpoint)
      } catch (e) {
        console.error('Failed to load AI config:', e)
      }
    }
  }, [])

  // Save configuration to localStorage
  useEffect(() => {
    localStorage.setItem(
      AI_STORAGE_KEY,
      JSON.stringify({
        model: currentModel,
        endpoint: apiEndpoint,
      })
    )
    
    // Update AI service config
    aiService.updateConfig({
      model: currentModel,
      apiEndpoint: apiEndpoint,
    })
  }, [currentModel, apiEndpoint])

  // Check connection on mount
  useEffect(() => {
    checkConnection()
  }, [apiEndpoint])

  const checkConnection = async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    
    try {
      const connected = await aiService.checkConnection()
      setIsConnected(connected)
      
      if (connected) {
        await refreshModels()
      } else {
        setError('Cannot connect to Ollama. Make sure Ollama is running on ' + apiEndpoint)
      }
      
      return connected
    } catch (err) {
      setIsConnected(false)
      setError('Failed to check connection')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const refreshModels = async (): Promise<void> => {
    try {
      const models = await aiService.getAvailableModels()
      setAvailableModels(models)
      
      // If current model is not available, switch to first available
      if (models.length > 0 && !models.includes(currentModel)) {
        setCurrentModel(models[0])
      }
    } catch (err) {
      console.error('Failed to fetch models:', err)
    }
  }

  const getSuggestion = async (options: AISuggestionOptions): Promise<AIResponse> => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Use the current model if not specified
      const response = await aiService.getSuggestion({
        ...options,
        model: options.model || currentModel,
      })
      
      if (!response.success && response.error) {
        setError(response.error)
      }
      
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMsg)
      return {
        success: false,
        content: '',
        error: errorMsg,
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updateModel = (model: string): void => {
    setCurrentModel(model)
    setError(null)
  }

  const updateEndpoint = (endpoint: string): void => {
    setApiEndpoint(endpoint)
    setError(null)
    setIsConnected(false)
  }

  const value: AIContextState = {
    isConnected,
    isLoading,
    currentModel,
    apiEndpoint,
    availableModels,
    error,
    checkConnection,
    getSuggestion,
    updateModel,
    updateEndpoint,
    refreshModels,
  }

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

export function useAI(): AIContextState {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}
