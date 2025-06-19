import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

describe('NavBar', () => {
  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Listar Livros/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cadastrar Livro/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sobre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Minha Biblioteca/i })).toBeInTheDocument();
  });

  it('app title is a link to home', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const appTitleLink = screen.getByRole('link', { name: /Minha Biblioteca/i });
    expect(appTitleLink).toBeInTheDocument();
    expect(appTitleLink).toHaveAttribute('href', '/');
  });
});
