import Form from './Form';

import Container from './Container';

import ContainerWrapper from './ContainerWrapper';

import TodoList from './TodoList';

import { helpers } from '../helpers/helpers';

import { useState, useEffect } from 'react';

import { axiosApiTodoes } from '../services/axiosTodoApi';

import Modal from './Modal';

import TodoEditor from './TodoEditor';

const App = () => {
  const [todoes, setTodoes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idTodo, setIdTodo] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    axiosApiTodoes.getAll().then(items => {
      setTodoes(helpers.parcerTodo(items));
    });
  }, []);

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
    const res = await axiosApiTodoes.addTodo(todoText);
    res.subnotes = [];
    setTodoes(prevState => [...prevState, res]);
  };

  const deleteNote = async todoId => {
    await axiosApiTodoes.deleteTodo(todoId);
    // eslint-disable-next-line array-callback-return
    const tempState = [...todoes];
    tempState.forEach((item, index) => {
      if (item.id === todoId) {
        tempState.splice(index, 1);
        setTodoes(tempState);
      } else {
        if (item.subnotes.length > 0) {
          helpers.handleRecursiveSubNoteDelete(item.subnotes, todoId);
          setTodoes(tempState);
        }
      }
    });
  };

  const handleSubNoteSubmit = async todoText => {
    const res = await axiosApiTodoes.addTodo(todoText, idTodo);
    res.subnotes = [];
    // eslint-disable-next-line array-callback-return
    todoes.map(({ id, subnotes }) => {
      if (id === res.parentid) {
        subnotes.push(res);
        setTodoes(todoes);
      } else {
        if (subnotes.length > 0) {
          helpers.handleRecursiveSubNoteSubmit(subnotes, todoText, res);
          setTodoes(todoes);
        }
      }
    });

    toggleAddModal();
  };

  const toggleTodoComplited = async (id, iscomplited) => {
    await axiosApiTodoes.toogleComplited(id, iscomplited);
    const tempStateTodo = [...todoes];
    tempStateTodo.forEach((note, index) => {
      if (note.id === id) {
        tempStateTodo[index] = { ...note, iscomplited: !note.iscomplited };
        setTodoes(tempStateTodo);
      } else {
        if (note.subnotes.length > 0) {
          helpers.handleRecursiveSubNoteComplited(note.subnotes, id);
          setTodoes(tempStateTodo);
        }
      }
    });
  };

  const modalEditHandleSubmit = async todotext => {
    await axiosApiTodoes.updateTodo(idTodo, todotext);

    // eslint-disable-next-line array-callback-return
    todoes.map((item, index) => {
      if (item.id === idTodo) {
        todoes[index] = { ...item, iscomplited: false, todotext };
        setTodoes(todoes);
      } else {
        if (item.subnotes.length > 0) {
          helpers.handleRecursiveSubNoteEdit(item.subnotes, idTodo, todotext);
          setTodoes(todoes);
        }
      }
    });

    toggleEditModal();
  };

  const deleteChildsButton = async id => {
    await axiosApiTodoes.deleteTodoChild(id);
    const stateTemp = [...todoes];
    stateTemp.forEach((note, index) => {
      console.log(note.subnotes.length);
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
    stateTemp.forEach(note => {
      if (note.id === id) {
        helpers.moveTodo(stateTemp, id, '+');
        console.log(stateTemp);
        setTodoes(stateTemp);
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
