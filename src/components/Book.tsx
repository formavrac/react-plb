import { useState } from 'react'
import Button from './Button'
import { AUTHORS } from '../App'
import { cn } from 'cn'
import { Link } from 'react-router'
import { useUser } from '../contexts/UserContext'

export type Book = {
  id: number
  title: string
  author: string
  year: number
  image?: string
}

type BookProps = {
  book: Book
  active?: boolean
  onSelect: () => void
  onRemove: () => void
  onSave: (book: Book) => void
}

function Book({ book, active = true, onSelect, onRemove, onSave }: BookProps) {
  const [like, setLike] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [localBook, setLocalBook] = useState(book)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { user } = useUser()

  const handleClick = () => {
    setLike(like => like + 1)
  }

  const handleSee = () => {
    onSelect()
  }

  const handleRemove = () => {
    onRemove()
  }

  const toggleEdit = () => {
    setEditMode(!editMode)

    if (!editMode) {
      setLocalBook(book) // "reset" du state
      setErrors({})
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // input name="title" value="mon livre"
    setLocalBook({ ...localBook, [event.target.name]: event.target.value })
  }

  const handleSave = (event: React.SubmitEvent) => {
    event.preventDefault()

    const err: Record<string, string> = {}

    if (!localBook.title) {
      err.title = 'Le titre est obligatoire'
    }

    if (!localBook.year) {
      err.year = `L'année est obligatoire`
    }

    if (localBook.year < 1900 || localBook.year > 2023) {
      err.year = `L'année n'est pas correcte`
    }

    setErrors(err)

    if (Object.keys(err).length > 0) {
      return
    }

    onSave(localBook)
    setEditMode(false)
  }

  if (!active) return

  if (editMode) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-4">
          <form onSubmit={handleSave}>
            <div className="mb-2">
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.title && 'border-red-500')}
                value={localBook.title}
                name="title"
                onChange={handleChange}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="author">Auteur</label>
              <select
                id="author"
                className="border border-gray-300 rounded-md py-1 px-2 w-full"
                value={localBook.author}
                name="author"
                onChange={handleChange}
              >
                {AUTHORS.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="year">Année</label>
              <input
                id="year"
                type="number"
                className={cn("border border-gray-300 rounded-md py-1 px-2 w-full", errors.year && 'border-red-500')}
                value={localBook.year}
                name="year"
                onChange={handleChange}
              />
              {errors.year && <p className="text-red-500">{errors.year}</p>}
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button title="Annuler" onClick={toggleEdit} className="bg-red-500 hover:bg-red-800" type="button">
                Annuler
              </Button>
              <Button title="Sauvegarder">
                Sauvegarder
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      {book.image && (
        <img
          src={book.image}
          alt={`Couverture de ${book.title}`}
          className="w-full h-64 object-cover"
        />
      ) || (
        <p>Pas d'image</p>
      )}
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">
          <Link to={`/livre/${book.id}`}>
            {book.title}
          </Link>
        </h1>
        <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
        <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>

        <Button onClick={handleSee}>Voir</Button>
        <Button onClick={handleClick} title={`() => setLike(${like} + 1)`}>
          ❤️‍🔥 {like > 0 && <>({like})</>}
        </Button>
        {user && <>
          <Button title="Supprimer" onClick={handleRemove} className="bg-red-500 hover:bg-red-800">
            🗑️
          </Button>
          <Button title="Modifier" onClick={toggleEdit}>
            Modifier
          </Button>
        </>}
      </div>
    </div>
  )
}

export default Book
