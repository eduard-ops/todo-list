import s from './ButtonUp.module.css';

import { ReactComponent as IconUp } from '../../images/up-icon.svg';

import { useDispatch } from 'react-redux';

import { authOperations } from 'redux/todoes/todoes-operations';

export default function ButtonUp({ moveUpTodo, id }) {
  const dispatch = useDispatch();

  return (
    <button
      title="up"
      className={s.btn}
      type="button"
      onClick={() => dispatch(authOperations.moveUpTodo(id))}
    >
      <IconUp className={s.icon} />
    </button>
  );
}
