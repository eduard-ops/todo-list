import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000';

const getAll = createAsyncThunk('/api/todoes', async credentials => {
  try {
    const { data } = await axios.get('/api/todoes');
    return data;
  } catch (error) {
    console.log(error);
  }
});

const addTodo = createAsyncThunk('/api/todoes', async credentials => {
  try {
    const { data } = await axios.post('/api/todoes', credentials);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

// const deleteTodo = createAsyncThunk('/api/todoes', async id => {
//   try {
//     const data = await axios.delete(`/api/todoes/${id}`);
//   } catch (error) {}
// });

export const authOperations = {
  getAll,
  addTodo,
};
