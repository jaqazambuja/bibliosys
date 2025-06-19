import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from './BookForm';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: () => ({ pathname: '/cadastro' }), 
  };
});

describe('BookForm', () => {
  test('renders form for adding a new book', () => {
    render(<BookForm onSubmit={() => {}} />);
    expect(screen.getByRole('heading', { name: /Cadastrar Novo Livro/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Autor\(a\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gênero/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de leitura/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar Livro/i })).toBeInTheDocument();
  });

  test('renders form with initial data for editing a book', () => {
    const initialData = {
      id: '1',
      title: 'Teste Livro',
      author: 'Autor Teste',
      genre: 'Ficção',
      readDate: '2023-01-01'
    };
    render(<BookForm onSubmit={() => {}} initialData={initialData} />);
    expect(screen.getByRole('heading', { name: /Editar Livro/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/i)).toHaveValue('Teste Livro');
    expect(screen.getByLabelText(/Autor\(a\)/i)).toHaveValue('Autor Teste');
    expect(screen.getByLabelText(/Gênero/i)).toHaveValue('Ficção');
    expect(screen.getByLabelText(/Data de leitura/i)).toHaveValue('2023-01-01');
    expect(screen.getByRole('button', { name: /Atualizar Livro/i })).toBeInTheDocument();
  });

  
  test('shows validation errors when submitting empty required fields', async () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /Adicionar Livro/i }));

    await waitFor(() => {
      expect(screen.getByText(/O título é obrigatório./i)).toBeInTheDocument();
      expect(screen.getByText(/O\(a\) autor\(a\) é obrigatório\(a\)./i)).toBeInTheDocument();
      expect(screen.getByText(/O gênero é obrigatório./i)).toBeInTheDocument();
      expect(screen.getByText(/A data de leitura é obrigatória./i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled(); 
  });

  test('calls onSubmit with form data when all fields are valid', async () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Novo Livro' } });
    fireEvent.change(screen.getByLabelText(/Autor\(a\)/i), { target: { value: 'Novo Autor' } });
    fireEvent.change(screen.getByLabelText(/Gênero/i), { target: { value: 'Aventura' } });
    fireEvent.change(screen.getByLabelText(/Data de leitura/i), { target: { value: '2024-05-15' } });

    fireEvent.click(screen.getByRole('button', { name: /Adicionar Livro/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        id: null, 
        title: 'Novo Livro',
        author: 'Novo Autor',
        genre: 'Aventura',
        readDate: '2024-05-15',
      });
    });
  });
});