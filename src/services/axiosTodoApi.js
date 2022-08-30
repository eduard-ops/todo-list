import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export async function axiosTodoApi() {
  const response = await axios.get('/api/todoes');
  const {
    data: { data },
  } = response;
  return data;
}

export async function axiosPostTodo(todoText, isComplited = false, parentId) {
  const response = await axios.post('/api/todoes', {
    todoText: todoText,
    isComplited,
    parentId,
  });
  const {
    data: { data },
  } = response;

  console.log(data);
  return data;
}

export async function axiosDeleteTodo(id) {
  const response = await axios.delete(`/api/todoes/${id}`);
  return response;
}

export async function axiosUpdateTodo(id, todoText) {
  const response = await axios.put(`/api/todoes/${id}`, {
    todoText,
  });
  return response;
}
