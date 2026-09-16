export default function DailySummary({ activities, date, sessions, compact = false }) {
  const done = activities.filter(a => a.completedDates.includes(date)).length
  const focus = Math.floor(sessions.filter(s => s.date === date && s.kind === 'focus').reduce((sum, s) => sum + s.seconds, 0) / 60)
  const rest = Math.floor(sessions.filter(s => s.date === date && s.kind === 'break').reduce((sum, s) => sum + s.seconds, 0) / 60)
  const items = [['Completadas', `${done} / ${activities.length}`, 'green'], ['Pendientes', activities.length - done, ''], ['Enfoque de hoy', `${focus} min`, 'amber'], ['Descansos de hoy', `${rest} min`, 'blue']]
  return <div className={`summary-grid ${compact ? 'compact' : ''}`}>{items.map(([title, value, color]) => <div className="panel metric" key={title}><p>{title}</p><strong className={color}>{value}</strong><small>{title === 'Completadas' ? 'Cada pequeño avance cuenta' : 'Registro de hoy'}</small></div>)}</div>
}
