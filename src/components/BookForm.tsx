import { type SubmitEvent, useEffect, useState } from 'react'
import type { Book } from './Book'
import Button from './Button'
import { cn } from 'cn'
import { AUTHORS } from '../App'

type BookFormProps = {
  book: Book
  onCancel: () => void
  onChange: (book: Book) => void
  onSave: () => void
}

function BookForm({ book, onCancel, onChange, onSave }: BookFormProps) {
  const [localBook, setLocalBook] = useState(book)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // console.log('Le composant apparait')

    // return () => console.log('le composant disparait')
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const book = { ...localBook, [event.target.name]: event.target.value }
    setLocalBook(book)
    onChange(book)
  }

  const handleCancel = () => {
    onCancel()
  }

  const handleSave = (event: SubmitEvent) => {
    event.preventDefault()

    const errors: Record<string, string> = {}

    if (!localBook.title) {
      errors.title = 'Le titre est obligatoire'
    }

    if (!localBook.year) {
      errors.year = `L'année est obligatoire`
    }

    if (localBook.year < 1900 || localBook.year > 2023) {
      errors.year = `L'année n'est pas correcte`
    }

    if (!localBook.image || !localBook.image.startsWith('http')) {
      errors.image = `L'url n'est pas correcte`
    }

    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    onSave()
  }

  return (
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
          {Array.from(AUTHORS).map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="year">Année</label>
        <input
          id="year"
          type="number"
          className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.year && 'border-red-500')}
          value={localBook.year}
          name="year"
          onChange={handleChange}
        />
        {errors.year && <p className="text-red-500">{errors.year}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="text"
          className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.image && 'border-red-500')}
          value={localBook.image}
          name="image"
          onChange={handleChange}
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button title="Annuler" onClick={handleCancel} className="bg-red-500 hover:bg-red-800" type="button">
          Annuler
        </Button>
        <Button title="Sauvegarder">
          Sauvegarder
        </Button>
      </div>
    </form>
  )
}

export default BookForm