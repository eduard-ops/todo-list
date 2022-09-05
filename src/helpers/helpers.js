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
  return sNote;
};

export const helpers = {
  parcerTodo,
  handleRecursiveSubNoteSubmit,
  handleRecursiveSubNoteDelete,
  handleRecursiveSubNoteEdit,
};
