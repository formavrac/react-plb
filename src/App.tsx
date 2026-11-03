import { useState } from "react"
import Author, { type Author as AuthorType } from "./components/Author"
import Book, { type Book as BookType } from "./components/Book"
import Counter from "./components/Counter"
import type { Movie } from "./components/Movie"
import MovieList from "./components/MovieList"
import Button from "./components/Button"

export const BOOKS = [
  {
    id: 1,
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    year: 1954,
    image: '/assets/le-seigneur-des-anneaux.jpg',
  },
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
let nextId = 11

function App() {
  const [books, setBooks] = useState<BookType[]>(BOOKS)

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

  const [selectedBook, setSelectedBook] = useState<BookType>()

  const handleAddBook = () => {
    const randomBook = BOOKS[Math.floor(Math.random() * BOOKS.length)]

    setBooks([
      ...books, // [{1}, {2}, {3}] => {1}, {2}, {3}
      { ...randomBook, id: nextId++ } // { id: 10, title: 'machin', ..., id: 10++ }
    ])
  }

  const handleRemoveBook = (book: BookType) => {
    setBooks(books.filter(b => b.id !== book.id))
  }

  const handleUpdateBook = (localBook: BookType) => {
    setBooks(books.map(b => b.id === localBook.id ? localBook : b))
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama</h1>

        {selectedBook && <div className="flex justify-center mb-4">
          <div className="w-1/4">
            <Book
              book={selectedBook}
              onSelect={() => setSelectedBook(undefined)}
              onRemove={() => {
                handleRemoveBook(selectedBook)
                setSelectedBook(undefined)
              }}
              onSave={handleUpdateBook}
            />
          </div>
        </div>}

        <div className="grid grid-cols-4 gap-4">
          {books.map(b => <Book
            book={b}
            onSelect={() => setSelectedBook(b)}
            active={b.id !== selectedBook?.id}
            onRemove={() => handleRemoveBook(b)}
            onSave={handleUpdateBook}
            key={b.id}
          />)}

          {/*<ul>
          {[1, 2, 3].map(n =>
            <li>{n}</li>
          )}
          </ul>*/}
        </div>

        <div className="text-center py-10">
          <Button onClick={handleAddBook}>
            Ajouter un livre
          </Button>
        </div>

        <h2 className="text-2xl font-bold text-blue-500 mt-8 mb-4">Auteurs</h2>

        <div className="grid grid-cols-3 gap-4">
          {authors.map(a => <Author author={a} key={a.id} />)}
        </div>

        <h2 className="text-2xl font-bold text-blue-500 mt-8 mb-4">Films</h2>

        <MovieList movies={movies} />

        <h2 className="text-2xl font-bold text-blue-500 mt-8 mb-4">Compteurs</h2>

        <div className="flex flex-col gap-4">
          <Counter />
          <Counter initialValue={5} />
          <Counter initialValue={8} max={10} />
        </div>

        <MovieList movies={movies.slice(0, 3)} />
      </div>
    </div>
  )
}

export default App
