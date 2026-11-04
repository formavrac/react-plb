import { useState } from 'react'
import Book, { type Book as BookType } from '../components/Book'
import { BOOKS } from '../App'
import Button from '../components/Button'
import BookForm from '../components/BookForm'

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

  return <>
    <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama ({books.length})</h1>

    {selectedBook && <div className="flex justify-center mb-4">
      <div className="w-1/3">
        <Book
          key={selectedBook.id}
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
      {books.map((book) =>
        <Book
          key={book.id}
          book={book}
          onSelect={() => setSelectedBook(selectedBook && selectedBook.id === book.id ? undefined : book)}
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
