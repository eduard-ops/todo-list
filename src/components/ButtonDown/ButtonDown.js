import { ReactComponent as IconDown } from '../../images/down-icon.svg';

import s from './ButtonDown.module.css';

import { useDispatch } from 'react-redux';

import { authOperations } from 'redux/todoes/todoes-operations';

export default function ButtonDown({ id }) {
  const dispatch = useDispatch();
  return (
    <button
      title="down"
      className={s.btn}
      type="button"
      onClick={() => dispatch(authOperations.moveDownTodo(id))}
    >
      <IconDown className={s.icon} />
    </button>
  );
}
