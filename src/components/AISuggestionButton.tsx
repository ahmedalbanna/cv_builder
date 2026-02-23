import { Sparkles, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface AISuggestionButtonProps {
  onClick: () => Promise<void>
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
  label?: string
}

export default function AISuggestionButton({
  onClick,
  disabled = false,
  size = 'md',
  variant = 'secondary',
  label = 'AI Suggest',
}: AISuggestionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onClick()
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isLoading ? 'cursor-wait' : ''}
      `}
      title="Get AI-powered suggestions"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}
