import { useEffect, useState } from 'react'

/**
 * ============================
 * 1. ✅ BON — useEffect + localStorage
 * ============================
 */
function ThemeFromLocalStorage() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  return <p>Theme : {theme}</p>
}

/**
 * ============================
 * 2. ✅ BON — useEffect + fetch
 * ============================
 */
function UsersFetch() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([])

  const load = async () => {
    const response = await Promise.resolve([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ])
    setUsers(response)
  }

  useEffect(() => {
    // Mock de fetch
    load()
  }, [])

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}

/**
 * ============================
 * 3. ❌ MAUVAIS — useEffect pour dériver un state
 * ============================
 */
function BadCounter() {
  const [count, setCount] = useState(0)
  const [double, setDouble] = useState(0)

  useEffect(() => {
    setDouble(count * 2)
  }, [count])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>Double (❌ inutile) : {double}</p>
    </div>
  )
}

/**
 * ============================
 * 4. ✅ BON — calcul direct pendant le render
 * ============================
 */
function GoodCounter() {
  const [count, setCount] = useState(0)
  const double = count * 2

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>Double (✅ correct) : {double}</p>
    </div>
  )
}

/**
 * ============================
 * 5. ❌ MAUVAIS — copier une prop dans un state
 * ============================
 */
function BadUser({ user }: { user: { name: string } }) {
  const [name, setName] = useState('')

  useEffect(() => {
    setName(user.name)
  }, [user])

  return (
    <p>
        Utilisateur (❌) : {name}
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </p>
  )
}

/**
 * ============================
 * 6. ✅ BON — utiliser la prop directement
 * ============================
 */
function GoodUser({ user }: { user: { name: string } }) {
  const [name, setName] = useState(user.name)

  return (
    <p>
        Utilisateur (✅) : {name}
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </p>
  )
}

/**
 * ============================
 * 7. ✅ BON — useEffect pour une ressource externe (WebSocket mock)
 * ============================
 */
function Notifications() {
  useEffect(() => {
    console.log('🟢 Connexion WebSocket')

    return () => {
      console.log('🔴 Déconnexion WebSocket')
    }
  }, [])

  return <p>Notifications actives</p>
}

/**
 * ============================
 * APP — Démo complète
 * ============================
 */
export default function RecapUseEffect() {
  const [enable, setEnable] = useState(true)
  const [user, setUser] = useState({ name: 'Charlie' })

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>✅ Bons usages de useEffect</h2>
      <ThemeFromLocalStorage />
      <UsersFetch />
      {enable && <Notifications />}
      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Désactiver' : 'Activer'} notifications
      </button>

      <hr />

      <h2>❌ Mauvais usages de useEffect</h2>
      <BadCounter />
      <select value={user.name} onChange={e => setUser({ name: e.target.value })}>
        <option value="Charlie">Charlie</option>
        <option value="Alice">Alice</option>
      </select>
      <BadUser user={user} />

      <hr />

      <h2>✅ Versions correctes</h2>
      <GoodCounter />
      <GoodUser user={user} key={user.name} />
    </div>
  )
}
