import { CheckCircle2, AlertCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { ATSAnalysisResult } from '../../types/ats'
import { useState } from 'react'

interface ATSScoreCardProps {
  result: ATSAnalysisResult
  compact?: boolean
  onViewDetails?: () => void
}

export default function ATSScoreCard({ result, compact = false, onViewDetails }: ATSScoreCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getGradeInfo = () => {
    switch (result.grade) {
      case 'excellent':
        return { icon: CheckCircle2, text: 'Excellent', color: 'text-green-600' }
      case 'good':
        return { icon: TrendingUp, text: 'Good', color: 'text-blue-600' }
      case 'fair':
        return { icon: AlertCircle, text: 'Needs Work', color: 'text-yellow-600' }
      case 'poor':
        return { icon: AlertCircle, text: 'Needs Improvement', color: 'text-red-600' }
    }
  }

  const gradeInfo = getGradeInfo()
  const GradeIcon = gradeInfo.icon

  if (compact) {
    return (
      <button
        onClick={onViewDetails}
        className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:border-primary-300 hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBgColor(result.overallScore)}`}>
              <span className={`text-lg font-bold ${getScoreColor(result.overallScore)}`}>
                {result.overallScore}
              </span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <GradeIcon className={`w-4 h-4 ${gradeInfo.color}`} />
                <span className="font-semibold text-gray-900">ATS Score: {gradeInfo.text}</span>
              </div>
              <p className="text-xs text-gray-600">
                {result.criticalIssues.length} critical • {result.warnings.length} warnings
              </p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBgColor(result.overallScore)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GradeIcon className={`w-5 h-5 ${gradeInfo.color}`} />
              <h3 className="text-lg font-semibold text-gray-900">ATS Score: {gradeInfo.text}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {result.criticalIssues.length} critical issues • {result.warnings.length} warnings
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2 pt-3 border-t border-gray-200">
          {result.categoryScores.map(category => (
            <div key={category.category} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category.categoryName}</span>
                  <span className={`text-sm font-semibold ${getScoreColor(category.score)}`}>
                    {category.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      category.score >= 80 ? 'bg-green-500' : 
                      category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className="w-full mt-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
        >
          View Detailed Analysis
        </button>
      )}
    </div>
  )
}
