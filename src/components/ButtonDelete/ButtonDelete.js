import { ReactComponent as IconDelete } from '../../images/delete.svg';

import s from './ButtonDelete.module.css';

import { useDispatch } from 'react-redux';

import { authOperations } from 'redux/todoes/todoes-operations';

export default function ButtonDelete({ id }) {
  const dispatch = useDispatch();
  return (
    <button
      title="delete todo"
      className={s.btn}
      type="button"
      onClick={() => dispatch(authOperations.deleteTodo(id))}
    >
      <IconDelete className={s.icon} />
    </button>
  );
}
