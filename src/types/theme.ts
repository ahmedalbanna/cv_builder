export interface ColorTheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  text: string
  background: string
  isCustom?: boolean
}

export const predefinedThemes: ColorTheme[] = [
  {
    id: 'blue',
    name: 'Professional Blue',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#60a5fa',
    text: '#1f2937',
    background: '#f9fafb',
  },
  {
    id: 'green',
    name: 'Fresh Green',
    primary: '#059669',
    secondary: '#047857',
    accent: '#34d399',
    text: '#1f2937',
    background: '#f0fdf4',
  },
  {
    id: 'purple',
    name: 'Creative Purple',
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#a78bfa',
    text: '#1f2937',
    background: '#faf5ff',
  },
  {
    id: 'orange',
    name: 'Energetic Orange',
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#fb923c',
    text: '#1f2937',
    background: '#fff7ed',
  },
  {
    id: 'teal',
    name: 'Modern Teal',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#5eead4',
    text: '#1f2937',
    background: '#f0fdfa',
  },
  {
    id: 'red',
    name: 'Bold Red',
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#f87171',
    text: '#1f2937',
    background: '#fef2f2',
  },
  {
    id: 'indigo',
    name: 'Corporate Indigo',
    primary: '#4f46e5',
    secondary: '#4338ca',
    accent: '#818cf8',
    text: '#1f2937',
    background: '#eef2ff',
  },
  {
    id: 'slate',
    name: 'Elegant Slate',
    primary: '#475569',
    secondary: '#334155',
    accent: '#94a3b8',
    text: '#1f2937',
    background: '#f8fafc',
  },
]

export const defaultTheme: ColorTheme = predefinedThemes[0]
