import RoutineItem from './RoutineItem'
import { ordered } from '../Services/routineService'
export default function RoutineList({ activities, ...actions }) {
  return <div className="routine-list">{activities.length ? ordered(activities).map(activity => <RoutineItem key={activity.id} activity={activity} {...actions} />) : <div className="empty"><span>☀</span><h3>Espacio para un nuevo plan</h3><p>No hay actividades en esta selección. Añade un bloque para comenzar.</p></div>}</div>
}
