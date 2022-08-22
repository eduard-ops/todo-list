import { ReactComponent as IconDelete } from '../../images/remove.svg';

import s from './ButtonDeleteChild.module.css';

export default function ButtonDeleteChild({ id, removeChildTodo }) {
  return (
    <button
      title="remove childs"
      className={s.btn}
      type="button"
      onClick={() => removeChildTodo(id)}
    >
      <IconDelete className={s.icon} />
    </button>
  );
}
