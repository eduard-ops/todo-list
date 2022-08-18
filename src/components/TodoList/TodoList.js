import s from './TodoList.module.css';

import ButtonDelete from 'components/ButtonDelete';

import ButtonEdit from 'components/ButtonEdit';

import Checkbox from 'components/Checkbox';

import AddTodoButton from 'components/AddTodoButton';

import { Fragment } from 'react';

export default function TodoList({
  todoes,
  toggleTodoComplited,
  removeTodo,
  editTodo,
  addSubTodo,
}) {
  return (
    <ul className={s.list}>
      {todoes.map(({ id, todoText, isComplited, subNote }) => (
        <Fragment key={id}>
          <li className={s.item}>
            <Checkbox
              isComplited={isComplited}
              id={id}
              toggleTodoComplited={toggleTodoComplited}
            />
            <span
              style={
                isComplited
                  ? { textDecoration: 'line-through rgb(216, 82, 82)' }
                  : { textDecoration: 'none' }
              }
            >
              {todoText}
            </span>
            <div>
              <ButtonDelete id={id} removeTodo={removeTodo} />
              <ButtonEdit todoText={todoText} id={id} editTodo={editTodo} />
              <AddTodoButton addSubTodo={addSubTodo} id={id} />
            </div>
          </li>

          {subNote && subNote.length > 0 && (
            <TodoList
              removeTodo={removeTodo}
              todoes={subNote}
              addSubTodo={addSubTodo}
            />
          )}
        </Fragment>
      ))}
    </ul>
  );
}

//  {
//    [].length > 0 && <TodoList addSubTodo={addSubTodo} todoes={subNote} />;
//  }
