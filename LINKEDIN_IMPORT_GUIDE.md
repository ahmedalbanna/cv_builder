# LinkedIn Import Guide

## Overview
The CV Builder now supports importing your professional data directly from LinkedIn! This feature saves you time by automatically populating your CV with information from your LinkedIn profile.

## How to Import from LinkedIn

### Method 1: Download Your LinkedIn Data (Recommended)

1. **Request Your Data from LinkedIn**
   - Log in to your LinkedIn account
   - Go to **Settings & Privacy** (click your profile photo → Settings & Privacy)
   - Navigate to **Data Privacy** → **Get a copy of your data**
   - Select "Want something in particular? Select the data files you're most interested in"
   
2. **Select the Following Data Types**
   - ✅ Profile
   - ✅ Positions (Work Experience)
   - ✅ Education
   - ✅ Skills
   - ✅ Certifications
   - ✅ Languages

3. **Request Archive**
   - Click **"Request archive"**
   - LinkedIn will email you when your data is ready (usually within 10-24 hours)

4. **Download and Extract**
   - Download the ZIP file from the email link
   - Extract the ZIP file to access the JSON files

5. **Import into CV Builder**
   - Click the **"Import LinkedIn"** button in the CV Builder
   - Select one or more JSON files from your LinkedIn data
   - Your data will be automatically imported!

---

## What Gets Imported

### ✅ Personal Information
- Full Name
- Professional Headline/Job Title
- Email Address
- Phone Number
- Location
- LinkedIn Profile URL
- Personal Website
- Professional Summary

### ✅ Work Experience
- Company Names
- Job Titles
- Locations
- Employment Dates (Start/End)
- Job Descriptions
- Key Achievements (automatically extracted from descriptions)

### ✅ Education
- Institution Names
- Degrees
- Fields of Study
- Graduation Dates
- GPA (if available)
- Activities and Honors

### ✅ Skills
- All your LinkedIn skills
- Automatically categorized (you can adjust categories after import)

### ✅ Certifications
- Certification Names
- Issuing Organizations
- Issue Dates
- Credential IDs
- Verification URLs

### ✅ Languages
- Language Names
- Proficiency Levels (Native, Fluent, Professional, Intermediate, Basic)

---

## Sample Data Format

For testing or reference, here's the expected LinkedIn data format:

```json
{
  "profile": {
    "First Name": "John",
    "Last Name": "Doe",
    "Headline": "Senior Software Engineer",
    "Summary": "Experienced developer...",
    "Email Address": "john@example.com",
    "Phone Numbers": "+1 555-123-4567",
    "Geo Location": "San Francisco, CA"
  },
  "positions": [
    {
      "Company Name": "Tech Corp",
      "Title": "Senior Developer",
      "Location": "SF, CA",
      "Started On": "2021-03-01",
      "Finished On": "",
      "Description": "Job description here..."
    }
  ],
  "education": [...],
  "skills": [...],
  "certifications": [...],
  "languages": [...]
}
```

A complete sample file is available as `sample-linkedin-data.json` in the project root.

---

## Tips for Best Results

### ✅ Do's
- **Keep your LinkedIn profile updated** before exporting
- **Use bullet points** in job descriptions for better achievement extraction
- **Include dates** for all positions and education
- **Add detailed descriptions** to showcase your accomplishments

### ❌ Don'ts
- Don't import multiple times without reviewing - it will add duplicate entries
- Don't use special characters or emojis excessively
- Don't leave important fields empty on LinkedIn

---

## Troubleshooting

### Import Failed
- **Check file format**: Ensure you're uploading a `.json` file from LinkedIn
- **Verify data structure**: Make sure the JSON file hasn't been modified
- **File size**: Very large files may take longer to process

### Missing Data
- **Not all fields imported**: Some LinkedIn fields may not have direct CV equivalents
- **Empty sections**: If LinkedIn sections are empty, they won't be imported
- **Custom fields**: LinkedIn custom fields may not be recognized

### Duplicate Entries
- **Clear existing data**: Consider creating a new CV profile before importing
- **Manual cleanup**: Review and delete duplicates after import

---

## Privacy & Security

- ✅ **All data processing happens locally** in your browser
- ✅ **No data is sent to external servers**
- ✅ **Your LinkedIn data stays on your device**
- ✅ **Auto-saved to browser local storage**

---

## After Import

1. **Review the imported data** for accuracy
2. **Remove duplicates** if importing into existing CV
3. **Customize descriptions** to match the job you're applying for
4. **Add projects** that aren't on LinkedIn
5. **Select a template** that showcases your experience
6. **Export to PDF** when ready!

---

## Support

If you encounter issues:
1. Check that your LinkedIn data export is complete
2. Verify the JSON file structure matches the expected format
3. Try importing one section at a time (if possible)
4. Create a new CV profile and try again

---

## Future Enhancements

Coming soon:
- 🔄 Direct LinkedIn API integration (no manual download needed)
- 🧹 Smart duplicate detection and merging
- 🎯 AI-powered description enhancement
- 📊 Skills recommendation based on industry

---

**Happy CV Building! 🚀**
