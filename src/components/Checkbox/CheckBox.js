import s from './CheckBox.module.css';

export default function CheckBox({ iscomplited, toggleTodoComplited, id }) {
  return (
    <>
      <label className={s.label}>
        <input
          checked={iscomplited}
          type="checkbox"
          className={s.box}
          onChange={() => {
            iscomplited = !iscomplited;
            toggleTodoComplited(id, iscomplited);
          }}
        />
      </label>
    </>
  );
}
