import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Book, { type Book as BookType } from './Book'
import { MemoryRouter } from 'react-router'
import { UserProvider } from '../contexts/UserContext'

const mockBook: BookType = {
  id: 1,
  title: 'Titre original',
  author: 'Victor Hugo',
  year: 2000,
  image: '',
}

describe('Book component', () => {
  it('should enter edit mode and save changes', async () => {
    const onSave = vi.fn()
    const onSelect = vi.fn()
    const onRemove = vi.fn()

    render(
      <UserProvider>
        <MemoryRouter>
            <Book
                book={mockBook}
                onSelect={onSelect}
                onRemove={onRemove}
                onSave={onSave}
            />
        </MemoryRouter>
      </UserProvider>
    )

    const editButton = screen.getByRole('button', { name: /modifier/i })
    await userEvent.click(editButton)

    const titleInput = screen.getByLabelText(/titre/i) as HTMLInputElement
    expect(titleInput.value).toBe(mockBook.title)

    const authorSelect = screen.getByLabelText(/auteur/i) as HTMLSelectElement
    expect(authorSelect.value).toBe(mockBook.author)

    const yearInput = screen.getByLabelText(/année/i) as HTMLInputElement
    expect(yearInput.value).toBe(mockBook.year.toString())

    await userEvent.clear(titleInput)

    const saveButton = screen.getByRole('button', { name: /sauvegarder/i })
    await userEvent.click(saveButton)

    expect(screen.getByText(/titre est obligatoire/i)).toBeInTheDocument()
    expect(onSave).not.toHaveBeenCalled()

    await userEvent.type(titleInput, 'Nouveau titre')
    await userEvent.clear(yearInput)
    await userEvent.type(yearInput, '2020')

    await userEvent.click(saveButton)

    expect(onSave).toHaveBeenCalledWith({
      ...mockBook,
      title: 'Nouveau titre',
      year: '2020',
    })

    expect(screen.queryByLabelText(/titre/i)).not.toBeInTheDocument()
  })

  it('should cancel edit mode', async () => {
    render(
      <UserProvider>
        <MemoryRouter>
            <Book
            book={mockBook}
            onSelect={() => {}}
            onRemove={() => {}}
            onSave={() => {}}
            />
        </MemoryRouter>
      </UserProvider>
    )

    let editButton = screen.getByRole('button', { name: /modifier/i })
    await userEvent.click(editButton)

    let titleInput = screen.getByLabelText(/titre/i) as HTMLInputElement
    await userEvent.type(titleInput, 'Nouveau titre')

    const cancelButton = screen.getByRole('button', { name: /annuler/i })
    await userEvent.click(cancelButton)

    expect(screen.queryByLabelText(/titre/i)).not.toBeInTheDocument()
    expect(screen.getByText(mockBook.title)).toBeInTheDocument()

    editButton = screen.getByRole('button', { name: /modifier/i })
    await userEvent.click(editButton)
    titleInput = screen.getByLabelText(/titre/i) as HTMLInputElement
    expect(titleInput.value).toBe(mockBook.title)
  })
})
