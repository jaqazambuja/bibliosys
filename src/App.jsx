import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx'; 
import BookForm from './components/BookForm/BookForm.jsx'; 
import BookList from './components/BookList/BookList.jsx'; 

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('book_app_books');
    return savedBooks ? JSON.parse(savedBooks) : [
      { id: '1', title: 'Dom Casmurro', author: 'Machado de Assis', genre: 'Romance', readDate: '1899-01-01' },
      { id: '2', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', genre: 'Infantil', readDate: '1943-04-06' },
      { id: '3', title: '1984', author: 'George Orwell', genre: 'Distopia', readDate: '1949-06-08' },
    ];
  });

  const [editingBook, setEditingBook] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('book_app_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    setEditingBook(null);
  }, [location.pathname]);

  const addBook = (bookData) => {
    const newBook = { id: crypto.randomUUID(), ...bookData }; 
    setBooks([...books, newBook]);
    navigate('/livros'); 
  };

  const updateBook = (updatedBookData) => {
    setBooks(books.map(book =>
      book.id === updatedBookData.id ? updatedBookData : book
    ));
    setEditingBook(null); 
    navigate('/livros'); 
  };

  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      updateBook(bookData);
    } else {
      addBook(bookData);
    }
  };

  const handleEdit = (id) => {
    const bookToEdit = books.find(book => book.id === id);
    if (bookToEdit) {
      setEditingBook(bookToEdit);
      navigate('/cadastro'); 
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const HomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-gray-50 text-gray-800">
      <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-6 drop-shadow-lg text-center">
        Bem-vindo à sua Biblioteca Digital
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 text-center max-w-2xl leading-relaxed">
        Gerencie seus livros lidos de forma simples e eficiente. Adicione, visualize, edite e organize suas leituras favoritas.
      </p>
      <img
        src="https://placehold.co/600x400/E0E7FF/4F46E5?text=Sua+Biblioteca"
        alt="Ilustração de uma biblioteca"
        className="mt-10 rounded-xl shadow-lg border-2 border-indigo-200 max-w-full h-auto"
      />
    </div>
  );

  const AboutPage = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-gray-50 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6 text-center">
        Sobre a Biblioteca Digital
      </h1>
      <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl leading-relaxed">
        Este projeto é um exemplo de aplicação React desenvolvida para a Fase 1 do trabalho da disciplina de Desenvolvimento Frontend.
        Ele demonstra a criação de componentes, gerenciamento de estado, validação de formulários e operações CRUD estáticas.
      </p>
      <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl leading-relaxed mt-4">
        O objetivo é fornecer uma ferramenta intuitiva para que você possa acompanhar suas leituras, organizando-as por título, autor, gênero e data de leitura.
      </p>
      <img
        src="https://placehold.co/600x300/CFE2F3/283593?text=Desenvolvido+com+React"
        alt="Ilustração de desenvolvimento com React"
        className="mt-10 rounded-xl shadow-lg border-2 border-blue-200 max-w-full h-auto"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-900">
      <NavBar /> {}
      <main className="container mx-auto p-4 py-8">
        {/* rotas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route
            path="/cadastro"
            element={<BookForm onSubmit={handleFormSubmit} initialData={editingBook} />}
          />
          <Route
            path="/livros"
            element={<BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />}
          />
          {/*rota padrão de fallback */}
          <Route path="*" element={<h1 className="text-3xl font-bold text-center text-red-600 mt-10">Página não encontrada!</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
