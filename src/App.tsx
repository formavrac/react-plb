import Author, { type Author as AuthorType } from "./components/Author"
import Book from "./components/Book"
import type { Movie } from "./components/Movie"
import MovieList from "./components/MovieList"

function App() {
  const book = {
    id: 1,
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    year: 1954,
    image: '/assets/le-seigneur-des-anneaux.jpg'
  }

  const books = [
    book,
    {
      id: 2,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      year: 1943,
      image: '/assets/le-petit-prince.jpg',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      image: '/assets/1984.jpeg',
    },
    {
      id: 4,
      title: 'L\'Étranger',
      author: 'Albert Camus',
      year: 1942,
      image: '/assets/l-etranger.jpg',
    },
    {
      id: 5,
      title: 'Harry Potter à l\'école des sorciers',
      author: 'J.K. Rowling',
      year: 1997,
      image: '/assets/harry-potter-a-l-ecole-des-sorciers.jpg',
    },
    {
      id: 6,
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      year: 1953,
      image: '/assets/fahrenheit-451.jpg',
    },
    {
      id: 7,
      title: 'Les Misérables',
      author: 'Victor Hugo',
      year: 1862,
      image: '/assets/les-miserables.jpg',
    },
    {
      id: 8,
      title: 'Orgueil et Préjugés',
      author: 'Jane Austen',
      year: 1813,
      image: '/assets/orgueil-et-prejuges.jpg',
    },
    {
      id: 9,
      title: 'Le Comte de Monte-Cristo',
      author: 'Alexandre Dumas',
      year: 1844,
      image: '/assets/le-comte-de-monte-cristo.jpeg',
    },
    {
      id: 10,
      title: 'La Peste',
      author: 'Albert Camus',
      year: 1947,
      image: '/assets/la-peste.jpg',
    }
  ]

  const authors: AuthorType[] = [
    { id: 1, name: 'J.R.R. Tolkien', birthDate: '1892-01-03' },
    { id: 2, name: 'Antoine de Saint-Exupéry', birthDate: '1900-06-29' },
    { id: 3, name: 'George Orwell', birthDate: '1903-06-25' },
    { id: 4, name: 'Albert Camus', birthDate: '1913-11-07' },
    { id: 5, name: 'J.K. Rowling', birthDate: '1965-07-31' },
    { id: 6, name: 'Stephen King', birthDate: '1947-09-21' },
  ]

  const movies: Movie[] = [
    { id: 1, title: 'Inception', year: 2010, rating: 8.8 },
    { id: 2, title: 'Le Fabuleux Destin d\'Amélie Poulain', year: 2001, rating: 8.3 },
    { id: 3, title: 'Jurassic Park', year: 1993, rating: 7.5 },
    { id: 4, title: 'Avatar', year: 2009, rating: 6.5 },
    { id: 5, title: 'Catwoman', year: 2004, rating: 3.4 },
  ]

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama</h1>

        <div className="grid grid-cols-4 gap-4">
          <Book book={book} />
          <Book book={book} active={book.year < 1954} />
          <Book book={book} />

          {books.map(b => <Book book={b} key={b.id} />)}

          {/*<ul>
          {[1, 2, 3].map(n =>
            <li>{n}</li>
          )}
          </ul>*/}
        </div>

        <h2 className="text-2xl font-bold text-blue-500 mt-8 mb-4">Auteurs</h2>

        <div className="grid grid-cols-3 gap-4">
          {authors.map(a => <Author author={a} key={a.id} />)}
        </div>

        <h2 className="text-2xl font-bold text-blue-500 mt-8 mb-4">Films</h2>

        <MovieList movies={movies} />

        <MovieList movies={movies.slice(0, 3)} />
      </div>
    </div>
  )
}

export default App
