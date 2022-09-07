const parcerTodo = (items = [], parentId = null) => {
  const newArr = items
    .filter(item => item['parentid'] === parentId)
    .map(item => ({ ...item, subnotes: parcerTodo(items, item.id) }));
  return newArr;
};

const moveParce = (arr = [], childArr = [], parentId = null) => {
  arr.forEach(parent => {});
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

const handleRecursiveSubNoteChildMoveUp = (sNote, id) => {
  sNote.forEach((note, index) => {
    if (note.id === id) {
      const el = sNote.splice(index, 1);
      sNote.splice(index - 1, 0, ...el);
    } else {
      if (note.subnotes.length > 0) {
        handleRecursiveSubNoteChildMoveUp(note.subnotes, id);
      }
    }
  });
  // return sNote;
};

const moveTodo = (arr, id, operator) => {
  const findIndexTodo = arr.findIndex(item => item.id === id);

  const newArr = [...arr];

  const findTodo = { ...newArr.find(item => item.id === id) };

  const filter = arr.filter(item => item.id !== id);

  filter.splice(findIndexTodo + 1, 0, findTodo);

  arr.splice(0, arr.length);

  arr.push(...filter);

  console.log(arr);

  // console.log(arr);

  //

  // console.log(arr);

  // console.log(arr);

  // const newArr = arr.splice(findIndexTodo + 1, 0, findTodo);
  // console.log(arr);

  // arr.push(newArr);

  // operator === '+'
  //   ? filter.splice(findIndexTodo + 1, 0, findTodo)
  //   : filter.splice(findIndexTodo - 1, 0, findTodo);

  // return filter;
  // console.log(arr, filter);
};

const handleRecursiveSubNoteChildMoveDown = (sNote, id) => {
  sNote.forEach((item, index) => {
    if (item.id === id) {
      moveTodo(sNote, id);
    } else {
      if (item.subnotes.length > 0) {
        sNote = handleRecursiveSubNoteChildMoveDown(item.subnotes, id);
      }
    }
  });

  return sNote;
};

//  const newArr = moveTodo(item.subnotes, id);
//  item.subnotes.splice(0, item.subnotes.length);
//  item.subnotes.push(...newArr);

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
  moveParce,
};
