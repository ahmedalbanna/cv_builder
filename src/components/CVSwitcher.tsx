import { useState, useRef } from 'react'
import { useCV } from '../contexts/CVContext'
import { ChevronDown, Plus, Edit2, Copy, Trash2, Download, Upload, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function CVSwitcher() {
  const { t } = useTranslation()
  const {
    currentProfile,
    profiles,
    createNewProfile,
    switchProfile,
    deleteCurrentProfile,
    renameCurrentProfile,
    duplicateCurrentProfile,
    exportProfile,
    importProfile,
  } = useCV()

  const [isOpen, setIsOpen] = useState(false)
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newName, setNewName] = useState('')
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleNewProfile = () => {
    setShowNewDialog(true)
    setNewName('')
    setIsOpen(false)
  }

  const confirmNewProfile = () => {
    if (newName.trim()) {
      createNewProfile(newName.trim())
      setShowNewDialog(false)
      setNewName('')
    }
  }

  const handleRename = (profileId: string, currentName: string) => {
    setSelectedProfileId(profileId)
    setNewName(currentName)
    setShowRenameDialog(true)
    setIsOpen(false)
  }

  const confirmRename = () => {
    if (selectedProfileId && newName.trim()) {
      renameCurrentProfile(selectedProfileId, newName.trim())
      setShowRenameDialog(false)
      setNewName('')
      setSelectedProfileId(null)
    }
  }

  const handleDelete = (profileId: string) => {
    setSelectedProfileId(profileId)
    setShowDeleteDialog(true)
    setIsOpen(false)
  }

  const confirmDelete = () => {
    if (selectedProfileId) {
      deleteCurrentProfile(selectedProfileId)
      setShowDeleteDialog(false)
      setSelectedProfileId(null)
    }
  }

  const handleDuplicate = (profileId: string) => {
    duplicateCurrentProfile(profileId)
    setIsOpen(false)
  }

  const handleExport = (profileId: string) => {
    exportProfile(profileId)
    setIsOpen(false)
  }

  const handleImport = () => {
    fileInputRef.current?.click()
    setIsOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        importProfile(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-700">
            {currentProfile?.name || 'Loading...'}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">My CVs</h3>
              </div>

              {/* CV List */}
              <div className="max-h-96 overflow-y-auto">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                      currentProfile?.id === profile.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => {
                          switchProfile(profile.id)
                          setIsOpen(false)
                        }}
                        className="flex-1 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{profile.name}</span>
                          {currentProfile?.id === profile.id && (
                            <Check className="w-4 h-4 text-primary-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Updated {new Date(profile.updatedAt).toLocaleDateString()}
                        </p>
                      </button>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRename(profile.id, profile.name)
                          }}
                          className="p-1 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                          title={t('actions.rename')}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDuplicate(profile.id)
                          }}
                          className="p-1 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                          title={t('actions.duplicate')}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleExport(profile.id)
                          }}
                          className="p-1 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                          title={t('actions.export')}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {profiles.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(profile.id)
                            }}
                            className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                            title={t('actions.delete')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="px-4 py-3 border-t border-gray-200 space-y-2">
                <button
                  onClick={handleNewProfile}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create New CV
                </button>
                <button
                  onClick={handleImport}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Import CV
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* New Profile Dialog */}
      {showNewDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('cv.createNew')}</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter CV name (e.g., Software Engineer CV)"
              className="input-field mb-4"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && confirmNewProfile()}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewDialog(false)
                  setNewName('')
                }}
                className="btn-secondary"
              >
                {t('actions.cancel')}
              </button>
              <button
                onClick={confirmNewProfile}
                disabled={!newName.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('actions.create')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Dialog */}
      {showRenameDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('cv.renameCv')}</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t('ui.enterNewName')}
              className="input-field mb-4"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && confirmRename()}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRenameDialog(false)
                  setNewName('')
                  setSelectedProfileId(null)
                }}
                className="btn-secondary"
              >
                {t('actions.cancel')}
              </button>
              <button
                onClick={confirmRename}
                disabled={!newName.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('actions.rename')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('cv.deleteCv')}</h3>
            <p className="text-gray-600 mb-4">
              {t('cv.deleteConfirmation')}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteDialog(false)
                  setSelectedProfileId(null)
                }}
                className="btn-secondary"
              >
                {t('actions.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {t('actions.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
