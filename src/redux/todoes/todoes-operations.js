import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000';

const getAll = createAsyncThunk('getAll', async _ => {
  try {
    const { data } = await axios.get('/api/todoes');
    return data;
  } catch (error) {
    console.log(error);
  }
});

const addTodo = createAsyncThunk('addTodo', async credentials => {
  try {
    const { idTodo, todotext } = credentials;
    const { data } = await axios.post('/api/todoes', {
      parentId: idTodo,
      todoText: todotext,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

const deleteTodo = createAsyncThunk('deleteTodo', async id => {
  try {
    const { data } = await axios.delete(`/api/todoes/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const deleteChildTodo = createAsyncThunk('deleteChildTodo', async id => {
  try {
    const { data } = await axios.delete(`/api/todoes/child/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const updateTodo = createAsyncThunk('changeComplited', async credentials => {
  try {
    const { idTodo, todotext } = credentials;
    const { data } = await axios.patch(`/api/todoes/${idTodo}`, {
      todoText: todotext,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

const changeComplited = createAsyncThunk(
  'changeComplited',
  async credentials => {
    try {
      const { id, iscomplited } = credentials;
      const { data } = await axios.patch(`/api/todoes/complited/${id}`, {
        isComplited: iscomplited,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const moveUpTodo = createAsyncThunk('moveUpTodo', async id => {
  try {
    const { data } = await axios.patch(`/api/todoes/up/${id}`);
    console.log(data);
    // return data;
  } catch (error) {
    console.log(error);
  }
});

export const authOperations = {
  getAll,
  addTodo,
  deleteTodo,
  changeComplited,
  updateTodo,
  deleteChildTodo,
  moveUpTodo,
};
