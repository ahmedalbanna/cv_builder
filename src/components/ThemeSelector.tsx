import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useCV } from '../contexts/CVContext'
import { predefinedThemes, ColorTheme } from '../types/theme'
import { Palette, Check } from 'lucide-react'

export default function ThemeSelector() {
  const { t } = useTranslation()
  const { cvData, updateCVData } = useCV()
  const [showCustomPicker, setShowCustomPicker] = useState(false)
  const [customTheme, setCustomTheme] = useState<ColorTheme>({
    id: 'custom',
    name: 'Custom Theme',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#60a5fa',
    text: '#1f2937',
    background: '#f9fafb',
    isCustom: true,
  })

  const currentTheme = cvData.colorTheme || predefinedThemes[0]

  const handleThemeSelect = (theme: ColorTheme) => {
    updateCVData({ colorTheme: theme })
    setShowCustomPicker(false)
  }

  const handleCustomThemeChange = (field: keyof ColorTheme, value: string) => {
    setCustomTheme(prev => ({ ...prev, [field]: value }))
  }

  const applyCustomTheme = () => {
    updateCVData({ colorTheme: customTheme })
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">{t('ui.colorTheme')}</h3>
      </div>

      {/* Predefined Themes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {predefinedThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
              currentTheme.id === theme.id && !currentTheme.isCustom
                ? 'border-primary-600 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 h-8">
                <div
                  className="flex-1 rounded"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="flex-1 rounded"
                  style={{ backgroundColor: theme.secondary }}
                />
                <div
                  className="flex-1 rounded"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              <div className="text-xs font-medium text-gray-700 text-left">
                {theme.name}
              </div>
            </div>
            {currentTheme.id === theme.id && !currentTheme.isCustom && (
              <div className="absolute -top-2 -right-2 bg-primary-600 rounded-full p-1">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Custom Theme Section */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowCustomPicker(!showCustomPicker)}
          className={`w-full p-3 rounded-lg border-2 transition-all ${
            currentTheme.isCustom
              ? 'border-primary-600 ring-2 ring-primary-200'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {t('ui.customColors')}
              </span>
            </div>
            {currentTheme.isCustom && (
              <Check className="w-4 h-4 text-primary-600" />
            )}
          </div>
        </button>

        {showCustomPicker && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-text">{t('ui.primaryColor')}</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customTheme.primary}
                    onChange={(e) =>
                      handleCustomThemeChange('primary', e.target.value)
                    }
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.primary}
                    onChange={(e) =>
                      handleCustomThemeChange('primary', e.target.value)
                    }
                    className="input-field flex-1 font-mono text-sm"
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              <div>
                <label className="label-text">{t('ui.secondaryColor')}</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customTheme.secondary}
                    onChange={(e) =>
                      handleCustomThemeChange('secondary', e.target.value)
                    }
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.secondary}
                    onChange={(e) =>
                      handleCustomThemeChange('secondary', e.target.value)
                    }
                    className="input-field flex-1 font-mono text-sm"
                    placeholder="#1e40af"
                  />
                </div>
              </div>

              <div>
                <label className="label-text">{t('ui.accentColor')}</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customTheme.accent}
                    onChange={(e) =>
                      handleCustomThemeChange('accent', e.target.value)
                    }
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.accent}
                    onChange={(e) =>
                      handleCustomThemeChange('accent', e.target.value)
                    }
                    className="input-field flex-1 font-mono text-sm"
                    placeholder="#60a5fa"
                  />
                </div>
              </div>

              <div>
                <label className="label-text">{t('ui.textColor')}</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customTheme.text}
                    onChange={(e) =>
                      handleCustomThemeChange('text', e.target.value)
                    }
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.text}
                    onChange={(e) =>
                      handleCustomThemeChange('text', e.target.value)
                    }
                    className="input-field flex-1 font-mono text-sm"
                    placeholder="#1f2937"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={applyCustomTheme}
              className="btn-primary w-full mt-2"
            >
              {t('ui.applyCustomTheme')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
