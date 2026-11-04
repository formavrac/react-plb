import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import BookSingle from './pages/BookSingle.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { UserProvider } from './contexts/UserContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'a-propos', Component: About },
      { path: 'livre/:id', Component: BookSingle },
      { path: '*', Component: () => <h1>404</h1> },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
