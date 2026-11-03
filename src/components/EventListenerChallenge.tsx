import { type SubmitEvent, useState } from 'react'
import Button from './Button'
import { cn } from 'cn'

type Bird = {
  name: string
  age: number
  color: string
  isColorDisplayed: boolean
}

const ALLOWED_COLORS = ['bleu', 'noir', 'blanc']
const EMPTY_BIRD: Bird = { name: '', age: 0, color: '', isColorDisplayed: true }

function EventListenerChallenge() {
  const [birds, setBirds] = useState<Bird[]>([
    {
      name: 'Pingouin',
      age: 18,
      color: 'Noir',
      isColorDisplayed: true,
    },
    {
      name: 'Manchot',
      age: 15,
      color: 'Blanc',
      isColorDisplayed: false,
    },
    {
      name: 'Autruche',
      age: 8555,
      color: 'Blanc',
      isColorDisplayed: false,
    },
    {
      name: 'Colibri',
      age: 85,
      color: 'Bleu',
      isColorDisplayed: true,
    },
  ])
  const [newBird, setNewBird] = useState(EMPTY_BIRD)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBird({ ...newBird, [event.target.name]: event.target.value })
  }

  const saveBird = (event: SubmitEvent) => {
    event.preventDefault()

    const errors: Record<string, string> = {}

    if (newBird.name.length < 4 || newBird.name.length > 12) {
      errors.name = 'Veuillez entrer un nom entre 4 et 12 caractères'
    }

    if (!ALLOWED_COLORS.includes(newBird.color.toLowerCase())) {
      errors.color = 'Veuillez entrer une de ces trois couleurs : bleu, noir, blanc'
    }

    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    // Facultatif : convertir l'âge en nombre s'il est renseigné
    if (newBird.age) {
      newBird.age = Number(newBird.age)
    }

    setBirds([...birds, newBird])
    setNewBird(EMPTY_BIRD)
  }

  const removeBird = (index: number) => {
    setBirds(birds.filter((_, i) => i !== index))
  }

  const updateBird = (index: number, changes: Partial<Bird>) => {
    setBirds(birds.map((bird, i) => i === index ? { ...bird, ...changes } : bird))
  }

  return (
    <div>
      <ul>
        <li>Afficher chaque oiseau dans une boucle map</li>
      </ul>
      <h2>Pour chaque oiseau</h2>
      <ul>
        <li>Afficher son age, son nom, sa couleur</li>
        <li>Si sa propriété isColorDisplayed n'est pas égale à true, ne pas afficher sa couleur</li>
      </ul>
      <ul>
        <li>Créer un mécanisme qui permet d'ajouter un oiseau en utilisant un formulaire et des states</li>
        <li>Créer un mécanisme qui permet de supprimer un oiseau en utilisant un bouton supprimer</li>
        <li>Créer un mécanisme qui permet de modifier la couleur d'un oiseau en utilisant un input texte</li>
      </ul>
      <p>Dans le mécanisme d'ajout, ajouter des conditions qui empêchent la sauvegarde de l'oiseau</p>
      <ul>
        <li>Si son nom mesure moins de 4 caractères de long, ou plus de 12 caractères de long, alerter "Veuillez entrer un nom entre 4 et 12 caractères"</li>
        <li>Si sa couleur n'est ni "bleu", ni "noir", ni "blanc", alerter "Veuillez entrer une de ces trois couleurs : bleu, noir, blanc"</li>
      </ul>

      <ul className="my-4 flex flex-col gap-2">
        {birds.map((bird, index) => (
          <li className="flex items-center gap-2" key={index}>
            <span>{bird.name}, {bird.age} ans</span>
            {bird.isColorDisplayed && <>
              <span>{bird.color}</span>
              <input
                type="text"
                aria-label={`Couleur de ${bird.name}`}
                className="border border-gray-300 rounded-md py-1 px-2"
                value={bird.color}
                onChange={(event) => updateBird(index, { color: event.target.value })}
              />
            </>}
            <label>
              <input
                type="checkbox"
                className="mr-1"
                checked={bird.isColorDisplayed}
                onChange={(event) => updateBird(index, { isColorDisplayed: event.target.checked, age: bird.age + 1 })}
              />
              Afficher la couleur
            </label>
            <Button onClick={() => removeBird(index)}>Supprimer</Button>
          </li>
        ))}
      </ul>

      <form onSubmit={saveBird}>
        <div className="mb-2">
          <label htmlFor="bird-name">Nom</label>
          <input
            id="bird-name"
            type="text"
            className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.name && 'border-red-500')}
            name="name"
            value={newBird.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-2">
          <label htmlFor="bird-age">Âge</label>
          <input
            id="bird-age"
            type="number"
            className="border border-gray-300 rounded-md py-1 px-2 w-full"
            name="age"
            value={newBird.age}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="bird-color">Couleur</label>
          <input
            id="bird-color"
            type="text"
            className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.color && 'border-red-500')}
            name="color"
            value={newBird.color}
            onChange={handleChange}
          />
          {errors.color && <p className="text-red-500">{errors.color}</p>}
        </div>

        <Button>Ajouter l'oiseau</Button>
      </form>
    </div>
  )
}

export default EventListenerChallenge
