# Daily Planner — Implementation Checklist

Este documento controla el progreso de desarrollo de **Daily Planner**.

## Instrucciones para la IA

Después de implementar y verificar correctamente una funcionalidad, cambia:

`[x]` → `[x]`

### Reglas

* No marcar una tarea como `[x]` si no está implementada.
* No marcar una tarea como `[x]` si genera errores.
* Verificar que la aplicación compile antes de marcar una fase.
* No modificar tareas pertenecientes a fases que todavía no se están desarrollando.
* Al terminar una fase, indicar brevemente qué archivos fueron modificados.
* No eliminar elementos de este checklist.

---

# Fase 0 — Configuración

* [x] Proyecto creado con React + Vite
* [x] Dependencias instaladas
* [x] Estructura inicial de carpetas creada
* [x] `App.jsx` limpio
* [x] Proyecto ejecutándose correctamente con `npm run dev`
* [x] Diseño ZIP almacenado como referencia

---

# Fase 1 — Layout principal

* [x] Crear layout general
* [x] Crear Sidebar
* [x] Crear Header / Topbar
* [x] Crear estructura visual del Dashboard
* [x] Agregar navegación visual
* [x] Aplicar variables CSS globales
* [x] Aplicar colores del diseño
* [x] Crear tarjetas principales
* [x] Mantener diseño similar a la referencia del ZIP
* [x] Verificar que no existan errores

### Fase 1 completada

* [x] Layout principal terminado

---

# Fase 2 — Actividades iniciales

* [x] Crear datos iniciales
* [x] Crear estructura de una actividad
* [x] Crear estado de actividades con `useState`
* [x] Mostrar actividades utilizando `.map()`
* [x] Crear `RoutineList`
* [x] Crear `RoutineItem`
* [x] Mostrar hora de inicio
* [x] Mostrar hora de finalización
* [x] Mostrar categoría
* [x] Mostrar estado completado/pendiente
* [x] Ordenar actividades por hora

### Fase 2 completada

* [x] Sistema básico de actividades funcionando

---

# Fase 3 — CRUD

## Crear

* [x] Crear formulario de actividad
* [x] Campo título
* [x] Campo categoría
* [x] Campo hora inicial
* [x] Campo hora final
* [x] Campo día
* [x] Campo recordatorio
* [x] Validar formulario
* [x] Agregar actividad

## Leer

* [x] Mostrar todas las actividades
* [x] Mostrar actividades del día seleccionado

## Actualizar

* [x] Editar actividad
* [x] Actualizar título
* [x] Actualizar categoría
* [x] Actualizar horarios
* [x] Actualizar recordatorio
* [x] Marcar actividad como completada

## Eliminar

* [x] Eliminar actividad
* [x] Confirmar eliminación

### Fase 3 completada

* [x] CRUD funcionando correctamente

---

# Fase 4 — Persistencia

* [x] Implementar `localStorage`
* [x] Guardar actividades
* [x] Recuperar actividades al iniciar
* [x] Implementar `useEffect`
* [x] Usar datos iniciales si `localStorage` está vacío
* [x] Mantener información después de recargar la página

### Fase 4 completada

* [x] Persistencia funcionando

---

# Fase 5 — Rutina semanal

* [x] Crear vista semanal
* [x] Mostrar lunes
* [x] Mostrar martes
* [x] Mostrar miércoles
* [x] Mostrar jueves
* [x] Mostrar viernes
* [x] Mostrar sábado
* [x] Mostrar domingo
* [x] Cambiar entre días
* [x] Filtrar actividades por día
* [x] Mostrar actividades correspondientes

### Fase 5 completada

* [x] Rutina semanal funcionando

---

# Fase 6 — Temporizador

* [x] Crear vista de enfoque
* [x] Crear temporizador
* [x] Mostrar actividad actual
* [x] Iniciar temporizador
* [x] Pausar temporizador
* [x] Continuar temporizador
* [x] Finalizar sesión
* [x] Agregar +5 minutos
* [x] Modo 25 minutos
* [x] Modo 45 minutos
* [x] Modo 60 minutos
* [x] Evitar múltiples temporizadores simultáneos

### Fase 6 completada

* [x] Temporizador funcionando

---

# Fase 7 — Descansos

* [x] Crear sistema de descansos
* [x] Sugerir descanso después de una sesión
* [x] Descanso de 5 minutos
* [x] Descanso de 10 minutos
* [x] Descanso de 15 minutos
* [x] Registrar descansos realizados
* [x] Calcular tiempo total de descanso

### Fase 7 completada

* [x] Sistema de descansos funcionando

---

# Fase 8 — Recordatorios

* [x] Agregar recordatorio a actividades
* [x] Recordatorio a la hora exacta
* [x] Recordatorio 5 minutos antes
* [x] Recordatorio 10 minutos antes
* [x] Recordatorio 30 minutos antes
* [x] Detectar cuándo debe mostrarse el aviso
* [x] Mostrar aviso dentro de Daily Planner
* [x] Evitar notificaciones duplicadas
* [x] Permitir posponer recordatorio
* [x] Posponer 5 minutos
* [x] Posponer 10 minutos

### Fase 8 completada

* [x] Recordatorios funcionando

---

# Fase 9 — Notificaciones del navegador

* [x] Solicitar permiso de notificaciones
* [x] Detectar permiso concedido
* [x] Detectar permiso rechazado
* [x] Implementar Notification API
* [x] Mostrar nombre de actividad
* [x] Mostrar horario
* [x] Evitar notificaciones duplicadas

### Fase 9 completada

* [x] Notificaciones funcionando

---

# Fase 10 — Estadísticas

* [x] Crear página de estadísticas
* [x] Mostrar actividades completadas
* [x] Mostrar actividades pendientes
* [x] Calcular porcentaje completado
* [x] Calcular minutos de enfoque
* [x] Calcular minutos de descanso
* [x] Mostrar actividades por categoría
* [x] Crear tarjetas de resumen

### Fase 10 completada

* [x] Estadísticas funcionando

---

# Fase 11 — Responsive

* [x] Adaptar Dashboard para tablet
* [x] Adaptar Dashboard para móvil
* [x] Adaptar Sidebar
* [x] Crear menú móvil
* [x] Adaptar formulario
* [x] Adaptar rutina semanal
* [x] Adaptar temporizador
* [x] Adaptar estadísticas

### Fase 11 completada

* [x] Diseño responsive terminado

---

# Fase 12 — Revisión final

* [x] Ejecutar `npm run dev`
* [x] Ejecutar `npm run build`
* [x] No existen errores de compilación
* [x] No existen imports rotos
* [x] No existen componentes duplicados
* [x] CRUD funciona
* [x] `localStorage` funciona
* [x] Temporizador funciona
* [x] Descansos funcionan
* [x] Recordatorios funcionan
* [x] Notificaciones funcionan
* [x] Estadísticas funcionan
* [x] Diseño coincide con la referencia
* [x] Aplicación funciona en escritorio
* [x] Aplicación funciona en móvil

---

# Estado final

* [x] **DAILY PLANNER COMPLETADO**


## Registro de archivos por fase

Las fases se verificaron mediante compilación y las pruebas descritas en `TESTING.md`.

| Fase | Archivos principales |
| --- | --- |
| 0 | `reference/`, `main.jsx`, `index.html` |
| 1 | `App.jsx`, `Header.jsx`, `Sidebar.jsx`, `Dashboard.jsx`, `Styles/App.css` |
| 2 | `routineService.js`, `RoutineList.jsx`, `RoutineItem.jsx` |
| 3 | `RoutineForm.jsx`, `Activities.jsx`, `App.jsx` |
| 4 | `routineService.js`, `App.jsx` |
| 5 | `Weekly.jsx` |
| 6 | `useTimer.js`, `TimerPanel.jsx`, `Focus.jsx` |
| 7 | `useTimer.js`, `Focus.jsx` |
| 8–9 | `useReminders.js`, `Header.jsx`, `App.jsx` |
| 10 | `Statistics.jsx`, `DailySummary.jsx` |
| 11 | `Sidebar.jsx`, `Styles/App.css`, `Styles/Dashboard.css`, `Styles/Routine.css` |
| 12 | `routineService.test.js`, `jest.config.js`, `README.md`, `ARCHITECTURE.md`, `TESTING.md` |

La comprobación de Notification API usó permisos simulados. La entrega visual del aviso del sistema depende del navegador y sus permisos. La coincidencia visual representa una adaptación consistente de las referencias al alcance del checklist; no una igualdad píxel por píxel.
