import { AI_CONFIG, AI_PROMPTS, PromptType } from '../config/ai'

export interface AIResponse {
  success: boolean
  content: string
  error?: string
}

export interface AISuggestionOptions {
  promptType: PromptType
  params: Record<string, string>
  model?: string
}

class AIService {
  private apiEndpoint: string
  private model: string
  private timeout: number

  constructor() {
    this.apiEndpoint = AI_CONFIG.apiEndpoint
    this.model = AI_CONFIG.defaultModel
    this.timeout = AI_CONFIG.timeout
  }

  /**
   * Update AI configuration
   */
  updateConfig(config: { apiEndpoint?: string; model?: string; timeout?: number }) {
    if (config.apiEndpoint) this.apiEndpoint = config.apiEndpoint
    if (config.model) this.model = config.model
    if (config.timeout) this.timeout = config.timeout
  }

  /**
   * Check if Ollama is running and accessible
   */
  async checkConnection(): Promise<boolean> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${this.apiEndpoint}/api/tags`, {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      return response.ok
    } catch (error) {
      console.error('Ollama connection check failed:', error)
      return false
    }
  }

  /**
   * Get list of available models from Ollama
   */
  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/tags`)
      if (!response.ok) throw new Error('Failed to fetch models')

      const data = await response.json()
      return data.models?.map((m: any) => m.name) || []
    } catch (error) {
      console.error('Failed to get available models:', error)
      return []
    }
  }

  /**
   * Generate AI suggestions based on prompt type
   */
  async getSuggestion(options: AISuggestionOptions): Promise<AIResponse> {
    const { promptType, params, model } = options

    try {
      // Get the prompt template and fill in parameters
      const promptTemplate = AI_PROMPTS[promptType]
      if (!promptTemplate) {
        return {
          success: false,
          content: '',
          error: 'Invalid prompt type',
        }
      }

      // Generate the prompt with parameters based on prompt type
      let prompt: string
      
      switch (promptType) {
        case 'professionalSummary':
          prompt = AI_PROMPTS.professionalSummary(params.jobTitle || '', params.experience || '')
          break
        case 'improveBulletPoint':
          prompt = AI_PROMPTS.improveBulletPoint(params.bulletPoint || '', params.jobTitle || '')
          break
        case 'generateJobDescription':
          prompt = AI_PROMPTS.generateJobDescription(params.jobTitle || '', params.company || '')
          break
        case 'improveProjectDescription':
          prompt = AI_PROMPTS.improveProjectDescription(params.projectName || '', params.currentDescription || '')
          break
        case 'suggestSkills':
          prompt = AI_PROMPTS.suggestSkills(params.jobTitle || '', params.experience || '')
          break
        case 'improveCertification':
          prompt = AI_PROMPTS.improveCertification(params.certName || '')
          break
        case 'extractKeywords':
          prompt = AI_PROMPTS.extractKeywords(params.jobDescription || '')
          break
        case 'analyzeSkillGap':
          prompt = AI_PROMPTS.analyzeSkillGap(params.cvSkills || '', params.jobRequirements || '')
          break
        case 'optimizeForATS':
          prompt = AI_PROMPTS.optimizeForATS(params.content || '', params.keywords || '')
          break
        default:
          return {
            success: false,
            content: '',
            error: 'Invalid prompt type',
          }
      }

      // Call Ollama API
      const response = await this.callOllama(prompt, model || this.model)
      
      return response
    } catch (error) {
      console.error('AI suggestion error:', error)
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  /**
   * Call Ollama API with streaming support
   */
  private async callOllama(prompt: string, model: string): Promise<AIResponse> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.apiEndpoint}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: AI_CONFIG.temperature,
          },
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Ollama API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()

      return {
        success: true,
        content: data.response?.trim() || '',
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            content: '',
            error: 'Request timed out. Please try again.',
          }
        }
        
        return {
          success: false,
          content: '',
          error: error.message,
        }
      }

      return {
        success: false,
        content: '',
        error: 'An unexpected error occurred',
      }
    }
  }

  /**
   * Generate fallback suggestions when AI is unavailable
   */
  getFallbackSuggestion(promptType: PromptType): string {
    const fallbacks: Record<PromptType, string> = {
      professionalSummary: 'Experienced professional with a proven track record of delivering results. Strong analytical and problem-solving skills combined with excellent communication abilities.',
      improveBulletPoint: '1. Led cross-functional team initiatives that improved efficiency by X%\\n2. Developed and implemented solutions that increased productivity by Y%\\n3. Collaborated with stakeholders to achieve key business objectives',
      generateJobDescription: '• Managed and executed key projects resulting in measurable improvements\\n• Collaborated with cross-functional teams to deliver high-quality solutions\\n• Implemented best practices that enhanced team productivity\\n• Analyzed data to drive informed decision-making',
      improveProjectDescription: 'Developed a comprehensive solution that addressed key business challenges, resulting in improved efficiency and user satisfaction. Utilized modern technologies to deliver a scalable and maintainable system.',
      suggestSkills: 'Leadership, Project Management, Communication, Problem Solving, Data Analysis, Team Collaboration, Strategic Planning, Time Management',
      improveCertification: 'This certification demonstrates professional expertise and commitment to continuous learning in the field.',
      extractKeywords: 'project management, leadership, communication, problem solving, data analysis, technical skills',
      analyzeSkillGap: 'MATCHED SKILLS: Unable to analyze without AI\\nMISSING SKILLS: Unable to determine\\nRECOMMENDATIONS: Enable AI to get skill gap analysis',
      optimizeForATS: 'AI optimization unavailable. Please ensure your content includes relevant keywords and uses action verbs.',
    }

    return fallbacks[promptType] || 'AI suggestions are currently unavailable. Please check your Ollama installation.'
  }
}

// Export singleton instance
export const aiService = new AIService()
