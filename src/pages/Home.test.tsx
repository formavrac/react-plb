import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import Home from './Home'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { UserProvider } from '../contexts/UserContext'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({
        data: [
          { id: 1, title: 'Mocked', author: 'Saint-Exupéry', year: 1943, image: '' }
        ],
      })
    ),
  },
}))

describe('App', () => {
  it('renders the App component', async () => {
    const router = createMemoryRouter([
      {
        path: '/',
        Component: App,
        children: [
          { index: true, Component: Home },
        ],
      },
    ], { initialEntries: ['/'] })

    vi.useFakeTimers()

    render(<UserProvider>
      <RouterProvider router={router} />
    </UserProvider>)

    expect(screen.getByText(/Bookorama \(0\)/i)).toBeInTheDocument()

    vi.advanceTimersByTime(30000)
    vi.useRealTimers()

    await waitFor(() => {
      expect(screen.getByText(/Bookorama \(1\)/i)).toBeInTheDocument()
      expect(screen.queryByText(/Mocked/i)).toBeInTheDocument()
    })

    // screen.debug()
  })
})
