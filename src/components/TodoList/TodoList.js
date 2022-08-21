import s from './TodoList.module.css';

import { Fragment } from 'react';

import ButtonDelete from 'components/ButtonDelete';

import ButtonEdit from 'components/ButtonEdit';

import Checkbox from 'components/Checkbox';

import AddTodoButton from 'components/AddTodoButton';

import ButtonDeleteChild from 'components/ButtonDeleteChild';

import ButtonDown from 'components/ButtonDown';

import ButtonUp from 'components/ButtonUp';

export default function TodoList({
  todoes,
  toggleTodoComplited,
  removeTodo,
  editTodo,
  addSubTodo,
  removeChildTodo,
}) {
  return (
    <ul className={s.list}>
      {todoes.map(({ id, todoText, isComplited, subNote }, index) => (
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
                  ? { textDecoration: 'line-through 2px rgb(216, 82, 82)' }
                  : { textDecoration: 'none' }
              }
            >
              {todoText}
            </span>
            <div className={s.wrap}>
              <ButtonDelete id={id} removeTodo={removeTodo} />
              <ButtonEdit todoText={todoText} id={id} editTodo={editTodo} />
              {subNote.length === 0 && (
                <AddTodoButton addSubTodo={addSubTodo} id={id} />
              )}
              {subNote.length > 0 && (
                <ButtonDeleteChild id={id} removeChildTodo={removeChildTodo} />
              )}
              {/* {console.log(index !== 0 )} */}
              <ButtonUp />
            </div>
          </li>

          {subNote && subNote.length > 0 && (
            <TodoList
              removeTodo={removeTodo}
              todoes={subNote}
              addSubTodo={addSubTodo}
              toggleTodoComplited={toggleTodoComplited}
              editTodo={editTodo}
              removeChildTodo={removeChildTodo}
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
