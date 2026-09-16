// Operaciones puras para trabajar con minutos de enfoque o descanso.
export function sumar(a, b) {
  return a + b
}

export function restar(a, b) {
  return a - b
}

export function multiplicar(a, b) {
  return a * b
}

export function dividir(a, b) {
  // null representa que no existe un resultado válido al dividir entre cero.
  if (b === 0) return null
  return a / b
}

export function promedio(lista) {
  // Sin sesiones no hay promedio: devolvemos null en lugar de NaN.
  if (lista.length === 0) return null
  return lista.reduce((total, valor) => total + valor, 0) / lista.length
}
