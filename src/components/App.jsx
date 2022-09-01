import Form from './Form';

import Container from './Container';

import ContainerWrapper from './ContainerWrapper';

import TodoList from './TodoList';

import {
  parcerTodo,
  handleRecursiveSubNoteSubmit,
} from '../helpers/parcerTodo';

import { useState, useEffect } from 'react';

import {
  axiosTodoApi,
  axiosPostTodo,
  axiosDeleteTodo,
  axiosUpdateTodo,
} from '../services/axiosTodoApi';

import Modal from './Modal';

import TodoEditor from './TodoEditor';

const App = () => {
  const [todoes, setTodoes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idTodo, setIdTodo] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    axiosTodoApi().then(items => {
      return setTodoes(parcerTodo(items));
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
    const res = await axiosPostTodo(todoText);
    res.subnotes = [];
    setTodoes(prevState => [res, ...prevState]);
  };

  const toggleTodoComplited = async id => {
    // await axiosChangeComplited();
  };

  // const toggleTodoComplited = id => {
  //   const tempStateTodo = [...todoes];
  //   tempStateTodo.forEach((note, index) => {
  //     if (note.id === id) {
  //       tempStateTodo[index] = { ...note, isComplited: !note.isComplited };
  //       setTodoes(tempStateTodo);
  //     } else {
  //       if (note.subNote.length > 0) {
  //         handleRecursiveSubNoteComplited(note.subNote, id);

  //         setTodoes(tempStateTodo);
  //       }
  //     }
  //   });
  // };

  // const handleRecursiveSubNoteComplited = (sNote, id) => {
  //   const subNote = sNote;
  //   subNote.forEach((note, index) => {
  //     if (note.id === id) {
  //       subNote[index] = { ...note, isComplited: !note.isComplited };
  //     } else {
  //       if (note.subNote.length > 0) {
  //         handleRecursiveSubNoteComplited(note.subNote, id);
  //       }
  //     }
  //   });
  // };

  // const handleRecursiveSubNoteDelete = (sNote, id) => {
  //   const subNote = sNote;

  //   subNote.forEach((note, index) => {
  //     if (note.id === id) {
  //       subNote.splice(index, 1);
  //     } else {
  //       if (note.subNote.length > 0) {
  //         handleRecursiveSubNoteDelete(note.subNote, id);
  //       }
  //     }
  //   });
  //   return subNote;
  // };

  const deleteNote = async id => {
    await axiosDeleteTodo(id);
    setTodoes(todoes.filter(item => item.id !== id));
  };

  // const deleteNote = id => {
  //   const tempNotesState = [...todoes];
  //   tempNotesState.forEach((note, index) => {
  //     if (note.id === id) {
  //       tempNotesState.splice(index, 1);
  //       setTodoes(tempNotesState);
  //     } else {
  //       if (note.subNote.length > 0) {
  //         const subNote = handleRecursiveSubNoteDelete(note.subNote, id);
  //         tempNotesState[index].subNote = subNote;
  //         setTodoes(tempNotesState);
  //       }
  //     }
  //   });
  // };
  const handleSubNoteSubmit = async todoText => {
    const res = await axiosPostTodo(todoText, idTodo);
    res.subnotes = [];
    // eslint-disable-next-line array-callback-return
    todoes.map(item => {
      if (item.id === res.parentid) {
        item.subnotes.push(res);
        setTodoes(todoes);
      } else {
        if (item.subnotes.length > 0) {
          handleRecursiveSubNoteSubmit(item.subnotes, todoText, res);
          setTodoes(todoes);
        }
      }
    });

    toggleAddModal();
  };

  // const SubformSubmitHandler = ({ todoText, id }) => {
  //   const templTodoState = [...todoes];

  //   templTodoState.forEach((note, index) => {
  //     if (note.id === id) {
  //       templTodoState[index].subNote.push({
  //         id: nanoid(),
  //         todoText: todoText,
  //         subNote: [],
  //         isComplited: false,
  //       });
  //       setTodoes(templTodoState);
  //     } else {
  //       if (note.subNote.length > 0) {
  //         const subNote = handleRecursiveSubNoteSubmit(
  //           note.subNote,
  //           id,
  //           todoText
  //         );
  //         templTodoState[index].subNote = subNote;
  //         setTodoes(templTodoState);
  //       }
  //     }
  //   });
  //   toggleAddModal();
  // };

  const modalEditHandleSubmit = async todoText => {
    await axiosUpdateTodo(idTodo, todoText);
    window.location = '/';
    toggleEditModal();
  };

  // const modalEditHandleSubmit = ({ todoText }) => {
  //   const templTodoState = [...todoes];
  //   templTodoState.forEach((note, index) => {
  //     if (note.id === idTodo) {
  //       templTodoState[index] = { ...note, isComplited: false, todoText };
  //       setTodoes(templTodoState);
  //     } else {
  //       if (note.subNote.length > 0) {
  //         handleRecursiveSubNoteEdit(note.subNote, idTodo, todoText);
  //         setTodoes(templTodoState);
  //       }
  //     }
  //   });
  //   toggleEditModal();
  // };

  // const handleRecursiveSubNoteEdit = (sNote, id, todoText) => {
  //   const subNote = sNote;
  //   subNote.forEach((note, index) => {
  //     if (note.id === id) {
  //       subNote[index] = { ...note, isComplited: false, todoText };
  //     } else {
  //       if (note.subNote.length > 0) {
  //         handleRecursiveSubNoteEdit(note.subNote, idTodo, todoText);
  //       }
  //     }
  //   });
  // };

  // const handleRecursiveSubNoteChildDelete = (sNote, id) => {
  //   const subNote = sNote;
  //   subNote.forEach((note, index) => {
  //     if (note.id === id) {
  //       note.subNote.splice(index, 1);
  //     } else {
  //       if (note.subNote.length > 0) {
  //         handleRecursiveSubNoteChildDelete(note.subNote, id);
  //       }
  //     }
  //   });
  // };

  // const deleteChildsButton = id => {
  //   const stateTemp = [...todoes];
  //   stateTemp.forEach(note => {
  //     if (note.id === id) {
  //       note.subNote.splice(0, 1);

  //       setTodoes(stateTemp);
  //     } else {
  //       if (note.subNote.length > 0) {
  //         handleRecursiveSubNoteChildDelete(note.subNote, id);
  //         setTodoes(stateTemp);
  //       }
  //     }
  //   });
  // };

  //  const handleRecursiveSubNoteChildMoveUp = (sNote, id) => {
  //    const subNote = sNote;
  //    subNote.forEach((note, index) => {
  //      if (note.id === id) {
  //        const el = subNote.splice(index, 1);
  //        subNote.splice(index - 1, 0, ...el);
  //      } else {
  //        if (note.subNote.length > 0) {
  //          handleRecursiveSubNoteChildMoveUp(note.subNote, id);
  //        }
  //      }
  //    });
  //  };

  //  const moveUpTodo = id => {
  //    const stateTemp = [...todoes];

  //    stateTemp.forEach((note, index) => {
  //      if (note.id === id) {
  //        const el = stateTemp.splice(index, 1);
  //        console.log(el);
  //        stateTemp.splice(index - 1, 0, ...el);
  //        setTodoes(stateTemp);
  //      } else {
  //        if (note.subNote.length > 0) {
  //          handleRecursiveSubNoteChildMoveUp(note.subNote, id);
  //          setTodoes(stateTemp);
  //        }
  //      }
  //    });
  //  };

  //  const handleRecursiveSubNoteChildMoveDown = (sNote, id) => {
  //    const subNote = sNote;
  //    subNote.forEach((note, index) => {
  //      if (note.id === id) {
  //        const el = subNote.splice(index, 1);
  //        subNote.splice(index + 1, 0, ...el);
  //      } else {
  //        if (note.subNote.length > 0) {
  //          handleRecursiveSubNoteChildMoveDown(note.subNote, id);
  //        }
  //      }
  //    });
  //  };

  //  const moveDownTodo = id => {
  //    const stateTemp = [...todoes];
  //    stateTemp.forEach((note, index) => {
  //      if (note.id === id) {
  //        const el = stateTemp.splice(index, 1);
  //        stateTemp.splice(index + 1, 0, ...el);
  //        setTodoes(stateTemp);
  //      } else {
  //        if (note.subNote.length > 0) {
  //          handleRecursiveSubNoteChildMoveDown(note.subNote, id);
  //          setTodoes(stateTemp);
  //        }
  //      }
  //    });
  //  };

  return (
    <Container>
      <ContainerWrapper>
        <Form onSubmit={formSubmitHandler} />
        {todoes.length > 0 && (
          <TodoList
            toggleTodoComplited={toggleTodoComplited} //toggleTodoComplited
            removeChildTodo={{}} //deleteChildsButton
            removeTodo={deleteNote} //
            todoes={todoes}
            editTodo={editTodo}
            addSubTodo={addSubTodo}
            moveUpTodo={{}} // moveUpTodo
            moveDownTodo={{}} // moveDownTodo
            isComplited={{}}
          />
        )}
        {showAddModal && (
          <Modal onClose={toggleAddModal}>
            <TodoEditor
              btnText={'Add SubTodo'}
              id={idTodo}
              onSubmit={handleSubNoteSubmit} //SubformSubmitHandler
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
