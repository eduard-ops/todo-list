import { configureStore } from '@reduxjs/toolkit';

import todoesSlice from './todoes/todoesSlice';

export const store = configureStore({
  reducer: {
    todoes: todoesSlice.reducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware(todoesSlice.middleware),
});
