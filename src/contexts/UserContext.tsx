import { createContext, useContext, useState } from 'react'

export type User = {
  name: string
}

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
} | null>(null)

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>({ name: 'Fiorella' })

  return (
    <UserContext value={{ user, setUser }}>
      {children}
    </UserContext>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')

  return context
}
