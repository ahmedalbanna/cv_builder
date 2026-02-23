# AI-Powered Content Suggestions

## Overview
The CV Builder now includes AI-powered content suggestions using local AI models through Ollama. All AI processing happens locally on your machine, ensuring your data privacy.

## Features

### 🎯 Smart Content Generation
- **Professional Summary**: Generate compelling 2-3 sentence professional summaries based on your job title and experience
- **Job Descriptions**: Create impactful bullet points for work experience with action verbs and metrics
- **Project Descriptions**: Improve project descriptions to highlight impact and technologies
- **Skill Suggestions**: Get relevant skill recommendations based on your experience

### 🔒 Privacy First
- All AI processing happens locally on your computer
- No data is sent to external servers
- You have full control over the AI model and settings

### ⚡ Key Benefits
- Context-aware suggestions based on your CV content
- Multiple suggestion variations to choose from
- Easy to apply or customize suggestions
- Fallback suggestions when AI is unavailable

## Setup Instructions

### 1. Install Ollama

**macOS / Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download and install from [ollama.ai](https://ollama.ai)

### 2. Download AI Models

After installing Ollama, download the models you want to use:

```bash
# Recommended: Llama 2 (fast and efficient)
ollama pull llama2

# Alternative options:
ollama pull mistral      # High quality responses
ollama pull llama3       # Latest model
ollama pull codellama    # Good for technical content
```

### 3. Start Ollama

Ollama runs automatically after installation on port 11434. To verify:

```bash
ollama list  # Show installed models
ollama serve # Start the service (if not running)
```

### 4. Configure in CV Builder

1. Open the CV Builder application
2. Click the **"AI Settings"** button in the top toolbar
3. Click **"Test Connection"** to verify Ollama is running
4. Select your preferred model from the dropdown
5. Start using AI suggestions!

## Usage

### Professional Summary
1. Fill in your **Job Title** in the Personal Info section
2. Click the **"Generate with AI"** button next to the Summary field
3. Review the AI-generated suggestions
4. Click **"Apply"** to use a suggestion or copy and customize it

### Work Experience
1. Enter the **Company** and **Position** in the Work Experience form
2. Click **"Generate with AI"** next to the Description field
3. Choose from multiple bullet point variations
4. Apply or customize to match your actual experience

### Project Descriptions
1. Enter the **Project Name** in the Projects form
2. Click **"Improve with AI"** next to the Description field
3. Review improved descriptions that highlight impact
4. Apply or edit as needed

## Tips for Best Results

### ✅ Do's
- Provide accurate job titles and company names for context
- Review and customize AI suggestions to match your actual experience
- Use AI as a starting point, not the final version
- Add specific metrics and achievements that are unique to you

### ❌ Don'ts
- Don't use AI suggestions without reviewing them
- Don't include false information suggested by AI
- Don't rely solely on AI - add your personal touch
- Don't forget to verify all facts and numbers

## AI Settings

### API Endpoint
- **Default**: `http://localhost:11434`
- Change if Ollama is running on a different port or machine

### Model Selection
- **llama2**: Fast, efficient, good for general content
- **mistral**: Higher quality, slightly slower
- **llama3**: Latest model, best quality
- **codellama**: Optimized for technical content

### Connection Status
- **Green (Connected)**: AI features are ready to use
- **Red (Disconnected)**: Check if Ollama is running

## Troubleshooting

### "Cannot connect to Ollama"
1. Make sure Ollama is installed and running
2. Check that it's listening on port 11434: `curl http://localhost:11434/api/tags`
3. Try restarting the Ollama service
4. Verify firewall settings aren't blocking the connection

### "Request timed out"
1. Large models may take longer - wait a moment
2. Try a smaller/faster model like llama2
3. Check your system resources (RAM, CPU)

### "Model not found"
1. Download the model: `ollama pull llama2`
2. Refresh the models list in AI Settings
3. Select an available model from the dropdown

### Slow Performance
1. Use a smaller model (llama2 instead of llama3)
2. Close other applications to free up resources
3. Consider upgrading RAM if consistently slow

## Technical Details

### Architecture
- **Frontend**: React with TypeScript
- **AI Service**: Ollama REST API
- **State Management**: React Context API
- **Local Storage**: Configuration persisted in browser

### API Integration
- Uses Ollama's `/api/generate` endpoint
- Non-streaming responses for simplicity
- 30-second timeout for requests
- Automatic error handling and fallbacks

### Prompt Engineering
Custom prompts optimized for CV content:
- Professional tone and language
- Action-oriented descriptions
- Metric-focused suggestions
- ATS-friendly formatting

## Privacy & Security

- ✅ All processing happens on your local machine
- ✅ No data sent to external servers
- ✅ No internet connection required (after model download)
- ✅ CV data stored only in browser local storage
- ✅ You control which AI model to use

## Future Enhancements

Planned features:
- [ ] Skill extraction from job descriptions
- [ ] ATS optimization suggestions
- [ ] Industry-specific templates and prompts
- [ ] Multi-language support
- [ ] Batch processing for multiple sections
- [ ] AI-powered formatting suggestions

## Support

If you encounter issues:
1. Check the AI Settings panel for connection status
2. Review the console for error messages
3. Verify Ollama installation and model availability
4. Use fallback suggestions when AI is unavailable

---

**Note**: AI suggestions are meant to assist, not replace your own content. Always review and customize suggestions to accurately reflect your experience and achievements.
