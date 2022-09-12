import s from './CheckBox.module.css';

import { useDispatch } from 'react-redux';

import { authOperations } from 'redux/todoes/todoes-operations';

export default function CheckBox({ iscomplited, id }) {
  const dispatch = useDispatch();

  return (
    <>
      <label className={s.label}>
        <input
          checked={iscomplited}
          type="checkbox"
          className={s.box}
          onChange={() => {
            iscomplited = !iscomplited;
            dispatch(authOperations.changeComplited({ id, iscomplited }));
          }}
        />
      </label>
    </>
  );
}
