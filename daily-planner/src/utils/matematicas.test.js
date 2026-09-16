import { describe, expect, test } from '@jest/globals'
import { sumar, restar, multiplicar, dividir, promedio } from './matematicas'

describe('sumar: minutos de enfoque y descanso', () => {
  test.each([[25, 5, 30], [0, 0, 0], [-10, 5, -5]])('%i + %i = %i', (a, b, resultado) => {
    expect(sumar(a, b)).toBe(resultado)
  })
  test('suma decimales', () => {
    expect(sumar(0.1, 0.2)).toBeCloseTo(0.3)
  })
})

describe('restar: diferencias de tiempo', () => {
  test.each([[60, 25, 35], [10, 10, 0], [5, 10, -5], [-5, -10, 5]])('%i - %i = %i', (a, b, resultado) => {
    expect(restar(a, b)).toBe(resultado)
  })
})

describe('multiplicar: tiempo acumulado', () => {
  test.each([[25, 4, 100], [25, 0, 0], [-5, 3, -15], [2.5, 2, 5]])('%s × %s = %s', (a, b, resultado) => {
    expect(multiplicar(a, b)).toBe(resultado)
  })
})

describe('dividir: proporciones de tiempo', () => {
  test.each([[120, 4, 30], [0, 5, 0], [-30, 2, -15], [5, 2, 2.5]])('%s / %s = %s', (a, b, resultado) => {
    expect(dividir(a, b)).toBe(resultado)
  })
  test.each([10, 0, -5])('devuelve null al dividir %i entre cero', a => {
    expect(dividir(a, 0)).toBeNull()
  })
})

describe('promedio: minutos de varias sesiones', () => {
  test('calcula el promedio de sesiones', () => {
    expect(promedio([25, 45, 50])).toBe(40)
  })
  test('admite una sola sesión', () => {
    expect(promedio([25])).toBe(25)
  })
  test('admite ceros y números negativos', () => {
    expect(promedio([0, 0])).toBe(0)
    expect(promedio([-10, 0, 10])).toBe(0)
  })
  test('admite decimales', () => {
    expect(promedio([0.1, 0.2])).toBeCloseTo(0.15)
  })
  test('devuelve null para una lista vacía', () => {
    expect(promedio([])).toBeNull()
  })
  test('no modifica la lista recibida', () => {
    const sesiones = Object.freeze([25, 45, 50])
    expect(promedio(sesiones)).toBe(40)
    expect(sesiones).toEqual([25, 45, 50])
  })
})
