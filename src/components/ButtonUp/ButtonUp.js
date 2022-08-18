import s from './ButtonUp.module.css';

import { ReactComponent as IconUp } from '../../images/up-icon.svg';

export default function ButtonUp() {
  return (
    <button className={s.btn} type="button">
      <IconUp className={s.icon} />
    </button>
  );
}
