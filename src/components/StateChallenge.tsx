import { useState } from 'react'
import Button from './Button'

function StateChallenge() {
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
  const [newAnimalType, setNewAnimalType] = useState('')
  const [newAnimalName, setNewAnimalName] = useState('')

  const saveAnimal = (event: React.SubmitEvent) => {
    event.preventDefault()

    setAnimals([...animals, { name: newAnimalName, type: newAnimalType }])
    setNewAnimalType('')
    setNewAnimalName('')
  }

  return (
    <div>
      <ul>
        <li>
          Afficher la liste des animaux dans une boucle map. Pour chaque animal, afficher son nom et son type.
        </li>
        <li>
          Créer un input texte qui permet de saisir la valeur du state newAnimalType. Quand sa valeur change, la valeur de newAnimalType est mise à jour.
        </li>
        <li>
          Créer un autre input texte qui permet de saisir la valeur du state newAnimalName, avec le même fonctionnement.
        </li>
        <li>
          Créer une fonction vide saveAnimal, et l'appeler depuis un bouton que vous créerez également.
        </li>
        <li>
          Remplir la fonction saveAnimal tel que les valeurs newAnimalType et newAnimalName sont sauvegardées dans un nouvel objet animal,
          que la fonction mette le tableau des animaux à jour en ajoutant le nouvel objet animal à la fin et qu'une fois que l'animal a été créé,
          la fonction vide les champs newAnimalType et newAnimalName.
        </li>
        <li>Bon courage !</li>
      </ul>

      <ul className="my-4">
        {animals.map((animal, index) => (
          <li key={index}>
            {animal.name} ({animal.type})
          </li>
        ))}
      </ul>

      <form onSubmit={saveAnimal}>
        <div className="mb-2">
          <label htmlFor="animal-type">Type</label>
          <input
            id="animal-type"
            type="text"
            className="border border-gray-300 rounded-md py-1 px-2 w-full"
            value={newAnimalType}
            onChange={(event) => setNewAnimalType(event.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="animal-name">Nom</label>
          <input
            id="animal-name"
            type="text"
            className="border border-gray-300 rounded-md py-1 px-2 w-full"
            value={newAnimalName}
            onChange={(event) => setNewAnimalName(event.target.value)}
          />
        </div>

        <Button>Ajouter l'animal</Button>
      </form>
    </div>
  )
}

export default StateChallenge
