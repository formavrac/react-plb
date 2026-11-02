export type Author = {
  id: number
  name: string
  birthDate: string
}

type AuthorProps = {
  author: Author
}

function Author({ author }: AuthorProps) {
  const birthDate = new Date(author.birthDate)

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
      <h3 className="text-xl font-semibold text-gray-800">{author.name}</h3>
      <p className="text-sm text-gray-500">
        Né(e) le {birthDate.toLocaleDateString('fr-FR')}
      </p>
      {birthDate.getFullYear() < 1925 && (
        <p className="text-sm text-blue-500 mt-2">A plus de 100 ans</p>
      )}
    </div>
  )
}

export default Author
