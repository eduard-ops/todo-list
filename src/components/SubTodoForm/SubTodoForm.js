import s from './SubTodo.module.css';

import { useState } from 'react';

export default function SubTodoForm({ onSubmit, id }) {
  const [todoText, setTodoText] = useState('');

  const onChangeInput = e => {
    const { value } = e.currentTarget;
    setTodoText(value);
  };

  const handleTodoSubmit = e => {
    e.preventDefault();
    onSubmit({ todoText, id });
    setTodoText('');
  };

  return (
    <form className={s.form} onSubmit={handleTodoSubmit}>
      <input
        placeholder="Your SubTodo"
        className={s.input}
        type="text"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Todo may contain only letters, apostrophe, dash and spaces. For example: Go to gym at nine o'clock"
        required
        value={todoText}
        autoComplete="off"
        onChange={onChangeInput}
      />
      <button type="submit" className={s.btn}>
        Add SubTodo
      </button>
    </form>
  );
}
