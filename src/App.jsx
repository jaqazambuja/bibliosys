import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import BookForm from './components/BookForm/BookForm.jsx';
import BookList from './components/BookList/BookList.jsx';
import bookService from './api/bookService.js'; 

import { Box, Typography, Container, CircularProgress } from '@mui/material';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const navigate = useNavigate();
  const location = useLocation();

  const fetchBooks = async () => {
    setLoading(true);
    setError(null); 
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Falha ao carregar livros. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks();
  }, []); 

  //limpa o estado de edição quando a rota muda para /cadastro 
  useEffect(() => {
    if (location.pathname === '/cadastro' && !location.state?.editing) {
      setEditingBook(null);
    }
  }, [location.pathname]);

  const handleFormSubmit = async (bookData) => {
    try {
      if (editingBook) {
        await bookService.updateBook(bookData); 
        setEditingBook(null); 
      } else {
        await bookService.createBook(bookData); 
      }
      await fetchBooks(); 
      navigate('/livros'); 
    } catch (err) {
      console.error("Failed to save book:", err);
      setError("Falha ao salvar livro. Verifique os dados ou a conexão com a API.");
    }
  };

  
  const handleEdit = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const bookToEdit = await bookService.getBookById(id); 
      setEditingBook(bookToEdit);
      navigate('/cadastro', { state: { editing: true } }); 
    } catch (err) {
      console.error(`Failed to fetch book for editing (ID: ${id}):`, err);
      setError("Falha ao carregar livro para edição. Verifique o ID ou a conexão com a API.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await bookService.deleteBook(id); 
        await fetchBooks(); 
      } catch (err) {
        console.error(`Failed to delete book (ID: ${id}):`, err);
        setError("Falha ao excluir livro. Verifique o ID ou a conexão com a API.");
      }
    }
  };

  const HomePage = () => (
    <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Bem-vindo(a) à bibliosys
      </Typography>
      <Typography variant="h6" align="center" sx={{ color: 'text.secondary', mb: 4 }}>
        Gerencie seus livros lidos de forma simples e eficiente. Adicione, visualize, edite e organize suas leituras favoritas.
      </Typography>
      <Box
        component="img"
        src="https://placehold.co/600x400/E0E7FF/4F46E5?text=Bibliosys"
        alt="Ilustração de uma biblioteca"
        sx={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 2,
          boxShadow: 3,
          border: '2px solid',
          borderColor: 'indigo.200',
        }}
      />
    </Container>
  );

  const AboutPage = () => (
    <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Sobre a Bibliosys
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mb: 2 }}>
        Este projeto é um exemplo de aplicação React desenvolvida para a Fase 2 do trabalho da disciplina de Desenvolvimento Frontend.
        Ele demonstra a criação de componentes, gerenciamento de estado, validação de formulários, integração com API REST (utilizando Axios) e testes unitários.
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mb: 4 }}>
        O objetivo é fornecer uma ferramenta intuitiva para que você possa acompanhar suas leituras, organizando-as por título, autor, gênero e data de leitura, com dados persistidos via API.
      </Typography>
      <Box
        component="img"
        src="https://placehold.co/600x300/CFE2F3/283593?text=Desenvolvido+com+React+e+MUI"
        alt="Ilustração de desenvolvimento com React e MUI"
        sx={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 2,
          boxShadow: 3,
          border: '2px solid',
          borderColor: 'blue.200',
        }}
      />
    </Container>
  );

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'grey.50', minHeight: '100vh' }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Carregando...</Typography>
          </Box>
        )}
        {error && (
          <Typography color="error" align="center" sx={{ my: 4 }}>
            {error}
          </Typography>
        )}
        {!loading && !error && (
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
            <Route path="*" element={
              <Typography variant="h4" align="center" color="error" sx={{ mt: 10 }}>
                Página não encontrada!
              </Typography>
            } />
          </Routes>
        )}
      </Container>
    </Box>
  );
}

export default App;