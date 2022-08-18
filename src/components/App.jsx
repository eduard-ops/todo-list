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
  const [idTodo, setIdTodo] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

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

  // const removeTodo = id => {
  //   setTodoes(todoes.filter(todo => todo.id !== id));
  // };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const toggleAddModal = () => {
    setShowAddModal(prevState => !prevState);
  };

  const editTodo = id => {
    toggleModal();
    setIdTodo(id);
  };

  const addSubTodo = id => {
    setIdTodo(id);
    toggleAddModal();
  };

  const handleRecursiveSubNoteDelete = (sNote, id) => {
    const subNote = sNote;

    subNote.forEach((note, index) => {
      if (note.id === id) {
        subNote.splice(index, 1);
      } else {
        if (note.subNote.length > 0) {
          handleRecursiveSubNoteDelete(note.subNote, id);
        }
      }
    });
    return subNote;
  };

  const deleteNote = id => {
    console.log(id);
    const tempNotesState = todoes;
    tempNotesState.forEach((note, index) => {
      if (note.id === id) {
        tempNotesState.splice(index, 1);
        console.log(tempNotesState);
        setTodoes(tempNotesState);
      } else {
        if (note.subNote.length > 0) {
          const subNote = handleRecursiveSubNoteDelete(note.subNote, id);
          tempNotesState[index].subNote = subNote;
        }
      }
    });
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
    toggleAddModal();
  };

  const modalHandleSubmit = ({ todoText }) => {
    setTodoes(
      todoes.map(todo => {
        if (todo.id === idTodo) {
          todo.todoText = todoText;
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
            idTodo={idTodo}
            toggleTodoComplited={toggleTodoComplited}
            removeTodo={deleteNote}
            todoes={todoes}
            editTodo={editTodo}
            addSubTodo={addSubTodo}
          />
        )}
        {showAddModal && (
          <Modal onClose={toggleAddModal}>
            <TodoEditor
              btnText={'Add SubTodo'}
              id={idTodo}
              onSubmit={SubformSubmitHandler}
            />
          </Modal>
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <TodoEditor btnText={'Save'} onSubmit={modalHandleSubmit} />
          </Modal>
        )}
      </ContainerWrapper>
    </Container>
  );
};

export { App };
