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
  moveUpTodo,
  moveDownTodo,
}) {
  return (
    <ul className={s.list}>
      {todoes.map(({ id, todotext, iscomplited, subnotes }, index) => (
        <Fragment key={id}>
          <li className={s.item}>
            <Checkbox
              iscomplited={iscomplited}
              id={id}
              toggleTodoComplited={toggleTodoComplited}
            />
            <span
              style={
                iscomplited
                  ? { textDecoration: 'line-through 2px rgb(216, 82, 82)' }
                  : { textDecoration: 'none' }
              }
            >
              {todotext}
            </span>
            <div className={s.wrap}>
              <ButtonDelete id={id} removeTodo={removeTodo} />
              <ButtonEdit todoText={todotext} id={id} editTodo={editTodo} />
              {subnotes.length === 0 && (
                <AddTodoButton addSubTodo={addSubTodo} id={id} />
              )}
              {subnotes.length > 0 && (
                <ButtonDeleteChild id={id} removeChildTodo={removeChildTodo} />
              )}
              {index !== 0 && <ButtonUp id={id} moveUpTodo={moveUpTodo} />}
              {todoes.length > 0 && todoes[index + 1] && (
                <ButtonDown id={id} moveDownTodo={moveDownTodo} />
              )}
            </div>
          </li>

          {subnotes && subnotes.length > 0 && (
            <TodoList
              removeTodo={removeTodo}
              todoes={subnotes}
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
