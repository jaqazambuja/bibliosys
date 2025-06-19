import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

const bookService = {
 
  getAllBooks: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      throw error; 
    }
  },

  
  getBookById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar livro com ID ${id}:`, error);
      throw error;
    }
  },

  
  createBook: async (bookData) => {
    try {
      const response = await axios.post(API_URL, bookData);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      throw error;
    }
  },

  
  updateBook: async (bookData) => {
    try {

      const response = await axios.put(API_URL, bookData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      throw error;
    }
  },

  
  deleteBook: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data; 
    } catch (error) {
      console.error(`Erro ao deletar livro com ID ${id}:`, error);
      throw error;
    }
  },
};

export default bookService;