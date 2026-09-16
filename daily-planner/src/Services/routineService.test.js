import { describe, test, expect } from '@jest/globals'
import { initialData, validateActivity, readData, ordered, reminderCandidates, dateKey, weekDates, duration } from './routineService.js'
const activity = () => ({ ...initialData().activities[0], days: [2], reminder: '10' })
describe('Rutinas y persistencia', () => {
  test('crea ejemplos válidos sin compartir los arrays', () => { expect(initialData().activities.every(a => !validateActivity(a))).toBe(true); expect(initialData().activities).not.toBe(initialData().activities) })
  test('rechaza título vacío, horas invertidas y días vacíos', () => { expect(validateActivity({ ...activity(), title: ' ' })).toBeTruthy(); expect(validateActivity({ ...activity(), end: '08:00' })).toBeTruthy(); expect(validateActivity({ ...activity(), days: [] })).toBeTruthy() })
  test('rechaza categoría, recordatorio y horas inválidos', () => { expect(validateActivity({ ...activity(), category: 'Otra' })).toBeTruthy(); expect(validateActivity({ ...activity(), reminder: '60' })).toBeTruthy(); expect(validateActivity({ ...activity(), start: '25:00' })).toBeTruthy() })
  test('conserva una lista vacía al recargar', () => { expect(readData({ getItem: () => JSON.stringify({ activities: [], sessions: [], notices: [] }) }).activities).toEqual([]) })
  test('recupera actividades y rechaza almacenamiento corrupto', () => { const data = initialData(); expect(readData({ getItem: () => JSON.stringify(data) })).toEqual(data); expect(() => readData({ getItem: () => '{' })).toThrow(); expect(() => readData({ getItem: () => '{}' })).toThrow() })
  test('ordena sin mutar y calcula la duración', () => { const input = [{ start: '12:00' }, { start: '08:00' }]; expect(ordered(input)[0].start).toBe('08:00'); expect(input[0].start).toBe('12:00'); expect(duration(activity())).toBe(90) })
  test('la semana va de lunes a domingo incluso entre meses', () => { expect(weekDates(new Date(2026, 8, 1)).map(dateKey)).toEqual(['2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06']) })
})
describe('Recordatorios', () => {
  test.each([0, 5, 10, 30])('avisa exactamente %i minutos antes', lead => { const a = { ...activity(), reminder: String(lead) }; expect(reminderCandidates([a], new Date(2026, 8, 16, 8, 60 - lead))).toHaveLength(1); expect(reminderCandidates([a], new Date(2026, 8, 16, 8, 59 - lead))).toHaveLength(0) })
  test('no avisa otro día, al completar ni al desactivar', () => { const now = new Date(2026, 8, 16, 8, 50); expect(reminderCandidates([{ ...activity(), days: [0] }], now)).toHaveLength(0); expect(reminderCandidates([{ ...activity(), completedDates: [dateKey(now)] }], now)).toHaveLength(0); expect(reminderCandidates([{ ...activity(), reminder: 'off' }], now)).toHaveLength(0) })
  test('el identificador es estable y no muestra avisos antiguos', () => { const now = new Date(2026, 8, 16, 8, 50); expect(reminderCandidates([activity()], now)[0].id).toBe(reminderCandidates([activity()], now)[0].id); expect(reminderCandidates([activity()], new Date(2026, 8, 16, 10, 0))).toHaveLength(0) })
})
