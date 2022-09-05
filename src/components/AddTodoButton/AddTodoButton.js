import { ReactComponent as IconAdd } from '../../images/icon-add.svg';

import s from './AddTodo.module.css';

export default function AddTodoButton({ id, addSubTodo, pathId }) {
  return (
    <button
      title="add subnote"
      className={s.btn}
      type="button"
      onClick={() => addSubTodo(id, pathId)}
    >
      <IconAdd className={s.icon} />
    </button>
  );
}
