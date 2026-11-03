import { useState } from 'react'
import Button from './Button'

function StateChallengeObject() {
  const [animals, setAnimals] = useState([
    {
      name: 'Trolilo',
      type: 'troll'
    },
    {
      name: 'Sheep sheep',
      type: 'poisson'
    },
    {
      name: 'Donald Trump',
      type: 'orange'
    }
  ])
  const [newAnimal, setNewAnimal] = useState({ name: '', type: '' })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnimal({ ...newAnimal, [event.target.name]: event.target.value })
  }

  const saveAnimal = () => {
    setAnimals([...animals, newAnimal])
    setNewAnimal({ name: '', type: '' })
  }

  return (
    <div>
      <ul className="my-4">
        {animals.map((animal, index) => (
          <li key={index}>
            {animal.name} ({animal.type})
          </li>
        ))}
      </ul>

      <div className="mb-2">
        <label htmlFor="animal-object-type">Type</label>
        <input
          id="animal-object-type"
          type="text"
          className="border border-gray-300 rounded-md py-1 px-2 w-full"
          name="type"
          value={newAnimal.type}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="animal-object-name">Nom</label>
        <input
          id="animal-object-name"
          type="text"
          className="border border-gray-300 rounded-md py-1 px-2 w-full"
          name="name"
          value={newAnimal.name}
          onChange={handleChange}
        />
      </div>

      <Button onClick={saveAnimal}>Ajouter l'animal</Button>
    </div>
  )
}

export default StateChallengeObject
