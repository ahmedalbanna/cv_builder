# CV Builder Application

A modern, feature-rich CV/Resume builder built with React, TypeScript, and Tailwind CSS. Create professional resumes with real-time preview and export to PDF.

![CV Builder](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue)

## ✨ Features

### Core Functionality
- **Real-time Preview**: See your CV update instantly as you type
- **Multiple Templates**: Choose from 3 professional templates (Modern, Classic, Creative)
- **PDF Export**: Download your CV as a high-quality PDF
- **Auto-save**: Your data is automatically saved in browser local storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### CV Sections
- ✅ Personal Information (with contact details and social links)
- ✅ Professional Summary
- ✅ Work Experience (with CRUD operations)
- ✅ Education (with CRUD operations)
- ✅ Skills (categorized: technical, soft skills, languages, other)
- ✅ Projects (with technologies and links)
- ✅ Certifications (with credentials)
- ✅ Languages (with proficiency levels)

### Templates

#### 1. Modern Template
- Clean contemporary design
- Colorful header with gradient
- Blue accent colors
- Perfect for tech and creative industries

#### 2. Classic Template
- Traditional professional layout
- Serif fonts for formal appearance
- Black and white color scheme
- Ideal for corporate and traditional industries

#### 3. Creative Template
- Two-column layout with sidebar
- Dark sidebar with white content area
- Timeline-style experience section
- Great for designers and creative professionals

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
cv-builder/
├── src/
│   ├── components/
│   │   ├── forms/              # Form components for each CV section
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── WorkExperienceForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   ├── ProjectsForm.tsx
│   │   │   ├── CertificationsForm.tsx
│   │   │   └── LanguagesForm.tsx
│   │   ├── templates/          # CV templates
│   │   │   ├── ModernTemplate.tsx
│   │   │   ├── ClassicTemplate.tsx
│   │   │   └── CreativeTemplate.tsx
│   │   ├── Header.tsx          # App header
│   │   ├── CVForm.tsx          # Main form container
│   │   ├── CVPreview.tsx       # Preview container
│   │   ├── TemplateSelector.tsx
│   │   └── ExportButton.tsx
│   ├── contexts/
│   │   └── CVContext.tsx       # State management with Context API
│   ├── types/
│   │   └── cv.ts               # TypeScript interfaces
│   ├── utils/
│   │   ├── helpers.ts          # Utility functions
│   │   └── pdfExport.ts        # PDF generation logic
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🛠️ Technologies Used

### Frontend Framework
- **React 18.2**: Modern UI library with hooks
- **TypeScript 5.2**: Type-safe development
- **Vite**: Fast build tool and dev server

### Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Custom CSS**: Additional styles and print styles

### State Management
- **React Context API**: Centralized state management
- **Local Storage**: Persistent data storage

### Forms & Validation
- **React Hook Form**: Efficient form handling
- **Zod**: TypeScript-first schema validation

### PDF Generation
- **jsPDF**: PDF document generation
- **html2canvas**: HTML to canvas conversion

### Icons
- **Lucide React**: Beautiful, consistent icons

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript-specific linting rules

## 💡 Usage Guide

### 1. Fill in Personal Information
- Add your name, contact details, and professional summary
- Include links to your website, LinkedIn, and GitHub

### 2. Add Work Experience
- Click "Add Work Experience"
- Fill in company, position, dates, and description
- Edit or delete entries as needed

### 3. Add Education
- Click "Add Education"
- Include institution, degree, field of study, and dates
- Optional: Add GPA

### 4. Add Skills
- Select skill category (Technical, Soft Skills, Languages, Other)
- Choose proficiency level
- Add as many skills as needed

### 5. Optional Sections
- **Projects**: Showcase your work with descriptions and technologies
- **Certifications**: Add professional certifications
- **Languages**: List languages you speak with proficiency levels

### 6. Choose a Template
- Select from Modern, Classic, or Creative templates
- Preview updates in real-time

### 7. Export to PDF
- Click "Export to PDF" button
- Your CV will be downloaded automatically

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize your primary color palette
        500: '#your-color',
        600: '#your-color',
        // ...
      },
    },
  },
}
```

### Adding New Templates
1. Create a new template component in `src/components/templates/`
2. Import and add it to `CVPreview.tsx`
3. Update the `TemplateType` in `src/types/cv.ts`
4. Add the option in `TemplateSelector.tsx`

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Split-screen view (form + preview)
- **Tablet**: Collapsible sections
- **Mobile**: Toggle between form and preview views

## 🔒 Privacy & Data

- All data is stored locally in your browser
- No data is sent to any server
- Clear browser data to reset the application
- Export your CV to keep a backup

## 🐛 Known Issues & Limitations

- PDF export quality depends on browser rendering
- Very long CVs may require manual page break adjustments
- Images/photos are not currently supported
- Internet connection required for Google Fonts

## 🚧 Future Enhancements

- ✅ local storage
- [ ] Arabic Lanaguage
- [ ] Multiple CV management
- [ ] AI-powered content suggestions
- [ ] ATS (Applicant Tracking System) optimization checker
- [ ] Cover letter builder
- [ ] Import from LinkedIn
- [ ] Photo upload support
- [ ] Custom color themes
- [ ] Drag-and-drop section reordering
- [ ] More template options
- [ ] Mobile Application (APK, IOS)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Happy CV Building! 🎉**

Made with ❤️ using React and TypeScript
