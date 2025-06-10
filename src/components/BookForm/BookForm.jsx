import React, { useState, useEffect } from 'react';

function BookForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [readDate, setReadDate] = useState('');
  const [id, setId] = useState(null);

  const [errors, setErrors] = useState({});
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setAuthor(initialData.author || '');
      setGenre(initialData.genre || '');
      setReadDate(initialData.readDate || '');
      setId(initialData.id || null);
    } else {
      //limpa formulario 
      setTitle('');
      setAuthor('');
      setGenre('');
      setReadDate('');
      setId(null);
    }
    setErrors({}); //limpa os erros ao recarregar ou carregar
    setIsSubmitted(false); //reseta o estado da submissão
  }, [initialData]);

  //validação do formulario
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'O título é obrigatório.';
    if (!author.trim()) newErrors.author = 'O(a) autor(a) é obrigatório(a).';
    if (!genre.trim()) newErrors.genre = 'O gênero é obrigatório.';
    if (!readDate.trim()) newErrors.readDate = 'A data de leitura é obrigatória.';
    //formato da data
    if (readDate.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(readDate)) {
      newErrors.readDate = 'Formato de data inválido (AAAA-MM-DD).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //handler evento de submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsSubmitted(true); 

    if (validateForm()) { //se o formulário for válido
      onSubmit({ id, title, author, genre, readDate });

      if (!id) {
        setTitle('');
        setAuthor('');
        setGenre('');
        setReadDate('');
      }
      setIsSubmitted(false); //reseta o estado de submissão
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        {initialData ? 'Editar Livro' : 'Cadastrar Novo Livro'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* campo título */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
              isSubmitted && errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Título do livro"
          />
          {isSubmitted && errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* campo autor */}
        <div>
          <label htmlFor="author" className="block text-lg font-medium text-gray-700 mb-2">
            Autor(a)
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
              isSubmitted && errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nome do(a) autor(a)"
          />
          {isSubmitted && errors.author && (
            <p className="mt-2 text-sm text-red-600">{errors.author}</p>
          )}
        </div>

        {/* campo genero */}
        <div>
          <label htmlFor="genre" className="block text-lg font-medium text-gray-700 mb-2">
            Gênero
          </label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
              isSubmitted && errors.genre ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Gênero do livro (Ex: Ficção Científica)"
          />
          {isSubmitted && errors.genre && (
            <p className="mt-2 text-sm text-red-600">{errors.genre}</p>
          )}
        </div>

        {/* campo data de leitura */}
        <div>
          <label htmlFor="readDate" className="block text-lg font-medium text-gray-700 mb-2">
            Data de leitura
          </label>
          <input
            type="date"
            id="readDate"
            value={readDate}
            onChange={(e) => setReadDate(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
              isSubmitted && errors.readDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {isSubmitted && errors.readDate && (
            <p className="mt-2 text-sm text-red-600">{errors.readDate}</p>
          )}
        </div>

        {/* botão de submissão */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          {initialData ? 'Atualizar Livro' : 'Adicionar Livro'}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
