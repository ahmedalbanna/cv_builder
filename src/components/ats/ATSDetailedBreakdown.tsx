import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useATS } from '../../contexts/ATSContext'
import ATSScoreCard from './ATSScoreCard'
import ATSWarning from './ATSWarning'
import JobDescriptionInput from './JobDescriptionInput'

interface ATSDetailedBreakdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function ATSDetailedBreakdown({ isOpen, onClose }: ATSDetailedBreakdownProps) {
  const { t, i18n } = useTranslation()
  const { analysisResult, aiAnalysis, jobDescription, setJobDescription, isAnalyzing } = useATS()
  const isRTL = i18n.language === 'ar'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('ats.optimizationAnalysis')}</h2>
            <button
              onClick={onClose}
              className={`p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isRTL ? 'ml-4' : 'mr-4'}`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <span className={`text-gray-600 ${isRTL ? 'mr-3' : 'ml-3'}`}>{t('ats.analyzing')}</span>
            </div>
          )}

          {/* Content */}
          {!isAnalyzing && analysisResult && (
            <div className="space-y-6">
              {/* Overall Score */}
              <ATSScoreCard result={analysisResult} />

              {/* Job Description Input */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('ats.targetJob')}</h3>
                <JobDescriptionInput
                  currentJob={jobDescription}
                  onSave={setJobDescription}
                />
              </div>

              {/* AI Analysis Results */}
              {aiAnalysis && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">{t('ats.aiAnalysis')}</h3>
                  
                  {/* Keyword Match */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Keyword Match</h4>
                      <span className={`text-lg font-bold ${
                        aiAnalysis.keywordMatch.score >= 70 ? 'text-green-600' :
                        aiAnalysis.keywordMatch.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {aiAnalysis.keywordMatch.score}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-green-700 mb-2">{t('ats.matchedKeywords')}</p>
                        <div className="flex flex-wrap gap-1">
                          {aiAnalysis.keywordMatch.matched.slice(0, 10).map((kw, i) => (
                            <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-red-700 mb-2">{t('ats.missingKeywords')}</p>
                        <div className="flex flex-wrap gap-1">
                          {aiAnalysis.keywordMatch.missing.slice(0, 10).map((kw, i) => (
                            <span key={i} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skill Gap */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Skill Gap Analysis</h4>
                      <span className={`text-lg font-bold ${
                        aiAnalysis.skillGapAnalysis.score >= 70 ? 'text-green-600' :
                        aiAnalysis.skillGapAnalysis.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {aiAnalysis.skillGapAnalysis.score}%
                      </span>
                    </div>
                    <div className="space-y-3 text-sm">
                      {aiAnalysis.skillGapAnalysis.hasSkills.length > 0 && (
                        <div>
                          <p className="font-medium text-green-700 mb-1">{t('ats.skillsYouHave')}</p>
                          <p className="text-gray-700">{aiAnalysis.skillGapAnalysis.hasSkills.join(', ')}</p>
                        </div>
                      )}
                      {aiAnalysis.skillGapAnalysis.missingSkills.length > 0 && (
                        <div>
                          <p className="font-medium text-red-700 mb-1">{t('ats.missingSkills')}</p>
                          <p className="text-gray-700">{aiAnalysis.skillGapAnalysis.missingSkills.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {aiAnalysis.contentSuggestions.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{t('ats.aiRecommendations')}</h4>
                      <ul className="space-y-2">
                        {aiAnalysis.contentSuggestions.map((suggestion, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Category Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('ats.detailedAnalysisByCategory')}</h3>
                <div className="space-y-4">
                  {analysisResult.categoryScores.map(category => (
                    <div key={category.category} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{category.categoryName}</h4>
                        <span className={`text-lg font-bold ${
                          category.score >= 80 ? 'text-green-600' :
                          category.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {category.score}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        {category.checks.map(check => (
                          <ATSWarning key={check.id} check={check} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Issues */}
              {analysisResult.criticalIssues.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">
                    {t('ats.criticalIssues')} ({analysisResult.criticalIssues.length})
                  </h3>
                  <div className="space-y-2">
                    {analysisResult.criticalIssues.map(issue => (
                      <ATSWarning key={issue.id} check={issue} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
