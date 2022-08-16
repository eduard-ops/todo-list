import s from './TodoEditor.module.css';

import { useState } from 'react';

export default function TodoEditor({ onSubmit }) {
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(message);

    setMessage('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <textarea
        className={s.textarea}
        value={message}
        onChange={handleChange}
      ></textarea>
      <button type="submit" className={s.btn}>
        Save
      </button>
    </form>
  );
}
