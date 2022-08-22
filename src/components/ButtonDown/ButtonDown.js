import { ReactComponent as IconDown } from '../../images/down-icon.svg';

import s from './ButtonDown.module.css';

export default function ButtonDown({ id, moveDownTodo }) {
  return (
    <button
      title="move down"
      className={s.btn}
      type="button"
      onClick={() => moveDownTodo(id)}
    >
      <IconDown className={s.icon} />
    </button>
  );
}
