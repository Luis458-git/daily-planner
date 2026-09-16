import { useState, useEffect, useRef } from 'react'
import { dateKey } from '../Services/routineService'
export default function useTimer(onSession) {
  const [timer, setTimer] = useState({ kind: 'focus', total: 1500, remaining: 1500, running: false, endAt: null, activityId: '', message: '' })
  const timerRef = useRef(timer)
  const onSessionRef = useRef(onSession)
  useEffect(() => { onSessionRef.current = onSession }, [onSession])
  function update(next) { timerRef.current = next; setTimer(next) }
  function finish() {
    const current = timerRef.current
    const remaining = current.running ? Math.max(0, Math.ceil((current.endAt - Date.now()) / 1000)) : current.remaining
    const elapsed = Math.max(0, current.total - remaining)
    if (elapsed) onSessionRef.current({ id: crypto.randomUUID(), date: dateKey(), kind: current.kind, seconds: elapsed, activityId: current.activityId })
    update({ ...current, remaining: current.total, running: false, endAt: null, message: elapsed ? current.kind === 'focus' ? 'Sesión guardada. Es un buen momento para descansar.' : 'Descanso guardado. Retoma tu siguiente bloque cuando estés listo.' : 'Elige una duración y comienza tu sesión.' })
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const current = timerRef.current
      if (!current.running) return
      const remaining = Math.max(0, Math.ceil((current.endAt - Date.now()) / 1000))
      if (!remaining) {
        onSessionRef.current({ id: crypto.randomUUID(), date: dateKey(), kind: current.kind, seconds: current.total, activityId: current.activityId })
        update({ ...current, remaining: current.total, running: false, endAt: null, message: current.kind === 'focus' ? '¡Sesión completada! Elige un descanso de 5, 10 o 15 minutos.' : '¡Descanso completado! Puedes volver al enfoque.' })
      } else if (remaining !== current.remaining) update({ ...current, remaining })
    }, 250)
    return () => clearInterval(interval)
  }, [])
  function toggle() {
    const current = timerRef.current
    update(current.running ? { ...current, running: false, remaining: Math.max(0, Math.ceil((current.endAt - Date.now()) / 1000)), endAt: null } : { ...current, running: true, endAt: Date.now() + current.remaining * 1000, message: '' })
  }
  function choose(minutes, kind = 'focus') {
    const current = timerRef.current
    if (current.running || current.remaining !== current.total) return
    update({ ...current, kind, total: minutes * 60, remaining: minutes * 60, message: '' })
  }
  function addTime() { const current = timerRef.current; update({ ...current, total: current.total + 300, remaining: current.remaining + 300, endAt: current.running ? current.endAt + 300000 : null }) }
  function selectActivity(activityId) { const current = timerRef.current; if (!current.running && current.remaining === current.total) update({ ...current, activityId }) }
  return { ...timer, toggle, finish, choose, addTime, selectActivity, locked: timer.running || timer.remaining !== timer.total }
}
