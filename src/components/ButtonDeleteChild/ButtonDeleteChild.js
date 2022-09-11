import { ReactComponent as IconDelete } from '../../images/remove.svg';

import s from './ButtonDeleteChild.module.css';

import { useDispatch } from 'react-redux';

import { authOperations } from 'redux/todoes/todoes-operations';

export default function ButtonDeleteChild({ id, removeChildTodo }) {
  const dispatch = useDispatch();
  return (
    <button
      title="delete child todo"
      className={s.btn}
      type="button"
      onClick={() => dispatch(authOperations.deleteChildTodo(id))}
    >
      <IconDelete className={s.icon} />
    </button>
  );
}
