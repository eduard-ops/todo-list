import s from './CheckBox.module.css';

export default function CheckBox({ isComplited, toggleTodoComplited, id }) {
  return (
    <>
      <label className={s.label}>
        <input
          checked={isComplited}
          type="checkbox"
          className={s.box}
          onChange={() => toggleTodoComplited(id)}
        />
      </label>
    </>
  );
}
