import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

async function getAll() {
  const response = await axios.get('/api/todoes');
  const {
    data: { data },
  } = response;
  return data;
}

async function addTodo(todoText, parentId, isComplited = false) {
  const response = await axios.post('/api/todoes', {
    todoText: todoText,
    isComplited,
    parentId,
  });
  const {
    data: { data },
  } = response;

  return data;
}

async function deleteTodo(id) {
  await axios.delete(`/api/todoes/${id}`);
}

async function deleteTodoChild(id) {
  await axios.delete(`/api/todoes/child/${id}`);
}

async function updateTodo(id, todoText) {
  await axios.patch(`/api/todoes/${id}`, {
    todoText,
  });
}

async function toogleComplited(id, isComplited) {
  await axios.patch(`/api/todoes/complited/${id}`, {
    isComplited,
  });
}

export const axiosApiTodoes = {
  getAll,
  addTodo,
  deleteTodo,
  updateTodo,
  toogleComplited,
  deleteTodoChild,
};
