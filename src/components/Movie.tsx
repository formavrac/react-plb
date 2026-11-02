export type Movie = {
  id: number
  title: string
  year: number
  rating: number
}

type MovieProps = {
  movie: Movie
}

function Movie({ movie }: MovieProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
      <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
      <p className="text-sm text-gray-500">Sorti en {movie.year}</p>
      <p className="text-sm text-gray-500">Note : {movie.rating}/10</p>
      <p>{'⭐'.repeat(Math.ceil(movie.rating))}</p>
      {movie.rating >= 8 && (
        <p className="text-sm text-green-600 mt-2">⭐ Recommandé !</p>
      )}
      {movie.rating < 5 && (
        <p className="text-sm text-red-600 mt-2">👎 À éviter</p>
      )}
    </div>
  )
}

export default Movie
