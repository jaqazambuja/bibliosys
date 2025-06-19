import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, TextField, Box, Typography, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function BookList({ books, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
        Livros Cadastrados
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          label="Buscar por título, autor ou gênero..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {filteredBooks.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ color: 'text.secondary', mt: 4 }}>
          Nenhum livro encontrado. Cadastre um novo livro ou ajuste sua busca.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={1}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: 'primary.dark' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Título</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Autor(a)</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gênero</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Data Leitura</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow
                  key={book.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell component="th" scope="row">
                    {book.title}
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.readDate ? book.readDate.split('T')[0] : ''}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => onEdit(book.id)} aria-label="editar">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(book.id)} aria-label="excluir">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default BookList;