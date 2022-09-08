import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

const getAll = createAsyncThunk('getAll', async credentials => {
  try {
    const { data } = await axios.get('/users/signup');
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export const authOperations = {
  getAll,
};
