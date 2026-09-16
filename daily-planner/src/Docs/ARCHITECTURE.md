# Arquitectura

## Organización

| Archivo | Responsabilidad |
| --- | --- |
| `App.jsx` | Estado compartido, persistencia, navegación por hash, CRUD y diálogo de eliminación |
| `Components/Header.jsx`, `Sidebar.jsx` | Cabecera, permisos de notificación, navegación y menú móvil |
| `Components/RoutineForm.jsx` | Formulario de creación y edición validado |
| `Components/RoutineList.jsx`, `RoutineItem.jsx` | Lista ordenada y acciones sobre actividades |
| `Components/DailySummary.jsx` | Resumen de la fecha actual |
| `Components/TimerPanel.jsx`, `useTimer.js` | Presentación y estado del temporizador único |
| `Components/useReminders.js` | Detección, entrega, descarte y posposición de avisos |
| `Pages/` | Las cinco vistas de la aplicación |
| `Services/routineService.js` | Datos iniciales, validaciones, fechas y lectura de almacenamiento |
| `Styles/` | Variables, layout, tarjetas, formularios y responsive |

## Modelo de datos

Una actividad contiene `id`, `title`, `category`, `start`, `end`, `days`, `reminder` y `completedDates`. Los días van de 0 (lunes) a 6 (domingo). Las fechas de completado usan `YYYY-MM-DD` local para no mezclar repeticiones semanales.

Las sesiones registran identificador, fecha local, tipo (`focus` o `break`), segundos realizados y actividad asociada. Finalizar antes de tiempo registra únicamente el tiempo transcurrido. Una sesión sin actividad se considera enfoque libre.

Los avisos incluyen identificador estable por actividad, fecha, hora y anticipación; fecha de entrega, descarte y próxima hora prevista. Posponer reutiliza el aviso. El registro persistente evita volver a notificar después de una recarga.

## Flujo

1. La aplicación recupera localStorage o crea ejemplos si no hay datos.
2. Las acciones modifican el estado mediante funciones de actualización.
3. Un efecto guarda el estado; los errores de almacenamiento se muestran al usuario.
4. Las vistas derivan listas y estadísticas desde el mismo estado.
5. El temporizador permanece montado en App, independientemente de la vista activa.
6. Los intervalos se limpian al desmontar los hooks.

## Decisiones

No se agregó un servidor, router ni biblioteca de estilos. Los hashes permiten navegar y usar atrás/adelante en el navegador. Las fechas representan la semana actual. Los datos corruptos no se sobrescriben automáticamente.

El temporizador utiliza una hora de fin absoluta para corregir retrasos de los intervalos. Las sesiones en curso no sobreviven a la recarga. No hay sincronización entre dispositivos, procesamiento con la pestaña cerrada ni notificaciones push.
