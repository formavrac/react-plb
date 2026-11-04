import { Link, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { Book } from '../components/Book';
import axios from 'axios';

function BookSingle() {
  const params = useParams()
  // const book = BOOKS.find(b => b.id === Number(params.id))
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  // 1: Aller chercher le livre sur l'API
  // 2: Prévoir un état de chargement et d'erreur (state ?)
  // (await et try catch)

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        const response = await axios.get<Book>(`http://localhost:3000/books/${params.id}`)
        setBook(response.data)
      } catch (error: any) {
        setError(error.message)
      }

      setLoading(false)
    }

    loadBook()
  }, [params.id])

  // 3: Afficher le livre ou un message d'erreur si non trouvé

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
        <span className="ml-4 text-blue-500 font-medium">Chargement des livres...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto mb-4">
        <strong className="font-bold">Erreur :</strong>
        <span className="block sm:inline ml-1">{error}</span>
      </div>
    )
  }

  return book && (
    <div className="flex gap-8 mt-8">
      <title>{`${book.title} - Bookorama`}</title>
      {book.image &&
        <div className="w-1/2">
          <img
            src={book.image}
            alt={`Couverture de ${book.title}`}
            className="w-full object-cover"
          />
        </div>
      }
      <div className="w-1/2">
        <h1 className="text-xl font-semibold text-gray-800">{book.title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
        <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>
      </div>

      <Link to="/livre/3">Livre 3</Link>
    </div>
  )
}

export default BookSingle
