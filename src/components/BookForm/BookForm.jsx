import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

function BookForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [readDate, setReadDate] = useState('');
  const [id, setId] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setAuthor(initialData.author || '');
      setGenre(initialData.genre || '');
      setReadDate(initialData.readDate ? initialData.readDate.split('T')[0] : ''); 
      setId(initialData.id || null);
    } else {
      setTitle('');
      setAuthor('');
      setGenre('');
      setReadDate('');
      setId(null);
    }
    setErrors({}); //limpa erros ao carregar/resetar
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'O título é obrigatório.';
    if (!author.trim()) newErrors.author = 'O(a) autor(a) é obrigatório(a).';
    if (!genre.trim()) newErrors.genre = 'O gênero é obrigatório.';
    if (!readDate.trim()) newErrors.readDate = 'A data de leitura é obrigatória.';
    if (readDate.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(readDate)) {
      newErrors.readDate = 'Formato de data inválido (AAAA-MM-DD).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ id, title, author, genre, readDate });
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
        {initialData ? 'Editar Livro' : 'Cadastrar Novo Livro'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          required
        />
        <TextField
          label="Autor(a)"
          variant="outlined"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          error={!!errors.author}
          helperText={errors.author}
          required
        />
        <TextField
          label="Gênero"
          variant="outlined"
          fullWidth
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          error={!!errors.genre}
          helperText={errors.genre}
          required
        />
        <TextField
          label="Data de leitura"
          type="date"
          variant="outlined"
          fullWidth
          value={readDate}
          onChange={(e) => setReadDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors.readDate}
          helperText={errors.readDate}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, py: 1.5 }}
        >
          {initialData ? 'Atualizar Livro' : 'Adicionar Livro'}
        </Button>
      </Box>
    </Paper>
  );
}

export default BookForm;