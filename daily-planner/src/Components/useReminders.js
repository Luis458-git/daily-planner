import { useState, useEffect, useRef } from 'react'
import { reminderCandidates } from '../Services/routineService'

export default function useReminders(activities, notices, setData) {
  const [permission, setPermission] = useState(() => 'Notification' in window ? Notification.permission : 'unsupported')
  const sent = useRef(new Set(notices.filter(n => n.delivered).map(n => n.id)))
  useEffect(() => {
    function check() {
      const now = Date.now()
      const candidates = reminderCandidates(activities)
      const known = new Set(notices.map(n => n.id))
      const fresh = candidates.filter(n => !known.has(n.id))
      if (fresh.length) setData(data => ({ ...data, notices: [...data.notices, ...fresh.filter(n => !data.notices.some(old => old.id === n.id))] }))
      const ready = [...notices, ...fresh].filter(n => !n.dismissed && n.due <= now && !sent.current.has(n.id))
      ready.forEach(n => {
        sent.current.add(n.id)
        if ('Notification' in window && Notification.permission === 'granted') {
          try { new Notification(n.title, { body: `Tu actividad comienza a las ${n.start}.`, tag: n.id }) } catch { /* El aviso dentro de la app sigue disponible. */ }
        }
      })
      if (ready.length) setData(data => ({ ...data, notices: data.notices.map(n => ready.some(r => r.id === n.id) ? { ...n, delivered: true } : n) }))
    }
    check()
    const interval = setInterval(check, 1000)
    return () => clearInterval(interval)
  }, [activities, notices, setData])
  async function requestPermission() {
    if (!('Notification' in window)) return
    try { setPermission(await Notification.requestPermission()) } catch { setPermission('unsupported') }
  }
  function dismiss(id) { setData(data => ({ ...data, notices: data.notices.map(n => n.id === id ? { ...n, dismissed: true } : n) })) }
  function snooze(id, minutes) {
    sent.current.delete(id)
    setData(data => ({ ...data, notices: data.notices.map(n => n.id === id ? { ...n, delivered: false, due: Date.now() + minutes * 60000 } : n) }))
  }
  return { permission, requestPermission, dismiss, snooze, active: notices.filter(n => n.delivered && !n.dismissed) }
}
