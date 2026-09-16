# Requerimientos de Daily Planner

Documento consolidado a partir de `AI_PROMPT.md` y `IMPLEMENTATION_CHECKLIST.md`. Este archivo estaba vacío al comenzar; las instrucciones originales se conservan en los otros documentos.

## Interfaz

- [x] Adaptar las cinco pantallas oficiales del ZIP a componentes React reutilizables.
- [x] Mantener colores, navegación, tarjetas y lenguaje visual de la referencia.
- [x] Implementar dashboard, rutina semanal, temporizador, actividades y estadísticas.
- [x] Adaptar las vistas a escritorio, tablet y móvil con menú móvil.
- [x] Conservar los archivos originales de referencia.

## Actividades

- [x] Crear, consultar, editar y eliminar con confirmación.
- [x] Incluir título, categoría, inicio, fin, días y recordatorio.
- [x] Validar campos y orden de horarios.
- [x] Ordenar por hora y filtrar por día o nombre.
- [x] Marcar completadas por fecha y calcular pendientes.
- [x] Guardar y recuperar información con localStorage.

## Enfoque y recordatorios

- [x] Temporizador único con modos 25, 45 y 60 minutos.
- [x] Iniciar, pausar, continuar, finalizar y añadir 5 minutos.
- [x] Descansos de 5, 10 y 15 minutos y registro del tiempo realizado.
- [x] Avisar a la hora exacta o con 5, 10 y 30 minutos de anticipación.
- [x] Evitar avisos duplicados y permitir posponer 5 o 10 minutos.
- [x] Solicitar permiso de Notification API y mantener avisos internos como alternativa.

## Entrega

- [x] Estadísticas calculadas a partir de los datos reales del usuario.
- [x] README con instalación, ejecución y verificación.
- [x] Pruebas de lógica, compilación y comprobaciones en navegador.

Los detalles y límites de las comprobaciones están en `TESTING.md`. La publicación del código en GitHub no equivale a desplegar un sitio web público.
