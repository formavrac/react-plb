import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BOOKS } from '../App'

function About() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const goToBook = () => navigate(`/livre/${search}`)

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">A propos</h1>
      <a onClick={() => navigate(-1)}>Retour en arrière</a>

      <select className="border border-gray-300 rounded-md py-1 px-2 w-full" value={search} onChange={(event) => setSearch(event.target.value)}>
        {BOOKS.map(b =>
          <option key={b.id} value={b.id}>{b.title}</option>
        )}
      </select>

      {search && <>
        <h2>Vous allez vous rendre sur le livre {search}</h2>
        <button onClick={goToBook}>Aller sur le livre</button>
      </>}
    </>
  )
}

export default About