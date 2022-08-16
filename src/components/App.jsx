import Form from './Form';

import Container from './Container';

import ContainerWrapper from './ContainerWrapper';

import TodoList from './TodoList';

import { useState } from 'react';

import { nanoid } from 'nanoid';

import Modal from './Modal';

import TodoEditor from './TodoEditor';

const App = () => {
  const [todoes, setTodoes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const formSubmitHandler = data => {
    const todo = {
      id: nanoid(),
      isComplited: false,
      ...data,
    };
    setTodoes(prevState => [todo, ...prevState]);
  };

  const toggleTodoComplited = id => {
    setTodoes(
      todoes.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isComplited: !todo.isComplited,
        };
      })
    );
  };

  const removeTodo = id => {
    setTodoes(todoes.filter(todo => todo.id !== id));
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const editTodo = () => {
    toggleModal();
  };

  return (
    <Container>
      <ContainerWrapper>
        <Form onSubmit={formSubmitHandler} />

        <TodoList
          toggleTodoComplited={toggleTodoComplited}
          removeTodo={removeTodo}
          todoes={todoes}
          editTodo={editTodo}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <TodoEditor onSubmit={formSubmitHandler} />
          </Modal>
        )}
      </ContainerWrapper>
    </Container>
  );
};

export { App };
