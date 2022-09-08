import Form from './Form';

import Container from './Container';

import ContainerWrapper from './ContainerWrapper';

import TodoList from './TodoList';

import { helpers } from '../helpers/helpers';

// import { useSelector } from 'react-redux';

// import todoSelectors from 'redux/todoes/todoes-selectors';

import { useState } from 'react';

import { axiosApiTodoes } from '../services/axiosTodoApi';

import Modal from './Modal';

import TodoEditor from './TodoEditor';

const App = () => {
  const [todoes, setTodoes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idTodo, setIdTodo] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // const dd = useSelector(state => console.log(state));

  const toggleEditModal = () => {
    setShowEditModal(prevState => !prevState);
  };

  const toggleAddModal = () => {
    setShowAddModal(prevState => !prevState);
  };

  const editTodo = id => {
    toggleEditModal();
    setIdTodo(id);
  };

  const addSubTodo = id => {
    setIdTodo(id);
    toggleAddModal();
  };

  const formSubmitHandler = async todoText => {
    // const res = await axiosApiTodoes.addTodo(todoText);
    //   setTodoes(prevState => [...prevState, res]);
    // };
  };
  const deleteNote = async todoId => {
    await axiosApiTodoes.deleteTodo(todoId);
    // setTodoes(todoes.filter(item => item.id !== todoId));
  };

  const handleSubNoteSubmit = async todoText => {
    await axiosApiTodoes.addTodo(todoText, idTodo);
    toggleAddModal();
  };

  const toggleTodoComplited = async (id, iscomplited) => {
    await axiosApiTodoes.toogleComplited(id, iscomplited);
  };

  const modalEditHandleSubmit = async todotext => {
    await axiosApiTodoes.updateTodo(idTodo, todotext);

    toggleEditModal();
  };

  const deleteChildsButton = async id => {
    await axiosApiTodoes.deleteTodoChild(id);
    const stateTemp = [...todoes];
    stateTemp.forEach(note => {
      if (note.id === id) {
        note.subnotes.splice(0, note.subnotes.length);
        setTodoes(stateTemp);
      } else {
        if (note.subnotes.length > 0) {
          helpers.handleRecursiveSubNoteChildDelete(note.subnotes, id);
          setTodoes(stateTemp);
        }
      }
    });
  };

  const moveUpTodo = id => {
    const stateTemp = [...todoes];
    stateTemp.forEach(note => {
      if (note.id === id) {
        helpers.moveTodo(stateTemp, id, '-');
        setTodoes(stateTemp);
      } else {
        if (note.subnotes.length > 0) {
          helpers.handleRecursiveSubNoteChildMoveUp(note.subnotes, id);
          setTodoes(stateTemp);
        }
      }
    });
  };

  const moveDownTodo = id => {
    const stateTemp = [...todoes];
    // eslint-disable-next-line array-callback-return
    stateTemp.find(note => {
      if (note.id === id) {
        helpers.moveTodo(stateTemp, id, '+');
        setTodoes(stateTemp);
        return true;
      } else {
        if (note.subnotes.length > 0) {
          helpers.handleRecursiveSubNoteChildMoveDown(note.subnotes, id);
          setTodoes(stateTemp);
        }
      }
    });
  };

  return (
    <Container>
      <ContainerWrapper>
        <Form onSubmit={formSubmitHandler} />
        {todoes.length > 0 && (
          <TodoList
            toggleTodoComplited={toggleTodoComplited}
            removeChildTodo={deleteChildsButton}
            removeTodo={deleteNote} //
            todoes={todoes}
            editTodo={editTodo}
            addSubTodo={addSubTodo}
            moveUpTodo={moveUpTodo}
            moveDownTodo={moveDownTodo}
          />
        )}
        {showAddModal && (
          <Modal onClose={toggleAddModal}>
            <TodoEditor
              btnText={'Add SubTodo'}
              id={idTodo}
              onSubmit={handleSubNoteSubmit}
            />
          </Modal>
        )}
        {showEditModal && (
          <Modal onClose={toggleEditModal}>
            <TodoEditor btnText={'Save'} onSubmit={modalEditHandleSubmit} />
          </Modal>
        )}
      </ContainerWrapper>
    </Container>
  );
};

export { App };
