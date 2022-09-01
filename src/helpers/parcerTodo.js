export const parcerTodo = (items = [], parentId = null) => {
  const newArr = items
    .filter(item => item['parentid'] === parentId)
    .map(item => ({ ...item, subnotes: parcerTodo(items, item.id) }));
  return newArr;
};

export const handleRecursiveSubNoteSubmit = (sNote, todoText, res) => {
  sNote.forEach((note, index) => {
    console.log(note.id, res.parentid);
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
