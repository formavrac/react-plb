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
}

function Book({ book, active = true, onSelect }: BookProps) {
  const [like, setLike] = useState(0)

  const handleClick = () => {
    setLike(like => like + 1)
  }

  const handleSee = () => {
    onSelect()
  }

  if (!active) return

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
      </div>
    </div>
  )
}

export default Book
