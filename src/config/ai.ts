export const AI_CONFIG = {
  // Ollama API endpoint (default local installation)
  apiEndpoint: 'https://11434-01kg5scn46xk1e7bgynxz1vghf.cloudspaces.litng.ai',

  // Default model (can be changed by user)
  defaultModel: 'llama3.2:1b',

  // Available models
  availableModels: [
    { id: 'llama3.2:1b', name: 'Llama 3.2 1B', description: 'Fast and efficient (1.3GB)' },
    { id: 'llama3.2:3b', name: 'Llama 3.2 3B', description: 'Balanced quality and speed (2GB)' },
    { id: 'llama3:8b', name: 'Llama 3 8B', description: 'High quality responses (4.7GB)' },
    { id: 'mistral', name: 'Mistral 7B', description: 'Great for professional writing (4.1GB)' },
    { id: 'llama2', name: 'Llama 2', description: 'Classic model (3.8GB)' },
  ],

  // Request timeout (ms)
  timeout: 30000,

  // Temperature for creativity (0-1)
  temperature: 0.7,
}

export const AI_PROMPTS = {
  professionalSummary: (jobTitle: string, experience: string) => `
You are a professional CV writer. Create a compelling 2-3 sentence professional summary for a CV.

Job Title: ${jobTitle || 'Professional'}
Years of Experience: ${experience || 'Several years'}

Requirements:
- Start with the job title and years of experience
- Highlight 2-3 key strengths or achievements
- Use strong action words
- Keep it concise and impactful
- Focus on value proposition

Provide ONLY the professional summary text, no explanations or additional formatting.
`,

  improveBulletPoint: (bulletPoint: string, jobTitle: string) => `
You are a professional CV writer. Improve this CV bullet point to make it more impactful.

Job Title: ${jobTitle}
Original: ${bulletPoint}

Requirements:
- Start with a strong action verb
- Add specific metrics or results if possible (use realistic placeholders like "X%", "Y users")
- Make it concise (1-2 lines max)
- Focus on achievements, not just responsibilities
- Use professional language

Provide 3 different variations, numbered 1-3. Each variation should be on its own line.
`,

  generateJobDescription: (jobTitle: string, company: string) => `
You are a professional CV writer. Generate 3-4 impactful bullet points for this job experience.

Job Title: ${jobTitle}
Company: ${company}

Requirements:
- Start each bullet with a strong action verb
- Include specific achievements and metrics (use realistic placeholders)
- Show progression and impact
- Be concise and professional
- Focus on results, not just tasks

Provide exactly 3-4 bullet points, each on a new line starting with "• ".
`,

  improveProjectDescription: (projectName: string, currentDescription: string) => `
You are a professional CV writer. Improve this project description for a CV.

Project: ${projectName}
Current Description: ${currentDescription || 'Technical project'}

Requirements:
- Highlight the problem solved and impact
- Mention key technologies if relevant
- Include measurable results if possible
- Keep it to 2-3 sentences
- Make it achievement-focused

Provide ONLY the improved description, no explanations.
`,

  suggestSkills: (jobTitle: string, experience: string) => `
You are a professional CV writer. Suggest 8-10 relevant skills for this professional.

Job Title: ${jobTitle}
Experience Description: ${experience}

Requirements:
- Mix of technical and soft skills
- Industry-relevant skills
- Current and in-demand skills
- Appropriate for the seniority level

Provide skills as a comma-separated list only.
`,

  improveCertification: (certName: string) => `
You are a professional CV writer. Provide a brief, impactful description for this certification.

Certification: ${certName}

Requirements:
- One sentence describing value and relevance
- Professional tone
- Focus on what it demonstrates

Provide ONLY the description, no explanations.
`,

  extractKeywords: (jobDescription: string) => `
You are an ATS (Applicant Tracking System) expert. Extract the most important keywords and required skills from this job description.

Job Description:
${jobDescription}

Requirements:
- Extract technical skills, tools, and technologies
- Identify soft skills and qualifications
- Include action verbs and key phrases
- Focus on must-have requirements

Provide the keywords as a comma-separated list only.
`,

  analyzeSkillGap: (cvSkills: string, jobRequirements: string) => `
You are a career advisor. Compare the candidate's skills against job requirements and identify gaps.

Candidate's Skills: ${cvSkills}
Job Requirements: ${jobRequirements}

Provide analysis in this format:
MATCHED SKILLS: [list skills that match]
MISSING SKILLS: [list critical missing skills]
RECOMMENDATIONS: [3-4 specific suggestions to improve the match]
`,

  optimizeForATS: (content: string, keywords: string) => `
You are an ATS optimization expert. Rewrite this CV content to be more ATS-friendly while incorporating these keywords naturally.

Keywords to include: ${keywords}
Original content:
${content}

Requirements:
- Incorporate keywords naturally without keyword stuffing
- Use action verbs and quantifiable achievements
- Keep it authentic and readable
- Maintain professional tone
- Keep similar length to original

Provide ONLY the optimized content, no explanations.
`,
}

export type PromptType = keyof typeof AI_PROMPTS
