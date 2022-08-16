import Form from './Form';

import Container from './Container';

import ContainerWrapper from './ContainerWrapper';

import TodoList from './TodoList';

import { useState } from 'react';

import { nanoid } from 'nanoid';

export const App = () => {
  const [todoes, setTodoes] = useState([]);

  const formSubmitHandler = data => {
    const todo = {
      id: nanoid(),
      ...data,
    };
    setTodoes(prevState => [todo, ...prevState]);
  };

  return (
    <Container>
      <ContainerWrapper>
        <Form onSubmit={formSubmitHandler} />
        <TodoList todoes={todoes} />
      </ContainerWrapper>
    </Container>
  );
};

// https://github.com/RSLi/recursive-todo
