import { useParams } from 'react-router'
import { BOOKS } from '../App'

function BookSingle() {
  const params = useParams()
  const book = BOOKS.find(b => b.id === Number(params.id))
  // 1: Aller chercher le livre sur l'API
  // 2: Prévoir un état de chargement et d'erreur (state ?)
  // (await et try catch)
  // 3: Afficher le livre ou un message d'erreur si non trouvé

  return book && (
    <div className="flex gap-8 mt-8">
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
    </div>
  )
}

export default BookSingle
