import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation(); //hook pra pegar a rota atual

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* título da aplicação */}
        <Link to="/" className="text-white text-3xl font-extrabold tracking-wide mb-4 md:mb-0 hover:text-indigo-100 transition duration-300">
          Minha Biblioteca
        </Link>

        {/* links de navegação */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`text-white text-lg font-medium hover:text-indigo-200 transition duration-300 ${isActive('/') ? 'border-b-2 border-indigo-200 pb-1' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/livros"
            className={`text-white text-lg font-medium hover:text-indigo-200 transition duration-300 ${isActive('/livros') ? 'border-b-2 border-indigo-200 pb-1' : ''}`}
          >
            Listar Livros
          </Link>
          <Link
            to="/cadastro"
            className={`text-white text-lg font-medium hover:text-indigo-200 transition duration-300 ${isActive('/cadastro') ? 'border-b-2 border-indigo-200 pb-1' : ''}`}
          >
            Cadastrar Livro
          </Link>
          <Link
            to="/sobre"
            className={`text-white text-lg font-medium hover:text-indigo-200 transition duration-300 ${isActive('/sobre') ? 'border-b-2 border-indigo-200 pb-1' : ''}`}
          >
            Sobre
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
