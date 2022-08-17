import Form from './Form';

import Container from './Container';

import ContainerWrapper from './ContainerWrapper';

import TodoList from './TodoList';

import { useState } from 'react';

import { nanoid } from 'nanoid';

import Modal from './Modal';

import TodoEditor from './TodoEditor';

import SubTodoForm from './SubTodoForm';

const App = () => {
  const [todoes, setTodoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idTodo, setIdTodo] = useState('');
  const [showSubForm, setShowSubForm] = useState(false);

  const formSubmitHandler = data => {
    const todo = {
      id: nanoid(),
      isComplited: false,
      subNote: [],
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

  const toggleForm = () => {
    setShowSubForm(prevState => !prevState);
  };

  const editTodo = id => {
    toggleModal();
    setIdTodo(id);
  };

  const addSubTodo = id => {
    toggleForm();
    setIdTodo(id);
  };

  const handleRecursiveSubNoteSubmit = (sNote, id, todoText) => {
    const subNote = sNote;
    subNote.forEach((note, index) => {
      if (note.id === id) {
        subNote[index].subNote.push({
          id: nanoid(),
          todoText: todoText,
          subNote: [],
          isComplited: false,
        });
      } else {
        if (note.subNote.length > 0) {
          handleRecursiveSubNoteSubmit(note.subNote, id, todoText);
        }
      }
    });
    return subNote;
  };

  const SubformSubmitHandler = ({ todoText, id }) => {
    const templTodoState = todoes;

    templTodoState.forEach((note, index) => {
      if (note.id === id) {
        templTodoState[index].subNote.push({
          id: nanoid(),
          todoText: todoText,
          subNote: [],
          isComplited: false,
        });
      } else {
        if (note.subNote.length > 0) {
          const subNote = handleRecursiveSubNoteSubmit(
            note.subNote,
            id,
            todoText
          );
          templTodoState[index].subNote = subNote;
        }
      }
    });

    toggleForm();
  };

  const modalHandleSubmit = message => {
    setTodoes(
      todoes.map(todo => {
        if (todo.id === idTodo) {
          todo.todoText = message;
          todo.isComplited = false;
        }
        return todo;
      })
    );
    setIdTodo('');
    toggleModal();
  };

  return (
    <Container>
      <ContainerWrapper>
        <Form onSubmit={formSubmitHandler} />
        {todoes.length > 0 && (
          <TodoList
            id={idTodo}
            toggleTodoComplited={toggleTodoComplited}
            removeTodo={removeTodo}
            todoes={todoes}
            editTodo={editTodo}
            addSubTodo={addSubTodo}
          />
        )}

        {showSubForm && (
          <SubTodoForm id={idTodo} onSubmit={SubformSubmitHandler} />
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <TodoEditor onSubmit={modalHandleSubmit} />
          </Modal>
        )}
      </ContainerWrapper>
    </Container>
  );
};

export { App };
