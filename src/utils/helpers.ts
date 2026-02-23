export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const formatDate = (date: string): string => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export const getDateRange = (startDate: string, endDate: string, current: boolean): string => {
  const start = formatDate(startDate)
  const end = current ? 'Present' : formatDate(endDate)
  return `${start} - ${end}`
}

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const re = /^[\d\s\-\+\(\)]+$/
  return re.test(phone)
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
