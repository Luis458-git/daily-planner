import { expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import Focus from './Focus'
test('configura un descanso y muestra su tiempo registrado', () => {
  const choose = jest.fn()
  const timer = { kind: 'focus', total: 1500, remaining: 1500, activityId: '', locked: false, choose }
  render(<Focus timer={timer} activities={[]} sessions={[{ kind: 'break', seconds: 600 }]} />)
  fireEvent.click(screen.getByRole('button', { name: '15 min' }))
  expect(choose).toHaveBeenCalledWith(15, 'break')
  expect(screen.getByText('10 min', { selector: 'strong' })).toBeInTheDocument()
})
