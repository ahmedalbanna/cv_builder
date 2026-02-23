# Multiple CV Management Guide

## Overview

The CV Builder now supports managing multiple CV profiles, allowing you to create, edit, and maintain different versions of your resume for different job applications or career paths.

## Features

### 1. **Create Multiple CVs**
- Click on the CV dropdown in the header
- Click "Create New CV"
- Enter a descriptive name (e.g., "Software Engineer CV", "Manager CV")
- Your new CV is created and automatically selected

### 2. **Switch Between CVs**
- Click the CV dropdown to see all your CVs
- Click on any CV to switch to it
- The currently active CV is marked with a checkmark
- Each CV shows its last updated date

### 3. **Rename CVs**
- Click the edit icon (✏️) next to any CV
- Enter the new name
- Click "Rename" to save

### 4. **Duplicate CVs**
- Click the copy icon (📋) next to any CV
- A duplicate is created with " (Copy)" appended to the name
- Great for creating variations of similar CVs

### 5. **Export CVs**
- Click the download icon (⬇️) to export a CV as JSON
- Save the file to your computer
- Use this for backup or sharing CV data

### 6. **Import CVs**
- Click "Import CV" in the dropdown
- Select a previously exported JSON file
- The CV is imported with " (Imported)" appended to the name

### 7. **Delete CVs**
- Click the trash icon (🗑️) next to any CV
- Confirm the deletion
- Note: You cannot delete your last remaining CV

## Storage

All CVs are stored in your browser's local storage:
- **Automatic saving**: Changes are saved automatically as you type
- **Persistent storage**: CVs remain available even after closing the browser
- **Privacy**: All data stays on your device

## Technical Details

### Data Structure

Each CV profile contains:
```typescript
{
  id: string,              // Unique identifier
  name: string,            // CV name
  createdAt: string,       // Creation timestamp
  updatedAt: string,       // Last modification timestamp
  cvData: {                // CV content
    selectedTemplate: string,
    personalInfo: {...},
    workExperience: [...],
    education: [...],
    skills: [...],
    certifications: [...],
    projects: [...],
    languages: [...]
  }
}
```

### Local Storage Keys

- `cv-builder-profiles`: Array of all CV profiles
- `cv-builder-active-profile`: ID of the currently active profile

### Migration from Old Version

If you had data from the previous single-CV version:
- Your old CV data is automatically preserved
- A new profile system is initialized
- Your existing CV becomes "My CV"

## Best Practices

1. **Descriptive Names**: Use clear names like "Software Engineer - Tech Companies" or "Manager - Finance Sector"

2. **Regular Exports**: Export important CVs periodically as backups

3. **Template Variations**: Create different CVs using different templates for different industries

4. **Targeted Content**: Customize each CV for specific job types or industries

5. **Version Control**: Keep multiple versions for different career stages

## Keyboard Shortcuts

- **Enter**: Confirm dialog actions (rename, create)
- **Escape**: Close dropdowns and dialogs (when implemented)

## Limitations

- **Browser-specific**: CVs are stored per browser/device
- **Storage limit**: Browser local storage has a limit (~5-10MB typically)
- **No cloud sync**: Data is not synchronized across devices

## Tips

- **Export before clearing browser data**: Clearing browser cache/data will delete all CVs
- **Use descriptive names**: Makes it easier to find the right CV later
- **Create templates**: Make a base CV and duplicate it for specific applications
- **Regular backups**: Export important CVs to JSON files periodically

## Troubleshooting

### CV Not Saving
- Check browser storage quota
- Ensure cookies/local storage are enabled
- Try exporting and re-importing the CV

### CV List Not Updating
- Refresh the page
- Check browser console for errors

### Lost CVs
- Check if you're using the same browser/device
- Look for exported JSON backup files
- Check browser's local storage manually

## API Reference

### Context Methods

```typescript
// Create new profile
createNewProfile(name: string): void

// Switch to different profile
switchProfile(profileId: string): void

// Delete a profile
deleteCurrentProfile(profileId: string): void

// Rename a profile
renameCurrentProfile(profileId: string, newName: string): void

// Duplicate a profile
duplicateCurrentProfile(profileId: string): void

// Export profile as JSON
exportProfile(profileId: string): void

// Import profile from JSON
importProfile(jsonData: string): void

// Refresh profile list
refreshProfiles(): void
```

### Context Properties

```typescript
// Current active profile
currentProfile: CVProfile | null

// List of all profiles (metadata only)
profiles: CVProfileMetadata[]

// Current CV data
cvData: CVState
```

## Future Enhancements

Potential features for future versions:
- Cloud synchronization
- Collaborative editing
- Template marketplace
- AI-powered suggestions per profile
- Profile analytics
- Tagging system
- Search/filter profiles
- Profile folders/categories
