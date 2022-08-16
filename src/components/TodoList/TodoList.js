import AddTodoButton from 'components/AddTodoButton';

import s from './TodoList.module.css';

export default function TodoList({ todoes }) {
  return (
    <ul className={s.list}>
      {todoes.map(({ id, todoText }) => (
        <li className={s.item} key={id}>
          <AddTodoButton />
          {todoText}
        </li>
      ))}
    </ul>
  );
}
