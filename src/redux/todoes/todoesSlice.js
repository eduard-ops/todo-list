import { createSlice } from '@reduxjs/toolkit';

import { authOperations } from './todoes-operations';

const initialState = {
  todoes: [],
};

const todoesSlice = createSlice({
  name: 'todoes',
  initialState,
  extraReducers: {
    [authOperations.getAll.fulfilled](state, { payload }) {
      state.todoes = payload.data;
    },
    [authOperations.addTodo.fulfilled](state, { payload }) {
      state.todoes = payload.data;
    },
    [authOperations.deleteTodo.fulfilled](state, { payload }) {
      state.todoes = payload.data;
    },
    [authOperations.changeComplited.fulfilled](state, { payload }) {
      console.log(payload.data);
      state.todoes = payload.data;
    },
  },
});

export default todoesSlice;
