import { createSlice } from '@reduxjs/toolkit';

import { authOperations } from './todoes-operations';

const todoesSlice = createSlice({
  name: 'todoes',
  initialState: [],
  extraReducers: {
    [authOperations.addTodo.fulfilled](state, { payload }) {},

    [authOperations.getAll.fulfilled](state, { payload }) {
      console.log(payload);
    },
  },
});

export default todoesSlice;
