import axios from '@/lib/axios'

const BooksService = {
  getAll: async ({ page = 1, limit = 10 }) => {
    return await axios.get(`/books?page=${page}&limit=${limit}`)
  },

  getOne: async (id) => {
    return await axios.get(`/books/${id}`)
  },

  create: async (data) => {
    return await axios.post('/books', data)
  },

  update: async (id, data) => {
    return await axios.put(`/books/${id}`, data)
  },

  delete: async (id) => {
    return await axios.delete(`/books/${id}`)
  }

}

export default BooksService
