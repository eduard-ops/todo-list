import s from './ButtonEdit.module.css';

import { ReactComponent as IconEdit } from '../../images/edit.svg';

export default function ButtonEdit({ id, editTodo }) {
  return (
    <button className={s.btn} type="button" onClick={() => editTodo(id)}>
      <IconEdit className={s.icon} />
    </button>
  );
}
