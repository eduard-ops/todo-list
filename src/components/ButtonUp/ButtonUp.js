import s from './ButtonUp.module.css';

import { ReactComponent as IconUp } from '../../images/up-icon.svg';

export default function ButtonUp({ moveUpTodo, id }) {
  return (
    <button
      title="move up"
      className={s.btn}
      type="button"
      onClick={() => moveUpTodo(id)}
    >
      <IconUp className={s.icon} />
    </button>
  );
}
