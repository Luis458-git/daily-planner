export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
export const CATEGORIES = ['Programación', 'Inglés', 'Ejercicio', 'Comida', 'Descanso', 'Personal']
export const STORAGE_KEY = 'daily-planner-v1'
export const dateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
export const dayIndex = (date = new Date()) => (date.getDay() + 6) % 7
export const minutes = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3))
export const duration = (activity) => minutes(activity.end) - minutes(activity.start)
export const ordered = (activities) => [...activities].sort((a, b) => a.start.localeCompare(b.start))
export function weekDates(now = new Date()) {
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayIndex(now))
  return DAYS.map((_, index) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index))
}
export function initialData() {
  const templates = [
    ['Programación Frontend', 'Programación', '09:00', '10:30'],
    ['Inglés: lectura y conversación', 'Inglés', '11:00', '11:45'],
    ['Almuerzo y caminata', 'Comida', '13:00', '14:00'],
    ['Entrenamiento físico', 'Ejercicio', '17:00', '17:45'],
    ['Lectura personal', 'Personal', '20:00', '20:30'],
  ]
  return { activities: templates.map(([title, category, start, end], index) => ({ id: `initial-${index}`, title, category, start, end, days: index === 2 || index === 4 ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4], reminder: '10', completedDates: [] })), sessions: [], notices: [] }
}
export function validateActivity(activity) {
  if (!activity.title?.trim()) return 'Escribe el nombre de la actividad.'
  if (activity.title.trim().length > 100) return 'El título debe tener como máximo 100 caracteres.'
  if (!CATEGORIES.includes(activity.category)) return 'Selecciona una categoría válida.'
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(activity.start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(activity.end)) return 'Indica horarios válidos.'
  if (duration(activity) <= 0) return 'La hora final debe ser posterior a la inicial.'
  if (!Array.isArray(activity.days) || !activity.days.length || activity.days.some(day => !Number.isInteger(day) || day < 0 || day > 6)) return 'Selecciona al menos un día válido.'
  if (!['off', '0', '5', '10', '30'].includes(activity.reminder)) return 'Selecciona un recordatorio válido.'
  return ''
}
export function readData(storage) {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return initialData()
  const data = JSON.parse(raw)
  if (!Array.isArray(data.activities) || !Array.isArray(data.sessions) || !Array.isArray(data.notices) || data.activities.some(a => validateActivity(a) || typeof a.id !== 'string' || !Array.isArray(a.completedDates))) throw new Error('Los datos guardados no tienen el formato esperado.')
  return data
}
export function reminderCandidates(activities, now = new Date()) {
  const today = dateKey(now)
  return activities.filter(a => a.days.includes(dayIndex(now)) && a.reminder !== 'off' && !a.completedDates.includes(today)).map(a => {
    const start = new Date(`${today}T${a.start}:00`).getTime()
    return { id: `${a.id}-${today}-${a.start}-${a.reminder}`, activityId: a.id, title: a.title, start: a.start, due: start - Number(a.reminder) * 60000, expires: start + 60000 }
  }).filter(n => now.getTime() >= n.due && now.getTime() < n.expires)
}
