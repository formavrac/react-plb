import Movie, { type Movie as MovieType } from './Movie'

type MovieListProps = {
  movies: MovieType[]
}

function MovieList({ movies }: MovieListProps) {
  return (
    <>
      <h3>{movies.length} films</h3>
      <div className="grid grid-cols-3 gap-4">
        {movies.map(m => <Movie movie={m} key={m.id} />)}
      </div>
    </>
  )
}

export default MovieList
