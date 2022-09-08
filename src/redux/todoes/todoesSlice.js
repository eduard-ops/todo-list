import { createSlice } from '@reduxjs/toolkit';

import { authOperations } from './todoes-operations';

const initialState = {
  todoes: [],
  showEditModal: false,
  idTodo: '',
  showAddModal: false,
};

const todoesSlice = createSlice({
  name: 'todoes',
  initialState,
  extraReducers: {
    [authOperations.getAll.fulfilled](state, { payload }) {
      state.todoes.push(payload.data);
    },
  },
});

export default todoesSlice;
