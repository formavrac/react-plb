import { useState, useEffect, ViewTransition, startTransition } from 'react'
import Book, { type Book as BookType } from '../components/Book'
import { BOOKS } from '../App'
import Button from '../components/Button'
import BookForm from '../components/BookForm'
import axios from 'axios'
import { useSearchParams } from 'react-router'

let nextId = 11

function Home() {
  const [books, setBooks] = useState<BookType[]>(BOOKS)
  const [selectedBook, setSelectedBook] = useState<BookType>()
  const [showForm, setShowForm] = useState(false)
  const [newBook, setNewBook] = useState<BookType>({
    id: 0,
    title: '',
    author: '',
    year: 0,
    image: '',
  })

  useEffect(() => { // Quand le composant est prêt, on fetch
    const loadBooks = async () => {
      console.log('API')
      const response = await axios.get<BookType[]>('http://localhost:3000/books')
      console.log(response.data)
      setBooks(response.data)
    }

    loadBooks()
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleAddBook = () => {
    setBooks([
      ...books,
      { ...newBook, id: nextId++ }
    ])
    setNewBook({ id: 0, title: '', author: '', year: 0, image: '' })
    toggleForm()
  }

  const handleRemoveBook = (book: BookType) => {
    setBooks(books.filter(b => b.id !== book.id))
  }

  const handleUpdateBook = (book: BookType) => {
    setBooks(books.map(b => b.id === book.id ? book : b))
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')

  return <>
    <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama ({books.length})</h1>

    {selectedBook && <div className="flex justify-center mb-4">
      <div className="w-1/3">
        <ViewTransition>
          <Book
            key={selectedBook.id}
            book={selectedBook}
            onSelect={() => {
              startTransition(() => {
                setSelectedBook(undefined)
              })
            }}
            onRemove={() => {
              handleRemoveBook(selectedBook)
              setSelectedBook(undefined)
            }}
            onSave={handleUpdateBook}
          />
        </ViewTransition>
      </div>
    </div>}

    <ul>
      {Array.from(searchParams.entries()).map((value, key) => (
        <li key={key}>{value[0]}: {value[1]}</li>
      ))}
    </ul>

    <input
      value={search ?? ''}
      type="text"
      name="search"
      className="border border-gray-300 rounded-md py-1 px-2 w-full"
      onChange={(event) => {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('search', event.target.value)
        setSearchParams(newParams)
      }}
    />

    <div className="grid grid-cols-4 gap-4">
      {books.filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase())).map((book) =>
        <Book
          key={book.id}
          book={book}
          onSelect={() => {
            startTransition(() => {
              setSelectedBook(selectedBook && selectedBook.id === book.id ? undefined : book)
            })
          }}
          active={!selectedBook || selectedBook.id !== book.id}
          onRemove={() => handleRemoveBook(book)}
          onSave={handleUpdateBook}
        />
      )}
    </div>

    {!showForm && <div className="text-center py-10">
      <Button onClick={toggleForm}>
        Ajouter un livre
      </Button>
    </div>}

    {showForm && <div className="mt-4">
      <pre>{JSON.stringify(newBook, null, 2)}</pre>
      <BookForm
        book={newBook}
        onCancel={toggleForm}
        onChange={(book: BookType) => setNewBook(book)}
        onSave={handleAddBook}
      />
    </div>}
  </>
}

export default Home
