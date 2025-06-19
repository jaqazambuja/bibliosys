import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; 

function NavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #4F46E5, #3730A3)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
          <LibraryBooksIcon sx={{ mr: 1, fontSize: 30 }} />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            }}
          >
            Minha Biblioteca
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' }, mt: { xs: 2, md: 0 }, '& > button': { mx: 1 } }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: 'none', fontWeight: isActive('/') ? 'bold' : 'normal', borderBottom: isActive('/') ? '2px solid white' : 'none', borderRadius: 0 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/livros"
            sx={{ textTransform: 'none', fontWeight: isActive('/livros') ? 'bold' : 'normal', borderBottom: isActive('/livros') ? '2px solid white' : 'none', borderRadius: 0 }}
          >
            Listar Livros
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/cadastro"
            sx={{ textTransform: 'none', fontWeight: isActive('/cadastro') ? 'bold' : 'normal', borderBottom: isActive('/cadastro') ? '2px solid white' : 'none', borderRadius: 0 }}
          >
            Cadastrar Livro
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/sobre"
            sx={{ textTransform: 'none', fontWeight: isActive('/sobre') ? 'bold' : 'normal', borderBottom: isActive('/sobre') ? '2px solid white' : 'none', borderRadius: 0 }}
          >
            Sobre
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;