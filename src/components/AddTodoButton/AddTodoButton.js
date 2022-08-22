import { ReactComponent as IconAdd } from '../../images/icon-add.svg';

import s from './AddTodo.module.css';

export default function AddTodoButton({ id, addSubTodo }) {
  return (
    <button
      title="add subTodo"
      className={s.btn}
      type="button"
      onClick={() => addSubTodo(id)}
    >
      <IconAdd className={s.icon} />
    </button>
  );
}
