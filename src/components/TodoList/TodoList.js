import s from './TodoList.module.css';

import ButtonDelete from 'components/ButtonDelete';

import ButtonEdit from 'components/ButtonEdit';

import Checkbox from 'components/Checkbox';

export default function TodoList({
  todoes,
  toggleTodoComplited,
  removeTodo,
  editTodo,
}) {
  return (
    <ul className={s.list}>
      {todoes.map(({ id, todoText, isComplited }) => (
        <li className={s.item} key={id}>
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
            <ButtonEdit id={id} editTodo={editTodo} />
          </div>
        </li>
      ))}
    </ul>
  );
}
