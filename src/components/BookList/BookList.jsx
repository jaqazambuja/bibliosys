import React, { useState } from 'react';

function BookList({ books, onEdit, onDelete }) {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Livros Cadastrados
      </h2>

      {/*campo de busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por título, autor ou gênero..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Nenhum livro encontrado. Cadastre um novo livro ou ajuste sua busca.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Título</th>
                <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Autor(a)</th>
                <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Gênero</th>
                <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Data Leitura</th>
                <th className="py-3 px-4 text-center text-sm font-semibold uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="py-3 px-4 text-gray-800">{book.title}</td>
                  <td className="py-3 px-4 text-gray-800">{book.author}</td>
                  <td className="py-3 px-4 text-gray-800">{book.genre}</td>
                  <td className="py-3 px-4 text-gray-800">{book.readDate}</td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(book.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(book.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookList;
