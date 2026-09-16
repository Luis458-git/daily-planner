import { DAYS, CATEGORIES } from '../Services/routineService'
import RoutineForm from '../Components/RoutineForm'
import RoutineList from '../Components/RoutineList'
export default function Activities({ activities, editing, formKey, onSave, onCancel, actions, filter, setFilter, query, setQuery, date }) {
  const filtered = activities.filter(a => (filter === 'all' || a.days.includes(Number(filter))) && a.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  return <><div className="page-heading"><div><p className="eyebrow">TU SEMANA, CON INTENCIÓN</p><h1>Gestión de actividades y recordatorios</h1><p>Diseña tus bloques de tiempo y encuentra tu ritmo.</p></div></div><div className="activities-grid"><RoutineForm key={formKey} activity={editing} onSave={onSave} onCancel={onCancel} /><section className="panel"><div className="filters"><label>Buscar actividad<input type="search" placeholder="Buscar por nombre…" value={query} onChange={e => setQuery(e.target.value)} /></label><label>Día<select value={filter} onChange={e => setFilter(e.target.value)}><option value="all">Todos los días</option>{DAYS.map((day, index) => <option value={index} key={day}>{day}</option>)}</select></label></div><p className="muted">{filtered.length} actividades · {CATEGORIES.length} categorías</p><RoutineList activities={filtered} date={date} {...actions} /></section></div></>
}
