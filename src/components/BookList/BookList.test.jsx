import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

//mock do useNavigate e useLocation
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/livros' }),
  };
});

describe('BookList', () => {
  const mockBooks = [
    { id: '1', title: 'Livro A', author: 'Autor A', genre: 'Ação', readDate: '2023-01-01' },
    { id: '2', title: 'Livro B', author: 'Autor B', genre: 'Comédia', readDate: '2023-02-01' },
    { id: '3', title: 'Livro C', author: 'Autor A', genre: 'Drama', readDate: '2023-03-01' },
  ];

  it('renders a list of books', () => {
    render(<BookList books={mockBooks} onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByRole('heading', { name: /Livros Cadastrados/i })).toBeInTheDocument();
    expect(screen.getByText('Livro A')).toBeInTheDocument();
    expect(screen.getByText('Livro B')).toBeInTheDocument();
    expect(screen.getByText('Livro C')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /editar/i })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: /excluir/i })).toHaveLength(3);
  });

  it('filters books by search term', () => {
    render(<BookList books={mockBooks} onEdit={() => {}} onDelete={() => {}} />);

    const searchInput = screen.getByLabelText(/Buscar por título, autor ou gênero.../i);
    fireEvent.change(searchInput, { target: { value: 'Autor A' } });

    expect(screen.getByText('Livro A')).toBeInTheDocument();
    expect(screen.queryByText('Livro B')).not.toBeInTheDocument();
    expect(screen.getByText('Livro C')).toBeInTheDocument();
  });

  it('displays "Nenhum livro encontrado" when no books are present', () => {
    render(<BookList books={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Nenhum livro encontrado/i)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<BookList books={mockBooks} onEdit={() => {}} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getAllByRole('button', { name: /excluir/i })[0]);

    expect(window.confirm).toHaveBeenCalledWith('Tem certeza que deseja excluir este livro?');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    render(<BookList books={mockBooks} onEdit={mockOnEdit} onDelete={() => {}} />);

    fireEvent.click(screen.getAllByRole('button', { name: /editar/i })[0]);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith('1');
  });
});
