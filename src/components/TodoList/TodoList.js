import s from './TodoList.module.css';

import { Fragment } from 'react';

import ButtonDelete from 'components/ButtonDelete';

import ButtonEdit from 'components/ButtonEdit';

import Checkbox from 'components/Checkbox';

import AddTodoButton from 'components/AddTodoButton';

import ButtonDeleteChild from 'components/ButtonDeleteChild';

import ButtonDown from 'components/ButtonDown';

import ButtonUp from 'components/ButtonUp';

export default function TodoList({ todoes, editTodo, addSubTodo }) {
  return (
    <ul className={s.list}>
      {todoes.map(({ id, todotext, iscomplited, subnotes }, index) => (
        <Fragment key={id}>
          <li className={s.item}>
            <Checkbox iscomplited={iscomplited} id={id} />
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
              <ButtonDelete id={id} />
              <ButtonEdit todoText={todotext} id={id} editTodo={editTodo} />

              <AddTodoButton addSubTodo={addSubTodo} id={id} />

              {subnotes.length > 0 && <ButtonDeleteChild id={id} />}
              {index !== 0 && <ButtonUp id={id} />}
              {todoes.length > 0 && todoes[index + 1] && <ButtonDown id={id} />}
            </div>
          </li>

          {subnotes && subnotes.length > 0 && (
            <TodoList
              todoes={subnotes}
              addSubTodo={addSubTodo}
              editTodo={editTodo}
            />
          )}
        </Fragment>
      ))}
    </ul>
  );
}
