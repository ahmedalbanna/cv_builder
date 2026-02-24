# Photo Upload Feature Guide

## Overview
The CV Builder now includes a professional photo upload feature that allows users to add their profile picture to their CV/resume.

## Features

### 🎨 Upload Methods
- **Click to Upload**: Click the upload area to browse and select an image
- **Drag & Drop**: Drag an image file directly into the upload area
- **File Validation**: Automatically validates file type and size

### 📋 Specifications
- **Supported Formats**: PNG, JPG, JPEG, GIF, WebP
- **Maximum File Size**: 5MB
- **Recommended Size**: Square image, at least 400x400px
- **Storage**: Base64 encoded and stored in browser localStorage

### ✨ User Experience
- **Live Preview**: See your photo immediately after upload
- **Circular Display**: Photo displayed as professional circular avatar
- **Easy Removal**: One-click photo removal with confirmation
- **Change Photo**: Quick replace functionality without removing first
- **Responsive Design**: Works perfectly on all device sizes

## How to Use

### 1. Upload a Photo
1. Navigate to the **Personal Information** section
2. Click the photo upload area or drag an image
3. Select an image file (max 5MB)
4. Photo appears immediately in the preview

### 2. View in Templates
The photo automatically appears in all three templates:

#### Modern Template
- Displayed in the header alongside your name
- 96x96px circular avatar with white border
- Positioned on the left side of contact information

#### Classic Template
- Centered at the top of the CV
- 112x112px circular avatar with dark border
- Professional and traditional appearance

#### Creative Template
- Prominently displayed in the left sidebar
- 128x128px circular avatar with blue accent border
- Eye-catching modern design

### 3. Remove or Change Photo
- **Remove**: Click the red X button on the photo
- **Change**: Click the blue upload button or click the photo area again
- Changes are saved automatically to localStorage

## Technical Implementation

### Component Structure
```
PhotoUpload.tsx
├── Drag & Drop Handler
├── File Input Handler
├── File Validation (type & size)
├── Base64 Conversion
└── Preview Display
```

### Integration Points
- **PersonalInfoForm**: Upload interface
- **CVContext**: State management and persistence
- **Templates**: Photo display in all three designs
- **localStorage**: Automatic saving and loading

### Data Flow
1. User selects/drops image file
2. File validated (type, size)
3. Converted to Base64 string
4. Stored in CVState.personalInfo.photo
5. CVContext saves to localStorage
6. Templates display the photo
7. PDF export includes the photo

## PDF Export Support
✅ Photos are included in PDF exports
- Embedded as Base64 images
- Maintains quality and circular styling
- Works with all three templates

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Best Practices

### Photo Guidelines
1. **Professional Appearance**: Use a clear, professional headshot
2. **Good Lighting**: Well-lit photo with neutral background
3. **Square Aspect**: Square images work best (1:1 ratio)
4. **High Resolution**: At least 400x400px for quality
5. **File Size**: Compress large images before upload

### Accessibility
- Alt text automatically uses your full name
- Keyboard accessible upload controls
- ARIA labels for screen readers
- Clear visual feedback for interactions

## Troubleshooting

### Photo Not Uploading
- Check file size is under 5MB
- Verify file format (PNG, JPG, GIF)
- Clear browser cache and try again

### Photo Quality Issues
- Use higher resolution source image
- Ensure square aspect ratio
- Avoid heavily compressed images

### Photo Not Appearing in PDF
- Verify photo loads in preview first
- Try re-uploading the photo
- Check browser console for errors

## Storage Limits
- Photos stored as Base64 in localStorage
- Typical photo size: 50-500KB (Base64)
- localStorage limit: ~5-10MB (browser dependent)
- Recommendation: Keep photos under 1MB for best performance

## Future Enhancements
- [ ] Image cropping tool
- [ ] Filters and adjustments
- [ ] Multiple photo shapes (square, rounded)
- [ ] Photo position options
- [ ] Compression optimization
- [ ] Cloud storage option

## Support
For issues or questions about the photo upload feature, please check:
1. This guide
2. README.md for general setup
3. Browser console for error messages
