import s from './TodoEditor.module.css';

import { useState } from 'react';

export default function TodoEditor({ id, onSubmit, btnText }) {
  const [todoText, setMessage] = useState('');

  const handleChange = e => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ todoText, id });

    setMessage('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <textarea
        className={s.textarea}
        value={todoText}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Todo may contain only letters, apostrophe, dash and spaces. For example: Go to gym at nine o'clock"
      ></textarea>
      <button type="submit" className={s.btn}>
        {btnText}
      </button>
    </form>
  );
}
