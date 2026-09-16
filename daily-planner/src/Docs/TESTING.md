# Verificación de Daily Planner

Fecha: 16 de septiembre de 2026.

## Verificaciones automáticas

- ESLint: sin errores.
- Vite: compilación de producción correcta, sin imports rotos.
- Jest: 68 pruebas aprobadas en 17 archivos `.test.js` y `.test.jsx`.
- Servidor de desarrollo: iniciado con `npm run dev -- --host 127.0.0.1 --port 5174 --strictPort`.

Para repetir las comprobaciones del código:

```bash
npm run lint
npm test
npm run build
```

Jest comprueba datos iniciales, títulos y horarios inválidos, categorías, días, recordatorios, almacenamiento vacío o corrupto, ordenación sin mutación, duración, semanas entre meses y ventanas de aviso.

## Navegador real

Se automatizó Microsoft Edge en modo headless con perfil temporal y Chrome DevTools Protocol. Las pruebas no modificaron el almacenamiento del perfil habitual del usuario.

- Crear actividad, editar nombre y marcarla completada.
- Recargar y comprobar la persistencia de cambios.
- Cancelar una eliminación y luego confirmarla.
- Mostrar siete días y seleccionar domingo.
- Cambiar a 45 minutos, iniciar, pausar, verificar que el tiempo no avance en pausa, añadir 5 minutos y continuar.
- Cambiar de vista sin perder la sesión y finalizarla.
- Completar un descanso de 5 minutos adelantando el reloj del navegador de prueba y comprobar el registro de 300 segundos.
- Comprobar estadísticas después de registrar sesiones.
- Recorrer las cinco vistas a 375, 768 y 1440 píxeles sin desbordamiento horizontal del documento.
- Abrir el menú móvil, navegar y comprobar su cierre.
- Comprobar ausencia de excepciones de la aplicación y revisar capturas de escritorio y móvil.

## Notificaciones

Se comprobó el aviso dentro de la aplicación, la entrega con título y horario, no duplicación tras recargar, posposición de 5 minutos, descarte y tratamiento de permiso rechazado. La Notification API y sus permisos se simularon para no enviar avisos reales al sistema operativo.

La aparición efectiva de una notificación del sistema debe verificarse manualmente con los permisos del navegador y del sistema operativo concedidos. Los modos de anticipación se verifican también en Jest. La posposición de 10 minutos utiliza la misma función parametrizada que la de 5 minutos.

## Revisión manual sugerida

1. Crear una actividad para el día actual con inicio dentro de unos minutos.
2. Activar notificaciones y conceder permiso.
3. Mantener la pestaña abierta y verificar el aviso con el horario configurado.
4. Posponer el aviso, esperar y luego descartarlo.
5. Rechazar el permiso en otro perfil y comprobar que el aviso interno funciona.

## Fidelidad visual y límites

Se revisaron las cinco imágenes originales antes de implementar. La interfaz conserva la paleta oscura, navegación lateral, acentos ámbar, jerarquía de tarjetas y estructura de las vistas. Es una adaptación funcional del diseño, no una reproducción píxel por píxel: los contenidos y métricas ficticias de la referencia se sustituyeron por datos locales.

El calendario conserva siete columnas con desplazamiento horizontal dentro de su panel en móvil. No se probaron otros motores de navegador ni notificaciones con la aplicación cerrada, funcionalidad que no se implementa.

## Pruebas de React agregadas

Las pruebas se guardan junto al archivo original, sin renombrarlo. Además del servicio, se prueban los dos hooks, los siete componentes de interfaz, las cinco páginas y la integración de App.

- `useTimer.test.js`: pausa, continuación, modos, bloqueo de cambios, ampliación, descansos y limpieza del intervalo.
- `useReminders.test.js`: avisos, prevención de duplicados, posposición de 5 y 10 minutos, descarte y permisos.
- Pruebas de componentes: formulario válido e inválido, acciones de actividades, listas ordenadas, resúmenes, navegación y controles del temporizador.
- Pruebas de páginas: filtros, selección semanal, estadísticas por semana, descansos y acceso desde el dashboard.
- `App.test.jsx`: creación, persistencia después de desmontar y montar, y eliminación con confirmación.

Jest utiliza jsdom para simular el DOM, Babel para transformar JSX y React Testing Library para interactuar por roles y etiquetas accesibles. Los temporizadores usan un reloj simulado para verificar minutos de actividad sin esperar ese tiempo real. Notification API y los métodos de diálogo se simulan; estas pruebas no sustituyen las comprobaciones de apariencia y permisos en un navegador real.

Ejecutar un archivo específico:

```bash
npm test -- src/Components/useTimer.test.js
```

Ejecutar todas las pruebas y obtener cobertura:

```bash
npm test -- --coverage
```

`main.jsx` es el punto de montaje y no contiene lógica independiente; su integración se comprueba con App y la compilación. Los archivos de configuración tampoco se renombran ni se convierten en archivos de prueba.

## Práctica de matemáticas

`src/utils/matematicas.js` exporta cinco funciones puras: sumar, restar, multiplicar, dividir y promedio. Dividir entre cero y calcular el promedio de una lista vacía devuelven `null`.

`src/utils/matematicas.test.js` contiene 25 casos para valores positivos, negativos, cero, decimales, casos especiales y conservación del arreglo recibido. Se ejecutan en Node, sin DOM ni React Testing Library.

```bash
npm test
npx jest
npx jest --selectProjects unitarias
```

Los primeros dos comandos ejecutan las 68 pruebas del proyecto. El último ejecuta únicamente la práctica de matemáticas. Las dependencias de React Testing Library y jsdom ya existían y se conservan para la suite anterior.
