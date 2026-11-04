import '@testing-library/jest-dom/vitest'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useState } from 'react'

type CounterProps = {
  initialValue?: number
}

function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount(count + 1)

  return (
    <div>
      <h1>Compteur : {count}</h1>
      <button onClick={increment}>Incrémenter</button>
    </div>
  )
}

describe('Counter component', () => {
  it('show 0 at boot and increment at click', async () => {
    render(<Counter />)

    expect(screen.getByText(/compteur : 0/i)).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /incrémenter/i })
    await userEvent.click(button)

    expect(screen.getByText(/compteur : 1/i)).toBeInTheDocument()
  })

  it('starts from initialValue and increments from it', async () => {
    render(<Counter initialValue={5} />)

    expect(screen.getByText(/compteur : 5/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /incrémenter/i }))

    expect(screen.getByText(/compteur : 6/i)).toBeInTheDocument()
  })
})
