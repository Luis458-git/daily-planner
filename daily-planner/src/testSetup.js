import { afterEach, jest } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'
import { cleanup } from '@testing-library/react'
import { TextDecoder, TextEncoder } from 'node:util'

// React Router utiliza estas APIs del navegador; jsdom no las incluye.
Object.assign(globalThis, { TextEncoder, TextDecoder })

afterEach(() => { cleanup(); jest.useRealTimers(); jest.restoreAllMocks(); localStorage.clear(); window.location.hash = '' })
Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value() { this.open = true } })
Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value() { this.open = false } })
