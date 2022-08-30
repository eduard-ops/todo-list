import s from './Form.module.css';

import { useState } from 'react';

// import PropTypes from 'prop-types';

export default function Form({ onSubmit }) {
  const [todoText, setTodoText] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setTodoText(value);
  };

  const handleSubmut = e => {
    e.preventDefault();
    onSubmit(todoText);
    setTodoText('');
  };

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmut} className={s.form}>
        <input
          placeholder="Your todo"
          className={s.input}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Todo may contain only letters, apostrophe, dash and spaces. For example: Go to gym at nine o'clock"
          required
          autoComplete="off"
          value={todoText}
          onChange={handleChange}
        />
        <button className={s.button} type="submit">
          {' '}
          Add Todo
        </button>
      </form>
    </div>
  );
}

// Form.propTypes = {
//     verificateContact: PropTypes.func.isRequired,
//     onSubmit: PropTypes.func.isRequired,
//   };
