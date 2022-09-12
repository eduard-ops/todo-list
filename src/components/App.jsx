import Form from './Form';

import Container from './Container';

import ContainerWrapper from './ContainerWrapper';

import TodoList from './TodoList';

import { useDispatch, useSelector } from 'react-redux';

import { authOperations } from 'redux/todoes/todoes-operations';

import todoSelectors from 'redux/todoes/todoes-selectors';

import { useEffect, useState } from 'react';

import Modal from './Modal';

import TodoEditor from './TodoEditor';

const App = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [idTodo, setIdTodo] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const dispatch = useDispatch();

  const todoes = useSelector(todoSelectors.getAllTodoes);

  useEffect(() => {
    dispatch(authOperations.getAll());
  }, [dispatch]);

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

  const handleSubNoteSubmit = async todotext => {
    dispatch(authOperations.addTodo({ idTodo, todotext }));
    toggleAddModal();
  };

  const modalEditHandleSubmit = async todotext => {
    dispatch(authOperations.updateTodo({ idTodo, todotext }));

    toggleEditModal();
  };

  return (
    <Container>
      <ContainerWrapper>
        <Form />
        {todoes.length > 0 && (
          <TodoList
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
