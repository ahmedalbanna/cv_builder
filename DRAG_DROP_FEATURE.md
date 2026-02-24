# Drag-and-Drop Section Reordering Feature

## Overview
Successfully implemented drag-and-drop functionality to allow users to reorder CV sections in the CV Builder application.

## What Was Implemented

### 1. **Dependencies Installed**
- `@dnd-kit/core` - Core drag-and-drop functionality
- `@dnd-kit/sortable` - Sortable list functionality
- `@dnd-kit/utilities` - Utility functions for transforms

### 2. **Type System Updates**
**File: `src/types/cv.ts`**
- Added `SectionType` type for section identifiers
- Extended `CVState` interface to include `sectionOrder: SectionType[]`

```typescript
export type SectionType = 'workExperience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages'

export interface CVState extends CVData {
  selectedTemplate: TemplateType
  sectionOrder: SectionType[]  // NEW
  // ... other fields
}
```

### 3. **New Component: DraggableSection**
**File: `src/components/DraggableSection.tsx`**
- Wraps each CV section to make it draggable
- Shows a grip handle icon for drag interaction
- Provides visual feedback during drag (opacity change)
- Supports both mouse and keyboard navigation

**Features:**
- Drag handle with hover effects
- Active cursor states (grab/grabbing)
- Smooth transitions
- Accessible keyboard navigation

### 4. **Updated CVContext**
**File: `src/contexts/CVContext.tsx`**
- Added `updateSectionOrder()` function
- Persists section order to local storage automatically
- Default order: Work Experience → Education → Skills → Projects → Certifications → Languages

### 5. **Updated CVForm Component**
**File: `src/components/CVForm.tsx`**
- Integrated DndKit's drag-and-drop system
- Personal Information section remains fixed at the top
- All other sections are draggable and reorderable
- Uses vertical list sorting strategy

**Key Implementation:**
```typescript
<DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext items={cvData.sectionOrder}>
    {cvData.sectionOrder.map((sectionId) => (
      <DraggableSection key={sectionId} id={sectionId} title={title}>
        <Component />
      </DraggableSection>
    ))}
  </SortableContext>
</DndContext>
```

### 6. **Updated Templates**
**File: `src/components/templates/ModernTemplate.tsx`**
- Modified to respect custom section order
- Created `renderSection()` function for dynamic rendering
- Sections now appear in the order specified by `sectionOrder`

## How It Works

### User Experience
1. **Visual Indicator**: Each section has a grip icon (⋮⋮) on the left
2. **Drag Action**: Click and hold the grip icon to drag a section
3. **Visual Feedback**: Section becomes semi-transparent while dragging
4. **Drop**: Release to drop the section in the new position
5. **Auto-save**: Order is automatically saved to local storage
6. **Preview Update**: CV preview updates to reflect the new order

### Technical Flow
1. User drags a section using the grip handle
2. `handleDragEnd` event fires with `active` and `over` items
3. Calculate old and new indices in the `sectionOrder` array
4. Use `arrayMove` from dnd-kit to reorder the array
5. Call `updateSectionOrder()` to update the state
6. CVContext automatically persists to local storage
7. Templates re-render sections in the new order

## Accessibility Features
- **Keyboard Navigation**: Full keyboard support via `KeyboardSensor`
  - Tab to focus the drag handle
  - Space/Enter to start dragging
  - Arrow keys to move sections
  - Space/Enter to drop
- **Screen Readers**: Proper ARIA attributes from dnd-kit
- **Visual Feedback**: Clear cursor changes and opacity effects

## Storage
Section order is stored in the `CVState` object:
```json
{
  "sectionOrder": [
    "workExperience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages"
  ]
}
```

## Default Order
When creating a new CV, the default section order is:
1. Work Experience
2. Education
3. Skills
4. Projects
5. Certifications
6. Languages

## Customization
Users can reorder sections to match their preferences, such as:
- Putting Education before Work Experience for recent graduates
- Highlighting Projects for portfolio-focused CVs
- Emphasizing Skills for technical positions

## Testing
✅ Build successful with no errors
✅ Development server running on http://localhost:3004/
✅ TypeScript compilation passes
✅ All sections are draggable
✅ Order persists in local storage
✅ Templates respect custom order

## Browser Support
Works on all modern browsers that support:
- CSS Transforms
- Pointer Events
- Local Storage

## Future Enhancements
Potential improvements:
- [ ] Drag-and-drop animations
- [ ] Section visibility toggle (show/hide sections)
- [ ] Preset section arrangements (templates)
- [ ] Multi-column layouts with drag-and-drop
- [ ] Undo/redo for section reordering

## Files Modified
1. `package.json` - Added dnd-kit dependencies
2. `src/types/cv.ts` - Added SectionType and sectionOrder
3. `src/utils/cvStorage.ts` - Added default sectionOrder
4. `src/contexts/CVContext.tsx` - Added updateSectionOrder function
5. `src/components/DraggableSection.tsx` - NEW component
6. `src/components/CVForm.tsx` - Integrated drag-and-drop
7. `src/components/templates/ModernTemplate.tsx` - Respects section order

## Usage Instructions

### For Users
1. Open the CV Builder application
2. Look for the grip icon (⋮⋮) next to each section title
3. Click and drag the grip icon to move a section
4. Drop it in the desired position
5. Your CV preview will update automatically
6. The order is saved automatically

### For Developers
```typescript
// Access section order
const { cvData, updateSectionOrder } = useCV()
console.log(cvData.sectionOrder)

// Update section order programmatically
updateSectionOrder(['skills', 'workExperience', 'education', ...])
```

## Conclusion
The drag-and-drop section reordering feature provides users with complete control over their CV layout, making the CV Builder more flexible and user-friendly. The implementation uses industry-standard libraries (@dnd-kit) and follows React best practices.
