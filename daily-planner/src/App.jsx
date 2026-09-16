import { useState, useEffect, useRef } from 'react'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import Weekly from './Pages/Weekly'
import Activities from './Pages/Activities'
import Focus from './Pages/Focus'
import Statistics from './Pages/Statistics'
import useTimer from './Components/useTimer'
import useReminders from './Components/useReminders'
import { readData, initialData, STORAGE_KEY, dateKey, dayIndex, weekDates } from './Services/routineService'
import './Styles/App.css'
import './Styles/Dashboard.css'
import './Styles/Routine.css'

function load() {
  try { return { data: readData(localStorage), error: '' } }
  catch { return { data: initialData(), error: 'No se pudieron leer los datos guardados. Se muestran ejemplos; los datos anteriores no se sobrescribirán.' } }
}
const pages = ['dashboard', 'week', 'timer', 'activities', 'stats']
export default function App() {
  const [initial] = useState(load)
  const [data, setData] = useState(initial.data)
  const [storageError, setStorageError] = useState(initial.error)
  const [page, setPage] = useState(() => pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [today, setToday] = useState(() => dateKey())
  const [selectedDay, setSelectedDay] = useState(() => dayIndex())
  const [editing, setEditing] = useState(null)
  const [formKey, setFormKey] = useState(0)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState('')
  const [deleting, setDeleting] = useState(null)
  const deleteDialog = useRef(null)
  const timer = useTimer(session => setData(previous => ({ ...previous, sessions: [...previous.sessions, session] })))
  const reminders = useReminders(data.activities, data.notices, setData)
  // Persistencia: cada cambio guarda el estado completo en el navegador.
  useEffect(() => {
    if (initial.error) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }
    catch { queueMicrotask(() => setStorageError('No se pudieron guardar los cambios. Comprueba el espacio o los permisos de almacenamiento.')) }
  }, [data, initial.error])
  useEffect(() => {
    const interval = setInterval(() => setToday(dateKey()), 1000)
    function onHash() { const next = location.hash.slice(1); if (pages.includes(next)) setPage(next) }
    window.addEventListener('hashchange', onHash)
    return () => { clearInterval(interval); window.removeEventListener('hashchange', onHash) }
  }, [])
  function navigate(next) { setPage(next); location.hash = next; setMenuOpen(false) }
  function clearForm() { setEditing(null); setFormKey(key => key + 1) }
  function save(activity) {
    setData(previous => ({ ...previous, activities: activity.id ? previous.activities.map(a => a.id === activity.id ? { ...a, ...activity } : a) : [...previous.activities, { ...activity, id: crypto.randomUUID(), completedDates: [] }] }))
    setFeedback(activity.id ? 'Actividad actualizada.' : 'Actividad creada.'); clearForm()
  }
  function confirmDelete() {
    setData(previous => ({ ...previous, activities: previous.activities.filter(a => a.id !== deleting.id), notices: previous.notices.filter(n => n.activityId !== deleting.id) }))
    if (editing?.id === deleting.id) clearForm()
    setFeedback('Actividad eliminada.'); deleteDialog.current.close(); setDeleting(null)
  }
  const dates = weekDates(new Date(`${today}T12:00:00`))
  const todaysActivities = data.activities.filter(a => a.days.includes(dayIndex(new Date(`${today}T12:00:00`))))
  const actions = {
    onToggle(id, date) { setData(previous => ({ ...previous, activities: previous.activities.map(a => a.id === id ? { ...a, completedDates: a.completedDates.includes(date) ? a.completedDates.filter(d => d !== date) : [...a.completedDates, date] } : a) })) },
    onEdit(activity) { setEditing(activity); setFormKey(key => key + 1); navigate('activities') },
    onDelete(activity) { setDeleting(activity); deleteDialog.current.showModal() },
    onFocus(id) { timer.selectActivity(id); navigate('timer'); if (timer.locked) setFeedback('Finaliza la sesión actual antes de cambiar de actividad.') },
  }
  const planned = dates.reduce((sum, _, index) => sum + data.activities.filter(a => a.days.includes(index)).length, 0)
  const completed = dates.reduce((sum, date, index) => sum + data.activities.filter(a => a.days.includes(index) && a.completedDates.includes(dateKey(date))).length, 0)
  return <div className="app-shell"><Sidebar page={page} navigate={navigate} open={menuOpen} percent={planned ? Math.round(completed / planned * 100) : 0} /><div className="workspace"><Header onMenu={() => setMenuOpen(open => !open)} permission={reminders.permission} onNotifications={reminders.requestPermission} storageError={storageError} /><main id="main-content">{storageError && <p className="error" role="alert">{storageError}</p>}{reminders.permission === 'denied' && <p className="muted">Las notificaciones están bloqueadas en el navegador. Puedes habilitarlas en los permisos del sitio; los avisos internos siguen activos.</p>}{feedback && <div className="feedback" role="status">{feedback}<button onClick={() => setFeedback('')} aria-label="Cerrar mensaje">×</button></div>}{reminders.active.map(notice => <div className="reminder" role="alert" key={notice.id}><div><strong>◷ {notice.title}</strong><p>Actividad programada a las {notice.start}</p></div><div className="actions"><button onClick={() => reminders.snooze(notice.id, 5)}>Posponer 5 min</button><button onClick={() => reminders.snooze(notice.id, 10)}>Posponer 10 min</button><button onClick={() => reminders.dismiss(notice.id)}>Descartar</button></div></div>)}{page === 'dashboard' && <Dashboard data={data} today={today} todaysActivities={todaysActivities} timer={timer} actions={actions} navigate={navigate} />}{page === 'week' && <Weekly activities={data.activities} dates={dates} selectedDay={selectedDay} setSelectedDay={setSelectedDay} actions={actions} />}{page === 'activities' && <Activities activities={data.activities} editing={editing} formKey={formKey} onSave={save} onCancel={clearForm} actions={actions} filter={filter} setFilter={setFilter} query={query} setQuery={setQuery} date={filter === 'all' ? today : dateKey(dates[Number(filter)])} />}{page === 'timer' && <Focus timer={timer} activities={data.activities} sessions={data.sessions} />}{page === 'stats' && <Statistics activities={data.activities} sessions={data.sessions} dates={dates} />}<footer>Daily Planner · Tu espacio, tu ritmo <span>Datos guardados en este navegador</span></footer></main></div><dialog ref={deleteDialog} className="delete-dialog" onCancel={() => setDeleting(null)}><h2>¿Eliminar esta actividad?</h2><p>Se eliminará “{deleting?.title}” de tu rutina.</p><div className="actions"><button onClick={() => { deleteDialog.current.close(); setDeleting(null) }}>Cancelar</button><button className="danger" onClick={confirmDelete}>Eliminar actividad</button></div></dialog></div>
}
