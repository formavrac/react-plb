import Book from "./components/Book"

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
      </div>
    </div>
  )
}

export default App
