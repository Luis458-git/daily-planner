# Flowy · Daily Planner

Aplicación de planificación diaria desarrollada con React y Vite. Incluye dashboard, rutina semanal, gestión de actividades, temporizador, descansos, recordatorios y estadísticas. Su diseño adapta las cinco pantallas entregadas en el ZIP de referencia.

## Instalar y ejecutar

Requisitos: Node.js 22.14.0 o una versión compatible posterior y npm. La versión utilizada para las verificaciones fue Node.js 22.14.0.

```bash
git clone https://github.com/Luis458-git/daily-planner.git
cd daily-planner/daily-planner
npm ci
npm run dev
```

Abre la dirección que indique Vite, normalmente `http://localhost:5173`. Mantén la terminal abierta y usa `Ctrl+C` para detener el servidor. Si ya descargaste el repositorio, abre la terminal en la carpeta que contiene `package.json` y ejecuta los dos últimos comandos.

En PowerShell, si la ejecución de `npm.ps1` está bloqueada, utiliza `npm.cmd ci` y `npm.cmd run dev`.

## Verificaciones y producción

```bash
npm run lint
npm test
npm run build
npm run preview
```

Las pruebas usan Jest y módulos ES de Node; Node puede mostrar un aviso de VM Modules experimental. La compilación genera `dist/`. `preview` sirve esa compilación localmente; no publica el sitio en internet.

## Funciones

- **Dashboard:** actividades y resumen del día, acceso al temporizador y progreso.
- **Rutina semanal:** lunes a domingo, bloques ordenados y selección del día.
- **Actividades:** crear, buscar, filtrar, editar, completar y eliminar con confirmación. Cada actividad tiene categoría, horarios, días y recordatorio.
- **Temporizador:** enfoque de 25, 45 o 60 minutos, pausa, continuación, finalización y ampliación de 5 minutos. Permanece activo al cambiar de vista.
- **Descansos:** sesiones de 5, 10 o 15 minutos y registro del tiempo realizado.
- **Recordatorios:** a la hora exacta o 5, 10 y 30 minutos antes; pueden posponerse 5 o 10 minutos.
- **Estadísticas:** cumplimiento de la semana actual, actividades pendientes, tiempo real registrado de enfoque y descanso, y distribución por categoría.

## Datos y notificaciones

Los datos se guardan en `localStorage` bajo la clave `daily-planner-v1`. No se necesita una API, una cuenta ni variables de entorno. Los ejemplos iniciales aparecen únicamente si no hay datos guardados; una lista vacía se conserva.

Pulsa **Activar notificaciones** para solicitar permiso. Si lo rechazas o el navegador no admite la API, seguirás viendo avisos dentro de la aplicación. Las notificaciones requieren un contexto permitido por el navegador, como localhost o HTTPS.

Mantén la página abierta para ejecutar temporizadores y detectar recordatorios. No hay servicio en segundo plano cuando cierras la pestaña. Las actividades, las sesiones finalizadas y el estado de los avisos persisten; una sesión en curso se reinicia al recargar. El reloj utiliza marcas de tiempo y corrige los retrasos de las pestañas en segundo plano cuando el navegador vuelve a ejecutar JavaScript.

Completar una actividad afecta a su fecha seleccionada; su siguiente repetición sigue pendiente. Los horarios deben terminar dentro del mismo día. Las estadísticas muestran la semana actual, sin inventar valores de demostración.

## Documentación

- [Requisitos implementados](src/Docs/Requerimientos.md)
- [Checklist de implementación](src/Docs/IMPLEMENTATION_CHECKLIST.md)
- [Instrucciones visuales originales](src/Docs/AI_PROMPT.md)
- [Arquitectura](src/Docs/ARCHITECTURE.md)
- [Pruebas y límites de verificación](src/Docs/TESTING.md)

## Referencia visual

El ZIP original permanece en `src/Images/stitch_flowroutine_daily_planner.zip`. Su contenido se extrajo sin modificar en `reference/stitch_flowroutine_daily_planner/`.

Se conservaron el estilo oscuro, la navegación lateral, los acentos ámbar y las tarjetas de las referencias. Se adaptaron sus contenidos al alcance funcional del checklist: los datos son locales, sin promesas de sincronización en la nube, membresía premium o integración con servicios externos.
