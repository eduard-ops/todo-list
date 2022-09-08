const parcerTodo = (items = [], parentId = null) => {
  const newArr = items
    .filter(item => item['parentid'] === parentId)
    .map(item => ({ ...item, subnotes: parcerTodo(items, item.id) }));
  return newArr;
};

const handleRecursiveSubNoteSubmit = (sNote, todoText, res) => {
  sNote.forEach((note, index) => {
    if (note.id === res.parentid) {
      sNote[index].subnotes.push(res);
    } else {
      if (note.subnotes.length > 0) {
        handleRecursiveSubNoteSubmit(note.subnotes, todoText, res);
      }
    }
    return sNote;
  });
};

const handleRecursiveSubNoteDelete = (sNote, id) => {
  sNote.forEach((note, index) => {
    if (note.id === id) {
      sNote.splice(index, 1);
    } else {
      if (note.subnotes.length > 0) {
        handleRecursiveSubNoteDelete(note.subnotes, id);
      }
    }
  });
  return sNote;
};

const handleRecursiveSubNoteEdit = (sNote, id, todotext) => {
  sNote.forEach((note, index) => {
    if (note.id === id) {
      sNote[index] = { ...note, iscomplited: false, todotext };
    } else {
      if (note.subnotes.length > 0) {
        handleRecursiveSubNoteEdit(note.subnotes, id, todotext);
      }
    }
  });
};

const handleRecursiveSubNoteComplited = (sNote, id) => {
  sNote.forEach((note, index) => {
    if (note.id === id) {
      return (sNote[index] = { ...note, iscomplited: !note.iscomplited });
    } else {
      if (note.subnotes.length > 0) {
        return handleRecursiveSubNoteComplited(note.subnotes, id);
      }
    }
  });
};

const moveTodo = (arr, id, operator) => {
  const findIndexTodo = arr.findIndex(item => item.id === id);

  const findTodo = arr.find(item => item.id === id);

  const filter = arr.filter(item => item.id !== id);

  operator === '+'
    ? filter.splice(findIndexTodo + 1, 0, findTodo)
    : filter.splice(findIndexTodo - 1, 0, findTodo);

  arr.splice(0, arr.length);

  arr.push(...filter);
};

const handleRecursiveSubNoteChildMoveUp = (sNote, id) => {
  sNote.forEach((note, index) => {
    if (note.id === id) {
      moveTodo(sNote, id, '-');
    } else {
      if (note.subnotes.length > 0) {
        handleRecursiveSubNoteChildMoveUp(note.subnotes, id);
      }
    }
  });
};

const handleRecursiveSubNoteChildMoveDown = (sNote, id) => {
  // eslint-disable-next-line array-callback-return
  sNote.find((item, index, arr) => {
    if (item.id === id) {
      moveTodo(sNote, id, '+');
      return true;
    } else {
      if (item.subnotes.length > 0) {
        handleRecursiveSubNoteChildMoveDown(item.subnotes, id);
      }
    }
  });
};

const handleRecursiveSubNoteChildDelete = (sNote, id) => {
  sNote.forEach((note, index) => {
    if (note.id === id) {
      note.subnotes.splice(0, note.subnotes.length);
    } else {
      if (note.subnotes.length > 0) {
        handleRecursiveSubNoteChildDelete(note.subnotes, id);
      }
    }
  });
};

export const helpers = {
  moveTodo,
  parcerTodo,
  handleRecursiveSubNoteSubmit,
  handleRecursiveSubNoteDelete,
  handleRecursiveSubNoteEdit,
  handleRecursiveSubNoteComplited,
  handleRecursiveSubNoteChildMoveUp,
  handleRecursiveSubNoteChildMoveDown,
  handleRecursiveSubNoteChildDelete,
};
