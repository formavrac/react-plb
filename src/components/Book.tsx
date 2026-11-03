import { useState } from 'react'
import Button from './Button'

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
    }
  }

  const handleSave = (event: React.SubmitEvent) => {
    event.preventDefault()

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
              {JSON.stringify(localBook)}
              <input
                id="title"
                type="text"
                className="border border-gray-300 rounded-md py-1 px-2 w-full"
                value={localBook.title}
                onChange={(event) => setLocalBook({ ...localBook, title: event.target.value })}
              />
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
        <h1 className="text-xl font-semibold text-gray-800">{book.title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
        <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>

        <Button onClick={handleSee}>Voir</Button>
        <Button onClick={handleClick} title={`() => setLike(${like} + 1)`}>
          ❤️‍🔥 {like > 0 && <>({like})</>}
        </Button>
        <Button title="Supprimer" onClick={handleRemove} className="bg-red-500 hover:bg-red-800">
          🗑️
        </Button>
        <Button title="Modifier" onClick={toggleEdit}>
          Modifier
        </Button>
      </div>
    </div>
  )
}

export default Book
