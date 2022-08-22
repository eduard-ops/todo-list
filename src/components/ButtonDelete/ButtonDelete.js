import { ReactComponent as IconDelete } from '../../images/delete.svg';

import s from './ButtonDelete.module.css';

export default function ButtonDelete({ id, removeTodo }) {
  return (
    <button
      title="remove all"
      className={s.btn}
      type="button"
      onClick={() => removeTodo(id)}
    >
      <IconDelete className={s.icon} />
    </button>
  );
}
